const mongoose = require('mongoose');
const { Schema } = mongoose;

const carSchema = new Schema({
	carMakerName: String,
	modelName: String,
	modelYear: Number,
	engine: String,
	options: [String],
	s3ImageUrl: [String],
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
});

mongoose.model('cars', carSchema);
module.exports = mongoose.model('Cars', carSchema);
