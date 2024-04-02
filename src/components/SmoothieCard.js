import React from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supaBaseClient';
export default function SmoothieCard({ smoothie, onDelete }) {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('smoothies')
      .delete()
      .eq('id', smoothie.id)
      .select();
    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <div className='smoothie-card'>
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className='rating'>{smoothie.ratings}</div>
      <div className='Button'>
        <Link to={'/' + smoothie.id}>
          <i className='material-icons'>edit</i>
        </Link>
        <i className='material-icons' onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
}
