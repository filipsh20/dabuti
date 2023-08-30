import { Request, Response } from "express";

function Data(request: Request, response: Response) {
  const { id } = request.body;
  response.send(id);
}

export { Data };
