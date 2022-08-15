# Electron-React-TypeScript-Webpack (ERTW) Boilerplate
![badge-ver] ![badge-node-ver] ![badge-license]

[badge-ver]: https://img.shields.io/github/package-json/v/devtography/electron-react-typescript-webpack-boilerplate
[badge-license]: https://img.shields.io/github/license/Devtography/electron-react-typescript-webpack-boilerplate
[badge-node-ver]: https://img.shields.io/badge/node--lts-%3E%3D16-orange

A boilerplate that let you instantly start working on your next [Electron] app 
project in [TypeScript] with no time wasted messing with the config files.

- Ready to use [Electron] project template with [React], [Webpack] and
  [TypeScript] seamlessly integrated.
- [ESLint] set up with TypeScript, Airbnb's rules, and [Jest] support.
- [Jest] integrated and configured.
- [`electron-builder`] for app packaging, with basic build config for Windows 
  macOS included.
- Clean, easy to read and alter config files. No config file is hidden behind
  yet another script!
- Monthly maintenance to keep things up to date!

*This boilerplate is tested on the latest macOS and Windows. If anything 
doesn't work, please [file an issue].*

### Maintenance schedule
Starting from [`v4.0.0`], this project is set to receive regular maintenances.
New releases will be published on monthly basis to keep the package
dependencies, package configurations and APIs / syntax up to date.

Maintenance work will begin on 1st of each month, and expect the new version to
be released within the first week of the month. New features from different
tools integrated in this boilerplate might not always be implemented at once,
especially on experimental features. If you want any particular feature to be
implemented, please [file an issue], or consider make a [new pull request].

