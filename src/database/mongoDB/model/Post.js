import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요. '],
      min: [3, '3글자 이상으로 입력해주세요. '],
      max: [30, '30글자 미만으로 입력해주세요.'],
    },
    description: {
      type: String,
      required: [true, '본문을 입력해주세요.'],
      max: [1000, '1000글자 미만으로 입력해주세요. '],
    },
    imgUrl: {
      type: String,
      default: 'https://b-rise.jp/wp-content/themes/b-rise/images/sample_img.gif',
    },
    view: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    postComments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'PostComment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Post', PostSchema);
