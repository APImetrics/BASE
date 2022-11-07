const usersService = {
    registerUser(user) {
        const meta = { result: "success" };
        console.log("userService", JSON.stringify(user));
        return { meta, user };
    },
};

export default usersService;
