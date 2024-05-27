const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment')

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    },
    
    // The user that created this thought
    username: {
      type: String,
      required: true,
    },
    
    // These are like replies
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length ; 
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;