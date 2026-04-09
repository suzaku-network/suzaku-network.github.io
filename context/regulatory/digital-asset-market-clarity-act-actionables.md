# Digital Asset Market Clarity Act: Actionable Compliance Guide for L1 Teams

## Scope and purpose

This document translates the text in `context/regulatory/digital-asset-market-clarity-act.txt` into practical actions for Layer 1 blockchain teams.

It focuses on decentralization-related obligations that directly affect:
- protocol governance and upgrade authority,
- validator and consensus participation,
- token ownership concentration,
- issuer and insider behavior,
- disclosure and certification processes.

This is an operational guide for builders. It is not legal advice.

## How to use this guide

- Use this as a program management checklist across legal, protocol engineering, token operations, and governance.
- Treat every item as "required unless counsel confirms otherwise".
- Build evidence continuously. The Act relies on demonstrated facts, not marketing claims.

## Executive summary for L1 teams

To align with the Act's decentralization framework, an L1 team should:

1. Design the chain so no person or coordinated group has unilateral control over protocol function, consensus rules, or governance outcomes.
2. Keep issuer, related persons, and affiliated persons below key concentration thresholds, especially the 20% governance and ownership levels.
3. Open source core code and run protocol behavior through transparent, pre-established, programmatic rules.
4. Publish and execute a time-bound maturity roadmap, generally targeting maturity within 4 years from first exempt sale (subject to SEC extensions).
5. Build auditable disclosures on governance, validator structure, dependencies, insider holdings, and post-maturity ongoing involvement.

---

## Part A. Governance and control actionables

### A1) Eliminate unilateral protocol control

**What the Act targets**
- Any unilateral authority to control or materially alter functionality, operation, or consensus/agreement rules.

**Actionables**
- Remove privileged admin paths that can unilaterally change consensus-critical logic.
- Require multi-party, transparent governance approvals for upgrades.
- Document emergency procedures and constrain them to security/maintenance contexts with governance oversight.
- Implement on-chain timelocks for upgrade execution where feasible.

**Evidence to maintain**
- Architecture docs for upgrade authority and execution flow.
- Smart contract permissions matrix.
- Governance proposal and vote logs.
- Incident and emergency action runbooks.

### A2) Cap governance control power

**What the Act targets**
- No unilateral authority to direct aggregate voting power of 20% or more in alterable voting systems.

**Actionables**
- Monitor voting influence concentration across token voting, validator voting, and delegated power.
- Add governance anti-capture controls (for example quorum design, delegation transparency, and anti-concentration policies).
- Require disclosure and board-level review when any actor approaches 15% effective governance influence.

**Evidence to maintain**
- Governance concentration dashboards (snapshot by epoch/week).
- Delegation and validator voting concentration reports.
- Policy trigger logs and remediation actions.

### A3) Preserve decentralized governance system independence

**What the Act permits**
- A decentralized governance system is not treated as a control person solely for functional, administrative, clerical, or ministerial actions.

**Actionables**
- Clearly separate governance process mechanics from centralized management control.
- Define what counts as ministerial actions versus policy-setting actions.
- For legal wrappers (foundation/association), restrict charter powers to avoid centralized management outcomes.

**Evidence to maintain**
- Governance constitution/charter.
- Foundation bylaws and delegated authority records.
- Classification memos for ministerial versus substantive actions.

---

## Part B. Token ownership and insider concentration actionables

### B1) Enforce aggregate insider ownership ceiling

**What the Act targets**
- Issuer + digital commodity related persons + digital commodity affiliated persons should stay below 20% aggregate beneficial ownership for maturity criteria.

**Actionables**
- Build a beneficial ownership register that includes direct and indirect holdings.
- Define related/affiliated person onboarding and offboarding controls.
- Gate treasury and foundation transfers through concentration impact checks.
- Add pre-trade legal checks for insiders, including lockup windows and sale limits.

**Evidence to maintain**
- Cap table for token units with beneficial ownership look-through.
- Related and affiliated person registry with status dates.
- Periodic concentration attestations signed by legal and finance.

