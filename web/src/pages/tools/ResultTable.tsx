import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { themeQuartz } from "@ag-grid-community/theming";
import {
  ExecuteSQLType,
  IResExecuteSQL,
  IResExecuteSQLResult,
} from "../../apis/execute/execute.types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface Props {
  data: IResExecuteSQL | undefined;
}

const ResultTable: React.FC<Props> = ({ data }) => {
  const [rowData, setRowData] = useState<IResExecuteSQLResult[]>([]);

  const [colDefs, setColDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    setRowData([]);
    setColDefs([]);

    if (
      data &&
      data.type == ExecuteSQLType.QUERY &&
      data.resultList.length > 0
    ) {
      const keys = Object.keys(data.resultList[0]);

      keys.map((key) =>
        setColDefs((prevItems) => [...prevItems, { field: key }])
      );

      setRowData(data.resultList);
    }
  }, [data]);

  return (
    <ResultTableContainer>
      {rowData.length == 0 ? (
        <></>
      ) : (
        <div style={{ width: "100%" }}>
          <AgGridReact
            theme={themeQuartz}
            loadThemeGoogleFonts
            rowData={rowData}
            columnDefs={colDefs}
          />
        </div>
      )}
    </ResultTableContainer>
  );
};

export default ResultTable;

const ResultTableContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;
