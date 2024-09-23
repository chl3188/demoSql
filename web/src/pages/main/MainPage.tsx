import React from "react";
import SqlToolPage from "../tools/SqlToolPage";
import MainPageTemplate from "../../components/pages/main/MainPageTemplate";

const MainPage: React.FC = () => {
  return <MainPageTemplate element={<SqlToolPage />} />;
};

export default MainPage;
