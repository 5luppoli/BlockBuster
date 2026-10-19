# BlockBuster: Project Specification

Functional and product specification for the BlockBuster storefront.
Technical details (architecture, files, commands) are in [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md).
The course-technique audit is in [Frontend-Knowledge-Audit.md](Frontend-Knowledge-Audit.md) (reference only, not modified).

Keywords: **MUST** = mandatory behaviour, verified by an acceptance criterion. **MAY** = optional improvement.

---

## 1. Product vision

BlockBuster is a learning project (ITS Cloud Developer, frontend course) that simulates a small online shop. It sells the catalogue's real product categories (laptops, smartphones, furniture, clothing, …); the original media-only idea was dropped after client feedback on 2026-10-16.

It is a frontend demonstration. It does **not** take real payments, create real orders, authenticate users or use a custom backend. Purchases are simulated in the browser.

The goal is a coherent, usable shop that demonstrates the Angular techniques from the course plus a small set of modern Angular features. The student must be able to explain it.

## 2. User journey

```
Open storefront → Discover products → Search and filter → Add to cart
→ Review cart → Simulate purchase → View confirmation → Back to storefront
```

Every step MUST work end to end.

## 3. Scope

### 3.1 In scope

- Storefront page with a product catalogue loaded from DummyJSON.
- Name search, category filter and a price dropdown (sort or preset range), all combinable.
- Shared shopping cart: add, +1, −1, remove, subtotals, total.
- Simulated purchase of one cart line (**Buy**) and of the whole cart (**Buy All**).
- Purchase-confirmation page.
- Loading, error, empty and success feedback.
- Responsive layout for desktop and mobile.

### 3.2 Out of scope

- Real payments, payment providers, checkout backends, real orders.
- User accounts, login, authentication.
- Product detail pages, reviews, wish lists.
- Persisting the cart across a full page reload (the cart lives in memory for the browser tab session).
- Decreasing quantity by one (only +1 and Remove are required).
- Writing anything back to DummyJSON.

## 4. Data source: DummyJSON and the categories

### 4.1 Source

Products come from `GET https://dummyjson.com/products?limit=0&select=id,title,price,category,thumbnail`.
DummyJSON is the course's data source (audit §5, decision 12).

### 4.2 Categories

On 2026-10-16 DummyJSON returned 194 products in 24 categories (`/products/category-list`). Every product is sold, under its real category. The slug is turned into a readable name in `category-mapping.ts`:

`beauty`, `fragrances`, `furniture`, `groceries`, `home-decoration`, `kitchen-accessories`, `laptops`, `mens-shirts`, `mens-shoes`, `mens-watches`, `mobile-accessories`, `motorcycle`, `skin-care`, `smartphones`, `sports-accessories`, `sunglasses`, `tablets`, `tops`, `vehicle`, `womens-bags`, `womens-dresses`, `womens-jewellery`, `womens-shoes`, `womens-watches`.

Examples: `mens-shirts` → "Men's Shirts", `vehicle` → "Vehicles". A category the table does not know yet is still shown, with a name built from its slug (`pet-supplies` → "Pet Supplies").

### 4.3 Presentation rules (client feedback, 2026-10-16)

- The page never names the data provider: no "DummyJSON" text in the cards, notices, footer or any other visible text. The name appears only in the source code (the API URL and type names).
- Product names, prices and images are shown exactly as the API returns them.
- The catalogue is shown in the API's own order (grouped by category) unless the user picks a price sort.

### 4.4 Prices

DummyJSON prices have no currency. BlockBuster shows them in US dollars (`$`), the convention used in DummyJSON's own documentation.

## 5. Functional requirements

### 5.1 Layout and navigation (all pages)

- FR-NAV-1 MUST: A header shows the **BlockBuster** brand, a link to the storefront ("Shop") and a link to the cart ("Cart").
- FR-NAV-2 MUST: The cart link shows the number of items in the cart (the sum of quantities), updating immediately.
- FR-NAV-3 MUST: The active page's link is visibly highlighted.
- FR-NAV-4 MUST: Unknown URLs redirect to the storefront.

### 5.2 Storefront and catalogue

- FR-CAT-1 MUST: The storefront has a page heading. There is no demo or data-source notice (§4.3).
- FR-CAT-2 MUST: Products load from DummyJSON when the page opens.
- FR-CAT-3 MUST: While loading, a loading message is shown.
- FR-CAT-4 MUST: If the request fails, an error message and a **Try again** button are shown. Try again repeats the request.
- FR-CAT-5 MUST: If the API returns no products, a "catalogue is empty" message is shown.
- FR-CAT-6 MUST: Each product card shows the image (with alt text), name, price and category, plus an **Add to cart** button.
- FR-CAT-7 MUST: Cards have a consistent size and layout regardless of image proportions or title length.

