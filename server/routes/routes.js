
const {Router} = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer')
const Admin = require('../models/admin')
const Product = require('../models/product')
const OrderForm = require('../models/orderform')




const router = Router()

//CREATE ADMIN
router.post('/admin', async (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let size = req.body.password
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
            sameSite: 'None',
            

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

  // TO GET DETAILS FOR LOGGED IN CUSTOMER
  router.get('/customer', async (req, res) => {
    try{
      const cookie = req.cookies['jwt']
      const claims = jwt.verify(cookie,"secret")

      if(!claims){
        return res.status(401).send({
          message: "unauthenticated"
        })
      }

      const customer = await Customer.findOne({_id:claims._id})
      const {password,...data} = await customer.toJSON()

      res.send(data)

    }
    catch(err){
      return res.status(401).send({
        message:'unauthenticated'
      })
    }
});

//LOGOUT
router.post('/logout', (req,res) =>{
  res.cookie("jwt", "", {maxAge:0})

  res.send({
    message:"success"
  });
});


// CREATE PRODUCT
router.post('/create', async (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let colors = req.body.colors
  let sizes = req.body.sizes
  let designs = req.body.designs
  let price = req.body.price
  let stocks = req.body.stocks
  let category = req.body.category
  let image = req.body.image
  let thumbnail = req.body.thumbnail

  const product = new Product({
      title:title,
      description:description,
      colors:colors,
      sizes: sizes,
      designs:designs,
      price:price,
      stocks:stocks,
      category:category,
      image:image,
      thumbnail:thumbnail,

  })

  const result = await product.save();
  res.status(201).json({ message: 'product created successfully' });
}

);

//Get All Products

router.get('/getproducts', async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
}  );

//Specific Product

router.get('/product/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

//Update Product

router.patch('/product/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const product = await Product.findByIdAndUpdate(_id,body);
    if (!product) {
      return res.status(404).send({ error: ' not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


// Sort Product by Category
router.get('/getproducts/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const product = await Product.find({ category: category });
    if (!product || product.length === 0) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Sort Product by Price - Ascending

router.get('/getproducts/price/ascending', async (req, res) => {
  try {
    const product = await Product.find().sort({price:1});
    if (!product || product.length === 0) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Sort Product by Price - Descending

router.get('/getproducts/price/descending', async (req, res) => {
  try {
    const product = await Product.find().sort({price:-1});
    if (!product || product.length === 0) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Sort Product by Color

router.get('/getColor/:COLOR', async (req, res) => {
  try {
    const COLOR = req.params.COLOR;
    console.log('Requested Color:', COLOR);

    const product = await Product.find({ colors: COLOR });


    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Sort Product by Size

router.get('/getSize/:SIZE', async (req, res) => {
  try {
    const SIZE = req.params.SIZE;

    const product = await Product.find({ sizes: SIZE });


    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Sort Product by Date

router.get('/newest', async (req, res) => {
  try {
    const product = await Product.find().sort({dateCreated:-1}).limit(4);
    if (!product || product.length === 0) {
      return res.status(404).send({ error: 'Products not found' });
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Post Order

router.post('/orderForm', async (req, res) => {
  let customerID = req.body.customerID
  let productID = req.body.productID
  let isCheckedOut = req.body.isCheckedOut
  let isDelivered = req.body.isDelivered
  let isCancelled = req.body.isCancelled
  let color = req.body.color
  let design = req.body.design
  let size = req.body.size
  let quantity = req.body.quantity
  let total = req.body.total
  let modeOfPayment = req.body.modeOfPayment
  let note = req.body.note

  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let contactNum = req.body.contactNum
  let houseNo = req.body.houseNo
  let street = req.body.street
  let baranggay = req.body.baranggay
  let city = req.body.city
  let province = req.body.province
  let zip = req.body.zip

  let title = req.body.title
  let category = req.body.category
  let price = req.body.price



  const orderform = new OrderForm({
      customerID:customerID,
      productID:productID,
      isCheckedOut:isCheckedOut,
      isDelivered: isDelivered,
      isCancelled:isCancelled,
      color:color,
      design:design,
      size:size,
      quantity:quantity,
      total:total,
      modeOfPayment:modeOfPayment,
      note:note,

      firstName:firstName,
      lastName:lastName,
      contactNum: contactNum,
       houseNo : houseNo,
       street : street,
       baranggay : baranggay,
       city : city,
       province : province,
       zip : zip,

        title : title,
   category : category,
   price : price

  })

  const result = await orderform.save();
  res.status(201).json({ message: 'order created successfully' });
}


);

router.get('/cart/:customerID', async (req, res) => {
  try{

    const customerID = req.params.customerID;
    // const cookie = req.cookies['jwt']
    // const claims = jwt.verify(cookie,"secret")

    // if(!claims){
    //   return res.status(401).send({
    //     message: "unauthenticated"
    //   })
    // }

    const onCart = await OrderForm.find({customerID:customerID})
    // const {...data} = await onCart.toJSON()

    res.send(onCart)

  }
  catch(err){
    return res.status(401).send({
      message:'not found'
    })
  }
});

router.get('/checkout/:id', async (req, res) => {
  try{

    const _id = req.params.id;
    // const cookie = req.cookies['jwt']
    // const claims = jwt.verify(cookie,"secret")

    // if(!claims){
    //   return res.status(401).send({
    //     message: "unauthenticated"
    //   })
    // }

    const checkout = await OrderForm.findById({_id:_id})
    // const {...data} = await onCart.toJSON()

    res.send(checkout)

  }
  catch(err){
    return res.status(401).send({
      message:'not found'
    })
  }
});



router.patch('/orderForm/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const orderForm = await OrderForm.findByIdAndUpdate(_id,body);
    if (!orderForm) {
      return res.status(404).send({ error: ' not found' });
    }
    res.send(orderForm);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


router.get('/orderstatus/:customerID', async (req, res) => {
  try{

    const _id = req.params.customerID;

    const checkout = await OrderForm.find({$and:[{isCheckedOut:true},{customerID:_id}]})

    res.send(checkout)

  }
  catch(err){
    return res.status(401).send({
      message:'not found'
    })
  }
});





module.exports = router
