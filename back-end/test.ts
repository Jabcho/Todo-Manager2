const now = new Date();

const year = now.getFullYear();
const month = ('0' + (now.getMonth() + 1)).slice(-2);
const day = ('0' + now.getDate()).slice(-2);
const hour = ('0' + now.getHours()).slice(-2);
const min = ('0' + now.getMinutes()).slice(-2);
const sec = ('0' + now.getSeconds()).slice(-2);

const timeStr = year + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec;
const timeStr2 = "2023-02-22 11:35:00"
console.log(Date.parse(timeStr2));
console.log(Date.parse(timeStr));
console.log((Date.parse(timeStr2) - Date.parse(timeStr)) / 1000)
console.log(timeStr);

// 임시 user 저장 테이블 따로 만들기 --> userId, verf_code, time 저장
// 1. server 프로그램이 직접 주기적으로 돌린다(ex. setInterval)
// 2. 다른 nodejs 프로그램을 새로 만들어서 주기적으로 돌린다
// 3. 운영체제 차원에서 제공하는 기능(cron/crontab)을 사용한다.
// 4. mariadb? PostgreSQL