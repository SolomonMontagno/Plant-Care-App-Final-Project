import React, { useState } from "react"
import RecipeTile from "./RecipeTile"
const RecipeList = (props) => {
    console.log(props.plantRecipes)
    const allRecipesArray = props.plantRecipes.map(recipe => {
        return(
        <div className="plant-grid" key={recipe.id}>
            <RecipeTile key={recipe.id} recipe={recipe} />
        </div>
        )
    })
    return (
        <>{allRecipesArray}</>
        
    )
}

export default RecipeList