### Development plan
- [ ] Develop a `create-react-app`-like NPX tool __!!!__
  __*([working on it](https://github.com/Devtography/create-ertw-app))*__
- [ ] Integrate another end-to-end testing framework to replace [Spectron]
- [ ] Migrate to Webpack 5 `Asset Modules` __*(pending for `v4.2.0`)*__
- [ ] Integrate HMR & Webpack dev server
- [x] Monitor the status of ESM support on [Jest] & [ts-jest]
  __*(Check [Known issues](#known-issues) for details)*__

---

## 🚨 🚧 CAUTION 🚧 🚨
- [Spectron] has officially been deprecated by the [Electron] team on
  February 1, 2022, thus, its' integration has also been dropped from this
  boilerplate on `v4+`.

  A replacement will be integrated in future version (pending for `v5`).
  Currently evaluating different options including [Playwright] and
  [WebdriverIO].

  *See - [Spectron Deprecation Notice]*

- `mocha` has been dropped and replaced by [Jest] on `v4+`. If you're using
  `mocha` as your unit testing framework, please reference to `package.json`
  from [`v3.0.0`].

- [ESLint] config file `.eslintrc.cjs` introduced in [`v4.1.0`] is written in
  CommonJS syntax on purpose. As of the release of [`v4.1.0`], ESLint has yet
  to support ES module for its' config file. __Converting the config file to
  ES module will result in ESLint not working.__

- As of [`v4.1.2`], [Jest] & [ts-jest] are __NOT__ configured to run the test
  files as ES modules, despite all other sections of this boilerplate are
  configured to support native ES modules. Please check
  [Known issues](#known-issues) for details.

---

## Getting started
1. Clone this repository, or if you're hosting your Electron project on GitHub,
click [`Use this template`] to create a new project.

2. Edit the following fields in `package.json` for your own project:

    ```json
    {
      "name": "your-project-name",
      "version": "whatever-you-like",
      "description": "your-own-description",
      "build": {
        "appId": "your-app-id",
        "productName": "your-product-name",
        "buildVersion": "your-build-number"
      },
      "author": "who's-the-author?",
      "license": "if-you-don't-want-to-use-MIT",
      "repository": "type-and-link-of-your-repo",
      "bugs": "issue-page-of-your-repo",
      "homepage": "homepage-of-your-repo"
    }
    ```

3. `npm install` to install the dependencies.

   *Please note that `optionalDependencies` should only be omitted on your
   CI/CD pipeline for unit testing. It's meant to save some bandwidth. You'll
   need all the packages listed for development.*

Done! Now run `npm run dev` to start the Webpack in development and watch mode.
It's time to start working on your project.

Be aware that starting Webpack will only compile your files to `dist` folder
but won't start the Electron app. Use `npm start` command to start your
Electron app once the files are compiled.

__*Starting from `v4.0.0`, you no longer need to manually config your module
path alias in `webpack.config.js`. All module path alias set in `tsconfig.json`
will be configured in Webpack automatically thanks to [`tsconfig-paths`] and
[`tsconfig-paths-webpack-plugin`].*__

## Build your Electron app package
Different from the official [Electron quick start guide], this boilerplate uses
[`electron-builder`] instead of [Electron Forge] to package your Electron app.

By default, the build configuration in `package.json` is configured to build the
mac universal package (for Apple Silicon & Intel based machines) and Windows
`exe` installer (both 32 & 64 bit). You should not need to change anything in
the build script other than supplying the app icon unless you need to sign your
code/package or build for Linux.

For code signing and notarization, or to build for Linux, please read
[`electron-builder`'s document] for configuring the build script.

To package your Electron app, run `npm run prod` to get your code compiled in
`production` mode, then use `npm run  build:(win|mac)` to build the package.

## Known issues
- [`electron-builder`] packages the file into Electron's `asar` archive format
  by default. Based on past experiences with old Electron & `electron-builder`
  versions, this might lead to runtime error on Windows while launching the
  installed Electron app. 

  One way to verify this issue is to build the mac package and see if your app
  runs fine on mac. If it's the case, you can override the `asar` archive
  option in the build configuration in `package.json` by adding `asar: false`
  in `win` section.
  
  This solution isn't ideal but since `asar` archiving is
  meant to improve performance of reading files if bundler like Webpack is not
  being used. The app packaging workflow defined in this boilerplate already
  uses Webpack to minify your code in `production` builds, so there shouldn't
  be any significant performance difference with `asar` archiving disabled.

- __IMPORTANT!!!__

  As of [`v4.1.2`], the `jest.mock()` function is broken if [Jest] and [ts-jest]
  are configured with [ESM Support]. The following code will result in a
  `SyntaxError` being thrown when trying to execute the test with Jest.

  ```ts
  import { jest } from '@jest/globals';
  import { BrowserWindow } from 'electron';

  jest.mock('electron', () => {
    BrowserWindow: jest.fn().mockImplementation(() => {
      loadFile: jest.fn(() => Promise.resolve()),
      on: jest.fn(),
    }),
  });
  ```

  ```
  SyntaxError: The requested module 'electron' does not provide an export named 'BrowserWindow'
  ```

  The current solution is to keep using the non ESM supported version of
  `jest.config.js`, but with `NODE_OPTIONS=--experimental-vm-modules` set when
  running Jest (already set in [`v4.1.2`]). The drawback of this is you won't
  be able to use `import.meta` APIs in your code. It could be a deal breaker for
  some of you.
  
  I'm closely monitoring the situation atm, and I'll consider rollback the ESM
  related setting introduced in [`v4.1.0`] if there's no progress made solving
  this issue by the time I prepare the release of `v4.2.0`. You can track the
  progress on a related issue [facebook/jest #10025] if you want.

[ESM Support]: https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
[facebook/jest #10025]: https://github.com/facebook/jest/issues/10025

## Project folders & files
- `dist/` - [Webpack] output location

  __Contents will be flushed automatically on execution of `npm run <dev|prod>`
  script.__

- `out/` - [`electron-builder`] output location

- `public/` - Global static assets.
  - `index.html` - Template for `HTML Webpack Plugin`

    Update the value of `<title>` tag to change the default window title.

  - `style.css` - `CSS` file location sample

    Not much defined in this file. You can either put your `CSS` settings here
    or use any other tools you prefer.

- `src/` - Folder for all your source code
  - `main/` - For modules which run on the `main` process.
    - `main.ts` - [Electron] `main` process entry point

  - `preload` - Preload scripts go here
    - `ipc-api.ts` - APIs for IPC between `main` & `renderer`

      Consider convert this module into a collection of submodules if you have
      many APIs for IPC. See example as below:
      ```ts
      // ipc-api/index.ts
      import submoduleA from './submodule-a.js';
      import submoduleB from './submodule-b.js';

      export default { ...submoduleA, ...submoduleB };

      // ipc-api/submodule-a.ts 
      import { ipcRenderer } from 'electron';

      function a { ipcRenderer.send('a'); }

      export default { a };

      // ipc-api/submodule-b.ts
      import { ipcRenderer } from 'electron';

      function b { ipcRenderer.send('b'); }

      export default { b };
      ```

    - `preload.ts` - [Electron] preload script entry point

      There should be no need to modify this file unless you want to use other
      key(s) for your IPC APIs. By default, all APIs defined in `ipc-api`
      module are exposed under key `ipcApi` in `contextBridge`.

  - `renderer/` - Where the frontend scripts stay
    - `App.tsx` - Root [React] component
    - `renderer.tsx` - [Electron] `renderer` process entry point

      *`public/style.css` imported here. Change it if you want.*

  - `types/` - Home for self-defined `.d.ts` files
    - `global.d.ts` - Extends global scope interfaces

      This file includes ambient declaration for calling the IPC APIs defined in
      `preload/ipc-api` from the `renderer`. Remember __NOT__ to remove this
      part, otherwise TypeScript will tell you `type not exist`. However, if
      you've opted to use a different key other than `ipcAPI` in the preload
      script, __DO__ remember to update this file to match your own settings.

  - `utils/` - Place to store the helper scripts
    - `node-env.ts` - Shortcut to determine `NODE` environment

- `tests/` - Unit testing files location
  
  To avoid test files mixing up with the source code, [Jest] is configured to
  look for test file(s) within this folder only.
  
  File name of the test files can either be `[filename].test.tsx` or
  `[filename].spec.ts(x)`. `js(x)` can also be used for test files, but I assume
  you'd use TypeScript if you're using this boilerplate.

  - `main/main.spec.ts` - Sample test file for `src/main/main`
  - `utils/node-env.spec.ts` - Unit test for `src/utils/node-env`
  - `tsconfig.json` - TypeScript config file for `tests` module
- `.eslintignore` - [ESLint] ignore file
- `.eslintrc.cjs` - [ESLint] config file

  Configured to use Airbnb's rules with [TypeScript] supported, and rules for
  [Jest] applied.

- `.gitignore` - Git ignore file
- `CHANGELOG_PRE_V4.md` - Changelog of this boilerplate prior to `v4.0.0`
- `CHANGELOG_V4+.md` - Changelog of this boilerplate from `v4.0.0` onwards
- `jest.config.js` - [Jest] config file
- `LICENSE` - MIT license
- `package-lock.json`
- `package.json`

  Includes basic build config for `electron-builder`. It's likely that you'll
  have to personalise the build config when it comes to the time you're about
  to release your app. Please read [`electron-builder`'s document] for the
  build config setup guides.

- `README.md`
- `tsconfig.eslint.json` - [TypeScript] config file consume by [ESLint].
- `tsconfig.json` - [TypeScript] config file

  Module path aliases are configured here. [Jest] & [Webpack] will pick up the
  alias settings here to config their own. No need to manually config in Jest
  & Webpack again.

- `webpack.config.json` - [Webpack] config file

  Includes configurations targetting `electron-main`, `electron-preload`, and
  `electron-renderer` respectively.

## Donation
Maintaining this project takes time, lots of cups of coffee, and I do it for
free. Consider buy me some coffee via [GitHub Sponsors] or [PayPal]. 100% of
your donation will fund my coffee buying budget for quality coffee beans from
great roasters I know 😉 ☕️️

## Author
[Wing Chau](https://github.com/iamWing) [@Devtography](https://github.com/Devtography)

## License
Electron React TypeScript Webpack Boilerplate is open source software 
[licensed as MIT](LICENSE).

[Electron]: https://www.electronjs.org
[React]: https://reactjs.org
[Webpack]: https://webpack.js.org
[TypeScript]: https://www.typescriptlang.org
[ESLint]: http://eslint.org
[Jest]: https://jestjs.io
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[file an issue]: https://www.electronjs.org
[new pull request]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/compare
[Spectron]: https://github.com/electron-userland/spectron
[ts-jest]: https://github.com/kulshekhar/ts-jest
[Playwright]: https://playwright.dev
[WebdriverIO]: https://webdriver.io
[Spectron Deprecation Notice]: https://www.electronjs.org/blog/spectron-deprecation-notice
[`Use this template`]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/generate
[`tsconfig-paths`]: https://github.com/dividab/tsconfig-paths
[`tsconfig-paths-webpack-plugin`]: https://github.com/dividab/tsconfig-paths-webpack-plugin
[Electron quick start guide]: https://www.electronjs.org/docs/latest/tutorial/quick-start
[Electron Forge]: https://github.com/electron-userland/electron-forge
[`electron-builder`'s document]: https://www.electron.build
[GitHub Sponsors]: https://github.com/sponsors/iamWing
[PayPal]: https://paypal.me/iamWing0w0

[`v3.0.0`]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/releases/tag/v3.0.0
[`v4.0.0`]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/releases/tag/v4.0.0
[`v4.1.0`]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/releases/tag/v4.1.0
[`v4.1.2`]: https://github.com/Devtography/electron-react-typescript-webpack-boilerplate/releases/tag/v4.1.2
