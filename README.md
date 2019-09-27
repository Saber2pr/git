# @saber2pr/git

> simple git.

```bash
yarn add @saber2pr/git
```

---

# Example

```ts
import { diff, commit } from "@saber2pr/git"

const rootDir = "./test"
const commits = await diff(rootDir)
await commit(commits)
```

commits like this:

```json
[
  {
    "type": "create",
    "master": { "path": "./test/item2.md", "text": "233\n" },
    "origin": { "path": "__test__/item2.md" }
  },
  {
    "type": "update",
    "master": { "path": "./test/item2.md", "text": "qwq\n" },
    "origin": { "path": "__test__/item2.md", "text": "233\n" }
  },
  {
    "type": "delete",
    "master": { "path": "./test/item2.md" },
    "origin": { "path": "__test__/item2.md" }
  }
]
```

## start

```bash
yarn install
```

```bash
yarn start

yarn test
```

> Author: saber2pr
