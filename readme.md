# @stackline/remark-lint

> remark plugin to lint Markdown code style.

[![npm version](https://img.shields.io/npm/v/@stackline/remark-lint.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/remark-lint)
[![license](https://img.shields.io/npm/l/@stackline/remark-lint.svg?style=flat-square)](https://github.com/alexandroit/stackline-remark-lint)
[![GitHub repository](https://img.shields.io/badge/GitHub-repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-remark-lint)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/remark-lint/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/remark-lint/)** | **[npm](https://www.npmjs.com/package/@stackline/remark-lint)** | **[Issues](https://github.com/alexandroit/stackline-remark-lint/issues)** | **[Repository](https://github.com/alexandroit/stackline-remark-lint)**

**Current package version:** `1.0.2`

---

## Why this package?

`@stackline/remark-lint` is the Stackline-maintained distribution of `remark-lint@9.1.2`. It is an independent continuation of [remark-lint](https://github.com/remarkjs/remark-lint); original authors and licenses remain credited below.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/remark-lint@1.0.2` |
| API target | `remark-lint@9.1.2` |
| Supported Node.js | `See supported framework requirements` |
| License | `MIT` |
| Module type | `module` |
| Main entry | `index.js` |
| Types | `index.d.ts` |
| Runtime dependencies | `unified, @types/mdast, remark-message-control` |

## Installation

```bash
npm install @stackline/remark-lint
```

Preserve existing imports and plugin resolution with an npm alias:

```bash
npm install remark-lint@npm:@stackline/remark-lint
```

## Usage and API reference

### ![remark-lint][logo]


**[remark][]** plugin to support configuration comments for remark lint rules.

See the [monorepo readme][mono] for more info on remark lint.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkLint)`](#unifieduseremarklint)
*   [Compatibility](#compatibility)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to add support for
configuration comments to control remark lint rule messages.

## When should I use this?

This project is useful when you’re using remark lint rules and want to let
authors ignore messages in certain cases.
This package is already included in all our presets.
If you’re building a preset yourself, you should include this package.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install @stackline/remark-lint
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkLint from 'https://esm.sh/remark-lint@9'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkLint from 'https://esm.sh/remark-lint@9?build'
</script>
```

## Use

On the API:

```js
import {read} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {remark} from 'remark'
import remarkLint from '@stackline/remark-lint'

main()

async function main() {
  const file = await remark()
    .use(remarkLint)
    .process(await read('example.md'))

  console.error(reporter(file))
}
```

On the CLI:

```sh
remark --use remark-lint example.md
```

On the CLI in a config file (here a `package.json`):

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
+    "@stackline/remark-lint",
     …
   ]
 }
 …
```

## API

This package exports no identifiers.
The default export is `remarkLint`.

### `unified().use(remarkLint)`

Add support for configuration comments.
There are no options.

See [Ignore warnings][ignore] in the monorepo readme for how to use it.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

[logo]: https://raw.githubusercontent.com/remarkjs/remark-lint/014fca7/logo.svg?sanitize=true

[build-badge]: https://github.com/remarkjs/remark-lint/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-lint/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-lint.svg

[coverage]: https://codecov.io/github/remarkjs/remark-lint

[downloads-badge]: https://img.shields.io/npm/dm/remark-lint.svg

[downloads]: https://www.npmjs.com/package/remark-lint

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-lint.svg

[size]: https://bundlephobia.com/result?p=remark-lint

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/main/contributing.md

[support]: https://github.com/remarkjs/.github/blob/main/support.md

[coc]: https://github.com/remarkjs/.github/blob/main/code-of-conduct.md

[license]: https://github.com/remarkjs/remark-lint/blob/main/license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[remark]: https://github.com/remarkjs/remark

[mono]: https://github.com/remarkjs/remark-lint

[ignore]: https://github.com/remarkjs/remark-lint#ignore-warnings

## Credits and original authors

- Original project: [remark-lint](https://github.com/remarkjs/remark-lint).
- Titus Wormer.
- Copyright (c) 2015 Titus Wormer.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
