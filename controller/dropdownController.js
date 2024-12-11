

const getScholar = async (req,res) => {
    const sch = req.params;
    res.send("dropdown links working");

};

const getDept = async (req,res) => {
    const dep = req.params;

}

const getSchool = async (req,res) => {
    const schol = req.params;

}

const hScholar = async (req,res) => {
    

}

const citeScholar = async (req,res) => {
    

}

const hDept = async (req,res) => {
    

}

const citeDept = async (req,res) => {
    

}

const hSchool = async (req,res) => {
    

}

const citeSchool = async (req,res) => {
    

}

export {getScholar, getDept, getSchool, hSchool, citeSchool, hScholar, citeScholar, hDept, citeDept};