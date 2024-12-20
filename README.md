# FLS News

A news website was built by NextJS and GhostCMS

## Getting Started

First, install the dependencies:
```bash
npm i
```

Second, define your GhostCMS url and content api key in `.env`:
```json
GHOST_URL="https://yourghostdomain.com"
GHOST_CONTENT_API_KEY="ef085b6e92f6bb0e5436b15c54" // Sample content api key
GHOST_ADMIN_API_KEY="675fe2af05535a0001353bfa:609851f2fb1a3d22bd3662db439aba4dea2914c0b0b4d1234ae5f36464175fbe" // Sample admin api key
```

Third, seed some sample data:
```bash
node --experimental-strip-types seed-tags.ts
node --experimental-strip-types seed-posts.ts
```

Finally, run the development server:

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
