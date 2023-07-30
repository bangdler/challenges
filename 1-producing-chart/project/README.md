# Challenge 1 - producing chart


### 구현 사항
- [x] 점수 입력
- [x] 차트 버튼 클릭 시 UI 변경
- [x] pie chart 생성
- [x] bar chart 생성
- [x] 뒤로가기
- [x] 토글 버튼 클릭 시 pie, bar 변경

### 구현 시간
- 일정 상 띄엄띄엄 진행해서 정확히는 모르겠지만 6시간은 걸린 것 같다.
- canvas 를 찾아보고, useRef 를 prop 으로 넘길 지 고민하고, reset을 어떻게 구현해야하는지 고민하는데 시간을 많이 썼다.

### 구현 관련
- 입력을 받는 ScoreInputContainer 컴포넌트와 차트를 그리는 Chart 컴포넌트로 구성
- 입력을 받을 때 useState 가 아닌 useRef 활용하여 입력 시마다 렌더링이 되지 않도록 함.
  - 다만 이 방식으로 하는 경우 입력값을 초기화하는 reset 버튼을 구현하기가 어려워졌다.
  - 하위 컴포넌트로 useRef 를 넘겨야하여 forwardRef 를 사용했다. 
- 차트를 그릴 때 위치나 크기를 계산해야했는데 이 부분이 까다로웠다.
  - Bar chart 의 경우 fillRect 사용 시 높이를 음수로 넣어줘야 했다.
  - fillText 로 막대 위에 글씨를 넣는 경우 가운데 정렬을 정확하게 하지 못했다.

### 데모
<img src="https://github.com/teamCoSaIn/trilo-fe/assets/90082464/0dc15157-0b0c-4ba6-91f6-51fb67092e3d" width="400" alt="데모"/>
