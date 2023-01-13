import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const { TOKEN_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();

    const decoded = jwt.verify(token, TOKEN_KEY);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;