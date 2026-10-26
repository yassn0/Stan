# Stan

A project developed in **48 hours during the CHILIZ hackathon at the Parc des Princes**.
The goal: build a **blockchain for K-pop fans** that rewards their engagement (streams, album purchases, community actions) with **decentralized tokens**.
These tokens allow **super fans** to unlock **exclusive rewards** offered directly by the artists.

---

## Features

- **Fan engagement tracking**: streams, purchases, community activities.
- **Token rewards**: every action generates decentralized tokens.
- **Exclusive rewards**: tokens can be redeemed for unique artist experiences.
- **Next.js web app**: simple and fast fan interface.
- **Foundry smart contracts**: transparency and on-chain security.

---

## Project Structure

- **`chiliz_contract/`**: smart contracts (built with [Foundry](https://book.getfoundry.sh/)).
- **`frontend/`**: [Next.js](https://nextjs.org/) web application with React hooks and UI components.
- **`script_mission.js`**: script listing the missions of the deployed contract.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+) and npm
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (smart contracts only)

---

## Run the frontend

```bash
git clone https://github.com/yassn0/Stan.git
cd Stan/frontend

cp .env.example .env.local   # public config: RPC + deployed contract address
npm install
npm run dev                  # http://localhost:3000
```

The app is designed for a mobile viewport. Missions are read from the `Artist` contract deployed on Chiliz Chain (chain id 88888).
Registering / completing a mission is signed server-side (`app/api/missions`) and needs `PROD_PRIVATE_KEY` and `NEXT_PUBLIC_PROD_PUBLIC_KEY` in `.env.local`; everything else works without them.

---

## Smart contracts

```bash
cd chiliz_contract
forge install foundry-rs/forge-std@v1.9.7 smartcontractkit/chainlink-brownie-contracts@1.3.0 --no-git
forge build
forge test
```

See [`chiliz_contract/documentation.md`](chiliz_contract/documentation.md) for the contract API.
