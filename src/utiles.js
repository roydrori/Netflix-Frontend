import axios from 'axios';

export const genres = [
    'Action',
    'Comedy',
    'Fantasy',
    'Detective',
    'Horror',
    'Animation',
  ];
  

const getContent = async (id, token) => {
    console.log(id, token);
    try {
        const res = await axios.get(`content/get/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default getContent;