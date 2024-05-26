const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },

    email: {
      type: String,
      unique: true,
      required: true,
      unique: true,

      // This validates and requires a match to the email
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please fill a valid email address']
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'friend',
      },
    ],

    friendCount: [
      {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    ]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);



userSchema.virtual('friendCount').get(function () {
  return this,friends.length ; 
});



const User = model('user', userSchema);
module.exports = User;