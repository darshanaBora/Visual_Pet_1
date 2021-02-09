var dog,dogImage,happyDogImage;
var database;
var foodS,foodStock;

function preload(){
  happyDogImage = loadImage("happydog.png");
  dogImage = loadImage("dog.png");
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();

  dog = createSprite(255,400,20,20);
  dog.addImage("dog",dogImage);
  dog.scale = 0.15;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog",happyDogImage);
  }
  drawSprites();
  //add styles here
  fill('white');
  stroke('black');
  text("Food Remaining: " +foodS,170,120);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function readStock(data) {
  foodS=data.val();
} 

function writeStock(x) {
  if(x<=0) {
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
