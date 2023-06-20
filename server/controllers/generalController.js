const {
  getRecommended,
} = require("../../database/operations/generalOps/getRecommended");

async function recommendedList(req, res) {
  const { limit } = req.body;

  const input = limit ? limit : 10;
  const rec = await getRecommended(input);
  res.json(rec);
}

const { getUsers } = require("../../database/operations/generalOps/getUsers");

async function users(req, res) {
  const rec = await getUsers();
  res.json(rec);
}

module.exports = { users, recommendedList };
