import express from "express"
import objection from "objection"
import { Plant } from "../../../models/index.js"
import PlantSerializer from "../../../serializers/PlantSerializer.js"

const plantsRouter = new express.Router()

plantsRouter.get("/", async (req, res) => {
    try {
        const plants = await Plant.query()
        const serializedPlant = plants.map(plants => PlantSerializer.getSummary(plants))
        res.status(200).json({ plants: serializedPlant })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

plantsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const plants = await Plant.query().findById(id)
        const serializedPlant = PlantSerializer.getSummary(plants)
        return res.status(200).json({ plants: serializedPlant })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error })
    }
})

export default plantsRouter