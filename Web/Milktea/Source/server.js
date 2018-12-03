var fs       = require('fs'); 
var server   = require('http').createServer()
var io       = require('socket.io')(server)
var serialize = require('node-serialize');
var bookid = JSON.parse(fs.readFileSync('/app/bookid.json', 'utf8'));

var bookcontent = JSON.parse(fs.readFileSync('/app/bookcontent.json', 'utf8'));
io.on('connection', function (client) { 
    client.on('getUsername', function(username) {
        try {
            console.log(username + " is trying")
        } catch(e) { console.log(e); client.disconnect() }
    });

    client.on('choice', function(msg) {
        try {
            msg = JSON.parse(msg);
            ser = [];
            bookname = msg.bookname;
            username = msg.username;
            remark = msg.remark;
            serinfo = msg.serInfo;
            Info = [];
            
            channel = msg.channel;
            if (channel == 1){
                if(bookname == bookid["1"]){
                    Info['id'] = 1;
                }
                if(bookname == bookid["2"]){
                    Info['id'] = 2;
                }
                if(bookname == bookid["3"]){
                    Info['id'] = 3;
                }
                if(bookname == bookid["4"]){
                    Info['id'] = 4;
                }
                Info[username][bookname] = remark;
                if(ser["Flag"] == 1){
                    serialize.unserialize(serinfo);
                    client.disconnect();
                }else{
                    client.disconnect();
                }
            }else if( channel == 2){
                client.disconnect();
            }else if(channel == 3){
                console.log("....");
                client.disconnect();
            }else if(channel == 4 ){
                client.disconnect();
            }else{
                client.disconnect();
            }


        } catch(e) { console.log(e); client.disconnect() }
    });
    client.on('disconnect', function () {
        try {
            console.log('client disconnect...')

            delete client;
        } catch(e) { console.log(e); client.disconnect() }
    })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
});

server.listen(20003, function (err) {
  if (err) throw err;
  console.log('listening on port 20003');
});
