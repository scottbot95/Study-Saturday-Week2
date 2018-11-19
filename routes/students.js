const router = require("express").Router();

const Student = require("../db/models/student");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Student.findAll());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    if (student) {
      res.status(201).json(student);
    } else {
      next(new Error("Failed to create student"));
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const changed = await Student.update(req.body, {
      where: req.params,
      returning: true
    });
    if (changed[0] > 0) {
      res.json(changed[1][0]);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const changed = Student.destroy({ where: req.params });
    if (changed) {
      res.status(204).end();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
