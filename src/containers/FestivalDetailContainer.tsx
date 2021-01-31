import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import Loader from '../pages/Loader';
import ErrorMessage from '../pages/ErrorMessage';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  getFestivalDetailAsync,
  postVisitedFestivalAsync,
  postUnvisitedFestivalAsync,
  postLikeFestivalAsync,
  postDislikeFestivalAsync,
} from '../modules/festival';

const FestivalDetailContainer = (): JSX.Element => {
  const params = useParams<{ _id: string }>();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [isModal, setIsModal] = useState(false);
  const [nowVideo, setNowVideo] = useState('');

  const { data, loading, error, isLogin } = useSelector((state: RootState) => ({
    data: state.festival.festivalDetail.data,
    loading: state.festival.festivalDetail.loading,
    error: state.festival.festivalDetail.error,
    isLogin: state.sign.isLogin,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('🍗🍗🍗🍗 Festival Detail useEffect 🍗🍗🍗🍗');
    dispatch(getFestivalDetailAsync.request(params._id));
  }, []);

  const handleModal = (video: string) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setNowVideo(video);
    setIsModal(!isModal);
  };

  const handleVisitButton = () => {
    if (!isLogin) {
      console.log('login이 필요한 기능입니다.');
    } else if (data && data.visited) {
      dispatch(postUnvisitedFestivalAsync.request(params._id));
    } else {
      dispatch(postVisitedFestivalAsync.request(params._id));
    }
  };

  const handleLikeButton = () => {
    if (!isLogin) {
      console.log('login이 필요한 기능입니다.');
    } else if (data && data.isLiked) {
      dispatch(postDislikeFestivalAsync.request(params._id));
    } else {
      dispatch(postLikeFestivalAsync.request(params._id));
    }
  };

  return (
    <>
      <BackgorundImage />
      {isModal && (
        <PlayerModal onClick={handleModal('')}>
          <ReactPlayer
            id="pl"
            width="80vw"
            height="80vh"
            playing={true}
            controls={true}
            config={{
              youtube: {
                playerVars: { autoplay: 0 },
              },
            }}
            url={`https://youtu.be/${nowVideo}`}
          />
        </PlayerModal>
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {data && (
        <DetailPresenter>
          <PosterSection>
            <PoseterImage src={data.poster} />
          </PosterSection>
          <ContentSection>
            <NameBox>
              <FestivalName>{data.name}</FestivalName>
              <ButtonBox>
                <VisitButton onClick={handleVisitButton}>
                  <VIsitIcon
                    visited={data.visited}
                    className="fas fa-thumbtack"
                  ></VIsitIcon>
                </VisitButton>
                <WishButton onClick={handleLikeButton}>
                  <WishIcon
                    isLiked={data.isLiked}
                    className="fas fa-heart"
                  ></WishIcon>
                </WishButton>
              </ButtonBox>
            </NameBox>
            <FestivalCountry>Country : {data.country.name}</FestivalCountry>
            <FestivalGenre>Genre : {data.genre.name}</FestivalGenre>
            <FestivalDate>
              Date : {data.startDate} ~ {data.endDate}
            </FestivalDate>
            <FestivalDescription>
              Description
              <DescriptionText>{data.description}</DescriptionText>
            </FestivalDescription>
            <FetivalHomepage>
              <a href={data.homepage} target="_blank" rel="noreferrer">
                Website Link : <i className="fas fa-link" />
              </a>
            </FetivalHomepage>
            <VideoBox>
              <VideoTitle> Video </VideoTitle>
              <StyledSlider {...settings}>
                {data.video.map((item, index) => {
                  return (
                    <VideoLink key={index}>
                      <VideoContent
                        onClick={handleModal(data.video[index])}
                        className="videoContent"
                      >
                        <PlayIcon className="far fa-2x fa-play-circle" />
                      </VideoContent>
                      <VideoImage
                        src={`https://img.youtube.com/vi/${data.video[index]}/hqdefault.jpg`}
                      />
                    </VideoLink>
                  );
                })}
              </StyledSlider>
            </VideoBox>
            <ArtistBox>
              <ArtistTitle> Artist </ArtistTitle>
              <StyledSlider {...settings}>
                {data.artists.map((item) => {
                  return (
                    <ArtistLink
                      key={item._id}
                      to={`/artist/detail/${item._id}`}
                    >
                      <ArtistContent className="artistContent">
                        <ArtistName>{item.name}</ArtistName>
                      </ArtistContent>
                      <ArtistImage src={item.image} />
                    </ArtistLink>
                  );
                })}
              </StyledSlider>
            </ArtistBox>
            <CommunityBox>
              <CommunityTitle> Companion </CommunityTitle>
              {data.companions.map((item) => (
                <CommunityContent
                  to={`/community/copanions`}
                  key={`C${item._id}`}
                >
                  <CommunityPost>Title : {item.title}</CommunityPost>
                  <CommunityWriter> ({item.user.nickname})</CommunityWriter>
                </CommunityContent>
              ))}
            </CommunityBox>
            <CommunityBox>
              <CommunityTitle> Resell </CommunityTitle>
              {data.resells.map((item) => (
                <CommunityContent to={`/community/resell`} key={`R${item._id}`}>
                  <CommunityPost>Title : {item.title}</CommunityPost>
                  <CommunityWriter> ({item.user.nickname})</CommunityWriter>
                </CommunityContent>
              ))}
            </CommunityBox>
            <CommunityBox>
              <CommunityTitle> Review </CommunityTitle>
              <ReviewSection>
                {data.reviews.map((item) => (
                  <ReviewContent to={`/community/review`} key={`V${item._id}`}>
                    <ReviewImage src={item.image} />
                  </ReviewContent>
                ))}
              </ReviewSection>
            </CommunityBox>
          </ContentSection>
        </DetailPresenter>
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
    url('/images/wall.jpg');
  background-size: 3px 3px, contain;
  z-index: -1;
`;

const DetailPresenter = styled.div`
  display: flex;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 5%;
`;

const DescriptionText = styled.div`
  margin-top: 10px;
  line-height: 150%;
`;

const PosterSection = styled.div`
  width: 50%;
`;
const PoseterImage = styled.img`
  width: 100%;
`;

const ContentSection = styled.div`
  width: 50%;
  margin-left: 5%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const NameBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const FestivalName = styled.div`
  align-self: center;
  padding-left: 10px;
  font-size: 2rem;
  font-weight: 500;
`;

const VisitButton = styled.div`
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
  margin-right: 10px;
  &:hover {
    background: rgba(170, 170, 170, 0.2);
  }
  cursor: pointer;
`;

const VIsitIcon = styled.i<{ visited: boolean }>`
  align-self: center;
  color: ${(props) =>
    props.visited ? 'rgba(0,255,255,1)' : 'rgba(200, 200, 200, 1)'};
`;

const WishButton = styled.div`
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
  &:hover {
    background: rgba(170, 170, 170, 0.2);
  }
  cursor: pointer;
`;

const WishIcon = styled.i<{ isLiked: boolean }>`
  align-self: center;
  color: ${(props) =>
    props.isLiked ? 'rgba(255,0,0,1)' : 'rgba(200, 200, 200, 1)'};
`;

const FestivalCountry = styled.div`
  margin-top: 10px;
  padding: 5px;
  padding-left: 10px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const FestivalGenre = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const FestivalDate = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const FestivalDescription = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const FetivalHomepage = styled.div`
  display: flex;
  margin-top: 5px;
  padding: 10px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
  .fa-link {
    color: rgba(170, 170, 170, 0.8);
    &:hover {
      color: white;
    }
  }
`;

const PlayerModal = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
`;

const VideoBox = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const VideoTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const VideoLink = styled.span`
  position: relative;
  width: 100%;
  height: 150px;
  cursor: pointer;
  &:hover {
    .fa-play-circle {
      color: white;
    }
  }
`;

const VideoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayIcon = styled.i`
  color: rgba(170, 170, 170, 1);
`;

const VideoContent = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ArtistBox = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const ArtistTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ArtistLink = styled(Link)`
  position: relative;
  width: 100%;
  height: 150px;
  &:hover {
    .artistContent {
      background: rgba(170, 170, 170, 0.8);
    }
  }
`;

const ArtistContent = styled.div`
  position: absolute;
  top: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ArtistName = styled.div``;

const ArtistImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    margin-left: 15px;
    margin-right: 15px;
  }

  .slick-slide div {
    padding: 0 10px;
  }

  .slick-prev {
    left: 0px !important;
    z-index: 1;
    opacity: 0.8;
  }

  .slick-next {
    right: 0px !important;
    z-index: 1;
    opacity: 0.8;
  }
`;

const CommunityBox = styled.div`
  width: 100%;
  padding: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const CommunityTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CommunityContent = styled(Link)`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.4);
  &:hover {
    border-bottom: 1px solid rgba(170, 170, 170, 1);
  }
`;

const CommunityPost = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
`;

const CommunityWriter = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  color: rgba(170, 170, 170);
`;

const ReviewSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const ReviewContent = styled(Link)``;

const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  padding: 10px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export default FestivalDetailContainer;
