import React from "react";
import { Redirect, Link } from "react-router-dom";
import PlantList from "./PlantList";


const PlantTile = ({ plant }) => {
    return (
        <div className="column ">
            <div className="card plant-list">
                <div className="card-section name-text">
                    <h4>{plant.name}</h4>
                </div>
                <div className="card-section plant-photo">
                    <Link className="thumbnail" to={`/plants/${plant.id}`}>
                        <img src={plant.plantImageUrl} alt={plant.name} />
                    </Link>
                </div>
                <div className="card-section">
                    <p>Family: {plant.family} </p>
                    <p>Type: {plant.type}</p>
                </div>
            </div>
        </div>
    );
};

export default PlantTile;