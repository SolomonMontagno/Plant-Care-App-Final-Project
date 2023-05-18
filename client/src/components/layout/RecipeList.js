import React, { useState } from "react"
import RecipeTile from "./RecipeTile"
const RecipeList = (props) => {
    console.log(props)
    const allRecipesArray = props.plantRecipes.map(recipe => {
        return(
        <div key={recipe.id}>
            <RecipeTile recipe={recipe} />
        </div>
        )
    })
    return (
        <>{allRecipesArray}</>
        
    )
}

export default RecipeList