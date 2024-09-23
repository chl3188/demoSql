import React from "react";
import styled from "styled-components";
import CommonSubmitButton from "../../components/basic/common/button/CommonSubmitButton";

interface Props {
  onClickRun: () => void;
}

const EditorCommand: React.FC<Props> = ({ onClickRun }) => {
  return (
    <EditorCommandContainer>
      <CommonSubmitButton label="Run" onClick={onClickRun} />
    </EditorCommandContainer>
  );
};

export default EditorCommand;

const EditorCommandContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 5px;
  background-color: #fffffe;
  border-bottom: 1px solid #d9d9d9;
`;
