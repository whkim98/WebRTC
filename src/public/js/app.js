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

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", {payload: input.value}, () => {
        console.log("server is done!");
    });
    input.value="";
}

form.addEventListener("submit", handleRoomSubmit);