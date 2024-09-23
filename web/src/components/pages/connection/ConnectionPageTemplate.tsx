import React from "react";
import styled from "styled-components";
import { IReqConnection } from "../../../apis/connection/connection.types";
import CommonCombo from "../../basic/common/combo/CommonCombo";
import CommonInput from "../../basic/common/input/CommonInput";
import CommonSubmitButton from "../../basic/common/button/CommonSubmitButton";
import { IDbTypeOptions } from "../../../pages/connection/ConnectionPage";

interface Props {
  dbTypes: IDbTypeOptions[];
  connectionInfo: IReqConnection;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: () => void;
}

const ConnectionPageTemplate: React.FC<Props> = ({
  dbTypes,
  connectionInfo,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Container>
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
          {connectionInfo.dbType == 1 ? (
            <Row>
              <Col width={100}>
                <CommonInput
                  label={"SID"}
                  name={"dbSid"}
                  value={connectionInfo.dbSid}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          ) : (
            <></>
          )}
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
    </Container>
  );
};

export default ConnectionPageTemplate;

const Container = styled.div`
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
