import { struct } from 'superstruct';

export const GeoPoint = struct({
  lat: 'number',
  lon: 'number',
});

export const PolygonPoints = struct({
  polygon: struct.list([GeoPoint]),
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
  is_active: 'boolean?',
});

export const Couriers = struct.list([Courier]);

export const Order = struct({
  id: 'string',
  order_number: 'number',
  courier_id: 'string',
  created_at: 'number',
  source: Location,
  destination: Location,
  delivered_at: 'number?',
});

export const Orders = struct.list([Order]);

export const TimeSeries = struct({
  point: GeoPoint,
  timestamp: 'number',
});

export const GeoHistory = struct({
  geo_history: [TimeSeries],
});

export const Polygon = struct({
  osm_id: 'number',
  osm_type: 'string',
  name: 'string',
});

export const Polygons = struct.list([Polygon]);

export const Suggestions = struct({
  couriers: Couriers,
  orders: Orders,
  polygons: Polygons,
});
