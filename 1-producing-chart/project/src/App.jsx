import { useRef, useState } from 'react';
import styled from 'styled-components';
import ScoreInputContainer from './components/ScoreInputContainer.jsx';
import Chart from './components/Chart.jsx';

const STUDENTS = ['Alex', 'Tom', 'Ryan', 'Dan', 'Emma'];
const INIT_SCORE_TABLE = STUDENTS.reduce((acc, cur) => {
  acc[cur] = 0;
  return acc;
}, {});

function App() {
  const scoreTableRef = useRef(INIT_SCORE_TABLE);
  const [chartOn, setChartOn] = useState(false);

  const toggleChartOn = () => setChartOn(prev => !prev);

  return (
    <Box>
      <Title>Game Score Chart</Title>
      {chartOn && <Chart ref={scoreTableRef} toggleChartOn={toggleChartOn} />}
      {!chartOn && (
        <ScoreInputContainer
          ref={scoreTableRef}
          toggleChartOn={toggleChartOn}
        />
      )}
    </Box>
  );
}

const Box = styled.main`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1``;

export default App;
