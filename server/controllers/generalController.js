const {
  getRecommended,
} = require("../../database/operations/generalOps/getRecommended");

async function recommendedList(req, res) {
  const rec = await getRecommended();
  res.json(rec);
}

module.exports = { recommendedList };
