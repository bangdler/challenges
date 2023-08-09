# Challenge 4 - presentation


### 구현 사항
- [ ] 첫 화면에서 사진 추가하기 버튼을 클릭하여 사진을 추가할 수 있다.
    - [ ] 사진이 정상적으로 추가되면 presentation 화면으로 넘어간다.
- [x] 파일은 png, jpeg, webp, jpg 파일만 받을 수 있다.
- [x] presentation 화면은 발표 화면(큰 이미지)과 목록 화면(작은 이미지)으로 구성된다.
    - [x] 목록 화면에 있는 사진 중 발표 화면에 있는 사진에 해당하는 사진에 대해 style을 준다.
- [x] 좌우 버튼을 클릭하여 이미지 슬라이더 기능을 할 수 있다.
    - [x] 첫 번째와 마지막 사진에 도달한 경우에는 버튼을 클릭할 수 없다.
- [x] 목록 화면에 있는 작은 사진을 직접 클릭하여 해당 사진으로 이동할 수 있다.
- [x] 화면 하단에는 페이지(사진) 번호를 표기한다.

### 추가 구현 사항
- [ ] 목록 화면 내 사진에 hover 시 삭제 버튼이 뜨고, 삭제 버튼 클릭 시 사진이 삭제된다.
- [ ] 드래그 앤 드롭으로 사진 간 순서 변경을 할 수 있다.
- [x] 상단에 사진 추가 버튼을 클릭하여 사진을 추가할 수 있다.
- [x] 선택된 사진이 있을 때 상단에 삭제 버튼이 나타나고, 삭제 버튼을 클릭하여 사진을 삭제할 수 있다.



### 구현 시간
- 몇몇 요소를 생략하고 구현해서 시간이 적게 걸렸다.
  - 첫 화면을 만들지 않고 바로 메인 페이지에서 사진을 추가하도록 했다.
  - 삭제 버튼이 사진 hover 시 생성되지 않고 선택 시 상단에 나타나도록 간단하게 구현했다.
- 대략 4시간 걸린 것 같다.


### 구현 관련
#### App
- 앱에서는 전체 사진 데이터 리스트와 선택된 데이터의 index 를 상태로 두었다.
    ```tsx
    function App() {
      const [selectedImgIdx, setSelectedImgIdx] = useState<null | number>(null);
      const [imgDataList, setImgDataList] = useState<IImgData[]>([]);
      //...
  }
    ```
- 사진을 추가하면 해당 imgData 를 imgDataList 에 추가한다.
    ```tsx
    interface IImgData {
      id: number;
      src: string;
      title: string;
    }
    ```
- 목록의 사진을 클릭하면 해당 사진의 index 로 selectedImgDataIdx 를 변경한다.
  - id 값으로 선택된 데이터를 관리할까 고민했는데, index 로 관리하는 경우 선택된 데이터 삭제 시 index -1 만 해주면 돼서 더 쉽다.
  - 만약 드래그앤드롭을 구현했다면 이 부분을 더 고민해봐야 될 것 같다.

#### Slider
- 이번 구현은 슬라이드 로직만 가지고 있는 컴포넌트 구현을 중점적으로 진행했다.
- 컴파운드 패턴으로 `Slider` 컴포넌트와 하위 `SlidingBox` 와 `Button` 으로 구성된다.
- SlidingBox 는 실제 슬라이드되는 부분으로, `움직이는 영역(SlidingPart)`와 그걸 감싸는 `보여지는 영역(Viewport)`으로 구성된다.
  - 따라서 보여지는 영역의 width 와 얼마나 움직일 지 translateX 를 정해줘야 한다.
  - 실제 UI 요소는 children 으로 넣어준다.
  ```tsx
  Slider.SlidingBox = ({ children }: ISlidingBoxProps) => {
  // ... 
  return (
      <Viewport width={viewportWidth}>
        <SlidingPart $translateX={translateX} onTransitionEnd={onTransitionEnd}>
          {children}
        </SlidingPart>
      </Viewport>
    );
  }
  ```


- `Button` 은 왼쪽과 오른쪽을 구분하는 `type` 을 props 로 받는다. 
  - type 을 토대로 `모양`과 `클릭 시 수행될 함수(moveRight, moveLeft)`가 정해진다. 
  - 슬라이드의 총 개수와 현재 슬라이드의 위치(왼쪽 idx, 오른쪽 idx)를 토대로 `버튼 활성화 여부`가 결정된다.
  ```tsx 
    Slider.Button = ({ type }: ISliderButtonProps) => {
    const { numOfTotalSlide, curPosition, moveLeft, moveRight } =
       useSliderContext();
    
    const onClick = type === ButtonType.LEFT ? moveLeft : moveRight;
    
    const disabled =
     type === ButtonType.LEFT
     ? curPosition[0] === 0
     : curPosition[1] >= numOfTotalSlide - 1;
    
    return <Button $type={type} disabled={disabled} onClick={onClick}></Button>;
    };
  ```
  
- 따라서 `Slider` 에서는 위에서 필요한 상태와 함수를 만들어 전달한다.
  - props 로 받을 값 정하는 부분이 어려웠다. 
  - 처음에는 min idx, max idx 만 받아서 해보려고 했는데, 생각보다 필요한 값이 많았다.
  - 결과적으로 `총 슬라이드 개수`, `보여줄 슬라이드 개수`,` viewport 의 width`, `한번 슬라이드 시 이동 거리`를 받도록 했다.
  - 사실 viewportWidth 같은 값은 Slider 에서 받을 필요 없이 하위 컴포넌트에서 props 로 받아도 되지만 관련 데이터가 한 곳에 모여있는 게 좋을 것 같아서 이렇게 구현했다.
  - 한 버튼을 연속해서 클릭할 때 에러가 날 수 있어서 onTransitionEnd 함수도 만들어 넘긴다.
  ```tsx
    const Slider = ({
    numOfTotalSlide,
    numOfDisplayedSlide,
    viewportWidth,
    slideDistance,
    children,
    }: ISliderProps) => {
    const [curPosition, setCurPosition] = useState([0, numOfDisplayedSlide - 1]);
    const [translateX, setTranslateX] = useState(0);
    const [isTransitionEnd, setIsTransitionEnd] = useState(true);
    //...
    const value = {
    numOfTotalSlide,
    viewportWidth,
    curPosition,
    translateX,
    moveLeft,
    moveRight,
    onTransitionEnd,
    };
    
    return (
    <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
    );
  }
    ``` 

- 구현을 하고 나니 계산해서 넣어줘야 하는 값도 있고, 복잡하게 느껴져서 재사용성이 좋을 지는 모르겠다...


### 데모
<img src="https://github.com/FEChallenge/challenges/assets/90082464/0e9d54d3-b9dd-401b-aacb-7c3615139c71" width="400" alt="데모"/>