const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Application = require('../models/application');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('./middleware/auth');
const requireRole = require('./middleware/role');

const router = express.Router();

User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' })

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      login: req.body.login,
      password: hashedPassword
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { login: req.body.login } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret');
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Неверный логин или пароль' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/applications', async (req, res) => {
  try {
    const application = await Application.create({
      description: req.body.description,
      carNumber: req.body.carNumber,
      userId: req.body.userId
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.findAll({ where: { userId: req.query.userId } });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  router.put('/applications/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const [ updated ] = await Application.update(req.body, { where: { id: id } });
      if (updated) {
        const updatedApplication = await Application.findOne({ where: { id: id } });
        res.status(200).json({ application: updatedApplication });
      } else {
        throw new Error('Заявление не найдено');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/admin/applications', async (req, res) => {
    try {
      const applications = await Application.findAll({
        include: [{
          model: User,
          attributes: ['fullName', 'phone', 'email', 'login'], // указываете только те атрибуты, которые хотите получить
        }]
      });
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/admin/applications/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const [ updated ] = await Application.update(req.body, { where: { id: id } });
      if (updated) {
        const updatedApplication = await Application.findOne({ where: { id: id } });
        res.status(200).json({ application: updatedApplication });
      } else {
        throw new Error('Заявление не найдено');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  

module.exports = router;



