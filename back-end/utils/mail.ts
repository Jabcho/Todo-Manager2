import nodemailer from "nodemailer";
import * as HTML_TEMPLATE from "./HTML_TEMPLATE";
import secret from "../secret";

async function sendEmail(to: string, authCode: string, duplicate: string) {
    console.log(secret.NODEMAILER_USER)
    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: secret.NODEMAILER_USER,
            pass: secret.NODEMAILER_PASS
        }
    });

    const mail = getMailData(to, authCode, duplicate);
    try {
        await smtpTransport.sendMail(mail)
    } catch(e) {
        console.log(e);
    }
    smtpTransport.close();
}


const getMailData = (to : string, authCode: string, duplicate: string) => {

    let htmlTemplate = ""
    if (duplicate === 'OK') {
        htmlTemplate = HTML_TEMPLATE.OK(authCode);
    } else {
        htmlTemplate = HTML_TEMPLATE.NO(authCode);
    }

    return {
        from: "admin",
        to,
        subject: "TODO MANAGER 인증번호 메일입니다.",
        html: htmlTemplate
    }
}

export default sendEmail;