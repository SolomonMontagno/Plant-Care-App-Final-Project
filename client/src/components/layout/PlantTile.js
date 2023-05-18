import React from "react";
import { Redirect, Link } from "react-router-dom";
import PlantList from "./PlantList";
const PlantTile = ({ plant }) => {
    console.log(plant)
    return (
        <Link to={`/plants/${plant.id}`}>
            <div>
                <img src={plant.plantImageUrl}></img>
                <p>{plant.name}</p>
                <p>{plant.family}</p>
                <p>{plant.type}</p>
            </div>
        </Link>
    )
}

export default PlantTile