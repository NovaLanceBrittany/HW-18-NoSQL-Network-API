const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate().count('userCount');
  return numberOfUsers;
}

module.exports = {

  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts');

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // get user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(user);
    } catch (err) {
      // console.log(err);
      return res.status(500).json(err);
    }
  },


  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Delete a user and remove them from the site
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'Thoughts deleted'
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // The $addToSet operator adds a thought/post to a user's thought array.
  async addThought(req, res) {
    console.log('You are adding a post');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID =(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  
  // The $pull operator removes from an existing thought array all instances of a value or values that match a specified condition.
  async removeThought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
