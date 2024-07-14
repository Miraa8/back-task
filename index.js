import express from 'express'
import { config } from 'dotenv'
import db_connection from './DB/db_connection.js';
import userRouter from './src/modules/users/user.router.js'
import categoryRouter from './src/modules/categories/category.router.js'
import taskRouter from './src/modules/tasks/task.router.js'
import { globalResponse } from './src/middlewares/globalResponse.js';

config({path: "./config/config.env"})

let app = express();
let port = process.env.PORT;

app.use(express.json())
app.use('/users', userRouter)
app.use('/categories', categoryRouter )
app.use('/tasks', taskRouter )
db_connection()
app.use(globalResponse)

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});