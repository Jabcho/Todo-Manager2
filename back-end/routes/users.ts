import express from "express";
const router = express.Router();
import type { Request, Response } from "express";

import pool from "../database/db";

import crypto from "crypto";
import { RowDataPacket } from "mysql2";

import sendEmail from '../utils/mail';
import Connection from "mysql/lib/Connection";
import { format } from "path";

// 회원가입 --> 중복/인증은 이미 다 끝난 상태
// 완료되면 user_certi의 data delete?
router.post('/signup', async(req: Request, res: Response) => {
    const inputPw = req.body.userPw;
    const salt = Math.round((new Date().valueOf() * Math.random())) + "";
    const hashPw = crypto.createHash("sha512").update(inputPw + salt).digest("hex");
    console.log(req.body)

    try {
        const connection = await pool.getConnection();

        try {
            
            await connection.beginTransaction();
            await connection.query(`INSERT INTO users (name, userId, hashpw, email, salt) VALUES (?, ?, ?, ?, ?)`, [req.body.userId, req.body.userId, hashPw, req.body.email, salt]);
            await connection.commit();

            res.sendStatus(200); // front는 200을 받으면 화면 전환
        } catch(e) {
            await connection.rollback();
            console.log(e)
            res.sendStatus(400);
        } finally {
            connection.release();
        }
    } catch(e) {
        res.sendStatus(400);
    }
})

// 이메일 인증 ==> 
router.get('/auth/:email', async (req: Request, res: Response) => {
    const email = req.params.email;
    try {
        const connection = await pool.getConnection();
        
        try {
            
            // random verification code generation
            let authCode = Math.random().toString().substring(2, 8);
            const now = new Date();

            const year = now.getFullYear();
            const month = ('0' + (now.getMonth() + 1)).slice(-2);
            const day = ('0' + now.getDate()).slice(-2);
            const hour = ('0' + now.getHours()).slice(-2);
            const min = ('0' + now.getMinutes()).slice(-2);
            const sec = ('0' + now.getSeconds()).slice(-2);

            const timeStr = year + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec;


            await connection.beginTransaction();

            // email 중복 체크 + google mail 전송 요청 (sendEmail)
            const [row] = await connection.query(`SELECT email FROM users WHERE email = ?`, [email]);
            console.log(row)
            if ((row as RowDataPacket).length > 0) {
                sendEmail(email, authCode, "NO");
            } else {
                sendEmail(email, authCode, "OK"); 
                // 중복 확인
                await connection.beginTransaction();
                await connection.query(`INSERT INTO user_certi (email, code, time) VALUES (?, ?, ?)`, [email, authCode, timeStr]);
                await connection.commit();
            }
            await connection.commit();

        } catch(e) {
            console.log(e)
            await connection.rollback();
            res.sendStatus(400);
        } finally {
            connection.release();
        }
    } catch(e) {
        res.sendStatus(400);
    }
})

router.post('/auth', async(req: Request, res:Response) => {
    const userEmail = req.body.email;
    const userAuthCode = req.body.authCode;
    const now = new Date();

    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hour = ('0' + now.getHours()).slice(-2);
    const min = ('0' + now.getMinutes()).slice(-2);
    const sec = ('0' + now.getSeconds()).slice(-2);

    const timeStr = year + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec;
    console.log(req.body)
    try {
        const connection = await pool.getConnection();
        console.log('hey')
        try {
            await connection.beginTransaction();
            console.log('sdsfsdfsdf')
            const [row] = await connection.query(`SELECT code, time FROM user_certi WHERE email = ?`, [userEmail])
            console.log(row)
            const authCode = (row as RowDataPacket)[0].code;
            const time = (row as RowDataPacket)[0].time;
            await connection.commit();
            console.log(timeStr, time)
            console.log(Date.parse(timeStr), Date.parse(time))
            if (Date.parse(timeStr) - Date.parse(time) > 1000 * 60 * 1000/*timeStr과 now의 시간차이가 3분 이상이면*/) {
                console.log('this');
                res.sendStatus(401);
            } else {
                console.log('this2');
                console.log(userAuthCode)
                console.log(authCode)
                if (userAuthCode === authCode) {
                    await connection.beginTransaction();
                    await connection.query(`UPDATE user_certi SET verification = '1'`);
                    await connection.commit();
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            }
        } catch(e) {
            await connection.rollback();
            res.sendStatus(400);
        } finally {
            connection.release()
        }
    } catch(e) {
        res.sendStatus(400);
    }


})

// 회원가입 시 userId 중복확인 : 400 보내면 front에서는 '이미 사용하고 있는 Id입니다'
router.get('/signup/check/:userId', async (req: Request, res: Response) => {
    try {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            const [result] = await connection.query(`SELECT userId FROM users WHERE userId=?`, [req.params.userId])
            console.log(result)
            if ((result as RowDataPacket).length === 0) {
                res.sendStatus(200);
                /*
                res
                .status(200)
                .json({ data: null, message: "사용가능한 아이디입니다" });
                */
            } else {
                res.sendStatus(409);
            }

            await connection.commit();
            
        } catch(e) {
            await connection.rollback();
            res.sendStatus(400);
        } finally {
            connection.release();
        }

    } catch(e) {
        res.sendStatus(400);
    }
})

// 로그인
router.post('/login', async(req: Request, res: Response) => {

    const userId = req.body.userId;
    const inputPw = req.body.userPw;

    try {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            const [rows] = await connection.query(`SELECT hashpw, salt FROM users WHERE userId = ?`, [userId]);
            await connection.commit();
            const hashPw = (rows as RowDataPacket)[0].hashpw;
            const salt_ = (rows as RowDataPacket)[0].salt;

            const hashPw2 = crypto.createHash("sha512").update(inputPw + salt_).digest("hex");

            if (hashPw == hashPw2) {
                req.session.userId = userId;
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }

        } catch(e) {
            await connection.rollback();
            res.sendStatus(400);
        } finally {
            connection.release();
        }
    } catch(e) {
        res.sendStatus(400);
    }

})

// 로그아웃 (요건 DB랑 통신하는건 아닌데.. async/await 안써도 되나? 아니면 쓰는게낫나? try/catch는? try/catch 너무 남발하나..?
// 로그인 상태던 아니던 결과가 같으니.. 굳이 logincheck 쓸 필요 없겠지? 아니면 그럼에도 써야하나?
router.get('/logout', (req: Request, res: Response) => {
    try {
        req.session.destroy(function() {
            req.session
        });
        res.sendStatus(200);    
    } catch(e) {
        res.sendStatus(400);
    }
})

export default router;