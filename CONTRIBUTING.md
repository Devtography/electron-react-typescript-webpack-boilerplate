# How to Contribute

Electron-React-Typescript-Webpack(ERTW) Boilerplate is one of Devtography's open-source projects that's under active development. As much as we want to make contributing to this project as easy and transparent as possible, the workflow is not quite there yet. Hopefully, this document makes the process for contributing clear and answers some questions that you might have.

## [Code of Conduct](CODE_OF_CONDUCT.md)

We expect project participants to follow the basic principle that to be kind and respect others participating in this project. Read the [full text](CODE_OF_CONDUCT.md) if you got some time to kill.

## Open Development

All work on ERTW Boilerplate happens directly on [GitHub](/). Both project maintainers and external contributors send pull requests which go through the same review process.

### `develop` is unsafe

The default branch of this project is `develop`. As its name suggests, this is the branch where the development goes. We will do our best to keep `develop` in good shape, with tests passing at all times, but please bear in mind that unreleased changes are included in this branch, which from time to time might need some fixes before they make it into `master` a.k.a. the next release.

### Workflow and Pull Requests

The maintainers will be monitoring for pull requests. When we get one, the CI will run some checks and tests on it first. If there's any failed checks/tests, we'd ask you to fix those first if that's needed. From here, the maintainers will will sign off on the changes and then merge the pull request. We'll do our best to provide updates and feedback throughout the process.

_Before_ submitting a pull request, please make sure the following is done:

1. Fork the repo and create your own branch from `develop`. A guide on how to fork a repository: https://help.github.com/articles/fork-a-repo/

    Open terminal (e.g. Terminal, iTerm, Git Bash or Git Shell) and type:

    ```sh-session
    $ git clone https://github.com/<your_username>/electron-react-typescript-webpack-boilerplate.git
    $ cd electron-react-typescript-webpack-boilerplate
    $ git checkout -b <your_branch>
    ```

    Note: Replace `<your_username>` with your GitHub username and `<your_branch>` with your branch name

1. Make sure you have `python` installed. Python is required by [node-gyp](https://github.com/nodejs/node-gyp) that is used when running `npm install`.

    To check your version of Python and ensure it's installed your can type:

    ```sh
    python --version

    # alternatively

    python3 --version
    ```

1.  Make sure your have a compatible version of `node` installed (As of September, 2022, `v16.x` is recommended).

    ```sh
    node -v
    ```

1. Run `npm ci` (NOT `npm install`, we don't want unnecessary updates on `package.lock`).

    ```sh
    npm ci
    ```

1. Call Webpack to build the bundles and check the code. `npm run dev` will run Webpack with watch mode to continuously update the bundles on file changed.

    ```sh
    npm run dev
    ```

1. If you've added code that should be tested, add tests. You can use watch mode that continuously tests changed files to make your life easier.

    ```sh
    npm run watch-jest
    ```

1. If you've made any changes to the usage of this boilerplate, or file structure, etc, update the documentation.

1. Ensure the test suite passes via `npm test`.

1. Ensure the app package can be built successfully with no issues via the following commands:

    ```sh-session
    $ npm run prod
    $ npm run build:win
    $ npm run build:mac
    ```

#### Changelog entries

All changes that add a feature to or fix a bug in the boilerplate require a changelog entry containing the description of the change, and the number of and link to the pull request. Try to match the structure of the existing entries.

You can add or edit the changelog entry in the GitHub web interface once you have opened the pull request and know the number and link to it.

If you have changed / updated / removed any package dependency, a changelog entry is then require. Please make sure to alphabetically order your entry based on the package name.

## Bugs

### Where to Find Known Issues

We will be using GitHub Issues for bugs. We will keep a close eye on this and try to make it clear when we have a fix in progress. Some notable/potential issues are also mentioned on [README](README.md). Before filling a new issue, try to make sure your problem doesn't already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide a reproducible test case. Please provide a public repository with a runnable example alongside your issue.

## Code Conventions

- 2 spaces for indentation (no tabs).
- 80 character line length is strongly preferred.
- Prefer `'` over `"`.
- ES6 syntax when possible.
- Use [TypeScript](https://www.typescriptlang.org)
- Avoid experimental APIs/features when possible.
- Use semicolons;
- Trailing commas,
- Avd abbr wrds.

## License

By contributing to ERTW Boilerplate, you agree that yur contributions will be licensed under its [MIT license](LICENSE).
