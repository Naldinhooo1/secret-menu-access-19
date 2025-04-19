import { User, CartItem } from "@/types";

const USER_STORAGE_KEY = 'secret-menu-users';
const CURRENT_USER_KEY = 'secret-menu-current-user';
const CART_STORAGE_KEY = 'secret-menu-cart';

// Re-export User type for usage in other modules
export type { User };

// User storage functions
export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

export const getUsers = (): User[] => {
  const usersString = localStorage.getItem(USER_STORAGE_KEY);
  return usersString ? JSON.parse(usersString) : [];
};

export const getUserByName = (name: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.name.toLowerCase() === name.toLowerCase());
};

export const getUserByPassword = (password: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.password === password);
};

export const setCurrentUser = (userId: string): void => {
  localStorage.setItem(CURRENT_USER_KEY, userId);
};

export const getCurrentUser = (): User | undefined => {
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return undefined;
  
  const users = getUsers();
  return users.find(user => user.id === userId);
};

// Cart storage functions
export const getCartItems = (): CartItem[] => {
  const cartString = localStorage.getItem(CART_STORAGE_KEY);
  return cartString ? JSON.parse(cartString) : [];
};

export const saveCartItems = (items: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const ADMIN_PASSWORD = 'ADMIN123'; // Senha fixa para acesso administrativo

export const isAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD;
};
