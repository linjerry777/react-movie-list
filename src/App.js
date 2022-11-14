import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
//d3ef49eb
import './App.css';
import SearchIcon from './search.svg';
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=d3ef49eb';

const movie1 =
{
    "Title": "Spider-Man",
    "Year": "2002",
    "imdbID": "tt0145487",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
}


const App = () => {
    //可接受動態電影數據
    const [movies, setMovie] = useState([]);
    const [searchTerm, setsearchTerm] = useState([]);

    //抓到api的電影數據
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        console.log(data.Search)
        setMovie(data.Search);
    }
    //一進網頁先搜尋spider的數據,[]空字串跑一次就停
    useEffect(() => {
        searchMovies('spider');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}

                    //搜尋電影第一步 setsearchTerm抓到input裡面的值
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    //第2步傳到searchTerm再透過searchMovies抓出電影數據
                    onClick={() => searchMovies(searchTerm)}
                />

            </div>

            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                           {movies.map((movie)=>(
                            <MovieCard movie={movie} />
                           ))}
                        </div>
                    ) :
                    (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    )
}
export default App;