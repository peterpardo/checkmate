const router = require("express").Router();
const monitorController = require("../controllers/monitorController");
router.get("/", monitorController.getAllMonitors);
router.get("/:monitorId", monitorController.getMonitorById);
router.get("/user/:userId", monitorController.getMonitorsByUserId);

module.exports = router;