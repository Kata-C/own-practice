import React, { useState } from 'react'
import '../styles/SearchBox.css'

const SearchBox = () => {
    const [value, setValue] = useState('');
  return (
    <div className="search-box-container">
      <input 
        onChange={(e) => setValue(e.target.value)}
        className='input' 
        type="text" 
        placeholder="Search..." 
        value={value}
      />
      <button>Search</button>
    </div>
  );
}

export default SearchBox;