import { api, body, endpoint, request, response } from "@airtasker/spot";

@api({ name: "my-api", version: "1.0.0" })
class Api {}

@endpoint({
    method: "GET",
    path: "/users",
})
class Users {
    @request
    request() {}

    @response({ status: 200 })
    successfulResponse(@body body: UsersResponse) {}
}

@endpoint({
    method: "POST",
    path: "/users",
})
class RegisterUser {
    @request
    request(@body body: RegisterUserRequest) {}

    @response({ status: 201 })
    successfulResponse(@body body: RegisterUserResponse) {}
}

interface MetaData {
    result: string;
    error?: string;
}

interface Person {
    firstName: string;
    lastname: string;
    dob: string;
    gender?: string;
    address?: Address;
    email: string;
}

interface User extends Person {
    userId: string
}

interface Address {
    name: string;
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    region: string;
    country: string;
}

interface UsersResponse {
    meta: MetaData;
    user: User[];
}

interface RegisterUserRequest extends Person {}

interface RegisterUserResponse {
    meta: MetaData;
    user: User;
}

// Never used but suppresses unused class messages
export {Api, Users, RegisterUser, body}
