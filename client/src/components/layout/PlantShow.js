import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import { useParams } from "react-router-dom"
import RecipeList from "./RecipeList";

const PlantShow = (props) => {
    // console.log(props)
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
    useEffect(() => {
        getPlant()
    }, [])
    return (
        <div>
            <img src={plant.plantImageUrl} alt="plant-poster"></img>
            <p>{plant.name}</p>
            <p>{plant.family}</p>
            <p>{plant.type}</p>
            <p>{plant.season}</p>
            <div>
                <RecipeList plantRecipes={recipes}/>
            </div>
        </div>
    )
}

export default PlantShow