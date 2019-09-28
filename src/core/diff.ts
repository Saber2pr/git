/*
 * @Author: saber2pr
 * @Date: 2019-09-27 22:41:52
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-09-27 23:26:10
 */
import { lift } from "./utils"
import { parse, join } from "path"
import { createMirrorPaths } from "./createMirrorPaths"
import { FS } from "@saber2pr/node"
import { createMirror } from "./createMirror"
import { Commit } from "./type"
import { checkForClean } from "./checkForClean"

export const diff = async (
  from: string,
  to = lift(parse(from), ({ dir, name }) => join(dir, `__${name}__`))
) => {
  const createResult = await createMirror(from, to)
  const paths = await createMirrorPaths(from, to)
  const diffResult = await paths.reduce<Promise<Commit[]>>(
    async (acc, [origin, mirror]) => {
      const result = await acc
      if (await FS.exists(mirror)) {
        const old = await FS.readFile(mirror).then(b => b.toString())
        const now = await FS.readFile(origin).then(b => b.toString())
        if (old === now) return result
        return result.concat([
          {
            type: "update",
            master: { path: origin, text: now },
            origin: { path: mirror, text: old }
          }
        ])
      }
      return result
    },
    Promise.resolve([])
  )

  const cleanResult = await checkForClean(from, to)

  return createResult.concat(diffResult, cleanResult)
}
