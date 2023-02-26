const OK = (authCode: string) => {
    return `
        <!DOCTYPE html>
        <html style="margin: 0; padding: 0;">
            <head>
                <title> 이메일 인증하기 </title>
            </head>
            <body style="margin: 0; padding: 0; font-size: 15px;">
                <div>인증번호는 ${authCode} 입니다.</div>
            </body>
        </html>
        `
}

const NO = (authCode: string) => {
    return `
        <!DOCTYPE html>
        <html style="margin: 0; padding: 0;">
            <head>
                <title> 이메일 인증하기 </title>
            </head>
            <body style="margin: 0; padding: 0; font-size: 15px;">
                <div>인증 오류입니다. 이미 동일한 이메일로 가입했는지 확인해주세요.</div>
            </body>
        </html>
        `
}

export { OK, NO };