const { Employee, Department } = require("../models");


const createEmploye  = async (req,res)=>{
    try {
        const { name, departmentId } = req.query;
        const idCheck = await Department.findByPk(departmentId);

        //Initialy checking Id existing Department
        if(!idCheck)
            return res.status(400).send('Invalid departmentId.');
        //validation
        if (!name || !departmentId) 
            return res.status(400).json({ message: 'Name and Department ID are required!' });

        //Validating for duplicates
        const employeeDuplicates = await Employee.findOne({ where:{name:name,  departmentId: departmentId} });
        if(!employeeDuplicates){
            let createdEmployee = await Employee.create({name:name, departmentId:departmentId});
            return res.status(200).json({ message: 'Employee created successfully!', employee: createdEmployee });
        }
        return res.status(400).json({ message: 'Duplicate Entry!' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred!' });
    }
}



module.exports = createEmploye