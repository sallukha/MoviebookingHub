export interface SignupPayload {
name: string;
email: string;
password: string;
}

export interface SignupResponse {
success: boolean;
message: string;
}

export interface LoginPayload {
email: string;
password: string;
}
