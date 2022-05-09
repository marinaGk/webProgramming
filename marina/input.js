var closeBtn = document.getElementById("close"); 

closeBtn.addEventListener("click", function() { 

    var content = document.querySelector(".modal-container"); 
    content.style.display = "none";

}); 

var submitBtn = document.getElementById("submit"); 

submitBtn.addEventListener("click", function () { 

    alert("Taking input");

});

