const pool = require("../databases/database");

const getbillingById = async (req, res) => {
    const sqlQuery = "select (datediff(current_date(),b.bill_date)) as delay,b.bill_date,(datediff(current_date(),s.created_at)) as sub_delay from billing b join subscription s on b.idSub =s.id  where idSub=?";
    pool.query(sqlQuery, req.params.id, (err, rows, fields) => {
      if (!err) {
        console.log(rows);
        res.status(200).json(rows);
      } else {
        console.log(err);
        res.status(400).send(err.message);
      }
    });
  };

const CreateBilling = async(req,res) =>{
  try {
    const idSub = req.body.idSub;
   
    const sqlQuery =
      "INSERT INTO billing (idSub,bill_date) VALUES (?,LAST_DAY(CURRENT_DATE() + INTERVAL 1 MONTH))";
    const row = pool.query(sqlQuery, [idSub]);

    console.log(row);
    res.status(200).send({ message: "bILLING CREATED" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
}

module.exports ={getbillingById,CreateBilling};