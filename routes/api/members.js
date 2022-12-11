const members = require('../../Members');
const express = require('express');
const uuid = require('uuid');
const router = express.Router();

// Route gets ALL members
router.get('/', (req, res) => res.json(members));

//Get single memeber
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: 'Member does not exist' });
  }
});

//Create Member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  members.push(newMember);
  res.json(members);
});

//Update Member
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: 'Member updated: ', member });
      }
    });
  } else {
    res.status(400).json({ msg: 'Member does not exist' });
  }
});

//Delete Member
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Member Deleted',
      members: members.filter((member) => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: 'Member does not exist' });
  }
});

module.exports = router;
