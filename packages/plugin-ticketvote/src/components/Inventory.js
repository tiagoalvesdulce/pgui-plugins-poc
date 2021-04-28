import React from "react";
import useApi from "shared/useApi";
import useInventory from "../hooks/useInventory"

function Inventory() {
  const { data: apiData } = useApi();
  const { isIdle, isLoading, data } = useInventory();
  return apiInfo.isLoading ? (
    "Loading..."
  ) : (
    <div>
      {apiData.mode}
      <br/>
      <h2>Records Tokens</h2>
      {isIdle ? null : isLoading ? "Loading..." : (
      <>
        <h3>Approved</h3>
        {data.vetted?.approved.map(token => <div key={token}>{token}</div>)}
        <h3>Rejected</h3>
        {data.vetted?.rejected.map(token => <div key={token}>{token}</div>)}
        <h3>Ineligible</h3>
        {data.vetted?.ineligible.map(token => <div key={token}>{token}</div>)}
        <h3>Unauthorized</h3>
        {data.vetted?.unauthorized.map(token => <div key={token}>{token}</div>)}
      </>
      )}
    </div>
  );
}

export default Inventory;
