import { db } from '.'

async function main() {
  await db
    .insertInto('organisations')
    .values([{ name: 'Test', referencePrefix: 'test' }])
    .onConflict(oc => oc.column('name').doNothing()) // : )
    .execute()

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {})
  .catch(async e => {
    console.error(e)
  })
  .finally(() => process.exit(1))
