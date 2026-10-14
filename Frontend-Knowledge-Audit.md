# Frontend Knowledge Audit

**Purpose:** Establish which frontend techniques appear in the course materials, so they can be used as strict constraints for a small ITS exercise.
**Audit date:** 2026-10-14
**Method:** Text and speaker notes were extracted from every slide of every deck, read-only, and read in full. Key diagram images were viewed. Nothing in the course folders was modified.
**Revision 2 (2026-10-14):** Your answers to the open questions are applied. §5 is now a tiered constraint set, §8 records the decisions, and §11 audits your personal notes PDF. The local toolchain was checked: Angular CLI 21.2.3, Node 24.21.0, Git 2.54.0.
**Revision 4 (final):** Decisions E–I and the optional-feature choices are recorded in §8.2b, which closes the audit.
**Revision 3 (2026-10-14):** Decisions A–D are recorded (§8.2). The CLI naming options were verified (§3.5.1). The brief-based scope proposal is in §11.5. New open items E–I are in §8.2b. No project has been generated and no application code has been written.

> **Important caveat.** This audit records what the **slides contain**. It does **not** assess what you understand or have practised. A technique marked "taught and demonstrated" means the slides explain it and show code for it. It does not mean you have mastered it. Exercises are listed as evidence that practice was *assigned*, not that it was completed.

---

## 1. Inventory of inspected materials

### 1.1 Folders

| Folder | Contents | Status |
|---|---|---|
| `ITS CORSI 25-26-27\JUST FRONTEND\SVILUPPO WEB BASE\` | 3 decks | Inspected |
| `ITS CORSI 25-26-27\JUST FRONTEND\SVILUPPO WEB AVANZATO\` | 5 decks | Inspected |
| `ITS CORSI 25-26-27\SVILUPPO WEB BASE\` | 3 decks | **Byte-identical duplicates** of the folder above (MD5 match); not re-read |
| `ITS CORSI 25-26-27\SVILUPPO WEB AVANZATO\` | 5 decks | **Byte-identical duplicates** of the folder above (MD5 match); not re-read |

### 1.2 Decks (8 unique files, 402 slides)

| Code | File | Slides | Course / author (from slides) | Language |
|---|---|---|---|---|
| **HTML** | `Corso HTML.pptx` | 98 | Sviluppo Web Base, DevLab Technologies © 2025 | EN |
| **JS-B** | `Corso Javascript_update.pptx` | 102 | Sviluppo Web Base, DevLab Technologies (Dario Lipari) | EN |
| **NG-B** | `Corso Angular.pptx` | 80 | Sviluppo Web Base (no author slide) | EN |
| **L1** | `ITS -Angular Lezione 1 - JavaScript.pptx` | 40 | Sviluppo Web Avanzato (Andrea Maestroni, Reti) | IT/EN |
| **L2** | `ITS -Angular Lezione 2 - Typescript.pptx` | 23 | Sviluppo Web Avanzato | IT |
| **L3** | `ITS -Angular Lezione 3 - Angular Recap.pptx` | 24 | Sviluppo Web Avanzato | IT |
| **L4** | `ITS -Angular Lezione 4 - Angular Recap.pptx` | 19 | Sviluppo Web Avanzato | IT |
| **L5** | `ITS -Angular Lezione 5 - RxJS Fondamenta.pptx` | 16 | Sviluppo Web Avanzato | IT |

References below use the form **`L3 s.15`**, meaning deck L3, slide 15.

### 1.3 Materials that do not exist

- **No CSS deck.** CSS appears only incidentally, inside the HTML deck and the Angular component-styling and forms slides.
- **No Git material** of any kind in the frontend folders.
- No search turned up any other CSS or Git slide files under `ITS CORSI 25-26-27`, `OneDrive - ITS Incom`, `Learning`, `Documents` or `Downloads`. **You have confirmed that Git was taught in other slides you have not provided** (see §8).
- **No Angular "Lesson 6"** exists anywhere under your user folder. The only "Lezione 6" files belong to the Cloud, BI and C# courses.

### 1.4 Additional files (revision 2)

| File | Status |
|---|---|
| `Downloads\appwebbappunti.pdf` (3 pages, 64.7 KB) | **Read and audited separately in §11.** These are personal notes, not official course material |
| `OneDrive - ITS Incom\Microsoft Teams Chat Files\appwebbappunti.pdf` | **Could not be read.** It is cloud-only and the OneDrive provider was not running. Same name, size (66,291 bytes) and date as the Downloads copy, so it is presumed identical, but this was not hash-verified |

---

## 2. Classification key

| Tag | Meaning | Criterion used |
|---|---|---|
| ✅ **TAUGHT** | Explicitly taught and demonstrated | Explained in prose **and** shown with a code example on a slide |
| ⚠️ **THIN** | Mentioned but not adequately covered | Named, listed in a table, or defined without a working example; **or** appears only inside exercise text; **or** shown only in a deck whose code contains errors or obsolete APIs |
| ❌ **ABSENT** | Unverified / out of scope | Not present in any slide |

---

## 3. Topic-by-topic knowledge map

### 3.1 HTML (source: HTML deck; minor reinforcement in JS-B and L1)

| Concept | Status | Evidence | Notes |
|---|---|---|---|
| Document skeleton: `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, `<body>` | ✅ | HTML s.3, s.6, s.35–36 | |
| Elements, start/end tags, empty elements (`<br>`) | ✅ | HTML s.4 | |
| Headings `h1`–`h6`, paragraphs `p` | ✅ | HTML s.8 | |
| Attributes (name="value") | ✅ | HTML s.9 | |
| Links `<a href>`, `target` (`_self`, `_blank`, `_parent`, `_top`) | ✅ | HTML s.24–26 | |
| Absolute vs relative URLs | ✅ | HTML s.11, s.27 | |
| Image links, `mailto:` | ✅ | HTML s.28 | |
| Bookmarks (`id` plus `href="#id"`) | ✅ | HTML s.29 | |
| Images `<img src alt width height>` | ✅ | HTML s.10, s.32–33 | |
| Favicon via `<link rel="icon">` | ✅ | HTML s.34–35 | |
| Text formatting (`b strong i em mark small del ins sub sup`) | ✅ | HTML s.20 | List plus a rendered screenshot |
| Comments `<!-- -->` | ✅ | HTML s.21–23 | |
| Tables (`table tr th td`, `colspan`, `caption`, vertical headers) | ✅ | HTML s.37–46 | `rowspan` is not shown |
| Lists `ul`, `ol`, `li` | ✅ | HTML s.47–48 | |
| Block vs inline; `div`, `span` | ✅ | HTML s.49–54 | |
| `class` attribute, multiple classes | ✅ | HTML s.55–58 | |
| `iframe` (incl. as link target) | ✅ | HTML s.59–60 | |
| `<script>` inline and external `src` | ✅ | HTML s.61–63; JS-B s.11–13; L1 s.7–8 | |
| Forms: `<form>`, `action`, `method` (GET/POST), `target`, `autocomplete` | ✅ | HTML s.64–77 | |
| `<label for>` paired with `id` | ✅ | HTML s.67–68 | Accessibility rationale given |
| Inputs: text, radio, checkbox, submit, button | ✅ | HTML s.66–71 | |
| `select` / `option` (`selected`, `size`, `multiple`) | ✅ | HTML s.79–80 | |
| `textarea`, `button type`, `fieldset`/`legend`, `datalist` | ✅ | HTML s.81–84 | |
| Input attributes: `value readonly disabled size maxlength min max multiple pattern placeholder required step autofocus height width` | ✅ | HTML s.86–98 | |
| Full list of input types (color, date, email, number, password, …) | ⚠️ | HTML s.85 | Listed only; no examples beyond `date`, `number`, `tel`, `file` |
| `<output>`, `<optgroup>` | ⚠️ | HTML s.78 | Named only |
| `<nav>` | ⚠️ | NG-B s.70; L4 s.7 | Used in Angular routing code; never explained as HTML |
| Semantic layout elements (`header`, `main`, `section`, `article`, `footer`, `aside`) | ❌ | — | |
| `<meta>` (charset, viewport) | ❌ | — | "meta information" mentioned in HTML s.3; no tags shown |
| Accessibility beyond `alt`, `label`, iframe `title` (ARIA, roles, focus management) | ❌ | — | |
| HTML slides 30 and 31 | — | HTML s.30–31 | **Empty** (layout only, no text or images) |

### 3.2 CSS (no dedicated material)

| Concept | Status | Evidence | Notes |
|---|---|---|---|
| Inline `style="property:value;"` | ✅ | HTML s.12–19 | |
| Properties: `background-color`, `color`, `font-family`, `font-size` (%), `text-align` | ✅ | HTML s.14–19 | |
| Colour formats: names, RGB, HEX, HSL, RGBA, HSLA | ⚠️ | HTML s.16–17 | Shown as screenshots; no syntax in text |
| `width`/`height` in % and px | ✅ | HTML s.39–42 | On tables |
| `<style>` block in `<head>` | ✅ | HTML s.53, s.56 | |
| Class selector `.city { … }` | ✅ | HTML s.56 | |
| Element selector `div { … }` | ✅ | HTML s.53 | |
| `border`, `margin`, `padding` | ⚠️ | HTML s.56 | Appear in one example; the box model is never explained |
| Centring a block with `margin: auto` | ✅ | HTML s.53 | |
| `display: block` vs inline (concept) | ⚠️ | HTML s.49–50; NG-B s.28 | Default display explained; the `display` property is used only in `:host` |
| Angular component styles: `styleUrls`, inline `styles`, encapsulation | ✅ | L3 s.11–12; NG-B s.27 | Encapsulation stated, not demonstrated |
| `:host`, `:host(.active)`, `:host-context(.theme-light)` | ⚠️ | NG-B s.28 | Base deck only |
| Angular form-state classes `ng-valid`, `ng-invalid`, `ng-touched`, `ng-dirty`, `ng-pristine`, `ng-untouched` | ✅ | NG-B s.40–41 (table image viewed) | |
| Attribute selector / `:not()` (`.ng-valid[required]`, `.ng-invalid:not(form)`) | ⚠️ | NG-B s.41 | Used, not explained |
| Media queries | ⚠️ | NG-B s.27 | Word only |
| Sass / Less / Stylus | ⚠️ | NG-B s.27; JS-B s.5 | Mentioned only |
| External stylesheet `<link rel="stylesheet">` | ❌ | — | |
| Specificity, cascade, inheritance | ❌ | — | |
| Box model, `box-sizing` | ❌ | — | |
| Flexbox, Grid, positioning | ❌ | — | |
| Responsive design | ❌ | — | |
| Pseudo-classes (`:hover`, `:focus`, …) | ❌ | — | Only `:host` and `:not` appear |
| CSS variables, transitions, animations | ❌ | — | L3 s.24 exercise asks for a "one-second flash" effect, but no technique is taught |
| **Bootstrap** classes (`form-control`, `form-group`, `alert alert-danger`, `btn btn-success`, `btn-default`) | ⚠️ | NG-B s.40–43 | Appear in code but Bootstrap is **never taught or installed**; listed only as a technology in JS-B s.5 |

