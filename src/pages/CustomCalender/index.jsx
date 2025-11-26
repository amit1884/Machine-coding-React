import React, { useState } from 'react';

// --- STYLES (Inline for easy copy-paste) ---
const styles = {
  container: {
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'sans-serif',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    background: '#fff'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    background: '#f8f8f8',
    borderBottom: '1px solid #eee'
  },
  navBtn: {
    cursor: 'pointer',
    background: 'transparent',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '4px 8px'
  },
  monthTitle: {
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)', // 7 Days a week
    padding: '10px',
    gap: '5px'
  },
  dayLabel: {
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#888',
    fontWeight: '600',
    marginBottom: '5px'
  },
  cell: {
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '0.9rem',
    userSelect: 'none',
    transition: 'background 0.2s'
  },
  // Modifiers
  cellEmpty: { cursor: 'default' },
  cellSelected: { background: '#da3743', color: '#fff' }, // OpenTable Red
  cellToday: { border: '1px solid #da3743', color: '#da3743', fontWeight: 'bold' },
  cellHover: { background: '#f0f0f0' }
};

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DatePicker = () => {
  // 1. STATE
  // 'viewDate' determines which month we are looking at (Year/Month)
  const [viewDate, setViewDate] = useState(new Date()); 
  // 'selectedDate' is the specific day the user clicked
  const [selectedDate, setSelectedDate] = useState(null);

  // 2. CORE LOGIC (The "Zero Day" Trick)
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Trick 1: Get total days in current month (passing '0' as day gets last day of prev month)
  // We pass (month + 1) to look at the *next* month, then 0 backs up one day.
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Trick 2: Get padding (0-6) for the first day of the month
  const firstDayIndex = new Date(year, month, 1).getDay();

  // 3. HANDLERS
  const changeMonth = (offset) => {
    // We create a new date object to trigger re-render
    // Setting day to 1 avoids edge cases (like jumping from Jan 31 to Mar 2)
    setViewDate(new Date(year, month + offset, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    console.log("Selected:", newDate.toDateString()); // Simulate API call
  };

  // Helper to check if a specific day is "Today"
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  // Helper to check if a specific day is "Selected"
  const isSelected = (day) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && 
           month === selectedDate.getMonth() && 
           year === selectedDate.getFullYear();
  };

  return (
    <div style={styles.container}>
      {/* --- Header --- */}
      <div style={styles.header}>
        <button style={styles.navBtn} onClick={() => changeMonth(-1)}>&lt;</button>
        <div style={styles.monthTitle}>
          {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button style={styles.navBtn} onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      {/* --- Grid --- */}
      <div style={styles.grid}>
        {/* Render Day Labels (Su, Mo...) */}
        {DAYS_OF_WEEK.map(day => (
          <div key={day} style={styles.dayLabel}>{day}</div>
        ))}

        {/* Render Empty Slots (Padding) */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} style={styles.cellEmpty} />
        ))}

        {/* Render Actual Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isSel = isSelected(day);
          const isTod = isToday(day);

          // Combine Styles
          let cellStyle = { ...styles.cell };
          if (isSel) cellStyle = { ...cellStyle, ...styles.cellSelected };
          else if (isTod) cellStyle = { ...cellStyle, ...styles.cellToday };

          return (
            <div
              key={day}
              style={cellStyle}
              onClick={() => handleDateClick(day)}
              // Simple hover effect via inline logic or use CSS class in real app
              onMouseEnter={(e) => {
                if (!isSel) e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                 if (!isSel) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;