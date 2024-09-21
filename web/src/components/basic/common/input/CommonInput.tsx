import React from "react";
import styled from "styled-components";

interface Props {
  type?: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonInput: React.FC<Props> = ({
  type = "text",
  label,
  name,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <CommonInputContainer>
      <Label>{label}</Label>
      <Input type={type} name={name} value={value} onChange={handleChange} />
    </CommonInputContainer>
  );
};

export default CommonInput;

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

const Input = styled.input`
  margin: 0;
  width: 100%;
  padding-left: 4px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  background-color: #f6f6f6;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
