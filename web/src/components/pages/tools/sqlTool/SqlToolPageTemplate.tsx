import React from "react";
import styled from "styled-components";
import EditorTab from "./editor/EditorTab";

interface Props {
  SqlEditor: React.ReactElement;
  EditorCommand: React.ReactElement;
  ResultTable: React.ReactElement;
  StatusBar: React.ReactElement;
}

const SqlToolPageTemplate: React.FC<Props> = ({
  SqlEditor,
  EditorCommand,
  ResultTable,
  StatusBar,
}) => {
  return (
    <Container>
      <Content>
        <EditorLayout>
          <EditorTab />
          {SqlEditor}
          {EditorCommand}
        </EditorLayout>
        <ResultLayout>{ResultTable}</ResultLayout>
      </Content>

      <StatusLayout>{StatusBar}</StatusLayout>
    </Container>
  );
};

export default SqlToolPageTemplate;

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: calc(100vh - 35px);
`;

const EditorLayout = styled.div`
  height: 60%;
`;

const ResultLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StatusLayout = styled.div`
  height: 35px;
`;