### 3.3 JavaScript (sources: JS-B and L1; L1 is largely an Italian subset of JS-B)

| Concept | Status | Evidence |
|---|---|---|
| Where JS goes (head, body, external file) | ✅ | JS-B s.11–13; L1 s.7–8 |
| Output: `innerHTML`, `console.log`, `document.write`, `window.alert` | ✅ | JS-B s.14; L1 s.9 |
| DOM: `document.getElementById(...)`, `.innerHTML`, `.style.*`, `.src` | ✅ | JS-B s.10; HTML s.63 |
| Keywords table (`var let const if switch for function return try`) | ✅ | JS-B s.16; L1 s.10 |
| Comments, camelCase | ✅ | JS-B s.17 |
| Variables; string concatenation and type coercion | ✅ | JS-B s.18, s.20 |
| Block scope (`let`/`const` vs `var`) | ✅ | JS-B s.19, s.90; L1 s.14, s.34 |
| Function, global scope; implicit globals | ✅ | JS-B s.91–95; L1 s.35–36 |
| Hoisting, temporal dead zone | ✅ | JS-B s.96–98 (not in L1) |
| Strict mode `"use strict"` | ✅ | JS-B s.99–102; L1 s.37–38 |
| Operators: arithmetic, `+=`, comparison table (`==` vs `===`), ternary | ✅ | JS-B s.20–21; L1 s.11 |
| `typeof`, `instanceof` | ✅ | JS-B s.22, s.57; L1 s.12 |
| Dynamic types | ✅ | JS-B s.23; L1 s.13 |
| Strings: quotes, escapes | ✅ | JS-B s.43–45; L1 s.15 |
| Template literals `` `${x}` `` | ✅ | JS-B s.46 |
| Numbers, float precision, `NaN`, `Infinity` | ✅ | JS-B s.47–49; L1 s.16 |
| `Number()`, `parseInt()`, `parseFloat()` | ✅ | JS-B s.50 |
| `toFixed()` | ⚠️ | JS-B s.46 (inside a template-literal example) |
| Functions: declaration, parameters, return, `()` invocation | ✅ | JS-B s.25–29 |
| Self-invoking functions (IIFE) | ⚠️ | JS-B s.26 ("Automatically (self invoked)"); required in the JS-B s.72 exercise; **syntax never shown** |
| Objects: literal, dot/bracket access, methods | ✅ | JS-B s.24, s.30–32; L1 s.19–20 |
| `this` in its different contexts | ✅ | JS-B s.33–37; L1 s.21 |
| `call()`, `apply()`, `bind()` | ✅ | JS-B s.37–38, s.64 |
| `new String/Number/Boolean` (as anti-pattern) | ✅ | JS-B s.39 |
| Arrays: literal, index, `length`, `push`, `sort` (with compare fn), `reverse`, `concat`, `splice`, `indexOf`, `forEach`, `map`, `filter`, `every`, `some`, `find`, `entries` | ✅ | JS-B s.51–71; L1 s.17–18 (L1 covers `map` and lists others in notes) |
| `Math.max.apply` | ✅ | JS-B s.64 |
| `Array.reduce()` | ⚠️ | **Only in exercise** L1 s.40 ("usa reduce"); never taught |
| Conditions: `if`/`else`/`else if`/`switch` | ⚠️ | JS-B s.85; L1 s.30 — described in prose, **no code example** |
| Loops: `for`, `for…in`, `for…of`, `while`, `do…while` | ✅ | JS-B s.86; L1 s.31 |
| `Date`: constructors, months 0–11, ISO formats, `Date.parse`, getters/setters, `toString` variants | ✅ | JS-B s.73–81; L1 s.25–27 |
| `Math` constants and methods (`round ceil floor trunc pow sqrt abs random`) | ✅ | JS-B s.82–84; L1 s.28–29 |
| `Set` | ✅ | JS-B s.87; L1 s.32 |
| `Map`; Object vs Map comparison | ✅ | JS-B s.88–89; L1 s.33 |
| Inline HTML event attributes (`onclick`, `onchange`, `onmouseover`, `onmouseout`, `onkeydown`, `onload`) | ✅ | JS-B s.40–42; L1 s.22–23 |
| `addEventListener` | ⚠️ | **Only in exercise** L1 s.24 (point C); never taught |
| Custom DOM events | ⚠️ | **Only in exercise** L1 s.24 ("evento custom") |
| `document.createElement` / `appendChild` | ❌ | Exercises JS-B s.72, L1 s.24 and L1 s.39 require "a paragraph created specifically", **but no slide shows how** |
| `setTimeout` / `setInterval` | ⚠️ | Used in L2 s.12, L5 s.4 and the L1 s.40 exercise; never explained as a JS API |
| `Object.freeze` | ⚠️ | **Only in exercise** L1 s.40 |
| Object method shorthand `aggiungi() { }` | ⚠️ | **Only in exercise** L1 s.40 |
| `try`/`catch`/`throw` | ⚠️ | Keyword listed (JS-B s.16); no example |
| Arrow functions | ✅ | Taught in **TypeScript** deck L2 s.12 (`this` behaviour); used throughout L4/L5 |
| Promises, `async`/`await`, `fetch` | ⚠️ | `async`/`Promise<number>` signature L2 s.11; Promise vs Observable L5 s.3; `fetch` in passing L5 s.3, s.10. **No dedicated lesson** |
| Spread `...`, rest params, destructuring | ❌ | — |
| Optional chaining `?.` | ⚠️ | Used in L3 s.19 (`v?.trim()`, `changes['contatto']?.previousValue`); never explained |
| JS classes in plain JS | ❌ | Classes are taught only through TypeScript (L2) |
| ES modules in plain JS | ❌ | Taught only through TypeScript (L2 s.14) |
| JSON (`JSON.parse`/`stringify`) | ❌ | JSON responses mentioned (NG-B s.52); API not taught |
| `localStorage` / Web Storage | ❌ | — |
| `querySelector` and other DOM queries | ❌ | Only `getElementById` |

### 3.4 TypeScript (source: L2; reinforced in NG-B, L3–L5 code)

| Concept | Status | Evidence | Notes |
|---|---|---|---|
| What TS is, transpiling, benefits | ✅ | L2 s.1 | |
| Install: `npm install -g typescript` | ⚠️ | L2 s.2 | Command only; `tsc` is never shown |
| Basic types `boolean number string`; hex/binary literals | ✅ | L2 s.3 | |
| `any` vs `unknown` | ✅ | L2 s.3 | |
| Typed arrays `number[]` / `Array<number>` | ✅ | L2 s.4 | |
| Tuples | ✅ | L2 s.4 | |
| `enum` | ✅ | L2 s.4 | The slide itself says to use sparingly |
| `interface` (optional `?` props) | ✅ | L2 s.5 | |
| `type` alias | ✅ | L2 s.6 | |
| interface vs type comparison | ✅ | L2 s.7–8 | Declaration merging is mentioned, not shown |
| Union types and `typeof` narrowing | ✅ | L2 s.9 | |
| Intersection `&` | ✅ | L2 s.8 | |
| Function type alias `(v: number) => void` | ✅ | L2 s.8 | |
| Literal types / literal unions | ✅ | L2 s.10 | |
| Function parameter and return annotations | ✅ | L2 s.11 | |
| `async` function returning `Promise<T>` | ⚠️ | L2 s.11 | Signature only |
| Arrow functions and lexical `this` | ✅ | L2 s.12 | |
| Modules: `export`, `export default`, `import`, exporting types | ✅ | L2 s.14 | |
| Classes: constructor, `extends`, `super`, default params | ✅ | L2 s.15 | |
| `implements` (one or several interfaces) | ✅ | L2 s.16 | |
| Constructor parameter properties `constructor(public x: T)` | ✅ | L2 s.16; NG-B s.38 | |
| Access modifiers `public`/`private`/`protected`; `get`/`set` | ✅ | L2 s.17 | `protected` described, not demonstrated |
| `readonly`, optional class properties | ✅ | L2 s.18 | |
| Generics `<T>` | ✅ | L2 s.19 | |
| Generic constraints `K extends keyof T` | ✅ | L2 s.20 | |
| `strict`, `noImplicitAny`, `strictNullChecks` | ✅ | L2 s.21 | |
| `tsconfig.json` (`target`, `module`, `strict`, `outDir`) | ✅ | L2 s.22 | |
| `Record<K, V>` | ⚠️ | **Only in exercise** L2 s.13 | |
| Type predicates `obj is T` | ⚠️ | **Only in exercise** L2 s.13 | |
| Non-null assertion `!` (`contatto!`, `card!`, `get('nome')!`) | ⚠️ | L3 s.18, s.22; L5 s.2 | Used, never explained |
| Index signature `{[key: string]: any}` | ⚠️ | NG-B s.46, s.48 | Used, never explained |
| `abstract` classes | ⚠️ | NG-B s.63 | One code sample only |
| Utility types (`Partial`, `Pick`, `Omit`, …), decorators as a language feature, `satisfies`, `as const` | ❌ | — | Decorators are used through Angular only |

