import {useState} from 'react';
import Link from 'next/link';

function NavItem(props){

    const [isOpen, setOpen] = useState(false);

    const flipColor = (flag) => {
        var root = document.querySelector(':root');
        // var musicbg = document.querySelector('.music-search');
        root.style.setProperty('--bg', '#1C2222');
        root.style.setProperty('--text-color', '#c6d3d3');
        // musicbg ? musicbg.style.setProperty('background-image', 'url("/purplewaves.svg")') : null;
        if (flag){
            root.style.setProperty('--bg', '#F6F7EB');
            root.style.setProperty('--text-color', '#1C2222');
        }
    }

    return(
        <li className="nav-item">

            {/* when we use an a tag, we make a server request for the route
                but in using the Link component of next.js we can make a
                CLIENT-SIDE request for the route  */}

            <Link href={ props.href ? props.href : 'javascript:void(0);'}>
                <a className="icon-button" 
                onClick = {() => {
                    setOpen(!isOpen);
                    props.lightswitch && flipColor(isOpen);
                }}>
                 {  // here our prop will be an icon we're passing through to the nav item
                    props && props.icon
                 }
                </a>
            </Link>
            {isOpen && props.children}
        </li>
    )  
}

export default NavItem;