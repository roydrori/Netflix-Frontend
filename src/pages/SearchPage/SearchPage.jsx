import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import './SearchPage.scss';
import { genres } from '../../utiles';
import axios from 'axios';

const SearchPage = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const [searchText, setSearchtext] = useState('');
    const queryParam = searchParams.get('query') || '';
    const genreParam = searchParams.get('genre') || '';
    const [content, setContent] = useState([]);
    const { user } = useContext(AuthContext);

    const onSearchStart = () => {
        navigate(
            `${genreParam || searchText ? '?' : ''}${genreParam ? `genre=${genreParam}` : ''
            }${genreParam && searchText ? '&' : ''}${searchText ? `query=${searchText}` : ''
            }`
        );
    };

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=/');
        }
    }, [user, navigate]);

    useEffect(() => {
        onSearchStart();
    }, [searchText]);

    useEffect(() => {
        setSearchtext(queryParam);
        const getResult = async () => {
            const res = await axios.get(
                'content/search' +
                `${genreParam || searchText ? '?' : ''}${genreParam ? `genre=${genreParam}` : ''
                }${genreParam && searchText ? '&' : ''}${searchText ? `query=${searchText}` : ''
                }`,
                {
                    headers: { authorization: `Bearer ${user.token}` },
                }
            );
            setContent(res.data);
        };
        getResult();
    }, [queryParam, genreParam]);
    return (
        <>
            <div className="main">
                <Navbar className="nav" />
                <div className="search">
                    <div className="options">
                        <div className="searchGroup">
                            <input
                                type="text"
                                className="searchInput"
                                onChange={(e) => setSearchtext(e.target.value)}
                            />
                            <button className="searchbutton" onClick={() => onSearchStart()}>
                                <SearchIcon />
                            </button>
                        </div>
                        <ul className="genres">
                            <li
                                onClick={() =>
                                    navigate(searchText ? `?query=${searchText}` : '')
                                }
                            >
                                Genre
                            </li>
                            {genres.map((genre, i) => (
                                <li
                                    value={genre}
                                    key={i}
                                    onClick={() =>
                                        navigate(
                                            searchText
                                                ? `?genre=${genre}&query=${searchText}`
                                                : `?genre=${genre}`
                                        )
                                    }
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="results">
                        <h3 className="resultText">
                            Your results: {queryParam ? `input: ${queryParam}, ` : ' '}{' '}
                            {genreParam ? `genre: ${genreParam}` : ''}{' '}
                            {queryParam || genreParam ? (
                                <CloseIcon
                                    className="clearbutton"
                                    onClick={() => {
                                        navigate('/search');
                                    }}
                                />
                            ) : (
                                ''
                            )}{' '}
                        </h3>
                        <div className="results-items">
                            <div className="movies">
                                <h2>Movies</h2>
                                <div className="moviesRes">
                                    {content.map(
                                        (item, i) =>
                                            item.isSeries === false && (
                                                <Link
                                                    to={{ pathname: `/details/${item._id}` }}
                                                    className="link"
                                                >
                                                    <img
                                                        src={item.imgThumb}
                                                        alt={item.title}
                                                        key={i}
                                                        className="content"
                                                    />
                                                </Link>
                                            )
                                    )}
                                </div>
                            </div>
                            <div className="series">
                                <h2>Series</h2>
                                <div className="moviesRes">
                                    {content.map(
                                        (item, i) =>
                                            item.isSeries && (
                                                <Link
                                                    to={{ pathname: `/details/${item._id}` }}
                                                    className="link"
                                                >
                                                    <img
                                                        src={item.imgThumb}
                                                        alt="content"
                                                        key={i}
                                                        className="content"
                                                    />
                                                </Link>
                                            )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;