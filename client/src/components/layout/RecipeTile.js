import React, { useState } from "react"

const RecipeTile = props => {
    
    return (
        <div className="column">
            <div className="card plant-list">
                <div className="card-section name-text">
                    <h4>{props.recipe.name}</h4>
                </div>
                <div className="card section plant-photo thumbnail">
                    <img src={props.recipe.recipeImageUrl}></img>
                </div>
                <div className="card-section">
                    <p>Plant Location: {props.recipe.plantLocation}</p>
                    <p>Harvest Notes: {props.recipe.harvestNotes}</p>
                    <p>Total minimum hours of light: {props.recipe.lightAmount}</p>
                    <p>Total Amount of water per watering: {props.recipe.wateringAmount}</p>
                    <p>Watering Frequency: {props.recipe.wateringSchedule}</p>
                    <p>Created by: {props.recipe.user.username}</p>
                </div>
            </div>
        </div>

    )
}

export default RecipeTile