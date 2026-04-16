# CrickZone Frontend Folder Refactor

A structural reorganization of the `src/` directory to a feature-based architecture.  
**No UI, routing, or business logic changes.** Pure file moves + import path fixes.

---

## User Review Required

> [!IMPORTANT]
> The target structure lists many **new files** (hooks, stubs, UI primitives) that have no equivalent today. The plan treats these as **empty scaffolds** — they exist to complete the folder shape but contain no new functionality. Confirm this is the correct approach.

> [!WARNING]
> `ProductCard` is the **only file that changes its public import path** (`@/components/ui/ProductCard` → `@/features/store/components/ProductCard`). Three page files will be updated. All other component moves are transparent due to Node module resolution (`Navbar/index.jsx` resolves the same as `Navbar.jsx`).

> [!NOTE]
> `Navbar.jsx` (338 lines), `StoreSidebar.jsx` (318 lines) and `Footer.jsx` (301 lines) all exceed 200 lines and will be split per Rule 3. The split keeps the same exported default component and only reorganises internal sub-pieces — this is invisible to any importer.

---

## Proposed Changes

### Phase 1 — `components/layout/` splits (transparent to importers)

#### [MODIFY] Navbar.jsx → [NEW] `Navbar/index.jsx` + `NavLinks.jsx` + `NavUserMenu.jsx`

| File | Responsibility |
|---|---|
| `Navbar/index.jsx` | Main `<Navbar>` component; mounts `NavLinks` and `NavUserMenu`; owns `mobileOpen` state and hamburger |
| `Navbar/NavLinks.jsx` | `NAV_LINKS` constant + reusable `<NavLinks>` component used in both desktop bar and mobile drawer |
| `Navbar/NavUserMenu.jsx` | User avatar button + dropdown (`dropdownOpen` state, login/logout links) |

Old file `components/layout/Navbar.jsx` is **deleted**.  
Import `@/components/layout/Navbar` in `(main)/layout.jsx` **resolves unchanged** via `index.jsx`.

---

#### [MODIFY] Footer.jsx → [NEW] `Footer/index.jsx` + `Footer.utils.js`

| File | Responsibility |
|---|---|
| `Footer/index.jsx` | JSX structure — the `<Footer>` component + `FooterHeading` and `FooterLink` sub-components |
| `Footer/Footer.utils.js` | Data constants: `SHOP_LINKS`, `SUPPORT_LINKS`, `SOCIAL` |

Old file `components/layout/Footer.jsx` is **deleted**.  
Import path unchanged for callers.

---

#### [MODIFY] StoreSidebar.jsx → [NEW] `StoreSidebar/index.jsx` + `SidebarNav.jsx` + `SidebarCategories.jsx`

| File | Responsibility |
|---|---|
| `StoreSidebar/index.jsx` | Main `<StoreSidebar>` shell; renders `SidebarNav`; owns all scoped CSS |
| `StoreSidebar/SidebarNav.jsx` | `<NavItem>` component + `mainNav` array + cart icon with badge |
| `StoreSidebar/SidebarCategories.jsx` | Bottom section (Account & Back-to-site icons); scaffold for future category links |

Old file `components/layout/StoreSidebar.jsx` is **deleted**.  
Import path unchanged for callers.

---

### Phase 2 — `components/ui/` reorganisation

#### [MODIFY] Toast.jsx → [NEW] `Toast/index.jsx`

Pure move; file content unchanged. Import `@/components/ui/Toast` in `ToastContext.jsx` resolves unchanged.

Old `components/ui/Toast.jsx` **deleted**.

#### [NEW] UI Primitive scaffolds (zero business logic, empty stubs)

All created under `src/components/ui/`:

- `Button/index.jsx`
- `Input/index.jsx`
- `Badge/index.jsx`
- `Spinner/index.jsx`
- `Modal/index.jsx`

These export a minimal placeholder component so the folder structure is complete.

---

### Phase 3 — `features/store/` (ProductCard migration — **import paths change**)

#### [NEW] `features/store/components/ProductCard/index.jsx`

