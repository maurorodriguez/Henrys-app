const { Burger } = require("../models");

async function create(data) {
  const burger = await Burger.create(data);
  await burger.addIngredient(data.ingredients);     
  const withRelation = await Burger.findByPk(burger.id, { include: [{ association: "ingredient", attributes: ["name"], through: {
    attributes: [],
  }, }] });        
  
  return withRelation;
}

module.exports = {
    create,
};
