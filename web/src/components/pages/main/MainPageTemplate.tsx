import React from "react";
import styled from "styled-components";

interface Props {
  element: React.ReactElement;
}

const MainPageTemplate: React.FC<Props> = ({ element }) => {
  return <Container>{element}</Container>;
};

export default MainPageTemplate;

const Container = styled.div``;
