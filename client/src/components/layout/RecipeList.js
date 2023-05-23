import React, { useState } from "react"
import RecipeTile from "./RecipeTile"
const RecipeList = (props) => {
    const allRecipesArray = props.plantRecipes.map(recipe => {
        return(
        <div className="plant-grid" key={recipe.id}>
            <RecipeTile recipe={recipe} />
        </div>
        )
    })
    return (
        <>{allRecipesArray}</>
        
    )
}

export default RecipeList