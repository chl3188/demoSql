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
        defaultValue="
select * from test.demo;

/*
insert into test.demo(name, phone, address) values ('chlee', '010-6739-3922', 'seoul'),
('chlee2', '010-6739-3922', 'seoul'),
('chlee3', '010-6739-3922', 'seoul'),
('chlee4', '010-6739-3922', 'seoul'),
('chlee5', '010-6739-3922', 'seoul');
*/

-- update test.demo set name = 'chleeUpdate' where name = 'chlee';

-- delete from test.demo;

-- drop table test.demo;"
        onChange={handleEditorChange}
      />
    </SqlEditorContainer>
  );
};

export default SqlEditor;

const SqlEditorContainer = styled.div``;
