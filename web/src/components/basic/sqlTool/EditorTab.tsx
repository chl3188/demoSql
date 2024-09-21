import React from "react";
import styled from "styled-components";

interface Props {}

const EditorTab: React.FC<Props> = ({}) => {
  return (
    <EditorTabContainer>
      <EditorTabItem>
        <TabText>Tab 1</TabText>
      </EditorTabItem>
    </EditorTabContainer>
  );
};

export default EditorTab;

const EditorTabContainer = styled.div`
  padding-top: 3px;
  background-color: #f8f8f8;
`;

const EditorTabItem = styled.div`
  width: 50px;
  height: 20px;
  background-color: #fffffe;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  align-content: center;
  text-align: center;
`;

const TabText = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: bold;
`;
