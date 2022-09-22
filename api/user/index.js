//라우팅 설정 로직
const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.get('/', ctrl.userList);

router.get('/:id', ctrl.findOneUser);

router.delete('/:id', ctrl.deleteUser);

router.post('/', ctrl.createUser);

router.put('/:id' ,ctrl.updateUser);

module.exports = router;