### 3.5 Angular

#### 3.5.1 Version and architecture context (read this first)

- The **advanced course creates projects with `ng new nome-progetto --standalone=false --routing`** (L3 s.17). All advanced Angular content is **NgModule-based**.
- The base deck (NG-B) is from an **older Angular generation**: `angular.io` links, the `HttpClientModule` / `HttpClientXsrfModule` era, class-based guards and interceptors, and RxJS 5-style `.tap()` / `.retry()` chaining.
- **Not covered anywhere:** standalone components, signals, the `inject()` function, the new control-flow syntax (`@if`, `@for`, `@switch`), `@defer`, functional guards/interceptors, and `provideHttpClient()`.
- L4 s.15 and L5 s.12 say "modern Angular" topics (typed Reactive Forms, `takeUntilDestroyed()`) will come in a **future lesson**. That lesson is not in the folder.

**Start command and toolchain (confirmed by you; checked locally)**

- Course start command: `ng new <nomeprogetto> --standalone=false --routing --zoneless=false`.
- `--zoneless=false` keeps zone.js-based change detection, which every slide example assumes. Zoneless change detection is **out of scope**.
- Installed CLI: **Angular CLI 21.2.3**. A `--dry-run` of the course command (nothing written to disk) generates:
  `src/main.ts`, `src/app/app-module.ts`, `src/app/app-routing-module.ts`, `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/app/app.spec.ts`, `src/styles.css`, `public/favicon.ico`.
- **Naming (decision B: follow the slides).** Verified against the installed CLI's own schematic code, without generating a project:
  - CLI 21 has an `ng new` option `--file-name-style-guide` with values `2025` (default) and `2016`.
  - A dry run of `ng new <name> --standalone=false --routing --zoneless=false --file-name-style-guide=2016` produces **slide-style file names**: `app.module.ts`, `app-routing.module.ts`, `app.component.ts` / `.html` / `.css` / `.spec.ts`.
  - The `2016` option also writes `angular.json` defaults so that later `ng generate` commands produce `*.component.ts`, `*.service.ts`, `*.directive.ts`, `*.pipe.ts` and `*.module.ts` files.
  - **Remaining differences from the slides:**
    1. The root component class is generated as `App`, not `AppComponent` (file `app.component.ts`; template hard-coded in CLI 21).
    2. The `2016` defaults set `addTypeToClassName: false`, so `ng g c contatti` creates `contatti.component.ts` with class **`Contatti`**, not `ContattiComponent`. The same applies to services (`ContattiService` becomes `Contatti`), which also produces a component and a service with the same class name. This is changeable by setting `addTypeToClassName: true` in `angular.json`, or by passing `--add-type-to-class-name` on each `ng generate`.
    3. `main.ts` uses `platformBrowser().bootstrapModule(AppModule)`, not `platformBrowserDynamic()` (L3 s.9). Same purpose, different import.
    4. The root component uses `signal()` for `title`, and the module adds `provideBrowserGlobalErrorListeners()` and `provideZoneChangeDetection()`. **Signals are not taught**, and the two providers are CLI boilerplate that is not taught. `provideZoneChangeDetection` is required by `--zoneless=false`.
    5. The root component uses `styleUrl` (singular) where the slides use `styleUrls` (array). Both are valid.
  - The options for closing these gaps are listed in §8.2 (item E). **Nothing will be generated until you choose.**
- **Compatibility notes for CLI 21.** These should be confirmed against the build warnings on your machine.
  - `HttpClientModule` (taught in L4 s.4) is deprecated in recent Angular versions in favour of `provideHttpClient()`. It still works.
  - `*ngIf` / `*ngFor` (taught in L3 s.16) are deprecated in recent versions in favour of `@if` / `@for`. They still work in 21.
  - Under the strict constraint, the **taught** forms remain the permitted ones. Deprecation warnings are expected and acceptable.

#### 3.5.2 Angular knowledge map

| Concept | Status | Evidence | Notes |
|---|---|---|---|
| Framework overview, SPA, history (AngularJS → Angular 2) | ✅ | L3 s.1–3; NG-B s.2 | |
| Building blocks: Template / Component / Service / Module | ✅ | L3 s.5; NG-B s.3 (architecture diagram viewed) | |
| CLI: `ng new … --standalone=false --routing` | ⚠️ | L3 s.17 | **Only CLI command in all slides.** `ng serve`, `ng generate`, `ng build` never appear |
| `@NgModule`: `declarations`, `imports`, `exports`, `providers`, `bootstrap` | ✅ | L3 s.6–8; NG-B s.4–6 | |
| Bootstrap via `platformBrowserDynamic().bootstrapModule(AppModule)` | ✅ | L3 s.9; NG-B s.7 | |
| `@Component`: `selector`, `templateUrl`/`template`, `styleUrls` | ✅ | L3 s.11; NG-B s.10 | |
| Component tree (parent/child templates) | ✅ | NG-B s.9 (diagram viewed) | |
| Lifecycle hooks `ngOnInit`, `ngOnDestroy` (with `implements`) | ✅ | L3 s.13; NG-B s.20 | |
| Other hooks: `ngOnChanges`, `ngDoCheck`, `ngAfterContentInit/Checked`, `ngAfterViewInit/Checked` | ⚠️ | L3 s.14; NG-B s.19 | Descriptive text only; `ngOnChanges` and `ngAfterViewInit` also get code (L3 s.19, s.22) |
| Interpolation `{{ }}` | ✅ | L3 s.15; NG-B s.12 (diagram viewed) | |
| Property binding `[prop]="…"` | ✅ | L3 s.15 | |
| Event binding `(event)="…"`, `$event` | ✅ | L3 s.15, s.20; NG-B s.36 | |
| Key-event filter `(keyup.enter)`, `(blur)` | ⚠️ | NG-B s.36 | Base deck, one line |
| Two-way binding `[(ngModel)]` (needs `FormsModule`) | ✅ | L3 s.15; L4 s.16 | |
| `*ngIf` | ✅ | L3 s.16; NG-B s.44 | `else` / `ng-template` are not shown |
| `*ngFor="let x of xs"` | ✅ | L3 s.16; NG-B s.22 | `index` and `trackBy` are not shown |
| `[ngClass]` (object syntax) | ✅ | L3 s.16 | |
| `ngStyle`, `ngSwitch` | ⚠️ | L3 s.16; NG-B s.14 | Named only |
| `[hidden]`, `[disabled]` property bindings | ✅ | NG-B s.41–43; L4 s.16–17 | |
| `@Input()`, aliased `@Input('alias')` | ✅ | L3 s.18; NG-B s.22 | |
| `@Input` setter (get/set) | ✅ | L3 s.19 | |
| `ngOnChanges(changes: SimpleChanges)` | ✅ | L3 s.19 | |
| `@Output()` + `EventEmitter<T>` + `.emit()` | ✅ | L3 s.20; NG-B s.24 | |
| Template reference variables `#ref` | ✅ | L3 s.21; NG-B s.36, s.39 | |
| `@ViewChild()` (available from `ngAfterViewInit`) | ✅ | L3 s.22; NG-B s.25 | |
| Component-interaction summary | ✅ | L3 s.23 | |
| Content projection `<ng-content>`, `@ContentChild` | ❌ | — | Mentioned only implicitly through `ngAfterContentInit` |
| Services: `@Injectable({ providedIn: 'root' })`, constructor DI | ✅ | L4 s.1–3; NG-B s.15 | |
| Service wraps `HttpClient`, returns `Observable<T>`; component subscribes in `ngOnInit` | ✅ | L4 s.4 | **Core pattern of the advanced course** |
| `HttpClientModule` registration | ✅ | L4 s.4; NG-B s.51 | |
| `http.get<T>()` | ✅ | L4 s.4; NG-B s.52 | |
| `http.post()` with body | ⚠️ | NG-B s.56; mentioned L4 s.4; required in L5 s.9 exercise | Base-deck code only |
| `put`, `delete` | ⚠️ | L4 s.4 | Named only |
| HTTP error callback, `HttpErrorResponse` | ⚠️ | NG-B s.53–54 | Base deck only; uses the deprecated two-callback `subscribe(next, err)` form |
| `HttpHeaders`, `HttpParams`, `responseType: 'text'` | ⚠️ | NG-B s.55, s.57 | Base deck only |
| HTTP interceptors (`HttpInterceptor`, `HTTP_INTERCEPTORS`, `req.clone`) | ⚠️ | NG-B s.58–63 | Base deck only; contains obsolete or incorrect code (see §6) |
| Upload progress events, XSRF | ⚠️ | NG-B s.64–65 | Base deck only; conceptual |
| Routing: `Routes`, `RouterModule.forRoot`, `AppRoutingModule` | ✅ | L4 s.5; NG-B s.66 | |
| Route params `:id`, default `''` + `redirectTo` + `pathMatch: 'full'`, wildcard `**`, first-match order | ✅ | L4 s.6; NG-B s.67–69 | |
| `routerLink`, `routerLinkActive`, `<router-outlet>` | ✅ | L4 s.7; NG-B s.70 | |
| `[routerLink]="['/hero', id]"` (array form) | ⚠️ | NG-B s.75 | Base deck only |
| `Router.navigate([...])`, `navigateByUrl()` | ✅ | L4 s.8–9 (s.9 duplicates s.8) | `navigateByUrl` is described, not shown |
| `ActivatedRoute`: `snapshot.paramMap.get()` vs `paramMap.subscribe()` (and why) | ✅ | L4 s.10; NG-B s.75 | |
| `ActivatedRoute` properties table (`url`, `data`, `queryParamMap`, `fragment`, …) | ⚠️ | NG-B s.71 | Table only |
| Route `data`, optional/matrix params | ⚠️ | NG-B s.67–68, s.76 | Base deck only |
| Feature module + `RouterModule.forChild` + lazy `loadChildren` | ✅ | L4 s.11; NG-B s.73–74 | |
| Route guards (`CanActivate`, `CanDeactivate`, `Resolve`, `CanLoad`, `CanActivateChild`) | ⚠️ | NG-B s.77–79 | Base deck only; class-based `CanActivate` example (deprecated API) |
| `enableTracing`, `Router.events` | ⚠️ | NG-B s.66, s.69, s.72; L5 s.2 | |
| Built-in pipes: `date`, `currency`, `uppercase`, `lowercase`, `percent`; parameters; chaining | ✅ | L4 s.13; NG-B s.32–33 | |
| Custom pipe `@Pipe` + `PipeTransform.transform()` | ✅ | L4 s.14; NG-B s.33 | |
| Pure vs impure pipes | ⚠️ | NG-B s.34 | Conceptual only |
| `async` pipe | ❌ | — | **Never mentioned.** All examples subscribe manually |
| Template-driven forms: `FormsModule`, `name` attribute, `#f="ngForm"`, `(ngSubmit)`, `[disabled]="!f.form.valid"` | ✅ | L4 s.16; NG-B s.37–43 | |
| Control state (`valid`, `pristine`, `dirty`, `touched`) and `#name="ngModel"` | ✅ | NG-B s.41–45 | Base deck |
| Validation attributes (`required`, `minlength`) and error display `name.errors.required` | ✅ | NG-B s.44–45 | Base deck |
| `form.reset()` | ⚠️ | NG-B s.42 | One line |
| Custom validator function + directive (`NG_VALIDATORS`) | ⚠️ | NG-B s.46–49 | Base deck only |
| Reactive forms: `FormGroup`, `FormControl`, `Validators.required`, `[formGroup]`, `formControlName` | ⚠️ | L4 s.17–18 | The slide says "Oggi ne vediamo solo una panoramica" (overview only today). `ReactiveFormsModule` import is **never shown** |
| `valueChanges` on a form control | ⚠️ | L5 s.2, s.6–7 | Used inside RxJS examples |
| `FormBuilder`, `FormArray`, typed forms | ❌ | — | Typed forms are deferred to a future lesson (L4 s.15) |
| Custom attribute directive (`@Directive`, `ElementRef`, `@HostListener`, `@Input` alias) | ⚠️ | NG-B s.29–31 | Base deck only; selector typo `appHightlight` vs `appHighlight` |
| Component styles, `:host` | ⚠️ | see §3.2 | |
| Dynamic forms | ⚠️ | NG-B s.50 | One sentence |
| Keeping Angular up to date (`ng update` guide) | ⚠️ | NG-B s.80 | Links only |
| Testing (unit/e2e) | ❌ | — | |
| Environments, build/deploy | ❌ | — | |
| State management libraries (NgRx etc.) | ❌ | — | |

