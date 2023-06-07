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
                            <div>
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
                                <img className="plant-photo" src={imagePreview.preview || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAAAllBMVEXv8PL6+/0REiSAiZAAAAD9/v/W19ru7/H09fd0f4V5g4rS1tnBxcmxt7t2gInn6euNlpsLDCAAABcAABqjqa4AABMAABjM0NSFjZQMDiCNjZWUlJoTFCZtbnYnKDciIzGcnKAvLzt+f4eCgopBQUxzc3sAAB8AAAxgYWs3OERXV2IbHS3Gys6tsrbc3+JKSlRnaHFNUFlcccasAAAE3ElEQVR4nO3cCXeiSBSGYQcYgkYbyxKNVSyyRZYk6P//cwMurSZo2nhabznfm8R2Oenm8RbgMTnd+edB69x7A/5WgKkWYKoFmGoBplqAqRZgqgWYagGmWoCpFmCqBZhq/Q9hVkeBrB/A7r3NfxZggBEJMMCIBBhgRAIMMCIBBhiRAAOMSIABRiTAACMSYIARCTDAiAQYYEQCDDAiAQYYkQADjEiAAUYkwAAjEmCAEQkwwIh0E5h1dSRh1nRwdc8EYdbgV+/XtXUHlw7tBhPr6v1rG+jdS//Vvw+zu8Ord7LOsGtThD1d+C1fegLsd4AB9jnAzqQ4zHr6sDutJ2K1YVb/pdcbvrXJlIbVL730utYXT0rDPnr6ul4LQWWYNdjB+l9HpjRsrG9h7w8Ge9SJPew+Vo+suz4qtgxMbVjHmg51ffj8cOex5j0f225/30Zx2OkA23cnmHnZm06qwKxxb3qRTBFY7dJ/XSRTBDZuTsUXzUwJmDXevMQ4K7OPHSrAdi793Gq0X46fDBVgv11nZma/6L3hoYQ+zDpwnZJZtat+7PDpIA87dp1YjWvXsYw67LOrbWbW1lW3X43EYV9dLbK962BmtGFtri+yA9eBjDas1fVpPzty7VcjZVj7vD7N7LNrd9QnDDvt2susL67daiQMO+PS9e5G1uLaysjCzs1rN7O2ee1WI1XYd6617ISrrp4ZUdi3rvrY+HbS1cyMJuxb1Xrrzz04VBj2TYABBhhgjwKzvj+J/UE9gr+v+Kz3rk5v/enSnWGW/Xx19sW/FXwD2H0CDDAiAQYYkQADjEiAAUYkwAAjEmCAEQkwwIgEGGBEAgwwIgEGGJEAA4xIgAFGJMAAIxJggBEJMMCIBBhgRAIMMCIBBhiRfgJ7UqCfwK7/L8Nv0Q9gigeYagGmWoCpFmCqBZhqAaZagKkWYKoFmGoBplqAqVbn3wetYz5oHeNB62gPGmCqtYWx7Zd28Kemca6x/a3mGt/fJN4GNsuZxvxyfZ2F7uah2agonDDfUdyKaUERzu6wkT9pA+PLjI/EyBlpE8cQJXOcCXOMcV06NxzDYMwwwqlh5CIhNrKTz/MGxkrhBFEkYyOSaSRDKdNqvjJXhuHZhTSnfmKaVT8x/SS/JazeD5i23RsYm+1vbe5pPl3GWfO5vuB8xrh7CNMc6S69dJR6S8OIX4VrpGmxSKYfkSf9qZG993PDt83mL7ihy03DrN5wP3fLegcRWc59zgKPudxnAXMDl62SeCnyVCYyKeeuzFIRxgU/hPGsEIXMllHCHcHmi9EyrvjCeDUjWQ2MfPC2cEJ7Gtx2HY7itHoX9XZVIhIrUY1XaRQVMl5kaRbF81h4HouzLCllNq6yeT725ux9nk4OYRobR6Vgvi9ZkGVe5spixeeeeEvM0Ez7qRxEyVtlLm4KY9V7KKt5EhWxiNylFJknRBWLMsrSVMqkSNNyKZfFPJfRKh5E9Z1RGs+dIxj3Ah6KlPkidZbGUgRhyFYymjhZ9SozZ1EvSc9Ib33oKHkYsIT5YRnMkrIsE64lQRlOEi3X/LIMfZbwJE8Kt15ovtM86oSBdgRrzlBsUp+3RlyrP0bN3sSdSXM/c+pVyx3Gb38Wq7dp1lyw+uhXX9sePHYf2+tse4zZXrBPsEcLMNV6WNh/8aby8QlaAncAAAAASUVORK5CYII="} alt={imagePreview.name} />
                            </div>
                                <input type="submit" className="button margin formButton" value="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlantRecipeForm