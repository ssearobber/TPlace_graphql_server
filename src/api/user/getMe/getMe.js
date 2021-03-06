import User from '../../../database/mongoDB/model/User';

const resolver = {
  Query: {
    getMe: async (_, __, { request, isAuthenticated }) => {
      const currentUserId = await isAuthenticated(request);

      try {
        const currentUser = await User.findById({ _id: currentUserId });
        if (!currentUser) {
          return {
            success: false,
            error: '프로필을 찾을 수 없습니다. ',
            data: null,
          };
        }
        return {
          success: true,
          error: null,
          data: currentUser,
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

module.exports = resolver;
