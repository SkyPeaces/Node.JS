import homeService from "../services/homeService";

let getHomePage = async (req, res) => {
  // const [rows, fields] = await connection.execute("SELECT * FROM `users`");
  try {
    let data = await homeService.getUser();
    // console.log(data);
    return res.render("homePage.ejs", { dataUser: data });
  } catch (error) {
    console.log(error);
  }
};

let getDetailPage = async (req, res) => {
  const [rows, fields] = await connection.execute("SELECT * FROM `users` WHERE id = ?", [req.params.UserId]);
  return res.render("update.ejs", { dataUser: rows });
  // return res.send('hello detail page')
};

let createUserPage = (req, res) => {
  return res.render("CreateUserPage.ejs");
};

let createUser = async (req, res) => {
  // const [rows, fields] = await connection.execute("SELECT max(id) as id FROM `users`");
  // let id = rows[0].id + 1;
  // let { userName, userDecs, passWord } = req.body;
  // await connection.execute("INSERT INTO users(id, user_name, user_decs, password) values (?, ?, ?, ?)", [id, userName, userDecs, passWord]);
  try {
    await homeService.createUser(req.body);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

let updateUser = async (req, res) => {
  // let { userName, passWord, userDecs } = req.body;
  // await connection.execute("UPDATE users SET user_decs = ?, Password = ? WHERE user_name = ?", [userDecs, passWord, userName]);
  try {
    await homeService.updateUser(req.body);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

let updateUserPage = async (req, res) => {
  // let { userName, passWord, userDecs } = req.body;
  // await connection.execute("UPDATE users SET user_decs = ?, Password = ? WHERE user_name = ?", [userDecs, passWord, userName]);
  try {
    await homeService.updateUserPage(req.params);
    return res.render("updateUserPage.ejs", { dataUser: rows });
  } catch (error) {
    console.log(error);
  }
};

let deleteUser = async (req, res) => {
  // await connection.execute("DELETE FROM `users` WHERE id = ?", [req.params.UserId]);
  try {
    await homeService.deleteUser(req.params);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export default {
  getHomePage,
  getDetailPage,
  createUser,
  updateUser,
  deleteUser,
  createUserPage,
  updateUserPage,
};
