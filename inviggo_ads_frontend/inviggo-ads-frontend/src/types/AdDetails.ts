export interface AdDetails {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    city: string;
    username: string;
    createdAt: string;
    isDeleted: boolean;
}

export interface CreateAdDTO {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    city: string;
} 