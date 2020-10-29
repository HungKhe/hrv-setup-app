import mongoose from 'mongoose';
const dbPath: string = process.env.MONGO_URL || 'mongodb://localhost:27017/app_review';
mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;
const db: mongoose.Connection = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log(`> successfully opened the database to ${ dbPath }`);
});
export default mongoose;
// E:\Install\mongodb-win32-x86_64-2012plus-4.2.7\bin\mongod.exe --dbpath E:\Install\mongodb-win32-x86_64-2012plus-4.2.7\MongoData
// E:\Phanmem\Hoc\mongodb-win32-x86_64-2012plus-4.2.6\bin\mongod.exe --dbpath E:\Phanmem\Hoc\mongodb-win32-x86_64-2012plus-4.2.6\MongoDB
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOiI1ZWJlYzdhNTk3MzQyMTI2N2M0NjQwNjEiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInVzZXJfZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifSwiaWF0IjoxNTkyMzE2Nzg2LCJleHAiOjE1OTIzMjAzODZ9.da5744UAbtm3bN7AYlhst60ZvvURvAPHVIy9_BfSu48