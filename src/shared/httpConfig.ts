import { Axios } from "axios";

const Api = new Axios({
  baseURL: "https://tasty.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "10bdf42beamsh4c48782f85bd44ap17fe67jsndf01378b3634",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
});

export default Api;
