import express from "express"
import { AddVisit, visited } from "../controllers/VisitedController.js";
const router=express.Router();
router.get('/visited',visited);
router.post('/addVisited',AddVisit);
export default router;