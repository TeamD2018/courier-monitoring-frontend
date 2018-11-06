import {
  courierMapping,
  couriersMapping,
  geoHistoryMapping,
  orderMapping,
  ordersMapping, suggestionsMapping,
} from './mappings';
import {
  Courier, Couriers, GeoHistory, Order, Suggestions, Orders,
} from './models';

const { API_URL } = process.env;

const responseMapper = (fetch, mapping, validator) => new Promise(async (resolve, reject) => {
  const response = await fetch;

  if (response.status !== 200) {
    reject(new Error(response.status));
  }

  try {
    const obj = await response.json();
    const validatedObj = validator(obj);
    resolve(mapping(validatedObj));
  } catch (e) {
    reject(new Error(e));
  }
});

export const getCourierById = (courierId) => {
  const url = new URL(`couriers/${courierId}`, API_URL);

  return responseMapper(fetch(url), courierMapping, Courier);
};

export const getCourierOrders = (courierId, since, asc, excludeDelivered) => {
  const url = new URL(`couriers/${courierId}/orders`, API_URL);
  url.search = new URLSearchParams({
    since,
    asc,
    excludeDelivered,
  });

  return responseMapper(fetch(url), ordersMapping, Orders);
};

export const getOrder = (courierId, orderId) => {
  const url = new URL(`couriers/${courierId}/orders/${orderId}`, API_URL);

  return responseMapper(fetch(url), orderMapping, Order);
};

export const getCouriersByCircleField = (lat, lon, radius) => {
  const url = new URL('couriers', API_URL);
  url.search = new URLSearchParams({
    lat,
    lon,
    radius,
  });

  return responseMapper(fetch(url), couriersMapping, Couriers);
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

  return responseMapper(fetch(url), couriersMapping, Couriers);
};

export const getSuggestions = (input) => {
  const url = new URL('suggestions', API_URL);
  url.search = new URLSearchParams({ input });

  return responseMapper(fetch(url), suggestionsMapping, Suggestions);
};

export const getGeoHistory = (courierId, since) => {
  const url = new URL(`couriers/${courierId}/geo_history`, API_URL);
  url.search = new URLSearchParams({
    since,
  });
  return responseMapper(fetch(url), geoHistoryMapping, GeoHistory);
};
