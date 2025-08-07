require('dotenv').config();
const express = require('express');
const app = express();
const {connectDb} = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const Routes = require('./routes/Contact');
const PORT = process.env.PORT;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payments');
const contactUsRoute = require('./routes/Contact');


connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(PORT,() => {
    console.log(`Server running at port ${PORT}`);
})

