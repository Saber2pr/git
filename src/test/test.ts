import { diff, commit } from ".."

async function main() {
  const root = "./test"
  const commits1 = await diff(root)
  console.log(commits1)
  await commit(commits1)
}

main()
