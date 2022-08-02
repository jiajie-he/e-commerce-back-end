const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
      model: Product
    }]
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "error!", err })
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{
      model: Product
    }]
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "error!", err })
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "error!", err })
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where: {
        id: req.params.id
      }
    }).then(tag => {
      if (!tag[0]) {
        return res.status(404).json({ msg: "no such tag" })
      }
      res.json(tag)
    }).catch(err => {
      res.status(500).json({
        msg: "internal server error",
        err
      })
    });
  })

  router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
      where:{
        id:req.params.id
      }
    }).then(data=>{
      res.json(data)
    }).catch(err=>{
      res.status(500).json({meg:"error!",err})
    })
  });

  module.exports = router;
