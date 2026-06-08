---
title: "Announcing Ash Wallet: Safe for Avalanche L1s hosted by Ash"
description: "We are happy to announce the launch of Ash Wallet, that brings all the features of Safe to the Avalanche L1s ecosystem"
date: 2024-07-19
image: ../../assets/blog/articles/announcing-ash-wallet/ash-wallet-social-share.png
imageAlt: "Announcing Ash Wallet thumbnail"
author: ash-by-suzaku
tags:
  - Services
  - Multi-signature
  - Security
---

We are happy to announce the launch of [Ash Wallet](https://wallet.ash.center/welcome) (Safe for Avalanche L1s), a shared infrastructure aimed at bringing all the features of [Safe](https://safe.global/) (prev. Gnosis Safe) to the [Avalanche](https://www.avax.network/) [L1s](https://www.avax.network/) ecosystem. All of the Ash Wallet infrastructure is operated by the [Suzaku](https://suzaku.network) team and subsidized by the Avalanche Foundation.

**Ash Wallet** is available on mainnet at https://wallet.ash.center. For now, the Avalanche C-Chain, [Lamina1](https://lamina1.com/) and [Beam](https://onbeam.com/) L1s are indexed (see below how to get your Avalanche L1 indexed).

The Ash Wallet web interface is a fork of the [safe-wallet-web](https://github.com/safe-global/safe-wallet-web) repo with light customization. Ash Wallet is operated by the Suzaku team and is **not** part of the Safe offering.

# How does it work?

[Safe](https://safe.global/) (previously known as Gnosis Safe) is a suite of solutions for account abstraction on EVM including:

- **Safe{Core}**: an open-source framework to make smart accounts secure, portable, and composable

- **Safe{Wallet}**: a user web application self-custodial smart wallet allowing for multi-sig, account ownership, and in-wallet dApp browsing

![Safe Wallet architecture](https://raw.githubusercontent.com/safe-global/safe-infrastructure/main/docs/diagrams/safe-infrastructure-diagram.png "Safe Wallet architecture")

# What does Ash Wallet provide?

## For L1 teams

Avalanche L1s developers need the features provided by Safe: **account abstraction**, **multi-signature wallets**, etc. for both their own needs and their users’.

Having a managed Safe infrastructure for Avalanche L1s will **make things easier for developers** as they will not have to reinvent the wheel and manage the wallet application themselves.

With **Ash Wallet**, we will take care of running a [safe-transaction-service](https://github.com/safe-global/safe-transaction-service) instance per L1, a critical piece of the Safe infrastructure.

> [!TIP]
> Ash Wallet infrastructure is deployed using **Kubernetes** and [Helm charts](https://github.com/AshAvalanche/safe-charts) for reliable, scalable operations.

## For L1 users

Proposing Safe features to its users will add value to an Avalanche L1, whether by easing non-Web3-native users through account abstraction or increasing wallet security through multisig transaction signing.

**Ash Wallet** makes it easy to interact with Safe contracts by hosting a [Safe{Wallet}](https://github.com/safe-global/safe-wallet-web) instance (https://wallet.ash.center) plugged into the Safe backend that we will host for every L1.

# How do I make my L1 available on Ash Wallet?

If you are running an Avalanche L1 and want Safe deployed and indexed on Ash Wallet (we can also run private or dedicated instances if needed), reach out [on X](https://x.com/ash_avax) or fill out this form:

[Ash Wallet Integration Request](https://forms.gle/x9mwwTeHEjSsp1yE9)

Integration is free as the Ash Wallet initiative is **subsidized by the [Avalanche Foundation](https://twitter.com/AvalancheFDN)**.

# About Ash

[Ash](https://ash.center) is the infra arm of Suzaku. It provides L1 builders with various infrastructure services through open-source tools and professional services. We assist teams from the development phase to mainnet deployment and beyond, helping secure and decentralize sovereign networks.

Ready to deploy your custom-made Appchain on **your infrastructure**? Want to discuss how your dApp could benefit from running on its dedicated blockchain? [Book a call with us!](https://calendly.com/ash-e36knots/)