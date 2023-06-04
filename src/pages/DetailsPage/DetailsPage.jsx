import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { AuthContext } from '../../auth/authContext';
import getContent from '../../utiles';
import './DetailsPage.scss';

const DetailsPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const [content, setContent] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=/');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setContent(await getContent(id, user.token));
            } catch (err) {
                console.log(err);
            }
        };
        fetchContent();
        // eslint-disable-next-line
    }, [id]);
    return (
        <div className="main">
            <Navbar />
            <div className="centered">
                <div className="details">
                    <img
                        className="picture"
                        src={content ? content.imgVertical : ''}
                        alt="img"
                    />
                    <div className="info">
                        <h1>{content ? content.title : ''}</h1>
                        <p>{content ? content.description : ''}</p>
                        <p>
                            Type: {content ? (content.isSeries ? 'Series' : 'Movie') : ''}
                        </p>
                        <p>Year: {content ? content.year : ''}</p>
                        <p>Duration: {content ? content.duration : ''}</p>
                        <p>Age restriction: {content ? content.limit : ''}+</p>
                        <p>Genre: {content ? content.genre : ''}</p>
                        <div className="buttons">
                            <button
                                className="play"
                                onClick={() => navigate(`/watch/${content ? content._id : ''}`)}
                            >
                                <PlayArrowIcon />
                                <span>Play</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;