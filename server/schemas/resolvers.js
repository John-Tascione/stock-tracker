const { User, args} = require('../models');
const {AuthenticationError} = require('apollo-server-express')
const {signToken} = require('../utils/auth');

const resolvers = {
  Query: {
  users: async (parent, {username}) => {
    const user = username ? {username}: {};
    return User.find(user)
   },

  me: async (parent,args,context) => {
    if (context.user) {
      return User.findOne({_id: context.user._id})
    }
      throw new AuthenticationError('Please login or signup!');
    }
  },
  
  Mutation: { 
//  User mutations
    createUser: async (parent, {username, email, password}) => {
      const user  = await User.create({username, email, password});
      const token = signToken(user)
      return {token, user};
    },

    loginUser: async (parent, {email, password}) => {
      const user = await User.findOne({ email });

      if(!user) {
        throw new AuthenticationError('No user found with this email')
      }
      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw) {
        throw new AuthenticationError('Incorrect Password');
      }

      const token = signToken(user);

      return {token, user};
    },

    updateEmail: async (parent, args, context) => {
      let user = await User.findOneAndUpdate(
        {_id: context.user._id},
        {email: args.email},
        {new: true}
        )

        return user
    },
    // Stock Mutations
    saveStock: async (parent, args, context) => {
      if(context.user) {
      let user = await User.findOneAndUpdate(
        {_id: context.user._id},
        {$addToSet: {stocks: {ticker: args.ticker, date: args.date, open: args.open, high: args.high, low: args.low, close: args.close}}},
        {new: true}
        )

        return user
    }
  },

    deleteStock: async (parent, args, context) => {
      if(context.user) {
      let user = await User.findOneAndUpdate(
        {_id: context.user._id},
        {$pull: {stocks: {_id: args._id}}},
        {new: true}
        )

        return user
    }
  },
}
}

module.exports = resolvers;
