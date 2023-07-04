import { Axios } from "axios";

const Api = new Axios({
  baseURL: "https://tasty.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "6755458cbamsh73674c97c88c91cp110fe3jsncb19a362fb43",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
});

export default Api;
