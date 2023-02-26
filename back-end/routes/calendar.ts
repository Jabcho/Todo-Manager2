import express from "express";
import type { Request, Response } from "express"; 
const router = express.Router();

import pool from "../database/db";
import logincheck from "../logincheck";
import { RowDataPacket } from "mysql2";

// all schedule 가져와서 보여주기
router.get('/schedule', logincheck, async (req: Request, res: Response) => {
    try {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            const [rows] = await connection.query(`SELECT * FROM calendar where userId = ?`, [req.body.userIdCheck]);
            await connection.commit();
            
            res.status(200).send(rows);
        } catch(e) {
            await connection.rollback();
            res.sendStatus(400);
        } finally {
            connection.release();
        }

    } catch(e) {
        res.sendStatus(400);
    }

    console.log("get 완료");
})

// 스케줄 추가
router.post('/schedule', logincheck, async (req: Request, res: Response) => {
    try {
        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();
            const [rows] = await connection.query(`INSERT INTO calendar(title, start, end, userId) VALUES(?, ?, ?, ?)`, [req.body.title, req.body.start, req.body.end, req.body.userIdCheck]);
            const [new_row] = await connection.query(`SELECT id, title, start, end FROM calendar WHERE id = '?'`, [(rows as RowDataPacket).insertId]);
            await connection.commit();

            res.status(200).send((new_row as RowDataPacket)[0]);
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

// 스케줄 삭제
router.delete('/schedule/:id', logincheck, async (req: Request, res: Response) => {
    try {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            await connection.query(`DELETE FROM calendar WHERE id = ?`, [req.params.id]);
            await connection.commit();

            res.sendStatus(200);
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

export default router;