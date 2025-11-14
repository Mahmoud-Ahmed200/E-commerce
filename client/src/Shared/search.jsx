import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./search.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <strong key={index}>{part}</strong> : part
    );
  };

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/product?search=${encodeURIComponent(searchTerm.trim())}&limit=20`
        );
        
        // Filter and sort results: prioritize products that START with search term
        const allProducts = (res.data.products || []).filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // Sort: products starting with search term come first
        const sortedProducts = allProducts.sort((a, b) => {
          const aStartsWith = a.name.toLowerCase().startsWith(searchTerm.toLowerCase());
          const bStartsWith = b.name.toLowerCase().startsWith(searchTerm.toLowerCase());
          
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // If both start with it or both don't, sort alphabetically
          return a.name.localeCompare(b.name);
        });
        
        // Limit to 5 suggestions
        setSuggestions(sortedProducts.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: wait 300ms after user stops typing
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product._id}`);
    setShowSuggestions(false);
    setSearchTerm('');
  };

  return (
    <form
      className="search-form d-flex ms-3 position-relative" 
      role="search"
      onSubmit={handleSubmit}
      ref={searchRef}
      style={{ flex: 1, maxWidth: '800px' }} 
    >
      <div className="position-relative w-100">
        <input
          name="search"
          className="form-control me-5"
          type="search"
          placeholder="Search products..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          autoComplete="off"
        />
        
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="position-absolute w-100 bg-white border rounded shadow-lg mt-1"
            style={{
              top: '100%',
              left: 0,
              maxHeight: '400px',
              overflowY: 'auto',
              zIndex: 1050
            }}
          >
            {loading ? (
              <div className="p-3 text-center text-muted">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Searching...
              </div>
            ) : suggestions.length > 0 ? (
              <>
                {suggestions.map((product) => (
                  <div
                    key={product._id}
                    className="p-2 border-bottom suggestion-item"
                    onClick={() => handleSuggestionClick(product)}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={product.images?.[0]?.url || 'https://via.placeholder.com/50'}
                        alt={product.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                      <div className="ms-3 flex-grow-1">
                        <div className="fw-medium">
                          {highlightMatch(product.name, searchTerm)}
                        </div>
                        <div className="text-muted small">
                          ${product.price}
                          {product.category && (
                            <span className="ms-2 text-secondary">
                              • {product.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <i className="bi bi-arrow-right text-muted"></i>
                    </div>
                  </div>
                ))}
                
                <div
                  className="p-3 text-center text-primary fw-medium"
                  onClick={handleSubmit}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  View all results for "{searchTerm}"
                  <i className="bi bi-arrow-right ms-2"></i>
                </div>
              </>
            ) : searchTerm.trim().length >= 2 ? (
              <div className="p-3 text-center text-muted">
                No products found for "{searchTerm}"
              </div>
            ) : null}
          </div>
        )}
      </div>
      
      <button className="btn btn-dark" type="submit">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}

export default SearchBar;