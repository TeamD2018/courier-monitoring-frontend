import { struct } from 'superstruct';

export const GeoPoint = struct({
  lat: 'number',
  lon: 'number',
});

export const Courier = struct({
  id: 'number',
  name: 'string',
  phone: 'string',
  last_seen: 'number',
  orders_count: 'number',
  location: {
    point: GeoPoint,
    address: 'string?',
  },
});

export const Couriers = struct.list([Courier]);

export const Order = struct({
  id: 'string',
  order_number: 'number',
  courier_id: 'string',
  created_at: 'number',
  source: {
    point: GeoPoint,
    address: 'string',
  },
  destination: {
    point: {
      lat: 'number',
      lon: 'number',
    },
    address: 'string',
  },
});

export const Orders = struct.list([Order]);

export const TimeSeries = struct({
  point: GeoPoint,
  timestamp: 'number',
});

export const GeoHistory = struct({
  geo_history: [TimeSeries],
});

export const Suggestions = struct({
  couriers: Couriers,
  orders: Orders,
});
