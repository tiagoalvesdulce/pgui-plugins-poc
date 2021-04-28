import React from "react";
import { render } from "react-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Records from './components/Records';

const queryClient = new QueryClient();

render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Records />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)