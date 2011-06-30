function Player(engine, id) {
	Entity.call(this, engine);
	this.id = id;
	this.x = engine.grid.margin;
	this.y = engine.grid.margin;
	this.direction = 2; // 1,2,3,4 = up,right,down,left
	this.requestedDir = 2;
	this.radius = 10;
	this.speed = 100;
	this.r = Math.floor(Math.random()*256);
	this.g = Math.floor(Math.random()*256);
	this.b = Math.floor(Math.random()*256);
	this.score = 0; // TODO
}
Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	var d = this.engine.clockTick * this.speed;
	var gridPos = game.grid.coordsToGrid(this.x, this.y);
	
	// TODO simplify and unduplicate this?
	if(this.direction == 1) {
		var newY = this.y - d;
		var newGridY = game.grid.coordsToGrid(this.x, newY).y;
		if(newGridY < gridPos.y) {
			this.y = gridPos.y * game.grid.dotSpacing + game.grid.margin - 0.01;
			this.direction = this.requestedDir;
		} else {
			this.y = newY;
		}
		this.y = Math.max(this.y, game.grid.margin);
	} else if(this.direction == 2) {
		var newX = this.x + d;
		var newGridX = game.grid.coordsToGrid(newX, this.y).x;
		if(newGridX > gridPos.x) {
			this.x = newGridX * game.grid.dotSpacing + game.grid.margin;
			this.direction = this.requestedDir;
		} else {
			this.x = newX;
		}
		this.x = Math.min(this.x, game.grid.margin + game.grid.dotSpacing * (game.grid.dotsX - 1) - 0.01);
	} else if(this.direction == 3) {
		var newY = this.y + d;
		var newGridY = game.grid.coordsToGrid(this.x, newY).y;
		if(newGridY > gridPos.y) {
			this.y = newGridY * game.grid.dotSpacing + game.grid.margin;
			this.direction = this.requestedDir;
		} else {
			this.y = newY;
		}
		this.y = Math.min(this.y, game.grid.margin + game.grid.dotSpacing * (game.grid.dotsY - 1) - 0.01);
	} else if(this.direction == 4) {
		var newX = this.x - d;
		var newGridX = game.grid.coordsToGrid(newX, this.y).x;
		if(newGridX < gridPos.x) {
			this.x = gridPos.x * game.grid.dotSpacing + game.grid.margin - 0.01;
			this.direction = this.requestedDir;
		} else {
			this.x = newX;
		}
		this.x = Math.max(this.x, game.grid.margin);
	}
	
	Entity.prototype.update.call(this);
};

Player.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.fillStyle = 'rgb('+this.r+','+this.g+','+this.b+')';
	ctx.arc(this.x, this.y, this.radius, 1, Math.PI*2-1, false);
	ctx.fill();
	Entity.prototype.draw.call(this, ctx);
};
