const ingredientRepository = require("../repositories/ingredient.repositories");

async function create(req, res, next) {
  try {
    const data = req.body;
    const newIngredient = await ingredientRepository.create(data);
    return res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const ingredients = await ingredientRepository.getAll();
    return res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await ingredientRepository.remove(req.params.id);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  get,
  remove,
};
