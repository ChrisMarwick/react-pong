import { createStore, AnyAction } from 'redux';
import { GAME_TICK, MOVE } from './actions';
import { CANVAS_HEIGHT, PADDLE_HEIGHT } from './Pong';

export enum MovementDirection {
    None,
    Up,
    Down
}

export enum Player {
    Human,
    Ai
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface Velocity {
    x: number;
    y: number;
}

export interface PaddleState {
    movement: MovementDirection,
    position: { x: number, y: number },
    score: number
}

export interface State {
    human: PaddleState,
    ai: PaddleState,
    ball: {
        velocity: { x: number, y: number },
        position: {x: number, y: number}
    }
}

const generateRandomVelocity = (): Velocity => {
    const x = Math.ceil(Math.random() * 16) - 8;
    const yDirection = Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    return {
        x,
        y: (8 - Math.abs(x)) * yDirection
    };
}

const isRectCollide = (rectangleX: number, rectangleY: number, rectangleWidth: number, rectangleHeight: number, 
        otherRectangleX: number, otherRectangleY: number, otherRectangleWidth: number, otherRectangleHeight: number): boolean => {
    if (rectangleX + rectangleWidth > otherRectangleX && rectangleX + rectangleWidth < otherRectangleX + otherRectangleWidth) { }
    else if (rectangleX > otherRectangleX && rectangleX < otherRectangleX + otherRectangleWidth) { }
    else {
        return false;
    }
    if (rectangleY + rectangleHeight > otherRectangleY && rectangleY + rectangleHeight < otherRectangleY + otherRectangleHeight) {}
    else if (rectangleY > otherRectangleY && rectangleY < otherRectangleY + otherRectangleHeight) { }
    else {
        return false;
    }
    return true;
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
        velocity: generateRandomVelocity(),
        position: {x:145, y:145}
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

            // Collision detection between ball and paddles
            if (isRectCollide(newState.ball.position.x, newState.ball.position.y, 10, 10, newState.human.position.x, newState.human.position.y, 20, PADDLE_HEIGHT)) {
                newState.ball.velocity.x *= -1;
            }

            if (isRectCollide(newState.ball.position.x, newState.ball.position.y, 10, 10, newState.ai.position.x, newState.ai.position.y, 20, PADDLE_HEIGHT)) {
                newState.ball.velocity.x *= -1;
            }

            // Collision detection between ball and walls
            if (newState.ball.position.y <= 0 || newState.ball.position.y + 10 >= CANVAS_HEIGHT) {
                newState.ball.velocity.y *= -1;
            }

            if (newState.ball.position.x <= 0) {
                // Dispatch action that increases the score, drains the ball and spawns a new ball. But an action from the reducer is an anti-pattern?
            }


            return newState;
        }
            return state;
    }
}

export const store = createStore(reducer);