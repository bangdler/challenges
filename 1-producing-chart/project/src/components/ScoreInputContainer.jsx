import styled from 'styled-components';
import { forwardRef, useEffect } from 'react';

const ScoreInputContainer = forwardRef(({ toggleChartOn }, ref) => {
  const scoreTable = ref.current;
  if (!scoreTable) return null;

  const names = Object.keys(scoreTable);

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputScoreTable = Object.fromEntries(formData);

    for (let name in inputScoreTable) {
      const scoreInput = inputScoreTable[name];
      scoreTable[name] = +scoreInput;
    }

    toggleChartOn();
  };

  useEffect(() => {
    for (let name in scoreTable) {
      scoreTable[name] = 0;
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
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
              type={'number'}
              id={name}
              name={name}
              placeholder={'fill in the score'}
            />
          ))}
        </Column>
      </Wrapper>
      <Button type={'submit'}>Make Chart</Button>
    </Form>
  );
});

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  margin: 10px 0;
`;

export default ScoreInputContainer;
