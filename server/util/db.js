import mysql from "mysql";

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee',
});

conn.connect(function(err) {
    if (err) {
        console.log("connection error: " + err);
    } else {
        console.log("connection succeeded");
    }
});

export default conn;
