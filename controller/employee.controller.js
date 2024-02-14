const { Employee, Department } = require("../models");
const bcrypt = require('bcryptjs');

const registerEmploye = async(req,res)=>{
    try {
        const { name,email,password } = req.query;
        if (!name || !email || !password) 
            return res.status(400).json({ message: 'Required Credentials!' });

        //Validating for duplicates
        const employeeDuplicates = await Employee.findOne({ where:{name:name,  email: email} });
        // console.log("employeeDuplicates",employeeDuplicates)
        if(!employeeDuplicates){
            let createdEmployee = await Employee.create({name:name, email:email,password:password});
            return res.status(200).json({ message: 'Employee created successfully!', employee: createdEmployee });
        }
        return res.status(400).json({ message: 'Duplicate Entry!' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred!' });  
    }
}

const createEmploye  = async (req,res)=>{
    try {
        const { name, departmentId,email,password } = req.query;
        console.log( name, departmentId,email,password )
        const idCheck = await Department.findByPk(departmentId);
        //Initialy checking Id existing Department
        if(!idCheck)
            return res.status(400).send('Invalid departmentId.');
        //validation
        if (!name || !departmentId || !email || !password) 
            return res.status(400).json({ message: 'Name and Department ID are required!' });

        //Validating for duplicates
        let user = await Employee.findOne({ where:{name:name,  email: email} });
        if(!user){
            // let createdEmployee = await Employee.create({where:{name:name, departmentId:departmentId}});
            return res.status(200).json({ message: 'User Not FOUND!' });
        }
        bcrypt.compare(password, user.dataValues.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Auth failed' });
            }
            if (isMatch) {
                // Passwords match, you can generate token or do whatever you like here
                user.update({
                    departmentId:departmentId
                })
                return res.status(200).json({ message: 'Authentication successful' });
                // return res.status(400).json({ message: "Created Succefully!",  });
            } else {
                // Passwords don't match
                return res.status(401).json({ message: 'Auth failed. Incorrect password.' });
            }
          });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred!',error });
    }
}



module.exports = {createEmploye,registerEmploye}