const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
    {
        id: 1,
        title: "Complete CodeOrbit Task 3",
        completed: false
    }
];

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "CodeOrbit Task Management API is running!"
    });
});

// GET - Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// GET - Get one task
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

// POST - Add a new task
app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// PUT - Update a task
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    if (req.body.title !== undefined) {
        task.title = req.body.title;
    }

    if (req.body.completed !== undefined) {
        task.completed = req.body.completed;
    }

    res.json(task);
});

// DELETE - Delete a task
app.delete("/tasks/:id", (req, res) => {
    const taskIndex = tasks.findIndex(
        t => t.id === parseInt(req.params.id)
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});