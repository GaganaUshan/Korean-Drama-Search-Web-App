import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const CSE_ID = process.env.REACT_APP_GOOGLE_CSE_ID;
 

  // Debounce: Delay query to avoid too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 600); // delay in ms

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Auto fetch when debouncedQuery updates
  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${debouncedQuery}`
      );
      const data = await res.json();
      setResults(data.items || []);
    };

    handleSearch();
  }, [debouncedQuery]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fceff9, #e3f2fd)",
        padding: "50px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#ffffffcc",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "30px",
            color: "#ff4081",
            fontWeight: "600",
          }}
        >
          💖 K-Drama Search 💖
        </h2>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for your favorite K-Drama..."
            style={{
              padding: "12px 16px",
              width: "80%",
              border: "2px solid #ff80ab",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginTop: "40px" }}>
          {results.length === 0 && query.length > 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>No results found...</p>
          ) : (
            results.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#f9fbe7",
                  borderLeft: "5px solid #ff4081",
                  padding: "20px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <h3>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#1976d2" }}
                  >
                    {item.title}
                  </a>
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>{item.snippet}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
