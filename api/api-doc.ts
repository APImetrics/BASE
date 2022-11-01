import { api, body, endpoint, request, response } from "@airtasker/spot";

@api({ name: "my-api", version: "1.0.0" })
class Api {}

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
    firstname: string;
    lastname: string;
    dob: string;
    address?: Address;
    username: string;
    email: string;
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

interface RegisterUserRequest extends Person {}

interface RegisterUserResponse {
    meta: MetaData;
    user: Person;
}

// Never used but supresses unused class messages
() => [Api, RegisterUser, body];
