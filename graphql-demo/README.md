# A collection of demos showcasing Shyft's GraphQL APIs.
For more information about Shyft's GraphQL APIs, please click on this [link](https://docs.shyft.to/graphql-program-apis/introducing-gpa-killer).

## Getting Started

1. Clone repository:

```bash
## Don't forget to ⭐ star
git clone --depth=1 git@github.com:Shyft-to/community-projects.git community-projects
cd community-projects/graphql-demo
```

2. Install the dependencies:

```bash
yarn install --frozen-lockfile
```

3. In `src/index.ts`, replace `<YOUR_SHYFT_API_KEY>` with your actual Shyft API key.

4. You can choose to run the examples using the following four commands:

- Get all ProposalsV2 accounts.

```bash
yarn dev all
```

- Get all ProposalsV2 where the name is similar to 'Orca.'

```bash
yarn dev filter
```

- Get all ProposalsV2 accounts where the governing mint is Grape token, sorted by drafting date.

```bash
yarn dev sort
```

- Get the first 10 ProposalsV2 accounts.

```bash
yarn dev pagination
```

## 💕 Support

Drop this repo ⭐ star

## Development resources

- Docs: https://docs.shyft.to/
- GraphQL Program APIs: https://docs.shyft.to/graphql-program-apis/introducing-gpa-killer
- SDK: https://www.npmjs.com/package/@shyft-to/js
- Support: https://discord.com/invite/QutuZNp3Us
- Blog: https://medium.com/shyft-to
