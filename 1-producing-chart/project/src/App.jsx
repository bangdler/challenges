import { useRef } from 'react';
import styled from 'styled-components';

function App() {
  const STUDENTS = ['Alex', 'Tom', 'Ryan', 'Dan', 'Emma'];

  const initScore = STUDENTS.reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
  }, {});
  const scoreRef = useRef(initScore);

  const handleInputChange = e => {
    const input = e.target.value;
    if (input === '') {
      scoreRef.current[e.target.name] = 0;
    }
    const regexp = new RegExp(/^[0-9]+$/);
    if (regexp.test(input)) {
      scoreRef.current[e.target.name] = +input;
    }
  };

  return (
    <Box>
      <Title>Game Score Chart</Title>
      <Wrapper>
        <Column>
          <ColumnTitle>Student</ColumnTitle>
          {STUDENTS.map(name => (
            <Name key={name} htmlFor={name}>
              {name}
            </Name>
          ))}
        </Column>
        <Column>
          <ColumnTitle>Score</ColumnTitle>
          {STUDENTS.map(name => (
            <Input
              key={name}
              type={'text'}
              id={name}
              name={name}
              onChange={handleInputChange}
              placeholder={'fill in the score'}
            />
          ))}
        </Column>
      </Wrapper>
      <Wrapper>
        <Button>Make Chart</Button>
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ColumnTitle = styled.h2``;

const Name = styled.label`
  width: 60px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
`;

const Input = styled.input`
  width: 120px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  line-height: 1.5;
`;

const Button = styled.button`
  width: 130px;
  height: 80px;
`;

export default App;
