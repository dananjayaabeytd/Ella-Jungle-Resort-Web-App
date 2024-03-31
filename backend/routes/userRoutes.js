const express = require('express');
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} = require('../controllers/userController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get('/all',getAllUsers);

module.exports = router;
