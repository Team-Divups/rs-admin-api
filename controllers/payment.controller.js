const pool = require("../databases/database");

//get payment history for a subscription
const getPaymentId = async (req, res) => {
    const sqlQuery = "SELECT * FROM payment WHERE subscription_id=?";
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

  const CreatePayment = async(req,res) =>{
    try {
      const subscription_id = req.body.subscription_id;
     
      const sqlQuery =
        "INSERT INTO billing (subscription_id,next_bill_date,end_date,start_date) VALUES (?,LAST_DAY(CURRENT_DATE() + INTERVAL 1 MONTH),LAST_DAY(CURRENT_DATE()),LAST_DAY(CURRENT_DATE() + INTERVAL -1 MONTH))";
      const row = pool.query(sqlQuery, [subscription_id]);
  
      console.log(row);
      res.status(200).send({ message: "Payment done" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

module.exports ={getPaymentId,CreatePayment};