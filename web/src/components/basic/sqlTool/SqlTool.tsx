import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EditorTab from "./EditorTab";
import EditorCommand from "./EditorCommand";
import SqlEditor from "./SqlEditor";
import {
  IReqExecuteSQL,
  IResExecuteSQL,
} from "../../../apis/execute/execute.types";
import { connectionInfo } from "../../../stores/slice/connectionStore";
import { APIPostExecuteSQL } from "../../../apis/execute/execute";
import ResultTable from "./ResultTable";
import StatusBar from "./StatusBar";

interface Props {}

const SqlTool: React.FC<Props> = ({}) => {
  const connInfo = useSelector(connectionInfo);
  const [executeSQL, setExecuteSQL] = useState<IReqExecuteSQL>({
    connectionKey: "",
    sql: "select * from test.luji;",
  });
  const [resultSet, setResultSet] = useState<IResExecuteSQL>();

  useEffect(() => {
    if (connInfo) {
      console.log('connInfo', connInfo)
      setExecuteSQL((prevData) => ({
        ...prevData,
        connectionKey: connInfo.connectionKey!,
      }));
    }
  }, [connInfo]);

  const handleChangeSql = (value: string | undefined) => {
    if (value) {
      setExecuteSQL((prevData) => ({
        ...prevData,
        sql: value!,
      }));
    }
  };

  const handleClickRun = async () => {
    if (connInfo == null && executeSQL.sql == "") {
      alert("실행할 SQL이 없습니다.");
      return;
    } else {
      setExecuteSQL((prevData) => ({
        ...prevData,
        connectionKey: connInfo!.connectionKey!,
      }));
    }

    console.log('executeSQL', connInfo)
    console.log('executeSQL', executeSQL)

    const result = await APIPostExecuteSQL(executeSQL);
    if (result.code == 200) {
      setResultSet(result.data);
    } else {
      alert(result.message);
    }
  };

  return (
    <SqlToolContainer>
      <Content>
        <EditorLayout>
          <EditorTab />
          <SqlEditor onChange={handleChangeSql} />
          <EditorCommand onClickRun={handleClickRun} />
        </EditorLayout>
        <ResultLayout>
          <ResultTable data={resultSet} />
        </ResultLayout>
      </Content>

      <StatusLayout>
        <StatusBar connInfo={connInfo} status={resultSet} />
      </StatusLayout>
    </SqlToolContainer>
  );
};

export default SqlTool;

const SqlToolContainer = styled.div``;

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
