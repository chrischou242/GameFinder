import React,  {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from '@reach/router'
import parse from 'html-react-parser';
import './gameDetails.css'
import mature from '../img/mature.PNG'
import everyone from '../img/everyone.PNG'
import teen from '../img/teen.PNG'
import tenplus from '../img/tenplus.PNG'
import ScreenSnap from '../components/ScreenSnap'
import sadgamecat from '../img/sadgamecat.jpg'
const GameDetails = props =>{
    const [oneGame, setgame]= useState("")
    const [platform, setPlatform]=useState([])
    const [genres, setGenres]=useState([])
    const [stores, setStores]=useState([])
    const [rating, setRating]=useState("")
    const [developer, setDeveloper]=useState([])
    const [publisher, setPublishers]=useState([])
    const [clip, setClip]=useState("")
    const [screenshot,setScreenshots]=useState([])


    useEffect(()=>{
        axios.get(`https://api.rawg.io/api/games/${props.id}`)
        .then((res)=>{
            setGenres(res.data.genres)
            setStores(res.data.stores)
            setPlatform(res.data.platforms)
            setgame(res.data)
            setRating(res.data.esrb_rating)
            setDeveloper(res.data.developers)
            setPublishers(res.data.publishers)
            setClip(res.data.clip)
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    }, [])

    
    // var parser = new DOMParser();
    // var htmlDoc = parser.parseFromString(oneGame.description, 'text/html');
    // console.log(htmlDoc.location)

    return(
        <div className="container">
            <h1 className="detailTitle">{oneGame.name} </h1> 
            <Link className="home" to="/">Home</Link>
            <h2 className="rateHead">Rating: {""} 
                <span className={oneGame.rating >4.5 ? "goldrating" :  oneGame.rating < 3.5 ? "bluerating" : "rating" }>
                {oneGame.rating ? oneGame.rating : "N/A"} {""}
                </span>
                of 5 | Esrb Rating: {""}
                {
                rating?.name=="Mature" ?  <img className="imgRating" src={mature}/> :
                rating?.name=="Everyone" ?  <img className="imgRating" src={everyone}/> : 
                rating?.name=="Teen" ?  <img className="imgRating" src={teen}/> : 
                rating?.name=="Everyone 10+" ?  <img className="imgRating" src={tenplus}/> :
                rating ? rating?.name : "N/A"
                }
            </h2>
            <img className="gameImg" src={oneGame.background_image} style={{width:300}}/>
            <h3 className="release">Release Date: <span class="date">{oneGame.released}</span></h3>
            <h3 className="avail">Available at</h3>
            {stores.map((store)=>{
                return(

                    <a href={store.url} className="stores">{store.store.name}</a>
                )
            })}
            
            <div className="gameInfo">
                <div className="desc">
                    <h3 className="title">Description</h3>
                    <p>{parse(String(oneGame.description))}</p>
                </div>
                <div className="content">
                    <div class="genPlat">
                        <div className="genre">
                            <h3 className="title">Genres</h3>
                            {genres.map((genres)=>{
                                return(
                                    <p className="release">{genres.name}</p>
                                    )
                                })}
                        </div>
                        <div className="plat">
                            <h3 className="title">Platforms</h3>
                            {platform.map((platform)=>{
                                return(
                                    <p  className="release">{platform.platform.name}</p>
                                    )
                                })}
                        </div>
                    </div>
                    
                    <div class="pubDev">
                        <div className="pub">
                            <h3 className="title">Developers</h3>
                            {developer.map((developer)=>{
                                return(
                                    <p className="release">{developer.name}</p>
                                    )
                                })}
                        </div>
                        <div className="dev">
                            <h3 className="title">Publishers</h3>
                            {publisher.map((publisher)=>{
                                return(<p className="release">{publisher.name}</p>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="allpics">
                <div className="video">
                    <h2>Game Clip</h2>
                    {clip ?  <video width="600" controls src={clip.clip}></video> : <img className="sadCat" src={sadgamecat}/>}
                </div>
                <div className="shots">
                    <h2>Screenshots</h2>
                    <ScreenSnap id={oneGame.id}/>
                </div>
            </div>
        </div>
    )
}


export default GameDetails;