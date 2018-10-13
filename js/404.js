(function(){
    console.log("Testing...");
    
    var dynamicDivContent;


    function ver_default() {
        console.log("ver_default")
        ver_01();
    }   

    function ver_01() {
        console.log("ver_01");
        dynamicDivContent = '<div class="ver_01"> \
                <p >Your page has hid itself due to shame. huh!</p>\
                <img src="images/404-01.png" alt=""> \
                </div>'
    }

    function ver_02() {
        console.log("ver_02");
        dynamicDivContent = '<div class="ver_02"> \
        <p >WHY DID YOU DO THAT? WHY? </p>\
        <img src="images/404-02.jpg" alt=""> </div>'
    }


    switch( function() {
        return Math.floor(Math.random() * Math.floor(3));
    }()) {
        case 1:
            ver_01();
            break;
        case 2:
            ver_02();
            break;
        default:
            ver_default();  
            break;
    } 

    document.getElementById("div-404").innerHTML = dynamicDivContent ;

})();