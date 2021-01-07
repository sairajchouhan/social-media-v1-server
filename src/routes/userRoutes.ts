import { Router } from 'express';

import {
  addUserProfile,
  getAllUsersDetails,
  getLoggedInUserProfile,
  getLoggedInUsersDetails,
  getUserDetails,
  getUserProfile,
} from '../controllers/userController';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', getAllUsersDetails);

router.get('/me', auth, getLoggedInUsersDetails);
router.get('/:username', getUserDetails);

router.get('/profile/me', auth, getLoggedInUserProfile);
router.get('/profile/:username', getUserProfile);
router.post('/profile', auth, addUserProfile);

export default router;
