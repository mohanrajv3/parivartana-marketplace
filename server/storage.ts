import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  transactions, type Transaction, type InsertTransaction,
  contactAccess, type ContactAccess, type InsertContactAccess,
  reviews, type Review, type InsertReview
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(uid: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product operations
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsBySeller(sellerId: number): Promise<Product[]>;
  getRecentProducts(limit: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, updates: Partial<Product>): Promise<Product | undefined>;
  markProductAsSold(id: number): Promise<Product | undefined>;
  
  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByUser(userId: number): Promise<Transaction[]>;
  updateTransactionStatus(id: number, status: string): Promise<Transaction | undefined>;
  
  // Contact access operations
  createContactAccess(contactAccess: InsertContactAccess): Promise<ContactAccess>;
  hasContactAccess(productId: number, buyerId: number): Promise<boolean>;
  getContactsForBuyer(buyerId: number): Promise<ContactAccess[]>;
  
  // Review operations
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  getReviewsForProduct(productId: number): Promise<Review[]>;
  getAverageRatingForUser(userId: number): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private transactions: Map<number, Transaction>;
  private contactAccess: Map<number, ContactAccess>;
  private reviews: Map<number, Review>;
  
  private userIdCounter: number;
  private productIdCounter: number;
  private transactionIdCounter: number;
  private contactAccessIdCounter: number;
  private reviewIdCounter: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.transactions = new Map();
    this.contactAccess = new Map();
    this.reviews = new Map();
    
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.transactionIdCounter = 1;
    this.contactAccessIdCounter = 1;
    this.reviewIdCounter = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByFirebaseUid(uid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.firebaseUid === uid);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.category === category && !product.isSold)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProductsBySeller(sellerId: number): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.sellerId === sellerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getRecentProducts(limit: number): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => !product.isSold)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const now = new Date();
    const newProduct: Product = {
      ...product,
      id,
      createdAt: now,
      updatedAt: now,
      isSold: false
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct: Product = {
      ...product,
      ...updates,
      updatedAt: new Date()
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async markProductAsSold(id: number): Promise<Product | undefined> {
    return this.updateProduct(id, { isSold: true });
  }

  // Transaction operations
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionIdCounter++;
    const now = new Date();
    const newTransaction: Transaction = {
      ...transaction,
      id,
      createdAt: now
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.sellerId === userId || transaction.buyerId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateTransactionStatus(id: number, status: string): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction: Transaction = {
      ...transaction,
      status
    };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  // Contact access operations
  async createContactAccess(access: InsertContactAccess): Promise<ContactAccess> {
    const id = this.contactAccessIdCounter++;
    const now = new Date();
    const newAccess: ContactAccess = {
      ...access,
      id,
      createdAt: now
    };
    this.contactAccess.set(id, newAccess);
    return newAccess;
  }

  async hasContactAccess(productId: number, buyerId: number): Promise<boolean> {
    return Array.from(this.contactAccess.values())
      .some(access => access.productId === productId && access.buyerId === buyerId);
  }

  async getContactsForBuyer(buyerId: number): Promise<ContactAccess[]> {
    return Array.from(this.contactAccess.values())
      .filter(access => access.buyerId === buyerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Review operations
  async createReview(review: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const now = new Date();
    const newReview: Review = {
      ...review,
      id,
      createdAt: now
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.reviewerId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getReviewsForProduct(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.productId === productId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAverageRatingForUser(userId: number): Promise<number> {
    const userReviews = Array.from(this.reviews.values())
      .filter(review => review.reviewedId === userId);
    
    if (userReviews.length === 0) return 0;
    
    const sum = userReviews.reduce((total, review) => total + review.rating, 0);
    return sum / userReviews.length;
  }
}

export const storage = new MemStorage();
