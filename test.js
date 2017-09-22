var nb_r;
var all_diam;
var average_diam;

var r = [];
var pg1;

function setup() {
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1); // Set 1 because it's too slow on firefox
  colorMode(HSB, 360, 100, 100, 100);  //don't know how this works yet
  noStroke();

  nb_r = random(1, 4);
  for (var i = 0; i <= nb_r; i++) {
    r.push(new root());  //creates between 12 and 18 'roots' 
  }  
frameRate(20);
  
  pg1 = createGraphics(width,height);
 // pg2 = createGraphics(width, height); don't need this
  pg1.background('#FFFFFF');
}

function draw() {
  for (var i = 0; i < r.length; i++) {
    r[i].update(); //updates each root
   }

   //pg1.noStroke();
   pg1.noFill();
   for(var j = 0; j < r.length; j++) {
   	//pg1.fill(r[j].c);
    pg1.stroke(r[j].c);  //sets each stroke to a newer color
    pg1.strokeWeight(width/750); //sets thickness
   //	pg1.ellipse(r[j].loc.x, r[j].loc.y, 10, 10);

   	pg1.beginShape();
   	for (var k = 1; k <= 3; k++) {
   		pg1.vertex(r[j].loc.x + sin(r[j].angle+(radians(120)*k)) * r[j].diam, r[j].loc.y + cos(r[j].angle+(radians(120)*k)) * r[j].diam);
   	} //makes a triangle with the vertexes where x = locus + sin(angle)*diam , y = locus + cos(angle)*diam
     
   	pg1.endShape(CLOSE);
   	r[j].angle+=0.1; //changes angles
   }
    image(pg1, 0, 0, width, height);
}

//draw function that just does cool things in the background

 function root() {

  this.loc = createVector((mouseX + mouseX + random(0,width))/3,(mouseY + mouseY + random(0,height))/3); //initializes vector to a random part in the screen
  this.speed = createVector();
  this.speed = p5.Vector.random2D();  //creates vector at random angle
  this.bam = createVector();
  this.diam = width/40;  //sets diameter to 500/20 = 25
  this.angle = random(TAU); // TAU = TWO_PI (btw)  //random angle in the circle
  this.c = color(random(360), 100, 50, 30);

  this.init = function() {
    this.loc.set(width/2, height/2); //initial states
    this.diam = width/40;
    this.angle = random(TAU);
    this.c = color(random(360), 100, 50, 30);
  }

  this.update = function() {
  	this.diam -= random(0.01, 0.05); // decreases diam by rand between .01 and .05 really fast
    this.diam = constrain(this.diam, 0.5, width/20); //constrains diam .5 and 500/20 = 25

    if (this.diam >= .5) {//all the time
      this.bam = p5.Vector.random2D(); // movement will be a bit erractic, also a unit vector
      this.bam.mult(0.85); //no longer a unit vector
      this.speed.add(this.bam);  //adds bam to speed
      this.speed.normalize();  //makes it a unit vector again
      this.speed.mult(3); //now it's bigger
      this.loc = this.loc.add(this.speed); //adds speed to loc
    }
  } // End of update()
} // End of class */
  
function mousePressed() {
   r.push(new root())
}
//IDEAS

//blend the input text with the graphic?
//with each letter start a root
//with every email start a root
//as letters are typed the color changes
//with letters typed the diameter gets bigger, or faster
