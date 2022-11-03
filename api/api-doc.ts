import {api, body, endpoint, pathParams, request, response, securityHeader, String} from "@airtasker/spot";

@api({name: "DarkSampleAPI", version: "1.0.0"})
class Api {
    @securityHeader
    "Authorization": String;
}

@endpoint({
    method: "GET",
    path: "/users/:id"
})
class GetUser {
    @request
    request(
        @pathParams
            pathParams: {
            /** Unique user identifier */
            id: String;
        }
    ) {}

    @response({ status: 200 })
    successResponse(@body body: UserResponse) {}

    @response({ status: 404 })
    notfoundResponse(@body body: ApiErrorResponse) {}
}

@endpoint({
    method: "GET",
    path: "/users",
})
class Users {
    @request
    request() {
    }

    @response({status: 200})
    successfulResponse(@body body: UsersResponse) {
    }
}

@endpoint({
    method: "POST",
    path: "/users",
})
class RegisterUser {
    @request
    request(@body body: RegisterUserRequest) {
    }

    @response({status: 201})
    successfulResponse(@body body: RegisterUserResponse) {
    }
}

interface MetaData {
    result: String;
    error?: String;
}

interface Person {
    firstName: String;
    lastname: String;
    dob: String;
    gender?: String;
    address?: Address;
    email: String;
}

interface User extends Person {
    userId: String,
    password: String
}

interface Address {
    name: String;
    line1: String;
    line2: String;
    city: String;
    postcode: String;
    region: String;
    country: String;
}

interface UserResponse {
    meta: MetaData;
    user: User;
}

interface UsersResponse {
    meta: MetaData;
    users: User[];
}

interface RegisterUserRequest extends Person {
}

interface RegisterUserResponse {
    meta: MetaData;
    user: User;
}

interface ApiErrorResponse {
    meta: MetaData;
    message: String;
}

// Never used but suppresses unused class messages
export {Api, GetUser, Users, RegisterUser, body, pathParams}