### 5.3 Search

- FR-SRCH-1 MUST: A search field filters products by name as the user types, with no page navigation.
- FR-SRCH-2 MUST: Matching is case-insensitive and matches full or partial names ("POD" matches "Monopod" and "Apple HomePod Mini Cosmic Grey").
- FR-SRCH-3 MUST: Leading and trailing spaces are ignored. An empty or whitespace-only field means "no name filter".

### 5.4 Category filter

- FR-CAT-F-1 MUST: A dropdown lists the categories present in the catalogue, A → Z.
- FR-CAT-F-2 MUST: It has a placeholder that invites the user to choose a category, and an **All categories** option. Both show every product.
- FR-CAT-F-3 MUST: Choosing a category immediately shows only that category's products.

### 5.5 Price dropdown

- FR-PRICE-1 MUST: One **Price** dropdown replaces the min/max fields. Its default, **Any price**, applies no price option.
- FR-PRICE-2 MUST: Under **Sort** it offers **Lowest price first** and **Highest price first**, which reorder the visible products.
- FR-PRICE-3 MUST: Under **Price range** it offers preset ranges: Under $10, $10 – $25, $25 – $50, $50 – $100, $100 – $500, $500 – $1,000, $1,000 and over. The lower bound is inclusive and the upper bound exclusive, so every price falls in exactly one range.
- FR-PRICE-4 MUST: Only one price option is active at a time, because they share one dropdown.

### 5.6 Combined filtering

- FR-FILT-1 MUST: Search, category and price options apply together (logical AND, then the sort order).
- FR-FILT-2 MUST: Changing one filter never clears another.
- FR-FILT-3 MUST: A **Reset filters** button clears all filters and restores the full catalogue.
- FR-FILT-4 MUST: A result count is shown ("Showing X of Y products").
- FR-FILT-5 MUST: When no product matches, a "no products match" message with a reset option is shown.

### 5.7 Shopping cart

- FR-CART-1 MUST: **Add to cart** adds one unit. Adding a product already in the cart increases its quantity by one; it does not create a duplicate line.
- FR-CART-2 MUST: The cart page lists each line with image, name, unit price, quantity and subtotal (unit price × quantity).
- FR-CART-3 MUST: The cart total is the sum of all subtotals, shown to two decimals.
- FR-CART-4 MUST: A **+1** button increases a line's quantity by one.
- FR-CART-5 MUST: A **Remove** button deletes the whole line.
- FR-CART-6 MUST: Quantities are always whole numbers ≥ 1. A line never exists with quantity 0.
- FR-CART-7 MUST: The empty cart shows "Your cart is empty" and a link back to the shop.
- FR-CART-8 MUST: Cart contents survive navigation between pages (Shop ↔ Cart). A full browser reload empties the cart (out of scope, §3.2).
- FR-CART-9 MUST: The user gets brief feedback when a product is added on the storefront.

### 5.8 Simulated purchase of one item (Buy)

- FR-BUY-1 MUST: Each cart line has a **Buy** button that simulates purchasing that line at its current quantity.
- FR-BUY-2 MUST: Afterwards that line is removed, the other lines stay unchanged, and the total and badge update.
- FR-BUY-3 MUST: A success message names the product, quantity and amount, and says it was a **simulated** purchase.

### 5.9 Simulated purchase of the whole cart (Buy All)

- FR-ALL-1 MUST: A **Buy All** button simulates purchasing every line.
- FR-ALL-2 MUST: Buy All is disabled and hidden when the cart is empty. An empty cart can never be purchased.
- FR-ALL-3 MUST: After success the cart is cleared and the app navigates to `/order-confirmation`.
- FR-ALL-4 MUST: The confirmation page states that the **simulated** purchase succeeded and shows the number of items and the total. It says that no real payment was taken.
- FR-ALL-5 MUST: The confirmation page has a **Back to the shop** link.
- FR-ALL-6 MUST: Opening `/order-confirmation` directly, without a completed Buy All, shows "No recent purchase" instead of a success message.

### 5.10 Routing

| Path | Page |
|---|---|
| `/` | Storefront |
| `/cart` | Shopping cart |
| `/order-confirmation` | Purchase confirmation |
| anything else | Redirects to `/` |

Each route sets a meaningful browser tab title.

## 6. Feedback states

| Situation | Feedback |
|---|---|
| Catalogue loading | "Loading products…" |
| API failure | Error message + Try again |
| API returned no products | "The catalogue is empty" |
| Filters match nothing | "No products match your filters" + Reset filters |
| Product added | "<name> added to cart" message |
| Cart empty | "Your cart is empty" + link to the shop |
| Single Buy succeeded | "Simulated purchase complete: <qty> × <name> ($<amount>)" |
| Buy All succeeded | Confirmation page |
| Confirmation opened directly | "No recent purchase" |

