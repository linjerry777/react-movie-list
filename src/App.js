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
    const [movies, setMovie] = useState([]);
    const [searchTerm, setsearchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        setMovie(data.Search);
    }

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
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
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