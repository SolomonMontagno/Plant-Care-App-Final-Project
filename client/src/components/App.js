import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UserProfile from "./layout/UserProfile";
import HomePage from "./layout/HomePage";
import PlantList from "./layout/PlantList";
import PlantShow from "./layout/PlantShow";
import EditRecipeForm from "./layout/EditRecipeForm";
import PlantRecipeForm from "./layout/PlantRecipeForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage}>
        </Route>
        <Route exact path="/plants" component={PlantList} ></Route>
        <Route exact path="/plants/:id">
          <PlantShow user={currentUser} />
        </Route>
        <Route exact path="/plants/:id/new-recipe" component={PlantRecipeForm} user={currentUser}></Route>
        <Route exact path="/plants/:id/recipes/:recipeId/edit" component={EditRecipeForm}></Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
