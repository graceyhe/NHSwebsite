
function myFunction() 
{
    var first = document.getElementById("fname").value.toUpperCase();
    var middle = document.getElementById("mname").value.toUpperCase();
    var last = document.getElementById("lname").value.toUpperCase();
    var xmlhttp = new XMLHttpRequest();
    var result = null;
    xmlhttp.open("GET", "nhstest.txt", false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    //search for club member information
    var pos = result.indexOf(first+" "+middle+" "+last); //found person
    var namleng= first.length+middle.length+last.length+3; // length of name
    var hr = result.indexOf("hr",pos); //hours position (+1)
    //console.log("hello?");
    var hours = result.slice(pos+namleng+6,hr); //hours with nhs
    var wNHS = hr+3; //find number of hours with NHS
    var withNHS=0;
    var grade = result.slice(pos+namleng,pos+namleng+2);
    if(pos<8009)
        withNHS = result.slice(wNHS , result.indexOf("/10",hr));
    else
        withNHS = result.slice(wNHS , result.indexOf("/5",hr));
    var findSACs = result.indexOf("sac",pos);
    //console.log("hello?");
    var SACs = result.slice(findSACs-1,findSACs);
    var end = result.indexOf("|",pos); 
    var reason = result.slice(findSACs+4,end);
    //find number of places volunteered at
    /*if(hours.localeCompare("0")!=0)
    {
        
        var places = result.slice(hr+3,end).toString().split(",");
        document.getElementById("displayPlaces").innerHTML="You've volunteered at "+places;
    }
    else
    {
        document.getElementById("displayPlaces").innerHTML="Check out the Volunteer page for potential volunteering opportunities!";
    }*/
    //alert("Number of hours: "+hours);
    //console.log(result.indexOf("New Members"));
    if(pos!=-1 && namleng>3)
    {
        if(first.includes(" "))
        {
            var dispName = first.slice(0,1)+first.slice(1,first.indexOf(" ")).toLowerCase()+" "+first.slice(first.indexOf(" ")+1,first.indexOf(" ")+2)+first.slice(first.indexOf(" ")+2,first.length).toLowerCase();
        }
        else
        var dispName = first.toString().slice(0,1)+first.toString().slice(1,first.length).toLowerCase();
        document.getElementById("displayName").innerHTML="Hello "+dispName+"!";
        var dues = result.slice(pos+namleng+4,pos+namleng+5);
        //paid dues? (Y/N), only consider if not a senior
        if(dues.localeCompare("Y")==0)
        {
            document.getElementById("displayDues").innerHTML="Thank you for paying your dues! :D";
            document.getElementById("displayDues").style.fontWeight="normal";
        }
        else
        {
            if(dues.localeCompare("Y")!=0)
            {
                document.getElementById("displayDues").innerHTML="**It seems you have not paid dues. The due date for paying dues has passed. Please message an officer if you think this is a mistake, and/or contact Mr. Humes if you still want to be considered a member.**";
                document.getElementById("displayDues").style.fontWeight="bold";
            }
        }
        document.getElementById("displayName").style.fontWeight="bold";
        document.getElementById("displayName").style.fontSize="200%";
        document.getElementById("displayName").style.paddingBottom = "1vw";
        document.getElementById("displayName").style.borderBottom = "4px solid #26a89d";
        document.getElementById("displayHours").innerHTML="Regular Hours: "+hours;
        if(pos<8009)
        {
            document.getElementById("displaywithNHS").innerHTML="Hours with NHS: "+withNHS+"/10";
        }
        else
        {
            document.getElementById("displaywithNHS").innerHTML="Hours with NHS: "+withNHS+"/5";
        }
        document.getElementById("displaySACs").innerHTML="SACs: "+SACs;
        var inthrs = parseInt(hours,10);
        var intSACs = parseInt(SACs,10);
        //var intNHS = parseInt(withNHS,10);
        //for when we have place requirement
        /*if(inthrs>=15 && places.length>=2)
        {
            document.getElementById("displayCompletion").innerHTML="Congratulations! You have fulfilled all NHS requirements!";
            document.getElementById("catCeleb").style.opacity=1;
            
        }*/
        //var img = document.createElement("img");
        //img.src = "img/eqp/"+this.apparel+"/"+this.facing+"";
        
        
        if(intSACs>0)
        {
            document.getElementById("displaySacReason").innerHTML = "Past SACs: "+reason;
        }
        if(inthrs>=100 && intSACs<3)
        {
            document.getElementById("displayCompletion").innerHTML="Congratulations! You have fulfilled all NHS requirements!";
            //var src = document.getElementById("catJam");
            //src.appendChild(img);
            //document.getElementById("catCeleb").style.opacity=1;
            var x = document.createElement("IMG");
            x.setAttribute("src", "https://images-ext-2.discordapp.net/external/S-BwQSix8Irh8aYVyoG0P-vKUu-qMw06RZOSshq87Yo/https/media.discordapp.net/attachments/289170611849396225/740310724584407181/image0-30.gif");
            x.setAttribute("alt", "catGif");
            document.getElementById("catJam").appendChild(x); 
            var button1 = document.createElement("BUTTON");
            button1.innerHTML = "Celebrate!";
            button1.style.backgroundColor="#4caf91";
            button1.style.padding="1vw 2vw";
            button1.style.marginLeft="3vw";
            button1.style.marginTop="2.5vw";
            button1.style.border="none";
            button1.style.color="white";
            button1.style.borderRadius="2px";
            button1.style.fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
            button1.style.position="absolute";
            document.getElementById('celebrateMusic').volume=.2;
            button1.onclick=function(){document.getElementById('celebrateMusic').play(); console.log("hello?")};
            button1.onclick=function(){celebration()};
            document.getElementById("catJam").appendChild(button1);
        }
        else
        {
            if(intSACs>=3)
            {
                document.getElementById("displayCompletion").innerHTML = "Sorry, but you have been removed from NHS for having 3 or more SACs. Please message an officer if you believe this is a mistake.";
            }
            else
            {
                document.getElementById("displayCompletion").innerHTML=
                "Remember, you'll need at least 15 regular volunteer hours (5 with NHS) to fulfill NHS requirements. You'll also need to attend the monthly required meetings.";
                document.getElementById("displayCompletion").style.lineHeight=1.25;
                //document.getElementById("catCeleb").style.opacity=0;
            }
        }
    }
    else
    {
        if(namleng==3)
        {
            alert("Please enter your name!");
        }
        else
        alert("Sorry, couldn't find you in the database, check spelling?");
    }
    //console.log("?????");
    //alert("The form was submitted by "+first+" "+middle+" "+last+" "+result.slice(pos+namleng,pos+namleng+2));

}
function celebration(){
var emitterSize = 20,
dotQuantity = 40,
dotSizeMin = 6,
dotSizeMax = 8,
speed = 2.4,
gravity = 0.7,
explosionQuantity = 5,
emitter = document.querySelector('#emitter'),
explosions = [],
currentExplosion = 0,
container, i, move;

function createExplosion(container) {
  var tl = new TimelineLite({paused: true}),
  dots = [],
  angle, duration, length, dot, i, size, r, g, b;
  for (i = 0; i < dotQuantity; i++) {
    dot = document.createElement('div');
    dots.push(dot);
    dot.className = 'dot';
    r = getRandom(30, 255);
    g = getRandom(30, 230);
    b = getRandom(30, 230);
    TweenLite.set(dot, {
      backgroundColor: 'rgb('+r+','+g+','+b+')',
      visibility: 'hidden'
    });
    size = getRandom(dotSizeMin, dotSizeMax);
    container.appendChild(dot);
    angle = getRandom(0.65, 0.85) * Math.PI * 2; // a vector pointed up
    // get maximum distance from the center, factoring in size of dot, and then pick a random spot along that vector to plot a point
    length = Math.random() * (emitterSize / 2 - size / 2);
    duration = 3 + Math.random();
    // place the dot at a random spot within the emitter, and set its size
    TweenLite.set(dot, {
      x: Math.cos(angle) * length, 
      y: Math.sin(angle) * length, 
      width: size, 
      height: size, 
      xPercent: -50, 
      yPercent: -50,
      visibility: 'hidden',
      force3D: true
    });
    tl.to(dot, duration / 2, {
      opacity: 0,
      ease: RoughEase.ease.config({
        points: 20,
        strength: 1.75,
        clamp: true
      })
    }, 0).to(dot, duration, {
      visibility: 'visible',
      rotationX: '-='+getRandom(720, 1440),
      rotationZ: '+='+getRandom(720, 1440),
      physics2D: {
        angle: angle * 180 / Math.PI, // translate radians to degrees
        velocity: (100 + Math.random() * 250) * speed, // initial velocity
        gravity: 700 * gravity,
        friction: getRandom(0.1, 0.15)
      }
     }, 0).to(dot, 1.25 + Math.random(), {
      opacity: 0
    }, duration / 2);
  }
  // hide the dots at the end for improved performance (better than opacity: 0 because the browser can ignore the elements)
  // console.log('setting', dots);
  // tl.set(dots, {visibility: 'hidden'});
  return tl;
}

function explode(element) {
  var bounds = element.getBoundingClientRect(),
  explosion;
  if (++currentExplosion === explosions.length) {
    currentExplosion = 0;
  }
  explosion = explosions[currentExplosion];
  TweenLite.set(explosion.container, {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2
  });
  explosion.animation.restart();
}

function getRandom(min, max) {
  var rand = min + Math.random() * (max - min);
  return rand;
}

function play() {
  move.play(0);
  var intervalCount = 0,
  interval = setInterval(function() {
    if (intervalCount < 5) {
      explode(emitter);
      intervalCount++;
    } else {
      clearInterval(interval);
    }
  }, 150);
}

function setup() {
  for (i = 0; i < explosionQuantity; i++) {
    container = document.createElement('div');
    container.className = 'dot-container';
    document.body.appendChild(container);
    explosions.push({
      container: container,
      animation: createExplosion(container)
    });
  }
  console.log("ran set up");
  move = new TimelineLite({
    paused: true
  }).fromTo(emitter, 0.4, {
    left: '40%'
  }, {
    left: '60%',
    ease: Linear.easeNone
  }).fromTo(emitter, 0.4, {
    left: '60%'
  }, {
    left: '40%',
    ease: Linear.easeNone
  });
  
  document.querySelector('body').onclick = function () {
    play();
  };
  
  play();
}

setup();
}