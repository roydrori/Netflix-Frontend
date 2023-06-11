import React, { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReactPlayer from 'react-player';
import { AddToFavorite } from '../../auth/authAction';
import { AuthContext } from '../../auth/authContext';
import './ListItem.scss';

const ListItem = ({ item }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState();

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, [isHovered]);

  const addFavoriteHandler = () => {
    dispatch(AddToFavorite(item));
  }
  return (
    <Link to={{ pathname: `/details/${item._id}` }} className="link">
      <div
        className="listItem"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}  
      >
        <img src={item?.imgThumb} alt="" />
        {isHovered && (
          <>
            <ReactPlayer
              className="video"
              height={145}
              width={300}
              url={item.trailer}
              playing={true}
            ></ReactPlayer>
            <div className="itemInfo">
              <div className="icons">
                <PlayArrowIcon className="icon link" />
                <AddIcon onClick={addFavoriteHandler} className="icon"/>
                <ThumbUpOutlinedIcon className="icon" />
                <ThumbDownOffAltOutlinedIcon className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{item.duration}</span>
                <span className="limit">+{item.limit}</span>
                <span>{item.year}</span>
              </div>
              <div className="desc">{item.desc}</div>
              <div className="genre">{item.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
