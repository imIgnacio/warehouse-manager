const router = require("express").Router();
const { Warehouse, User , Vehicle } = require("../models");
//const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/user/:id", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render("project", {
//       ...project,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("profile", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;
