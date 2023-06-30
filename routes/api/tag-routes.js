const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({ include: [{ model: Product }] });

    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({
      include: [{ model: Product }],
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) return res.status(200).json({ message: `No Tag Found` });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  if (!tag_name) {
    return res.status(200).json({
      message: `No tag_name found`,
    });
  }

  try {
    const tagCreated = await Tag.create({ tag_name: tag_name });
    res.status(200).json(tagCreated);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const { tag_name } = req.body;
  if (!tag_name) {
    return res.status(200).json({
      message: `No tag_name found`,
    });
  }

  try {
    const tagUpdated = await Tag.update(
      { tag_name: tag_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json(tagUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDeleted = await Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json(tagDeleted);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
