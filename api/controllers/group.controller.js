const Group = require('../models/Group');

const addGroup = async (req, res) => {
  const { groupSpec, groupTitle, dateStart, dateFinish } = req.body;

  try {
    const group = await Group.create({
      groupSpec: groupSpec,
      groupTitle: groupTitle,
      dateStart: Date(dateStart),
      dateFinish: Date(dateFinish),
      strDateStart: dateStart,
      strDateFinish: dateFinish,
    });
    return res.json({
      groupId: group.id,
      groupSpec: group.groupSpec,
      groupTitle: group.groupTitle,
      dateStart: group.dateStart,
      dateFinish: group.dateFinish,
      strDateStart: group.strDateStart,
      strDateFinish: group.strDateFinish
    });
  } catch
  {
    return res.status(500).json({ mass: 'Error adding data to groups' });
  }
};

const updateGroup = async (req, res) => {
  const { groupId, groupSpec, groupTitle, dateStart, dateFinish } = req.body;
  try {
    const group = await Group.findOneAndUpdate({ _id: groupId }, {
      $set: {
        groupSpec: groupSpec,
        groupTitle: groupTitle,
        dateStart: new Date(dateStart),
        dateFinish: new Date(dateFinish),
        strStart: dateStart,
        strFinish: dateFinish,
      }
    }, { returnOriginal: false });
    return res.json(group);
  } catch
  {
    return res.status(500).json({ mass: 'Error updating data to groups' });
  }
};

const delGroup = async (req, res) => {
  const { groupId } = req.body;
  try {
    const group = await Group.findByIdAndRemove(groupId);
    return res.json(group);
  } catch
  {
    return res.status(500).json({ mass: 'Error deleting data to groups' });
  }
};
const getGroupId = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id).lean();
    return res.json(group);
  } catch
  {
    return res.status(500).json({ mass: 'Error not find data to group' });
  }
};

const getGroupAll = async (req, res) => {
  try {
    const group = await Group.find().lean();
    return res.json(group);
  } catch
  {
    return res.status(500).json({ mass: 'Error not find data to groups' });
  }
};

module.exports = {
  addGroup, delGroup, updateGroup, getGroupId, getGroupAll
};
