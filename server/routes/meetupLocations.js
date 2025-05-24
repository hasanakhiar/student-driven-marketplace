const express = require('express');
const router = express.Router();
const MeetupLocation = require('../models/MeetupLocation');
const auth = require('../middleware/auth');

// Get all meetup locations
router.get('/', async (req, res) => {
  try {
    const locations = await MeetupLocation.find({ isActive: true });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get nearby meetup locations
router.get('/nearby', async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 1000 } = req.query; // maxDistance in meters

    const locations = await MeetupLocation.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      },
      isActive: true
    });

    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new meetup location (admin only)
router.post('/', auth, async (req, res) => {
  // Check if user is admin (you'll need to implement this check)
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const location = new MeetupLocation({
    name: req.body.name,
    description: req.body.description,
    location: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    },
    type: req.body.type,
    safetyFeatures: req.body.safetyFeatures,
    operatingHours: req.body.operatingHours
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a meetup location (admin only)
router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const location = await MeetupLocation.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    Object.assign(location, req.body);
    if (req.body.longitude && req.body.latitude) {
      location.location.coordinates = [req.body.longitude, req.body.latitude];
    }

    const updatedLocation = await location.save();
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a meetup location (admin only)
router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const location = await MeetupLocation.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    location.isActive = false;
    await location.save();
    res.json({ message: 'Location deactivated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 