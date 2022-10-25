let port;
let connectBtn;
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  port = createSerial();


//create connect to arduino button 
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);

    // Create a save button
    button = createButton('Save Artwork :)');
    button.position(1312,20)
    button.mousePressed(saveImage);
  
  

}

function draw() {
 

  // reads in complete lines and prints them at the
  // bottom of the canvas
  let val = port.readUntil("\n");
  if (val.length > 0) { 
    background(0);
    //display the incoming data
    fill(0);
    text(val, 10, height-20);
    
    //do something with the data!
    blendMode(DIFFERENCE)
    noStroke();
    fill(random(0,255),random(0,255),random(0,255));
    ellipse (width/1,height/1,val,val); // bottom right
    ellipse (width/2,height/2,val+200,val+200)
    ellipseMode(CENTER);
    ellipse (width/2,height/2,val,val);  //centre  
    ellipse ((width/50)-30,(height/50)-10,val,val); //top left   
    ellipse ((width/50)-30,(height/50)+700,val,val); //bottom left
    ellipse ((width/1),(height/50)-10,val,val); //top right 
  }
  if (mouseIsPressed) {
    copy(mouseX, mouseY, 30, 30, mouseX - 15, mouseY - 15, 30, 30);
  }

  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

function saveImage(){
  save("myimage.png");
}