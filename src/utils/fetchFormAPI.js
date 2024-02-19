import axios from "axios";

// ***************************************************     this is another one (lite)
const BASE_URL = "https://youtube-v31.p.rapidapi.com" || "https://youtube-v3-lite.p.rapidapi.com";

const options = {
  method: "GET",
  url: BASE_URL,
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    // "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",

    // this is another one
    "X-RapidAPI-Host": "youtube-v3-lite.p.rapidapi.com",
  },
};

export const fetchFormAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