Full content moved from `components/ui/ProductCard.jsx`.  
ProductCard **intentionally carries business logic** (`useCartStore`, `useToast`) — this is correct because it lives inside `features/`, not `components/ui/`.

#### [NEW] `features/store/components/ProductCard/ProductCard.skeleton.jsx`

Loading skeleton UI for a product card (matches existing inline skeleton markup used in page files).

#### [MODIFY] Three files — import path update

| File | Old import | New import |
|---|---|---|
| `app/(main)/page.jsx` | `@/components/ui/ProductCard` | `@/features/store/components/ProductCard` |
| `app/(store)/store/c/[slug]/page.jsx` | `@/components/ui/ProductCard` | `@/features/store/components/ProductCard` |
| `app/(store)/store/brand/[slug]/page.jsx` | `@/components/ui/ProductCard` | `@/features/store/components/ProductCard` |

Old `components/ui/ProductCard.jsx` **deleted**.

#### [NEW] `features/store/` stubs

Scaffold files (no existing logic to move; they satisfy the target structure):

```
features/store/
├── components/
│   ├── ProductGrid/index.jsx
│   ├── ProductFilters/index.jsx
│   ├── ProductFilters/FilterDrawer.jsx
│   ├── ProductFilters/PriceRangeSlider.jsx
│   ├── CategoryNav/index.jsx
│   └── BrandCard/index.jsx
├── hooks/
│   ├── useProducts.js
│   └── useFilters.js
└── utils/
    └── formatPrice.js  ← copies the formatPrice function already used inline in pages
```

---

### Phase 4 — `features/cart/`, `features/checkout/`, `features/auth/` scaffolds

All scaffold files (no existing code to move; they satisfy the target structure):

```
features/cart/
├── components/CartItem/index.jsx
├── components/CartSummary/index.jsx
├── components/CartDrawer/index.jsx
└── hooks/useCart.js

features/checkout/
├── components/OrderSummary/index.jsx
├── components/ShippingForm/index.jsx
├── components/PaymentForm/index.jsx
└── hooks/useCheckout.js

features/auth/
├── components/LoginForm/index.jsx
├── components/AuthGuard/index.jsx
└── hooks/useAuth.js       ← thin re-export of useAuth from AuthContext
```

---

### Phase 5 — `hooks/`, `lib/utils.js`, `store/uiStore.js`

#### [NEW] `src/hooks/useDebounce.js`

Extracts the `useDebounce` function currently defined inline in `app/(store)/store/search/page.jsx`.  
Import is added to search page; inline definition removed.

#### [NEW] `src/hooks/useMediaQuery.js`

Stub hook — not used anywhere today, satisfies target structure.

#### [NEW] `src/lib/utils.js`

Stub utility file — satisfies target structure.

#### [NEW] `src/store/uiStore.js`

Stub Zustand store for future UI state (sidebar open/close, etc.) — satisfies target structure.

---

### Phase 6 — Files that do NOT move

| File | Reason |
|---|---|
| `src/context/AuthContext.jsx` | Already at target location |
| `src/context/ToastContext.jsx` | Already at target location |
| `src/lib/axios.js` | Already at target location |
| `src/store/cartStore.js` | Already at target location |
| All `app/**/page.jsx` and `layout.jsx` | Route files are untouched (only 3 get import edits) |
| `app/globals.css`, `app/layout.js` | Untouched |

---

## Verification Plan

### Automated
```
npm run dev
```
Check console for **zero compilation errors** and **zero missing module errors**.

### Manual spot-checks
- `/` — landing page loads with product cards visible
- `/store` — store home loads
- `/store/c/bats` — category page loads with ProductCard
- `/store/brand/ss` — brand page loads with ProductCard
- `/store/search` — search page works with debounce
- `/login` — login/signup page renders
- `/cart` — cart page renders
- `/checkout` — redirects to login if unauthenticated
- `/account` — account page renders when logged in
- `StoreSidebar` icons visible on store pages (desktop + mobile bottom bar)
- `Navbar` renders on home page with cart count badge