### 3.6 RxJS (source: L5; minor appearances in NG-B, L4)

| Concept | Status | Evidence | Notes |
|---|---|---|---|
| Why RxJS; streams; Angular uses Observables | ✅ | L5 s.1–2 | |
| Observable vs Promise (lazy/eager, cancellable, multi-value) | ✅ | L5 s.3 | |
| `subscribe()`, `Subscription`, `unsubscribe()`, `.add()` grouping | ✅ | L5 s.4 | |
| `pipe()` with `map`, `filter`, `tap` | ✅ | L5 s.5 | |
| `debounceTime`, `distinctUntilChanged` | ✅ | L5 s.6 | |
| `switchMap` vs `mergeMap` | ✅ | L5 s.7 | |
| `concatMap` vs `exhaustMap` | ✅ | L5 s.8 | |
| Creation: `of`, `from` | ✅ | L5 s.10 | |
| Creation: `interval`, `timer`, `fromEvent` | ✅ | L5 s.11 | |
| Memory leaks; unsubscribe in `ngOnDestroy` via a `Subscription` bag | ✅ | L5 s.12 | |
| `Subject`, `BehaviorSubject` | ✅ | L5 s.13 | |
| `ReplaySubject(N)` | ✅ | L5 s.14 | |
| `AsyncSubject` | ⚠️ | L5 s.14 | One sentence |
| Cold vs hot; HttpClient is cold | ✅ | L5 s.15; NG-B s.56 | |
| `share()` | ⚠️ | L5 s.15 | Named only |
| `retry()` | ⚠️ | NG-B s.55 | Base deck; **syntactically wrong** (`.pipe(.retry(3))`) |
| `$` suffix naming convention (`dati$`, `hero$`) | ⚠️ | L5 s.3, s.15; NG-B s.75 | Used, never stated as a convention |
| `takeUntilDestroyed()` | ⚠️ | L5 s.12 | "We will see it in the next lesson." **Not in folder** |
| `catchError`, `finalize`, `takeUntil`, `take`, `startWith`, `combineLatest`, `forkJoin`, `scan` | ❌ | — | |
| `async` pipe in templates | ❌ | — | |
| Observer object form `subscribe({ next, error, complete })` | ❌ | — | |

### 3.7 Git

| Concept | Status | Evidence |
|---|---|---|
| Any Git concept (init, clone, add, commit, branch, merge, push, pull, `.gitignore`, GitHub, PRs) | ❌ in these slides | **No slide in any frontend deck mentions Git** |

**Revision 2:** You state that Git was taught in other slides (not provided), and that it **must** be part of the exercise. Git is therefore **permitted by your decision, not by audit evidence**. The permitted commands are listed in §5, Tier B.

Two related facts:
- `ng new` initialises a Git repository and makes an initial commit unless `--skip-git` is passed. The generated `.gitignore` was confirmed in the dry run.
- Git 2.54.0 is installed locally.

### 3.8 Tooling and workflow

| Concept | Status | Evidence |
|---|---|---|
| npm global install | ⚠️ | L2 s.2 (`npm install -g typescript`) |
| TypeScript Playground | ⚠️ | L2 s.13 (URL in exercise) |
| Angular CLI `ng new` | ⚠️ | L3 s.17 (single command) |
| Browser DevTools Network tab | ⚠️ | L5 s.9 (exercise tip) |
| StackBlitz | ⚠️ | NG-B s.61, s.72 (links) |
| `ng serve` / `ng generate` / `ng build` / `package.json` / `angular.json` | ❌ | — |
| Debugging, linting, formatting | ❌ | — |

---

## 4. Relevant syntax found in the slides

These examples are copied from the slides (lightly trimmed) so the exercise can quote the exact idioms you were shown.

**HTML form with label and validation attributes** — HTML s.93–95
```html
<label for="username">Username:</label>
<input type="text" id="username" name="username" required>
<input type="text" id="country_code" name="country_code" pattern="[A-Za-z]{3}" title="Three letter country code">
```

**CSS in a `<style>` block with a class selector** — HTML s.56
```css
.city { background-color: tomato; color: white; border: 2px solid black; margin: 20px; padding: 20px; }
```

**JS array callbacks (named-function style used throughout JS-B)** — JS-B s.65–66
```js
const over18 = numbers.filter(myFunction);
function myFunction(value) { return value > 18; }
```

**TypeScript literal-union type and narrowing** — L2 s.9–10
```ts
type StatoRichiesta = "loading" | "success" | "error";
function stampaId(id: string | number) {
  if (typeof id === "string") { console.log(id.toUpperCase()); } else { console.log(id.toFixed(0)); }
}
```

**TS class with parameter properties and `implements`** — L2 s.16
```ts
class Prodotto implements Descrivibile {
  constructor(public nome: string, public prezzo: number) {}
  descrivi(): string { return `${this.nome} - ${this.prezzo}€`; }
}
```

**Angular component** — L3 s.11
```ts
@Component({ selector: 'app-contatti', templateUrl: './contatti.component.html', styleUrls: ['./contatti.component.css'] })
export class ContattiComponent { titolo = 'Rubrica'; }
```

**Template bindings and directives** — L3 s.15–16
```html
<h2>{{ titolo }}</h2>
<img [src]="fotoUrl">
<button (click)="aggiungiContatto()">Aggiungi</button>
<input [(ngModel)]="nomeContatto">
<p *ngIf="contatti.length === 0">Nessun contatto</p>
<li *ngFor="let c of contatti">{{ c.nome }}</li>
<div [ngClass]="{ attivo: isAttivo }">...</div>
```

**@Input / @Output** — L3 s.18, s.20
```ts
@Input() contatto!: { nome: string };
@Input('etichetta') testoRuolo = '';
@Output() elimina = new EventEmitter<number>();
rimuovi() { this.elimina.emit(this.contatto.id); }
```
```html
<app-contatto-card [contatto]="c" (elimina)="rimuoviContatto($event)"></app-contatto-card>
```

**Service plus HttpClient, consumed in a component** — L4 s.4
```ts
@Injectable({ providedIn: 'root' })
export class ContattiService {
  constructor(private http: HttpClient) {}
  getContatti(): Observable<Contatto[]> { return this.http.get<Contatto[]>('api/contatti'); }
}
export class ContattiComponent implements OnInit {
  contatti: Contatto[] = [];
  constructor(private svc: ContattiService) {}
  ngOnInit() { this.svc.getContatti().subscribe(d => this.contatti = d); }
}
```

**Routing with params, redirect and wildcard** — L4 s.6–7, s.10
```ts
const routes: Routes = [
  { path: 'contatti/:id', component: DettaglioComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: '', redirectTo: '/contatti', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
this.route.paramMap.subscribe(params => { const id = params.get('id'); /* ... */ });
```

