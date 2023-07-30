import styled from 'styled-components';
import { forwardRef, useEffect } from 'react';

const ScoreInputContainer = forwardRef(({ toggleChartOn }, ref) => {
  const scoreTable = ref.current;
  if (!scoreTable) return null;

  const names = Object.keys(scoreTable);

  const handleInputChange = e => {
    const input = e.target.value;
    if (input === '') {
      scoreTable[e.target.name] = 0;
    }
    const regexp = new RegExp(/^[0-9]+$/);
    if (regexp.test(input)) {
      scoreTable[e.target.name] = +input;
    }
  };

  useEffect(() => {
    for (let name in scoreTable) {
      scoreTable[name] = 0;
    }
  }, []);

  return (
    <>
      <Wrapper>
        <Column>
          <ColumnTitle>Student</ColumnTitle>
          {names.map(name => (
            <Name key={name} htmlFor={name}>
              {name}
            </Name>
          ))}
        </Column>
        <Column>
          <ColumnTitle>Score</ColumnTitle>
          {names.map(name => (
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
        <Button onClick={toggleChartOn}>Make Chart</Button>
      </Wrapper>
    </>
  );
});

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

export default ScoreInputContainer;
