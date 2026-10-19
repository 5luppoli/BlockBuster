# BlockBuster: Implementation Guide

How the BlockBuster storefront is built, why, and how to run, test and extend it.
**What** the app must do is in [PROJECT_SPEC.md](PROJECT_SPEC.md). The course-technique audit is [Frontend-Knowledge-Audit.md](Frontend-Knowledge-Audit.md); it is a reference and is never modified.

Every command and version in this guide was run or checked on 2026-10-14 on the development machine (Windows 11).

---

## 1. Reading order

1. §3 Setup: how the project was created.
2. §4 Architecture: the main decisions.
3. §5–9: how each part works (data, filters, cart, purchases).
4. §11: the modern features that go beyond the course, and how they relate to what was taught.

## 2. Verified environment

| Tool | Version | Where it was checked |
|---|---|---|
| Node.js | 24.21.0 | `node -v` |
| npm | 12.0.2 | `npm -v` |
| Angular CLI (global, used for `ng new`) | 21.2.3 | `ng version` |
| Angular CLI / build (project) | 21.2.26 | `npm ls` |
| @angular/core | 21.2.25 | `npm ls` |
| TypeScript | 5.9.3 | `npm ls` |
| RxJS | 7.8.2 | `npm ls` |
| zone.js | 0.16.3 | `npm ls` |
| Bootstrap (CSS only) | 5.3.8 | `npm ls` |
| Vitest / jsdom (unit tests) | 4.1.11 / 28.1.0 | `npm ls` |
| Git | 2.54.0 | `git --version` |

## 3. Project setup (what was actually run)

### 3.1 Starting point

The folder `C:\Users\MartinezCortezKevinJ\source\Repos anno 2026-2027\FE\BlockBuster` contained only `Frontend-Knowledge-Audit.md`. There was no Angular app and no Git repository. The GitHub repository `5luppoli/BlockBuster` existed but was empty (`git ls-remote` returned no refs).

Files the brief expected but that **do not exist**: `02_PROJECT_AUDIT.md` (the audit is `Frontend-Knowledge-Audit.md`), `MEMORY.md`, `01_ITS_COURSE_MAP.md`. The audit's §3 and §9 serve as the course map.

### 3.2 Git first, so the documentation is the first commit

Run from the `BlockBuster` folder:

```bash
git init -b main
git remote add origin https://github.com/5luppoli/BlockBuster.git
```

### 3.3 Generating the app into the existing folder

The course command is `ng new <nomeprogetto> --standalone=false --routing --zoneless=false` (audit §3.5.1, L3 s.17). By default `ng new` creates a **new sub-folder** and its own Git repository. To generate into the existing repository root instead, the command was run from the **parent** folder (`...\FE`) with two extra flags:

```bash
cd "C:\Users\MartinezCortezKevinJ\source\Repos anno 2026-2027\FE"
ng new block-buster --standalone=false --routing --zoneless=false --file-name-style-guide=2016 --style=css --ssr=false --ai-config=none --skip-git --directory=BlockBuster
```

| Option | Purpose | Supported by CLI 21.2.3? |
|---|---|---|
| `--standalone=false` | NgModule architecture (course) | Yes |
| `--routing` | Generates `app-routing.module.ts` (course) | Yes |
| `--zoneless=false` | Keeps zone.js change detection (course) | Yes |
| `--file-name-style-guide=2016` | Slide-style names: `app.module.ts`, `*.component.ts` (audit decision B/E) | Yes |
| `--style=css --ssr=false --ai-config=none` | Answer the interactive prompts | Yes |
| `--skip-git` | Git was already initialised in the folder (§3.2) | Yes |
| `--directory=BlockBuster` | Generate into the existing folder, not a nested one | Yes |

A `--dry-run` was run first to confirm that no generated file collides with existing files.

### 3.4 Adjustments after generation

The generated files were inspected and changed where needed:

