exports = module.exports = function (io) {
  // Set socket.io listeners.

    io.on('connection', (socket) => {
    
        var collection = db.collection('messages')

        status function(s){
            socket.emit('status', s)
        }
            
        collection.find().limit(100).sort({_id: 1}).toArray(function(err, res){
            if (err) throw err;
            socket.emit('output',res);
        });
        
        //input socket for taking in chat messages and inserting them into the database
        //data needs to be added to the messages_recieved sub-collection of the specific message recipent's user document(row).  
        socket.on('input', function(data){
            var name = data.author;
            var message = data.message;
            var wpScrub =/^\s*$/;

            if (wpScrub.test(name)|| wpScrub.test(message)){
                console.log('invalid; empty name or message');
            }
            //need to change this to insert into recipient's messages-recieved sub-doc and the sender's message-sent sub-doc
            collection.insert({author: name, message: message, recipent:??????}, function(){
                socket.emit('output',[data])
                console.log('Message saved!')
            
            });
        });
        
        // ouput socket for taking in data and rendering it to the chat window
        socket.on('output',function(data){
            // need to create a route to send Data to front-end
            //===================================================================================================





            // if(data.length){
            //     //Loops through data and writes to the page
            //     for(var i = 0; i < data.length; i++){
            //         //creates page element for each message
            //         if ( data[i].name === userName.value){
            //             var message = $('<div>');
            //             message.addClass('yourMessage');
            //             message.html('<h3><span class="label label-default" id = "yourWords">'+ data[i].message + '</span></h3>');
            //             chatHistory.append(message);
            //             message.insertBefore(chatHistory).firstChild;
            //         }else{
            //             var message = $('<div>');
            //             message.addClass('theirMessage');
            //             message.html('<h3><span class="label label-default" id = "theirWords">'+ data[i].message + '</span></h3>');
            //             chatHistory.append(message);
            //             message.insertBefore(chatHistory).firstChild;   
            //         };
            //     };
            // };
        });
    
    //function for taking in chat status states
        socket.on('status', function(data){})   
    });
};  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // console.log('a user connected');

    // On conversation entry, join broadcast channel
    // socket.on('enter conversation', (conversation) => {
    //   socket.join(conversation);
    //   // console.log('joined ' + conversation);
    // });

    // socket.on('leave conversation', (conversation) => {
    //   socket.leave(conversation);
    //   // console.log('left ' + conversation);
    // });

    // socket.on('new message', (conversation) => {
    //   io.sockets.in(conversation).emit('refresh messages', conversation);
    // });

    // socket.on('disconnect', () => {
    //   // console.log('user disconnected');
    // });

