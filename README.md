# FLS News

A news website was built by NextJS and GhostCMS

## Getting Started

### First, install the dependencies:
```bash
npm i
```

### Second, create a copy of the `.env.example` file and save it as `.env`:
```bash
copy .env.example .env # Window

cp .env.example .env # Ubuntu
```

Then, customize the `.env` file according to your GhostCMS server configuration.

### Third, seed some sample data:
```bash
node --experimental-strip-types seed-tags.ts
node --experimental-strip-types seed-posts.ts
```

### Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Post's tag formatting

When creating tags in GhostCMS, remember to **write the tag's name correctly** based on this format `{parent_tag}: {child_tag}`. Otherwise, the website will not work properly.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
