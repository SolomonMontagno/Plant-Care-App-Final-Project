import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import RecipeList from "./RecipeList.js";
import PlantRecipeForm from "./PlantRecipeForm.js";
import { Link } from "react-router-dom";


const PlantShow = (props) => {
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
    const [weather, setWeather] = useState()

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

    const getCoordinates = async () => {
        return navigator.geolocation.getCurrentPosition(position => {
            return position.coords;

        })
    }

    const fetchWeather = async (location) => {
        try {
            const response = await fetch(`/api/v1/weather?lat=${location.latitude}&lon=${location.longitude}`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage);
                throw (error);
            }
            const weatherForecast = await response.json();
            setWeather(weatherForecast)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`);
        }
    }

    useEffect(() => {
        const positionRetrievalSuccess = (position) => {
            fetchWeather(position.coords)
        }
        navigator.geolocation.getCurrentPosition(positionRetrievalSuccess)
    }, [])

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


    const temperatureInFahrenheit =
        weather && weather.main.feels_like ? Math.round(((weather.main.feels_like - 273.15) * 9) / 5 + 32) : ""

    const feelsLike =
        weather && weather.main.temp ? Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32) : ""

    return (
        <div>
            <div className="grid-container grid-x">
                <div className="text-center card weather">
                    <div className="card-section">
                        {weather ? (
                            <>
                                <h3>Today's Weather in {weather.name}</h3>
                                <h4>Feels like: {feelsLike}°F</h4>
                                <img className="thumbnail card" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" />
                                <h4>Description: {weather.weather[0].description}</h4>
                                <h4>Actual Temp: {temperatureInFahrenheit}°F</h4>
                            </>
                        ) : (
                            <p>Loading weather...</p>
                        )}
                    </div>
                </div>

                <div className="cherokee">
                    <div className="card-section show-header">
                        <p>{plant.name}</p>
                    </div>
                    <img className="thumbnail" src={plant.plantImageUrl} alt="plant-poster" />
                    <div className="card-section text">
                        <p>Plant Family: {plant.family}</p>
                        <p>Plant Type: {plant.type}</p>
                        <p>Season typically grown during: {plant.season}</p>
                    </div>
                </div>
                <div>
                    {props.user && (
                        <Link to={`/plants/${id}/new-recipe`} className="button">
                            Add New Care Guide
                        </Link>
                    )}
                </div>
            </div>
            <div className="grid-container">
                <div className="">
                    <RecipeList deleteRecipe={deleteRecipe} plantRecipes={recipes} user={props.user} />
                </div>
            </div>
        </div>
    );
};

export default PlantShow;