//내부 클래스
import http from 'http';
import WebSocket from "ws";
import express from "express";
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug"); //view 확장자를 pug로 설정
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public")); //js파일 사용을 위해 static 설정
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/")); // 어떤 매핑으로 들어가도 home으로 redirect시키기 위한 코드

const handleListen = () => console.log("Listening on http://localhost:3000");

//http서버와 웹소켓 서버를 둘 다 같은 포트에서 사용하기 위함
const httpServer = http.createServer(app); //http서버가 필요한 이유: views, static files, home, redirection을 하기 위함
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("enter_room", (msg, done) => {
        console.log(msg);
        setTimeout(() => {
            done();
        }, 10000);
    });
});

//WebSocket만을 이용한 코드 주석 처리
// const wss = new WebSocket.Server({ server });

// const sockets = [];
//
// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "익명";
//     console.log("Connected to Browser");
//     socket.on("close", () => console.log("Disconnected from the browser"));
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch(message.type) {
//             case "new_message":
//                 sockets.forEach(aSocket =>
//                     aSocket.send(`${socket.nickname}: ${message.payload}`));
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         }
//     });
// });

httpServer.listen(3000, handleListen);

//SOCKET.IO는 WebSocket의 부가기능이 아닌 별도의 framework임