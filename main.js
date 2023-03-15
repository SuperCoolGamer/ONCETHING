
song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = "";
scorerightWrist = "";
song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses)
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        console.log(scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0,0,600,600)

   fill("FF000");
   stroke("FF000");
    
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreleftWrist > 0.02){
        circle(leftWristX,leftWristY,20);
        song2.stop();
    }
    
    if(song2_status == false){
        song1.play();
        document.getElementById("SONG").innerHTML = "Song Being Played is Harry Potter Theme song" 
    }

    if(scorerightWrist > 0.02){
        circle(rightWristX,rightWristY,20);
        song1.stop();
    }

    if(song1_status == false){
        song2.play();
        document.getElementById("SONG").innerHTML = "Song Being Played is Peter Pan Theme song"
    }
}


