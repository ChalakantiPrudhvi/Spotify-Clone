import { addsong,listsong } from "../controllers/songControllers.js";
import express from 'express';

const songRouter = express.Router();

songRouter.post("/add",addsong);
songRouter.get("/list",listsong);

export default songRouter;
