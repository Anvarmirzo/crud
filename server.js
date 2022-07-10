const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/crud'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/crud/index.html'));
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`CRUD is listening on port ${port}...`));
