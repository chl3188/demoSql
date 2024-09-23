import { useEffect } from "react";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../../../pages/main/MainPage";
import ConnectionPage from "../../../pages/connection/ConnectionPage";

const ComponentLoading: React.FC = () => {
  return (
    <div>
      <div>컴포넌트 로딩중...</div>
    </div>
  );
};

const AppContent: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Suspense fallback={<ComponentLoading />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/connection" element={<ConnectionPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppContent;
