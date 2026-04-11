
const User = require('./user.model.js')

const findUserByEmail = async (email, options = {}) => {
  let query = User.findOne({ email });

  if (options.includePassword) {
    query = query.select("+password");
  }

  return await query;
};


module.exports = {
    findUserByEmail
}