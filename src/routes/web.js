import express from "express";
import auth from "../middleware/auth";
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

    router.use(auth.verifyToken);

    router.get("/api/get-user", userController.getUserById);
    router.delete("/api/delete-user", userController.delUserById);
    router.put("/api/update-user", userController.updateUser);
    router.post("/api/create-user", userController.createUser);

    return app.use("/", router);
};

export default initWebRoute;
