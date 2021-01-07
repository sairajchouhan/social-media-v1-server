import { Router } from 'express';
import { auth } from '../middlewares/auth';
import {
  createPost,
  deleteOnePost,
  getAllPosts,
  getOnePost,
  updateOnePost,
} from '../controllers/postController';

const router = Router();

router.route('/').get(getAllPosts).post(auth, createPost);
router
  .route('/:id')
  .get(getOnePost)
  .put(auth, updateOnePost)
  .delete(auth, deleteOnePost);

export default router;