| Change | Why |
|---|---|
| `angular.json`: `addTypeToClassName: true` for components, directives and services | Class names like `CartComponent`, `CartService` (audit decision E) |
| Root class `App` → `AppComponent` (`app.component.ts`, `app.module.ts`, spec) | Matches the slides (decision E) |
| Removed `title = signal('block-buster')` and the 20 KB placeholder template | Unused boilerplate (decision F) |
| `npm install bootstrap@5`; added `node_modules/bootstrap/dist/css/bootstrap.min.css` to `angular.json` → `styles` | Bootstrap CSS only, chosen on 2026-10-14 (audit decision A) |
| `provideHttpClient()` in `AppModule` providers | Replaces the deprecated `HttpClientModule` (§11) |
| `FormsModule` in `AppModule` imports | `[(ngModel)]` for the filters |
| Initial bundle **warning** budget 500 kB → 700 kB (error limit stays 1 MB) | Bootstrap's CSS alone is 231 kB raw (23 kB gzipped). The total is 601 kB raw, 122 kB transferred |

Components and services were then generated with the CLI (from the repository root):

```bash
npx ng generate component header
npx ng generate component storefront
npx ng generate component product-card
npx ng generate component cart
npx ng generate component order-confirmation
npx ng generate service services/product
npx ng generate service services/cart
```

The CLI declares each new component in `AppModule` automatically. All generated placeholder code and specs were then replaced.

## 4. Architecture and decisions

### 4.1 Decisions

| Topic | Decision | Reason |
|---|---|---|
| Module system | **NgModule** (`AppModule` + `AppRoutingModule`), every component `standalone: false` | The audit's binding setup and the course command |
| Change detection | zone.js (`provideZoneChangeDetection`) | `--zoneless=false` |
| Constraint level | **Hybrid modern** (your decision, 2026-10-14): the audit's setup plus `@if`/`@for`/`@switch` and `provideHttpClient()`. **No signals** (your decision, 2026-10-19) | The brief asks for modern Angular. Audit decision 4/F listed these as excluded; you chose to allow the control flow for BlockBuster, then removed signals so all state uses taught techniques |
| Styling | Bootstrap 5 **CSS only** (no Bootstrap JS) + small component CSS files | Your decision, 2026-10-14 (audit decision A) |
| State | Plain **properties and getters**, shared cart in a root service; no signals, no NgRx | Taught (L2 s.17, L3 s.15). zone.js re-renders after every event, so no reactive wrapper is needed |
| Dependency injection | Constructor injection, as taught (L4 s.1–3) | Fully supported. `inject()` would be the modern alternative but adds nothing here |
| Component communication | `@Input` / `@Output` + `EventEmitter` (L3 s.18–20) | Taught and still supported |
| Forms | Template-driven `[(ngModel)]` (L4 s.16) | Taught. No reactive forms were needed (audit decision 5) |
| HTTP | Service wraps `HttpClient`, returns `Observable<T>`, the component subscribes (L4 s.4) | The core course pattern |

### 4.2 Folder structure

```
src/
├── index.html, main.ts, styles.css
└── app/
    ├── app.module.ts                 declarations, FormsModule, providers
    ├── app-routing.module.ts         the four routes
    ├── app.component.*               page frame: header, <router-outlet>
    ├── shopping-journey.spec.ts      routing + shared-cart journey test
    ├── models/
    │   ├── product.model.ts          Product, DummyJSON response types
    │   ├── category-mapping.ts       category slug → display name + toProducts(), categoriesOf()
    │   └── cart.model.ts             CartItem, CartLine, PurchaseSummary
    ├── services/
    │   ├── product.service.ts        GET from DummyJSON → Product[]
    │   └── cart.service.ts           shared cart state (private fields + getters) and purchase rules
    ├── header/                       brand, navigation, cart badge
    ├── storefront/                   shop page + product-filter.ts (pure filter logic)
    ├── product-card/                 one product (presentational)
    ├── cart/                         cart page, Buy, Buy All
    └── order-confirmation/           confirmation page
```

## 5. Components, services and routes

