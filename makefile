include utils/meta.mk utils/help.mk

SHELL := /bin/bash

run: ##@local Run the project locally
run: 
	make run-env 
	make run-postgres
	make run-wallet
	make -j 3 run-hapi run-hasura run-webapp

run-env:
	@fuser -k 3000/tcp
	@fuser -k 9695/tcp
	@[ -f .env ] && source .env || echo "$(YELLOW)WARNING:$(RESET) .env file not found"

run-postgres:
	@docker-compose up -d --build postgres

run-wallet:
	@docker-compose up -d --build wallet

run-hapi:
	@cd hapi && yarn
	@docker-compose up -d --build hapi
	@if [ $(STAGE) = "dev" ]; then\
		docker-compose logs -f hapi;\
	fi

run-hasura:
	@until \
		docker-compose exec -T postgres pg_isready; \
		do echo "$(BLUE)$(STAGE)-$(APP_NAME)-hasura |$(RESET) waiting for postgres service"; \
		sleep 5; done;
	@until \
		curl http://localhost:9090; \
		do echo "$(BLUE)$(STAGE)-$(APP_NAME)-hasura |$(RESET) waiting for hapi service"; \
		sleep 5; done;
	@docker-compose stop hasura
	@docker-compose up -d --build hasura
	@until \
		curl http://localhost:8080/v1/version; \
		do echo "$(BLUE)$(STAGE)-$(APP_NAME)-hasura |$(RESET) ..."; \
		sleep 5; done;
	@if [ $(STAGE) = "dev" ]; then\
	 	cd hasura;\
	 	hasura console --endpoint http://localhost:8080 --no-browser;\
	fi

run-webapp:
	@until \
		curl http://localhost:8080/v1/version; \
		do echo "$(BLUE)$(STAGE)-$(APP_NAME)-webapp |$(RESET) waiting for hasura service"; \
		sleep 5; done;
	@if [ $(STAGE) = "dev" ]; then\
		cd webapp && yarn;\
		FORCE_COLOR=true yarn start | cat;\
	else\
		docker-compose up -d --build webapp;\
		docker-compose up -d --build nginx;\
	fi

stop: ##@local Stops the development instance
stop:
	@docker-compose stop

install: ##@local Install hapi and webapp dependencies
install:
	@cd hapi && yarn
	@cd webapp && yarn

pre-commit: ##@local Run pre commit validations for hapi and webapp
pre-commit:
	@[ ! -d hapi/node_modules ] && cd hapi && yarn || echo ""
	@cd hapi && yarn format && yarn lint
	@[ ! -d webapp/node_modules ] && cd webapp && yarn || echo ""
	@cd webapp && yarn format && yarn lint

build-docker-images: ##@devops Build docker images
build-docker-images:
	@echo "Building docker containers..."
	@for dir in $(SUBDIRS); do \
		$(MAKE) build-docker -C $$dir; \
	done

push-docker-images: ##@devops Publish docker images
push-docker-images:
	@echo $(DOCKER_PASSWORD) | docker login \
		--username $(DOCKER_USER) \
		--password-stdin
	for dir in $(SUBDIRS); do \
		$(MAKE) push-image -C $$dir; \
	done
	
docker_images:
docker_images: 
	make build-docker-images
	make push-docker-images

K8S_BUILD_DIR ?= ./build_k8s
K8S_FILES := $(shell find ./kubernetes -name '*.yaml' | sed 's:./kubernetes/::g')

build-kubernetes: ##@devops Generate proper k8s files based on the templates
build-kubernetes: ./kubernetes
	@echo "Build kubernetes files..."
	@rm -Rf $(K8S_BUILD_DIR) && mkdir -p $(K8S_BUILD_DIR)
	@for file in $(K8S_FILES); do \
		mkdir -p `dirname "$(K8S_BUILD_DIR)/$$file"`; \
		$(SHELL_EXPORT) envsubst <./kubernetes/$$file >$(K8S_BUILD_DIR)/$$file; \
	done

deploy-kubernetes: ##@devops Publish the build k8s files
deploy-kubernetes: $(K8S_BUILD_DIR)
	@echo "Creating SSL certificates..."
	@kubectl create secret tls \
		tls-secret \
		--key ./ssl/lifebank.io.key \
		--cert ./ssl/lifebank.io.crt \
		-n $(NAMESPACE)  || echo "SSL cert already configured.";
	@echo "Creating configmaps..."
	@kubectl create configmap -n $(NAMESPACE) \
	lifebank-wallet-config \
	--from-file wallet/config/ || echo "Wallet configuration already created.";
	@echo "Applying kubernetes files..."
	@for file in $(shell find $(K8S_BUILD_DIR) -name '*.yaml' | sed 's:$(K8S_BUILD_DIR)/::g'); do \
		kubectl apply -f $(K8S_BUILD_DIR)/$$file -n $(NAMESPACE) || echo "${file} Cannot be updated."; \
	done