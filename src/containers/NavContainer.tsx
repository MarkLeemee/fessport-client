import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalSign from '../components/ModalSign';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getUserInfoAsync } from '../modules/userInfo';
import { localSignin, signout } from '../modules/sign';

const NavContainer = (): JSX.Element => {
  const [clickedNavIcon, setClickedNavIcon] = useState(false);
  const [isSignModal, setIsSignModal] = useState(false);
  const [topNav, setTopNav] = useState(true);
  const [topButton, setTopButton] = useState(false);
  const { isLogin, userInfo, userInfoError } = useSelector(
    (state: RootState) => ({
      isLogin: state.sign.isLogin,
      userInfo: state.userInfo.data,
      userInfoError: state.userInfo.error,
    }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    const localIsLogin = localStorage.getItem('islogin');
    if (localIsLogin) {
      dispatch(getUserInfoAsync.request());
    }
  }, []);

  useEffect(() => {
    if (userInfoError) {
      localStorage.removeItem('islogin');
    } else if (userInfo) {
      dispatch(localSignin());
    }
  }, [userInfoError, userInfo]);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const offsetTop = window.pageYOffset;
    offsetTop > 10 ? setTopNav(false) : setTopNav(true);
    offsetTop > 100 ? setTopButton(true) : setTopButton(false);
  };

  const handleSignout = () => {
    dispatch(signout());
    localStorage.removeItem('islogin');
  };

  return (
    <>
      {isSignModal && <ModalSign setIsSignModal={setIsSignModal} />}
      <NavPresenter topNav={topNav}>
        <MainPageLink to="/">
          <i className="fas fa-passport"></i> FESSPORT{' '}
        </MainPageLink>
        <SubPage>
          <SubPageLink to="/festival/list">Festival </SubPageLink>
          <SubPageLink to="/artist/list">Artist</SubPageLink>
          <FessportHover>
            Fessport
            <div className="SubFessport">
              <Link to="/fessport">
                <FessportSubPageLink>My Fessport</FessportSubPageLink>
              </Link>
              <Link to="/wishlist">
                <FessportSubPageLink>Wish List</FessportSubPageLink>
              </Link>
            </div>
          </FessportHover>
          {!isLogin ? (
            <SignControll onClick={() => setIsSignModal(true)}>
              Signin
            </SignControll>
          ) : (
            <SignControll onClick={handleSignout}>Logout</SignControll>
          )}
        </SubPage>
        <NavIcon
          onClick={() => {
            setClickedNavIcon(!clickedNavIcon);
          }}
        >
          <i className={clickedNavIcon ? 'fas fa-times' : 'fas fa-bars'} />
        </NavIcon>
      </NavPresenter>
      {/* {clickedNavIcon && 
      <ActiveBar>
        <ActivLink></ActivLink>
        <ActivLink></ActivLink>
        <ActivLink></ActivLink>
        <ActivLink></ActivLink>
        <ActivLink></ActivLink>
        <ActivLink></ActivLink>
      </ActiveBar>
      } */}
      {topButton && (
        <TopButton
          src="/images/up.png"
          topButton={topButton}
          onClick={handleScrollUp}
        />
      )}
    </>
  );
};

const NavIcon = styled.div`
  display: none;
  @media only screen and (max-width: 960px) {
    display: block;
    margin-right: 10%;
  }
`;

const NavPresenter = styled.div<{ topNav: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80px;
  background-color: ${(props) =>
    props.topNav ? 'transparant' : 'rgb(21,21,31)'};
  transition: all 0.3s;
  z-index: 99;
  @media only screen and (max-width: 960px) {
  }
`;

const MainPageLink = styled(Link)`
  margin-left: 10%;
  font-size: 2rem;
  z-index: 99;
`;

const SubPage = styled.div`
  display: flex;
  margin-right: 10%;
  @media only screen and (max-width: 960px) {
    display: none;
  }
`;

const SubPageLink = styled(Link)`
  width: 100%;
  margin-right: 3rem;
  white-space: nowrap;
  font-size: 1rem;
  color: rgba(170, 170, 170);
  &:hover {
    color: white;
  }
  @media only screen and (max-width: 960px) {
  }
`;

const FessportHover = styled.ul`
  position: relative;
  width: 100%;
  margin-right: 3rem;
  white-space: nowrap;
  font-size: 1rem;
  color: rgba(170, 170, 170);
  cursor: default;
  .SubFessport {
    display: none;
  }
  &:hover {
    color: white;
    .SubFessport {
      position: absolute;
      left: -10px;
      display: block;
      width: 200%;
      padding-top: 20px;
      float: none;
    }
  }
  @media only screen and (max-width: 960px) {
  }
`;

const FessportSubPageLink = styled.li`
  width: 100%;
  padding: 10px;
  padding-top: 15px;
  white-space: nowrap;
  font-size: 1rem;
  color: rgba(170, 170, 170);
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
  &:hover {
    color: white;
    background-color: rgba(170, 170, 170, 0.3);
  }
  @media only screen and (max-width: 960px) {
  }
`;

const SignControll = styled.div`
  width: 100%;
  white-space: nowrap;
  font-size: 1rem;
  color: rgba(170, 170, 170);
  cursor: pointer;
  &:hover {
    color: white;
  }
  @media only screen and (max-width: 960px) {
  }
`;

const TopButton = styled.img<{ topButton: boolean }>`
  position: fixed;
  top: 85%;
  left: 90%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.8;
  z-index: 100;
`;

export default NavContainer;
