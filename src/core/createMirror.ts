/*
 * @Author: saber2pr
 * @Date: 2019-09-27 22:00:20
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-09-27 23:41:06
 */
import { createMirrorPaths } from "./createMirrorPaths"
import { FS } from "@saber2pr/node"
import { dirname, parse, join } from "path"
import { lift } from "./utils"
import { Commit } from "./type"

export const createMirror = async (
  from: string,
  to = lift(parse(from), ({ dir, name }) => join(dir, `__${name}__`))
) => {
  const paths = await createMirrorPaths(from, to)
  return paths.reduce<Promise<Commit[]>>(async (prev, [from, to]) => {
    const result = await prev
    const dir = dirname(to)
    if (!(await FS.exists(dir))) await FS.mkPath(dir)
    if (!(await FS.exists(to))) {
      const text = await FS.readFile(from).then(b => b.toString())
      return result.concat({
        type: "create",
        master: { path: from, text },
        origin: { path: to }
      })
    }
    return result
  }, Promise.resolve([]))
}
