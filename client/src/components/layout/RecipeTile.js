import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import EditRecipeForm from "./EditRecipeForm.js"
const RecipeTile = props => {
    const [editRedirect, setEditRedirect] = useState(false)

    let hideDelete
    let hideEdit
    const handleDelete = () => {
        event.preventDefault()
        props.deleteRecipe(props.recipe.id)
    }

    const handleEdit = () => {
        event.preventDefault()
        setEditRedirect(true)
    }

    if (editRedirect) {
        return <Redirect push to={`/plants/${props.recipe.plantId}/recipes/${props.recipe.id}/edit`} />
    }
    if (props.user) {
        if (props.recipe.user.id === props.user.id) {
            hideDelete = <div className="button recipeButton"><button onClick={handleDelete}> <p> Delete Care Guide: {props.recipe.name}</p></button></div>
            hideEdit = <div className="button recipeButton"><button onClick={handleEdit}> <p>Edit Care Guide: {props.recipe.name}</p></button></div>
        } else {
            if (props.recipe.user.id !== props.user.id) {
                hideDelete = ""
                hideEdit = ""
            }
        }
    }
    return (

        <div className="card plant-list">
            <div className="card-section name-text">
                <h4>{props.recipe.name}</h4>
            </div>
            <div className="card plant-photo thumbnail">
                <img src={props.recipe.recipeImageUrl}></img>
            </div>
            <div className="card-section">
                <p><strong>Plant Location:</strong> {props.recipe.plantLocation}</p>
                <p><strong>Harvest Notes:</strong> {props.recipe.harvestNotes}</p>
                <p><strong>Total minimum hours of light:</strong> {props.recipe.lightAmount}</p>
                <p><strong>Total Amount of water per watering:</strong> {props.recipe.wateringAmount}</p>
                <p><strong>Watering Frequency:</strong> {props.recipe.wateringSchedule}</p>
                <p><strong>Created by:</strong> {props.recipe.user.username}</p>
            </div>
            {hideDelete}
            {hideEdit}
        </div>
    )
}

export default RecipeTile