import React, { useState } from "react"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"
import Dropzone from "react-dropzone"
import { useParams } from "react-router-dom"
import { Redirect } from "react-router-dom"

const PlantRecipeForm = (props) => {

    const { id } = useParams()
    console.log(id)

    const [imagePreview, setImagePreview] = useState({
        name: "",
        preview: ""
    })
    const [redirect, setRedirect] = useState(false)
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

    const postRecipe = async () => {
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
            const response = await fetch(`/api/v1/plants/${id}/recipes`, {
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
                setRedirect(true)
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
        postRecipe()
    }

    if (redirect) {
        return <Redirect to={`/plants/${id}`} />
    }

    const handleImageUpload = (acceptedImage) => {
        if (Array.isArray(acceptedImage) && acceptedImage.length > 0) {
            setNewRecipe({
                ...newRecipe,
                recipeImageUrl: acceptedImage[0],
            });
            setImagePreview({
                name: acceptedImage[0].name,
                preview: URL.createObjectURL(acceptedImage[0])
            })
        } else {
            console.error("Invalid image file")
        }
    };
    return (
        <div>
            <ErrorList errors={errors} />
            <div className="grid-container ">
                <div className="grid-x grid-padding-x card-section">
                    <div className="medium-12 large-12 card cell recipeForm">
                        <h4>Have a different care approach? Add it here.</h4>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name
                                <input type="text" placeholder="Name" name="name" onChange={handleInputChange} value={newRecipe.name}>
                                </input>
                            </label>

                            <label>
                                Pest Management Tips
                                <input type="text" placeholder="Pest Management Tips" name="pestManagement" onChange={handleInputChange} value={newRecipe.pestManagement} ></input>
                            </label>

                            <label>
                                Watering Schedule: How often do you water?
                                <input type="text" placeholder="Watering Schedule" name="wateringSchedule" onChange={handleInputChange} value={newRecipe.wateringSchedule}></input>
                            </label>

                            <label>
                                Watering Amount: How much do you water?
                                <input type="text" placeholder="Watering Amount" name="wateringAmount" onChange={handleInputChange} value={newRecipe.wateringAmount}></input>
                            </label>

                            <label>
                                How many hours of light?
                                <input type="text" placeholder="Total hours of sunlight" name="lightAmount" onChange={handleInputChange} value={newRecipe.lightAmount}></input>
                            </label>

                            <label>
                                Please add any helpful harvest tips:
                                <input type="text" placeholder="Harvest Tips" name="harvestNotes" onChange={handleInputChange} value={newRecipe.harvestNotes}></input>
                            </label>

                            <label>
                                Where is the plant located?
                                <input type="text" placeholder="Plant Location" name="plantLocation" onChange={handleInputChange} value={newRecipe.plantLocation}></input>
                            </label>

                            <Dropzone onDrop={handleImageUpload} >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()} >
                                            <input {...getInputProps()} />
                                            {/* {imagePreview.preview !== "" ? <p className="image-drop-section callout">Add an Image to your care guide - drag 'n' drop or click upload</p> : <img className="image-drop-section callout" src={imagePreview.preview} alt={imagePreview.name} />} */}
                                            <p className="image-drop-section callout">Add an Image to your care guide - drag 'n' drop or click upload</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            <img className="recipe-image" src={imagePreview.preview} alt={imagePreview.name} />
                            <input type="submit" className="button formButton" value="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlantRecipeForm