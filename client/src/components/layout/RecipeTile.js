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
                <p>Plant Location: {props.recipe.plantLocation}</p>
                <p>Harvest Notes: {props.recipe.harvestNotes}</p>
                <p>Total minimum hours of light: {props.recipe.lightAmount}</p>
                <p>Total Amount of water per watering: {props.recipe.wateringAmount}</p>
                <p>Watering Frequency: {props.recipe.wateringSchedule}</p>
                <p>Created by: {props.recipe.user.username}</p>
            </div>
            {hideDelete}
            {hideEdit}
        </div>
    )
}

export default RecipeTile