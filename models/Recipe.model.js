/*
title - Type String. It should be required and unique.
instructions - Type String. It should be required.
level - Type String. It can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (use the enum validator 😉).
ingredients - Type Array of Strings - represented as [ String ].
image - Type String. Default value: "https://images.media-allrecipes.com/images/75131.jpg".
duration - Type Number. The minimum value should be 0.
isArchived - Type Boolean. The default value should be false.
created - Type Date. By default, today.
*/

const { Schema, model } = require('mongoose')

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructions: { type: String, required: true },
    level: {
      type: String,
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    },
    ingredients: {
      type: [String],
    },
    image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg',
    },
    duration: {
      type: Number,
      min: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
