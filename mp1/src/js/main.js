window.onscroll = function() 
{
  stickyHeader();
}

header = document.getElementById("header");
headerName= document.getElementById("name");
headerOne = document.getElementById("one");
headerTwo = document.getElementById("two");
headerThree = document.getElementById("three");
headerFour = document.getElementById("four");

function stickyHeader()
{
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
  {
    header.style.padding = "25px 10px";
    headerOne.style.fontSize = "15px";
    headerTwo.style.fontSize = "15px";
    headerThree.style.fontSize = "15px";
    headerFour.style.fontSize = "15px";
    headerName.style.fontSize = "15px";
  }
  else
  {
    header.style.padding = "50px 10px";
    headerOne.style.fontSize = "20px";
    headerTwo.style.fontSize = "20px";
    headerThree.style.fontSize = "20px";
    headerFour.style.fontSize = "20px";
    headerName.style.fontSize = "20px";
  }
}

var counter = 1;

slideShow(counter);

function slideCounter(argument) 
{
  slideShow(counter += argument);
}

function slideShow(argument) 
{
  var integer;

  allSlides = document.getElementsByClassName("slideshow");

  if (argument > allSlides.length) 
  {
    counter = 1
  }    

  if (argument < 1) 
  {
    counter = allSlides.length
  }

  for (integer = 0; integer < allSlides.length; integer++) 
  {
    allSlides[integer].style.display = "none";  
  }
  
  allSlides[counter-1].style.display = "block"; 
}
