# Emoji shortener 🚀🤓

A url shortener in Sveltekit with emojis

## Demo

Demo can be used [here](https://s.npdt.dev) or at [https://s.npdt.dev](https://s.npdt.dev)

## How to use

1. Clone repository using

```bash
git clone git@github.com:npdtdev/emoji-shortener.git
```

2. Change directory and run install

```bash
cd emoji-shortener
npm i
```

3. Create environment variables

```bash
echo 'PRIVATE_DATABASE_URL="<YOUR_DATABASE_CONNECTION_STRING>"' | cat >> .env
```

4. Push schema

```bash
npx prisma db push
```

4. Run the project

```bash
npm run dev -- --open
```
