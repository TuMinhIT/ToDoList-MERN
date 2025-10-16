import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Lấy tất cả task
router.get("/", protect, async (req, res) => {
  try {
    console.log(req.user);
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    throw error;
  }
});

// Thêm task
router.post("/", protect, async (req, res) => {
  try {
    const { title, desc, category } = req.body;
    const task = await Task.create({
      title,
      desc,
      category,
      user: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    throw error;
  }
});

// Update task
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    task.title = req.body.title;
    task.desc = req.body.desc;
    task.completed = req.body.completed ?? task.completed;
    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    throw error;
  }
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    throw error;
  }
});

export default router;
