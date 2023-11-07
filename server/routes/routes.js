
const {Router} = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer')
const Admin = require('../models/admin')



const router = Router()

//CREATE ADMIN
router.post('/admin', async (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let userType = req.body.userType
  
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const record = await Admin.findOne({ email:email });
  
    if (record) {
        return res.status(400).send({
          message: "Email is already registered",
        });
      } else {
  
    const admin = new Admin({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword,
        userType:userType,
    })
  
    const result = await admin.save();
  
    //JWT 
  
    const { _id } = await result.toJSON();
  
    const token = jwt.sign({ _id: _id }, "secret");
  
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  
    res.send({
        message: "success"
    })
  }
  
  });

//Create Customer

router.post('/register', async (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let userType = req.body.userType
    let contactNum = req.body.contactNum
    let houseNo = req.body.houseNo
    let street = req.body.street
    let baranggay = req.body.baranggay
    let city = req.body.city
    let province = req.body.province
    let zip = req.body.zip



    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).send({
          message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character."
      });
  }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const record = await Customer.findOne({ email:email });

    if (record) {
        return res.status(400).send({
          message: "Email is already registered",
        });
      } else {

    const customer = new Customer({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword,
        userType:userType,
        contactNum: contactNum,
         houseNo : houseNo,
         street : street,
         baranggay : baranggay,
         city : city,
         province : province,
         zip : zip,
        })

    const result = await customer.save();
      

      
  const { _id } = await result.toJSON();

  const token = jwt.sign({ _id: _id }, "secret");

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.send({
      message: "success"
  })
}
});

//LOGIN

router.post('/login', async (req, res) => {
    const customer = await Customer.findOne({email:req.body.email})
    const admin = await Admin.findOne({email:req.body.email})

    if(!customer){

        if(!admin){ 
            return res.status(404).send({
            message:"User Not Found!!!"
          })}

          else if (!(await bcrypt.compare(req.body.password, admin.password))){ 
            return res.status(400).send ({//c// pag di valid pass this one
              message:"Password is Incorrect"
            });
        }

        const token = jwt.sign({ // but if hindi mali, then sign token
            _id: admin._id, 
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            userType: admin.userType
          
          },"secret") 
        
          res.cookie("jwt", token,{
            httpOnly:true,
            maxAge:3*24*60*60*1000,
          })
        
          res.send({
            message:"success"
          })
    }

     else if(!(await bcrypt.compare(req.body.password, customer.password))){ 
        return res.status(400).send ({
          message:"Password is Incorrect",
        });
      }

    else {const token = jwt.sign({
        _id: customer._id, 
        userType:customer.userType,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        contactNum: customer.contactNum,
        houseNo: customer.houseNo, 
        street: customer.street,
        baranggay: customer.baranggay,
        city: customer.city,
        province: customer.province,
        zip: customer.zip,
        

      },"secret") //but this if valid
    
      res.cookie("jwt", token,{
        httpOnly:true,
        maxAge:3*24*60*60*1000,
      })
    
      res.send({
        message:"success",
        
      })}  
});

// LOGIN VERIFICATION
router.get('/current', async (req, res) => {
  try {
      const cookie = req.cookies['jwt'];
      const claims = jwt.verify(cookie, "secret");

      if (!claims) {
          return res.status(401).send({
              message: "unauthenticated"
          });
      }

      let user;

      if (claims.userType === 'customer') {
          user = await Customer.findOne({ _id: claims._id });
      } else if (claims.userType === 'admin') {
          user = await Admin.findOne({ _id: claims._id });
      }
   
      if (!user) {
          return res.status(404).send({
              message: "User not found!"
          });
      }

      const { password, ...data } = await user.toJSON();
      res.send(data);
  } catch (err) {
      return res.status(401).send({
          message: 'unauthenticated'
      });
  }
});



module.exports = router
