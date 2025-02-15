import { useEffect, useState } from 'react'
import mobile from './assets/mobile.jpg'
import './App.css'

function App() {

  const [mobiles, setMobiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.restful-api.dev/objects');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const mobiles = await response.json();
      setMobiles(mobiles);
      setIsLoading(false);
    }
    catch (error) {
      setIsError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  if(isLoading)
    return <img src="loading.jpg"></img>
  if(isError)
    return <p>Error:{isError.message}</p>

  return (
    <>
      <h1>Mobile Products</h1>
      <div className="card-container">
        {mobiles.map((mob) => (
          <div className="card" key={mob.id}>
              <img src={mobile} alt="Mobile" className="product-image" />
              <p>{mob.id}</p>
            <h3>{mob.name}</h3>
            {mob.data ? (
              <ul>
                {Object.entries(mob.data).map(([key, value], index) => (
                   ( 
                    <li key={index}>
                      <b>{key}:</b> {value}
                    </li>
                  )
                ))}
              </ul>
            ) : (
              <p>Data not available</p>
            )}
          </div>
        ))}
      </div>

    </>
  )
}

export default App