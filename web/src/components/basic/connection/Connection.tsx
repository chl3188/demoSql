import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setConnectionKey } from "../../../stores/slice/connectionStore";
import { APIPostConnection } from "../../../apis/connection/connection";
import { IReqConnection } from "../../../apis/connection/connection.types";
import CommonInput from "../common/input/CommonInput";
import CommonCombo from "../common/combo/CommonCombo";
import CommonSubmitButton from "../common/button/CommonSubmitButton";

interface Props {}

export interface IDbTypeOptions {
  label: string;
  value: number;
}

const Connection: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const [connectionInfo, setConnectionInfo] = useState<IReqConnection>({
    dbType: 2,
    dbIp: "127.0.0.1",
    dbPort: "3306",
    dbUserId: "root",
    dbUserPw: "wnfjdwnfjd",
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
      dispatch(setConnectionKey(result.data));
    } else {
      alert(result.message);
    }
  };

  return (
    <ConnectionContainer>
      <ConnectionLayout>
        <HeaderSection>
          <TitleText>New Connection</TitleText>
        </HeaderSection>
        <InfoSection>
          <Row>
            <Col width={100}>
              <CommonCombo
                label={"Db Type"}
                options={dbTypes}
                name={"dbType"}
                value={connectionInfo.dbType}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col width={70}>
              <CommonInput
                label={"Host"}
                name={"dbIp"}
                value={connectionInfo.dbIp}
                onChange={handleChange}
              />
            </Col>
            <Blank />
            <Col width={30}>
              <CommonInput
                label={"Port"}
                name={"dbPort"}
                value={connectionInfo.dbPort}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col width={50}>
              <CommonInput
                label={"User"}
                name={"dbUserId"}
                value={connectionInfo.dbUserId}
                onChange={handleChange}
              />
            </Col>
            <Blank />
            <Col width={50}>
              <CommonInput
                type={"password"}
                label={"Password"}
                name={"dbUserPw"}
                value={connectionInfo.dbUserPw}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col width={100}>
              <CommonInput
                label={"Default Database"}
                name={"dbName"}
                value={connectionInfo.dbName}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </InfoSection>
        <ConnectSection>
          <CommonSubmitButton label="Connect" onClick={handleSubmit} />
        </ConnectSection>
      </ConnectionLayout>
    </ConnectionContainer>
  );
};

export default Connection;

const ConnectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
`;

const ConnectionLayout = styled.div`
  width: 400px;
  height: 300px;
  padding: 16px;
  background-color: #f6f6f6;
  border-radius: 10px;
`;

const HeaderSection = styled.div`
  height: 50px;
`;

const TitleText = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #202020;
  text-align: left;
`;

const InfoSection = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`;

const Col = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
`;

const Blank = styled.div`
  width: 5px;
`;

const ConnectSection = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 40px;
`;
