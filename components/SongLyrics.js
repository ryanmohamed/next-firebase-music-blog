import { useState, useEffect } from "react"
import Plus from "../icons/plus.svg"
import Minus from "../icons/minus.svg"
export default function SongLyrics({artist, song, lyrics}){

    let [isOpen, setOpen] = useState(false);
    let [divWidth, setWidth] = useState("250px");

    function calcWidth(e){
        const w = e.offsetWidth;
        setWidth(w);
        console.log(w);
    }

    // useEffect(() => {
    //     calcWidth(document.getElementsByClassName("lyrics")[0]);
    // }, [isOpen]);

    const openedStyle = {
        maxHeight: '100%',
        maxWidth: '100%' /* max-with is 100% when the drawer is opened */,
      };
      
      /* This CSS style is applied when the drawer is closed */
      const closedStyle = {
        minHeight: '200px',
        maxWidth: '250px' /* max-width is 0 in the closed drawer */,
      };

    return (
        <>
            <div className="lyrics" style= { isOpen ? openedStyle : closedStyle}>
                <div className="heading">
                    <div className="title">
                        <h1>{ artist.toLowerCase() } </h1>
                        <h2>{ song.toLowerCase() }</h2>
                    </div>
                    <button onClick={ () => {
                        setOpen(!isOpen);
                    } }
                     > 
                        { isOpen ? <Minus /> : <Plus /> }
                    </button>
                </div>

                { isOpen && 
                    <p> {lyrics} </p> 
                }
            </div>
        </>
    )
}