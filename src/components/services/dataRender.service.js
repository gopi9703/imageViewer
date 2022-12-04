import api from "./api";

// const getApiData = (number) => {
//   return api.get(`albums/${number}/photos`);
// };

const getGalleryData = (clientId) => {
  return api.get(`/photos/?client_id=${clientId}`);
};

const ApiService = {
  getGalleryData,
};
export default ApiService;
