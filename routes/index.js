const router = require('express').Router();
DocumentFactory = require('../models/Document.js');


router.get('/', (req, res) => {
    res.send('Welcome to the dashboard API');
});

router.get('/getDocument', async (req, res) => {

    let documentId = req.query.documentId;
    let doc= await DocumentFactory.load(documentId);

    res.send(JSON.stringify(doc));

});

router.get('/getAllDocuments', async (req, res) => {

    let docs = await DocumentFactory.loadAll();

    res.type('json');
    res.send(JSON.stringify(docs));

});

router.get('/getDocumentContent', async (req, res) => {
    let documentId = req.query.documentId;
    let doc = await DocumentFactory.load(documentId);
   
    doc.fetchContent();
    console.log(doc.content);

    res.send(JSON.stringify(doc));
});

router.put('/addItem', async (req, res) => {
    
    let doc = DocumentFactory.create(req.body);
    doc.save();

    res.send(JSON.stringify(doc));
});

module.exports = router;
