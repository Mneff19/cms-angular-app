const Sequence = require('../models/sequence');

class SequenceGenerator {
  constructor() {
    this.sequenceId = null;
    this.maxDocumentId = null;
    this.maxMessageId = null;
    this.maxContactId = null;

    Sequence.findOne().exec()
      .then(sequence => {
        this.sequenceId = sequence._id;
        this.maxDocumentId = sequence.maxDocumentId;
        this.maxMessageId = sequence.maxMessageId;
        this.maxContactId = sequence.maxContactId;
      })
      .catch(err => {
        console.error('An error occurred', err);
      });
  }

  nextId(collectionType) {
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'documents':
        this.maxDocumentId++;
        updateObject = { maxDocumentId: this.maxDocumentId };
        nextId = this.maxDocumentId;
        break;
      case 'messages':
        this.maxMessageId++;
        updateObject = { maxMessageId: this.maxMessageId };
        nextId = this.maxMessageId;
        break;
      case 'contacts':
        this.maxContactId++;
        updateObject = { maxContactId: this.maxContactId };
        nextId = this.maxContactId;
        break;
      default:
        return -1;
    }

    Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject }).exec()
      .catch(err => {
        console.error("nextId error =", err);
        return null;
      });

    return nextId;
  }
}

module.exports = new SequenceGenerator();
