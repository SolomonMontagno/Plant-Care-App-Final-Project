import React, {useState} from "react"

const RecipeTile = props => {
    console.log(props)
    return (
        <div>
            <p>{props.recipe.name}</p>
            <img src={props.recipe.recipeImageUrl}></img>
            <p>Plant Location: {props.recipe.plantLocation}</p>
            <p>Harvest Notes: {props.recipe.harvestNotes}</p>
            <p>Total minimum hours of light: {props.recipe.lightAmount}</p>
            <p>Total Amount of water per watering: {props.recipe.wateringAmount}</p>
            <p>Watering Frequency: {props.recipe.wateringSchedule}</p>
        </div>

    )
}

export default RecipeTile