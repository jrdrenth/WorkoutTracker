const router = require('express').Router();
const mongoose = require('mongoose');
const { Workout } = require('../models');

//const prettyJson = JSON.stringify(workout, null, 2);
//console.log(prettyJson);

router.post('/workouts', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.json(workout);

  } catch (err) {
    res.json(err);
  }
});

router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.aggregate([
      {
        $set: { totalDuration: { $sum: '$exercises.duration' } }
      }
    ]);

    // const workouts = workoutData.map(({ totalDuration, day, exercises }) => ({
    //   date: moment(day).format('YYYY-MM-DDThh:mm:ss.sZ'),
    //   totalDuration,
    //   exercises
    // }));

    res.json(workouts);

  } catch (err) {
    res.json(err);
  }
});

router.get('/workouts/range', async (req, res) => {
  try {
    const workouts = await Workout.aggregate([
      {
        $set: { totalDuration: { $sum: '$exercises.duration' } }
      }
    ])
    .sort({ _id: -1 })
    .limit(7);

    res.json(workouts);

  } catch (err) {
    res.json(err);
  }
});

router.get('/workouts/:id', async (req, res) => {
  try {
    const workouts = await Workout.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) }
      },
      {
        $set: { totalDuration: { $sum: '$exercises.duration' } }
      }
    ]);

    res.json(workouts[0]);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.put('/workouts/:id', async ({ body, params }, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(params.id,
      { $push: { exercises: body } },
      {
        // "new" will return object after update is applied
        new: true,
        
        // "runValidators" ensures schema validators are applied
        runValidators: true
      }
    );
    res.json(workout);

  } catch (err) {
    res.json(err);
  }
});

router.delete('/workouts/:id', async ({ params }, res) => {
  try {
    const result = await Workout.deleteOne({ _id: mongoose.Types.ObjectId(params.id) });
    res.json(result);

  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
