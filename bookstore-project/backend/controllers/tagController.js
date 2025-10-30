const tagModel = require('../models/tagModel');

async function getTags(req, res) {
  try {
    const tags = await tagModel.getAllTags();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addTag(req, res) {
  try {
    const { name } = req.body;
    const id = await tagModel.createTag(name);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTag(req, res) {
  try {
    const id = req.params.id;
    await tagModel.deleteTag(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function renameTag(req, res) {
  try {
    const id = req.params.id;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'New tag name is required' });
    }

    const affectedRows = await tagModel.updateTag(id, name);
    
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json({ success: true });
  } catch (err) {
    // Handle duplicate entry error (MySQL error code 1062)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Tag name already exists' });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getTags, addTag, deleteTag, renameTag };