const pool = require("../databases/database");

//get all
const getAllNotification = async (req, res) => {
    const sqlQuery =
    "SELECT * FROM request r INNER JOIN site s ON r.SiteId  = s.siteid JOIN subscription s2 ON s.idSubscription  = s2.id ORDER BY r.date DESC";
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


//get by Id
const getNotification = async (req, res) => {
    const sqlQuery =
    "SELECT * FROM request r INNER JOIN site s ON r.SiteId  = s.siteid JOIN subscription s2 ON s.idSubscription  = s2.id WHERE r.idRequest=?";
    pool.query(sqlQuery,req.params.id, (err, rows, fields) => {
      if (!err) {
        console.log(rows);
        res.status(200).json(rows);
      } else {
        console.log(err);
        res.status(400).send(err.message);
      }
    });
  };
  

  module.exports = {getAllNotification,getNotification};