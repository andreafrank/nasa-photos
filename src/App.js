import React, { useState } from 'react';
// import nasa from '../api/nasa';
import './App.css';

function App() {

  const GetNasaData = async () => {
    // const api_key = process.env.REACT_APP_NASA_API_KEY
    // const url = 'https://images-api.nasa.gov/search?={query}'

      const api_call = await fetch(
// does not seem to accept api key
        `https://images-api.nasa.gov/search?q=magenta&media_type=image`
      );
      const data = await api_call.json();
      const dataInfo = data.collection.items[0]
      const gettingCloser = dataInfo.links[0]
      console.log(gettingCloser.href)

      // return (
      //   data.collection
      // )
  }

    // const [data, setData] = useState([]);

    // const onSearchSubmit = async term => {
    //   const response = await nasa.get('')
    // }

  return (
    <div>
      <GetNasaData />
    </div>
  );
}

export default App;
