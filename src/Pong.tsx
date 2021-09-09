import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameTickAction, getMoveAction } from './actions';
import { MovementDirection, Player, State } from './store';


const GAME_TICK_INTERVAL = 50;
const PADDLE_HEIGHT = 60;

const drawRect = (context: CanvasRenderingContext2D, x: number, y: number, sizeX: number, sizeY: number): void => {
  context.fillRect(x, y, sizeX, sizeY);
}

export const Pong: React.FC = () => {
  const dispatch = useDispatch();
  const humanPosition = useSelector<State, { x: number, y: number }>(state => state.human.position);
  const aiPosition = useSelector<State, { x: number, y: number }>(state => state.ai.position);
  const ballPosition = useSelector<State, { x: number, y: number }>(state => state.ball.position);
  // const humanMovement = useSelector<State, MovementDirection>(state => state.human.movement);

  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    setInterval(() => { dispatch(getGameTickAction()) }, GAME_TICK_INTERVAL);
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp') {
        dispatch(getMoveAction(Player.Human, MovementDirection.Up));
      } else if (e.code === 'ArrowDown') {
        dispatch(getMoveAction(Player.Human, MovementDirection.Down));
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowUp') {
        dispatch(getMoveAction(Player.Human, MovementDirection.None));
      } else if (e.code === 'ArrowDown') {
        dispatch(getMoveAction(Player.Human, MovementDirection.None));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (ref.current) {
      const gameCanvas = ref.current;
      const context: CanvasRenderingContext2D | null = gameCanvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        drawRect(context, humanPosition.x, humanPosition.y, 20, PADDLE_HEIGHT);
        drawRect(context, aiPosition.x, aiPosition.y, 20, PADDLE_HEIGHT);
        drawRect(context, ballPosition.x, ballPosition.y, 10, 10);
      }
    }
  }, [humanPosition, aiPosition, ballPosition]);
  return (
    <canvas width={300} height={300} style={{
      borderStyle: "solid",
      borderWidth: 1
    }} ref={ref} />
  );
}

export default Pong;
