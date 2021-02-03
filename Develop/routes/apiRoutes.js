const notes = require("../db/db.json");

// ROUTING

module.exports = (app) => {
  app.get("/api/notes", (req, res) => res.json(notes));

  app.post("/api/notes", (req, res) => {
    //get new note saved to req.body, give it a unique id. pass it to the db/json
    //then return the new note to the client html

    //example code
    // if (tableData.length < 5) {
    //   tableData.push(req.body);
    //   res.json(true);
    // } else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });
};
