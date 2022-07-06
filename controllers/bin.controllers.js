const pool = require("../databases/database");

//get all
const getAllSubBin = async (req, res) => {
  const sqlQuery =
    "SELECT * FROM subscription WHERE visibility=0 ORDER BY deleted_at DESC";
  pool.query(sqlQuery, (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.status(200).json(rows);
    } else {
      console.log(err);
      res.status(400).send(err.message);
    }
  });
};


// restore subscription
const restoreSubscription = async (req, res) => {
    try {
      const visibility = req.body.visibility;
      const status=req.body.status;
      const id = req.body.id;
  
      const sqlQuery = "UPDATE subscription set visibility=?,status=? WHERE id=?";
      const row = pool.query(sqlQuery, [visibility,status,id]);
  
      res.status(200).send({ message: "subscription deleted" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };


module.exports = { getAllSubBin,restoreSubscription};
