/*
 * @Author: saber2pr
 * @Date: 2019-09-27 23:25:56
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-09-27 23:40:47
 */
import { FS } from "@saber2pr/node"
import { Commit } from "./type"
import { lift } from "./utils"

export const checkForClean = async (from: string, to: string) => {
  const origins = await FS.search(from)
  const mirrors = await FS.search(to)

  return mirrors.reduce<Commit[]>(
    (acc, path) =>
      lift(path.replace(to, from), oPath =>
        origins.includes(oPath)
          ? acc
          : acc.concat({
              type: "delete",
              master: { path: oPath },
              origin: { path }
            })
      ),
    []
  )
}
