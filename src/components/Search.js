
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = async () => {
	const [term, setTerm] = useState('jupiter');
  const [results, setResults] = useState([]);

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

  return (
    <div>
      <div>
        <label>search for space stuff!</label>
        <input
          value={term}
          onChange= {e => setTerm(e.target.value)}
        />
        </div>
    </div>

  )

	// onFormSubmit = (e) => {
	// 	e.preventDefault();
	// 	this.props.onSubmit(this.state.term)
	// };
  //
	// render() {
	// 	return (
	// 		<div className="ui segment">
	// 			<form onSubmit={this.onFormSubmit} className="ui form">
	// 				<div className="field">
	// 					<label>image search</label>
	// 					<input type="text" value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })} />
	// 				</div>
	// 			</form>
	// 		</div>
	// 	);
	// };
};

export default Search;
