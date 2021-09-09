import { MovementDirection, Player } from "./store";

export const MOVE = 'MOVE';
export const GAME_TICK = 'GAME_TICK';
export const LOSE = 'LOSE';
export const WIN = 'WIN';
export const SPAWN_BALL = 'SPAWN_BALL';
export const SET_BALL_VELOCITY = 'SET_BALL_VELOCITY';

export const getMoveAction = (player: Player, direction: MovementDirection) => ({ type: MOVE, payload: { player, direction } });
export const getGameTickAction = () => ({ type: GAME_TICK });