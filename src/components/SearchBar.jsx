import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions] = useState([
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 
    'Mumbai', 'Dubai', 'Singapore', 'Toronto', 'Berlin'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for a city..."
            className="search-input"
            onFocus={() => setShowSuggestions(query.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="suggestions">
          {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <MapPin size={16} />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;