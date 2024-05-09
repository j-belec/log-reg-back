const { where } = require("sequelize");
const User = require("../db/models/User");
const bcrypt = require("bcryptjs");

let actualUser;

const controllers = {
  register: async (req, res) => {
    try {
      const { email } = req.body;
      let userExist = await User.findOne({
        where: {
          email: email,
        },
      });
      if (userExist) {
        res.status(500).json({ error: "User with that email already exists" });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 8);

      const newUser = await User.create({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
      });

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      // En caso de error, enviamos una respuesta de error
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user == null) {
      return res.status(404).json({ error: "User does not exist" });
    } else if (!bcrypt.compareSync(password, user.password)) {
      return res.status(404).json({
        error: "Incorrect login credentials",
      });
    }

    actualUser = user.dataValues;

    res.status(200).json({ message: "Succesfully Login", actualUser });
  },

  actualUser: (req, res) => {
    console.log("cl actualuser");
    console.log(actualUser);
    res.status(200).json(actualUser);
  },

  editUser: async (req, res) => {
    const { name, surname, email } = req.body;
    console.log("edit user");
    console.log(req.body);

    const changedFields = {};
    if (name !== actualUser.name) {
      changedFields.name = name;
      actualUser.name = name;
    }
    if (surname !== actualUser.surname) {
      changedFields.surname = surname;
      actualUser.surname = surname;
    }
    if (email !== actualUser.email) {
      let emailExists = User.findOne({ where: { email: email } });
      if (!emailExists) {
        changedFields.email = email;
        actualUser.email = email;
      } else {
        return res.status(500).json({ error: "Email already exists" });
      }
    }

    // Si no hay ningún campo cambiado, enviar un error
    if (Object.keys(changedFields).length === 0) {
      return res
        .status(500)
        .json({ error: "You have to change at least one value!" });
    }

    User.update(changedFields, { where: { id: actualUser.id } });
    console.log(actualUser);

    res.status(200).json({ message: "Data updated!" });
  },

  changePassword: async (req, res) => {
    try {
      const { password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 8);

      const user = await User.findOne({ where: { email: actualUser.email } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.update({ password: hashedPassword });

      res.status(200).json({ message: "Password updated!" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ error: "An error has occurred" });
    }
  },
};

module.exports = controllers;
