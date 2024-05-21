const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// 모든 도메인에서의 요청을 허용합니다.
app.use(cors());

// MongoDB URL. 쿠버네티스 환경에 따라 수정이 필요할 수 있습니다.
const mongoURL = 'mongodb://10.98.78.219:27017/todoList';

// MongoDB 연결

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(bodyParser.json());

// To-Do 목록 가져오기
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// To-Do 항목 추가
app.post('/todos', async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: false
    });
    await todo.save();
    res.json(todo);
});

// To-Do 항목의 text 수정
app.put('/todos/text', async (req, res) => {
    const { id, text } = req.body

    const todo = await Todo.findById(id);
    todo.text = text
    await todo.save();
    res.json(todo);
});

// To-Do 항목의 complete 유무 수정
app.put('/todos/completed/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed
    await todo.save();
    res.json(todo);
});

// To-Do 항목 삭제
app.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.json(todo);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
