import { Router } from "express";
import { UserController } from "./user.controller";
import { body } from "express-validator";
import { validate } from "../../middleware/validator";

const router = Router();
const controller = new UserController();

// Define the user routes
router.post(
  "/users",
  validate([body("email").isEmail().normalizeEmail(), body("name").notEmpty()]),
  controller.createUser,
);

router.get("/users/:id", controller.getUser);

export default router;
