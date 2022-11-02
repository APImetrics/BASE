export function Users(req, res) {
    const meta =  {result: "success"};
    const users = [];
    res.status(200).json({meta, users});
}

export function RegisterUser(req, res) {
    const {usersService} = this.dependencies;
    console.log("req", req);
    res.status(201).json(usersService.registerUser(req.body));
}
