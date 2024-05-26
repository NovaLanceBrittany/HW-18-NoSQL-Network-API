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

      await User.deleteMany({ _id: { $in: thought.users } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // The runValidators setting to see 
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
