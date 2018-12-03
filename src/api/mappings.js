export const courierMapping = courier => ({
  id: courier.id,
  name: courier.name,
  phone: courier.phone,
  location: courier.location ? {
    lat: courier.location.point.lat,
    lng: courier.location.point.lon,
    address: courier.location.address,
  } : undefined,
  lastSeen: courier.last_seen,
  ordersCount: courier.orders_count,
});

export const couriersMapping = couriers => couriers.map(courierMapping);

export const orderMapping = order => ({
  id: order.id,
  orderNumber: order.order_number,
  courierId: order.courier_id,
  createdAt: order.created_at,
  source: {
    lat: order.source.point.lat,
    lng: order.source.point.lon,
    address: order.source.address,
  },
  destination: {
    lat: order.destination.point.lat,
    lng: order.destination.point.lon,
    address: order.destination.address,
  },
});

export const ordersMapping = orders => orders.map(orderMapping);

export const geoHistoryMapping = response => response.geo_history.map(waypoint => ({
  lat: waypoint.point.lat,
  lng: waypoint.point.lon,
  timestamp: waypoint.timestamp,
}));

export const polygonMapping = polygon => ({
  osmID: polygon.osm_id,
  osmType: polygon.osm_type,
  name: polygon.name,
});

export const suggestionsMapping = suggestions => ({
  couriers: couriersMapping(suggestions.couriers),
  orders: ordersMapping(suggestions.orders),
  polygons: suggestions.polygons.map(polygonMapping),
});

export const geoPointMapping = point => ({
  lat: point.lat,
  lng: point.lon,
});

export const geoPointsMapping = geoPoints => geoPoints.polygon.map(geoPointMapping);
