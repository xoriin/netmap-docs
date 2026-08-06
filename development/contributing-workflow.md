---
title: Contributing Workflow
description: Fork NetMap, prepare and validate a change, and submit it through the test branch.
sidebar_position: 8
keywords: [contributing, fork, test branch, pull request]
verified_version: "1.5.0"
---

# Contributing Workflow

Use this workflow to contribute code or documentation without write access to the main NetMap repository. You need a GitHub account, Git, and the development tools required by the part of NetMap you plan to change.

## Fork and clone NetMap

1. Open [xoriin/netmap](https://github.com/xoriin/netmap) on GitHub and select **Fork**.
2. Clone your fork, replacing `YOUR_GITHUB_USERNAME` with your GitHub username:

   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/netmap.git
   cd netmap
   ```

3. Add the main NetMap repository as the `upstream` remote:

   ```bash
   git remote add upstream https://github.com/xoriin/netmap.git
   git fetch upstream
   ```

4. Create a local `test` branch from the current upstream test branch:

   ```bash
   git switch -c test --track upstream/test
   ```

   If your local clone already has a `test` branch, use `git switch test` and then `git pull --ff-only upstream test`.

## Make and validate your change

Create a short-lived branch from `test` so unfinished work stays separate:

```bash
git switch test
git pull --ff-only upstream test
git switch -c feature/YOUR_CHANGE
```

Replace `YOUR_CHANGE` with a short hyphenated description. Make the smallest coherent change, add or update tests, and update the public documentation when user-visible behavior changes.

Run the checks relevant to your work before committing.

Backend:

```bash
cd <repo-root>/backend
env UV_CACHE_DIR=/tmp/uv-cache uv run --extra dev pytest tests
```

Frontend:

```bash
cd <repo-root>/frontend
npm exec tsc -- --noEmit
node node_modules/vite/bin/vite.js build
```

Documentation:

```bash
cd <repo-root>/documentation
npm run build
```

Container or packaging changes also require an all-in-one image rebuild and a successful health check. See [Testing](./testing.md) for the validation matrix.

## Commit the change

Review the files you changed, then create a focused commit:

```bash
git status
git diff --check
git add PATHS_YOU_CHANGED
git commit -m "Describe the change"
```

Do not include credentials, local environment files, databases, generated build output, or private network data.

## Put the change on your fork's test branch

Merge the validated change into your local `test` branch, then push that branch to your fork:

```bash
git switch test
git pull --ff-only upstream test
git merge --no-ff feature/YOUR_CHANGE
git push origin test
```

Resolve any conflicts locally and rerun affected tests before pushing. Pushing `test` to your fork does not grant access to the main repository or publish an official NetMap production release.

## Open the pull request

On GitHub, open a pull request with:

- base repository: `xoriin/netmap`;
- base branch: `test`;
- head repository: your fork;
- compare branch: `test`.

Explain what changed, why it is needed, how you tested it, and any security, migration, compatibility, or documentation effects. Maintainers can review the change and decide when it is ready for the project test branch. Contributors should not create production tags or attempt to publish official images.

## Changelog and documentation

Update `CHANGELOG.md` for user-visible changes, security hardening, API behavior, and operational changes. Update the appropriate public documentation page whenever a UI label, workflow, permission, configuration value, API contract, default, or operational requirement changes.

## Expected result

Your fork contains the tested commit on its `test` branch, and the pull request targets the upstream `test` branch. Review discussion and further commits remain attached to that pull request.

## Related pages

- [Testing](./testing.md)
- [Local Development](./local-development.md)
- [Repository Structure](./repository-structure.md)
- [Changelog](../reference/changelog.md)
