export interface BaseUser {
  id: string;
  email: string;
  phone: string;
  createdAt?: Date;
}

export type Driver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  role: 'driver';
};

export interface BranchAdmin {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;
  role: string;
}
