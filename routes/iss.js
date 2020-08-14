const express = require("express");
const router = new express.Router();
const fetch = require("node-fetch");
let location;
router.get("/getLocation", async (req, res) => {
  const location_response = await fetch(
    "https://api.wheretheiss.at/v1/satellites/25544"
  );

  const location = await location_response.json();

  res.json(location);
});

router.get("/getAstros", async (req, res) => {
  const astros_responce = await fetch("http://api.open-notify.org/astros.json");

  const astro = await astros_responce.json();
  const astros = astro.people.filter((astr) => astr.craft === "ISS");

  res.json(astros);
});

module.exports = router;