| Part | Type | Responsibility |
|---|---|---|
| `AppComponent` | Component | Layout only: `<app-header>`, `<router-outlet>` |
| `HeaderComponent` | Component | Brand, Shop/Cart links with `routerLinkActive`, live `cart.itemCount` badge |
| `StorefrontComponent` | Component (route `/`) | Loads products, holds the filter state, shows loading/error/empty/no-match states, adds to the cart |
| `ProductCardComponent` | Component | Displays one `Product` (`@Input`), emits `addToCart` (`@Output`). No service access |
| `CartComponent` | Component (route `/cart`) | Shows `cart.lines`, +1, −1, Remove, Buy, Buy All; navigates to the confirmation |
| `OrderConfirmationComponent` | Component (route `/order-confirmation`) | Shows `cart.lastOrder`, or "No recent purchase" |
| `ProductService` | Service (`providedIn: 'root'`) | The only place that knows the DummyJSON URL and response shape |
| `CartService` | Service (`providedIn: 'root'`) | The only place that changes the cart: add, +1, −1, remove, buy, buy all |
| `product-filter.ts` | Plain TypeScript | `PRICE_BANDS` and `filterProducts()`: pure, unit-tested logic |
| `category-mapping.ts` | Plain TypeScript | `CATEGORY_LABELS`, `categoryLabel()`, `toProducts()`, `categoriesOf()` |

Routes (`app-routing.module.ts`, same pattern as L4 s.5–7):

```ts
{ path: '', component: StorefrontComponent, title: 'BlockBuster | Shop' },
{ path: 'cart', component: CartComponent, title: 'BlockBuster | Cart' },
{ path: 'order-confirmation', component: OrderConfirmationComponent, title: 'BlockBuster | Order confirmation' },
{ path: '**', redirectTo: '' },   // last: routes match in order
```

The `title` property sets the browser-tab title (newer than the slides, built into the router).

## 6. Data flow: DummyJSON → product card

```
StorefrontComponent.ngOnInit()
  → loadProducts(): loadState = 'loading'
    → ProductService.getProducts()
      → HttpClient.get<DummyJsonProductsResponse>(PRODUCTS_URL)          one GET, ~200 products
      → pipe(map(r => toProducts(r.products ?? [])))                     every product, slug → readable category, API order
    → subscribe({ next: products = ..., loadState = 'loaded'; error: loadState = 'error' })
  → template: @switch (loadState) → @for (product of visibleProducts) → <app-product-card [product]="product">
```

- **URL:** `https://dummyjson.com/products?limit=0&select=id,title,price,category,thumbnail`. `limit=0` returns every product; `select` returns only the fields the shop uses.
- **Typing:** `DummyJsonProductsResponse` describes the raw API JSON; `Product` is the app's own shape. `toProducts()` is the one place where one becomes the other, so the rest of the app never touches API field names.
- **Categories:** `CATEGORY_LABELS` (a `Record<string, string>`) turns each of the 24 slugs into a display name ("Men's Shirts"). An unknown slug falls back to a title-cased version, so a new API category is never hidden. The slug never reaches the template, and no page text names the provider (client request, 2026-10-16).
- **No unsubscribe needed:** HTTP Observables complete after one response (L5 s.4, audit decision 8).

## 7. Search and filters

State in `StorefrontComponent`, each a plain property bound to a form field with `[(ngModel)]` (L4 s.16):

| Property | Field | Empty value |
|---|---|---|
| `searchTerm` | `<input type="search">` | `''` |
| `selectedCategory` | `<select id="category">` | `null` (placeholder "Select a category…") or `'all'` ("All categories") |
| `priceOption` | `<select id="price">` | `'none'` ("Any price") |

The category options come from the getter `get categories() { return categoriesOf(this.products); }`, so the dropdown only lists categories that actually have products. The price dropdown has two `<optgroup>`s: **Sort** (`price-asc`, `price-desc`) and **Price range** (the `id` of each entry in `PRICE_BANDS`).

Derived state with getters (L2 s.17):

```ts
get visibleProducts(): Product[] { return filterProducts(this.products, { searchTerm: ..., category: ..., price: ... }); }
get hasActiveFilters(): boolean { return ...; }   // enables "Reset filters"
```

`filterProducts()` (in `product-filter.ts`) keeps a product only if **all** active conditions pass (logical AND), then sorts if asked:

