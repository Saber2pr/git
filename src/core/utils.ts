/*
 * @Author: saber2pr
 * @Date: 2019-09-27 22:11:30
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-09-27 22:38:08
 */
export const lift = <T, R>(target: T, pipe: (value: T) => R) => pipe(target)
