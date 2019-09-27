/*
 * @Author: saber2pr
 * @Date: 2019-09-27 23:12:16
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-09-27 23:38:17
 */
import { Commit } from "./type"
import { FS } from "@saber2pr/node"

export const commit = (commits: Commit[]) =>
  Promise.all(
    commits.map(({ type, master: { path: from }, origin: { path: to } }) => {
      switch (type) {
        case "create":
          return FS.copy(from, to)
        case "update":
          return FS.copy(from, to)
        case "delete":
          return FS.unlink(to)
      }
    })
  )