1. **Name:** `title.toLowerCase().includes(term)`, where `term` is the trimmed, lower-cased search text. An empty term means no name condition.
2. **Category:** `product.category === category` when one is chosen. The placeholder and "All categories" both mean no category condition.
3. **Price range:** `price >= band.min` and `price < band.max`, each only if set. Exclusive upper bounds mean $25.00 belongs to "$25 – $50" only.
4. **Sort:** `price-asc` / `price-desc` sort the filtered copy with `Array.sort`; the input array is never changed.

The bands were chosen from the live price spread (2026-10-16: 46 products under $10, 38 at $10–25, 33 at $25–50, 16 at $50–100, 28 at $100–500, 7 at $500–1,000, 26 at $1,000+).

`visibleProducts` is a getter, so it is recalculated from **all** current values every time the template reads it. `[(ngModel)]` updates a property, zone.js then runs change detection, and the template reads the getter again. No filter can overwrite another, and the list can never be out of date. **Reset filters** sets the three properties back to their empty values.

The cost is that the getter runs on every change-detection pass, not only when a filter changes. Filtering about 200 products takes well under a millisecond, so this is not noticeable. With thousands of products, the list would instead be stored in a field and recalculated by a method called from `(ngModelChange)`.

## 8. Shared cart state

`CartService` is `providedIn: 'root'`: Angular creates **one** instance for the whole app. The header, storefront and cart page all receive that same instance, so they always show the same cart. Because the service outlives the route components, the cart survives navigation. It does not survive a full reload (out of scope, spec §3.2).

```ts
private items: CartItem[] = [];                 // the only changeable cart state
private lastOrderValue: PurchaseSummary | null = null;
get lines()     { items with subtotal = roundToCents(price × quantity) }
get itemCount() { sum of quantities }            // header badge
get total()     { roundToCents(sum of subtotals) }
get isEmpty()   { items.length === 0 }
get lastOrder() { lastOrderValue }               // no setter: read-only outside
```

Rules:

- **Encapsulation:** the fields are `private` and the getters have no setters, so components can read the cart but only the service's methods change it (`addProduct`, `increaseQuantity`, `decreaseQuantity`, `removeItem`, `purchaseItem`, `purchaseAll`).
- **Always up to date:** the getters recalculate on every read. Nothing is stored twice, so the subtotals, count and total cannot drift from the items. After any click, zone.js runs change detection and every component that shows the cart (header badge, cart page) reads the new values.
- **Immutable updates:** each change assigns a new array or object (`[...items, newItem]`, `items.map(...)`, `items.filter(...)`, `{ ...item, quantity: item.quantity + 1 }`). Getters would also work with in-place changes; new copies keep earlier `PurchaseSummary` objects from changing afterwards.
- **No duplicates:** `addProduct()` checks for the product id first and calls `increaseQuantity()` if it is already in the cart.
- **Valid quantities:** quantities only start at 1 and grow by 1. Remove deletes the whole line, so a line with 0 units cannot exist.
- **Money:** `roundToCents()` (`Math.round(x * 100) / 100`) avoids floating-point artefacts such as `0.1 + 0.2 = 0.30000000000000004`. Display uses the `currency: 'USD'` pipe (L4 s.13).

This follows the idea of the course's `BehaviorSubject` shared-state pattern (L5 s.13): one private writable source, read-only access for consumers. A `BehaviorSubject` was not used because it would need the `async` pipe or manual subscribe/unsubscribe in three components, with no benefit while zone.js already re-renders after every event.

## 9. Purchases and confirmation

**Buy (one line)**, `CartComponent.buy(productId)` → `CartService.purchaseItem(productId)`:

1. Find the line (with its current quantity and subtotal). If it is missing, return `null` (nothing happens).
2. Remove that line only. The other lines stay, and `total` and `itemCount` are correct on the next read because they are getters.
3. Return a `PurchaseSummary`. The component stores it in `lastItemPurchase` and shows "Simulated purchase complete: 2 × Lamp ($20.00). This is a demo: no payment was taken."

**Buy All**, `CartComponent.buyAll()` → `CartService.purchaseAll()`:

