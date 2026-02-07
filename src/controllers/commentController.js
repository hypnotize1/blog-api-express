import prisma from "../utils/prisma.js";
import catchAsync from "../utils/catchAsync.js";

// 1. Create comment
export const createComment = catchAsync(async (req, res) => {
  const { text, postId } = req.body;
  const userId = req.user.id;

  // validate the input
  if (!text || !postId) {
    const error = new Error("Text and postId are required!");
    error.statusCode = 400;
    throw error;
  }

  // check if the post exist or not
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });

  if (!post) {
    const error = new Error("Post not found!");
    error.statusCode = 404;
    throw error;
  }

  // create the comment
  const newComment = await prisma.comment.create({
    data: {
      text,
      postId: parseInt(postId),
      userId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      comment: newComment,
    },
  });
});

// 2. Get comments for a post
export const getCommentsByPost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const comments = await prisma.comment.findMany({
    where: {
      postId: parseInt(postId),
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: { comments },
  });
});

// 3. Delete comment
export const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;

  const comment = await prisma.comment.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!comment) {
    const error = new Error("Comment not found!");
    error.statusCode = 404;
    throw error;
  }

  // Check the access (just the author can delete)
  if (comment.userId !== req.user.id) {
    const error = new Error("You are not authorized to delete this comment!");
    error.statusCode = 403;
    throw error;
  }

  await prisma.comment.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
