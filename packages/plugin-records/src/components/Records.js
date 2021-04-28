import React from "react";
import RecordsList from "./RecordsList";
import { useInventory } from "plugin-ticketvote"

function Records() {
  const { data, isLoading, isIdle } = useInventory();
  return (
    <div>
      <h2>Records</h2>
      {isIdle ? null : isLoading ? "Loading..." : (
      <>
        <h3>Approved</h3>
        <RecordsList queryKey={["records", "approved"]} tokens={data.vetted.approved}/>
        <h3>Rejected</h3>
        <RecordsList queryKey={["records", "rejected"]} tokens={data.vetted.rejected}/>
        <h3>Ineligible</h3>
        <RecordsList queryKey={["records", "ineligible"]} tokens={data.vetted.ineligible}/>
        <h3>Unauthorized</h3>
        <RecordsList queryKey={["records", "unauthorized"]} tokens={data.vetted.unauthorized}/>
      </>
      )}
    </div>
  );
}

export default Records;
