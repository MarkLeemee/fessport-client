import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  getFestivalCategoryAsync,
  getCountryCategoryAsync,
  getGenreCategoryAsync,
  getArtistCategoryAsync,
} from '../modules/category';
import {
  postFestivalDataAsync,
  patchFestivalDataAsync,
  deleteFestivalDataAsync,
  postArtistDataAsync,
  patchArtistDataAsync,
  deleteArtistDataAsync,
} from '../modules/admin';

const AdminContainer = (): JSX.Element => {
  const {
    countryCategory,
    genreCategory,
    festivalCategory,
    artistCategory,
    data,
    loading,
    error,
  } = useSelector((state: RootState) => ({
    data: state.admin.data,
    countryCategory: state.category.country,
    genreCategory: state.category.genre,
    festivalCategory: state.category.festival,
    artistCategory: state.category.artist,
    loading: state.admin.loading,
    error: state.admin.error,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !countryCategory.data ||
      !genreCategory.data ||
      !festivalCategory.data ||
      !artistCategory.data
    ) {
      console.log('🍗🍗🍗🍗 Category useEffect 🍗🍗🍗🍗');
      dispatch(getFestivalCategoryAsync.request());
      dispatch(getCountryCategoryAsync.request());
      dispatch(getGenreCategoryAsync.request());
      dispatch(getArtistCategoryAsync.request());
    }
  }, []);

  const [festivalUploadData, setFestivalUploadData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    homepage: '',
    poster: '',
    video: '',
    countryId: '',
    genreId: '',
    artists: [],
  });

  const [artistUploadData, setArtistUploadData] = useState({
    name: '',
    description: '',
    image: '',
    video: '',
    genreId: '',
    festivals: [],
  });

  const handleFestivalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postFestivalDataAsync.request(festivalUploadData));
  };

  const handleArtistSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postArtistDataAsync.request(artistUploadData));
  };

  const handleFesitvalInputChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFestivalUploadData((state) => ({ ...state, [name]: value }));
  };

  const handleArtistInputChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setArtistUploadData((state) => ({ ...state, [name]: value }));
  };

  const handleSelectChangee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const options = e.target.options;
    const selectedOptions: any = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    if (name === 'selectArtist') {
      setFestivalUploadData((state) => ({
        ...state,
        artists: selectedOptions,
      }));
    } else {
      setArtistUploadData((state) => ({
        ...state,
        festivals: selectedOptions,
      }));
    }
  };

  return (
    <>
      <h1>관리자 페이지</h1>
      <h2>페스티벌 업로드</h2>
      <FormBox id="postFestival" onSubmit={handleFestivalSubmit}>
        이름:{' '}
        <input
          type="text"
          name="name"
          onChange={handleFesitvalInputChange}
        ></input>
        시작일:{' '}
        <input
          type="text"
          name="startDate"
          onChange={handleFesitvalInputChange}
        ></input>
        마지막일:{' '}
        <input
          type="text"
          name="endDate"
          onChange={handleFesitvalInputChange}
        ></input>
        설명:{' '}
        <input
          type="text"
          name="description"
          onChange={handleFesitvalInputChange}
        ></input>
        홈페이지:{' '}
        <input
          type="text"
          name="homepage"
          onChange={handleFesitvalInputChange}
        ></input>
        포스터:{' '}
        <input
          type="text"
          name="poster"
          onChange={handleFesitvalInputChange}
        ></input>
        비디오:{' '}
        <input
          type="text"
          name="video"
          onChange={handleFesitvalInputChange}
        ></input>
        나라:
        <select name={'countryId'} onChange={handleFesitvalInputChange}>
          {countryCategory.data &&
            countryCategory.data.map((item, index) => (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            ))}
        </select>
        장르:
        <select name={'genreId'} onChange={handleFesitvalInputChange}>
          {genreCategory.data &&
            genreCategory.data.map((item, index) => (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            ))}
        </select>
        아티스트 :{' '}
        <SelectBox
          name={'selectArtist'}
          multiple={true}
          value={festivalUploadData.artists}
          onChange={handleSelectChangee}
        >
          {artistCategory.data &&
            artistCategory.data.map((item, index) => (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            ))}
        </SelectBox>
        <input type="submit" value="업로드" />
      </FormBox>
      <h2> 아티스트 업로드 </h2>
      <FormBox id="postArtist" onSubmit={handleArtistSubmit}>
        이름:{' '}
        <input
          type="text"
          name="name"
          onChange={handleArtistInputChange}
        ></input>
        설명:{' '}
        <input
          type="text"
          name="description"
          onChange={handleArtistInputChange}
        ></input>
        이미지:{' '}
        <input
          type="text"
          name="image"
          onChange={handleArtistInputChange}
        ></input>
        비디오:{' '}
        <input
          type="text"
          name="video"
          onChange={handleArtistInputChange}
        ></input>
        장르:
        <select name={'genreId'} onChange={handleArtistInputChange}>
          {genreCategory.data &&
            genreCategory.data.map((item, index) => (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            ))}
        </select>
        페스티벌:{' '}
        <SelectBox
          multiple={true}
          value={artistUploadData.festivals}
          onChange={handleSelectChangee}
        >
          {festivalCategory.data &&
            festivalCategory.data.map((item, index) => (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            ))}
        </SelectBox>
        <input type="submit" value="업로드" />
      </FormBox>
    </>
  );
};

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 50px;
  & > input {
    margin-bottom: 10px;
  }
`;

const SelectBox = styled.select`
  width: 500px;
  height: 500px;
`;

export default AdminContainer;
