# Changelog `v4+`
All notable changes to this project on `v4+` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

[Unreleased]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare/v4.1.3...HEAD

## [v4.1.3] - 2022-10-16
### Added
- GitHub community standards & related workflows([#39](https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/pull/39))
- GitHub workflows for CI.
- Jest config for GitHub Actions - `jest.config.ci.mjs`.
- NPM scripts:
  - `lint` to run ESLint from CLI.
  - `jest` to replace the original `test` script with the following changes:
    - Removed `jest --clearCache` at the beginning as the updated Jest & ts-jest settings execute the dynamic import lines with no issue.
    - Disabled Node experimental warning message by setting `NODE_NO_WARNINGS=1`.
  - `jest-ci` to run Jest with CI config - `jest.config.ci.mjs`.

### Changed
- File extension of Jest & Webpack config files to `mjs`.
- Jest config to move `ts-jest` config to `transform` ([#40])
- NPM `test` script to run scripts `lint` then `jest`.
- Rolled back the value of `moduleResolution` in `tsconfig` to `Node` (means `.js` file extension on relative imports is now __OPTIONAL__).
- Enhanced function `pathsToESModuleNameMapper` in `jest.config.js` to return a less clumsy mapping object.

---

### Updates on package dependencies
### Update
- Major version updates:
  - `@types/jest` - `28.1.6` -> `29.1.2` ([#44])
  - `eslint-plugin-jest` - `26.8.2` -> `27.1.1` ([#44])
  - `jest` - `28.1.3` -> `29.1.2` ([#44])
  - `ts-jest` - `28.0.7` -> `29.0.3` ([#44])
- Minor & patch version updates:
  - `@types/react` - `18.0.17` -> `18.0.21` ([#44])
  - `@typescript-eslint/eslint-plugin` & `@typescript-eslint/parser` - `5.33.0` -> `5.40.0` ([#44])
  - `electron-builder` - `23.3.3` -> `23.6.0` ([#44])
  - `eslint` - `8.22.0` -> `8.25.0` ([#44])
  - `eslint-import-resolver-typescript` - `3.4.1` -> `3.5.1` ([#44])
  - `eslint-plugin-react` - `7.30.1` -> `7.31.10` ([#44])
  - `ts-loader` - `9.3.1` -> 9.4.1` ([#44])
  - `typescript` - `4.7.4` -> `4.8.4` ([#44])

[#44]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/pull/44
[#40]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/pull/40
[v4.1.3]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare/v4.1.2...v4.1.3

## [v4.1.2] - 2022-08-15
### Added
- Function `pathsToESModuleNameMapper` in `jest.config.js` to create the module mappings with ESM relative import with file extension (`.js`) syntax support for Jest from the path aliases set in `tsconfig`. 

### Changed
- Disable ESLint rule `import/no-extraneous-dependencies` on unit test files.
- NPM script `test` now clear the cache for Jest before running the test and execute Jest with `NODE_OPTIONS=--experimental-vm-modules` flag to allow using dynamic import syntax.

### Fixed
- Cannot find module issue reported by TypeScript server on relative imports in the unit test files after setting up native ES module support in [v4.1.0].

---

### Updates on package dependencies
### Update
- Minor & patch version updates:
  - `electron` - `20.0.1` -> `20.0.2`
  - `eslint` - `8.21.0` -> `8.22.0`
  - `eslint-import-resolver-typescript` - `3.4.0` -> `3.4.1`

[v4.1.2]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare/v4.1.1...v4.1.2

## [v4.1.1] - 2022-08-10
### Fixed
- Cannot find module issue reported by TypeScript server on relative imports after setting up native ES module support in [v4.1.0].

---

### Updates on package dependencies
### Update
- Minor & patch version updates:
  - `@types/react` - `18.0.15` -> `18.0.17`
  - `@typescript-eslint/eslint-plugin` & `@typescript-eslint/parser` - `5.32.0` -> `5.33.0`
  - `eslint-plugin-jest` - `26.7.0` -> `26.8.2`

[v4.1.1]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare/v4.1.0...v4.1.1

## [v4.1.0] - 2022-08-07
### Added
- `tsconfig.eslint.json` to avoid ESLint complains for file not being included in project provided.

### Changed
- Migrated from deprecated `.eslintrc` (ESLint config with no file extension) to `CommonJS` file - `.eslintrc.cjs`, with the following changes on the configurations:
  - Different rules and plugins are now applied based on file types, allowing JavaScript files to be linted properly and only using plugins & rules needed on the targeted files.
  - Separated config to 4 objects -  naming as `baseConfig`, `tsConfig`, `jestConfig`, and `specialConfig` respectively to maintain the readability on the pervious `.eslintrc`.
  - `eslint-plugin-import` is now properly configured for both JavaScript and TypeScript files.
  - `jest.config.js` & `webpack.config.js` are no longer ignored by ESLint.
- Improved the readability of `webpack.config.js` by migrating to `webpack-merge` from using `lodash.deepClone()` for merging configuration objects.
- Configured Node to resolve JavaScript files as ES modules (`"type": "module"` in `package.json`).
- Refactored Jest and Webpack config files as ES modules.

### Fixed
- Module import order warnings in most modules.
- ESLint warnings & errors on `jest.config.js` & `webpack.config.js`.

---

### Updates on package dependencies
### Added
- `eslint-import-resolver-typescript` *- Enhanced TypeScript support for ESLint `import` plugin*
- `webpack-merge` *- Replaced the sections using `lodash.deepClone()` in `webpack.config.js`*

### Updated
- Major version updates:
  - `electron` - `19.0.9` -> `20.0.1`
  - `tsconfig-paths-webpack-plugin` - `3.5.2` -> `4.0.0`
- Minor & patch version updates:
  - `@typescript-eslint/eslint-plugin` & `@typescript-eslint/parser` - `5.30.7` -> `5.32.0`
  - `eslint` - `8.20.0` -> `8.21.0`
  - `eslint-plugin-jest` - `26.6.0` -> `26.7.0`
  - `electron-builder` - `23.1.0` -> `23.3.3`
  - `tsconfig-paths` - `4.0.0` -> `4.1.0`

### Removed
- `eslint-import-resolver-webpack` *- Not being used in any part of the boilerplate*
- `lodash` *- Replaced by `webpack-merge` for its' usage in `webpack.config.js`*

[v4.1.0]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare/v4.0.0...v4.1.0

## [v4.0.0] - 2022-07-22
### Added
- Jest as default unit testing framework, with sample test suite for `main`.
- Integrated Electron preload pattern.
- NPM scripts:
  - `watch-test` to run Jest in watch mode.
  -  `next-rc`, `next-patch`, `next-minor` & `next-major` for quick package version number advance.

### Changed
- Webpack will now take the module path alias from `tsconfig.json` and set it for you thanks to `tsconfig-paths-webpack-plugin`. Manually set up in Webpack config is no longer needed.
- `tsconfig` now configured to use `ES2020` features, with module resolution set to `Node16` to match the NodeJS version used by Electron.
- Migrated to the new `createRoot` API introduced in React `v18`.
- Some APIs changed in Electron `main` entry script:
  - `mainWindow` now use `loadFile` API instead of `loadURL`.
  - Replaced `app.on('ready')` with `app.whenReady()` to align with syntax from [Electron official quick start guide](https://www.electronjs.org/docs/latest/tutorial/quick-start).
- `electron-builder` now configured to build `universal` `dmg` for mac, 32 & 64 bit `exe` for Windows.
- Moved `electron-builder`, Webpack & Webpack-related packages to `optionalDependencies`.
- Revamped `README`.
- __*Starting from this version, the maintenance schedule will be on a monthly update basis to keep the package dependencies up to date and keep the development going.*__

### Fixed
- Allow to use `import default` statement on non ES modules (e.g. React, lodash) by enabling `esModuleInterop` in `tsconfig`. [#14](https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/issues/14)

### Removed
- Mocha in favour of Jest.
- Spectron as it ahs been deprecated. *See - [Spectron Deprecation Notice](https://www.electronjs.org/blog/spectron-deprecation-notice)*

---

### Updates on package dependencies
### Added
- `@types/jest`, `jest`, `ts-jest`, `eslint-plugin-jest` *- Jest support*
- `eslint-config-airbnb-typescript` *- Enhance Airbnb's rules in TypeScript*
- `ts-config-paths-webpack-plugin` *- Load `tsconfig` path alias into Webpack config*

### Updated
- Major version updates:
  - `react` & `react-dom` - `17.0.1` -> `18.2.0`
  - `@types/react` - `17.0.0` -> `18.0.15`
  - `@types/react-dom` - `17.0.0` -> `18.0.6`
  - `@typescript-eslint/eslint-plugin` & `@typescript-eslint/parser` - `4.11.0` -> `5.30.7`
  - `electron` - `11.1.1` -> `19.0.9`
  - `eslint-config-airbnb` - `18.2.1` -> `19.0.4`
  - `copy-webpack-plugin` - `7.0.0` -> `11.0.0`
  - `css-loader` - `5.0.1` -> `6.7.1`
  - `electron-builder` - `22.9.1` -> `23.1.0`
  - `html-webpack-plugin` - `4.5.0` -> `5.5.0`
  - `style-loader` - `2.0.0` -> `3.3.1`
  - `ts-loader` - `8.0.12` -> `9.3.1`
  - `ts-config-paths` - `3.9.0` -> `4.0.0`
- Minor & patch version updates:
  - `eslint-import-resolver-webpack` - `0.13.0` -> `0.13.2`
  - `eslint-plugin-import` - `2.22.1` -> `2.26.0`
  - `eslint-plugin-jsx-a11y` - `6.4.1` -> `6.6.1`
  - `eslint-plugin-react` - `7.21.5` -> `7.30.1`
  - `eslint-plugin-react-hoots` - `4.2.0` -> `4.6.0`
  - `lodash` - `4.17.20` -> `4.17.21`
  - `webpack` - `5.11.0` -> `5.73.0`
  - `webpack-cli` - `4.3.0` -> `4.10.0`

### Removed
- `react-router`, `react-router-dom`, `@types/react-router`, `@types/react-router-dom`
  
  *\- Not being used in any part of the boilerplate*
- `@types/mocha`, `mocha`, `ts-node` *- Replaced by `@types/jest`, `jest` & `ts-jest`*
- `spectron` *- Deprecated package; No replacement*

[v4.0.0]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare/v3.0.0...v4.0.0
