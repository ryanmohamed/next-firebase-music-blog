import Search from '../icons/search.svg'
import SongLyrics from '../components/SongLyrics.js'
import {useState, useEffect} from 'react'

export default function Music() {

    let [response, setResponse] = useState({error: "no response"});
    let [artist, setArtist] = useState("");
    let [song, setSong] = useState("");

    useEffect(() => {
        setResponse({error: "no response"});
    }, [artist, song]);

    async function fetchLyrics(){
        fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
            .then(result => result.json())
            .then(data => setResponse(data));
    }

    function handleKeypress(e){
        if(e.key === 'Enter'){
            console.log('pressed');
            fetchLyrics();
        }
    }


    return (
        <div className="music-search svg-bg">

            <h1>Find your favorite song</h1>
            <h1> Search </h1>

            <input type="text" name="artist" placeholder="artist" 
                onChange={(event) => { setArtist(event.target.value)}}
                onKeyPress={ handleKeypress } ></input>
            
            <input type="text" name="song" placeholder="song"
                onChange={(event) => { setSong(event.target.value)}}
                onKeyPress={ handleKeypress } ></input>
            
            <button className="button" onClick={ fetchLyrics }><Search/></button>
          
            {
                !response?.error && 
                <SongLyrics artist={artist} song={song} lyrics={response.lyrics}/>
            }
            
        
        </div>
    )
}

