import { Chatroom } from "./chat.js";
import { LiElements } from "./lielement.js";
import "@fortawesome/fontawesome-free/css/all.min.css";


// UI 
const chatrooms = document.querySelector(".chatrooms");
const chatul = document.querySelector(".chat-ul");
const chatform = document.querySelector(".chat-form");
const userform = document.querySelector(".user-form");
const msg = document.querySelector('.msg');
const roomtitle = document.querySelector(".roomtitle");

const getlocalname = localStorage.username  ? localStorage.username : "Guest";
userform.username.placeholder = `username is ${getlocalname}`;

// Chatroom instance
const chatroom = Chatroom("general", getlocalname);
// console.log(chatroom);
roomtitle.textContent = "General";

// Li element 
const li = LiElements(chatul);

// Start Chat 
chatform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const message = chatform.message.value.trim();
    // console.log(message);
    chatroom.addChat(message)
        .then(()=>chatform.reset())
        .catch(err=> console.log(err));
});


// Update username 
userform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const newusername = userform.username.value.trim();
    chatroom.updateUsername(newusername);
    userform.reset();

    // show & hide msg 
    msg.innerText = `New name updated to ${newusername}`;
    userform.username.placeholder = `username is ${newusername}`;

    setTimeout(()=>msg.innerText="",3000);

});


// Update chat room 
chatrooms.addEventListener("click",(e)=>{
    e.preventDefault();

    const getbtn = e.target.closest("button");

    if(getbtn){
        const getroomid = getbtn.getAttribute("id");
        const gettitle = getbtn.querySelector("h3").innerText;

        roomtitle.textContent = gettitle;

        // clear UI
        chatul.innerHTML = "";

        // update room
        chatroom.updateChatroom(getroomid);

        // reload chats
        chatroom.getChats((data)=>{
            li.newli(data);
        });
    }
});


// Get chats 
chatroom.getChats((data)=>{
    li.newli(data);
});