const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// middleware start
router.use(validateToken);
// middleware end

/* 
// Either write seprate router line code for create api with same route path but different API method like get/post/put/delete/patch or merge then in same line
router.route("/").get(getContacts);
router.route("/").post(createContacts);
 */
router.route("/").get(getContacts).post(createContacts);

/* 
// Either write seprate router line code for create api with same route path but different API method like get/post/put/delete/patch or merge then in same line
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);
 */
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
