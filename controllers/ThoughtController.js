const { Thought, User } = require('../models');

module.exports = {

  // The thought records are associated with the corresponding user records
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Looking up the thought by the thoughtId param passed in via the request object
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: [req.params.thoughtId] }).populate('users');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create the thought based on data received in req.body
  async createTought(req, res) {
    try {
      const tought = await Tought.create();
      res.json(tought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteTought(req, res) {
    try {
      const thought = await Tought.findOneAndDelete({ _id: req.params.toughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: course.users } });
      res.json({ message: 'Users and thoughts deleted!' });
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
