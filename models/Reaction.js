const { Schema, Types } = require('mongoose');
const moment = require('moment');

// Schema to create a reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId (),
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },

    username: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      // Sets a default value to the current timestamp
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMMM Dl YYYY, h:mm:ss a'),
    },
  },

  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);





module.exports = reactionSchema;
