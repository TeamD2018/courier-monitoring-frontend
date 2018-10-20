import { getCourierOrders } from '../api';

export const fetchRecentOrders = (courierId, period) => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const periodAgo = Math.floor((Date.now() - HOUR * period) / SECOND);
  return getCourierOrders(courierId, periodAgo, true);
};
