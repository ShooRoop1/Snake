		var deaths = document.createElement('h2');
		deaths.id = 'deaths';
		deaths.style.color = 'red';
		deaths.style.textAlign = 'center';
		deaths.innerHTML = 'Deaths: ';
		document.body.appendChild(deaths);		
		var fieldSize = prompt('Input the size of field(in px):', fieldSize);;
		var diff = prompt('Choose difficult(1 - easy, 2 - medium, 3 - hard):', diff);
		var fps = 15;
		 	(diff == 1) ? fps = 10 : (diff == 2 ? fps = 20 : fps = 30);
		var S;
		var scl  = 20;
		var Food;
		var Direction = 'RIGHT';
		if (fieldSize % 20 > 0) {fieldSize += fieldSize % 20;}
		function setup() {
			frameRate(fps);
			createCanvas (fieldSize, fieldSize);
			document.getElementById('defaultCanvas0').style.display = 'block';
			document.getElementById('defaultCanvas0').style.margin = '0% auto 0% auto';
			S = new Snake();
			pickLocation();	
		}
		var pickLocation = () => {
			var cols = width  / scl ;
			var rows = height / scl ;
			Food = createVector(getRandomInt(0, cols-1), getRandomInt(0, rows-1));
			Food.mult(scl);
		}
		function draw () {
			background (50);
			S.show();
			S.update();
			S.CreateApple(Food.x, Food.y);			
			S.CheckEat(Food.x, Food.y);
			S.CheckCollision();
		}

		function Snake () {
				var cols = width  / scl ;
			  	var rows = height / scl ;
				this.x = 0;
				this.y = 0;
				this.xSpeed = 1;
				this.ySpeed = 0;
				this.Total = 1;
				this.tail  = [];
				this.Deaths = 0;
				this.update = () => { 
									  

									  this.x = this.x + this.xSpeed * scl;
								      this.y = this.y + this.ySpeed * scl;
								      
								      if (this.x > width - scl) {
								      	  this.x = 0;
								      }
								      if (this.x < 0) {
								      	  this.x = width - scl;
								      }
								      if (this.y > height - scl) {
								      	  this.y = 0
								      }
								      if (this.y < 0) {
								      	  this.y = height - scl;
								      }

				}
				this.show   = () => {
									 
									  	fill(255);
										rect (this.x, this.y, scl, scl);
										for (var i = 0; i < this.tail.length - 1; i++) {
											rect (this.tail[i].x, this.tail[i].y, scl, scl);
										}		
									  
				}

				this.CheckEat = (foodX, foodY) => {
						if (this.x == foodX && this.y == foodY) {
								pickLocation();
								this.Total++;
								for (var i = 0; i < this.tail.length - 1; i++) {
									this.tail[i] = this.tail[i+1];
								}
								this.tail[this.Total - 1] = createVector(this.x, this.y);
						} else {
								for (var i = 0; i < this.tail.length - 1; i++) {
									this.tail[i] = this.tail[i+1];
								}
								this.tail[this.Total - 1] = createVector(this.x, this.y);
						}
				}

				this.changeDirection = (x, y) => {
					this.xSpeed = x;
					this.ySpeed = y;
				}
				this.CreateApple = (col, row) => {
					fill (255, 0, 100);
					rect (col, row, scl, scl);
				}
				this.CheckCollision = () => {
					for (var i = 0; i < this.tail.length - 1; i++) {
						if ((this.x == this.tail[i].x) && (this.y == this.tail[i].y)) {
							this.Total = 1;
							this.tail  = [];
							this.Deaths++;
							var deaths = document.getElementById('deaths');
							deaths.innerHTML = 'Deaths: ' + String(this.Deaths);
						}
					}
				}
		}
		var keyPressed = () => {
			if (keyCode === UP_ARROW) {
				if (Direction != 'DOWN') {
					Direction = 'UP'
				    S.changeDirection(0, -1);
				}
			}
			if (keyCode === DOWN_ARROW) {
				if (Direction != 'UP') {
					Direction = 'DOWN'
					S.changeDirection(0, 1);
				}	
			}
			if (keyCode === LEFT_ARROW) {
				if (Direction != 'RIGHT') {
				    Direction = 'LEFT'
				    S.changeDirection(-1, 0);
				}
			}
			if (keyCode === RIGHT_ARROW) {
				if (Direction != 'LEFT') {
				    Direction = 'RIGHT'
					S.changeDirection(1, 0);
				}
			}
		}
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}