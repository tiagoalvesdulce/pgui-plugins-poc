import { useQuery } from "react-query";
import axios from "axios";

function useInventory() {
  const inventory = useQuery("inventory", () => axios
  ({
    method: "POST",
    url: "api/ticketvote/v1/inventory",
    data: {
      page: 1
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "x-csrf-token": sessionStorage.csrf
    },
    withCredentials: true
  })
  .then(res => res.data), {
    // only run this query if the csrf is available
    enabled: !!sessionStorage.csrf
  })
  return inventory;
}

export default useInventory;