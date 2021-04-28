import { useQuery } from "react-query";
import axios from "axios";
import take from "lodash/fp/take"

function useRecords(queryKey, tokens) {
  // verify if tokens is undefined, null or []
  if (!tokens || tokens.length === 0) {
    throw Error("Tokens is required");
  }
  const requests = tokens.map(token => ({
    filenames: ["proposalmetadata.json", "votemetadata.json"],
    token
  }))

  const records = useQuery(queryKey, () => axios
  ({
    method: "POST",
    url: "api/records/v1/records",
    data: {
      // take 5 first records for simplicity of this POC since max page size is 5.
      requests: take(5, requests)
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "x-csrf-token": sessionStorage.csrf
    },
    withCredentials: true
  })
  .then(res => res.data.records), {
    // only run this query if the csrf is available
    enabled: !!sessionStorage.csrf,
  })
  return records;
}

export default useRecords;