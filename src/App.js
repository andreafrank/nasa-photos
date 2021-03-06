import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      await axios.get('https://images-api.nasa.gov/search?', {
        params: {
          q: `${term}`,
          media_type: 'image',
        },
      })
      .then((response) => {
        setResults(response.data.collection.items)
        setIsLoading(false);
      })
      // todo: set up .catch
    };

    if (term && !results.length) {
       search();
    } else {
       const timeoutId = setTimeout(() => {
        if (term) {
          search();
        };
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  const renderedResults = results.map((result, index) => {
    return (
      <div>
        {index + 1}*
        <ImageCard image={result} />
        {!isLoading && results.length === 0
          && <h1 className="text-6xl text-center mx-auto mt-32">No images found</h1>
        }
      </div>
    );
  });

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600" style={{minHeight: '100vh'}}>
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {results.length > 0
        ? <div>{results.length} images found</div>
        : "" }
        {isLoading
          ? <h1 className="text-6xl text-center mx-auto mt-32">Loading</h1>
          : <div className="grid grid-cols-3 gap-4">{renderedResults}</div>
        }
    </div>
    </div>
  );
}

export default App;
