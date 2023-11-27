const  express = require ("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const PORT = 5000;
app.use(express.json()) // it helps you to read the data from the body
app.use(router);

async function connectDatabase()
{
    mongoose.connect('mongodb+srv://aligohar:LUkdSqHFqxw3JbTO@cluster0.yll3xil.mongodb.net/Todolist?retryWrites=true&w=majority').then(console.log('db Connected'));
}
connectDatabase();
app.listen(PORT, () => {
    console.log('Hello Testing');
});
const Todoschema = new mongoose.Schema(
    {
        text:{"type": String},
        status:{"type": String}
    }
);
const TodoModel = mongoose.model("Todos", Todoschema);
app.get('/', async(req, res) =>
{   const data = await TodoModel.find();
    res.json(data);
}
    );
    app.get('/:id', async(req, res) =>
    {   const {id} = req.params;
        const data = await TodoModel.find({"_id": id});
        res.json(data);
    }
        );
    

    

    app.post('/new', async(req, res) =>
    {   const Postdata = new TodoModel({text: req.body.text, status: req.body.status})
        Postdata.save();
        res.json({success: true, Postdata})
    }
        );
    
        app.delete('/del/:id', async(req, res) =>
        {   const {id} = req.params;
            const Deletedata = await TodoModel.findByIdAndDelete(id);
            res.json({success: true, Deletedata})
        }
            );
            