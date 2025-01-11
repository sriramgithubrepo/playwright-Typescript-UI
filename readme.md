# Playwright typescript framework
This repo is primarily focuses on playwright typescript UI automation for [Sauce demo](https://www.saucedemo.com/) application, and also test basic API CRUD operation. Used github action for CI/CD integration.
Below have mentioned the prerequisites and installation steps

## Pre-requisites
- node
- Typescript
- Java(ensure its added in Environmental variable)
- Any IDE (preferably VS Code)

## Installation
- Clone this repository
- Open the repository in IDE
- Open IDE terminal and run `npm install`(for installing dependencies) and `npx playwright install`(for installing playwright browsers)

## To run test and view report
- Run the command `npm run test`
- This command will run all the test against 3 browsers(chromium,webkit,firefox)
- Run the command `npm run test.chromium`
- This command will run all the test against chromium browser
- Once the execution completes, the report will be automatically opening in the default browser as below
