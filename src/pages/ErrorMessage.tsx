import React from 'react';
import styled from 'styled-components';

function ErrorMessage() {
  return (
    <MessagePresenter>
      {' '}
      예상치 못한 오류가 발생하였습니다. 다시 시도해주기길 바랍니다.{' '}
    </MessagePresenter>
  );
}

const MessagePresenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default ErrorMessage;
