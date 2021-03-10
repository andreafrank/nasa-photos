import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';

const Search = () => {
	const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
	const [clicked, setClicked] = useState(false);


  useEffect(() => {
    const search = async () => {
      const data = await axios.get('https://images-api.nasa.gov/search?', {
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
		const nasaId = (result.data[0].nasa_id);

		return (
			<div>
					{index + 1}
					<ImageCard key={nasaId} image={result} />
			</div>
		);
	});

	return (
			<div>
				<div>
					<label>Enter search term</label>
					<input
						value={term}
						onChange={e => setTerm(e.target.value)}
					/>
					<div>
							displaying {results.length} results
					</div>
				</div>
				<div className="container mx-auto">
					<div className="grid grid-cols-3 gap-4">
						{renderedResults}
					</div>
				</div>
			</div>
	)
};

export default Search;
