const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./modules/db.js');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'postgres',
      database: 'recipes',
    },
  });

  const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/recipes', (req, res) => {
  const { name, title, ingredients, contact, description } = req.body;

  // Insert data into the 'recipes' table
  db('recipes')
    .insert({
      name,
      title,
      ingredients,
      contact,
      description,
    })
    .then(() => {
      res.send('Recipe submitted successfully!');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error submitting recipe.');
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// app.get('/', (req, res) => {
//     res.send("Hello, world!");
// });
