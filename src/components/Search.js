import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
		const nasaHref = (result.links[0].href);
		const nasaDescription = (result.data[0].description);

		return (
			<div key={nasaId}>
				<div className="max-w-sm rounded overflow-hidden shadow-lg">
					{index + 1}
					<img
						src={nasaHref}
						alt={nasaDescription}
            className="w-full"
					/>
            <div className="px-6 py-4">
              <div className="font-bold text-purple-500 text-xl mb-2">
    					     {nasaDescription}
              </div>
            </div>
				</div>
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
