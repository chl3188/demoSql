import React from "react";
import styled from "styled-components";
import { IDbTypeOptions } from "../../connection/Connection";

interface Props {
  label: string;
  name: string;
  value: number;
  options: IDbTypeOptions[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CommonCombo: React.FC<Props> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <CommonInputContainer>
      <Label>{label}</Label>

      <Select value={value} name={name} onChange={(e) => onChange(e)}>
        {options.map((item) => (
          <Option key={`combo-${name}-${item.label}`} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </CommonInputContainer>
  );
};

export default CommonCombo;

const CommonInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #202020;
  text-align: left;
  padding-bottom: 4px;
`;

const Select = styled.select`
  margin: 0;
  width: 100%;
  padding-left: 4px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  background-color: #f6f6f6;
  box-sizing: border-box;
`;

const Option = styled.option``;