### B2) Manage insider sale restrictions before and after maturity

**What the Act targets**
- Different sale constraints for related/affiliated persons before maturity and after maturity.

**Actionables**
- Establish compliance workflows for hold periods, volume limits, and required disclosures.
- Route insider sales through approved broker/compliance channels when required.
- Automate pre-clearance for transactions by insiders and control persons.

**Evidence to maintain**
- Insider transaction pre-clearance logs.
- Sale volume compliance reports.
- Public disclosures and regulator filings archive.

---

## Part C. Validator and consensus decentralization actionables

### C1) Keep validator participation open and non-discretionary

**What the Act expects**
- Functional system where participants can validate, participate in consensus, run nodes/validators, and engage in governance.

**Actionables**
- Publish objective validator onboarding requirements.
- Eliminate discretionary admissions where technically possible.
- Provide public technical documentation for node operation and consensus participation.
- Avoid hidden operational dependencies controlled by insiders.

**Evidence to maintain**
- Validator onboarding docs and change history.
- Validator set distribution metrics.
- Uptime and liveness reports by validator cohort.

### C2) Maintain open source and programmatic operations

**What the Act expects**
- Open-source code and transparent rules encoded in source code.

**Actionables**
- Keep consensus and governance-critical repositories public.
- Version and tag all production releases.
- Disclose external dependencies and third-party code sources.
- Conduct third-party security audits and publish material results.

**Evidence to maintain**
- Repository policy and release notes.
- SBOM/dependency inventory.
- Audit reports and remediation tracking.

---

## Part D. Issuance pathway and maturity timeline actionables

### D1) Build a formal "path to maturity" plan

**What the Act expects**
- If using exempt primary issuance, issuer intends maturity by statutory timeline, generally 4 years from first exempt sale or 4 years from effective date, whichever is later, subject to extensions.

**Actionables**
- Publish a maturity roadmap with quarterly milestones.
- Tie token release and governance decentralization to objective milestones.
- Define contingency plans if milestones slip.
- Maintain board and governance accountability on maturity status.

**Evidence to maintain**
- Master maturity roadmap and milestone scorecards.
- Quarterly risk and variance reports.
- Extension request support package (if needed).

### D2) Prepare for certification under Exchange Act section 42

**What the Act expects**
- Filing that establishes the chain is not controlled by any person/group under common control.

**Actionables**
- Build a certification binder with all maturity criteria mapped to objective evidence.
- Pre-run a mock certification review and adversarial challenge process.
- Prepare responses for inadequate explanation and novel/complex issue scenarios.
- Assign an accountable certification owner (legal + protocol co-owners).

**Evidence to maintain**
- Section 42 criteria-to-evidence matrix.
- Draft certification package and redline history.
- Regulator communication log.

---

## Part E. Disclosure program actionables

### E1) Pre-maturity disclosures

**Core data points to prepare**
- Maturity status and maturity intent timeline.
- Source code location, external dependencies, and audit details.
- Transaction history verification process.
- Consensus mechanism details.
- Governance mechanisms and how changes are adopted.
- Roles and authority mechanisms for users, developers, validators, governance participants.
- Critical operational dependencies.

**Actionables**
- Build a recurring disclosure data pipeline owned by compliance ops.
- Create a source-of-truth repository for all filed and public disclosures.
- Perform disclosure control testing every reporting cycle.

### E2) Ongoing reporting during maturation

**Actionables**
- File required semiannual and current updates with strict internal deadlines.
- Track progress against declared maturity roadmap.
- Disclose material changes promptly.

### E3) Post-maturity disclosures (if materially involved)

**Actionables**
- Continue public disclosures if issuer remains materially engaged with the chain.
- Report governance participation, alteration activity, funds usage, controlled holdings, and material affiliations.
- Build a documented test for when "material ongoing efforts" cease.

---

## Part F. Failure-to-mature contingency actionables

If the chain does not reach maturity within the required period, exposure increases.

