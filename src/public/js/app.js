//WebSocket 만을 이용했던 코드 주석처리
// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
// const socket= new WebSocket(`ws://${window.location.host}`);
//
// function makeMessage(type, payload){
//     const msg = {type, payload}
//     return JSON.stringify(msg);
// }
//
// socket.addEventListener('open', ()=>{
//     console.log("connected to browser");
// });
//
// socket.addEventListener("message", (message) => {
//     const li = document.createElement("li");
//     li.innerText = message.data;
//     messageList.append(li);
// });
//
// socket.addEventListener("close", ()=>{
//    console.log("Disconnected from Server ❌");
// });
//
// // setTimeout(() => {
// //     socket.send("hello from the browser!");
// // }, 10000);
//
// function handleSubmit(event) {
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     const li = document.createElement("li");
// }
//
// function handleNickSubmit(event) {
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(makeMessage("nickname", input.value));
// }
//
// messageForm.addEventListener("submit", handleSubmit);
//
// nickForm.addEventListener("submit", handleNickSubmit);

const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');


function backendDone(msg){
    console.log(`The Backend says: ` + msg);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    //WebSocket에서는 오직 String만 전송할 수 있었지만 socket.io는 내가 원하는 무엇이든 전송 가능
    //단 socket.emit과 서버의 socket.on의 객체 이름은 같아야 함
    //끝날 때 실행되는 function을 보내고 싶다면 socket.emit의 마지막에 적어줘야 함
    socket.emit("enter_room", input.value, backendDone );
    input.value="";
}

form.addEventListener("submit", handleRoomSubmit);