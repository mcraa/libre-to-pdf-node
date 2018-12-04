var express = require('express');
var toPdf = require('office-to-pdf');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

fs.exists(path.join(__dirname, 'uploads'), function(exists) {
  if (!exists){
    fs.mkdir('uploads', null, function(err) { if(err) { console.log(err) } });
  }
})

fs.exists(path.join(__dirname, 'downloads'), function(exists) {
  if (!exists){
    fs.mkdir('downloads', null, function(err) { if(err) { console.log(err) } });
  }
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

var upload = multer({storage: storage})

var app = express()
 
app.get('/', function (req, res) {
  res.send('API version 0.0.1')
});

app.post("/topdf", upload.single('document'), function(req, res) {
  var wordBuffer = fs.readFileSync(req.file.path)
  let now = Date.now();

  toPdf(wordBuffer).then(
    function(pdfBuffer) {
      fs.writeFileSync(path.join(__dirname, 'downloads', req.file.originalname + now + ".pdf"), pdfBuffer)
      res.sendFile(
        path.join(__dirname, 'downloads', req.file.originalname + now + ".pdf"), 
        {}, 
        function(err) { 
          if(err) { 
            console.log(err)
          } else {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(path.join(__dirname, 'downloads', req.file.originalname + now + ".pdf"))
          }
        }
      );
    }, 
    function(err) {
      console.log(err)
    }
  )
})
 
app.listen(process.env.PORT || 3000);