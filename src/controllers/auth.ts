import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import userModel from "../models/user";

function Auth(request: Request, response: Response) {
  try {
    const { token } = request.body;
    if (token) {
      const validation = userModel.findOne({ token });
      const decoded = jsonwebtoken.verify(token, process.env.JWT_PASS || "");
      console.log(validation, decoded);
      return response.status(200).send(token);
    } else {
      return response.status(401).send("Error authenticating");
    }
  } catch {
    return response.status(401).send("Error authenticating");
  }
}

export { Auth };
