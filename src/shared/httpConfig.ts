import { Axios } from "axios";

const Api = new Axios({
  baseURL: "https://tasty.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "7f1f015797msh59c85218023487fp18808cjsn18ccac05c7eb",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
});

export default Api;
