import express from "express"
import { Recipe, Plant } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
import uploadImage from "../../../services/uploadImage.js"

const { ValidationError } = objection

const plantRecipeRouter = new express.Router({mergeParams: true})

plantRecipeRouter.post("/", uploadImage.single("recipeImageUrl"), async (req, res) =>{
    try {
        const { body } = req
        const recipeImageUrl = req.file ? req.file.location : null
        const bodyWithImageUrl = {...body, recipeImageUrl: recipeImageUrl}
        const cleanedInput = cleanUserInput(bodyWithImageUrl)
        const userId = req.user.id 
        const { plantId } = req.params 
        cleanedInput.userId = userId
        cleanedInput.plantId = plantId
    

        const recipe = await Recipe.query().insertAndFetch(cleanedInput)
        const serializedRecipe = await RecipeSerializer.singleShowDetails(recipe)
        res.status(201).json({recipe: serializedRecipe})
    } catch (error) {
        console.log(error)
        if (error instanceof ValidationError){
            res.status(422).json({errors: error.data})
        } else {
            console.log(error.message)
            res.status(500).json({errors: error.message})
        }
    }
})

plantRecipeRouter.delete("/:id", async (req,res) => {
    const { id } = req.params
    try{
        await Recipe.query().deleteById(id)
        res.status(200).json({message: "Plant Care guide deleted"})
    } catch (error) {
        return res.status(500).json({errors: error})
    }
})


export default plantRecipeRouter
