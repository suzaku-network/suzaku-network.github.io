---
title: "Introducing BalancerValidatorManager: Enabling Progressive Decentralization for Avalanche L1s"
description: ""
date: 2025-05-19
image: ../../assets/blog/articles/balancervalidatormanager/introducing-balancervalidatormanager.png
imageAlt: "BalancerValidatorManager thumbnail"
author: suzaku-team
tags:
  - Technical
  - Validator Management
  - Decentralization
---

## Overview

Avalanche's move toward flexible, on-chain validator set management is formalized in [ACP-99](https://github.com/avalanche-foundation/ACPs/blob/main/ACPs/99-validatorsetmanager-contract), which defines a standard for Validator Manager contracts. Ava Labs has provided reference implementations (ValidatorManager [V1](https://github.com/ava-labs/icm-contracts/releases/tag/validator-manager-v1.0.0) and [V2](https://github.com/ava-labs/icm-contracts/releases/tag/validator-manager-v2.0.0)) that serve as the backbone for L1 validator management on Avalanche L1s. Building on these foundations, the `BalancerValidatorManager` introduces a modular approach that enables Avalanche L1s to **progressively decentralize** their validator set, at their own pace, and according to their unique needs.

**The [BalancerValidatorManager](https://github.com/suzaku-network/suzaku-contracts-library/tree/main/src/contracts/ValidatorManager) is now open source** (under BUSL, transitioning to BSD 3 shortly) and has been independently audited by [Omniscia](https://omniscia.io/), [Cyfrin](https://cyfrin.com/), and [Octane](https://www.octane.security/), ensuring high security and transparency for all users.

This article introduces the `BalancerValidatorManager`, explains its architecture, and compares it to the Ava Labs `ValidatorManager` contracts. It also demonstrates how the `BalancerValidatorManager` enables a flexible, project-driven path to decentralization for L1s using the Suzaku Protocol.

## The Need for Progressive Decentralization

Every Avalanche L1 is unique. Some projects may need to remain in a **Proof-of-Authority (PoA)** phase for months or even years, while others may be ready to open up to permissionless validation much sooner. The journey to full decentralization depends on many factors: project maturity, community traction, security needs, and governance readiness.

A rigid, one-size-fits-all approach to validator management does not fit the diverse needs of Avalanche L1s. Instead, L1s need a **progressive decentralization path**—a way to start with trusted validators and gradually open up to permissionless, cryptoeconomic security as the project evolves.

## The Solution: BalancerValidatorManager

### What is BalancerValidatorManager?

The `BalancerValidatorManager` is a smart contract that extends the ACP-99 `ValidatorManager` standard to support **multiple security modules**. Each security module is allocated a maximum total weight (i.e., voting power) and can independently register, remove, or update validators within its allocation.

### Key Features

- **Progressive Decentralization:** L1s can move from PoA to PoS (or dual staking) at their own pace.
- **Flexible Security Models:** Support for PoA, PoS, dual staking, and future security modules.
- **Churn Control:** Inherits churn tracking from ACP-99 to prevent excessive validator set changes.
- **Upgradeable and Modular:** Designed for upgradability and easy integration with new security modules.
- **Open Source & Audited:** The contract is open source and has undergone a full security audit by Omniscia.

## How Does It Work?

- **Start with PoA:** The L1 launches with a PoA validator set, managed by the L1 team using a PoA security module.
- **Introduce Permissionless Validation:** When ready, the L1 owner can register a permissionless security module (e.g., PoS or dual staking) and allocate a portion of the validator set to it.
- **Adjust Over Time:** The owner can gradually increase the share of permissionless validation, reducing reliance on PoA as the network matures.
- **Full Decentralization:** Eventually, the L1 can transition to 100% permissionless validation, with the PoA module phased out.

**Each L1 can choose its own timeline for this journey—whether it takes a few months or several years.**

## Progressive Decentralization in Practice (with Suzaku)

The **Suzaku Protocol** leverages the `BalancerValidatorManager` to enable **progressive decentralization** for Avalanche L1s. This approach allows a network to start with centralized control and gradually transition to a fully permissionless, decentralized validator set—**all without redeploying or migrating contracts**.

### Lifecycle Phases

### Phase 1: Launch (PoA Only)

- The L1 launches with a `PoAValidatorManager` contract.
- All validator weight is managed by the L1 team or a trusted group.
- The `BalancerValidatorManager` can be deployed from the start for future flexibility.

![Phase 1](/blog/articles/balancervalidatormanager/balancervalidatormanager-1-poa.png)

### Phase 2: Open to Permissionless Operators via PoS

- The L1 upgrades to use the `BalancerValidatorManager`.
- A permissionless module (e.g., `AvalancheL1Middleware`) is registered, initially with a small share of the total validator weight (e.g., 1/6th).
- The L1 team retains control over the majority of the total weight, but begins to incentivize and onboard external operators.

![Phase 2](/blog/articles/balancervalidatormanager/balancervalidatormanager-2-semi-permissioned.png)

### Phase 3: Increase PoS Weight

- As the project matures and the community grows, the L1 team can **gradually increase** the weight allocated to permissionless validation (e.g., 60% PoS, 40% PoA).
- The transition is smooth and non-disruptive: validator sets are managed independently by each module, but the `BalancerValidatorManager` enforces the global weight limits.

![Phase 3](/blog/articles/balancervalidatormanager/balancervalidatormanager-3-increase-pos.png)

### Phase 4: Full Decentralization (PoS Only)

- The PoA module's weight is set to zero.
- The permissionless module (e.g., PoS or dual staking) now manages 100% of the validator set.
- The L1 is now fully decentralized, with no special privileges for the original team, which can burn the ownership rights on the `BalancerValidatorManager`.

![Phase 4](/blog/articles/balancervalidatormanager/balancervalidatormanager-4-permissionless.png)

### Why is this powerful?

- **No contract migration:** The same `BalancerValidatorManager` instance is used throughout the L1's lifecycle.
- **Flexible security models:** New modules (e.g., Proof-of-Liquidity, NFT-based, dual staking) can be added as the network evolves.
- **Fine-grained control:** The owner can rebalance weights, add or remove modules, and adapt to the needs of the community.
- **Future-proof:** As new security modules are developed (e.g., for restaking, liquid staking, or NFT-based access), they can be integrated seamlessly.

### Example: Suzaku Dual Staking

Suzaku's `AvalancheL1Middleware` module allows L1s to require operators to stake both the native token and a secondary blue-chip asset (e.g., $sAVAX, $USDC, or $BTC.b). The `BalancerValidatorManager` can allocate a portion of the validator set to this module, enabling advanced security models like dual staking or restaking, while still supporting legacy PoA or PoS modules.

## Comparison: BalancerValidatorManager vs. Ava Labs ValidatorManager

![BalancerValidatorManager vs. Ava Labs ValidatorManager](/blog/articles/balancervalidatormanager/balancervalidatormanager-comparison.png)

### Ava Labs ValidatorManager (V1/V2)

- **V1:**
  - Abstract base contract (`ValidatorManager`)
  - Specialized contracts for PoA (`PoAValidatorManager`) and PoS (`PoSValidatorManager`)
  - Each contract manages the entire validator set using a single security model
- **V2:**
  - Refines the architecture and improves upgradability
  - Still, each instance is tied to a single security model

### BalancerValidatorManager

- **Extends** the ACP-99 standard to allow **multiple security modules**.
- **Enforces** per-module weight limits, preventing any module from exceeding its allocation.
- **Delegates** validator management to modules, which can be PoA, PoS, or custom.
- **The owner** can dynamically adjust module allocations or add/remove modules.

## Conclusion

The `BalancerValidatorManager` brings a new level of flexibility and modularity to Avalanche L1 validator management, building on the robust foundation of the Ava Labs `ValidatorManager` contracts and the ACP-99 standard. Supporting a **progressive decentralization path** enables each L1 to evolve from PoA to hybrid to fully permissionless PoS, at its own pace, and according to its own needs.

**In the context of the Suzaku Protocol,** it is the key enabler for progressive decentralization, allowing L1s to evolve from PoA to hybrid to fully permissionless PoS, all with seamless contract upgrades and no validator set migration.

## About Suzaku

**Suzaku** is the Decentralization Hub for Avalanche L1s. The protocol is designed to help L1 networks securely scale and decentralize their validator set by providing a suite of open-source, audited security modules and a flexible framework for progressive decentralization. Suzaku enables L1s to tap into advanced cryptoeconomic security models—including staking, restaking, dual staking, and more—while supporting seamless transitions from PoA to PoS and beyond. Suzaku is built by the Ash team, alumni of the Avalanche Codebase accelerator, and supported by the Avalanche Foundation.

Learn more at [docs.suzaku.network](https://docs.suzaku.network)

## References

- [ACP-99: Validator Manager Solidity Standard](https://github.com/avalanche-foundation/ACPs/blob/main/ACPs/99-validatorsetmanager-contract)
- [Ava Labs ICM Contracts (ValidatorManager V1/V2)](https://github.com/ava-labs/icm-contracts)
- [Suzaku Protocol: Progressive Decentralization](https://docs.suzaku.network/suzaku-protocol/for-builders/progressive-decentralization)
- [Suzaku Contracts: BalancerValidatorManager](https://github.com/suzaku-network/suzaku-contracts-library/tree/main/src/contracts/ValidatorManager)
- [Security Audits](https://github.com/suzaku-network/suzaku-contracts-library/tree/main/audits/ValidatorManager)
