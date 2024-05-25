const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

// Schema to create Student model
const studentSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },

    //TODO: Add a key called "last". It should have the same properties as first (above)
    last: {
      type: String,
      required: true,
      max_length: 50,
    },

    //TODO: Add a key called "github". It should have the same properties as first (above)
    github: {
      type: String,
      required: true,
      max_length: 50,
    },

    // TODO: add a key called assignments. It should consist of an array of assignmentSchema records.
    assignments: {
      type: String,
      required: true,
      max_length: 50,
    },
    
  },
  {
    toJSON: {
      getters: true,    // TODO: What goes this mean?
    },
  }
);

const Student = model('student', studentSchema);
module.exports = Student;
