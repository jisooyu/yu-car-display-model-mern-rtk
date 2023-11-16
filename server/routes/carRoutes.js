const requireLogin = require('../middlewares/requireLogin');
const multer = require('multer');
const { createPhoto } = require('../controllers/photoController');

const upload = multer({ dest: 'uploads/' });
const Cars = require('../models/Cars');

module.exports = (app) => {
	app.post(
		'/car/save',
		requireLogin,
		upload.array('imageFiles', 5), // multiple fields upload
		async (req, res) => {
			try {
				const { carMakerName, modelName, modelYear, engine, options } =
					req.body;
				console.log('req.body', req.body);
				// const { filename } = req.file; // Use the entire req.file object
				console.log('req.files', req.files);
				// Save car details and AWS URL to MongoDB
				const newCar = new Cars({
					carMakerName,
					modelName,
					modelYear,
					engine,
					options,
				});

				// Upload photo to AWS and get the URL
				if (req.files && req.files.length > 0) {
					console.log('req.files', req.files);

					const s3ImageUrls = [];

					for (let i = 0; i < req.files.length; i++) {
						const result = await createPhoto(req.files[i]);

						if (result) {
							s3ImageUrls.push(result.Location);
						} else {
							console.log(`Error uploading image ${i + 1}`);
						}
					}
					// Assuming newCar.s3ImageUrl is an array field in your model
					newCar.s3ImageUrl = s3ImageUrls;
				} else {
					console.log('No images to upload');
				}

				await newCar.save();

				res
					.status(200)
					.json({ message: 'Car details and photo uploaded successfully.' });
			} catch (error) {
				console.error('Error uploading car details and photo:', error);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	);

	app.get('/car/fetch', async (req, res) => {
		console.log('/car/fetch');
		try {
			const cars = await Cars.find({});
			console.log('cars', cars);
			res.status(200).json(cars);
		} catch (error) {
			res.status(422).send(error);
		}
	});
};
