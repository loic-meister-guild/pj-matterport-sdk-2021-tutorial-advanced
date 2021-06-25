const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
app.get('/node', (req, res) => {
    res.sendFile(`${__dirname}/public/index-node.html`);
});
app.get('/react', (req, res) => {
    res.sendFile(`${__dirname}/public/index-react.html`);
});
app.get('/cursor', (req, res) => {
    res.sendFile(`${__dirname}/public/index-cursor.html`);
});
app.listen(8000, () => {
    console.log('Application listening on port 8000!');
});