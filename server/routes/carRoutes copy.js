const requireLogin = require('../middlewares/requireLogin');
const multer = require('multer');
const { createPhoto } = require('../controllers/photoController');

const upload = multer({ dest: 'uploads/' });
const Cars = require('../models/Cars');

module.exports = (app) => {
	app.post(
		'/api/save',
		requireLogin,
		// multerUpload.single('imageFile'),
		upload.single('imageFile'),
		createPhoto,
		async (req, res, next) => {
			const { carMakerName, modelName, modelYear, engine } = req.body;
			console.log('Received Data:', carMakerName, modelName, modelYear, engine);

			try {
				const cars = new Cars({
					carMakerName,
					modelName,
					modelYear,
					engine,
					s3ImageUrl: '', // Initialize s3ImageUrl here or set it based on your logic
				});

				// Check if a file is uploaded
				if (req.file) {
					const image = req.file;
					const result = await upload(image);
					if (result) {
						cars.s3ImageUrl = result.Location;
					}
				} else {
					console.log('No image to upload');
				}

				// Save the CarModels document to the database
				await cars.save();
				res.status(200).send({ message: 'Cars created successfully' });
			} catch (error) {
				res.status(422).send(error);
				console.error('Error saving car:', error);
				res.status(500).send({ error: 'Internal Server Error' });
			}
		}
	);

	app.get('/api/fetch', async (req, res) => {
		try {
			const cars = await Cars.find({});

			res.status(200).json(cars);
		} catch (error) {
			res.status(422).send(error);
		}
	});
};
