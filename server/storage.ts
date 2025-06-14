import { users, tokens, type User, type InsertUser, type Token, type InsertToken } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createToken(token: InsertToken): Promise<Token>;
  getToken(id: number): Promise<Token | undefined>;
  getTokensByWallet(walletAddress: string): Promise<Token[]>;
  updateToken(id: number, updates: Partial<Token>): Promise<Token | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tokens: Map<number, Token>;
  private currentUserId: number;
  private currentTokenId: number;

  constructor() {
    this.users = new Map();
    this.tokens = new Map();
    this.currentUserId = 1;
    this.currentTokenId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const id = this.currentTokenId++;
    const token: Token = {
      ...insertToken,
      id,
      tokenAddress: null,
      transactionId: null,
      status: "pending",
      createdAt: new Date(),
    };
    this.tokens.set(id, token);
    return token;
  }

  async getToken(id: number): Promise<Token | undefined> {
    return this.tokens.get(id);
  }

  async getTokensByWallet(walletAddress: string): Promise<Token[]> {
    return Array.from(this.tokens.values()).filter(
      (token) => token.creatorWallet === walletAddress,
    );
  }

  async updateToken(id: number, updates: Partial<Token>): Promise<Token | undefined> {
    const token = this.tokens.get(id);
    if (!token) return undefined;
    
    const updatedToken = { ...token, ...updates };
    this.tokens.set(id, updatedToken);
    return updatedToken;
  }
}

export const storage = new MemStorage();
