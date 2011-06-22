function Player(engine, id) {
	Entity.call(this, engine);
	this.id = id;
	this.x = engine.grid.margin;
	this.y = engine.grid.margin;
	this.direction = 2;
	this.requestedDir = 2;
	this.radius = 10;
	this.speed = 50;
	this.r = Math.floor(Math.random()*256);
	this.g = Math.floor(Math.random()*256);
	this.b = Math.floor(Math.random()*256);
	this.score = 0; // TODO
}
Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	this.move(this.engine.clockTick * this.speed);
	
	/*
	var gridPos = game.grid.coordsToGrid(this.x, this.y);
	
	var d = this.engine.clockTick * this.speed;
	if(this.direction == 1) {
		var newY = this.y - d;
		var newGridY = game.grid.coordsToGrid(this.x, newY).y;
		if(newGridY < gridPos.y) {
			
		}
		this.y = Math.max(this.y - d, this.engine.grid.margin);
	} else if(this.direction == 2) {
		this.x = Math.min(this.x + d, this.engine.ctx.canvas.width - this.engine.grid.margin - this.engine.grid.dotSpacing);
	} else if(this.direction == 3) {
		this.y = Math.min(this.y + d, this.engine.ctx.canvas.height - this.engine.grid.margin - this.engine.grid.dotSpacing);
	} else if(this.direction == 4) {
		this.x = Math.max(this.x - d, this.engine.grid.margin);
	}
	//console.log(this.x, this.y);
	*/
	Entity.prototype.update.call(this);
};

Player.prototype.move = function(d) {
	// TODO check for min and max positions
	var gridPos = game.grid.coordsToGrid(this.x, this.y);
	
	if(this.direction == 1) {
		var newY = this.y - d;
		var newGridY = game.grid.coordsToGrid(this.x, newY).y;
		if(newGridY < gridPos.y) {
			this.y = gridPos.y * game.grid.dotSpacing + game.grid.margin - 0.01;
			this.direction = this.requestedDir;
		} else {
			this.y = newY;
		}
	} else if(this.direction == 2) {
		var newX = this.x + d;
		var newGridX = game.grid.coordsToGrid(newX, this.y).x;
		if(newGridX > gridPos.x) {
			this.x = newGridX * game.grid.dotSpacing + game.grid.margin;
			this.direction = this.requestedDir;
		} else {
			this.x = newX;
		}
	} else if(this.direction == 3) {
		var newY = this.y + d;
		var newGridY = game.grid.coordsToGrid(this.x, newY).y;
		if(newGridY > gridPos.y) {
			this.y = newGridY * game.grid.dotSpacing + game.grid.margin;
			this.direction = this.requestedDir;
		} else {
			this.y = newY;
		}
	} else if(this.direction == 4) {
		var newX = this.x - d;
		var newGridX = game.grid.coordsToGrid(newX, this.y).x;
		if(newGridX < gridPos.x) {
			this.x = gridPos.x * game.grid.dotSpacing + game.grid.margin - 0.01;
			this.direction = this.requestedDir;
		} else {
			this.x = newX;
		}
	}
};

Player.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.fillStyle = 'rgb('+this.r+','+this.g+','+this.b+')';
	ctx.arc(this.x, this.y, this.radius, 1, Math.PI*2-1, false);
	ctx.fill();
	Entity.prototype.draw.call(this, ctx);
};
