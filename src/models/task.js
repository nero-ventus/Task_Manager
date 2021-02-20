const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const TaskSchema = new Schema({
    title : {type : String, required : true},
    description : {type : String},
    subject : {type : String, required: true},
    deadline : {type : String},
    priority : {type : Number, required : true}
});

TaskSchema.methods.encryptDescription = async (description) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(description, salt);
};

TaskSchema.methods.validateDescription = async (description) => {
    return bcrypt.compare(description, this.description);
};

module.exports = mongoose.model('Task', TaskSchema);