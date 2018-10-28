const { API_URL } = process.env;

const responseHandler = (response) => {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error(response.status);
};

export const getCourierById = (courierId) => {
  const url = new URL(`couriers/${courierId}`, API_URL);
  return fetch(url)
    .then(responseHandler);
};

export const getCourierOrders = (courierId, since, asc, excludeDelivered) => {
  const url = new URL(`couriers/${courierId}/orders`, API_URL);
  url.search = new URLSearchParams({
    since,
    asc,
    excludeDelivered,
  });

  return fetch(url)
    .then(responseHandler);
};

export const getOrder = (courierId, orderId) => {
  const url = new URL(`couriers/${courierId}/orders${orderId}`, API_URL);

  return fetch(url)
    .then(responseHandler);
};

export const getCouriersByCircleField = (lat, lon, radius) => {
  const url = new URL('couriers', API_URL);
  url.search = new URLSearchParams({
    lat,
    lon,
    radius,
  });

  return fetch(url)
    .then(responseHandler);
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
    .then(responseHandler);
};

export const getSuggestions = (prefix, limit) => {
  const url = new URL('suggestions/couriers', API_URL);
  url.search = new URLSearchParams({
    prefix,
    limit,
  });
  return fetch(url)
    .then(responseHandler);
};

export const getGeoHistory = (courierId, since) => {
  const url = new URL(`couriers/${courierId}/geo_history`, API_URL);
  url.search = new URLSearchParams({
    since,
  });
  return fetch(url)
    .then(responseHandler);
};
