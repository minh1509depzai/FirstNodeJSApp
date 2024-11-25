//API Handler
let users = [
    {
        name: "Minh",
        age: 24
    },
    {
        name: "Tinh",
        age: 22
    },
    {
        name: "Binh",
        age: 29
    }
];

exports.getUserAll = (req, res) => {
    res.send(JSON.stringify(users))
};

exports.deleteAllUser = (req, res) => {
    console.log("Client deleted users");
    users = [];
};

exports.getUserByID = (req, res) => {
    let id = req.params.id;

    if (id <= 0 && id > users.length)
    {
        res.status(404).send("Index invalid");
    }
    else
    {
        res.status(200).send(JSON.stringify(users.at(id)))
    }
};

exports.deleteUserByID = (req, res) => {
    let id = req.params.id;
    
    if (id <= 0 && id > users.length)
    {
        res.status(404).send("Index invalid");
        return;
    }
    
    users.delete(id);
};