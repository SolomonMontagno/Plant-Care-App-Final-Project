import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"
import Dropzone from "react-dropzone"


const PlantRecipeForm = ({ plant, plantId, recipes, setRecipes }) => {
    const defaultImageAddedText = "Add an Image to your care guide - drag 'n' drop or click upload"
    const [imageAdded, setImageAdded] = useState(defaultImageAddedText)
    const [newRecipe, setNewRecipe] = useState({
        recipeImageUrl: {},
        name: "",
        pestManagement: "",
        wateringSchedule: "",
        wateringAmount: "",
        lightAmount: "",
        harvestNotes: "",
        plantLocation: "",
    })

    const [errors, setErrors] = useState([])

    const postRecipe = async (newRecipeData) => {
        const newImageBody = new FormData()
        newImageBody.append("name", newRecipe.name)
        newImageBody.append("pestManagement", newRecipe.pestManagement)
        newImageBody.append("wateringSchedule", newRecipe.wateringSchedule)
        newImageBody.append("wateringAmount", newRecipe.wateringAmount)
        newImageBody.append("lightAmount", newRecipe.lightAmount)
        newImageBody.append("harvestNotes", newRecipe.harvestNotes)
        newImageBody.append("plantLocation", newRecipe.plantLocation)
        newImageBody.append("recipeImageUrl", newRecipe.recipeImageUrl)
        try {
            const response = await fetch(`/api/v1/plants/${plantId}/recipes`, {
                method: "POST",
                headers: new Headers({
                    "Accept": "image/jpeg",
                }),
                body: newImageBody
            });
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json();
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors);
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw error
                }
            } else {
                const responseBody = await response.json()
                setErrors([])
                setRecipes([...recipes, responseBody.recipe]);
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }
    const handleInputChange = (event) => {
        setNewRecipe({
            ...newRecipe,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postRecipe(newRecipe, plant.id)
        clearForm()
    }

    const clearForm = () => {
        setNewRecipe({
            recipeImageUrl: {},
            name: "",
            pestManagement: "",
            wateringSchedule: "",
            wateringAmount: "",
            lightAmount: "",
            harvestNotes: "",
            plantLocation: "",
        })
    }
    const handleImageUpload = (acceptedImage) => {
        setNewRecipe({
            ...newRecipe, recipeImageUrl: acceptedImage[0]
        })
        setImageAdded("Image added")
    }
    return (
        <div>
            <ErrorList errors={errors} />
            <div className="grid-container">
                <div className="grid-x grid-padding-x">
                    <div className="medium-6 cell">
                        <h4>Have a different care approach? Add it here.</h4>
                        <form onSubmit={handleSubmit}>
                            <label>
                                name:
                                <input type="text" name="name" onChange={handleInputChange} value={newRecipe.name}>
                                </input>
                            </label>

                            <label>
                                Pest Management Tips:
                                <input type="text" name="pestManagement" onChange={handleInputChange} value={newRecipe.pestManagement} ></input>
                            </label>

                            <label>
                                Watering Schedule: How often do you water?
                                <input type="text" name="wateringSchedule" onChange={handleInputChange} value={newRecipe.wateringSchedule}></input>
                            </label>

                            <label>
                                Watering Amount: How much do you water?
                                <input type="text" name="wateringAmount" onChange={handleInputChange} value={newRecipe.wateringAmount}></input>
                            </label>

                            <label>
                                How many hours of light?
                                <input type="text" name="lightAmount" onChange={handleInputChange} value={newRecipe.lightAmount}></input>
                            </label>

                            <label>
                                Please add any helpful harvest tips:
                                <input type="text" name="harvestNotes" onChange={handleInputChange} value={newRecipe.harvestNotes}></input>
                            </label>

                            <label>
                                Where is the plant located?
                                <input type="text" name="plantLocation" onChange={handleInputChange} value={newRecipe.plantLocation}></input>
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
        </div>
    )
}

export default PlantRecipeForm