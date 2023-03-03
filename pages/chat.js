import { auth, googleAuthProvider } from '../lib/firebase.js';
import firebase from 'firebase/compat/app';
import { firestore } from '../lib/firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState, useEffect, useRef } from 'react'

function ActiveUsers(){
    return(
        <div className='active-users'></div>
    )
}

function Chatroom() {
    //reference the messages collection in our firestore
    const messagesRef = firestore.collection('messages');
    //make query to collection for the last 25 messages
    const query = messagesRef.orderBy('createdAt').limitToLast(25);
  
    //listen in realtime using useCollectionData hook
    const [messages] = useCollectionData(query, { idField: 'id' });

    //async function to send a message to our firestore messages collection
    const sendMsg = async (e) => {
        e.preventDefault();

        //get current user info
        const { uid, photoURL } = auth.currentUser;

        //use messages reference's method add
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
    }

    //we need state to store the value of the form
    const [formValue, setFormValue] = useState('');

    //useRef is like a box that can have a mutable value 
    //using ref={} let's use set the, current property to the DOM node 
    const dummy = useRef();

    //whenever messages is updated, scroll into view
    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    return (
        <>
        <h1>Welcome to the chatroom!</h1>
        <div className='chatroom-field'>
            <main>
                <ActiveUsers/ >
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <span ref={dummy}></span> {/*we want to acess a child imperatively to scroll it into view*/}
            </main>

             <form onSubmit={sendMsg}>
                <input type="text" value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}/>
                <input type="submit" disabled={!formValue} value="🕊️"/>
            </form>

        </div>
        </>)
}

function ChatMessage(props) {
    //we expect to recieve a message from our array of messages
    const { text, uid, photoURL } = props.message;

    //if the uid of the message is the same as the current user, mark appropriately 
    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
        </div>
    </>)
}

export default function Chat() {

    const [user] = useAuthState(auth);

    return (
        <div className="chat-room svg-bg">
            {user ? <Chatroom /> : <h1> Sign in to use chatroom </h1>}
        </div>
    )
}