**Template-driven form** — L4 s.16
```html
<form #contattoForm="ngForm" (ngSubmit)="salva()">
  <input name="nome" required [(ngModel)]="contatto.nome">
  <button type="submit" [disabled]="!contattoForm.form.valid">Salva</button>
</form>
```

**Custom pipe** — L4 s.14
```ts
@Pipe({ name: 'exponentialStrength' })
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent = 1): number { return Math.pow(value, exponent); }
}
```

**RxJS search pattern** — L5 s.6–7
```ts
campoRicerca.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(termine => this.api.cerca(termine))
).subscribe(risultati => this.risultati = risultati);
```

**Subscription cleanup** — L5 s.12
```ts
private subscription = new Subscription();
ngOnInit() { this.subscription.add(interval(1000).subscribe(n => console.log(n))); }
ngOnDestroy() { this.subscription.unsubscribe(); }
```

**BehaviorSubject shared state** — L5 s.13
```ts
const behavior = new BehaviorSubject<number>(0);
behavior.next(5);
```

---

## 5. Explicitly permitted techniques (proposed constraint set)

**Revision 2: the constraint set has four tiers.**

| Tier | Meaning | Rule |
|---|---|---|
| **A** | Slide-verified (✅ in §3), from **both** the base and advanced courses | Use freely |
| **B** | Authorised by you **without slide evidence** (Git, basic CSS) | Use freely, but mark it as "user-authorised, not slide-verified" |
| **C** | Conditional | Use **only if the assignment explicitly requires it**. Some items also need your approval first (marked 🔒) |
| **D** | Everything else (§7, plus ⚠️ items not listed in Tier C) | Excluded. If the assignment forces one, **explain it, flag it as beyond the verified scope, and ask for approval before using it** |

### Tier A: slide-verified (both courses)

Both courses are in scope (your decision). Where the base deck (NG-B) and the advanced course (L3–L5) teach the same thing, **the advanced-course form is used**, because NG-B contains obsolete APIs and code errors (§6).

**Project setup**
- An NgModule-based Angular project created with the confirmed course command `ng new <nomeprogetto> --standalone=false --routing --zoneless=false`. It has an app module and a routing module, bootstrapped via `platformBrowserDynamic().bootstrapModule()`.

**HTML**
- Document structure, headings, paragraphs, links, images (with `alt`), lists, tables (`th`, `colspan`, `caption`), `div`/`span`, `class`/`id`.
- Forms with `label for`, `input` (text/radio/checkbox/number/date/submit), `select`/`option`, `textarea`, `button type`, `fieldset`/`legend`, and the attributes `required`, `min`, `max`, `maxlength`, `pattern`, `placeholder`, `disabled`, `readonly`.

**CSS** (deliberately minimal, because no CSS course exists)
- `<style>`/component `.css` files with **class and element selectors only**.
- Properties shown: `color`, `background-color`, `font-family`, `font-size`, `text-align`, `width`, `height`, `margin` (incl. `auto`), `padding`, `border`.
- Angular `ng-valid` / `ng-invalid` / `ng-touched` / `ng-dirty` state classes.
- Toggling classes with `[ngClass]`.

**JavaScript**
- `let`/`const`, scope, strict equality, template literals, functions, objects and methods, `this`, arrays with `push`, `sort`, `map`, `filter`, `find`, `some`, `every`, `forEach`, `indexOf`, `splice`, `concat`.
- `for`, `for…of`, `while`; `Date` and `Math`; `Set` and `Map`.

**TypeScript**
- Typed variables, parameters and returns; `interface` and `type`; union and literal types; `typeof` narrowing.
- Optional `?`, `readonly`, classes with constructor parameter properties, `private` with `get`.
- Generics at the level of `Observable<T>` / `http.get<T>()`; ES module `import`/`export`; arrow functions.
- **No `any`** (an explicit rule in the L2 s.13 and s.23 exercises).

**Angular**
- Components with `selector` / `templateUrl` / `styleUrls`.
- Interpolation, property binding, event binding, `$event`, `[(ngModel)]` with `FormsModule`.
- `*ngIf`, `*ngFor`, `[ngClass]`, `[disabled]`.
- `@Input` (incl. alias and setter), `@Output` + `EventEmitter`, `ngOnChanges`, template reference variables, `@ViewChild` + `ngAfterViewInit`.
- `ngOnInit` / `ngOnDestroy`.
- `@Injectable({ providedIn: 'root' })` services with constructor injection.
- `HttpClientModule` + `http.get<T>()` returning `Observable<T>` from a service.
- Routing with `Routes`, `forRoot`, `:id`, `redirectTo` + `pathMatch: 'full'`, `**`, `routerLink`, `routerLinkActive`, `<router-outlet>`, `Router.navigate()`, `ActivatedRoute.paramMap.subscribe()`.
- Feature module with `forChild` + lazy `loadChildren`.
- Built-in pipes (`date`, `currency`, `uppercase`, `lowercase`, `percent`) and a custom `@Pipe`.
- Template-driven forms (`#f="ngForm"`, `(ngSubmit)`, `name` attribute, `required`).

**RxJS**
- `subscribe`/`unsubscribe`, `Subscription.add()`, cleanup in `ngOnDestroy`.
- `pipe` with `map`, `filter`, `tap`, `debounceTime`, `distinctUntilChanged`, `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`.
- `of`, `from`, `interval`, `timer`, `fromEvent`.
- `Subject`, `BehaviorSubject`, `ReplaySubject`.

**Observable usage (decision 8: the simplest pattern the slides show)**
- **HTTP calls:** subscribe in `ngOnInit` (or in an event handler) and assign the result, as in L4 s.4. HTTP Observables complete on their own (L5 s.4), so **no unsubscribe or `ngOnDestroy` is needed** for them. This is the default.
- **Never-completing streams** (`valueChanges`, `interval`, `fromEvent`, `Subject`/`BehaviorSubject`): use them only if the assignment needs them. If one is used, the cleanup pattern (a `Subscription` bag unsubscribed in `ngOnDestroy`) **is slide-verified** (L5 s.4, s.12; L3 s.13; NG-B s.20). Each use must still be flagged in the exercise so you can confirm you are comfortable with it.
- The `async` pipe and `takeUntilDestroyed()` are **Tier D** (not taught; Lesson 6 unavailable).

**Error handling (decision 7: basic only)**
- Use the error callback of `subscribe` as shown in NG-B s.53, with a simple message or flag on the component (e.g. `errore = true`, shown with `*ngIf`).
- This multi-argument `subscribe(next, error)` form still works but is deprecated in current RxJS. The `{ next, error }` observer-object form is **not taught**, so it is Tier D.
- `catchError`, `retry`, interceptors and global error handlers are excluded.

**Data source (decision 12):** DummyJSON (`https://dummyjson.com`), as in L4 s.12 and L5 s.9, when the assignment needs remote data. Otherwise use a local array for purely frontend behaviour. No other API or backend without approval.

### Tier B: user-authorised, not slide-verified

**Git (decision 1: basic only)**
- Allowed: `git init`, `git clone`, `git status`, `git add`, `git commit`, `git push`, `git pull`, `git branch`, `git checkout` / `git switch`, `git diff`.
- Not allowed: rebase, cherry-pick, stash, tags, submodules, hooks, merge-conflict workflows, PR/review processes, Git Flow.
- `ng new` already runs `git init` and an initial commit.

**CSS (decision 2: basic CSS plus the techniques in the slides; no frameworks)**

"Basic CSS" is not defined anywhere in the materials. The following set was **confirmed by you (decision A)**:
- Selectors: element, class, id, descendant (`.card p`), grouping (`h1, h2`).
- Colour and typography: `color`, `background-color`, `font-family`, `font-size`, `font-weight`, `text-align`.
- Spacing and size: `margin`, `padding`, `border`, `border-radius`, `width`, `height`, `max-width`.
- `display: block | inline | inline-block | none`.
- Simple states: `:hover`, `:focus`.
- Global `src/styles.css` plus per-component `.css` files.
- **Bootstrap is allowed (decision A, revision 3).** Its class names appear in NG-B s.40–43 (`form-control`, `form-group`, `alert alert-danger`, `btn btn-*`), but it was **never taught or installed in any slide**. It is therefore user-authorised, not slide-verified.
  - Installing it means adding the `bootstrap` npm package and referencing its CSS in `angular.json` → `styles`. This is a tooling step not shown in the slides; it will be shown to you before it is done.
  - Default: **Bootstrap CSS only.** Bootstrap's JavaScript components (modals, dropdowns, collapse) need its JS bundle and are excluded unless you approve them.
  - Keep CSS simple: Bootstrap utility and layout classes plus the basic CSS above.

### Tier C: conditional

| Technique | Condition | Approval needed? |
|---|---|---|
| `http.post()` with a body | Only if the assignment requires sending data (L5 s.9 already needs it) | No (decision 6) |
| `http.put()` / `http.delete()` | Only if the assignment requires them. **The brief's "crud" requires them** | ✅ Approved (revision 3) |
| Reactive forms (`FormGroup`, `FormControl`, `ReactiveFormsModule`) | Only if template-driven forms cannot satisfy the requirement | 🔒 Yes (decision 5) |
| Responsive layout: Bootstrap grid (`container`/`row`/`col-*`), or hand-written flexbox/grid/media queries | **Optional feature** (§11.5). Bootstrap's grid is the lower-cost route now that Bootstrap is allowed | 🔒 Yes (optional; never taught) |
| Delete confirmation (`window.confirm()` or a custom dialog component) | **Optional feature** (§11.5). The brief says "deve"; open item H. Only `alert` was taught | 🔒 Yes |
| Icons | **Optional feature** (§11.5) | 🔒 Yes |
| Any other new concept | Only to satisfy an explicit requirement. Explain it first and flag it as beyond scope | 🔒 Yes (decision 4) |

---

## 6. Techniques mentioned but insufficiently covered

These appear in the slides but should **not** be assumed safe without confirmation.

