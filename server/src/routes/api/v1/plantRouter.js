import express from "express"
import objection from "objection"
import { Plant } from "../../../models/index.js"

const plantsRouter = new express.Router()

plantsRouter.get("/", async (req, res) => {
    try {
        const plants = await Plant.query()
        res.status(200).json({ plants })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

plantsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const plants = await Plant.query().findById(id)
        return res.status(200).json({ plants: plants })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error })
    }
})

export default plantsRouter