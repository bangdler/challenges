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
  src: string;
  title: string;
}

function App() {
  const [selectedImgIdx, setSelectedImgIdx] = useState<null | number>(null);
  const [imgDataList, setImgDataList] = useState<IImgData[]>([]);

  const viewportWidth = DISPLAY_NUMBER * (SLIDE_IMG_SIZE + SLIDE_IMG_GAP);
  const slideDistance = SLIDE_IMG_SIZE + SLIDE_IMG_GAP;

  return (
    <Layout>
      <Nav>
        <ImgAddBtn setImgDataList={setImgDataList} />
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
              {imgDataList.map(({ src, title }, idx) => (
                <SmallImg
                  key={title + idx}
                  src={src}
                  title={title}
                  selected={selectedImgIdx === idx}
                />
              ))}
            </Wrapper>
          </Slider.SlidingBox>
          <Slider.Button type={ButtonType.RIGHT} />
        </Box>
      </Slider>
    </Layout>
  );
}

const Layout = styled.main`
  ${FlexColumnCenter};
  gap: 30px;
  min-width: 1200px;
  min-height: 600px;
  padding: 50px 150px;
  border: 1px solid ${COLORS.darkGray};
`;

const Nav = styled.nav`
  width: 100%;
`;

const NoImg = styled.p`
  ${FlexRowCenter};
  width: 500px;
  height: 500px;
  border: 1px solid ${COLORS.blue};
  border-radius: 5px;
  font-size: 2.6rem;
  box-shadow: 2px 2px 10px 2px ${COLORS.black};
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

export default App;
