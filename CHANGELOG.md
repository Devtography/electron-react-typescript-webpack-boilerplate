# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.0.0 - 2018-02-01
### Added
- ESLint for code checking on Javascript files.
- Airbnb's extensible `.eslintrc` package & its' peer dependencies. 
- `.eslintrc` that extends Airbnb's config and has customised rules configured.
- ESLint plugin `eslint-import-resolver-webpack` for ESLint to resolve path
aliases set in Webpack config.
- Webpack plugin `copy-pkg-json-webpack-plugin` to generate a `package.json` 
file and pack into Webpack's bundled package for production.

### Changed
- Refactored Webpack config file to have `mainConfig` & `rendererConfig` 
cleaned up, and set mode by environment variable.

### Removed
- Redux & React-Redux related settings, including packages listed on 
`devDependencies`, path aliases & folders listed in folder structure.
  - Since Electron's built-in IPC & basic React states should be enough to get 
    the works done, and most Electron apps which have their application logic 
    runs on Electron's `main` process rather then `renderer` process actually 
    don't need React-Redux, `redux` & `react-redux` are no longer included in 
    this boilerplate.
- Separated Webpack config files for `development` & `production` mode.

[Unreleased]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare/v2.0.0...HEAD
