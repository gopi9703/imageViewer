import api from "./api";

// const getApiData = (number) => {
//   return api.get(`albums/${number}/photos`);
// };

const getGalleryData = (clientId, page, per_page) => {
  return api.get(
    `/photos/?client_id=${clientId}&page=${page}&per_page=${per_page}`
  );
};

const ApiService = {
  getGalleryData,
};
export default ApiService;