| Technique | Why insufficient | Source |
|---|---|---|
| Reactive forms (`FormGroup`, `FormControl`, `formControlName`, `Validators`) | The slide calls it an overview; `ReactiveFormsModule` import never shown | L4 s.15–18 |
| `http.post` / `put` / `delete` | Only named in the advanced course; POST shown in the old base deck; POST required by the L5 s.9 exercise | L4 s.4; NG-B s.56 |
| HTTP error handling | Base deck only, uses the deprecated two-callback `subscribe` form | NG-B s.53–54 |
| Interceptors, guards, XSRF, progress events | Base deck only; old class-based APIs | NG-B s.58–65, s.77–79 |
| Custom attribute directives / `@HostListener` | Base deck only | NG-B s.29–31 |
| Custom validators (`NG_VALIDATORS`) | Base deck only | NG-B s.46–49 |
| `ngStyle`, `ngSwitch` | Named only | L3 s.16; NG-B s.14 |
| Lifecycle hooks other than `ngOnInit`, `ngOnDestroy`, `ngOnChanges`, `ngAfterViewInit` | Description only | L3 s.14; NG-B s.19 |
| `:host`, `:host-context` | Base deck only | NG-B s.28 |
| Pure/impure pipes | Concept only | NG-B s.34 |
| `if`/`else`/`switch` in JS | Prose only, no code (though trivially familiar) | JS-B s.85; L1 s.30 |
| IIFE (self-invoking function) | Required in an exercise, syntax never shown | JS-B s.26, s.72 |
| `addEventListener`, custom events | Exercise only | L1 s.24 |
| `Array.reduce`, `Object.freeze`, object method shorthand | Exercise only | L1 s.40 |
| `setTimeout`/`setInterval` | Used in examples, never explained | L2 s.12; L5 s.4 |
| Promises / `async`–`await` / `fetch` | Contrasted with Observables; no lesson | L2 s.11; L5 s.3, s.10 |
| `try`/`catch` | Keyword only | JS-B s.16 |
| Optional chaining `?.`, non-null `!`, index signatures | Used, never explained | L3 s.18–19, s.22; L5 s.2; NG-B s.46 |
| `Record<K,V>`, type predicates `x is T` | Exercise only | L2 s.13 |
| `AsyncSubject`, `share()`, `retry()` | Named or one line | L5 s.14–15; NG-B s.55 |
| `takeUntilDestroyed()` | Promised for the next lesson | L5 s.12 |
| Bootstrap CSS classes | In code samples, never taught | NG-B s.40–43 |
| Colour formats, box-model properties, media queries | Screenshot or one-word mention | HTML s.17, s.56; NG-B s.27 |
| Angular CLI | Only `ng new` appears | L3 s.17 |

### Reliability problems in the base Angular deck (NG-B)

These are reasons not to treat NG-B code as authoritative syntax.

- s.29–30: selector `appHighlight` vs attribute `appHightlight` (typo, would not match).
- s.38 vs s.42: `Ranking: string` but called with `new DetailModel(100, '', '', 1)` (number).
- s.41: `name. valid` (stray space).
- s.55: `.pipe(.retry(3))`, which is invalid syntax.
- s.63: `next.handle(req).tap(...)`, the obsolete RxJS 5 patch-operator style; class name typo `ICachingnterceptor`.
- s.75: `this.service.getHero(id));` (extra parenthesis).
- Mixed curly quotes (`'…’`) in several code samples (s.6–7, s.30, s.52, s.57, s.67, s.79). These would not compile if copied.

### Inconsistencies in the advanced decks

- L4 s.10 declares `contatto: any`, which contradicts the "no `any`" rule of the L2 exercises.
- L4 s.12 uses **DummyJSON**, while L4 s.19 refers to **FakeStoreAPI** for the same exercise.
- L4 s.8 and s.9 are duplicate slides.

---

## 7. Unverified or out-of-scope techniques

None of these appear in the materials. Under a strict constraint they should be **excluded** from the exercise.

- **Angular (modern):** standalone components, signals (`signal`, `computed`, `effect`), `inject()`, `@if`/`@for`/`@switch` control flow, `@defer`, functional guards/interceptors, `provideHttpClient`, `provideRouter`, typed forms, `FormBuilder`, `FormArray`.
- **Angular (general):** `async` pipe, `<ng-content>` / content projection, `ng-template` / `ng-container`, `*ngFor` `trackBy`/`index`, `*ngIf … else`, resolvers in practice, environments, unit/e2e testing, Angular Material, NgRx or any state library.
- **RxJS:** `catchError`, `finalize`, `takeUntil`, `take`, `startWith`, `scan`, `combineLatest`, `forkJoin`, `withLatestFrom`, observer-object `subscribe({next, error})`.
- **CSS:** external `<link rel="stylesheet">`, flexbox, grid, positioning, box model / `box-sizing`, specificity, pseudo-classes beyond `:host` and `:not`, responsive design, CSS variables, transitions/animations, any CSS framework.
- **HTML:** semantic layout elements, `<meta>` (viewport/charset), ARIA.
- **JavaScript:** spread/rest, destructuring, `querySelector`, `createElement`/`appendChild`, JSON API, Web Storage, plain-JS classes and modules.
- **TypeScript:** utility types, `as const`, `satisfies`, decorators as a language feature.
- **Git:** everything.
- **Tooling:** `ng serve`, `ng generate`, `ng build`, `package.json` scripts, linting/formatting, debugging workflow.

---

## 8. Decisions and remaining open items

### 8.1 Decisions recorded (revision 2)

| # | Topic | Your decision | Effect on constraints |
|---|---|---|---|
| 1 | Git | Taught in other slides (not provided); **must** be in the exercise. Basic only: init/clone, status, add, commit, push, pull, branches, checkout/switch, diff | Tier B (§5) |
| 2 | CSS | **Must** be in the exercise. Basic CSS plus the slide techniques; no frameworks | Tier B; proposed "basic" list awaits confirmation (8.2 A) |
| 3 | Course scope | **Both** Sviluppo Web Base and Avanzato are included | Tier A covers ✅ items from all 8 decks; the advanced-course form wins on overlap |
| 4 | Angular start command | `ng new <nomeprogetto> --standalone=false --routing --zoneless=false` | NgModule-based, zone.js; standalone, signals, new control flow and zoneless are excluded |
| 4b | New concepts | Only when an explicit assignment requirement needs them: explain, flag as beyond scope, ask approval | Tier C/D rule |
| 5 | Reactive forms | Prefer template-driven; reactive only if necessary and approved | Tier C 🔒 |
| 6 | HTTP writes | POST only if required; PUT/DELETE only if required **and** approved | Tier C |
| 7 | Error handling | Basic, course-appropriate only | Error callback in `subscribe` (NG-B s.53); nothing advanced |
| 8 | Observables / `async` pipe | Prefer slide-demonstrated patterns; simplest solution; flag unverified concepts | HTTP: subscribe, no cleanup needed (L4 s.4, L5 s.4). Long-lived streams only if needed, flagged. `async` pipe excluded |
| 9 | Lesson 6 | Unavailable unless found | **Searched; not found.** `takeUntilDestroyed()` is not taught |
| 10 | Notes PDF | Include only if accessible; keep separate from official material | **Found and read**, audited in §11 |
| 11 | Exercises | Nothing assumed completed | Checklist in 8.3; nothing promoted |
| 12 | Data source | DummyJSON if it fits; otherwise local array; nothing else without approval | Tier A data-source rule |

**Conflict resolved:** Your pasted answer to question 3 said "allow only the advanced-course material verified in the audit". Your own message said both courses must be included. This revision follows **your own message (both courses)**, but keeps base-deck-only topics with obsolete or erroneous code (interceptors, class guards, custom validators, attribute directives) out of Tier A. **Please confirm this reading** (8.2 C).

**Clarification on decision 8:** You asked not to assume the manual `subscribe` + `ngOnDestroy` cleanup pattern without verification. It **is** verified in the slides: L3 s.13 (`ngOnDestroy` with "unsubscribe, timer fermati"), L5 s.4 (`Subscription`, `.add()`, `unsubscribe()`) and L5 s.12 (full component example). It is still only needed for streams that never complete, so the default HTTP pattern avoids it entirely.

### 8.2 Decisions recorded (revision 3)

| ID | Decision | Effect |
|---|---|---|
| **A** | Basic CSS list accepted; keep CSS simple; **Bootstrap allowed** | §5 Tier B updated (Bootstrap CSS only by default) |
| **B** | Follow the **slide naming** (`contatti.component.ts`, `app.module.ts`) where technically compatible. Verify before generating; do not silently adopt the CLI default | Verified (§3.5.1): `--file-name-style-guide=2016` gives slide-style **file names**. Class-name differences remain; see item E |
| **C** | Both courses are Tier A when demonstrated; the advanced version wins on overlap. Base-only topics (interceptors, route guards, etc.) are excluded unless you approve them. Nothing counts as practised until the exercise is confirmed | §5 confirmed; §8.3 checklist still open |
| **D** | `appwebbappunti.pdf` is the **project brief**. Separate required functionality from "ipotesi" ideas, and get scope approval before implementing | Scope proposal in §11.5 |
| — | **PUT and DELETE authorised**; POST authorised | §5 Tier C updated |
| — | Header, list, contact cards, data service and `@Input`/`@Output` communication are included. Responsive layouts, grid/list switching, confirm dialogs and icons are **optional**, not automatic | §11.5 |

### 8.2b Final decisions (revision 4, audit closed)

