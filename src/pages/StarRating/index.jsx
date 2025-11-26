import React, { useState } from 'react';

const styles = {
  container: {
    display: 'inline-flex',
    fontSize: '32px',
    cursor: 'pointer',
    outline: 'none',
  },
  starWrapper: {
    position: 'relative',
    color: '#ddd',
  },
  starOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    color: '#ffc107',
    pointerEvents: 'none',
    width: '0%',
    transition: 'width 0.2s' 
  }
};

const StarRating = ({ max = 5, initialValue = 0, onChange }) => {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(null);
    console.log(rating,hover)
  const displayValue = hover !== null ? hover : rating;

  const handleMouseMove = (e, index) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    
    const newValue = index + (percent < 0.5 ? 0.5 : 1);
    setHover(newValue);
  };

  const handleClick = () => {
    const newValue = hover === rating ? 0 : hover;
    
    setRating(newValue);
    if (onChange) onChange(newValue);
  };

  const handleKeyDown = (e) => {
    let newValue = rating;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      newValue = Math.min(max, rating + 0.5);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      newValue = Math.max(0, rating - 0.5);
      e.preventDefault();
    }
    
    if (newValue !== rating) {
        setRating(newValue);
        if (onChange) onChange(newValue);
    }
  };

  return (
    <div 
      style={styles.container}
      role="slider"
      tabIndex={0}
      aria-valuemin={0} 
      aria-valuemax={max} 
      aria-valuenow={rating}
      aria-label="Star Rating"
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setHover(null)}
    >
      {[...Array(max)].map((_, i) => {
        let width = '0%';
        if (displayValue > i) {
             const val = displayValue - i; 
             width = val >= 1 ? '100%' : `${val * 100}%`;
        }

        return (
          <span 
            key={i} 
            style={styles.starWrapper}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onClick={handleClick}
          >
            ★ 
            <span style={{ ...styles.starOverlay, width }}>
              ★ 
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;