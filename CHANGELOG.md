# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.0.0 - 2018-02-04
v2.0.0 is a major release that most part of the boilerplate has been rewritten.

### Added
- ESLint for code checking on Javascript files.
- Airbnb's extensible `.eslintrc` package & its' peer dependencies. 
- `.eslintrc` that extends Airbnb's config and has customised rules configured.
  - _Rule `no-default-export` is set for JavaScript files to align with
    TypeScript._
- ESLint plugin `eslint-import-resolver-webpack` for ESLint to resolve path
  aliases set in Webpack config.
- Webpack plugin `copy-pkg-json-webpack-plugin` to generate a `package.json` 
  file and pack into Webpack's bundled package for production.
- Build commands `build:mac` & `build:win` to package & build the installer of 
  your Electron app for macOS & Windows using `electron-builder`.
- README section "Building the installer for your Electron app" & sub-section 
  "Extra options".

### Changed
- Refactored Webpack config file to have `mainConfig` & `rendererConfig` 
  cleaned up, and set mode by environment variable.
- `.gitignore` to ignore folder `out/` which will be auto-generated during the 
  build process.
- README section "How does it work?" is now renamed to "Getting started" & 
  completed the documentation of this section.
- README section "Folder structure" to reflect the changes in `v2.0.0`.

### Fixed
- CSS files fail to inject into views issue by setting Webpack to use 
  `style-loader` alongside with `css-loader` to bundle the files in Webpack 
  config file.
- `baseUrl` in `tsconfig.json` points to root directory incorrectly issue. 
  Corrected to current directory so VSCode can resolves the path aliases 
  correctly.

### Removed
- Redux & React-Redux related settings, including packages listed on 
`devDependencies`, path aliases & folders listed in folder structure.
  - Since Electron's built-in IPC & basic React states should be enough to get 
    the works done, and most Electron apps which have their application logic 
    runs on Electron's `main` process rather then `renderer` process actually 
    don't need React-Redux, `redux` & `react-redux` are no longer included in 
    this boilerplate.
  - Redux & React-Redux can still be used on this boilerplate by installing the 
    package yourself. For details, please refer to the corresponding library's 
    documents, there's no different than working on any other project which 
    isn't based on this boilerplate.
- Separated Webpack config files for `development` & `production` mode.

[Unreleased]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare/v2.0.0...HEAD
