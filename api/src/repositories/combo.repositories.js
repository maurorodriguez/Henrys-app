const { Combo } = require("../models");
const { Op } = require("sequelize");

async function create(data) {
  const combo = await Combo.create(data);
  await combo.addBurger(data.burgers);
  await combo.addBeverage(data.beverages);
  await combo.addFries(data.fries);
  const withRelation = await getById(combo.id);

  return withRelation;
}

async function getById(id) {
  const combo = await Combo.findByPk(id, {
    include: [
      {
        association: "burger",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        association: "beverage",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        association: "fries",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return combo;
}

async function getAll() {
  const combos = await Combo.findAll();
  return combos;
}

async function getByQuery(queries) {
  if (!queries) {
    return await getAll();
  }

  const combos = await Combo.findAll({ where: queries });
  return combos;
}

async function getByName(name) {
  const combo = await Combo.findOne({
    where: { name: { [Op.iLike]: `${name}` } },
  });
  return combo;
}

module.exports = {
  create,
  getById,
  getAll,
  getByQuery,
  getByName,
};