No message may claim that a real payment was processed or that a real order was placed.

## 7. Non-functional requirements

- NFR-1 Responsive: usable from 360 px phones to desktop. The product grid shows 1 column on phones, 2 on small tablets, 3 on tablets and 4 on desktops.
- NFR-2 Usability: labelled form controls; prices and buttons easy to find; consistent cards.
- NFR-3 Accessibility basics: `alt` text on images, `<label for>` on inputs, visible focus, sufficient contrast, cart badge readable by screen readers.
- NFR-4 Security: no unsafe HTML binding (`innerHTML`), no secrets, HTTPS API only.
- NFR-5 Dependencies: Angular plus Bootstrap CSS only (no Bootstrap JavaScript, no other UI library).
- NFR-6 Code: strict TypeScript, no `any`, typed API responses.
- NFR-7 Build: `npm run build` succeeds with no errors. Unit tests pass with `npm test`.
- NFR-8 State: no Angular signals (decision of 2026-10-19). State is held in plain properties, and derived values (filtered list, subtotals, totals) are getters.

## 8. Acceptance criteria

Each criterion is testable by hand in the browser. Many are also covered by unit tests (see IMPLEMENTATION_GUIDE.md §10).

| ID | Given / When | Then |
|---|---|---|
| AC-1 | The storefront opens | "Loading products…" appears, then the product cards |
| AC-2 | The API is unreachable (e.g. offline) | An error message and a Try again button appear |
| AC-3 | Products are shown | Each card shows image, name, price and a readable category; no page text mentions DummyJSON |
| AC-4 | Search = "iphone" | Only products with "iphone" in their name (any case) remain |
| AC-5 | Search = "Apple Airpods" (full name) | That product is shown |
| AC-6 | Category = Laptops | Only Laptops products are shown |
| AC-7 | Price = $10 – $25 | Only products priced from $10 up to, but not including, $25 are shown |
| AC-8 | Price = Lowest price first, then Highest price first | The visible products are ordered by price, ascending then descending |
| AC-9 | Search "a" + Category Furniture + Price $100 – $500 | Results satisfy all three conditions |
| AC-10 | Filters set, then Reset filters | All fields are cleared and the full catalogue returns |
| AC-11 | Search "zzzz" | "No products match your filters" appears |
| AC-12 | Add product P | Cart badge shows 1; P appears in the cart with quantity 1 |
| AC-13 | Add P again | P is one line with quantity 2; badge shows 2 |
| AC-14 | Click +1 on P, then −1 | Quantity and subtotal go up, then down; the total updates. −1 is disabled at quantity 1, so repeated clicks never remove P |
| AC-15 | Click Remove on P | The line disappears; the total updates |
| AC-16 | Cart with lines A ($10 × 2) and B ($5 × 1) | Subtotals are $20.00 and $5.00; total is $25.00 |
| AC-17 | Remove every line | "Your cart is empty" appears; Buy All is not available |
| AC-18 | Add items, go to Shop and back to Cart | The cart contents are unchanged |
| AC-19 | Buy on line A (cart has A and B) | A is removed, B remains, the total equals B's subtotal, a simulated-purchase message appears |
| AC-20 | Buy All | The cart empties; the confirmation page shows a success message, item count and total, and a link back to the shop |
| AC-21 | Open `/order-confirmation` directly | "No recent purchase" appears, not a success message |
| AC-22 | Any page | No text claims that a real payment or order took place |
| AC-23 | Phone-width window | The layout fits with no horizontal scrolling; cards stack |
| AC-24 | `npm run build` and `npm test` | Both succeed |

## 9. Assumptions and known limitations

- Category names come from a fixed table. If DummyJSON adds or renames a category, its products still appear, with a name built from the slug, until the table is updated.
- Product images are loaded from DummyJSON's image CDN, so the image URLs (not the visible text) contain its domain. Hiding that would need a proxy or self-hosted images.
- All products are loaded once (194 products); filtering happens in the browser. This would not scale to thousands of products. Server-side search would then be needed.
- The cart is held in memory: it survives navigation but not a full reload.
- Purchases are simulated and immediate: there is no network request and no failure path.
- DummyJSON stock levels are ignored; there is no maximum quantity.
- Prices are treated as US dollars.

## 10. Optional improvements (MAY, not implemented)

- Persist the cart in `localStorage`.
- A −1 quantity button.
- A product detail page (`/product/:id`).
- Debounced or server-side search for large catalogues.
- Sorting by price or name.
