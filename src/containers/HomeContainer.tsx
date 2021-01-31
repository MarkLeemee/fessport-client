import React, { useEffect } from 'react';
import CountrySection from '../components/CountrySection';
import Loader from '../pages/Loader';
import ErrorMessage from '../pages/ErrorMessage';
import ResizeMessage from '../pages/ResizeMessage';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getMapDataAsync } from '../modules/map';

const HomeContainer = (): JSX.Element => {
  const { data, loading, error } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      console.log('🐸🐸🐸🐸 Map Data useEffect 🐸🐸🐸🐸');
      dispatch(getMapDataAsync.request());
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {data && (
        <>
          <HomePresenter>
            <SubMapImage src={'/images/dots.png'} />
            <MapPresenter>
              <MapImage src={'/images/themapp.jpg'} />
              {data.map((country) => (
                <CountrySection
                  key={country._id}
                  _id={country._id}
                  name={country.name}
                  y={country.y}
                  x={country.x}
                  flagImage={country.flagImage}
                  festivals={country.festivals}
                />
              ))}
            </MapPresenter>
          </HomePresenter>
          <ResizeMessage />
        </>
      )}
    </>
  );
};

const HomePresenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  overflow: hidden;

  @media only screen and (max-width: 960px) {
    display: none;
  }
`;

const SubMapImage = styled.img`
  position: absolute;
  width: 1250px;
  height: 600px;
  z-index: 98;
`;

const MapPresenter = styled.div`
  position: relative;
  width: 1250px;
  height: 595px;
`;

const MapImage = styled.img`
  position: absolute;
  width: 1250px;
  height: 600px;
  object-fit: fill;
`;

export default HomeContainer;