**Actionables**
- Maintain a pre-drafted "failure to mature" disclosure package.
- Prepare enhanced transaction and beneficial ownership reporting workflows.
- Create remedial decentralization measures that can be executed within 90 days.
- Define governance and treasury crisis protocols for delayed maturity status.

**Evidence to maintain**
- Failure root-cause analysis templates.
- Enhanced disclosure packet drafts.
- Corrective action implementation logs.

---

## Part G. Control person risk management actionables

After maturity, blockchain control persons still face transaction limitations and disclosure obligations.

**Actionables**
- Run continuous detection for control person status based on unilateral authority and voting direction tests.
- Maintain a restricted list for potential control persons and affiliates.
- Apply sale controls and public disclosure requirements when triggers are met.
- Include anti-manipulation controls for all large holder sales.

**Evidence to maintain**
- Control person determination memos.
- Restricted list governance records.
- Sale monitoring and market integrity reports.

---

## Part H. 12-quarter implementation plan

### Quarter 1 to Quarter 2
- Establish legal definitions registry (issuer, related, affiliated, control person).
- Stand up governance and ownership concentration dashboards.
- Complete permission and authority mapping for all core contracts and operational systems.

### Quarter 3 to Quarter 4
- Deploy governance hardening and anti-capture controls.
- Launch disclosure data pipeline and internal controls.
- Publish validator openness standards and dependency disclosure.

### Quarter 5 to Quarter 8
- Execute ownership decentralization program and insider policy enforcement.
- Reduce unilateral authority surfaces and formalize emergency governance limits.
- Conduct external audits for codebase, governance process, and compliance controls.

### Quarter 9 to Quarter 12
- Run mock section 42 certification review.
- Close evidence gaps against maturity criteria.
- File certification when evidence is complete and control thresholds are comfortably met.

---

## Part I. Operating model and ownership

### Recommended internal owners
- **General Counsel / External Counsel**: statutory interpretation, filing strategy, regulatory engagement.
- **Protocol Engineering Lead**: control-surface reduction, upgrade process, consensus integrity.
- **Governance Lead**: voting framework, delegation policy, governance transparency.
- **Token Operations Lead**: ownership registry, insider constraints, sale compliance.
- **Compliance Operations Lead**: disclosure production, controls testing, evidence retention.

### Meeting cadence
- Weekly working group for execution blockers.
- Monthly steering review for thresholds and maturity status.
- Quarterly board/governance checkpoint with go or no-go decision gates.

---

## Part J. Compliance artifacts checklist

Maintain these artifacts in a controlled repository:

- Maturity criteria evidence matrix.
- Beneficial ownership and affiliation register.
- Governance authority map and permission inventory.
- Validator decentralization and participation metrics.
- Disclosure calendar and filed report archive.
- Insider transaction pre-clearance and monitoring records.
- Control person analysis logs.
- Incident, emergency action, and cybersecurity governance records.

---

## Section mapping reference (act to actionables)

- **Sec. 101 / 103 definitions**: decentralization, governance system, control concepts, DeFi protocol boundaries.
- **Sec. 105 rulemakings**: expected interpretation shifts for terms like unilateral authority and programmatic functioning.
- **Sec. 109**: non-controlling developer protections and limits.
- **Sec. 202**: issuance pathway, maturity timeline, and required disclosures.
- **Sec. 204**: related/affiliated person sale restrictions and reporting.
- **Sec. 205 (Exchange Act Sec. 42)**: certification process and maturity criteria.
- **Sec. 206**: effective date and rulemaking-dependent implementation timing.
- **Sec. 309 and Sec. 409**: DeFi activity exclusions with anti-fraud and anti-manipulation carve-outs.
- **Sec. 411**: post-maturity control person transaction limits and disclosures.

## Final note for L1 teams

The Act rewards demonstrable decentralization, not narrative decentralization. Treat governance design, validator openness, and ownership distribution as compliance-critical system architecture. Build evidence as you build the protocol.
