import React, { useEffect, useState } from "react";
import PlantTile from "./PlantTile";

const PlantList = (props) => {
    const [plants, setPlants] = useState([])

    const getPlants = async () => {
        try {
            const response = await fetch("/api/v1/plants");
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const body = await response.json()
            setPlants(body.plants)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }
    useEffect(() => {
        getPlants()
    }, [])

    const plantsListArray = plants.map((plant) => {
        return <PlantTile plant={plant} key={plant.id} />
    })
    return (
        <div>
            <h1>Plants</h1>
            <div>
                {plantsListArray}
            </div>
        </div>

    )
}


export default PlantList