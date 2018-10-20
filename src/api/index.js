const { API_URL } = process.env;

export const getCourierById = (courierId) => {
  const url = new URL(`couriers/${courierId}`, API_URL);
  console.log('geoCourierById')
  return fetch(url)
    .then(res => res.json());
};

export const getCourierOrders = (courierId, since, asc, excludeDelivered) => {
  const url = new URL(`couriers/${courierId}/orders`, API_URL);
  url.search = new URLSearchParams({
    since,
    asc,
    excludeDelivered,
  });

  return fetch(url)
    .then(res => res.json());
};

export const getOrder = (courierId, orderId) => {
  const url = new URL(`couriers/${courierId}/orders${orderId}`, API_URL);

  return fetch(url)
    .then(res => res.json());
};

export const getCouriersByCircleField = (lat, lon, radius) => {
  const url = new URL('couriers', API_URL);
  url.search = new URLSearchParams({
    lat,
    lon,
    radius,
  });

  return fetch(url)
    .then(res => res.json());
};

export const getCouriersByBoxField = ({
  topLeftLat, topLeftLon, bottomRightLat, bottomRightLon,
}) => {
  const url = new URL('couriers', API_URL);
  url.search = new URLSearchParams({
    top_left_lat: topLeftLat,
    top_left_lon: topLeftLon,
    bottom_right_lat: bottomRightLat,
    bottom_right_lon: bottomRightLon,
  });

  return fetch(url)
    .then(res => res.json());
};

export const getSuggestions = (prefix, limit) => {
  const url = new URL('suggestions/couriers', API_URL);
  url.search = new URLSearchParams({
    prefix,
    limit,
  });
  return fetch(url)
    .then(res => res.json());
};

export const getGeoHistory = (courierId, since) => {
  const url = new URL(`couriers/${courierId}/geo_history`, API_URL);
  url.search = new URLSearchParams({
    since,
  });
  return fetch(url)
    .then(res => res.json());
};
