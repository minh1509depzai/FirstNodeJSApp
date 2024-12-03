const fs = require('fs')
const UserDataBase = require('./../models/UserModel')
const Process = require('process')

//Extract data list from provided file path.
const dataList = JSON.parse(fs.readFileSync(Process.argv[3]))
const perform = Process.argv[2]
if (perform === 'import')
{
    UserDataBase.create(dataList).then(() => {
        Process.exit()
    })
}
else if (perform === 'delete')
{
    UserDataBase.deleteMany().then(() => {
        Process.exit()
    })
}
else
{
    console.log("Invalid arguments");
}

