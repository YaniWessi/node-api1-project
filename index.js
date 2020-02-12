// implement your API here
const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.post("/api/users", (req, res) => {
  const dbInfo = req.body;
  Users.insert(dbInfo)
    .then(users => {
      if (!dbInfo.name || !dbInfo.bio) {
        res
          .status(400)
          .json({ errorMessage: "please provide error message for user" });
      } else {
        res.status(201).json(users);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "there was an error while saving the user to the database"
      });
    });
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      if (!users) {
        res.status(500).json({
          errorMessage: "The user information could not be retrieved."
        });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "there was an error while saving the user to the database"
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  Users.find()
    .then(users => {
      if (!id) {
        res
          .status(404)
          .json({ message: "The user information could not be retrieved." });
      } else {
        res.status(200).json(users);
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(deleted => {
      if (!id) {
        res
          .status(500)
          .json({ message: "The user with the specified ID does not exit." });
      } else {
        res.status(200).json(deleted);
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user could not be removed."
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  const updateUser = req.body;
  Users.update(updateUser, req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ errorMassage: "There was an error" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be modified."
      });
    });
});

const port = 5000;

server.listen(port, () => console.log(`\n** API on port ${port} \n`));
