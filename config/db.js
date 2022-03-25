const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect('mongodb+srv://claudiobak:Y4p2032NL@cluster0.nscsc.mongodb.net/Cluster0?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    console.log('DB - connected')
    } catch (error) {
        console.log('error occured while trying to db:', error);
        throw error;
    }
};

module.exports = connectDB;

