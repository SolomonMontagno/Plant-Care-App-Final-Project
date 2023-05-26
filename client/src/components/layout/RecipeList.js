import React, { useState } from "react"
import RecipeTile from "./RecipeTile"

const RecipeList = (props) => {
 
    const allRecipesArray = props.plantRecipes.map(recipe => {
        return (
            <div className="cell small-4 medium-4 large-4" key={recipe.id}>
                            <RecipeTile key={recipe.id} user={props.user} deleteRecipe={props.deleteRecipe} recipe={recipe} />
                        </div>
        )
    })
    return (
        <div className="grid-x grid-margin-x">{allRecipesArray}</div>

    )
}

export default RecipeList