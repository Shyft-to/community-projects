# Airdrop
Simple script to airdrop cNFTs.

🚨 This code is only for educational purposes; use it at your own risk.

## Getting Started

1. Clone repository:
```bash
## Don't forget to ⭐ star and fork it first :)
git clone --depth=1 github.com community-projects
cd community-projects/airdrop-cnfts
```
2. Install the dependencies:
```bash
yarn install --frozen-lockfile
```
3. Rename the file from `.env.example` to `.env`, and replace the keys with your actual values.
4. Open `assets/sample_wallets.csv` and replace these wallets with the wallets you want to use for the airdrop.
5. In `scripts/airdrop.ts`, go to line `57` and modify the tree configuration based on your requirements.
6. In `scripts/airdrop.ts`, go to line `109` and update the collection metadata to match your needs.
7. In `scripts/airdrop.ts`, go to line `140` and adjust the NFT metadata as per your requirements.
8. Once you've made these changes, start running the airdrop process.
```bash
yarn demo ./scripts/airdrop.ts
```

## 💕 Support
Drop this repo ⭐ star
