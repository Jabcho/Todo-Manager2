import express from "express";
import type { Request, Response } from "express";
const app = express();

// routes 설정
import todolist from "./routes/todolist";
import calendar from "./routes/calendar";
import users from "./routes/users";

// secret 설정
import secret from "./secret";

// json parsing
app.use(express.json());

// session 설정
import session, { MemoryStore } from "express-session";
import type { SessionOptions, CookieOptions } from "express-session";
import connectRedis from "connect-redis";
const RedisStore = connectRedis(session);

import { createClient } from "redis";
const redisClient = createClient({
    legacyMode: true
}).connect().catch(console.error);

const sessionOptions: SessionOptions = {
    secret: secret.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    },
    rolling: true,
    store: new MemoryStore()
    /*new RedisStore({
        client: redisClient
    })*/
} 
app.use(session(sessionOptions));

declare module 'express-session' {
    interface SessionData {
        userId: string;
    }
}

// static file
import path from "path";
app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req: Request, res: Response) => {
    console.log(req);
    res.send(__dirname + "/index.html");
})


// /api 요청 받으면 
app.use('/api/todolist', todolist);
app.use('/api/users', users);
app.use('/api/calendar', calendar);



app.listen(3002);