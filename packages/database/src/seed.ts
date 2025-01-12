import { db } from "./drizzle/db"

async function seed() {
  const values = [

  ]

  console.log("⏳ Seeding...")
  const start = Date.now()


  const end = Date.now()
  console.log(`${} item(s) inserted.`)
  console.log(`Completed in ${end - start}ms.`)
}

seed()
  .then(() => {
    console.log("✅ Seeding successful")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Seeding failed")
    console.error(error)
    process.exit(1)
  })
