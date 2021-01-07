import { Router } from 'express';

import { toggleLike } from '../controllers/likeController';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/:pid', auth, toggleLike);

export default router;
