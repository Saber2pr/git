/*
 * @Author: saber2pr
 * @Date: 2019-09-27 21:49:13
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-09-27 22:00:14
 */
import { FS } from "@saber2pr/node"

export const createMirrorPaths = async (from: string, to: string) => {
  const sources = await FS.search(from).then(ds =>
    ds.sort((a, b) => a.length - b.length)
  )
  return sources.map(s => [s, s.replace(from, to)])
}
