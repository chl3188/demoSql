import React from "react";
import styled from "styled-components";
import { IResConnection } from "../../../../apis/connection/connection.types";
import {
  ExecuteSQLType,
  IResExecuteSQL,
} from "../../../../apis/execute/execute.types";

interface Props {
  connInfo: IResConnection | null;
  status: IResExecuteSQL | undefined;
  onClickDisConnect: () => void;
}

const Footer: React.FC<Props> = ({ connInfo, status, onClickDisConnect }) => {
  const convertDbType = (dbType: Number) => {
    if (dbType == 1) {
      return "oracle";
    } else if (dbType == 2) {
      return "mysql";
    }
  };

  return (
    <FooterContainer>
      <LeftSection>
        {connInfo && (
          <>
            <JdbcText>{connInfo!.shortJdbcUrl}</JdbcText>
            <DisConnect onClick={onClickDisConnect}>disconnect</DisConnect>
            <DbText>{convertDbType(connInfo!.dbType)}</DbText>
          </>
        )}
      </LeftSection>
      <RightSection>
        {status ? (
          <AffectedRowText>
            {status.type == ExecuteSQLType.QUERY ? (
              <>
                {status.resultList.length} records / {status.affectedRows}{" "}
                affected Rows
              </>
            ) : (
              <> {status.affectedRows} affected Rows</>
            )}
          </AffectedRowText>
        ) : (
          <NoDataText>No Data</NoDataText>
        )}
      </RightSection>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  background-color: #e2e2e2;
`;

const JdbcText = styled.p`
  padding-left: 4px;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  text-align: center;
`;

const DbText = styled.p`
  padding-right: 4px;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #000000;
  text-align: center;
`;

const DisConnect = styled.p`
  padding-right: 4px;
  margin: 0;
  color: red;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  background-color: #f0f0f0;
`;

const AffectedRowText = styled.p`
  padding-left: 4px;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #000000;
  text-align: center;
`;

const NoDataText = styled.p`
  padding-left: 4px;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #000000;
  text-align: center;
`;
