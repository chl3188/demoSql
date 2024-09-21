import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./stores";
import DefaultLayout from "./components/basic/layout/DefaultLayout";
import "./App.css";

const Loading: React.FC = () => {
  return (
    <div>
      <div>페이지 로딩중...</div>
    </div>
  );
};

const App: React.FC = () => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/*" element={<DefaultLayout />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
