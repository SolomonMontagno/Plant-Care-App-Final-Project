import express from "express"
import { Recipe, Plant } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
import uploadImage from "../../../services/uploadImage.js"
const { ValidationError } = objection
const recipeRouter = new express.Router()

recipeRouter.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.query().findById(id);
        const serializedRecipe = await RecipeSerializer.singleShowDetails(recipe);
        return res.status(200).json({ recipe: serializedRecipe });
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
});

recipeRouter.patch("/:id/edit", uploadImage.single("recipeImageUrl"), async (req, res) => {
    const { id } = req.params
    try {
        const { body } = req
        const recipeImageUrl = req.file ? req.file.location : null
        const bodyWithImageUrl = { ...body, recipeImageUrl: recipeImageUrl }
        const cleanedInput = cleanUserInput(bodyWithImageUrl)
        const userId = req.user.id
        const { plantId } = req.params
        cleanedInput.userId = userId
        cleanedInput.plantId = plantId

        await Recipe.query().patchAndFetchById(id, cleanedInput)
        return res.status(200).json({ message: "Recipe has been edited" })
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data })
        } else {
            console.log(error.message)
            res.status(500).json({ errors: error.message })
        }
    }
})


export default recipeRouter