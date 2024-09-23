import React from "react";
import styled from "styled-components";
import Editor from "@monaco-editor/react";

interface Props {
  onChange: (value: string | undefined) => void;
}

const SqlEditor: React.FC<Props> = ({ onChange }) => {
  const handleEditorChange = (value: string | undefined, event: any) => {
    onChange(value);
  };

  return (
    <SqlEditorContainer>
      <Editor
        height="50vh"
        defaultLanguage="mysql"
        defaultValue=""
        onChange={handleEditorChange}
      />
    </SqlEditorContainer>
  );
};

export default SqlEditor;

const SqlEditorContainer = styled.div``;
