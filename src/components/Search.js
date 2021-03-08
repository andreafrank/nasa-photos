import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('green');
  const [results, setResults] = useState([]);
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
				<div>
					{index + 1}
					<img
						src={nasaHref}
						alt={nasaDescription}
					/>
					{nasaDescription}
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
			<div>
				{renderedResults}
			</div>
		</div>
	)
};

export default Search;
