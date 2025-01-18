# Drag and Drop Editor

A sample project includes text and image components drag/drop functionality.

## Development environment setup

This repository is designed to use a development container.

### Prerequisites

The prerequisites for working on this repo are:

-   Docker Desktop (MacOS, Windows) or docker engine (Linux)
-   GIT
-   VS Code
-   VS Code Extension "Remote Development"

All other prerequisites are provided by the dev container and its dependencies.

VSCode and other IDEA-based IDEs can use devcontainers to set up the development environment. Simply open the project in the IDE and choose the 'Open in Container' option to get started.

### Install dependencies

```bash
npm ci
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