| ID | Decision |
|---|---|
| E | Use the 2016 file-name style. Set `addTypeToClassName: true` for component/directive/service in `angular.json`. Rename the root class `App` to `AppComponent` (3 files) |
| F | Replace `title = signal('…')` with a plain property `title = '…'` |
| G | DummyJSON is used for loading and searching. Writes (POST/PUT/DELETE) are sent, but the result is kept **in memory only**; Refresh or a page reload discards local changes. No backend or storage |
| H | Delete confirmation is **required**, using `window.confirm()`. **Not taught in the slides** (only `alert`, JS-B s.14) |
| I | Debounce search is kept (the brief lists it). **Implementation check:** the slides show `debounceTime` on a reactive-form `valueChanges` (L5 s.6) and `Subject.next()` (L5 s.13), but **never the two combined**. The combination `Subject` → `.pipe(debounceTime(…))` → `subscribe` is built from two demonstrated pieces, not copied from a slide. `distinctUntilChanged` and `switchMap` are taught (L5 s.6–7) but **not required** by the brief, so they are not used |
| O1 | **Included:** a simple responsive layout using Bootstrap grid classes. Bootstrap is authorised (A) and the brief lists desktop/mobile/tablet targets |
| O3 | **Included** (same as H) |
| O2, O4, O5, O6 | **Excluded.** Plain text buttons, no icon library. O6 stays excluded until it is clarified |
| "Doppia gerarchia" | Not implemented; ask only if it turns out to be mandatory |
| Exercises | The checklist (§8.3) does not block setup. "Covered in slides" ≠ "personally practised" |

**Project setup (documented, not yet executed):**
1. `ng new <name> --standalone=false --routing --zoneless=false --file-name-style-guide=2016 --style=css --ssr=false --ai-config=none`. The first four flags are the course command; the rest only suppress prompts. This also initialises Git.
2. In `angular.json` → `schematics`, set `addTypeToClassName: true` for `@schematics/angular:component`, `:directive` and `:service`.
3. Rename `App` → `AppComponent` in `app.component.ts`, `app.module.ts` and `app.component.spec.ts`.
4. Replace `signal()` in the root component with a plain property.
5. `npm install bootstrap`, then add `node_modules/bootstrap/dist/css/bootstrap.min.css` to `angular.json` → `build.options.styles` (CSS only).
6. Import `FormsModule` and `HttpClientModule` in `AppModule` (L4 s.4, s.16). `HttpClientModule` is deprecated in recent Angular but is the taught form.

### 8.3 Exercise completion checklist (please mark)

Nothing is promoted to "practised" until you confirm it.

| ✓ | Deck / slide | Exercise | Concepts it would exercise |
|---|---|---|---|
| ☐ | JS-B s.72 | Name/surname/age form; string reversal; letter arrays; call/apply; IIFE | DOM, functions, call/apply, IIFE |
| ☐ | L1 s.24 | Name/city/birth-year variant | DOM, call/apply, `addEventListener`, custom event |
| ☐ | L1 s.39 | Student grades: average, judgements, Map counts, Date report, scope/hoisting | `for…of`, Math, if/switch, Map, Date, scope |
| ☐ | L1 s.40 | Cart object (bonus) | `reduce`, `bind`, `setTimeout` + `this`, `Object.freeze` |
| ☐ | L2 s.13 | Shop catalogue typing | literal/union types, interface/type, `Record`, type predicates |
| ☐ | L2 s.23 | Library classes | classes, `extends`, `super`, access modifiers, getters, arrow callbacks |
| ☐ | L3 s.17 | Contact book, part 1 | bindings, `*ngFor`, `[(ngModel)]`, filtering/sorting in methods |
| ☐ | L3 s.24 | Contact book, part 2 | `@Input`/`@Output`, setter, `ngOnChanges`, nested components |
| ☐ | L4 s.12 | Products gallery (lazy module, DummyJSON) | service + HttpClient, routing, `loadChildren`, `paramMap` |
| ☐ | L4 s.19 | Gallery CRUD in memory | forms (either kind), `date` pipe |
| ☐ | L5 s.9 | Live search + add-to-cart | `debounceTime`, `distinctUntilChanged`, `switchMap`, `exhaustMap`, POST, cleanup |
| ☐ | L5 s.16 | Notification service | `BehaviorSubject`, `ReplaySubject`, `interval`, cleanup |
| ☐ | NG-B s.16–17, 21, 26, 31, 35 | Base-course "Test" prompts (master/detail, lifecycle, interaction, directive, pipe) | various |

---

## 9. Source reference index

| Deck | Slide ranges by topic |
|---|---|
| HTML | Structure 2–8 · Attributes/links/images 9–36 · Inline CSS 12–19 · Formatting/comments 20–23 · Tables 37–46 · Lists 47–48 · Block/inline/div/class 49–58 · Iframe 59–60 · JS intro 61–63 · Forms 64–98 · Empty 30–31 |
| JS-B | Intro/company 1–9 · Where/output 10–14 · Syntax/variables/operators/types 15–24 · Functions 25–29 · Objects/`this`/call/apply/bind 30–39 · Events 40–42 · Strings 43–46 · Numbers 47–50 · Arrays 51–71 · **Exercise 72** · Date 73–81 · Math 82–84 · Conditions/loops 85–86 · Set/Map 87–89 · Scope 90–95 · Hoisting 96–98 · Strict 99–102 |
| NG-B | Architecture/modules 2–7 · Components/templates/metadata 8–11 · Binding 12–13 · Directives 14 · Services 15 · Tests 16–17 · Lifecycle 18–21 · Interaction 22–26 · Styles 27–28 · Attribute directives 29–31 · Pipes 32–35 · Forms 36–50 · HttpClient 51–65 · Routing 66–79 · Updating 80 |
| L1 | Intro 1–9 · Keywords/operators/types 10–13 · Scope/strings/numbers 14–16 · Arrays 17–18 · Objects/`this` 19–21 · Events 22–23 · **Exercise 24** · Date/Math 25–29 · Conditions/loops 30–31 · Set/Map 32–33 · Scope/strict 34–38 · **Exercises 39–40** |
| L2 | Intro/install 1–2 · Types 3–4 · Interface/type 5–8 · Union/literal 9–10 · Functions/arrows 11–12 · **Exercise 13** · Modules 14 · Classes 15–18 · Generics 19–20 · Strict/tsconfig 21–22 · **Exercise 23** |
| L3 | Overview 1–5 · Modules/bootstrap 6–9 · Component/template 10–12 · Lifecycle 13–14 · Binding 15 · Directives 16 · **Exercise 17** · Input/Output/refs/ViewChild 18–23 · **Exercise 24** |
| L4 | Services 1–4 · Routing 5–11 · **Exercise 12** · Pipes 13–14 · Forms 15–18 · **Exercise 19** |
| L5 | Concepts 1–4 · Operators 5–8 · **Exercise 9** · Creation 10–11 · Memory leaks 12 · Subjects 13–14 · Cold/hot 15 · **Exercise 16** |

---

## 10. Audit report: files, limitations

**Inspected (text and speaker notes, every slide):** all 8 unique decks listed in §1.2.

