import express from "express"
import { Recipe, Plant } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
const { ValidationError } = objection

const plantRecipeRouter = new express.Router({mergeParams: true})

plantRecipeRouter.get("/:id/recipes", async (req, res) =>{
    const { id } = req.params 
    try{
        const recipe = await Recipe.query().findById(id)
        const serializedRecipe = await RecipeSerializer.singleShowDetails(recipe)
        return res.status(200).json({ recipe: serializedRecipe})
    } catch (error) {
        res.status(500).json({errors: error.message})
    }
})

export default plantRecipeRouter
