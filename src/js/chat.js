import { db } from "./firebase.js";
import {collection,addDoc,onSnapshot,Timestamp,query,where,orderBy} from "firebase/firestore"; 

export function Chatroom(room,username){

    let curroom = room;
    let curuser = username;
    let unsubscribe = null;
    const dbRef = collection(db,"chats");

    const addChat = async (message)=>{

        const now = new Date();

        const chatdata = {
            username:curuser,
            room:curroom,
            message,
            created_at:Timestamp.fromDate(now)
        };

        try{

            const response = await addDoc(dbRef,chatdata);
            return response;

        }catch(err){
            console.log("Error form addchat = ",err);
            throw err;
        }

    }


    const getChats = (callback)=>{
        
        // onSnapshot(
        //     query(dbRef,where("room","==",curroom),orderBy("created_at"))
        //     ,docSnap=>{
                
        //     docSnap.docChanges().forEach(item=>{
        //         // console.log(item);
        //         // console.log(item.doc.data());

        //         if(item.type === "added"){
        //             callback(item.doc.data());
        //         }
        //     });
            
        // });


        // if(unsubscribe){
        //     unsubscribe();
        // }

        if(unsubscribe) unsubscribe();

        unsubscribe = onSnapshot(
            query(dbRef,where("room","==",curroom),orderBy("created_at"))
            ,docSnap=>{
                
            docSnap.docChanges().forEach(item=>{
                // console.log(item);
                // console.log(item.doc.data());

                if(item.type === "added"){
                    callback(item.doc.data());
                }
            });
            
        });

    }


    const updateChatroom = (newroom)=>{ 
        curroom = newroom;

        if(unsubscribe) unsubscribe();
    }



    const updateUsername = (newusername)=>{
        curuser = newusername;
        localStorage.setItem("username",curuser);

        // console.log(`Username changed to ${curuser}`);
    }   


    return {addChat,getChats,updateChatroom,updateUsername};

}