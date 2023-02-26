import type { Request, Response, NextFunction } from "express";

const logincheck = function (req: Request, res: Response, next: NextFunction) {
    //req.session.userId = 'jabcho';
    if (!req.session.userId) {
        res.sendStatus(401);
        return
    }

    req.body.userIdCheck = req.session.userId;
    next();

}

export default logincheck;