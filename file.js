const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Dummy data for users
let users = [];

// Handler for creating a user
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).send(`User ${user.name} added to the database.`);
});

// Handler for fetching all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Handler for fetching a specific user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send(`User with ID ${id} not found.`);
  }
});

// Handler for updating a user's information
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  if (userIndex !== -1) {
    users[userIndex] = { id: parseInt(id), name, age };
    res.status(200).send(`User with ID ${id} updated.`);
  } else {
    res.status(404).send(`User with ID ${id} not found.`);
  }
});

// Handler for deleting a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).send(`User with ID ${id} deleted.`);
  } else {
    res.status(404).send(`User with ID ${id} not found.`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
