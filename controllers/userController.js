const fs = require('fs');


module.exports.getAllUsers = (req, res, next) => {

    // find all users from json file
    const users = require("./userData.json");
    const limit = req.query;


    res.status(200).send({
        success: true,
        messages: users.length ? "All users found" : "No user found",
        data: users.length && users.slice(0, limit.limit)
    });
    // res.status(500).send({
    //     success: false,
    //     error: "Internal server error",

    // });
};
module.exports.getOneUser = (req, res, next) => {

    // find all users from json file
    const users = require("./userData.json");
    const result = Math.floor((Math.random() * users.length) + 1);

    const foundUser = users.find(user => Number(result) === Number(user.id));

    res.status(200).send({
        success: true,
        messages: "single user found",
        data: foundUser
    });
    // res.status(500).send({
    //     success: false,
    //     error: "Internal server error",

    // });
};

module.exports.addUser = (req, res, next) => {

    // find all users from json file
    const users = require("./userData.json");

    //find new user from query param
    const newUser = req.query;

    if (newUser.id && newUser.gender && newUser.name && newUser.contact && newUser.address && newUser.photoURL) {
        // save data in json file
        const oldData = fs.readFileSync(__dirname + '/userData.json', 'utf8');
        console.log(oldData);
        const myObject = JSON.parse(oldData);
        myObject.push(newUser);
        const newData = JSON.stringify(myObject);
        fs.writeFile(__dirname + '/userData.json', newData, err => {
            // error checking
            if (err) throw err;

            console.log("New data added");
        });
        res.status(200).send({
            success: true,
            messages: "A new user is created successfully",
            data: newUser
        });
    }
    else {
        res.status(400).send({
            success: false,
            messages: "Please fill the required field",

        });
    }


    // res.status(500).send({
    //     success: false,
    //     error: "Internal server error",

    // });
};


module.exports.deleteUser = (req, res, next) => {

    // find all users from json file
    let users = require("./userData.json");
    // get id from params
    const { id } = req.params;
    let a = [];
    users.forEach(function (obj) {
        a.push(obj.id);
    })
    // console.log(a);

    if (a.includes(Number(id))) {


        const deleteUser = users.filter(user => user.id !== Number(id));


        const oldData = fs.readFileSync(__dirname + '/userData.json', 'utf8');

        let myObjects = JSON.parse(oldData);

        const newMyObject = myObjects.filter(myObject => myObject.id !== Number(id));
        // console.log(newMyObject)
        const newData = JSON.stringify(newMyObject);
        fs.writeFile(__dirname + '/userData.json', newData, err => {
            // error checking
            if (err) throw err;

            console.log("New data added");
        });


        res.status(200).send({
            success: true,
            messages: "User deleted",
            data: deleteUser
        });
    }
    else {
        res.status(400).send({
            success: false,
            messages: "User doesn't exist",

        });
    }
};


