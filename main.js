img="";
status="";
objects=[] ;
 function preload()
 {
     song=loadSound("alarm_r.mp3");
 }


function setup()
{
canvas=createCanvas(300,300);
canvas.center();
video=createCapture(VIDEO);
video.hide();

objectDetector=ml5.objectDetector('cocossd' ,modelLoaded);
document.getElementById("status").innerHTML="status:Object is Detecting";

}

function modelLoaded()
{
   console.log("moddel is initlized");
   status=true;
   
}

function gotResult(error,results)
{
if (error) {
    console.log("error");
}
console.log(results); 
objects=results;
}



function draw()
{
image(video,0,0,300,300);
if (status!="") {

     r=random(255);
     g=random(255);
     b=random(255);
     

    objectDetector.detect(video,gotResult);
    for (i = 0; i < objects.length; i++)
    {
    document.getElementById("status").innerHTML="status:Object Detected";
    percent=floor(objects[i].confidence*100);
     fill(r,g,b);
     text(objects[i].label+" "+percent+"%",objects[i].x-10,objects[i].y-10);
     noFill();
     stroke(r,g,b);
     rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

     document.getElementById("no_object").innerHTML="Number of objects detected are : "+ objects.length;
     if (objects[i].label == "person") {
        document.getElementById("no_object").innerHTML = "Baby Found";
        console.log(objects[i].label);
        song.stop();
    } else {
        document.getElementById("no_object").innerHTML = "Baby Not Found";
        console.log(objects[i].label);
        song.play();
    }


    }
    if (objects.length == 0) {
        document.getElementById("no_object").innerHTML = "Baby Not Found";
        console.log("play");
        song.play();
    }




}
}