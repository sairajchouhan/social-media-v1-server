import { Request, Response } from 'express';
import { Post, Like } from '../entity';

export const toggleLike = async (req: Request, res: Response) => {
  const { pid } = req.params;
  const { user } = res.locals;

  const post = await Post.findOne({ id: pid }, { relations: ['likes'] });
  if (!post) return res.status(400).json({ error: 'post not found' });

  const isLiked = post.likes.find((l) => l.liker === user.username);
  console.log('isLiked ', isLiked);
  if (isLiked) {
    post.likes = post.likes.filter((l) => l.liker !== user.username);
    post.likesCount = post.likes.length;
    await post.save();
  }
  if (!isLiked) {
    const like = Like.create({ liker: user.username });
    await like.save();

    post.likes.unshift(like);
    post.likesCount = post.likes.length;
    await post.save();
  }

  return res.send(post);
};
