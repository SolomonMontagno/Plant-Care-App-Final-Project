import express from "express"
import objection from "objection"
import { Plant } from "../../../models/index.js"
import PlantSerializer from "../../../serializers/PlantSerializer.js"
import plantRecipeRouter from "./plantRecipeRouter.js"

const plantsRouter = new express.Router()


plantsRouter.get("/", async (req, res) => {
    try {
        const plants = await Plant.query()
        const serializedPlant = await Promise.all(plants.map(plants => PlantSerializer.getSummary(plants)))
        res.status(200).json({ plants: serializedPlant })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ errors: error.message })
    }
})

plantsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const plant = await Plant.query().findById(id)
        const serializedPlant = await PlantSerializer.getSummary(plant, req.user)
        console.log(serializedPlant)
        return res.status(200).json({ plant: serializedPlant })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error })
    }
})


plantsRouter.use("/:plantId/recipes", plantRecipeRouter)

export default plantsRouter