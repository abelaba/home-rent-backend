const router = require('express').Router();
const Rental = require('../model/Rental');
const User = require('../model/User');
const { rentalValidation } = require('../validation')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');
const formidable = require("formidable");


// * FOR HANDLING IMAGE UPLOAD
const fs = require('fs');
const path = require('path');



// * ADD RENTAL PROPERTY
router.post('/add', verify, upload.single('rentalImage') , async (req, res) => {

    const form = formidable.IncomingForm();
    // console.log(form);
    form.multiples = true;
    form.maxFileSize = 50 * 1024 * 1024; // 5MB
    // console.log(form);

    form.parse(req, async (err, fields, files) => {
        console.log(fields.address);
        const { error } = rentalValidation(fields);
        if (error) {
            console.log(error)
            return res.status(400).send(error.details[0].message)};

        const findUser = await User.findOne({ _id: req.user });
        if(!findUser) return res.status(404).send("User not Found");

        var oldPath = files.rentalImage.path;
        var newFileName = "rentalImage"+ Date.now() + ".jpg";
        var newPath = path.join(__dirname, '../uploads')+ '/' + newFileName;
        console.log(newFileName);
        console.log(fields.address);
        var rawData = fs.readFileSync(oldPath);

        // * CREATE A NEW RENTAL PROPERTY
        const rental = new Rental({
            userId: findUser._id,
            address: fields.address,
            rentalImage: `uploads/${newFileName}`
        });

        try {
            fs.writeFile(newPath, rawData, function(err){
                if(err) {
                    console.log(err);
                    return res.statusCode(500).send("Couldn't write file");
                }
            });
            const savedRental = await rental.save();
            console.log("Success");
            res.status(201).send({ rental: rental._id });
        } catch (err) {
            console.log("error");
            res.status(400).send(err);
        }

    });
});


// * VIEW ALL RENTAL PROPERTIES
router.get('/viewAll', async (req, res) => {

    const query = await Rental.find();
    if(query.length!=0) return res.send(query);

    res.status(404).send("Properties not found.")

});


// * VIEW LOGGED IN USER RENTAL PROPERTIES
router.get('/view', verify , async (req, res) => {

    const query = await Rental.find({ userId: req.user._id });
    if(query.length!=0) return res.send(query);

    res.status(404).send("Property not found.")

});

// * VIEW SINGLE RENTAL PROPERTY BY ID
router.get('/view/:id', async (req, res) => {

    
    try{
        // * CHECK IF ID PARAMETER IS CORRECT
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Invalid ID");

        const query = await Rental.find({_id:req.params.id});
        if(query.length!=0) return res.send(query);

        else return res.status(404).send("Property not found.")

    }catch(err){
        res.status(400).send(err);

    }

});




// * UPDATE RENTAL PROPERTY 
router.put('/update/:id', verify, upload.single('rentalImage'), async (req, res) => {

    // * LETS VALIDATE THE DATA
    const { error } = rentalValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // * CHECK IF ID PARAMETER IS CORRECT
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Invalid ID");

    const rental = { address: req.body.address, rentalImage: req.file.path};
    var query = await Rental.findByIdAndUpdate(req.params.id, rental);
    if(!query) return res.status(404).send("Property not found");
    fs.unlink(query.rentalImage,(err)=>{
        if(err) throw err;
        console.log("File deleted "+ query.rentalImage);
    });
    query = await Rental.findById(req.params.id);
    res.status(201).send(query);

    
});


// * DELETE RENTAL PROPERTY
router.delete('/delete/:id', verify, async (req, res) => {

    console.log("Delete clicked");

    // * CHECK IF ID PARAMETER IS CORRECT
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Invalid ID");

    var query = await Rental.findByIdAndDelete(req.params.id);
    if(!query) return res.status(404).send("Property not found");
    fs.unlink(query.rentalImage, (err)=>{
        if(err) throw err;
        console.log("File deleted "+ query.rentalImage);
    });
    res.status(204);
  
});



module.exports = router;