const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        name: {
          type: String,
          trim: true,
          required: 'Exercise name is required'
        },
        type: {
          type: String,
          trim: true,
          required: 'Exercise type is required'
        },
        duration: {
          type: Number,
          required: 'Exercise duration is required',
          min: [1, 'Duration must be at least 1 minute']
        },
        weight: {
          type: Number,
          min: [1, 'Weight must be at least 1 lb']
        },
        sets: {
          type: Number,
          min: [1, 'Exericse must have at least 1 set']
        },
        reps: {
          type: Number,
          min: [1, 'Set must have at least 1 rep']
        },
        distance: {
          type: Number,
          min: [1, 'Exericse must be at least 1 mi']
        }
      }
    ]
  }
  //,{ collection: 'workouts' }
);

const Workout = mongoose.model('Workout', workoutSchema, 'workouts'); // 3rd argument is the name of collection to be created in the DB

module.exports = Workout;
