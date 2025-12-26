// Shared in-memory storage for users
// In production, replace this with a database

export interface User {
  email: string;
  password: string;
  userType: string;
  name?: string;
}

// Default test users for demo purposes
const users: User[] = [
  {
    email: "annamuduprajol@gmail.com",
    password: "Prajol@2000",
    userType: "user",
    name: "Annamudu Prajol"
  },
  {
    email: "manager@estospaces.com",
    password: "Manager@123",
    userType: "manager",
    name: "Property Manager"
  },
  {
    email: "user@test.com",
    password: "Test@123",
    userType: "user",
    name: "Test User"
  }
];

export function createUser(user: User): void {
  users.push(user);
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function userExists(email: string): boolean {
  return users.some((u) => u.email === email);
}


