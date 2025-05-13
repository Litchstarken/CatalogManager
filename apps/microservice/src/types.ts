export interface Context {
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    }
};