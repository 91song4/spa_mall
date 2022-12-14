const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connect = () => {
    // .connect(DB주소/DB_name) DB와 연결을 한다.
    // .catch connect 실패 시 실행.(최초연결 실패 캐치)
    mongoose.connect("mongodb://127.0.0.1:27017/mongodb_prac").catch(err => console.log(err));
};

// 서버 실행 중 에러 캐치
mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect;