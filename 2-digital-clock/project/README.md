# Challenge 2 - digital-clock


### 구현 사항
- [x] Toggle Switch 버튼을 이용해 clock 모드 또는 timer 모드를 선택할 수 있습니다.
- [x] clock 모드의 경우 현재 시간을 보여줍니다.
    - [x] 12 시간제 또는 24 시간제를 선택할 수 있습니다.
    - [x] 12 시간제의 경우 AM, PM이 우측 하단에 표기됩니다.
- [x] timer 모드의 경우 counter 기능을 합니다.
    - [x] timer 모드 진입 시 항상 00:00에서 시작합니다.
    - [x] start 버튼 클릭 시 카운트를 시작합니다.
    - [x] pause 버튼 클릭 시 카운트를 정지합니다.
    - [x] reset 버튼 클릭 시 카운트를 초기화합니다.
- [x] 두 모드 모두 시간과 분 사이 두 개의 점을 1초마다 깜빡이게 해주세요.
- [x] 7segment 디스플레이 UI를 구현합니다.
- [x] Toggle Switch UI를 구현합니다.

### 구현 시간
- 대략 5~6시간 걸린 것 같다.

### 구현 관련
- 7segment 는 이름 그대로 하나의 숫자를 7개의 div 로 구성했고, 각 segment 당 on 이 되어야 하는 숫자를 지정해주었다.
- segment 모양을 이쁘게 만들고 싶었지만 시간상 못했다.
    ```tsx
        // SevenSegment.tsx
        // (...)
        const topSegmentOnList = [0, 2, 3, 5, 6, 7, 8, 9];
        const leftTopSegmentOnList = [0, 4, 5, 6, 8, 9];
        const rightTopSegmentOnList = [0, 1, 2, 3, 4, 7, 8, 9];
        const leftBottomSegmentOnList = [0, 2, 6, 8];
        const rightBottomSegmentOnList = [0, 1, 3, 4, 5, 6, 7, 8, 9];
        const middleSegmentOnList = [2, 3, 4, 5, 6, 8, 9];
        const bottomSegmentOnList = [0, 2, 3, 5, 6, 8, 9];
    ```
- 7segment 4개를 활용하여 시계 컴포넌트를 만들었고, 4개의 숫자를 받아서 각각 7segment 에 숫자를 전달한다.
    ```tsx
        // FourDigitClock.tsx    
        // (...)
        return <Box>
              <SevenSegment num={num1} />
              <SevenSegment num={num2} />
              <Wrapper>
                <Dot />
                <Dot />
              </Wrapper>
              <SevenSegment num={num3} />
              <SevenSegment num={num4} />
            </Box>
    ```
- 시계 구현 시 어려웠던 점은 12, 24시간제를 구분하는 적절한 단어가 떠오르지 않았던 것. 
  - 처음에는 mode 라는 말로 표현했다가 timer 와 clock 을 구분하는 단어가 mode 이기 때문에 결국 meridiem 이라는 말로 바꿔서 사용했다. 
  - meridiem 은 a.m, p.m 뒤에 붙는 m 을 나타내는 말이다. 라틴어로 정오라고 한다.
- useClock 훅으로 시계 관련 로직을 분리했다.
  - setInterval 로 1분마다 **[시, 분]** 상태를 업데이트한다.
  - 조금 지나보면 시간이 안맞기 시작하는데 해결하지 못했다. setInterval 로 인한 오차인 듯 싶다.
  - 4자리로 바꿔야하기 때문에 문자열로 바꾼 값을 반환한다.
  - meridiem 모드일 때의 모드(am, pm 여부)와 시간(문자열)도 반환한다.
- useTimer 훅으로 타이머 관련 로직을 분리했다.
  - 1초마다 **total 초** 상태를 업데이트한다. (최대로 표기되는 값은 59분 59초)
  - total 초에서 분과 초를 구하고 문자열로 바꾼 값을 반환한다.
  - setInterval 과 useRef 로 start, pause, reset 함수를 만들고 반환한다.
- 커스텀 훅 분리 후, useMemo, useCallback 을 사용하여 값과 함수를 계속 생성하지 않도록 했다.
  - App 에서 Timer <-> Clock 모드를 바꾸는 등 상태 변경으로 인해 렌더링이 발생하는 경우, 각 커스텀 훅은 실행되고 매번 값을 생성할 것이다.
  - 때문에 메모이제이션을 해봤는데 제대로 된 건지 확인이 어려워서 유의미한 차이가 있는지 모르겠다...
- Toggle 컴포넌트를 컴파운드 패턴으로 만들어봤다. 
  - Toggle 컴포넌트는 하위에 UI 버튼을 가진다.
  - 최초 mount 시에는 onToggle 을 실행하지 않도록 useRef 를 사용한다.
    - 단 Strict Mode 에서는 올바르게 동작하지 않는다.
  ```tsx
    // App.tsx
    // (...)
    return <Toggle onToggle={() => setIsTimer(prev => !prev)}>
            <Toggle.Switch onTitle={'Timer'} offTitle={'Clock'} />
        </Toggle>
    ```

### 데모
<img src="https://github.com/FEChallenge/challenges/assets/90082464/03a5410f-54e9-40b8-b233-182b55c98007" width="400" alt="데모"/>