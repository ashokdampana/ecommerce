
const User = require('./user.model.js')

const findUserByEmail = (email, options = {}) => {
  let query = User.findOne({ email });

  if (options.includePassword) {
    query = query.select("+password");
  }
  return query;
};

const findUserById = (id) => User.findById(id);

const createUser = (body) => {
  const { name, email, password } = body
  return User.create({name, email, password, role: 'User'})
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser
}
