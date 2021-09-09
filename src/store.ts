import { createStore, AnyAction } from 'redux';
import { GAME_TICK, MOVE } from './actions';

export enum MovementDirection {
    None,
    Up,
    Down
}

export enum Player {
    Human,
    Ai
}

export interface State {
    human: {
        movement: MovementDirection,
        position: { x: number, y: number },
        score: number
    },
    ai: {
        movement: MovementDirection,
        position: { x: number, y: number },
        score: number
    },
    ball: {
        velocity: { x: number, y: number },
        position: {x: number, y: number}
    }
}

const initialState: State = {
    human: {
        movement: MovementDirection.None,
        position: {x:280, y:120},
        score: 0
    },
    ai: {
        movement: MovementDirection.None,
        position: {x:0, y:120},
        score: 0
    },
    ball: {
        velocity: {x:0, y:0},
        position: {x:0, y:0}
    }
}

const getVelocityFromMovement = (direction: MovementDirection) => {
    switch (direction) {
        case (MovementDirection.Up):
            return -5;
        case (MovementDirection.Down):
            return 5;
        default:
            return 0;
    }
}

const reducer = (state=initialState, action: AnyAction) => {
    switch (action.type) {
        case MOVE: {
            const { player, direction } = action.payload;
            let newState = { ...state };
            if (player === Player.Human) {
                newState.human = {
                    ...state.human,
                    movement: direction,
                }
            } else {
                newState.ai = {
                    ...state.ai,
                    movement: direction,
                }
            }
            return newState;
        }
        case GAME_TICK: {
            let newState = { ...state };
            const humanSpeed = getVelocityFromMovement(newState.human.movement);
            newState.human.position.y += humanSpeed;

            const aiSpeed = getVelocityFromMovement(newState.ai.movement);
            newState.ai.position.y += aiSpeed;

            newState.ball.position = {
                x: newState.ball.position.x + newState.ball.velocity.x,
                y: newState.ball.position.y + newState.ball.velocity.y
            }
            return newState;
        }
        default:
            return state;
    }
}

export const store = createStore(reducer);