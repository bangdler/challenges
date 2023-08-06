# Challenge 3 - star-rating


### 구현 사항
- [x] 별을 hover 하면 마우스 위치에 따라 색이 칠해진다.
  - [x] 현재 별보다 이전 위치에 있는 별은 모두 칠해진다.
  - [x] 현재 별은 마우스 위치의 비율에 맞게 칠해진다.
- [x] 마우스를 클릭하면 점수가 고정되고 hover 에도 점수가 변하지 않는다.
- [x] 마우스를 다시 클릭하면 hover 시 점수가 변한다.
- [x] 점수에 따라 문구가 바뀐다.

### 구현 시간
- 대략 4~5시간 걸린 것 같다.


### 구현 관련
- 오랜만에 바닐라를 해서 그런지 헤맨 부분이 많았다.
- 처음에 모든 이벤트핸들러 콜백에 bind 를 썼었는데, 화살표 함수라서 필요가 없어서 수정했다.
- SPA 형식으로 구성, 모든 dom 요소는 app.js 에서부터 그려진다.
- 리액트스럽게 구현해서 컴포넌트는 생성자 함수로 render, setState 등의 메소드를 가진다.
- 상태는 점수 number 와 수정 여부를 나타내는 boolean 으로 구성
  ```typescript
  this.state = {
    rate: 0,
    edit: true,
  };
  ``` 
- setState 실행 시 update 메소드로 변경이 필요한 dom 을 변경해준다.
  - 새로운 요소를 그리는 경우, `replaceChild` 메소드를 사용했다가 부모요소가 필요없는 `replaceWith` 로 변경.
  - star 요소에 mousemove 이벤트를 등록하고 이벤트 발생 시 setState 로 렌더링 업데이트를 했는데, mouseenter 이벤트가 같이 걸려있는 경우에 mouseenter 가 mousemove 를 할 때마다 발생하는 문제가 있었다.
  - 아무래도 새로운 dom 을 그릴 때 mouseenter 가 새롭게 달리는데 이 때 마우스가 요소 내부에 있기 때문에 발생하는 것으로 추정된다.
  - 일단 mouseenter 이벤트가 불필요해서 삭제했다.
- clip-path 를 사용해서 별모양을 만들었다.
- 별모양 요소에 border 를 주기 위해 별을 2개로 만들어서 겹쳤다.
- star 컴포넌트는 최소값과 최대값을 인자로 받고, 현재 상태(점수)와 비교하여 색칠 영역을 결정한다.
- hover 되는 위치에 따라 동적으로 색칠된 영역을 바꾸도록 구현했다.
  - `mousemove` 이벤트와 `background:gradient` 를 활용했다.
  - `mousemove` 시 위치에 따라 점수를 변경하여 색칠 영역을 변경한다.
  ```ts
    this.handleMousemove = (e) => {
      if (!state.edit) {
        return;
      }
      if (e.target.closest(".starWrapper")) {
        const percent = Math.floor((e.offsetX / $starWrapper.clientWidth) * 100);
        $star.style.background = `linear-gradient(to right, lime ${percent}%, white ${percent}%)`;
        const rate = min + percent / 100;
        const newState = {
          ...state,
          rate,
        };
        setState(newState);
      }
    };
  ```
- mousemove 이벤트가 star 컴포넌트에 달리면 매번 dom 변경 시마다 새로운 이벤트를 생성해서 달아주기 때문에, 상위에서 위임하는 형식으로 변경했다.
  - 16ms throttling 적용하여 발생횟수를 감소시켰다. (requestAnimationFrame 을 사용해보려고 했으나 실패...)

### 데모
<img src="https://github.com/FEChallenge/challenges/assets/90082464/4c7075dd-e1c7-4783-9cb9-1c07fb6d8fec" width="400" alt="데모"/>