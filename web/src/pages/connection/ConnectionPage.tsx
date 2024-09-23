import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import ConnectionPageTemplate from "../../components/pages/connection/ConnectionPageTemplate";
import { IReqConnection } from "../../apis/connection/connection.types";
import { APIPostConnection } from "../../apis/connection/connection";
import { setConnection } from "../../stores/slice/connectionStore";

interface Props {}

export interface IDbTypeOptions {
  label: string;
  value: number;
}

const ConnectionPage: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [connectionInfo, setConnectionInfo] = useState<IReqConnection>({
    dbType: 2,
    dbIp: "127.0.0.1",
    dbPort: "3307",
    dbUserId: "root",
    dbUserPw: "wnfjdwnfjd",
    dbSid: "",
    dbName: "test",
  });

  const dbTypes: IDbTypeOptions[] = [
    { label: "oracle", value: 1 },
    { label: "mysql", value: 2 },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setConnectionInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      connectionInfo.dbIp == "" &&
      connectionInfo.dbPort == "" &&
      connectionInfo.dbName == "" &&
      connectionInfo.dbUserId == "" &&
      connectionInfo.dbUserPw == ""
    ) {
      alert("정보 입력하세요.");
      return;
    }

    const result = await APIPostConnection(connectionInfo);
    if (result.code == 200) {
      dispatch(setConnection(result.data));
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <ConnectionContainer>
      <ConnectionPageTemplate
        dbTypes={dbTypes}
        connectionInfo={connectionInfo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </ConnectionContainer>
  );
};

export default ConnectionPage;

const ConnectionContainer = styled.div``;
