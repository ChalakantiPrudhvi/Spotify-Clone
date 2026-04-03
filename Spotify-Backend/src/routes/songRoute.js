import { addsong,listsong } from "../controllers/songControllers.js";
import express from 'express';
import upload from "../middlewares/multer.js";

const songRouter = express.Router();

songRouter.post("/add",upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addsong);
songRouter.get("/list",listsong);

export default songRouter;
