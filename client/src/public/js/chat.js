
// ================================================================================================================================
// FRONT END CHAT LOGIC
// ================================================================================================================================

(function(){
    function updateScroll(){
        var panel = document.getElementById("chatWindow");
        panel.scrollTop = panel.scrollHeight;
    };
    // var get = function(x){return document.querySelector(x)};
    var logged_in_user = "Anthony"; 
    var status = $('#state')    
    // var userName = get('#UserName');
    var messageInput =$('#messageInput')
    var chatHistory = $('.chatHistory');
    userName.value = logged_in_user;
    console.log(userName.value)
    
    try {
        var socket = io.connect('http://127.0.0.1:8080');  
    } catch(e){};   

    if (socket !== undefined && userName.value){
        // //listens for an output
        socket.on('output',function(data){
            if(data.length){
                //Loops through data and writes to the page
                for(var i = 0; i < data.length; i++){
                    //creates page element for each message
                    if ( data[i].name === userName.value){
                        var message = $('<div>');
                        message.addClass('yourMessage');
                        message.html('<h3><span class="label label-default" id = "yourWords">'+ data[i].message + '</span></h3>');
                        chatHistory.append(message);
                        message.insertBefore(chatHistory).firstChild;
                    }else{
                        var message = $('<div>');
                        message.addClass('theirMessage');
                        message.html('<h3><span class="label label-default" id = "theirWords">'+ data[i].message + '</span></h3>');
                        chatHistory.append(message);
                        message.insertBefore(chatHistory).firstChild;   
                    };
                };
            };
        });
        socket.on('status', function(data){})
        //listens for the enter key to be pressed
        messageInput.on('keydown', function(event){
            var self = this;
            var name = userName.value;
            if(event.which === 13 && event.shiftKey === false){
                updateScroll();
                console.log(name);
                console.log("message sent")
                //send user input data to be added to the database
                socket.emit('input', {
                    author: name, 
                    message: self.value
                });
                messageInput.val('');
                event.preventDefault();
            };
        });
    };
})();