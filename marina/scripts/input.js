var closeBtn = document.getElementById("close"); 

closeBtn.addEventListener("click", function() { 

    var content = document.querySelector("#popup"); 
    content.innerHTML ="";

}); 

var submitBtn = document.getElementById("submit"); 

submitBtn.addEventListener("click", function () { 

    alert("Taking input");

});

