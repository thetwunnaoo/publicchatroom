import {auth} from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";



export function Authorize(){

    // SignUp
    const registerUser = async(fullname,email,password)=>{

        const defaultProfileImg = "https://static.thenounproject.com/png/65476-200.png";

        try{

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // console.log(user);

            updateProfile(user, {
                displayName: fullname, 
                photoURL: defaultProfileImg
            }).then(() => {

                // set name to localstorage
                setLocalName(user);

                // Redirect to index.html
                window.location.href = "../index.html";
            });
            

        }catch(err){
            console.error("Error registering users : ", err);
        }

    }


    // SignIn
    const loginUser = (email,password)=>{

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           
            // console.log(userCredential.user);

            // set name to localstorage
            setLocalName(userCredential.user);

            // Redirect to index.html
            window.location.href = "../index.html";

        })
        .catch((error) => {
            console.error("Error Logging in : ", error.message);
        });

    }


    // SignOut 
    const logoutUser = ()=>{

        signOut(auth).
        then(() => {

            // remove name to localstorage
            unsetLocalName();

            // Redirect to signin.html
            window.location.href = "../signin.html";
        }).catch((error) => {
            console.error("Error logging out = ",error.message);
        });

    }


    // Reset Password 
    const resetPassword = async(email,msg)=>{

        try{

            await sendPasswordResetEmail(auth, email);

            msg.textContent = "Password reset email send. Please check your inbox.";
            msg.style.color = "green";
            msg.style.fontSize = "11px";

        }catch{

            console.error("Error sending password reset email = ",error.message);

            msg.textContent = `Error : ${error.message}`;
            msg.style.color = "red";
            msg.style.fontSize = "11px";

        }    
     
    }


    // Google Signin
    const googleLogin = ()=>{

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            
            console.log(result.user.displayName);
            
            // Other Method 
            // const name = result.user.displayName || "No Name";
            // console.log(name);

            // setLocalName(name);

            // set name to localstorage
            setLocalName(result.user);

            // Redirect to index.html
            window.location.href = "../index.html";
           
        }).catch((error) => {
            console.error("Error logging out = ",error.message);
        });

    }


    // Auth Check
    const isLogedIn = ()=>{

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                return true;
            } else {
                // Redirect to signin.html
                window.location.href = "../signin.html";
            }
        });

    }

    
    // Get User Data 
    const getUser = (callback)=>{

        // callback("hello sir");

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                callback(userdata);
            } 
        });

    } 


    // Method 1 
    // const setLocalName = (username) => {
    //     localStorage.setItem("username", username);
    // }


    const setLocalName = (userdata) => {
        localStorage.setItem("username", userdata.displayName);
    }

    const unsetLocalName = () => {
        localStorage.removeItem("username");
    }



    return {registerUser,loginUser,logoutUser,resetPassword,googleLogin,isLogedIn,getUser};

}