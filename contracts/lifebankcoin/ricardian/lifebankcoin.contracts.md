<h1 class="contract">create</h1>
---
spec-version: 0.1.0
title: Consent to Contract
summary: The intent of the `{{ create }}` action is to allow the `issuer` account to create a token in supply of `maximum_supply`. If validation is successful a new entry in statstable for token symbol scope gets created..
icon: https://lifebank.io/icons/token.png

<h1 class="contract">issue</h1>
---
spec-version: 0.1.0
title: Revoke Consent
summary: The intent of the `{{ issue }}` action issues to `to` account a `quantity` of tokens.
icon: https://lifebank.io/icons/token.png

<h1 class="contract">transfer</h1>
---
spec-version: 0.1.0
title: Revoke Consent
summary: The intent of the `{{ tranfer }}` action is to allow `from` account to transfer to `to` account the `quantity` tokens. One account is debited and the other is credited with quantity tokens.
icon: https://lifebank.io/icons/transfer.png

<h1 class="contract">clear</h1>
---
spec-version: 0.1.0
title: Clear table
summary: The intent of the `{{ clear }}` action is to delete all table records and is used for development purposes on test-nets and must not be published to mainnet.
icon: https://lifebank.io/icons/admin.png
