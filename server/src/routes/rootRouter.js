import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import plantsRouter from "./api/v1/plantRouter.js";
import recipeRouter from "./api/v1/RecipeRouter.js";
const rootRouter = new express.Router();

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/plants", plantsRouter)
rootRouter.use("/api/v1/recipes", recipeRouter)
rootRouter.use("/", clientRouter);
//place your server-side routes here

export default rootRouter;
