const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include:
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dataRes => res.json(dataRes))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findAll({
    where: {
      id: req.params.id
    },
    include:
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbRes => {
      if (!dbRes) {
        res.status(404).json({ message: 'No category with that id' });
        return;
      }
      res.json(dbRes)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })

  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbRes => {
      if (!dbRes) {
        res.status(404).json({ message: 'No category with that ID' });
        return;
      }
      res.json(dbRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbRes => {
      if (!dbRes) {
        res.status(404).json({ message: 'No category with that ID' });
        return;
      }
      res.json(dbRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
