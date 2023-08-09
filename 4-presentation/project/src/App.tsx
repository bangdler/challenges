import styled from 'styled-components';
import BigImg from '@/components/BigImg';
import { FlexColumnCenter, FlexRowCenter } from '@/styles/common';
import { useState } from 'react';
import Slider, { ButtonType } from '@/components/Slider';
import ImgAddBtn from '@/components/ImgAddBtn';
import COLORS from '@/constants/colors';
import SmallImg from '@/components/SmallImg';
import {
  DISPLAY_NUMBER,
  SLIDE_IMG_GAP,
  SLIDE_IMG_SIZE,
} from '@/constants/slide';

export interface IImgData {
  id: number;
  src: string;
  title: string;
}

function App() {
  const [selectedImgIdx, setSelectedImgIdx] = useState<null | number>(null);
  const [imgDataList, setImgDataList] = useState<IImgData[]>([]);

  const viewportWidth = DISPLAY_NUMBER * (SLIDE_IMG_SIZE + SLIDE_IMG_GAP);
  const slideDistance = SLIDE_IMG_SIZE + SLIDE_IMG_GAP;

  const handleClickSmallImg = (idx: number) => () => {
    setSelectedImgIdx(idx);
  };

  const handleClickRemoveBtn = () => {
    setSelectedImgIdx(prev => {
      if (prev === 0 && imgDataList.length === 1) {
        return null;
      }
      if (prev === imgDataList.length - 1) {
        return prev - 1;
      }
      return prev;
    });
    const newImgDataList = [...imgDataList].filter(
      (_, idx) => idx !== selectedImgIdx,
    );
    setImgDataList(newImgDataList);
  };

  return (
    <Layout>
      <Nav>
        <ImgAddBtn setImgDataList={setImgDataList} />
        {selectedImgIdx !== null && (
          <ImgRemoveBtn onClick={handleClickRemoveBtn}>
            선택 사진 삭제
          </ImgRemoveBtn>
        )}
      </Nav>
      {selectedImgIdx === null ? (
        <NoImg>선택된 사진이 없습니다.</NoImg>
      ) : (
        <BigImg
          title={imgDataList[selectedImgIdx].title}
          src={imgDataList[selectedImgIdx].src}
        />
      )}
      <Slider
        numOfTotalSlide={imgDataList.length}
        numOfDisplayedSlide={DISPLAY_NUMBER}
        viewportWidth={viewportWidth}
        slideDistance={slideDistance}
      >
        <Box>
          <Slider.Button type={ButtonType.LEFT} />
          <Slider.SlidingBox>
            <Wrapper>
              {imgDataList.map(({ id, src, title }, idx) => (
                <SmallImg
                  key={id}
                  src={src}
                  title={title}
                  selected={selectedImgIdx === idx}
                  onClick={handleClickSmallImg(idx)}
                />
              ))}
            </Wrapper>
          </Slider.SlidingBox>
          <Slider.Button type={ButtonType.RIGHT} />
        </Box>
      </Slider>
      <Pagination>
        {selectedImgIdx !== null && `${selectedImgIdx + 1} /  `}
        {imgDataList.length}
      </Pagination>
    </Layout>
  );
}

const Layout = styled.main`
  ${FlexColumnCenter};
  gap: 30px;
  min-width: 1200px;
  min-height: 600px;
  padding: 50px 150px;
  border-radius: 20px;
  background-color: ${COLORS.mint};
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  width: 100%;
`;

const ImgRemoveBtn = styled.button`
  ${FlexRowCenter};
  width: 120px;
  height: 60px;
  background-color: ${COLORS.red};
  color: ${COLORS.white};
  font-size: 1.6rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.darkGray};
  }
`;

const NoImg = styled.p`
  ${FlexRowCenter};
  width: 500px;
  height: 500px;
  border: 1px solid ${COLORS.blue};
  border-radius: 5px;
  font-size: 2.6rem;
  box-shadow: 2px 2px 10px 2px ${COLORS.black};
  background-color: ${COLORS.white};
`;

const Box = styled.div`
  ${FlexRowCenter};
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: ${SLIDE_IMG_GAP}px;
  flex-shrink: 0;
  min-height: ${SLIDE_IMG_SIZE + SLIDE_IMG_GAP}px;
  padding: calc(${SLIDE_IMG_GAP / 2}px);
`;

const Pagination = styled.p`
  font-size: 1.8rem;
  color: ${COLORS.white};
`;

export default App;
