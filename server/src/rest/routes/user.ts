import { Router } from "express"
import {
    listAll, getOneById, newUser
} from "../controllers/UserController";

const router = Router();

// Get all user
router.get("/", listAll);
// Get one user
router.get("/:id([0-9]+)", getOneById);
// Create a new user
router.post("/", newUser);

export default router;
