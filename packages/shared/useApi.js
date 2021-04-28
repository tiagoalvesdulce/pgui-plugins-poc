import { useQuery } from "react-query";
import axios from "axios";
import get from "lodash/fp/get";

function useApi() {
  const apiInfo = useQuery("api", () => axios
  .get("/api")
  .then(res => {
    sessionStorage.csrf = get("x-csrf-token", res.headers);
    return res.data
  }), {
    refetchOnWindowFocus: false
  })
  return apiInfo;
}

export default useApi;