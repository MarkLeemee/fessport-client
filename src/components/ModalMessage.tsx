import React from 'react';
import styled from 'styled-components';

interface IProps {
  message: string;
  setIsMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalMessage = ({ message, setIsMessage }: IProps): JSX.Element => {
  return (
    <MessagePresenter onClick={() => setIsMessage(false)}>
      <Message>{message}</Message>
    </MessagePresenter>
  );
};

const MessagePresenter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Message = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

export default ModalMessage;
