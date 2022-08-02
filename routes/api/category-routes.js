const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include:[Product]
    })
    res.status(200).json(categories)
    } catch(err) {
      res.status(500).json({
          msg:"internal server error",
          err
      })
  }
})

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{
      model: Product
    }]
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({msg:"error!", err})
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "error!", err })
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
    {
      where: {
        id: req.params.id
      }
    }).then(category => {
      if (!category[0]) {
        return res.status(404).json({ msg: "no category made!" })
      }
      res.json(category)
    }).catch(err => {
      res.status(500).json({ msg: "internal server error", err })
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "error!", err })
  })
});

module.exports = router;
