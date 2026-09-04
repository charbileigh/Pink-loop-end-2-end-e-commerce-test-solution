# PINK LOOP end-to-end tests

This is the standalone Playwright repository for the PINK LOOP storefront. It is intentionally separate from the application repository so the test solution can have its own history, dependencies, CI and release cycle.

## Coverage

| Area | Checks |
| --- | --- |
| Catalogue | Product rendering, stock labels and disabled out-of-stock actions |
| Search | Text search and category filtering |
| Cart | Add item, quantity state, totals and checkout hand-off |
| Payments | All three fictional methods render; checkout makes no real payment |
| Theme | Theme switch updates the page and survives reload |
| Loopi | Chat opens, inventory query returns grounded product data |
| API | Empty prompts fail; budget prompts return matching inventory |
| Responsive | No horizontal overflow; core controls remain visible |
| Authentication | Register, authenticated checkout and logout against PostgreSQL mode |

Every general browser scenario runs at three viewport profiles: desktop Chromium, iPhone 13 and iPad Pro 11.

## Install

Requirements: Node.js 20+ and a running PINK LOOP application.

```bash
npm ci
npx playwright install chromium
```

## Run against a local or deployed shop

```bash
BASE_URL=http://localhost:4173 npm test
```

Use a different URL for another environment:

```bash
BASE_URL=https://your-pink-loop.example npm test
```

The suite does not start or modify the application. This avoids coupling the two repositories and makes it safe to point the tests at a staging environment.

## Run PostgreSQL authentication and checkout

Start the PINK LOOP PostgreSQL API and build the frontend with `NEXT_PUBLIC_API_BASE_URL` set to that API. Then run:

```bash
BASE_URL=http://localhost:4173 EXTERNAL_AUTH=1 npm test -- --project=desktop-chromium
```

The authentication test creates a unique `@example.test` account, completes a fictional order and logs out. It is skipped unless `EXTERNAL_AUTH=1` is explicitly set.

## Useful commands

```bash
npm test
npm run test:headed
npm run test:ui
npm run report
```

## GitHub Actions

Run **PINK LOOP E2E** manually from the Actions tab and supply the deployed shop URL. The workflow installs Chromium, runs all viewport projects and uploads the HTML report even when a check fails.

For a private deployment, add the authentication or bypass mechanism appropriate to your hosting platform before running the workflow. Never commit login secrets to this repository.
