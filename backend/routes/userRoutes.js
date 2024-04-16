const express = require('express');
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  adminGetProfile,
  adminUpdateProfile,
  UserdeleteUser,
  sendPasswordResetMail,
  GetPasswordResetMail,
  GetPasswordResetMail2
} = require('../controllers/userController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.delete('/',protect, UserdeleteUser);


router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);


router.get('/all',getAllUsers);
router.get('/specific/:id',adminGetProfile);
router.put('/specific/:id',adminUpdateProfile);
router.post('/forgot-password',sendPasswordResetMail);
router.get('/forgot-password/:id/:token',GetPasswordResetMail);
router.post('/forgot-password/:id/:token',GetPasswordResetMail2);
router.delete('/:id',deleteUser);

module.exports = router;
