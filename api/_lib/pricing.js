function applyMemberPricing(priceGuest, priceMember, tier) {
  return (tier === 'DINK' || tier === 'FLEX') ? priceMember : priceGuest;
}

function bookingWindowDays(tier, slotType) {
  if (tier === 'DINK') return 14;
  if (tier === 'FLEX') return 7;
  return slotType === 'peak' ? 3 : 7;
}

function isWithinBookingWindow(bookingDate, tier, slotType) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(bookingDate);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((target - today) / 86400000);
  if (diffDays < 0) return false;
  return diffDays <= bookingWindowDays(tier, slotType);
}

function slotCapacity(sessionTypeKey) {
  if (sessionTypeKey === 'group_class' || sessionTypeKey === 'beginner') return 8;
  return 1;
}

function statusFromCount(count, capacity) {
  if (count >= capacity) return 'full';
  if (count >= capacity * 0.5) return 'limited';
  return 'available';
}

module.exports = { applyMemberPricing, bookingWindowDays, isWithinBookingWindow, slotCapacity, statusFromCount };
