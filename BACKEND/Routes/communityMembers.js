// routes/communityMembers.js
const express = require('express');
const router = express.Router();
const CommunityMember = require('../models/CommunityMember');

// POST route to add a new community member
router.post('/community-members', async (req, res) => {
  try {
    const newMember = new CommunityMember(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error creating community member', error });
  }
});

// GET route to fetch all community members
router.get('/community-members', async (req, res) => {
  try {
    const members = await CommunityMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching community members', error });
  }
});


// GET route to fetch a community member by ID
router.get('/community-members/:id', async (req, res) => {
    try {
      const memberId = req.params.id;
      const member = await CommunityMember.findById(memberId);
  
      if (!member) {
        return res.status(404).json({ message: 'Community member not found' });
      }
  
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching community member details', error });
    }
  });

  // PUT route to update a community member by ID
router.put('/community-members/:id', async (req, res) => {
    try {
      const memberId = req.params.id;
      const updatedMember = await CommunityMember.findByIdAndUpdate(memberId, req.body, { new: true });
  
      if (!updatedMember) {
        return res.status(404).json({ message: 'Community member not found' });
      }
  
      res.json(updatedMember);
    } catch (error) {
      res.status(500).json({ message: 'Error updating community member', error });
    }
  });
  
  // DELETE route to delete a community member by ID
  router.delete('/community-members/:id', async (req, res) => {
    try {
      const memberId = req.params.id;
      const deletedMember = await CommunityMember.findByIdAndDelete(memberId);
  
      if (!deletedMember) {
        return res.status(404).json({ message: 'Community member not found' });
      }
  
      res.json({ message: 'Community member deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting community member', error });
    }
  });

module.exports = router;
