const express = require("express");
const router = express.Router();
//insert model
const user = require("../model/boatregistation model");
//insert user contraller
const boatregistationctrl = require("../Controllers/boatregistationctrl");

router.get("/",boatregistationctrl.getAllusers);
router.post("/",boatregistationctrl.addusers);
router.get("/:id",boatregistationctrl.getById);
router.put("/:id",boatregistationctrl.updateuser);
router.delete("/:id",boatregistationctrl.deleteuser);

//export
module.exports = router;