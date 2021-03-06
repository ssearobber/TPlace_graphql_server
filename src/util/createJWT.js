import jwt from 'jsonwebtoken';

const createJWT = (user) => {
  const { _id } = user;
  return jwt.sign({ _id }, process.env.JWT_SECRET); //  나중에 환경 변수 추가
};

export default createJWT;
