import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supaBaseClient';
const Update = () => {
  const { id } = useParams(); //extracting id ; use same name as defined in Router's definition
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, SetRating] = useState('');
  const [formError, setFormError] = useState(null);

  const HandleSumbmit = async (event) => {
    //async because we are using supabase DB insertion action
    event.preventDefault(); // stop page reload after form submission
    if (!title || !method || !rating) {
      setFormError('Fill up all the fields before submitting');
      return;
    }
    const { data, error } = await supabase
      .from('smoothies')
      .update({ title: title, method: method, ratings: rating })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
      setFormError('Error Updating Data');
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate('/'); //not using replace ; i want user can go back to update page
    }
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single(); //return only single item ;) it wont make it an array it will return single object [{}]
      if (error) {
        navigate('/', { replace: true }); //redirect back to home page; you cant go back, removes last entry from history stack
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        SetRating(data.ratings);
        console.log(data);
      }
    };
    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className='page update'>
      <h2>Update - {id}</h2>
      <form onSubmit={HandleSumbmit}>
        <label>Title: </label>
        <input
          type='text'
          className='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Method: </label>
        <textarea
          type='text'
          className='method'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label>Rating: </label>
        <input
          type='text'
          className='rating'
          value={rating}
          onChange={(e) => SetRating(e.target.value)}
        />
        <button type='submit'>Update Smoothie</button>
      </form>
      {formError && <p className='error'>{formError}</p>}
    </div>
  );
};

export default Update;
