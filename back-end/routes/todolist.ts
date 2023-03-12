import express from "express";
import type { Request, Response } from "express";
const router = express.Router();

import pool from "../database/db";
import logincheck from "../logincheck";
import { RowDataPacket } from "mysql2";

// todolist 페이지 처음 접속 시 사용자의 모든 리스트 보여주기
router.get('/todo', logincheck, async (req: Request, res: Response) => {
    console.log('요청 들어옴?', req.body.userIdCheck);
    try {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            const [rows] = await connection.query(`SELECT * FROM TODOLIST where userId = ?`, [req.body.userIdCheck]);
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

// todolist 추가
router.post('/todo', logincheck, async (req: Request, res: Response) => {
    try {
        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();
            const [rows] = await connection.query(`INSERT INTO TODOLIST(list, userId) VALUES(?, ?)`, [req.body.newTodo, req.body.userIdCheck]);
            const [new_row] = await connection.query(`SELECT id, list FROM TODOLIST WHERE id = '?'`, [(rows as RowDataPacket).insertId]);
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

// todolist 삭제
router.delete('/todo/:id', logincheck, async (req: Request, res: Response) => {
    console.log('요청 들어옴, id는', req.params.id)
    try {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            console.log('되는거맞니')
            console.log(req.params.id)
            await connection.query(`DELETE FROM TODOLIST WHERE id = ?`, [req.params.id]);
            await connection.commit();

            res.sendStatus(200);
        } catch(e) {
            console.log('에러나네')
            await connection.rollback();
            res.sendStatus(400);
        } finally {
            connection.release();
        }
    } catch(e) {
        res.sendStatus(400);
    }
})

// 전체삭제
router.delete('/todo', logincheck, async (req: Request, res: Response) => {
    console.log('전체삭제 요청')
    try {
        const connection = await pool.getConnection();
        console.log([req.body.userIdCheck])
        try {
            await connection.beginTransaction();
            await connection.query(`DELETE FROM TODOLIST where userId = ?`, [req.body.userIdCheck]);
            await connection.commit();
            res.sendStatus(200);
        } catch(e) {
            await connection.rollback();
            res.sendStatus(400);
        } finally {
            connection.release();
        }
    } catch (e) {
        res.sendStatus(400);
    }
})

export default router;