const { Course, Student } = require('../models');

module.exports = {

  // TODO: make sure the course records are associated with the corresponding student records
  async getCourses(req, res) {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // TODO:  Make sure the findOne method is looking up the course by the courseId param passed in via the request object (completed)
  async getSingleCourse(req, res) {
    try {
      const course = await Course.findOne({ _id: [req.params.courseId] }).populate('students');

      if (!course) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // TODO: Make sure you create the course based on data received in req.body
  async createCourse(req, res) {
    try {
      const course = await Course.create();
      res.json(course);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a course
  async deleteCourse(req, res) {
    try {
      const course = await Course.findOneAndDelete({ _id: req.params.courseId });

      if (!course) {
        res.status(404).json({ message: 'No course with that ID' });
      }

      await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Course and students deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // TODO: Lookup the runValidators setting to see what it does
  async updateCourse(req, res) {
    try {
      const course = await Course.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!course) {
        res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
