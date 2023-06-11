import React, { useContext, useEffect, useReducer } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Featured from '../../components/Featured/Featured';
import { AuthContext } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { homePageReducer, initialHomePageReducer } from './homePageReducer';
import axios from 'axios';
import './HomePage.scss';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import List from '../../components/List/List';
import './HomePage.scss';

function HomePage({ type }) {
  const { user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [{ loading, error, lists }, dispatch] = useReducer(
    homePageReducer,
    initialHomePageReducer
  );

  useEffect(() => {
    const getFavoriteList = async () => {
      try {
        const res = await axios.get('/user', {
          headers: { authorization: `Bearer ${user.token}`},
        })
      }
      catch(err){

      } 
    }
  })

  useEffect(() => {
    const getRandomList = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const firstList = await axios.get('/user', {
          headers: { authorization: `Bearer ${user.token}`},
        })
        const res = await axios.get(`list?type=${type ? type : ''}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        const sortedData = res.data.sort(() => Math.random() - 0.5);
        sortedData.unshift(firstList.data);
        dispatch({
          type: 'GET_SUCCESS',
          payload:  sortedData,
        });
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: err.message });
      }
    };
    getRandomList();
  }, [type]);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/');
    }
  }, [user, navigate]);

  return (
    <div className="home">
      <Navbar></Navbar>
      <Featured type={type}></Featured>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error error={error}></Error>
      ) : (
        <>
          <List className="list" list={user.myList} isFavorite={true} title="Favorites" />
          {lists.map((item, i) => (
            <List className="list" key={i} list={item} isFavorite={false} title={item.title} />
          ))}
        </>
      )}
    </div>
  );
  
}

export default HomePage;
