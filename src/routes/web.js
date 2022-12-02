import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/createUserPage", homeController.createUserPage);
  router.post("/createUser", homeController.createUser);
  router.get("/updateUserPage/:id", homeController.updateUserPage);
  router.post("/updateUser", homeController.updateUser);
  router.get("/deleteUser/:id", homeController.deleteUser);

  return app.use("/", router);
};

export default initWebRoute;
