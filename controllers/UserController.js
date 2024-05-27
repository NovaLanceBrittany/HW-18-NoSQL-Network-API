const { User, Thought } = require('../models');

module.exports = {

  // get all users
  async getUser(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');

      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'There are no users' });
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
      return res.status(500).json({ message: 'Unable to find User - Server Issue' });
    }
  },


  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      return res.json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Unable to create User' });
    }
  },


  // update a  user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate (  
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Unable to update User' });
    }
  },


  // Delete a user and remove them from the site
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      await Thought.deleteMany(
        { _id: { $in: user.thoughts } },
      );

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Unable to delete User' });
    }
  },

  // ============== MOVED TO THOUGHT CONTROLLER ==============
  // The $addToSet operator adds a thought/post to a user's thought array.
  // async addThought(req, res) {
  //   console.log('You are adding a post');
  //   console.log(req.body);

  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $addToSet: { thoughts: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No user found with that ID =(' });
  //     }

  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  
  // The $pull operator removes from an existing thought array all instances of a value or values that match a specified condition.
  // async removeThought(req, res) {
  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $pull: { thought: { thoughtId: req.params.thoughtId } } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No user found with that ID =(' });
  //     }

  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // ==============  ==============  ==============


  // The $addToSet operator adds a friend to a user's friend array.
  async addFriend(req, res) {
    console.log('You are adding a friend!');
    console.log(req.body);

    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No friend or user found with that ID =(' });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // The $pull operator deletes a friend from a user's friend array.
  async deleteFriend(req, res) {
    console.log('You are deleting a friend! Bye Loser');
    console.log(req.body);

    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No friend or user found with that id =(' });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
