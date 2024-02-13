const { Department } = require("../models");


const createDepartment = async(req,res)=>{
    try {
        const { name } = req.query;
        
        //validation
        if (!name)
            return res.status(400).json({ message: 'Department Name are required!' });

        //validating for duplicates
        const departmentName = await Department.findOne({ where:{name:name} });
        if(!departmentName) {
           const newDepartment = await Department.create({ name });
           return res.status(200).json({ message: 'Departmenmt created successfully!', Department: newDepartment });
        } 
        return  res.status(400).json({ message: 'Department Name Existing!' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred!' });
    }
}



module.exports = createDepartment