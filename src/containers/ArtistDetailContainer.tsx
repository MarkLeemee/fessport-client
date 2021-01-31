import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import Loader from '../pages/Loader';
import ErrorMessage from '../pages/ErrorMessage';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  getArtistDetailAsync,
  postLikeArtistAsync,
  postDislikeArtistAsync,
} from '../modules/artist';

const ArtistDetailContainer = (): JSX.Element => {
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

  const { data, loading, error } = useSelector(
    (state: RootState) => state.artist.artistDetail,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('🍗🍗🍗🍗 Artist Detail useEffect 🍗🍗🍗🍗');
    dispatch(getArtistDetailAsync.request(params._id));
  }, []);

  const handleModal = (video: string) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setNowVideo(video);
    setIsModal(!isModal);
  };

  const handleLikeButton = () => {
    if (data && data.isLiked) {
      dispatch(postDislikeArtistAsync.request(params._id));
    } else if (data && !data.isLiked) {
      dispatch(postLikeArtistAsync.request(params._id));
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
            <PoseterImage src={data.image} />
          </PosterSection>
          <ContentSection>
            <NameBox>
              <ArtistName>{data.name}</ArtistName>
              <ButtonBox>
                <WishButton onClick={handleLikeButton}>
                  <WishIcon
                    isLiked={data.isLiked}
                    className="fas fa-heart"
                  ></WishIcon>
                </WishButton>
              </ButtonBox>
            </NameBox>
            <ArtistGenre>Genre : {data.genre.name}</ArtistGenre>
            <ArtistDescription>
              Description
              <DescriptionText>{data.description}</DescriptionText>
            </ArtistDescription>
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
            <FestivalBox>
              <FestivalTitle> Festival </FestivalTitle>
              <StyledSlider {...settings}>
                {data.festivals.map((item) => {
                  return (
                    <FestivalLink
                      key={item._id}
                      to={`/festival/detail/${item._id}`}
                    >
                      <FestivalContent className="FestivalContent">
                        <FestivalName>{item.name}</FestivalName>
                      </FestivalContent>
                      <FestivalImage src={item.poster} />
                    </FestivalLink>
                  );
                })}
              </StyledSlider>
            </FestivalBox>
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
    url('/images/wall3.jpg');
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

const ArtistName = styled.div`
  align-self: center;
  padding-left: 10px;
  font-size: 2rem;
  font-weight: 500;
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

const ArtistGenre = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const ArtistDescription = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const PlayerModal = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
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

const FestivalBox = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const FestivalTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const FestivalLink = styled(Link)`
  position: relative;
  width: 100%;
  height: 150px;
  &:hover {
    .FestivalContent {
      background: rgba(170, 170, 170, 0.8);
    }
  }
`;

const FestivalContent = styled.div`
  position: absolute;
  top: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const FestivalName = styled.div``;

const FestivalImage = styled.img`
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

export default ArtistDetailContainer;
