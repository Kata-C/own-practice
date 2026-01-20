import { useState } from 'react'
import '../styles/SearchBox.css'
import useSearchBox from '../hooks/useSearchBox';

const SearchBox = () => {
    const [value, setValue] = useState('');
    const { search } = useSearchBox();
  return (
    <div className="search-box-container">
      <input 
        onChange={(e) => setValue(e.target.value)}
        className='input' 
        type="text" 
        placeholder="Search..." 
        value={value}
      />
      <button 
        onClick={() => search(value)}
      >
        Search
      </button>
      
    </div>
  );
}

export default SearchBox;