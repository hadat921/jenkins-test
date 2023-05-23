import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

interface WrapperRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> {
  (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ):
    | void
    | Promise<void>
    | {
        data?: any;
        message?: any;
      }
    | Promise<{
        data?: any;
        message?: any;
      }>;
}

export const routeWrapper =
  (cb: WrapperRequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const handlerResponse = await cb(req, res, next);
      if (handlerResponse) {
        return res.status(200).json({
          message: handlerResponse.message || "",
          data: handlerResponse.data || {},
        });
      }

      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
