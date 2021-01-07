import { Request, Response } from 'express';
import { Post, Comment } from '../entity';

export const postComment = async (req: Request, res: Response) => {
  const { pid } = req.params;
  const { body } = req.body;
  const { user } = res.locals;
  const post = await Post.findOne({ id: pid }, { relations: ['comments'] });

  if (!body || body.trim() === '')
    return res.status(400).json({ error: 'body cannot be empty' });

  if (!post) return res.status(400).json({ error: 'Post not found' });
  const comment = Comment.create({
    body,
    commentor: user.username,
    postId: post.id,
  });

  await comment.save();
  post.comments.unshift(comment);
  post.commentsCount = post.comments.length;
  await post.save();

  return res.json(comment);
};

export const editComment = async (req: Request, res: Response) => {
  const { cid, pid } = req.params;
  const { user } = res.locals;
  const { body }: { body: string } = req.body;

  if (!body || body.trim() === '')
    return res.status(400).json({ error: 'body cannot be empty' });

  const post = await Post.findOne({ id: pid }, { relations: ['comments'] });
  const comment = await Comment.findOne({ id: cid });

  if (!post) return res.status(400).json({ error: 'post not found' });
  if (!comment) return res.status(400).json({ error: 'comment not found' });

  const postHasComment = post.comments.find((c) => c.id === cid);
  const commentBelongsToLoggedInUser = comment.commentor === user.username;

  if (!postHasComment)
    return res
      .status(400)
      .json({ error: 'post does not have the given comment' });
  if (!commentBelongsToLoggedInUser)
    return res.status(400).json({ error: 'unauthorized' });

  comment.body = body || comment.body;
  await comment.save();

  return res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const { cid, pid } = req.params;
  const { user } = res.locals;

  const post = await Post.findOne({ id: pid }, { relations: ['comments'] });
  const comment = await Comment.findOne({ id: cid });

  if (!post) return res.status(400).json({ error: 'post not found' });
  if (!comment) return res.status(400).json({ error: 'comment not found' });

  const postHasComment = post.comments.find((c) => c.id === cid);
  const commentBelongsToLoggedInUser = comment.commentor === user.username;

  if (!postHasComment)
    return res
      .status(400)
      .json({ error: 'post does not have the given comment' });
  if (!commentBelongsToLoggedInUser)
    return res.status(400).json({ error: 'unauthorized' });

  await comment.remove();
  post.commentsCount = post.comments.length - 1;
  await post.save();

  return res.json({ message: 'comment deleted' });
};

export const getCommentsOfPost = async (req: Request, res: Response) => {
  const { pid } = req.params;
  const load = 5;
  let { cursor }: any = req.query;
  cursor = parseInt(cursor);
  if (!cursor) cursor = 0;
  const skip = cursor;

  const post = await Post.findOne({ id: pid });
  if (!post) return res.status(400).json({ error: 'post not found' });

  const comments = await Comment.find({
    where: { postId: pid },
    order: { createdAt: 'DESC' },
    skip,
    take: load,
  });

  return res.json({ data: comments, nextCursor: cursor + load });
};
