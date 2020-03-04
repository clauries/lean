// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const router = require("express").Router();
var Workout = require("../models/workout.js");

// Routes 
// =============================================================


// GET route for getting all of the posts
router.get("/api/workouts", function (req, res) {
    console.log("getting workouts", Workout)
    Workout.find()
        .then(function (dbWorkout) {
            console.log("inside function", dbWorkout)
            res.json(dbWorkout);
        });
});

router.post("/api/workouts", function (req, res) {
    Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", function ({body, params}, res) {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }

    ).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.json(err);
        });
})




//   // DELETE route for deleting posts
//   app.delete("/api/posts/:id", function(req, res) {
//     // Add sequelize code to delete a post where the id is equal to req.params.id, 
//     // then return the result to the user using res.json
//     db.Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     });
// });


module.exports = router