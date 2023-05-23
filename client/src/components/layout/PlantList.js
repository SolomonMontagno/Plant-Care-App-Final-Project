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

    return (
        <div>
            <div className="centered-image">
                <img
                    className="plant-list-image thumbnail"
                    src="https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Library-Sites-JSSSharedLibrary/default/dwa5c0d6c5/images/catbanner/vegetables/vegetables_bn.jpg?sw=920"
                    alt="Plant List"
                />
                <h1>Plants</h1>
            </div>
            <div className="plant-grid">
                {plants.map((plant) => (
                    <PlantTile key={plant.id} plant={plant} />
                ))}
            </div>
        </div>
    );
}
export default PlantList