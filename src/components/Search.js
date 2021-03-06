
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('green');
  const [results, setResults] = useState([]);

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
				console.log(results)
			})
			// todo: set up .catch
    };

		console.log(results)
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

  const renderedResults = results.map((result) => {
		const nasaId = (result.data[0].nasa_id);
		const nasaHref = (result.links[0].href);
		const nasaDescription = (result.data[0].description);

		return (
			<div key={nasaId}>
				<div>
					<img src={nasaHref}
						alt={nasaDescription}
					/>
				</div>
			</div>
		);
	});

	return (
		<div>
			<div>
				<div>
					<label>Enter search term</label>
					<input
						value={term}
						onChange={e => setTerm(e.target.value)}
					/>
				</div>
			</div>
			<div>
				found NUMBER results
				{renderedResults}
			</div>
		</div>
	)
};

export default Search;

// href={`https://images-assets.nasa.gov/${nasaId}/${nasaId}~thumb.jpg`}