1. If the cart is empty, return `null`. The component does **not** navigate. The Buy All button is also disabled for an empty cart and is not rendered when the cart is empty, so this guard is a second line of defence.
2. Build a `PurchaseSummary` (lines, item count, total), store it in `lastOrder`, then empty the cart.
3. The component navigates with `this.router.navigate(['/order-confirmation'])` (L4 s.8).

**Confirmation page:** `@if (cart.lastOrder; as order)` shows the success message, the purchased lines, the count and the total, plus "Back to the shop". Without a recorded order (for example, the URL opened directly after a reload) it shows "No recent purchase". A success message can only appear after `purchaseAll()` has completed.

Purchases are synchronous and in memory: there is no network call and no failure path. Every message says the purchase is simulated.

## 10. Testing and verification

### 10.1 Unit and component tests (Vitest, `npm test`)

Angular 21's default test runner is **Vitest** with jsdom (`@angular/build:unit-test`). Last run (2026-10-19, after removing signals): **10 files, 60 tests, all passing**. `fixture.detectChanges()` also runs Angular's dev-mode `checkNoChanges`, so the passing component tests show that the getters cause no "expression changed after it was checked" errors.

| Spec file | What it proves |
|---|---|
| `services/cart.service.spec.ts` | Add, no duplicates, +1, −1 (stops at 1), remove, subtotals/total ($10×2 + $5 = $25), rounding, Buy keeps other lines, Buy All clears and records, empty Buy All is refused |
| `services/product.service.spec.ts` | Correct URL, every product kept in API order, slug → readable category (including the unknown-slug fallback), missing `products` array, HTTP errors (uses `HttpTestingController`) |
| `storefront/product-filter.spec.ts` | Full/partial/case-insensitive search, trimming, category, ascending/descending sort, every price band (bounds), bands cover each price once, unknown option, combined filters, input not mutated |
| `storefront/storefront.component.spec.ts` | Loading → cards, error + Try again, empty catalogue, no provider name on the page, category list, sort and price range through the real dropdowns, reset, no-match message, add-to-cart feedback |
| `product-card/product-card.component.spec.ts` | Image/alt, name, price, category, no provider name; emits on click |
| `cart/cart.component.spec.ts` | Empty state, quantities/subtotals/total, +1, −1 (disabled at 1), Remove, Buy message, Buy All navigates, empty Buy All does nothing |
| `order-confirmation/order-confirmation.component.spec.ts` | Success with count and total after Buy All; "No recent purchase" when opened directly |
| `header/header.component.spec.ts` | Badge shows the total quantity and updates |
| `shopping-journey.spec.ts` | Real routes with `RouterTestingHarness`: shop → add → cart → shop → cart (cart kept) → Buy All → `/order-confirmation` → cart empty; unknown URL → `/` |
| `app.component.spec.ts` | Brand and navigation render; no footer and no provider name |

### 10.2 Real-browser acceptance check

On 2026-10-14 the acceptance criteria in PROJECT_SPEC.md §8 were run in **headless Google Chrome** against `ng serve` and the **live DummyJSON API**. A throwaway `puppeteer-core` script outside the repository drove the browser; it is not a project dependency. Results: **AC-1 to AC-23 passed** (24 checks), with **0 browser-console errors** during the normal flows. For AC-2 the script blocked `dummyjson.com`. The error state and Try again button appeared, and Chrome logged one expected network error.

Observed values (before the 2026-10-16 category change): 78 products on three media shelves; no horizontal scrolling at 360 px width; one card per row on phones, four on a 1280 px desktop.

To repeat it by hand, run `npm start` and walk through the table in PROJECT_SPEC.md §8. To test AC-2, use DevTools → Network → Offline, then reload.

### 10.3 Build

`npm run build` completes with no errors or warnings (initial bundle 601 kB raw / 122 kB transferred).

## 11. Modern features and how they relate to the course

