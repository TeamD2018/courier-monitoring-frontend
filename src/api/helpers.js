export const handleResponse = response => new Promise((resolve, reject) => {
  if (response.status !== 200) {
    reject(new Error(response.status));
  }

  resolve(response.json());
});

export const mapResponse = mapping => response => new Promise(async (resolve, reject) => {
  try {
    const mapped = mapping(response);
    resolve(mapped);
  } catch (e) {
    reject(e);
  }
});

export const validateResponse = validator => response => new Promise(async (resolve, reject) => {
  try {
    const validated = validator(response);
    resolve(validated);
  } catch (e) {
    reject(e);
  }
});
