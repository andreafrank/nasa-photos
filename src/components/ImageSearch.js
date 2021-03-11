import React, { useState } from 'react';

const ImageSearch = ({ searchText }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
    console.log('onsubmit');
  }

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-b-2 border-teal=500 py-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="enter search term"
            />
        </div>
      </form>
    </div>
  )
}

export default ImageSearch;
