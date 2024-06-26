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
const room = document.getElementById('room');
const form = welcome.querySelector('form');

room.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector('ul');
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector('#msg input');
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = "";
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = room.querySelector('#name input');
    const value = input.value;
    socket.emit("nickname", input.value);
}

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector('h3');
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector('#msg');
    const nameForm = room.querySelector('#name');
    msgForm.addEventListener('submit', handleMessageSubmit);
    nameForm.addEventListener('submit', handleNicknameSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    //WebSocket에서는 오직 String만 전송할 수 있었지만 socket.io는 내가 원하는 무엇이든 전송 가능
    //단 socket.emit과 서버의 socket.on의 객체 이름은 같아야 함
    //끝날 때 실행되는 function을 보내고 싶다면 socket.emit의 마지막에 적어줘야 함
    socket.emit("enter_room", input.value, showRoom );
    roomName = input.value;
    input.value="";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector('h3');
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} arrived`);
});

socket.on("bye", (left, newCount) => {
    const h3 = room.querySelector('h3');
    h3.innerText = `Room ${roomName} (${newCount})`;
   addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector('ul');
    roomList.innerHTML = "";
    if(rooms.length == 0){
        return;
    }
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});
