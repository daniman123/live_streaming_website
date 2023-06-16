const {
  getRecommended,
} = require("../../database/operations/generalOps/getRecommended");

async function recommendedList(req, res) {
  const rec = await getRecommended();
  res.json(rec);
}

const { getUsers } = require("../../database/operations/generalOps/getUsers");

async function users(req, res) {
  const rec = await getUsers();
  res.json(rec);
}

module.exports = { users, recommendedList };
