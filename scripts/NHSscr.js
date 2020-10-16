
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
    var hours = result.slice(pos+namleng+6,hr); //hours with nhs
    var wNHS = result.indexOf("/5",pos); //find number of hours with NHS
    var withNHS = result.slice(wNHS-1,wNHS);
    var findSACs = result.indexOf("sac",pos);
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
    if(first.includes(" "))
    {
        var dispName = first.slice(0,1)+first.slice(1,first.indexOf(" ")).toLowerCase()+" "+first.slice(first.indexOf(" ")+1,first.indexOf(" ")+2)+first.slice(first.indexOf(" ")+2,first.length).toLowerCase();
    }
    else
        var dispName = first.toString().slice(0,1)+first.toString().slice(1,first.length).toLowerCase();
    document.getElementById("displayName").innerHTML="Hello "+dispName+"!";
    
    if(pos!=-1 && namleng>3)
    {
        var grade = result.slice(pos+namleng,pos+namleng+2);
        var dues = result.slice(pos+namleng+4,pos+namleng+5);
        //paid dues? (Y/N), only consider if not a senior
        if(dues.localeCompare("Y")==0)
        {
            document.getElementById("displayDues").innerHTML="Thank you for paying your dues! :D";
        }
        else
        {
            if(grade.localeCompare("12")!=0)
            document.getElementById("displayDues").innerHTML="Please pay your dues!";
        }
        document.getElementById("displayName").style.fontWeight="bold";
        document.getElementById("displayName").style.fontSize="200%";
        document.getElementById("displayName").style.paddingBottom = "1vw";
        document.getElementById("displayName").style.borderBottom = "4px solid #26a89d";
        document.getElementById("displayHours").innerHTML="Total Hours: "+hours;
        document.getElementById("displaywithNHS").innerHTML="Hours with NHS: "+withNHS;
        document.getElementById("displaySACs").innerHTML="SACs: "+SACs;
        var inthrs = parseInt(hours,10);
        var intSACs = parseInt(SACs,10);
        //for when we have place requirement
        /*if(inthrs>=15 && places.length>=2)
        {
            document.getElementById("displayCompletion").innerHTML="Congratulations! You have fulfilled all NHS requirements!";
            document.getElementById("catCeleb").style.opacity=1;
            
        }*/
        if(intSACs>0)
        {
            document.getElementById("displaySacReason").innerHTML = "Past SACs: "+reason;
        }
        if(inthrs>=15)
        {
            document.getElementById("displayCompletion").innerHTML="Congratulations! You have fulfilled all NHS requirements!";
            document.getElementById("catCeleb").style.opacity=1;
        }
        else
        {
            if(intSACs==3)
            {
                document.getElementById("displayCompletion").innerHTML = "Sorry, but you have been removed from NHS for having 3 SACs.";
            }
            else
            {
                document.getElementById("displayCompletion").innerHTML=
                "Remember, you'll need at least 15 volunteer hours (5 from NHS) to fulfill NHS requirements. You'll also need to attend the monthly required meetings.";
                document.getElementById("displayCompletion").style.lineHeight=1.25;
                document.getElementById("catCeleb").style.opacity=0;
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
    //alert("The form was submitted by "+first+" "+middle+" "+last+" "+result.slice(pos+namleng,pos+namleng+2));

}