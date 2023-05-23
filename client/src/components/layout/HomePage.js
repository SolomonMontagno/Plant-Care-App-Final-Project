import React from "react";
import one from "../../assets/scss/images/golden-brown-sunflower.jpg"

const HomePage = (props) => {
    return (
        <div>
            <img className="logo rounded-corner" src="https://plant-care-app-final-project.s3.amazonaws.com/golden-brown-sunflower.jpg"></img>
            <p className="homeP">Developed and Designed in Boston </p>
            <p className="authors">Solomon Montagno</p>
        </div>
    )
}

export default HomePage