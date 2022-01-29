const date = new Date();
const year = String(date.getFullYear());
const month = date.getMonth() + 1 > 9 ? String(date.getMonth() + 1) : '0' + String(date.getMonth() + 1);
const day = date.getDate() > 9 ? String(date.getDate()) : '0' + String(date.getDate());
const hour = date.getHours() > 9 ? String(date.getHours()) : '0' + String(date.getHours());
const minute = date.getMinutes() > 9 ? String(date.getMinutes()) : '0' + String(date.getMinutes());
const seconds = date.getSeconds() > 9 ? String(date.getSeconds()) : '0' + String(date.getSeconds());

const datetime = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;

export { datetime };
