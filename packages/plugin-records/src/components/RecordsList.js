import React from "react";
import useRecords from '../hooks/useRecords'

const parseProposalMetadata = (proposal = {}) => {
  const metadata =
    proposal.files &&
    proposal.files.find((f) => f.name === "proposalmetadata.json");
  return metadata ? JSON.parse(atob(metadata.payload)) : {};
};

function RecordsList({ tokens, queryKey }) {
  const { data, isLoading, isIdle } = useRecords(queryKey, tokens);
  console.log(data);
  return isIdle ? null : isLoading ? "Loading..." : (
    <div>
      {Object.values(data).map(record => <div>
        <h4>Name: {parseProposalMetadata(record).name}</h4>
        <p>Token: {record.censorshiprecord.token}</p>
        <p>Author: {record.username}</p>
        <p>Timestamp: {record.timestamp}</p>
      </div>)}
    </div>
  )
}

export default RecordsList;