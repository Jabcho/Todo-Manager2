import type { Request, Response, NextFunction } from "express";

const logincheck = function (req: Request, res: Response, next: NextFunction) {
    //req.session.userId = 'jabcho';
    console.log(req);
    if (!req.session.userId) {
        console.log("설마?")
        res.sendStatus(401);
        return
    }

    req.body.userIdCheck = req.session.userId;
    next();

}

export default logincheck;