import React from "react";
import PlantList from "./PlantList";
import { Link } from "react-router-dom";
const HomePage = (props) => {
    return (
        <div className="grid-container">
            <div>
                <img
                    className="logo thumbnail"
                    src="https://plant-care-app-final-project.s3.amazonaws.com/Screen+Shot+2023-05-22+at+10.16.45+PM.png"
                    ></img>
                    <p>Welcome to PlantSage, your ultimate plant care companion! Whether you're a seasoned plant enthusiast or just starting your green journey, PlantSage provides expert knowledge and guidance with comprehensive care guides for a wide range of plants. Contribute your own care guides and unlock the full potential of your green space with PlantSage's user-friendly experience.</p>
            </div>
            <div className="featured">
                <h4>Featured Plants</h4>
                <div className="grid-x grid-margin-x align-center">
                    <div className="cell small-4 featured-plants">
                        <Link to="/plants/4">
                            <img src="https://plant-care-app-final-project.s3.amazonaws.com/Screenshot+2023-05-25+at+4.03.31+PM.png"></img>
                        </Link>
                    </div>
                    <div className="cell small-4 featured-plants">
                        <Link to="/plants/1">
                            <img src="https://plant-care-app-final-project.s3.amazonaws.com/Screenshot+2023-05-25+at+4.03.13+PM.png"></img>
                        </Link>
                    </div>
                    <div className="cell small-4 featured-plants">
                        <Link to="/plants/2">
                            <img src="https://plant-care-app-final-project.s3.amazonaws.com/Screenshot+2023-05-25+at+4.01.04+PM.png"></img>
                        </Link>
                    </div>
                </div>
            </div>
            <p className="homeP">Developed and Designed in Boston </p>
            <p className="authors">Solomon Montagno</p>
        </div>
    );
};

export default HomePage;