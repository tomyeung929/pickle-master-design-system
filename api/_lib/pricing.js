// Member pricing and booking window enforcement

export function applyMemberPricing(priceGuest, priceMember, tier) {
  return (tier === 'DINK' || tier === 'FLEX') ? priceMember : priceGuest;
}

// Returns max days ahead this tier can book
export function bookingWindowDays(tier, slotType) {
  if (tier === 'DINK') return 14;
  if (tier === 'FLEX') return 7;
  // guests: 3 days for peak, 7 for everything else
  return slotType === 'peak' ? 3 : 7;
}

export function isWithinBookingWindow(bookingDate, tier, slotType) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(bookingDate);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((target - today) / 86400000);
  if (diffDays < 0) return false; // past date
  return diffDays <= bookingWindowDays(tier, slotType);
}

// Slot capacity: each court+time allows 1 booking for private sessions
// Group classes can have up to 8 participants
export function slotCapacity(sessionTypeKey) {
  if (sessionTypeKey === 'group_class' || sessionTypeKey === 'beginner') return 8;
  return 1;
}

// Status thresholds
export function statusFromCount(count, capacity) {
  if (count >= capacity) return 'full';
  if (count >= capacity * 0.5) return 'limited';
  return 'available';
}
