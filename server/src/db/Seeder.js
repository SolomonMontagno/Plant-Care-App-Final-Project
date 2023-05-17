/* eslint-disable no-console */
import { connection } from "../boot.js"
import PlantSeeder from "./migrations/seeders/PlantSeeder.js"
class Seeder {
  static async seed() {

    console.log("seeding plants")
    await PlantSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder