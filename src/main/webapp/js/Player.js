function Player(engine, id) {
	Entity.call(this, engine);
	this.id = id;
	this.x = engine.grid.margin;
	this.y = engine.grid.margin;
	this.direction = 2; 
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
	var d = this.engine.clockTick * this.speed;
	if(this.direction == 1) {
		this.y = Math.max(this.y - d, this.engine.grid.margin);
	} else if(this.direction == 2) {
		this.x = Math.min(this.x + d, this.engine.ctx.canvas.width - this.engine.grid.margin - this.engine.grid.dotSpacing);
	} else if(this.direction == 3) {
		this.y = Math.min(this.y + d, this.engine.ctx.canvas.height - this.engine.grid.margin - this.engine.grid.dotSpacing);
	} else if(this.direction == 4) {
		this.x = Math.max(this.x - d, this.engine.grid.margin);
	}
	//console.log(this.x, this.y);
	Entity.prototype.update.call(this);
};

Player.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.fillStyle = 'rgb('+this.r+','+this.g+','+this.b+')';
	ctx.arc(this.x, this.y, this.radius, 1, Math.PI*2-1, false);
	ctx.fill();
	Entity.prototype.draw.call(this, ctx);
};
