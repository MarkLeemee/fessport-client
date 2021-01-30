import React, { useEffect } from 'react';
import UserInfo from '../components/UserInfo';
import Collector from '../components/Collector';
import Badge from '../components/Badge';
import styled from 'styled-components';
import Loader from '../pages/Loader';
import ErrorMessage from '../pages/ErrorMessage';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getUserInfoAsync } from '../modules/userInfo';

const FessportContainer = (): JSX.Element => {
  const userInfoRef: React.RefObject<HTMLDivElement> = React.createRef();
  const collectorRef: React.RefObject<HTMLDivElement> = React.createRef();
  const badgeRef: React.RefObject<HTMLDivElement> = React.createRef();

  const { patchSucess, data, loading, error } = useSelector(
    (state: RootState) => state.userInfo,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      console.log('🐶🐶🐶🐶 UserInfo useEffect 🐶🐶🐶🐶');
      dispatch(getUserInfoAsync.request());
    }
  }, []);

  useEffect(() => {
    if (patchSucess) {
      dispatch(getUserInfoAsync.request());
      console.log(
        '🐶🐶🐶🐶 정보가 업데이트 되었습니다. UserInfo Update useEffect. 🐶🐶🐶🐶',
      );
    }
  }, [patchSucess]);

  const handleScrollDown = (target: string) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    let targetLocation: HTMLDivElement;
    switch (target) {
      case 'collectorRef':
        targetLocation = collectorRef.current as HTMLDivElement;
        break;
      case 'badgeRef':
        targetLocation = badgeRef.current as HTMLDivElement;
        break;
      default:
        targetLocation = userInfoRef.current as HTMLDivElement;
    }
    targetLocation.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <>
      <BackgorundImage />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {data && (
        <FessportPresenter>
          <UserInfo
            email={data.email}
            nickName={data.nickName}
            image={data.image}
            handleScrollDown={handleScrollDown}
          />
          <Collector
            visit={data.visit}
            collectorRef={collectorRef}
            handleScrollDown={handleScrollDown}
          />
          <Badge badge={data.badge} badgeRef={badgeRef} />
        </FessportPresenter>
      )}
    </>
  );
};

const BackgorundImage = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  opacity: 0.3;
  background: radial-gradient(black 35%, transparent 1%),
    url('/images/wall2.jpg');
  background-size: 3px 3px, contain;
  z-index: -1;
`;

const FessportPresenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
`;

export default FessportContainer;
