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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [{ loading, error, lists }, dispatch] = useReducer(
    homePageReducer,
    initialHomePageReducer
  );

  useEffect(() => {
    const getRandomList = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const res = await axios.get(`list?type=${type ? type : ''}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        dispatch({
          type: 'GET_SUCCESS',
          payload: res.data.sort(() => Math.random - 0.5),
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
        lists.map((item, i) => <List className="list" key={i} list={item} />)
      )}
    </div>
  );
}

export default HomePage;
