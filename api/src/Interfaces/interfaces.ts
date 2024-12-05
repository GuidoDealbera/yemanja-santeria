export interface JWTPayload {
  id: string;
  email: string | undefined;
};

export interface UserAttributes {
  id: string;
  googleId: string;
  name: string | null;
  email: string | undefined;
  password: string;
  phone: string | null;
  address: string | null;
  profilePhoto: string | undefined;
  isAdmin: boolean;
  isActive: boolean;
}

export interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
}
