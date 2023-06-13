import express from "express"
import {Recipe, Vote} from "../../../models/index.js"
import { ValidationError } from "objection"
import RecipeSerializer from "../../../serializers/RecipeSerializer"
import objection from "objection"

const votesRouter = new express.Router()

votesRouter.post("/", async (req, res) => {
    const voteValue = req.body.voteValue
    const recipeId = req.body.recipeId
    const userId = req.user.id
    try{
        const voteExists = await Vote.query().findOne({
            userId: userId,
            recipeId: recipeId
        })
        if (voteExists){
            if(voteValue === voteExists.voteValue){
                await Vote.query().deleteById(voteExists.id)
            } else {
                await voteExists.$query().patch({ voteValue: -(voteValue)})
            }
        } else {
            const newVote = await Vote.query().insertAndFetch({voteValue, userId, recipeId})
        }
        const recipe = await Recipe.query().findById(recipeId)
        const serializedRecipe = await RecipeSerializer.singleShowDetails(recipe)
        const voteCountForRecipe = serializedRecipe.voteValue
        return res.status(201).json({vote: voteCountForRecipe})
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({errors: error.data})
        } else {
            res.status(500).json({ errors: error.message})
        }
    }
})

export default votesRouter 