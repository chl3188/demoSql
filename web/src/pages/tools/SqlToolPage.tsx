import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  IReqExecuteSQL,
  IResExecuteSQL,
} from "../../apis/execute/execute.types";
import {
  connectionInfo,
  setConnection,
} from "../../stores/slice/connectionStore";
import { APIPostExecuteSQL } from "../../apis/execute/execute";
import { APIDeleteConnection } from "../../apis/connection/connection";
import SqlToolPageTemplate from "../../components/pages/tools/sqlTool/SqlToolPageTemplate";
import SqlEditor from "./SqlEditor";
import EditorCommand from "./EditorCommand";
import ResultTable from "./ResultTable";
import StatusBar from "./StatusBar";

interface Props {}

const SqlTool: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connInfo = useSelector(connectionInfo);
  const [executeSQL, setExecuteSQL] = useState<IReqExecuteSQL>({
    connectionKey: "",
    sql: "",
  });
  const [resultSet, setResultSet] = useState<IResExecuteSQL>();

  useEffect(() => {
    if (connInfo) {
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
      <SqlToolPageTemplate
        SqlEditor={<SqlEditor onChange={handleChangeSql} />}
        EditorCommand={<EditorCommand onClickRun={handleClickRun} />}
        ResultTable={<ResultTable data={resultSet} />}
        StatusBar={
          <StatusBar
            connInfo={connInfo}
            status={resultSet}
            onClickDisConnect={handleClickDisconnect}
          />
        }
      />
    </SqlToolContainer>
  );
};

export default SqlTool;

const SqlToolContainer = styled.div``;
