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
import { handleResponse, mapResponse, validateResponse } from './helpers';

const { API_URL } = process.env;

export const getCourierById = (courierId) => {
  const url = new URL(`couriers/${courierId}`, API_URL);

  return fetch(url)
    .then(handleResponse)
    .then(validateResponse(Courier))
    .then(mapResponse(courierMapping));
};

export const getCourierOrders = (courierId, since, asc, excludeDelivered) => {
  const url = new URL(`couriers/${courierId}/orders`, API_URL);
  url.search = new URLSearchParams({
    since,
    asc,
    exclude_delivered: excludeDelivered,
  });

  return fetch(url)
    .then(handleResponse)
    .then(validateResponse(Orders))
    .then(mapResponse(ordersMapping));
};

export const getOrder = (courierId, orderId) => {
  const url = new URL(`couriers/${courierId}/orders/${orderId}`, API_URL);

  return fetch(url)
    .then(handleResponse)
    .then(validateResponse(Order))
    .then(mapResponse(orderMapping));
};

export const getCouriersByBoxField = ({
  topLeftLat, topLeftLon,
  bottomRightLat, bottomRightLon,
}, activeOnly) => {
  const url = new URL('couriers', API_URL);
  url.search = new URLSearchParams({
    top_left_lat: topLeftLat,
    top_left_lon: topLeftLon,
    bottom_right_lat: bottomRightLat,
    bottom_right_lon: bottomRightLon,
    active_only: activeOnly,
  });

  return fetch(url)
    .then(handleResponse)
    .then(validateResponse(Couriers))
    .then(mapResponse(couriersMapping));
};

export const getSuggestions = (input) => {
  const url = new URL('suggestions', API_URL);
  url.search = new URLSearchParams({ input });

  return fetch(url)
    .then(handleResponse)
    .then(validateResponse(Suggestions))
    .then(mapResponse(suggestionsMapping));
};

export const getGeoHistory = (courierId, since) => {
  const url = new URL(`couriers/${courierId}/geo_history`, API_URL);
  url.search = new URLSearchParams({ since });

  return fetch(url)
    .then(handleResponse)
    .then(validateResponse(GeoHistory))
    .then(mapResponse(geoHistoryMapping));
};
