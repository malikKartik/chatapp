const prod = true
if(prod){
    exports.MONGO_URI = 'mongodb+srv://malik:malik@businessideas-dhipt.mongodb.net/chat-app?retryWrites=true&w=majority'
}else{
    exports.MONGO_URI = 'mongodb://127.0.0.1:27017/test-db'
}