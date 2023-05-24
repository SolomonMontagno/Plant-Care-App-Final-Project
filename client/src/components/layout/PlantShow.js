import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import RecipeList from "./RecipeList.js";
import PlantRecipeForm from "./PlantRecipeForm.js";

const PlantShow = (props) => {
    
    let visibleRecipeFormComponent

    const { id } = useParams();

    const [plant, setPlant] = useState({
        name: "",
        family: "",
        type: "",
        heirloom: "",
        annual: "",
        season: "",
        plantImageUrl: "",
    })

    const [recipes, setRecipes] = useState([])

    const getPlant = async () => {
        try {
            const response = await fetch(`/api/v1/plants/${id}`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const plantData = await response.json()
            setPlant(plantData.plant)
            setRecipes(plantData.plant.recipes)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const deleteRecipe = async (recipeId) => {
        try {
            const response = await fetch(`/api/v1/plants/${props.plantId}/recipes/${recipeId}`,
                { method: "DELETE" })
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }

            const filteredRecipe = recipes.filter(recipes => {
                return recipeId !== recipes.id
            })
            setRecipes(filteredRecipe)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getPlant()
    }, [])


    if (props.user) {
        visibleRecipeFormComponent = <PlantRecipeForm
            plant={plant}
            plantId={id}
            recipes={recipes}
            setRecipes={setRecipes}

        />
    } else {
        visibleRecipeFormComponent = null
    }

    return (
        <div>
            <div className="grid-container grid-x">
                <div className="column cherokee">
                    <div className="card-section show-header">
                        <p>{plant.name}</p>
                    </div>
                    <img className="thumbnail" src={plant.plantImageUrl} alt="plant-poster"></img>
                    <div className="card-section">
                        <p> Plant Family: {plant.family}</p>
                        <p>Plant Type: {plant.type}</p>
                        <p>Season typically grown during: {plant.season}</p>
                    </div>
                </div>
                <RecipeList deleteRecipe={deleteRecipe} plantRecipes={recipes} user={props.user} />
            </div>
            <div>
                {visibleRecipeFormComponent}
            </div>
        </div>
    )
}

export default PlantShow