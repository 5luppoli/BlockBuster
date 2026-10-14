# BlockBuster: Project Specification

Functional and product specification for the BlockBuster storefront.
Technical details (architecture, files, commands) are in [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md).
The course-technique audit is in [Frontend-Knowledge-Audit.md](Frontend-Knowledge-Audit.md) (reference only, not modified).

Keywords: **MUST** = mandatory behaviour, verified by an acceptance criterion. **MAY** = optional improvement.

---

## 1. Product vision

BlockBuster is a learning project (ITS Cloud Developer, frontend course) that simulates a small online shop for physical media: **books first, then films and records**.

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
- Name search, shelf (category) filter and price-range filter, all combinable.
- Shared shopping cart: add, +1, remove, subtotals, total.
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

## 4. Data source: DummyJSON and the shelf mapping

### 4.1 Source

Products come from `GET https://dummyjson.com/products?limit=0&select=id,title,price,category,thumbnail`.
DummyJSON is the course's data source (audit §5, decision 12).

### 4.2 Limitation

DummyJSON has **no books, films or records**. On 2026-10-14 it returned 194 products in 24 general retail categories (`beauty`, `furniture`, `smartphones`, …).

### 4.3 Mapping strategy (transparent stand-in)

A fixed, documented table assigns some DummyJSON categories to the three BlockBuster **shelves**. Products in unmapped categories are not shown.

| BlockBuster shelf | Display order | DummyJSON source categories | Rationale | Products (2026-10-14) |
|---|---|---|---|---|
| Books | 1 | `home-decoration`, `furniture`, `kitchen-accessories` | Books are the priority, so they get the largest group ("home & living") | 40 |
| Films | 2 | `smartphones`, `tablets`, `laptops` | Screen devices, the things films are watched on | 24 |
| Records | 3 | `mobile-accessories` | Mostly audio products (AirPods, HomePod, Echo, Beats) | 14 |

Transparency rules (MUST):

- The storefront shows a visible notice explaining that the products are DummyJSON demo items placed on media shelves.
- Every product card shows its **original DummyJSON category** next to the shelf.
- Product names, prices and images are shown exactly as DummyJSON returns them. No titles, authors or media data are invented.

The catalogue is ordered by shelf (Books, Films, Records) and then in the API's own order.

### 4.4 Prices

DummyJSON prices have no currency. BlockBuster shows them in US dollars (`$`), the convention used in DummyJSON's own documentation.

## 5. Functional requirements

### 5.1 Layout and navigation (all pages)

- FR-NAV-1 MUST: A header shows the **BlockBuster** brand, a link to the storefront ("Shop") and a link to the cart ("Cart").
- FR-NAV-2 MUST: The cart link shows the number of items in the cart (the sum of quantities), updating immediately.
- FR-NAV-3 MUST: The active page's link is visibly highlighted.
- FR-NAV-4 MUST: Unknown URLs redirect to the storefront.

### 5.2 Storefront and catalogue

- FR-CAT-1 MUST: The storefront has a page heading and the shelf-mapping notice (§4.3).
- FR-CAT-2 MUST: Products load from DummyJSON when the page opens.
- FR-CAT-3 MUST: While loading, a loading message is shown.
- FR-CAT-4 MUST: If the request fails, an error message and a **Try again** button are shown. Try again repeats the request.
- FR-CAT-5 MUST: If the API returns no products on the mapped shelves, a "catalogue is empty" message is shown.
- FR-CAT-6 MUST: Each product card shows the image (with alt text), name, price, shelf and original category, plus an **Add to cart** button.
- FR-CAT-7 MUST: Cards have a consistent size and layout regardless of image proportions or title length.

### 5.3 Search

- FR-SRCH-1 MUST: A search field filters products by name as the user types, with no page navigation.
- FR-SRCH-2 MUST: Matching is case-insensitive and matches full or partial names ("POD" matches "Monopod" and "Apple HomePod Mini Cosmic Grey").
- FR-SRCH-3 MUST: Leading and trailing spaces are ignored. An empty or whitespace-only field means "no name filter".

### 5.4 Shelf (category) filter

- FR-SHELF-1 MUST: A dropdown lists the shelves actually used: Books, Films, Records.
- FR-SHELF-2 MUST: It has a label that invites the user to choose a shelf. The default option, **All shelves**, shows every product.
- FR-SHELF-3 MUST: Choosing a shelf immediately shows only that shelf's products.

### 5.5 Price filter

- FR-PRICE-1 MUST: Two number fields, **Min price** and **Max price**, restrict the catalogue. Either can be left empty (no bound).
- FR-PRICE-2 MUST: Bounds are inclusive: a $9.99 product matches min = 9.99.
- FR-PRICE-3 MUST: Negative values are invalid.
- FR-PRICE-4 MUST: If min is greater than max, the range is invalid.
- FR-PRICE-5 MUST: When the range is invalid, a clear inline message explains the problem and the price filter is **not applied** until it is corrected. The other filters keep working.

### 5.6 Combined filtering

- FR-FILT-1 MUST: Search, shelf and price filters apply together (logical AND).
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
| API returned no shelf products | "The catalogue is empty" |
| Filters match nothing | "No products match your filters" + Reset filters |
| Invalid price range | Inline message under the price fields |
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

## 8. Acceptance criteria

Each criterion is testable by hand in the browser. Many are also covered by unit tests (see IMPLEMENTATION_GUIDE.md §10).

| ID | Given / When | Then |
|---|---|---|
| AC-1 | The storefront opens | "Loading products…" appears, then product cards from DummyJSON, Books first |
| AC-2 | The API is unreachable (e.g. offline) | An error message and a Try again button appear |
| AC-3 | Products are shown | Each card shows image, name, price, shelf and original category |
| AC-4 | Search = "iphone" | Only products with "iphone" in their name (any case) remain |
| AC-5 | Search = "Apple Airpods" (full name) | That product is shown |
| AC-6 | Shelf = Films | Only Films products are shown |
| AC-7 | Min = 10, Max = 50 | Only products priced 10–50 inclusive are shown |
| AC-8 | Min = 100, Max = 10 | An inline range error appears; the price filter is ignored |
| AC-9 | Search "a" + Shelf Books + Max 20 | Results satisfy all three conditions |
| AC-10 | Filters set, then Reset filters | All fields are cleared and the full catalogue returns |
| AC-11 | Search "zzzz" | "No products match your filters" appears |
| AC-12 | Add product P | Cart badge shows 1; P appears in the cart with quantity 1 |
| AC-13 | Add P again | P is one line with quantity 2; badge shows 2 |
| AC-14 | Click +1 on P | Quantity and subtotal increase; the total updates |
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

- The media shelves are a **stand-in mapping**, not real media data (§4.3). The products are kitchenware, phones, headphones, etc.
- The mapping depends on DummyJSON's category names. If DummyJSON renames a category, its products disappear from the shop until the mapping table is updated.
- All products are loaded once (78 mapped products); filtering happens in the browser. This would not scale to thousands of products. Server-side search would then be needed.
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
