function Game() {
	Engine.call(this);
}
Game.prototype = new Engine();
Game.prototype.constructor = Game;

Game.prototype.start = function() {
	this.grid = new Grid(this);
	this.pollServer();
	Engine.prototype.start.call(this);
};

Game.prototype.draw = function() {
	Engine.prototype.draw.call(this);
	this.grid.draw(this.ctx);
};

Game.prototype.update = function() {
	Engine.prototype.update.call(this);
	this.grid.update();
};

Game.prototype.movePlayer = function(id, dir) {
	var entitiesCount = this.entities.length;
	for (var i = 0; i < entitiesCount; i++) {
		var player = this.entities[i]; 
		if (player.id == id) {
			player.requestedDir = dir;
		}
	}
};

Game.prototype.pollServer = function() {
	var _this = this;
	$.get('poll', function(data) {
		if(data != null) {
			for (var i in data.messages) {
				var msg = data.messages[i];
				if (msg.action == 'createPlayer') {
					_this.addEntity(new Player(_this, msg.id));
				} else if (msg.action == 'move') {
					_this.movePlayer(msg.id, msg.dir);
				}
			}
		}
		setTimeout(function(){ _this.pollServer(); }, 50);
	});
};