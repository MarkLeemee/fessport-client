import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MapModalPoster from './MapModalPoster';
import { IMap } from '../api/map';
import styled from 'styled-components';

const CountrySection = ({
  _id,
  name,
  y,
  x,
  flagImage,
  festival,
}: IMap): JSX.Element => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [dy, setDy] = useState<number>(300);
  const [dx, setDx] = useState<number>(150);
  const [my, setMy] = useState<number>(-10);
  const [mx, setMx] = useState<number>(20);
  const history = useHistory();

  useEffect(() => {
    console.log('🏁🏁🏁🏁 CountrySection(x, y setting) useEffect 🏁🏁🏁🏁');
    setDy(y);
    setDx(x);
    if (y >= 300 && x <= 400) {
      setMy(-280);
      setMx(20);
    } else if (y >= 300 && x >= 400) {
      setMy(-280);
      setMx(-580);
    } else if (y <= 300 && x >= 640) {
      setMy(-10);
      setMx(-580);
    }
  }, [y, x]);

  const handleCountryLink = () => {
    history.push(`/festival/list?countryId=${_id}`);
  };

  return (
    <CountryPresenter y={dy} x={dx}>
      <Circle1 ishover={isHover} />
      <Circle2 ishover={isHover} />
      <Circle3 ishover={isHover} />
      <CircleImage src={'/images/ultra.png'} ishover={isHover} />
      <Pin1 src={'/images/ultra-pin.png'} ishover={isHover} />
      <Pin2 ishover={isHover} />
      <div
        onMouseEnter={() => {
          setIsHover(!isHover);
        }}
        onMouseLeave={() => {
          setIsHover(!isHover);
        }}
      >
        <ModalFrame isHover={isHover} my={my} mx={mx}>
          <CountryLink to={`/festival/list?countryId=${_id}`}>
            <FlagImage src={flagImage} />
            {name}
          </CountryLink>
          <PosterPresenter>
            {festival.map((item) => (
              <MapModalPoster
                key={item._id}
                _id={item._id}
                name={item.name}
                thumbnail={item.thumbnail}
              />
            ))}
          </PosterPresenter>
        </ModalFrame>
        <CountryImage
          key={_id}
          src={flagImage}
          alt={name}
          ishover={isHover}
          onClick={handleCountryLink}
        />
      </div>
    </CountryPresenter>
  );
};

const CountryPresenter = styled.div<{ y: number; x: number }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s ease-in-out;
`;

const Circle1 = styled.div<{ ishover: boolean }>`
  position: absolute;
  width: ${(props) => (props.ishover ? 100 : 44)}px;
  height: ${(props) => (props.ishover ? 100 : 44)}px;
  border: 1px solid
    rgba(120, 192, 204, ${(props) => (props.ishover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  animation: changeColor 1s linear infinite;
  @keyframes changeColor {
    0% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.ishover ? 0.6 : 0.4)});
    }
    50% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.ishover ? 0.6 : 0)});
    }
    100% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.ishover ? 0.6 : 0.4)});
    }
  }
`;

const Circle2 = styled.div<{ ishover: boolean }>`
  position: absolute;
  width: ${(props) => (props.ishover ? 90 : 40)}px;
  height: ${(props) => (props.ishover ? 90 : 40)}px;
  border: 1px solid
    rgba(120, 192, 204, ${(props) => (props.ishover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
`;

const Circle3 = styled.div<{ ishover: boolean }>`
  position: absolute;
  width: ${(props) => (props.ishover ? 55 : 24)}px;
  height: ${(props) => (props.ishover ? 55 : 24)}px;
  border: 2px solid
    rgba(120, 192, 204, ${(props) => (props.ishover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
`;

const CircleImage = styled.img<{ ishover: boolean }>`
  position: absolute;
  width: 150px;
  height: 150px;
  opacity: ${(props) => (props.ishover ? 0.8 : 0)};
  transition: all 0.5s ease-in-out;
`;

const Pin1 = styled.img<{ ishover: boolean }>`
  position: absolute;
  top: ${(props) => (props.ishover ? -50 : 0)}px;
  width: 20px;
  height: 20px;
  opacity: ${(props) => (props.ishover ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

const Pin2 = styled.div<{ ishover: boolean }>`
  position: absolute;
  width: 45px;
  height: 45px;
  animation: rotateClockwise 1.5s linear infinite;
  &:before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
  &:before {
    opacity: ${(props) => (props.ishover ? 0.8 : 0)};
    background: white;
    transition: all 0.5s ease-in-out;
  }
  @keyframes rotateClockwise {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ModalFrame = styled.div<{ isHover: boolean; my: number; mx: number }>`
  visibility: ${(props) => (props.isHover ? 'visible' : 'hidden')};
  position: absolute;
  top: ${(props) => props.my}px;
  left: ${(props) => props.mx}px;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 300px;
  border: 20px solid transparent;
  border-radius: 30px;
  background-clip: padding-box;
  background-color: black;
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  transition: all 0.4s ease-in-out;
  z-index: 100;
`;

const CountryLink = styled(Link)`
  display: flex;
  align-items: center;
  margin: 20px 0px 10px 30px;
  color: #fff;
  font-size: 1.5em;
`;

const FlagImage = styled.img`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  object-fit: contain;
`;

const PosterPresenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
`;

const CountryImage = styled.img<{ ishover: boolean }>`
  position: relative;
  width: 30px;
  height: 30px;
  border: 2px solid
    rgba(148, 242, 255, ${(props) => (props.ishover ? 0.8 : 0.4)});
  border-radius: 50px;
  object-fit: contain;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  z-index: 99;
`;

export default CountrySection;
