const Todos = require("../models/todos");
const Users = require("../models/users");

exports.fetchTodos = async (req, res) => {
  try {
    const list = await Todos.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    if (list.length !== 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "No Tasks" });
    }
  } catch (error) {
    console.log("Error while sending data fetchTodos", error);
  }
};

exports.createTodos = async (req, res) => {
  try {
    const { title, description, id } = req.body;
    console.log(title, description, id);

    const exisitingUser = await Users.findById(id);
    console.log(exisitingUser);
    if (!exisitingUser) {
      return res.status(403).json({
        success: false,
        message: "User is not registered",
      });
    }
    const list = new Todos({ title, description, user: exisitingUser });
    await list.save().then(() => res.status(200).json({ list }));
    exisitingUser.todos.push(list);
    await exisitingUser.save();
  } catch (error) {
    console.log("Error while creating Todo", error);
  }
};

exports.updateTodos = async (req, res) => {
  try {
    // const { id } = req.body;
    console.log(req.body);
    const { userId, title, description } = req.body.data;
    const id = req.params.id;
    const exisitingUser = await Users.findById(userId);
    if (!exisitingUser) {
      return res.status(403).json({
        success: false,
        message: "User is not registered",
      });
    }
    const list = await Todos.findByIdAndUpdate(id, { title, description });
    list.save().then(() => res.status(200).json({ message: "Task updated" }));
  } catch (error) {
    console.log("Error while updating the tasks", error);
  }
};

exports.deleteTodos = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const { id } = req.params;
    const { taskId } = req.body;
    // const email = req.body.email;

    const exisitingUser = await Users.findByIdAndUpdate(id, {
      $pull: { todos: taskId },
    });
    if (!exisitingUser) {
      return res.status(403).json({
        success: false,
        message: "User is not registered",
      });
    }

    await Todos.findByIdAndDelete(taskId).then(() => {
      console.log("Deleted");
      return res.status(200).json({ message: "Task Deleted" });
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
