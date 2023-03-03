import '../styles/globals.css'
import {useState} from 'react'
import Navbar from '../components/Navbar.js'
import NavItem from '../components/NavItem.js'
import DropDownMenu from '../components/DropDownMenu.js'
import DropDownItem from '../components/DropDownItem'
import SettingsIcon from '../icons/gear.svg'
import RightCaret from '../icons/arrow.svg'
import Gmail from '../icons/gmail.svg'

//import the exported variables from firebase.js
import { auth, googleAuthProvider } from '../lib/firebase.js';
import { firestore } from '../lib/firebase.js';

//hooks make using firebase with react easier
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function UserImage(props){
    return(
        <img src={props.src}></img>
    )
}

function SignIn(){
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    return(
        <DropDownItem leftIcon={<Gmail />}href="" onClick={signInWithGoogle}>Sign In</DropDownItem>
    )
}

function SignOut(){
    return auth.currentUser && (
        <DropDownItem leftIcon={<UserImage src={auth.currentUser.photoURL}/>} 
            href="" onClick={() => auth.signOut()}>
                Sign Out
        </DropDownItem>
    )
}

function MyApp({ Component, pageProps }) {

    //we want user on the app level bc the entire apps components are dependant on it
    let [user] = useAuthState(auth);

    return (
        //fragment when we want to return two elements, we need a wrapper
        <>
        <Navbar>
            { user && <NavItem icon={<UserImage src={user.photoURL}/>} href={user.getIdToken()}/> }
            <NavItem icon="🏠" href="/"></NavItem>
            <NavItem icon="💿" href="music"></NavItem>
            <NavItem icon="🏄🏽‍♂️" href="chat"></NavItem>
            <NavItem icon="💡" lightswitch={true}></NavItem>
            <NavItem icon="👇🏽">
                <DropDownMenu>
                    { !user ? <SignIn /> : <SignOut /> }
                    <DropDownItem href="contact" leftIcon="📞">Contact</DropDownItem>
                    <DropDownItem leftIcon={<SettingsIcon />} rightIcon={<RightCaret className="right-caret"/>}>Settings</DropDownItem>
                </DropDownMenu>
            </NavItem>
        </Navbar>
        <Component {...pageProps }/>
        </>
    )
}

export default MyApp