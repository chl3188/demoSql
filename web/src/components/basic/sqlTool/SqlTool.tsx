import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EditorTab from "./EditorTab";
import EditorCommand from "./EditorCommand";
import SqlEditor from "./SqlEditor";
import {
  IReqExecuteSQL,
  IResExecuteSQL,
} from "../../../apis/execute/execute.types";
import {
  connectionInfo,
  setConnection,
} from "../../../stores/slice/connectionStore";
import { APIPostExecuteSQL } from "../../../apis/execute/execute";
import ResultTable from "./ResultTable";
import StatusBar from "./StatusBar";
import { APIDeleteConnection } from "../../../apis/connection/connection";

interface Props {}

const SqlTool: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connInfo = useSelector(connectionInfo);
  const [executeSQL, setExecuteSQL] = useState<IReqExecuteSQL>({
    connectionKey: "",
    sql: "select * from test.luji;",
  });
  const [resultSet, setResultSet] = useState<IResExecuteSQL>();

  useEffect(() => {
    if (connInfo) {
      console.log("connInfo", connInfo);
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

    const result = await APIPostExecuteSQL(executeSQL);
    if (result.code == 200) {
      setResultSet(result.data);
    } else {
      alert(result.message);
    }
  };

  const handleClickDisconnect = async () => {
    if (!connInfo) {
      return;
    }

    const result = await APIDeleteConnection(connInfo.connectionKey);
    if (result.code == 200) {
      dispatch(setConnection(null));
      navigate("/connection");
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
        <StatusBar
          connInfo={connInfo}
          status={resultSet}
          onClickDisConnect={handleClickDisconnect}
        />
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
