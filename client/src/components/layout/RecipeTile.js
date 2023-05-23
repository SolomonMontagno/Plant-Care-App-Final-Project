import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const RecipeTile = props => {
    console.log("recipetile", props)

    const [showDelete, setShowDelete] = useState(false)

    let hideDelete

    const handleDelete = () => {
        event.preventDefault()
        props.deleteRecipe(props.recipe.id)
    }
    // old code
    // const deleteRecipe = async (recipeId) => {
    //     try {
    //         const response = await fetch(`/api/v1/plants/${props.plantId}/recipes/${recipeId}`,
    //             { method: "DELETE" })
    //         if (!response.ok) {
    //             const errorMessage = `${response.status} (${response.statusText})`
    //             const error = new Error(errorMessage)
    //             throw error
    //         } 
    //     } catch (error) {
    //         console.error(`Error in fetch: ${error.message}`)
    //     }
    // }

    if (showDelete) {
        return <Redirect push to={`/plant/${plantId}`} />
    }

    if (props.user) {
        if (props.recipe.user.id === props.user.id) {
            hideDelete = <button className="button" onClick={handleDelete}> Delete Care Guide: {props.recipe.name}</button>
        } else {
            if (props.recipe.user.id !== props.user.id) {
                hideDelete = ""
            }
        }
    }
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
                <div>
                    {hideDelete}
                </div>
            </div>
        </div>

    )
}

export default RecipeTile