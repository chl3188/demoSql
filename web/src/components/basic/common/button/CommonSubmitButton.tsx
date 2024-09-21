import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  onClick: () => void;
}

const CommonSubmitButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <CommonSubmitButtonContainer>
      <Button onClick={onClick}>
        <Text>{label}</Text>
      </Button>
    </CommonSubmitButtonContainer>
  );
};

export default CommonSubmitButton;

const CommonSubmitButtonContainer = styled.div``;

const Button = styled.div`
  width: 60px;
  height: 20px;
  background-color: #212121;
  border-radius: 4px;
`;

const Text = styled.p`
  margin: 0;
  padding-top: 3px;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #ebebeb;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;
