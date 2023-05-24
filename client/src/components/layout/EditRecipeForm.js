import React, { useState, useEffect } from "react"
import translateServerErrors from "../../services/translateServerErrors"
import ErrorList from "./ErrorList"
import { Redirect } from "react-router-dom"
import { useParams } from "react-router-dom"
import Dropzone from "react-dropzone"

const EditRecipeForm = (props) => {
    const defaultImageAddedText = "Add an Image to your care guide - drag 'n' drop or click upload"
    const plantId = (useParams()).id
    const recipeId = (useParams()).recipeId
    console.log("Edit", recipeId)
    const [imageAdded, setImageAdded] = useState(defaultImageAddedText)

    const blankRecipe = {
        recipeImageUrl: {},
        name: "",
        pestManagement: "",
        wateringSchedule: "",
        wateringAmount: "",
        lightAmount: "",
        harvestNotes: "",
        plantLocation: "",
    }

    const [editedRecipe, setEditedRecipe] = useState(blankRecipe)
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const getCurrentRecipe = async (recipeId) => {
        try {
            const response = await fetch(`/api/v1/recipes/${recipeId}/edit`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setEditedRecipe(body.recipe)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }
    useEffect(() => {
        getCurrentRecipe(recipeId)
    }, [])

    const patchedEditedRecipe = async () => {
        const newImageBody = new FormData()
        newImageBody.append("name", editedRecipe.name)
        newImageBody.append("pestManagement", editedRecipe.pestManagement)
        newImageBody.append("wateringSchedule", editedRecipe.wateringSchedule)
        newImageBody.append("wateringAmount", editedRecipe.wateringAmount)
        newImageBody.append("lightAmount", editedRecipe.lightAmount)
        newImageBody.append("harvestNotes", editedRecipe.harvestNotes)
        newImageBody.append("plantLocation", editedRecipe.plantLocation)
        newImageBody.append("recipeImageUrl", editedRecipe.recipeImageUrl)
        try {
            const response = await fetch(`/api/v1/recipes/${recipeId}/edit`, {
                method: "PATCH",
                headers: new Headers({
                    "Accept": "image/jpeg"
                }),
                body: newImageBody
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = await response.json()
                    throw new Error(errorMessage)
                }
            } else {
                setShouldRedirect(true)
            }
        } catch (error) {
            console.error("Error in fetch", error.message)
        }
    }

    const handleImageUpload = (acceptedImage) => {
        setEditedRecipe({
            ...editedRecipe, recipeImageUrl: acceptedImage[0]
        })
        setImageAdded("Image added")
    }

    const handleSubmit = event => {
        event.preventDefault()
        patchedEditedRecipe()
    }

    const handleChange = (event) => {
        setEditedRecipe({
            ...editedRecipe,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    if (shouldRedirect) {
        return <Redirect push to={`/plants/${plantId}`} />
    }

    return (
        <div className="grid-container">
            <div className="grid-x grid-padding-x">
                <div className="medium-6 cell">
                    <h4>Edit your Care Guide below</h4>
                    <form onSubmit={handleSubmit}>
                        <label>
                            name:
                            <input type="text" name="name" onChange={handleChange} value={editedRecipe.name}>
                            </input>
                        </label>

                        <label>
                            Pest Management Tips:
                            <input type="text" name="pestManagement" onChange={handleChange} value={editedRecipe.pestManagement} ></input>
                        </label>

                        <label>
                            Watering Schedule: How often do you water?
                            <input type="text" name="wateringSchedule" onChange={handleChange} value={editedRecipe.wateringSchedule}></input>
                        </label>

                        <label>
                            Watering Amount: How much do you water?
                            <input type="text" name="wateringAmount" onChange={handleChange} value={editedRecipe.wateringAmount}></input>
                        </label>

                        <label>
                            How many hours of light?
                            <input type="text" name="lightAmount" onChange={handleChange} value={editedRecipe.lightAmount}></input>
                        </label>

                        <label>
                            Please add any helpful harvest tips:
                            <input type="text" name="harvestNotes" onChange={handleChange} value={editedRecipe.harvestNotes}></input>
                        </label>

                        <label>
                            Where is the plant located?
                            <input type="text" name="plantLocation" onChange={handleChange} value={editedRecipe.plantLocation}></input>
                        </label>

                        <Dropzone onDrop={handleImageUpload} >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} >
                                        <input {...getInputProps()} />
                                        <p className="image-drop-section callout" >{imageAdded}</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <input type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}


export default EditRecipeForm