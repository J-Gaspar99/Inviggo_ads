export interface RegisterDTO {
    username: string;
    password: string;
    phoneNumber: string;
}

export interface AuthResponse {
    id: string;
    username: string;
    phoneNumber?: string;
    registrationDate: string;
    token: string;
} 