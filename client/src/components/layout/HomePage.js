import React from "react";
import one from "../../assets/scss/images/golden-brown-sunflower.jpg"

const HomePage = (props) => {
    return (
        <div>
            <h1 className="home">PlantSage</h1>
            <img className="logo rounded-corner" src={one}></img>
            <p className="homeP">Developed and Designed in Boston </p>
            <p className="authors">Solomon Montagno</p>
        </div>
    )
}

export default HomePage