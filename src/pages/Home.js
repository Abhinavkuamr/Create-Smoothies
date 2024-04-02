import { useState } from 'react';
import supabase from '../config/supaBaseClient';
import { useEffect } from 'react';

//components
import SmoothieCard from '../components/SmoothieCard';

const Home = () => {
  //console.log(supabase);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at');

  const deleteSmoothie = (id) => {
    setData((prevSmoothies) => {
      return prevSmoothies.filter((smoothie) => smoothie.id !== id);
    });
  };

  useEffect(() => {
    const fetchSmootheies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, { ascending: false }); //get all if set blank

      if (error) {
        setError('Cannot Fetch Data');
        setData(null);
        console.log(error);
      }
      if (data) {
        setData(data);
        setError(null);
        console.log(data);
      }
    };
    fetchSmootheies();
  }, [orderBy]);

  return (
    <div className='page home'>
      <h2>Home</h2>
      <div>{error && <p>ERROR IN FETCHING DATA</p>}</div>
      {data && (
        <div className='smoothies'>
          <div className='order-by'>
            <p>Order By</p>
            <button onClick={() => setOrderBy('created_at')}>
              Time Created
            </button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('ratings')}>Rating</button>
            {orderBy}
          </div>
          <div className='smoothie-grid'>
            {data.map((element) => {
              return (
                <SmoothieCard
                  key={element.id}
                  smoothie={element}
                  onDelete={deleteSmoothie}
                />
              ); //all are props
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
