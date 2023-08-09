import styled from 'styled-components';
import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { FlexRowCenter } from '@/styles/common';
import COLORS from '@/constants/colors';
import { IImgData } from '@/App';

interface IProps {
  setImgDataList: Dispatch<SetStateAction<IImgData[]>>;
}

const ImgAddBtn: React.FC<IProps> = ({ setImgDataList }) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (!e.target.files || !e.target.files.length) return;

    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      alert('2MB를 초과하는 파일은 업로드 할 수 없습니다.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (!reader.result) return;

      setImgDataList(prev => [
        ...prev,
        {
          id: new Date().getTime(),
          src: reader.result as string,
          title: file.name,
        },
      ]);
    };
  };

  return (
    <Label htmlFor={'imgAddBtn'}>
      사진 추가
      <Input
        id={'imgAddBtn'}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        onChange={handleInputChange}
      />
    </Label>
  );
};

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  ${FlexRowCenter};
  width: 120px;
  height: 60px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 1.6rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.darkGray};
  }
`;

export default ImgAddBtn;
