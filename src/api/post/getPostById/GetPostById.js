import Post from '../../../database/mongoDB/model/Post';

export default {
  Query: {
    getPostById: async (_, { postId }) => {
      try {
        const post = await Post.findByIdAndUpdate(
          { _id: postId },
          { $inc: { view: 1 } }, // api가 호출될때마다(즉 한번씩 getPostById를 볼때마다) 조회수(view) 늘리는 로직
          { new: true, runValidators: false },
        )
          .populate({
            path: 'user',
            model: 'User',
            select: 'id username email',
          })
          .populate({
            path: 'postComments',
            model: 'PostComment',
            select: 'id text',
            populate: {
              path: 'user',
              model: 'User',
              select: 'id username email',
            },
          });

        console.log('post : ' + post);
        return {
          success: true,
          error: null,
          data: post,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          data: null,
        };
      }
    },
  },
};
