const Users = require('../models/users');

module.exports = () => {
    return Users.sequelize.sync({force: true});
}
