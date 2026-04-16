# CrickZone Web Project Structure

```text
web
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── login
│   │   │   │   └── page.jsx
│   │   │   └── layout.jsx
│   │   ├── (main)
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   ├── (minimal)
│   │   │   ├── account
│   │   │   │   └── page.jsx
│   │   │   ├── cart
│   │   │   │   └── page.jsx
│   │   │   ├── checkout
│   │   │   │   └── page.jsx
│   │   │   └── layout.jsx
│   │   ├── (store)
│   │   │   ├── store
│   │   │   │   ├── [slug]
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── brand
│   │   │   │   │   └── [slug]
│   │   │   │   │       └── page.jsx
│   │   │   │   ├── brands
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── c
│   │   │   │   │   └── [slug]
│   │   │   │   │       └── page.jsx
│   │   │   │   ├── categories
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── search
│   │   │   │   │   └── page.jsx
│   │   │   │   └── page.jsx
│   │   │   └── layout.jsx
│   │   ├── globals.css
│   │   └── layout.js
│   ├── components
│   │   ├── layout
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── StoreSidebar.jsx
│   │   └── ui
│   │       ├── ProductCard.jsx
│   │       └── Toast.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   └── ToastContext.jsx
│   ├── lib
│   │   └── axios.js
│   └── store
│       └── cartStore.js
├── .env.local
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── generate_tree.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md
```
