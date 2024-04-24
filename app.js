const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const Recipe = require('./models/Recipe.model')

const app = express()

// MIDDLEWARE
app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send('<h1>LAB | Express Mongoose Recipes</h1>')
})

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
  const payload = req.body
  console.log(payload)
  try {
    const newRecipe = await Recipe.create(payload)
    res.status(201).json(newRecipe)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.status(200).json(recipes)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    res.status(200).json(recipe)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:recipeId', async (req, res) => {
  const payload = req.body
  console.log(payload)
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, payload, {
      new: true,
      runValidators: true,
    })
    res.status(200).json(updatedRecipe)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipeId', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.status(204).send()
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev'

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    // Start the server
    app.listen(3000, () => console.log('My first app listening on port 3000!'))
  })
  .catch(err => console.error('Error connecting to mongo', err))

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app
