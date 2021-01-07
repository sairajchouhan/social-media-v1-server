import { Router } from 'express';

import {
  deleteComment,
  postComment,
  editComment,
  getCommentsOfPost,
} from '../controllers/commentController';
import { auth } from '../middlewares/auth';

const router = Router();

router.route('/:pid/:cid').put(auth, editComment).delete(auth, deleteComment);

router.route('/:pid').get(getCommentsOfPost).post(auth, postComment);

export default router;
