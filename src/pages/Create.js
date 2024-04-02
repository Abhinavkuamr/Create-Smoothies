import { useState } from 'react';
import supabase from '../config/supaBaseClient';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate(); //object initialise

  const [formError, setFormError] = useState(null);
  const [title, setTitle] = useState(null);
  const [method, setMethod] = useState(null);
  const [rating, SetRating] = useState(null);
  const [formSuccess, setSuccess] = useState(null);

  const HandleSubmit = async (event) => {
    //async because we are using supabase DB insertion action
    event.preventDefault(); // stop page reload after form submission
    if (!title || !method || !rating) {
      setFormError('Fill up all the fields before submitting');
      setSuccess(null);
      return;
    }

    const { data, error } = await supabase
      .from('smoothies')
      .insert([{ title: title, method: method, ratings: rating }])
      .select(); //each {} {} represet 1 ROW

    if (error) {
      console.log(error);
      setFormError('Error in Adding data to Database');
      setSuccess(null);
    }
    if (data) {
      console.log(data);
      setSuccess('Form submission successfull');
      setFormError(null);
      navigate('/');
    }
  };

  return (
    <div className='page create'>
      <h2>Create</h2>
      <form onSubmit={HandleSubmit}>
        <label>Title: </label>
        <input
          type='text'
          className='title'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Method: </label>
        <textarea
          type='text'
          className='method'
          placeholder='Method'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label>Rating: </label>
        <input
          type='text'
          className='rating'
          placeholder='Rating'
          value={rating}
          onChange={(e) => SetRating(e.target.value)}
        />
        <button type='submit'>Create New Smoothie</button>
      </form>
      {formError && <p className='error'>{formError}</p>}
      {formSuccess && <p className='error'>{formSuccess}</p>}
    </div>
  );
};

export default Create;
