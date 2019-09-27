/*
 * @Author: saber2pr
 * @Date: 2019-09-27 23:03:10
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-09-27 23:50:07
 */
export type Blob = {
  path: string
  text?: string
}

export type Commit = {
  type: "update" | "create" | "delete"
  master: Blob
  origin: Blob
}
