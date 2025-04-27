import express from 'express';
import Soil from '../models/soil.js';

const soilRouter = express.Router();

// POST /api/soil - Create new soil
soilRouter.post('/soil', async (req, res) => {
  try {
    const soil = new Soil(req.body);
    await soil.save();
    res.status(201).json(soil);
  } catch (error) {
    console.error('Create Soil Error:', error.message);
    res.status(500).json({ message: 'Server error while creating soil' });
  }
});

// GET /api/soil - Get all soils
soilRouter.get('/soil', async (req, res) => {
  try {
    const soils = await Soil.find();
    res.status(200).json(soils);
  } catch (error) {
    console.error('Get Soils Error:', error.message);
    res.status(500).json({ message: 'Server error while getting soils' });
  }
});

// GET /api/soil/:id - Get single soil by id
soilRouter.get('/soil/:id', async (req, res) => {
  try {
    const soil = await Soil.findById(req.params.id);
    if (!soil) {
      return res.status(404).json({ message: 'Soil not found' });
    }
    res.status(200).json(soil);
  } catch (error) {
    console.error('Get Soil Error:', error.message);
    res.status(500).json({ message: 'Server error while getting soil' });
  }
});

// PUT /api/soil/:id - Update soil by id
soilRouter.put('/soil/:id', async (req, res) => {
  try {
    const updatedSoil = await Soil.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSoil) {
      return res.status(404).json({ message: 'Soil not found' });
    }
    res.status(200).json(updatedSoil);
  } catch (error) {
    console.error('Update Soil Error:', error.message);
    res.status(500).json({ message: 'Server error while updating soil' });
  }
});

// DELETE /api/soil/:id - Delete soil by id
soilRouter.delete('/soil/:id', async (req, res) => {
  try {
    const deletedSoil = await Soil.findByIdAndDelete(req.params.id);
    if (!deletedSoil) {
      return res.status(404).json({ message: 'Soil not found' });
    }
    res.status(200).json({ message: 'Soil deleted successfully' });
  } catch (error) {
    console.error('Delete Soil Error:', error.message);
    res.status(500).json({ message: 'Server error while deleting soil' });
  }
});

export default soilRouter;