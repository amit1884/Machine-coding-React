import React, { useState, useMemo, useCallback } from "react";

// --- 1. MOCK DATA (The Input) ---
const CONFIG = {
  rows: 5,
  cols: 8,
  prices: { standard: 10, premium: 15 },
  // 0 = Aisle, 1 = Standard ($10), 2 = Premium ($15)
  layout: [
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [2, 2, 2, 0, 0, 2, 2, 2],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  bookedSeats: ["0-0", "0-1", "2-4"], // "row-col" format
  maxSelectable: 5
};

// --- 2. STYLES (Inline for interview speed) ---
const styles = {
  container: { fontFamily: "sans-serif", padding: "20px", maxWidth: "600px", margin: "0 auto" },
  grid: {
    display: "grid",
    gridTemplateColumns: `repeat(${CONFIG.cols}, 1fr)`,
    gap: "10px",
    marginBottom: "20px",
  },
  seat: {
    height: "40px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  summary: { padding: "15px", background: "#f4f4f4", borderRadius: "8px" },
  legend: { display: "flex", gap: "15px", marginBottom: "20px", fontSize: "0.9rem" },
  legendItem: { display: "flex", alignItems: "center", gap: "5px" }
};

// Colors based on state
const COLORS = {
  standard: "#e0e0e0",
  premium: "#ffd700", // Gold
  selected: "#4caf50", // Green
  booked: "#444",      // Dark Grey
  text: "#000",
  textBooked: "#fff"
};

// --- 3. SEAT COMPONENT (Memoized for Performance) ---
const Seat = React.memo(({ 
  r, c, type, status, onClick, onFocus 
}) => {
  // If it's an aisle (0), render an invisible spacer
  if (type === 0) return <div />;

  const isBooked = status === "booked";
  const isSelected = status === "selected";
  
  // Determine styling
  let bg = type === 2 ? COLORS.premium : COLORS.standard;
  let color = COLORS.text;
  
  if (isBooked) { bg = COLORS.booked; color = COLORS.textBooked; }
  else if (isSelected) { bg = COLORS.selected; color = "#fff"; }

  return (
    <button
      style={{ ...styles.seat, backgroundColor: bg, color }}
      onClick={() => onClick(r, c, type)}
      disabled={isBooked}
      // Accessibility Attributes
      aria-label={`${type === 2 ? 'Premium' : 'Standard'} Seat, Row ${r + 1} Column ${c + 1}, Price $${type === 2 ? CONFIG.prices.premium : CONFIG.prices.standard}, ${status}`}
      // Keyboard Focus Logic: Identify this seat by coordinates
      data-rc={`${r}-${c}`}
      onKeyDown={(e) => onFocus(e, r, c)} 
    >
      {r+1}-{c+1}
    </button>
  );
});

// --- 4. MAIN CONTAINER ---
export default function TicketBooking() {
  const [selected, setSelected] = useState(new Set());

  // Helper: Toggle Selection
  const handleToggle = useCallback((r, c, type) => {
    const id = `${r}-${c}`;
    
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // Deselect
      } else {
        if (newSet.size >= CONFIG.maxSelectable) {
          alert(`You can only select ${CONFIG.maxSelectable} seats.`);
          return prev;
        }
        newSet.add(id); // Select
      }
      return newSet;
    });
  }, []);

  // Helper: Engineer 2 Level Keyboard Navigation (Arrow Keys)
  const handleKeyNav = useCallback((e, r, c) => {
    const { key } = e;
    const directions = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };

    if (!directions[key]) return;

    e.preventDefault(); // Stop page scroll
    
    let currR = r;
    let currC = c;
    
    // Loop to skip aisles (0s)
    while (true) {
      currR += directions[key][0];
      currC += directions[key][1];

      // Boundary Check
      if (currR < 0 || currR >= CONFIG.rows || currC < 0 || currC >= CONFIG.cols) break;

      // If we hit a valid seat (1 or 2), focus it
      if (CONFIG.layout[currR][currC] !== 0) {
        const nextSeat = document.querySelector(`[data-rc="${currR}-${currC}"]`);
        if (nextSeat) nextSeat.focus();
        break;
      }
      // If it's a 0 (aisle), the loop continues and jumps over it
    }
  }, []);

  // Derived State: Calculate Total Price
  const { totalPrice, selectedList } = useMemo(() => {
    let total = 0;
    const list = [];
    selected.forEach((id) => {
      const [r, c] = id.split("-").map(Number);
      const type = CONFIG.layout[r][c];
      const price = type === 2 ? CONFIG.prices.premium : CONFIG.prices.standard;
      total += price;
      list.push(`R${r+1}:C${c+1}`);
    });
    return { totalPrice: total, selectedList: list.join(", ") };
  }, [selected]);

  return (
    <div style={styles.container}>
      <h2>Select Seats</h2>
      
      {/* Legend */}
      <div style={styles.legend}>
        <span style={styles.legendItem}><div style={{...styles.seat, width: 20, height: 20, background: COLORS.standard}}></div> Standard ${CONFIG.prices.standard}</span>
        <span style={styles.legendItem}><div style={{...styles.seat, width: 20, height: 20, background: COLORS.premium}}></div> Premium ${CONFIG.prices.premium}</span>
        <span style={styles.legendItem}><div style={{...styles.seat, width: 20, height: 20, background: COLORS.selected}}></div> Selected</span>
        <span style={styles.legendItem}><div style={{...styles.seat, width: 20, height: 20, background: COLORS.booked}}></div> Booked</span>
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {CONFIG.layout.map((row, rIndex) =>
          row.map((type, cIndex) => {
            const id = `${rIndex}-${cIndex}`;
            let status = "available";
            if (CONFIG.bookedSeats.includes(id)) status = "booked";
            else if (selected.has(id)) status = "selected";

            return (
              <Seat
                key={id}
                r={rIndex}
                c={cIndex}
                type={type}
                status={status}
                onClick={handleToggle}
                onFocus={handleKeyNav}
              />
            );
          })
        )}
      </div>

      {/* Summary Footer */}
      <div style={styles.summary}>
        <p><strong>Selected:</strong> {selectedList || "None"}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <button 
          disabled={selected.size === 0}
          style={{ padding: "10px 20px", background: "#da3743", color: "white", border: "none", borderRadius: "4px", marginTop: "10px", cursor: "pointer", opacity: selected.size === 0 ? 0.5 : 1 }}
          onClick={() => alert(`Booking confirmed! Cost: $${totalPrice}`)}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}