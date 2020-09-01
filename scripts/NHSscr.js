
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

    var pos = result.indexOf(first+" "+middle+" "+last);
    var namleng= first.length+middle.length+last.length+3;
    if(pos!=-1 && namleng>3)
    {
    var grade = result.slice(pos+namleng,pos+namleng+2);
    var dues = result.slice(pos+namleng+4,pos+namleng+5);
    if(dues.localeCompare("Y")==0)
    {
        document.getElementById("displayDues").innerHTML="Thank you for paying your dues! :D";
    }
    else
    {
        if(grade.localeCompare("12")!=0)
        document.getElementById("displayDues").innerHTML="Please pay your dues!";
    }
    var hr = result.indexOf("hr",pos);
    var hours = result.slice(pos+namleng+6,hr);
    var end = result.indexOf("|",pos);
    if(hours.localeCompare("0")!=0)
    {
        
        var places = result.slice(hr+3,end).toString().split(",");
        document.getElementById("displayPlaces").innerHTML="You've volunteered at "+places;
    }
    else
    {
        document.getElementById("displayPlaces").innerHTML="Check out the Volunteer page for potential volunteering opportunities!";
    }
    //alert("Number of hours: "+hours);
    var dispName = first.toString().slice(0,1)+first.toString().slice(1,first.length).toLowerCase();
    if(first.localeCompare("HENRI-CONSTANT")==0)
        document.getElementById("displayName").innerHTML="Hello Henri-Constant"+"!";
    else 
    {
            document.getElementById("displayName").innerHTML="Hello "+dispName+"!";
    }
    document.getElementById("displayName").style.fontWeight="bold";
    document.getElementById("displayName").style.fontSize="200%";
    document.getElementById("displayHours").innerHTML="Number of Hours: "+hours;
    var inthrs = parseInt(hours,10);
    if(inthrs>=25 && places.length>=2)
    {
        document.getElementById("displayCompletion").innerHTML="Congratulations! You have fulfilled all NHS requirements!";
        document.getElementById("catCeleb").style.opacity=1;
        
    }
    else
    {
        document.getElementById("displayCompletion").innerHTML=
        "Remember, you'll need at least 25 volunteer hours at 2 or more different places to fulfill NHS requirements. You'll also need to attend the monthly required meetings.";
        document.getElementById("displayCompletion").style.lineHeight=1.25;
        document.getElementById("catCeleb").style.opacity=0;
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
    //alert("The form was submitted by "+first+" "+middle+" "+last+" "+result.slice(pos+namleng,pos+namleng+2));

}