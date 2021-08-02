import jwt from "jsonwebtoken";
import { compareHash } from "../../utils/hash.bcrypt.js";
import {
  notFound,
  responseForbidden,
  responseOk,
  responseInternalServerError,
} from "../../utils/rest.response.js";

export default async (req, res, next) => {
  try {
    const user = await global.mongo
      .collection(req.body.type)
      .find({ userName: req.body.userName })
      .toArray();

    if (!user[0]) notFound(res, "userName not found");

    const correctPass = await compareHash(req.body.password, user[0].password);

    if (!correctPass) responseForbidden(res, "invalid password");

    const oneHourInMs = Math.floor(Date.now() / 1000) + 60 * 60;

    const payload = {
      userName: req.body.userName,
      type: req.body.type,
      name: user[0].name,
      id: user[0]._id,
      matriculationId: user[0].matriculationId,
      exp: oneHourInMs * 24,
    };

    const jwtSecret = process.env.JWT_SECRET;

    const jwtToken = jwt.sign(payload, jwtSecret);

    responseOk(res, { token: jwtToken, payload });
  } catch (e) {
    console.log(e);
    responseInternalServerError(res);
  }
};
