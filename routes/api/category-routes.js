const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!categoriesData) {
      res.status(400).json({ message: `No category found` });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(400).json({ message: `No Category found` });
      return;
    }
    res.status(200).json(categoryData);
    return;
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  if (!category_name)
    return res.status(400).json({ message: `No category_name sent` });
  try {
    const createCategory = await Category.create({
      category_name: category_name,
    });

    res.status(200).json(createCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
