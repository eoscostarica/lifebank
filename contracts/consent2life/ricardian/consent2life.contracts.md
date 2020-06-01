<h1 class="contract">consent</h1>
---
spec-version: 0.1.0
title: Consent to Contract
summary: The {{ consent }} action intends to inform a contract of an account's consent to its terms of service, as specified in a sha256 hash of the contract. Users can also update their consent by agreeing to a new hash value.
By using the Lifebank app and by agreeing to this Agreement, you warrant and represent that you are at least 18 years of age. If you create an account in Lifebank, you are responsible for maintaining the security of your account. Moreover, be aware that providing false information may result in the termination of your account. We will not be liable if you incur any acts or omissions, including any resulting damages. We may suspend, disable, or delete your account if you violate any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill.
icon: https://lifebank.io/icons/multisig.png

<h1 class="contract">revoke</h1>
---
spec-version: 0.1.0
title: Revoke Consent
summary: The intent of the `{{ revoke }}` action is to revoke a previous informed consent to a contract by deleting the record.
icon: https://lifebank.io/icons/multisig.png

<h1 class="contract">clear</h1>
---
spec-version: 0.1.0
title: Clear table
summary: The intent of the `{{ clear }}` action is to delete all table records and is used for development purposes on test-nets and must not be published to mainnet.
icon: https://lifebank.io/icons/admin.png
