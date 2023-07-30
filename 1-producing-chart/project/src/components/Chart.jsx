import { forwardRef, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ToggleBtn from './ToggleBtn.jsx';

const Chart = forwardRef(({ toggleChartOn }, ref) => {
  const scoreTable = ref.current;
  if (!scoreTable) return null;

  const scores = Object.values(scoreTable);
  const COLORS = [
    '#FF6B45',
    '#FFAB05',
    '#77DD77',
    '#6050DC',
    '#D52DB7',
    '#FF2E7E',
  ];
  const CANVAS_SIZE = 400;
  const PIE_RADIUS = 150;
  const PIE = 'Pie';
  const BAR = 'Bar';

  const [chartType, setChartType] = useState(PIE);
  const canvasRef = useRef(null);

  const handleClickToggleBtn = () => {
    if (chartType === PIE) {
      setChartType(BAR);
      drawBarChart();
    } else {
      setChartType(PIE);
      drawPieChart();
    }
  };

  const drawPieChart = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.reset();
      let beginAngle = Math.PI;
      let endAngle = Math.PI;
      const totalScore = scores.reduce((acc, cur) => acc + cur);

      for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        if (score === 0) {
          continue;
        }
        const angle = (2 * Math.PI * score) / totalScore;
        if (i === scores.length - 1) {
          endAngle = Math.PI;
        } else {
          endAngle = beginAngle + angle;
        }

        ctx.beginPath();
        ctx.moveTo(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.arc(
          CANVAS_SIZE / 2,
          CANVAS_SIZE / 2,
          PIE_RADIUS,
          beginAngle,
          endAngle,
        );
        ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
        ctx.stroke();
        ctx.fill();

        beginAngle = endAngle;
      }
    }
  };

  const drawBarChart = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      ctx.reset();

      const gap = 14;
      const barWidth =
        (CANVAS_SIZE - (scores.length + 2) * gap) / scores.length;
      const heightRatio = (CANVAS_SIZE / Math.max(...scores)) * 0.9;

      ctx.lineWidth = 1;
      for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        if (score === 0) {
          continue;
        }

        const startX = i * (barWidth + gap) + gap;
        const startY = CANVAS_SIZE;
        const barHeight = score * heightRatio;
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.strokeRect(startX, startY, barWidth, -barHeight);
        ctx.fillRect(startX, startY, barWidth, -barHeight);

        ctx.font = '10px serif';
        ctx.fillStyle = 'black';
        ctx.fillText(String(score), startX + 20, CANVAS_SIZE - barHeight - 10);
      }

      ctx.moveTo(0, CANVAS_SIZE);
      ctx.lineWidth = 2;
      ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE);
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawPieChart();
  }, []);

  return (
    <>
      <Wrapper>
        <Button onClick={toggleChartOn}>Back</Button>
        <ToggleBtn
          onTitle={BAR}
          offTitle={PIE}
          onToggle={handleClickToggleBtn}
        />
      </Wrapper>
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>
      <Wrapper>
        {Object.entries(scoreTable).map(([name, score], idx) => {
          return (
            <Wrapper key={name}>
              <Color color={COLORS[idx % COLORS.length]}></Color>
              <Description>
                {name} {score}
              </Description>
            </Wrapper>
          );
        })}
      </Wrapper>
    </>
  );
});

const Button = styled.button`
  width: 130px;
  height: 80px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  ${({ color }) => {
    return css`
      background-color: ${color};
    `;
  }}
`;
const Description = styled.span``;

export default Chart;
