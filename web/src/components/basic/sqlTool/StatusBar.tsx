import React from "react";
import styled from "styled-components";
import {
  ExecuteSQLType,
  IResExecuteSQL,
} from "../../../apis/execute/execute.types";

interface Props {
  status: IResExecuteSQL | undefined;
}

const Footer: React.FC<Props> = ({ status }) => {
  return (
    <FooterContainer>
      <LeftSection>
        <JdbcText>localhost:3306/test</JdbcText>
        <DbText>mysql</DbText>
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
