const pool = require("../databases/database");
const path = require("path");

//get all
const getAllSub = async (req, res) => {
  const sqlQuery =
    "SELECT * FROM subscription WHERE visibility=1 ORDER BY created_at DESC";
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

//get subscription by id
const getSubById = async (req, res) => {
  const sqlQuery = "SELECT * FROM subscription WHERE id=?";
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

//get users of a specific subscription
const getSubUsers = async (req, res) => {
  const sqlQuery =
    "SELECT * FROM client_user join site on client_user.idSite = site.siteid where site.idSubscription=?";
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

//get sites of a certain subscription
const getSubSites = async (req, res) => {
  const sqlQuery = "SELECT * FROM site WHERE idSubscription=? AND visibility=1";
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

//get sub ratings
const getSubRatings = async (req, res) => {
  const sqlQuery =
    "SELECT (CAST(AVG(reviews.rating) AS SIGNED)) as rate FROM reviews left join site on reviews.site_id =site.siteid  WHERE site.idSubscription =?";
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

//create new subscription
const createSub = async (req, res) => {
  try {
    const name = req.body.name;
    const type = req.body.type;
    const category = req.body.category;
    const location = req.body.location;
    const appLogo = req.fi;
    const description = req.body.description;
    const owner = req.body.owner;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const WebsiteURL = req.body.WebsiteURL;
    const LinkedIn = req.body.LinkedIn;
    const facebook = req.body.facebook;
    const Instagram = req.body.Instagram;

    const sqlQuery =
      "INSERT INTO subscription (name,type,category,location,appLogo,description,owner,email,contactNo,WebsiteURL,LinkedIn,facebook,Instagram) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const row = pool.query(sqlQuery, [
      name,
      type,
      category,
      location,
      appLogo,
      description,
      owner,
      email,
      contactNo,
      WebsiteURL,
      LinkedIn,
      facebook,
      Instagram,
    ]);

    console.log(row);
    res.status(200).send({ message: "subscription added" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const updateSub = async (req, res) => {
  try {
    const name = req.body.name;
    const type = req.body.type;
    const category = req.body.category;
    const location = req.body.location;
    const appLogo = req.file;
    const description = req.body.description;
    const owner = req.body.owner;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const WebsiteURL = req.body.WebsiteURL;
    const LinkedIn = req.body.LinkedIn;
    const facebook = req.body.facebook;
    const Instagram = req.body.Instagram;
    const id = req.body.id;

    const sqlQuery =
      "UPDATE subscription SET name=?,type=?,category=?,location=?,appLogo=?,description=?,owner=?,email=?,contactNo=?,WebsiteURL=?,LinkedIn=?,facebook=?,Instagram=? WHERE id=?";
    const row = pool.query(sqlQuery, [
      name,
      type,
      category,
      location,
      appLogo,
      description,
      owner,
      email,
      contactNo,
      WebsiteURL,
      LinkedIn,
      facebook,
      Instagram,
      id,
    ]);

    console.log(row);
    res.status(200).send({ message: "subscription updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

/*delete all subscriptions
const deleteAll = async (req, res) => {
  try {
    const sqlQuery = "DELETE FROM subscription";
    const row = pool.query(sqlQuery);

    res.status(200).send({ message: "Data Deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete a specific subscription
const deleteOne = async (req, res) => {
  try {
    const sqlQuery = "DELETE FROM subscription WHERE id=?";
    const row = pool.query(sqlQuery, req.params.id);

    res.status(200).send({ message: "Data Deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};*/

//store in delete table
const deleteSubAll = async (req, res) => {
  try {
    const visibility = req.body.visibility;
    const status = req.body.status;

    const sqlQuery =
      "UPDATE subscription set visibility=?,status=?,deleted_at= cast(current_date() AS Date) ";
    const row = pool.query(sqlQuery, [visibility]);

    res.status(200).send({ message: "subscriptions deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete a sub
const deleteSub = async (req, res) => {
  try {
    const visibility = req.body.visibility;
    const status = req.body.status;
    const id = req.body.id;

    const sqlQuery =
      "UPDATE subscription set visibility=?,status=?,deleted_at= cast(current_date() AS Date) WHERE id=?";
    const row = pool.query(sqlQuery, [visibility, status, id]);

    res.status(200).send({ message: "subscription deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

//delete a sub
const deleteSite = async (req, res) => {
  try {
    const visibility = req.body.visibility;
    const siteid = req.body.siteid;

    const sqlQuery = "UPDATE site set visibility=? WHERE siteid=?";
    const row = pool.query(sqlQuery, [visibility, siteid]);

    res.status(200).send({ message: "site deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

//freeze a sub
const freezeSub = async (req, res) => {
  try {
    const visibility = req.body.visibility;
    const status = req.body.status;
    const id = req.body.id;

    const sqlQuery =
      "UPDATE subscription set visibility=?,status=?,deleted_at= cast(current_date() AS Date) WHERE id=?";
    const row = pool.query(sqlQuery, [visibility, status, id]);

    res.status(200).send({ message: "subscription deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllSub,
  getSubById,
  getSubUsers,
  getSubSites,
  createSub,
  updateSub,
  deleteSub,
  deleteSubAll,
  getSubRatings,
  freezeSub,
  deleteSite,
};
