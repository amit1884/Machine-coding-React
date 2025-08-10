// Use this inside react project
import React, { useEffect, useRef, useState, useCallback } from 'react';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  // Fake API call simulation
  const fetchItems = async (page) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = Array.from({ length: 10 }, (_, i) => `Item ${(page - 1) * 10 + i + 1}`);
        resolve(newItems);
      }, 1000);
    });
  };

  // Load more items when page changes
  useEffect(() => {
    const load = async () => {
      const newItems = await fetchItems(page);
      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
    };
    load();
  }, [page]);

  // Observer setup
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading]
  );

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Infinite Scroll Demo</h2>
      <ul style={{listStyle:'none' }}>
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <li
                key={index}
                ref={lastItemRef}
                style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '5px',}}
              >
                {item}
              </li>
            );
          }
          return (
            <li
              key={index}
              style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}
            >
              {item}
            </li>
          );
        })}
      </ul>
      {loading && <p>Loading more...</p>}
    </div>
  );
};

export default InfiniteScroll;
