export function Users(req, res) {
    const meta =  {result: "success"};
    const users = [];
    res.status(200).json({meta, users});
}

export function RegisterUser(req, res) {
    const {usersService} = this.dependencies;
    try {
        const user = usersService.registerUser(req.body)
        const meta = {result: 'success', tx: usersService.lastTx.tx_data};
        res.status(201).json({meta, user});
    } catch (e) {
        const meta = {result: 'error', error: e};
        console.error(e)
        res.status(500).json({meta, message: e.getMessageText()});
    }
}

export function GetUser(req, res) {
    const {usersService} = this.dependencies;
    try {
        const user = usersService.getUser(req.params.id)
        const meta = {result: 'error', message: 'user not found'};
        if (user) {
            const meta = {result: 'success'};
            return res.status(200).json({meta, user});
        }
        return res.status(404).json({meta});
    } catch (e) {
        const meta = {result: 'error', error: e};
        console.error(e)
        res.status(500).json({meta, message: e.getMessageText()});
    }
}