// ESRB rating img,  clips/gallery 

// if(time==true){search platform}



import React, {useState, useEffect} from "react";
import axios from 'axios';
import Logo from '../img/Logo.png';
import {navigate, Link} from '@reach/router'
import './allGames.css'


const AllGames = (props) => {
    const [game, setGame] = useState([])
    const [genre, setGenre]=useState([])
    const [platform, setPlatform]=useState([])
    const [apiNum, setApiNum]= useState(null)
    const [search, setSearch]=useState('')
    const [filteredGame, setFilteredGame]=useState([])
    const [searchParams, setSearchParams]=useState('search')

    useEffect(()=>{
        axios.get("https://api.rawg.io/api/games")
        .then((res)=>{setGame(res.data.results)})
    },[])

    function handleClick(){
        let apiNum=2
        let i=0
        let pageArr=[]
        for(i=0;i<20;i++){
            apiNum+=1
            
            const gameApi2=`https://api.rawg.io/api/games?page=${apiNum}`
            
        const allPages = axios.get(gameApi2)
        
        axios.all([ allPages ])
        .then(axios.spread((...allData)=>{
            setGame([...allData[0].data.results ]);
        }))
    }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(searchParams)
        axios.get(`https://api.rawg.io/api/games?${searchParams}=${search}`)
        .then((res)=>{
            console.log(res.data.results)
            setGame(res.data.results)
            
        })
    }

    useEffect(()=>{
        
    }, [apiNum])

    if(game==null){
        return(
            <div>
                <h1>Loading.....</h1>
            </div>
        )
    }

    

    return(
        <div class="container">
                <img className="logo" src={Logo} />
            <form class="search" onSubmit={handleSubmit}>
                <select  onChange={(e)=>setSearchParams(e.target.value)}>
                    <option value="search">Title</option>
                    <option value="genres">Genre</option>
                    
                </select>
                <input type='text' placeholder="search game" onChange={(e)=>setSearch(e.target.value)}/>
                <button>Search</button>
            </form>
            <table className="allGamesTable">
                <thead>
                    <th className="tableHead"></th>
                    <th className="tableHead">Title:</th>
                    <th className="tableHead">Genre:</th>
                    <th className="tableHead">Rating:</th>
                    <th className="tableHead">Platform(s):</th>
                </thead>
                {game.map((games, idx)=>{
                    return(
                        <tbody >
                            <td><Link className='title'to={"/details/"+games.id}><img className="tableImg"src={games.background_image} /></Link></td>
                            
                            <td  key={idx}><Link className='title'to={"/details/"+games.id}>{games.name}</Link></td>
                            <td>
                                <ul>
                                    {games.genres.map((genre, idx)=>

                                        <li className="list">{genre.name}</li>
                                    )}
                                </ul>
                            </td>
                                        
                                <td className={games.rating >4.5 ? "goldrating" :  games.rating < 3.5 ? "blueballs" : "rating" }>{games.rating}</td>
                            <td >
                                <ul>
                                    {games.platforms.map((platform, idx)=>
                                        <li className="list"><Link className='platforms' to={`/${platform.platform.name}/allgames`}>{platform.platform.name}</Link></li>
                                    )}
                                </ul>
                            </td>
                        </tbody>
                    )
                })}
            </table>
            <button onClick={handleClick}>Next</button>
        </div>
    )
}

export default AllGames;