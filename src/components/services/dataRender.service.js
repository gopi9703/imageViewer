import api from "./api";

const getApiData = (number) => {
  return api.get(`albums/${number}/photos`);
};

const ApiService = {
  getApiData,
};
export default ApiService;