**Confirmed duplicates (hash-verified, not re-read):** the 8 copies in `ITS CORSI 25-26-27\SVILUPPO WEB BASE\` and `ITS CORSI 25-26-27\SVILUPPO WEB AVANZATO\`.

**Could not be read:** none. Every file opened successfully.

**Revision 2 additions**
- **Read:** `Downloads\appwebbappunti.pdf` (personal notes, §11).
- **Could not be read:** `OneDrive - ITS Incom\Microsoft Teams Chat Files\appwebbappunti.pdf` (cloud-only file; OneDrive provider not running). Presumed to be a duplicate of the Downloads copy.
- **Searched, not found:** Angular Lesson 6; any Git or CSS slides (you confirm the Git slides exist elsewhere).
- **Toolchain checked:** `ng version`, `node --version`, `git --version`, and an `ng new … --dry-run` in a temporary folder. Nothing was written to disk and no project was created.

**Limitations**
- **Images.** Text was extracted from slide XML. Of the embedded images, only the Angular architecture, component-tree, data-binding and form-state diagrams were viewed (NG-B s.3, s.9, s.12, s.13, s.40; the same images reappear in L3 s.4 and s.12). The remaining images were not individually viewed. They are mostly rendered-output screenshots in the HTML deck (e.g. HTML s.5–6, 16–17, 20, 33, 37–54, 64, 67), plus the lifecycle diagram (NG-B s.18), presenter photos and decorative images. Any code shown **only** inside those images is not captured.
- **Speaker notes** were read; only L1 s.17 contained substantive notes.
- **Lecture delivery.** Slides do not show what was said in class, demonstrated live or shared as separate code. Anything taught orally is invisible to this audit.
- **Linked resources** (w3schools, MDN, angular.dev, StackBlitz, the TypeScript Playground) were not followed.
- **Classification judgement.** The ✅/⚠️/❌ boundary is based on whether a slide shows explanation plus code. Borderline calls are noted in the tables.
- **No assessment of your understanding** was made or implied.

---

## 11. Separate audit: `appwebbappunti.pdf` (personal notes)

### 11.1 Nature of the file

- **Source:** `Downloads\appwebbappunti.pdf`, 3 pages, dated 2026-04-17. A second copy in Teams Chat Files could not be opened (cloud-only).
- **Classification: personal notes, not official course material.** Evidence: informal shorthand, typos ("lasto server", "chiusuan", "properites", "fyp"), your own name in an example ("kevin + enter"), and design hypotheses written as "prima ipotesi" and "ipotesi". There is no branding, author slide or code.
- The example `ds.setfilter("dario")` may refer to the base-course instructor (Dario Lipari, JS-B s.2). That would suggest notes taken during a base-course lesson, but **this is an inference and has not been verified.**
- **Nothing in these notes counts as "taught" evidence.** They show what was *discussed or designed*, not what was demonstrated.

### 11.2 Content summary

| Page | Content |
|---|---|
| 1 | "app web": contact management with a list and a detail view. Features: CRUD, and search (filter via server, refresh the list). Device targets: desktop, mobile and tablet; grid and list views. Search modes: debounce, Enter, click. Desktop shows cards; mobile uses a different view. Delete needs a confirm popup or dialog. Under the delete icon: an arrow and edit; clicking opens a card with the contact detail |
| 2 | Detail page with a confirm button (save and close) and an "x" button (discard and close). Fields: first name, last name, phone, email, each with model properties and validations. Events: refresh, on change, on add, on delete, on load. Searching filters the list. Technical spec: Angular frontend, components (portions of UI), a contacts data service. Components: `app-root` (container), `app-header` (search, refresh, add), `app-contact` (view in the list, edit otherwise; save/cancel), `app-list` (the contact series). First hypothesis: `app-root` does the loading, manipulates the service and passes changes to children via `@Input`/`@Output`. `app-list` receives contacts as an `@Input`; the header emits refresh/add/search as `@Output`s |
| 3 | `app-contact` lives in edit mode. "Case 1: handle a double hierarchy." Alternative hypothesis: the service is injected in both header and list. The header search ("kevin" + Enter) calls `ds.setFilter(...)` and then `search.emit()`. In `app-root`, `(search)` calls `ricaricaLista()`, which toggles a `refresh` flag. In `app-list`, the `@Input refresh` triggers `ds.getContacts()` and is then reset to false |

### 11.3 Concepts in the notes, mapped to the audit

| Concept in notes | Audit status | Reference |
|---|---|---|
| Components as UI portions; root/header/list/contact tree | ✅ Tier A | L3 s.5, s.10–11; NG-B s.9 |
| Data service for contacts | ✅ Tier A | L4 s.1–4 |
| `@Input` / `@Output` communication; root as coordinator | ✅ Tier A | L3 s.18–23 |
| `@Input` change triggering a reload (refresh flag) | ✅ Tier A (setter or `ngOnChanges`) | L3 s.19 |
| Service shared by sibling components (`setFilter`) | ✅ Tier A (singleton `providedIn: 'root'`) | L4 s.3. The shared-state idea is shown with `BehaviorSubject` in L5 s.13/s.16 |
| Search with debounce | ✅ Tier A | L5 s.6 |
| Search on Enter | ⚠️ Tier A, thin | `(keyup.enter)` appears in NG-B s.36 only |
| Search on click | ✅ Tier A | `(click)`, L3 s.15 |
| Validations on name/phone/email | ✅ Tier A (template-driven, `required`/`minlength`/`pattern`) | NG-B s.44–45; HTML s.93–95 |
| View vs edit mode in one component | ✅ Tier A (`*ngIf` + a boolean) | L3 s.16 |
| CRUD | Create/read Tier A; **update/delete via HTTP = Tier C 🔒** | L4 s.4 names PUT/DELETE only |
| Server-side filtering | Tier A if done with GET plus a query (e.g. DummyJSON `/search?q=`) | L5 s.9 |
| Desktop/mobile/tablet layouts, grid vs list, cards | **Tier C 🔒**: needs media queries, flexbox or grid, none of which is taught | §3.2 |
| Confirm dialog on delete | **Tier C 🔒**: `window.confirm()` was not taught (only `alert`, JS-B s.14) | — |
| Icons (delete, arrow, edit) | **Tier D**: no icon technique is taught. Plain text or emoji buttons stay within scope | — |

### 11.4 Implication

*Revision 3:* You confirmed these notes are the **project brief** (decision D). PUT/DELETE are now authorised. Responsive layout, grid/list switching, the confirm dialog and icons are **optional** (§11.5).

### 11.5 Proposed project scope (awaiting your approval; nothing implemented)

**Data source (verified with GET requests only):** DummyJSON `https://dummyjson.com/users`. Each user has `id`, `firstName`, `lastName`, `phone` and `email`, which exactly match the brief's fields. Server-side search uses `/users/search?q=…`.

#### Mandatory: stated in the brief, not labelled "ipotesi"

| # | Requirement (brief p.) | Implementation, with tier | Concepts flagged |
|---|---|---|---|
| M1 | Contact list (p.1) | `ContactListComponent` with `*ngFor` over an `@Input` array (A) | — |
| M2 | Contact detail (p.1–2): first name, last name, phone, email | `ContactComponent` showing one contact (A) | — |
| M3 | Load contacts from the server (p.2 "on load") | `ContactsService.getContacts()` → `http.get<Contact[]>()`; `AppComponent` subscribes in `ngOnInit` (A; L4 s.4) | HTTP completes on its own, so no cleanup is needed |
| M4 | Create (CRUD, p.1; "add" in header, p.2) | Header "Add" button opens an empty contact card; save calls `http.post()` | POST (authorised) |
| M5 | Update (CRUD; edit/save, p.1–2) | Card switches view ↔ edit with `*ngIf` and a boolean; save calls `http.put()` | PUT (authorised) |
| M6 | Delete (CRUD, p.1) | Delete button → `http.delete()` → remove from the list | DELETE (authorised). Confirmation is optional (O3) |
| M7 | Edit form with validations (p.2) | Template-driven form: `#f="ngForm"`, `[(ngModel)]`, `name`, `required`, `pattern` for phone/email, Save `[disabled]="!f.form.valid"` (A; L4 s.16, NG-B s.41–45, HTML s.93) | Exact validation rules are **not specified** in the brief; proposed: all fields required, and a simple pattern for email and phone |
| M8 | Save = save and close; X = discard and close (p.2) | Two buttons; `@Output() save` / `@Output() cancel`; discard by editing a **copy** of the contact | Copying an object: the spread operator `{...c}` is **Tier D**. A Tier A alternative is assigning the fields one by one, or a `new Contact(...)` class instance (L2 s.15–16) |
| M9 | Header with search, refresh and add (p.2) | `HeaderComponent` emitting `@Output() search`, `refresh`, `add` (A; L3 s.20) | — |
| M10 | Search filters the list via the server (p.1–2) | `ContactsService.search(q)` → GET `/users/search?q=` | — |
| M11 | Search modes: Enter and click (p.1) | `(keyup.enter)` (NG-B s.36, thin) and `(click)` on a search button (A) | `(keyup.enter)` is thin coverage |
| M12 | Search mode: debounce (p.1) | `Subject<string>` in the header + `pipe(debounceTime(300), distinctUntilChanged())`; unsubscribe in `ngOnDestroy` (A; L5 s.6, s.12–13) | **Flagged under decision 8:** a long-lived stream that needs cleanup. Open item I: keep it mandatory, or downgrade it to optional |
| M13 | Refresh button and list refresh after add/change/delete (p.2) | Root re-calls the service or updates the in-memory list (A) | Writes are not persisted; open item G |
| M14 | Architecture: Angular components plus a contacts data service (p.2 "specifiche tecniche") | `AppComponent` (container), `HeaderComponent`, `ContactListComponent`, `ContactComponent`, `ContactsService` (`providedIn: 'root'`), a `Contact` interface | — |
| M15 | Communication via `@Input`/`@Output`, with the root coordinating (p.2 "prima ipotesi") | Root holds the list and handles the events; children get `@Input`s and emit `@Output`s (A; L3 s.18–23) | Labelled "ipotesi" in the brief, but **you explicitly included it**, so it is mandatory |
| M16 | Git (your decision 1) | Repository from `ng new`; commits per feature; push/pull/branch/switch/diff as needed (B) | User-authorised, not slide-verified |
| M17 | Basic CSS + Bootstrap CSS (your decision A) | Bootstrap via `angular.json` `styles`; minimal component CSS (B) | Install step shown to you before it is done |

#### Design ideas from the brief, not adopted (labelled "ipotesi")

| Idea (p.) | Status |
|---|---|
| Second hypothesis: service injected in **both** header and list; `ds.setFilter()` + `search.emit()`; the root toggles an `@Input refresh` flag that makes the list reload (p.3) | **Not adopted.** It conflicts with M15 (the root coordinates) and adds an `@Input`-as-trigger pattern. Available as an alternative if you prefer it |
| "caso 1 gestire doppia gerarchia" (p.3) | Too vague to implement; **needs your clarification** if it matters |
| "app contact vive in edit" (p.3) | Covered by M5's view/edit switch |

#### Optional enhancements: not included unless you approve each one

| # | Feature (brief p.) | Implementation options | Cost | New concepts |
|---|---|---|---|---|
| O1 | Responsive desktop/tablet/mobile layout (p.1) | **(a)** Bootstrap grid: `row` + `col-12 col-md-6 col-lg-4` on each card. **(b)** Hand-written media queries + flexbox/grid | (a) Low: about one wrapper per card, no TS. (b) Medium | (a) Bootstrap grid and breakpoints (authorised, never taught). (b) Media queries, flexbox/grid (Tier C) |
| O2 | Grid ↔ list view switching (p.1) | A boolean in the root + a toggle button in the header (`@Output`) + `[ngClass]` choosing grid or list classes (A) | Low–medium: one extra `@Output`/`@Input` and two CSS layouts | Only the layout CSS. The toggle logic is Tier A |
| O3 | Delete confirmation dialog (p.1, "deve"; see item H) | **(a)** `if (confirm('Eliminare?'))` before the delete call. **(b)** Custom `ConfirmDialogComponent` shown with `*ngIf`, emitting `@Output() confirm`/`cancel` | (a) Very low: one line. (b) Medium: a new component, overlay CSS | (a) `window.confirm()` (Tier C). (b) `position: fixed` overlay CSS (Tier D) |
| O4 | Different card vs mobile presentation (p.1) | Depends on O1; Bootstrap display utilities or media queries | Medium | Same as O1 |
| O5 | Icons for delete/edit/arrow (p.1) | **(a)** Text or emoji buttons ("✎", "🗑"). **(b)** The Bootstrap Icons package | (a) Zero. (b) Low: a new npm package and font CSS | (a) None. (b) A new dependency (not Bootstrap itself), so it needs approval |
| O6 | "Arrow" under the delete icon opening the detail card (p.1) | The card toggles an expanded state with `*ngIf` (A) | Low | None beyond Tier A. The wording is ambiguous; confirm the intended behaviour |
