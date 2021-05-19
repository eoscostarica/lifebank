include ../utils/meta.mk ../utils/help.mk

LATEST_TAG ?= latest

build-docker-cached: ##@devops Build the docker image using cached layers
build-docker-cached: ./Dockerfile
	@docker build \
		--build-arg hasura_graphql_migrations_dir=/hasura-migrations \
		--build-arg hasura_graphql_metadata_dir=/hasura-metadata \
		--cache-from $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		.

build-docker: ##@devops Build the docker image
build-docker: ./Dockerfile
	@docker build \
		--build-arg hasura_graphql_migrations_dir=/hasura-migrations \
		--build-arg hasura_graphql_metadata_dir=/hasura-metadata \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		.

pull-image: ##@devops Pull the latest image from registry for caching
pull-image:
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) || true

push-image: ##@devops Push the freshly built image and tag with release or latest tag
push-image:
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION)
ifeq ($(strip $(RELEASE_TAG)),)
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG)
else
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(RELEASE_TAG)
endif