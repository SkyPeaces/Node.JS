import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/createUserPage", homeController.createUserPage);
  router.post("/createUser", homeController.createUser);
  router.get("/updateUserPage/:id", homeController.updateUserPage);
  router.post("/updateUser", homeController.updateUser);
  router.get("/deleteUser/:id", homeController.deleteUser);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/getUser/:id", userController.getUserById);
  router.delete("/api/deleteUser/:id", userController.delUserById);

  return app.use("/", router);
};

export default initWebRoute;
