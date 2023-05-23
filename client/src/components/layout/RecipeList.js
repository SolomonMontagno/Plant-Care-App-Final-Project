import React, { useState } from "react"
import RecipeTile from "./RecipeTile"

const RecipeList = (props) => {
    console.log("recipelist", props)
    const allRecipesArray = props.plantRecipes.map(recipe => {
        return (
            <div className="plant-grid" key={recipe.id}>
                <RecipeTile key={recipe.id} user={props.user} deleteRecipe={props.deleteRecipe} recipe={recipe} />
            </div>
        )
    })
    return (
        <>{allRecipesArray}</>

    )
}

export default RecipeList