import express from 'express';
import inquiryRouter from './routes/inquiry.route.js'
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.route.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/inquiries", inquiryRouter);


app.use("/api/auth", adminRouter);
app.use("/api/auth", adminRouter)



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
