import { struct } from 'superstruct';

export const GeoPoint = struct({
  lat: 'number',
  lon: 'number',
});

export const Location = struct({
  point: GeoPoint,
  address: 'string?',
});

export const Courier = struct({
  id: 'string',
  name: 'string',
  phone: 'string',
  last_seen: 'number?',
  orders_count: 'number?',
  location: struct.optional(Location),
});

export const Couriers = struct.list([Courier]);

export const Order = struct({
  id: 'string',
  order_number: 'number',
  courier_id: 'string',
  created_at: 'number',
  source: Location,
  destination: Location,
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
