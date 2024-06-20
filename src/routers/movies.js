const { Router } = require("express");
const moviesController = require("../controllers/movies");

const moviesRouter = Router();

moviesRouter.get("/", moviesController.getAll);
moviesRouter.get("/favourites", moviesController.getAllFavorites);
moviesRouter.get("/:id", moviesController.getOne);
moviesRouter.post("/:id/favourite", moviesController.addFavoriteMovie);

module.exports = moviesRouter;
