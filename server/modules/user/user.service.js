
const User = require('./user.model.js')

const findUserByEmail = (email, options = {}) => {
  let query = User.findOne({ email });

  if (options.includePassword) {
    query = query.select("+password");
  }
  return query;
};

const findUserById = (id) => User.findById(id);

const createUser = ({ name, email, password }) => {
  const newUser = new User({name, email, password, role: 'user'})
  return newUser.save();
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser
}