| Feature used | Where | What it does | Course concept it replaces or extends |
|---|---|---|---|
| `@if`, `@for (…; track …)`, `@switch` | All templates | Built-in template control flow. `track` tells Angular which item is which, so it re-renders only what changed | `*ngIf`, `*ngFor`, `ngSwitch` (L3 s.16), which are deprecated in recent Angular |
| `@if (x; as value)` | Messages, confirmation | Stores the condition's value in a local template variable | `*ngIf="x as value"` |
| `provideHttpClient()` | `AppModule` | Registers `HttpClient` | `HttpClientModule` (L4 s.4), now deprecated; the injected `HttpClient` is identical |
| `subscribe({ next, error })` | `StorefrontComponent` | The observer-object form | The two-callback `subscribe(next, err)` form (NG-B s.53), deprecated in RxJS 7 |
| `@Input({ required: true })` | `ProductCardComponent` | Compile-time error if the parent forgets the input | `@Input()` (L3 s.18) |
| Route `title` | Routes | Sets the browser-tab title per route | Not covered |
| `?.` and `??` | `response.products ?? []` (ProductService), `(this.selectedCategory ?? 'all')`; `?.` throughout the specs | Safe access to possibly missing data; default for `null`/`undefined` | `?.` was used but not explained in L3 s.19 |
| Spread `...` | `CartService` | Copies an array or object with one change (immutable update) | Not taught (audit §7). Keeps recorded purchase summaries from changing later |
| `Array.reduce` | Totals | Folds a list into one number | Appears only in an exercise (L1 s.40) |
| `Set` + spread | `categoriesOf()` | Removes duplicate category names | `Set` taught (JS-B), spread not taught (audit §7) |
| `Record<K, V>` | `CATEGORY_LABELS` | Object type mapping slug → display name | Exercise only (L2 s.13) |
| `<optgroup>` | Price dropdown | Groups the sort and range options inside one `<select>` | Plain HTML, not covered |
| CSS: flexbox, `aspect-ratio`, `object-fit`, `-webkit-line-clamp`, `var(--bs-…)`, `:focus-visible` | Component CSS | Consistent cards and responsive cart lines | Beyond the audit's "basic CSS" list (Tier B); responsive layout is Tier C |
| Bootstrap grid `row-cols-*`, utilities | Templates | Responsive product grid: 1/2/3/4 columns | Bootstrap allowed (decision A), never taught |

State uses only taught techniques: plain properties (L3 s.15), `private` fields and getters (L2 s.17) and `[(ngModel)]` on a property (L4 s.16). See §7 and §8.

What was deliberately **not** used: signals (`signal()`, `computed()`, `effect()`, `input()`/`output()`; removed on 2026-10-19), standalone components, `inject()`, zoneless mode, the `async` pipe, NgRx, reactive forms, interceptors and guards. Each would add something to learn without a practical benefit at this size.

## 12. Compatibility notes, known issues and limitations

- **Audit decision 4/F vs. modern features:** the audit listed signals and the new control flow as excluded. You decided on 2026-10-14 to allow both for BlockBuster (the hybrid option), then on 2026-10-19 to remove signals again. Signal state was replaced by plain properties and getters, with no change in behaviour (same 60 tests passing). The new control flow stays. Standalone components and zoneless mode remain unused, as the course command requires.
- **No signals means zone.js is required:** the screen updates because zone.js runs change detection after every event and HTTP response. Switching to zoneless mode would stop the getters from refreshing the view; it would need signals or manual change detection.
- **Git commands beyond the audit's basic list:** `git remote add` and `git push -u` were needed to connect the empty GitHub repository. No rebase, stash, force-push or history rewriting was used.
- **Vitest quirk (test build only):** in `StorefrontComponent`, class **fields** initialised from imported constants (e.g. `readonly priceBands = PRICE_BANDS`) were `undefined` inside Vitest unit tests. The same code worked in the real browser build (checked in headless Chrome). Changing them to **getters** fixed the tests. The root cause was not determined; it appears related to module evaluation order in the test bundle.
- **Event coalescing:** `provideZoneChangeDetection({ eventCoalescing: true })` (CLI default) batches change detection to the next animation frame. Users don't notice, but browser automation must wait briefly after typing or clicking before reading the page.
- **Line endings:** Git on Windows warns "LF will be replaced by CRLF". This is harmless: the files are written with LF, and the system-wide Git setting `core.autocrlf=true` (from Git for Windows) stores LF in the repository and converts to CRLF on checkout.
- **DummyJSON limitations:** no currency (shown as USD); a new or renamed category gets a title-cased name until `category-mapping.ts` is updated; product images load from its CDN, so image URLs contain its domain even though no visible text does.
- **Scale:** all products are filtered in the browser; this suits about 200 products, not thousands.
- **Cart persistence:** in memory only, so a reload empties the cart and forgets the last order.
- **Storefront reload:** returning to the shop recreates `StorefrontComponent`, which re-fetches the catalogue and resets the filters. The cart is unaffected.

