# RELX-assessment

## TECHNICAL TEST - INSTRUCTIONS

### Web and API Automation

As part of the recruitment of a Web & API Automation Tester who will work with the quality
assurance and product to evaluate new and existing features and automate tests to identify and help
remove bugs, glitches and other user experience issues a technical test is conducted.
Please develop test cases for the following two case studies.

1. Web Automation: https://www.cheapflights.com.au/

- Develop tests for validation the logo and login button is displayed
- Develop tests for searching flights
- Develop assertions for flight search results

2. API Automation: https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking

- Develop tests for CreateBooking API endpoint with assertions for the response fields
- Develop tests for UpdateBooking API endpoint with assertions for the response
  fields
- Develop tests for GetBooking API endpoint with assertions for the response fields
- Develop tests for DeleteBooking API endpoint with assertions for the response fields

## SETUP

### Set up Playwright

Install Node.js (LTS), then run these commands from the project root. Skip `npm init -y` if the project already has a `package.json`.

```bash
npm init -y
npm install --save-dev @playwright/test
npx playwright install
```

### Run the tests

Playwright web test scripts are placed under `web/` and API test scripts are placed under `api/`

```bash
npm run test         # Run all the tests
npm run test:api     # Run all API tests under api/
npm run test:web     # Run all web tests under web/
```

Other custom scripts:

```bash
npm run test:headed  # Run the tests with a visible browser
npm run test:ui      # Open the interactive test runner
npm run test:report  # View the HTML report
```

You can also run Playwright directly:

```bash
npx playwright test
npx playwright test --headed
npx playwright test --ui
npx playwright show-report
```
