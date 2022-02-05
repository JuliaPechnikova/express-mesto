const router = require('express').Router();
const auth = require('../middlewares/auth');
const { updateUserInfoValidation, updateUserAvatarValidation, userIdValidation } = require('../middlewares/userValidation');

const {
  getUser,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getUserInfo);
router.get('/:userId', auth, userIdValidation, getUser);
router.patch('/me', auth, updateUserInfoValidation, updateUserInfo);
router.patch('/me/avatar', auth, updateUserAvatarValidation, updateUserAvatar);

module.exports = router;
