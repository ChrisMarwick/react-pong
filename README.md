Pong

Ball starts at center and is given a random direction and speed

MovementDirection => Up/Down/None
Player => Human/Ai

state = {
	human: {
		movement: None
		position: {x:0, y:0}
		score: 0
	}
	ai: {
		movement: None
		position: {x:0, y:0}
		score: 0
	}
	ball: {
		velocity: {x:0, y:0}
		position: {x:0, y:0}
	}
}

Actions
- MOVE		    (player, direction) => set state.[human|ai].movement to direction
- GAME_TICK		() => <advance movement in ball and players, calculate collision>
- LOSE			() => remove ball, change score, spawn ball
- WIN			() => remove ball, change score, spawn ball
- SPAWN_BALL		
- SET_BALL_VELOCITY

Collisions- tied to game tick
Paddle + ball => change the velocity of the ball
Ball and top/bottom wall => change the velocity of the ball
Ball and left/right wall => lose/win