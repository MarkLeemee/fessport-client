import React from 'react';
import styled from 'styled-components';

function NotLogin() {
  return (
    <MessagePresenter>
      로그인이 필요한 페이지입니다. 상단바 로그인을 해주시길 바랍니다.
    </MessagePresenter>
  );
}

const MessagePresenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default NotLogin;
