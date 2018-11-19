const router = require("express").Router();

const Test = require("../db/models/test");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Test.findAll());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    if (test) {
      res.json(test);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

router.post("/student/:id", async (req, res, next) => {
  try {
    const test = await Test.create({ studentId: req.params.id, ...req.body });
    res.status(201).json(test);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const changed = await Test.destroy({ where: req.params });
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
