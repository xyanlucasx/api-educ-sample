import jwt from "jsonwebtoken";
import { responseUnauthorized } from "../utils/rest.response.js";

export default (...types) =>
  async (req, res, next) => {
    try {
      console.log(req.headers, "os headers");
      const [, token] = req.headers.authorization.split(" ");
      const jwtSecret = process.env.JWT_SECRET;
      const decodedToken = jwt.verify(token, jwtSecret);
      if (!types.find((type) => decodedToken.type == type))
        throw new Error("invalid token for this requisiton");

      next();
    } catch (e) {
      console.log(e);
      responseUnauthorized(res, "invalid token for this requisiton");
    }
  };
