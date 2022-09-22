//api 로직
const Users = require('../../models/users');

const userList = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit);
    if(isNaN(limit)) return res.status(400).end();

    Users.User.findAll({limit: limit})
        .then(users => {
            res.json(users);
        })
};

const findOneUser = (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.status(400).end();

    Users.User.findOne({ where:{ id: id }})
        .then(user => {
            if(!user) return res.status(404).end();
            res.json(user);
        })
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.status(400).end();

    Users.User.destroy({where:{id: id}})
        .then(() => {
            res.status(204).end()
        })
};

const createUser = (req, res) => {
    const name = req.body.name;
    if(!name) return res.status(400).end();
    // if(users.filter(user => user.name===name).length) return res.status(409).end();

    const user = {name};
    Users.User.create(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError'){
                return res.status(409).end();
            }

            return res.status(500).end();
        })
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;

    if(isNaN(id)) return res.status(400).end();
    if(!name) return res.status(400).end();

    //update version
    // Users.User.update({where:{name:name}})
    //     .then(user => {
    //         if(!user) return res.status(404).end();
    //         res.json(user);
    //     })
    //     .catch(err => {
    //         if (err.name === 'SequelizeUniqueConstraintError'){
    //             return res.status(409).end();
    //         }
    //         return res.status(500).end();
    //     })

    //findOne version
    Users.User.findOne({where:{id:id}})
        .then(user => {
            if(!user) return res.status(404).end();

            user.name = name;
            user.save()
                .then(() => {res.json(user)})
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError'){
                        return res.status(409).end();
                    }
                    return res.status(500).end();
                })

        })
};

module.exports = {
    userList,
    findOneUser,
    deleteUser,
    createUser,
    updateUser
}
