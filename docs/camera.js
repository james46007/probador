// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let Camara;
let poseNet;
let poses = [];
let emoji = [];
let EmojiY;
let EmojiX;
let MiEmoji = [];
let Personas = 0;
let CanvasDibujos;
let width = 640;
let height = 480;

function setup() {
  CanvasDibujos = createCanvas(640, 480);
  emoji[0] = loadImage('./images/lion.png', CargoImagen, ErrorImagen);

  Camara = createCapture(VIDEO);
  Camara.size(width, height);
  Camara.hide();

  poseNet = ml5.poseNet(Camara, {
    imageScaleFactor: 0.3,
    outputStride: 16,
    flipHorizontal: false,
    minConfidence: 0.5,
    maxPoseDetections: 5,
    scoreThreshold: 0.5,
    nmsRadius: 20,
    detectionType: 'single',
    multiplier: 0.75,
   });

  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function draw() {
  image(Camara, 0, 0, width, height);
  // drawKeypoints();
  // drawSkeleton();
  //  image(emoji, 100, 100, 100, 100);
  DibujarEmoji();
}

function ModeloListo() {
  console.log("Modelo Listo");
  select('#status').html('Modelos listo');
}

function CargoImagen() {
  console.log("Cargare Imagen");
}

function ErrorImagen() {
  console.log("error imagen ")

}

function DibujarEmoji() {
  push();
  
  for (let i = 0; i < poses.length; i++) {
    let PoseActual = poses[i].pose;

    // fill(255, 255, 0);
    noStroke();
    imageMode(CENTER);
    let D = dist(PoseActual.rightEar.x, PoseActual.rightEar.y, PoseActual.leftEar.x, PoseActual.leftEar.y);
    image(emoji[0], PoseActual.nose.x, PoseActual.nose.y, D * 1.92, D * 1.92);
  }

  pop();
}

function drawKeypoints() {
  //console.log("Candida de personas" + poses.length);
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.5) {

        fill(255, 255, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 20, 20);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function keyPressed() {
  if (key === 'a') {
    console.log("Tomar foto ");
    saveCanvas(CanvasDibujos, 'Emoji'+random(255), 'jpg');
  }
}