## 13. Implementation sequence and Git workflow

Each milestone was built, tested, reviewed with `git status` / `git diff --cached`, and committed with a conventional message:

| # | Commit | Milestone |
|---|---|---|
| 1 | `docs: add course audit and BlockBuster product specification` | Specification |
| 2 | `chore: scaffold Angular 21 app with the course ng new command` | Unmodified CLI output, so later diffs show every change |
| 3 | `chore: configure app shell, routing, Bootstrap CSS and shared cart state` | M1: foundation |
| 4 | `feat: integrate DummyJSON catalogue with transparent media-shelf mapping` | M2: product data |
| 5 | `feat: implement combined name search, shelf and price filters` | M3: filters |
| 6 | `feat: add shopping cart page with quantities, subtotals and total` | M4: cart |
| 7 | `feat: implement simulated Buy, Buy All and purchase confirmation` | M5: purchases |
| 8 | `style: label cart subtotals and refine filter and confirmation details` | M6: visual refinement |
| 9 | `docs: add implementation guide and project README` | M7: documentation |
| 10 | `feat: apply client feedback on categories, price filter and cart` | Client feedback (2026-10-16) |
| 11 | `refactor: replace signals with plain properties and getters` | No-signals decision (2026-10-19) |

Routine for each checkpoint:

```bash
npm run build                    # must succeed
npx ng test --watch=false        # must pass
git status                       # only intended files
git add <files>
git diff --cached                # review; no secrets, no unrelated files
git commit -m "feat: ..."
git push                         # branch main tracks origin/main
```

`node_modules/`, `dist/` and `.angular/cache` are excluded by the generated `.gitignore`. The project contains no secrets: DummyJSON needs no API key.

## 14. Running, building and testing locally

From the repository root:

```bash
npm install                      # first time only
npm start                        # = ng serve → http://localhost:4200
npm run build                    # production build → dist/block-buster/
npm test                         # Vitest in watch mode
npx ng test --watch=false        # run the tests once (as used for verification)
```

## 15. Course-material references

Slide references come from the audit (`Frontend-Knowledge-Audit.md` §3–§5, §9). The decks themselves were not re-read for this guide.

| Concept used in BlockBuster | Slides |
|---|---|
| `ng new … --standalone=false --routing` | L3 s.17 |
| `@NgModule` declarations/imports/providers/bootstrap | L3 s.6–8 |
| Components, `templateUrl`, `styleUrls` | L3 s.11 |
| Interpolation, property/event binding, `[(ngModel)]` | L3 s.15 |
| `*ngIf`/`*ngFor` (replaced here by `@if`/`@for`) | L3 s.16 |
| `@Input` / `@Output` + `EventEmitter` | L3 s.18, s.20 |
| `ngOnInit` | L3 s.13 |
| Service + `HttpClient` + `Observable<T>` + subscribe | L4 s.1–4 |
| Routes, `redirectTo`, `**`, `routerLink`, `routerLinkActive`, `<router-outlet>` | L4 s.5–7 |
| `Router.navigate()` | L4 s.8 |
| `currency` pipe | L4 s.13 |
| Template-driven forms | L4 s.16 |
| `map` in `pipe()` | L5 s.5 |
| HTTP Observables complete by themselves | L5 s.4 |
| `BehaviorSubject` shared state (the idea behind the cart service) | L5 s.13 |
| `private` fields and `get` accessors (cart and filter state) | L2 s.17 |
| DummyJSON as the data source | L4 s.12, L5 s.9 |
| Literal unions, interfaces, `type`, intersections | L2 s.5–10 |
| Arrow functions, modules | L2 s.12, s.14 |
| Array `filter`/`map`/`find`/`some`, `Map` | JS-B s.51–71, s.88 |
