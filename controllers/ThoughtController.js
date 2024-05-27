const { Thought, User } = require('../models');
const reactionSchema = require('../models/Reaction');

module.exports = {

  // The thought records are associated with the corresponding user records
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ message: 'Unable to retrieve thoughts or no thoughts exist.' });
    }
  },


  // Looking up the thought by the thoughtId param passed in via the request object
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: [req.params.thoughtId] });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Unable to find thought - Server Error' });
    }
  },


  // Create the thought based on data received in req.body
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true },
      );

      res.json(thought);

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Unable to create Thought' });
    }
  },


  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'Unable to delete thought.' });
      }

      res.json({ message: 'Thought deleted.' });
    } catch (err) {
      res.status(500).json({ message: 'Unable to delete user or thoughts.' });
    }
  },


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
      res.status(500).json({ message: 'Unable to update thought.' });
    }
  },


  // The $addToSet operator adds a reaction to a user's thought array.
  async addReaction(req, res) {
    console.log('You are adding a comment / reaction!');
    console.log(req.body);

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: 'No comment / reaction found with that id =(' });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // The $pull operator deletes a reaction from a user's thoughts array.
  async deleteReaction(req, res) {
    console.log('You are deleting a comment / reaction!');
    console.log(req.body);

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: 'No comment / reaction found with that id =(' });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
