import React from 'react';
import styled from 'styled-components';

function ResizeMessage() {
  return (
    <MessagePresenter>
      본 페이지는 1280x720 또는 1920x1080 화면비율에 최적화 되어있습니다.
    </MessagePresenter>
  );
}

const MessagePresenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  @media only screen and (min-width: 960px) {
    display: none;
  }
`;

export default ResizeMessage;
