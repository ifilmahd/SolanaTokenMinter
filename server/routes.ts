import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTokenSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new token
  app.post("/api/tokens", async (req, res) => {
    try {
      const validatedData = insertTokenSchema.parse(req.body);
      const token = await storage.createToken(validatedData);
      res.json(token);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid token data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create token" });
      }
    }
  });

  // Get tokens by wallet address
  app.get("/api/tokens/wallet/:address", async (req, res) => {
    try {
      const { address } = req.params;
      const tokens = await storage.getTokensByWallet(address);
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tokens" });
    }
  });

  // Deploy token (mock deployment)
  app.post("/api/tokens/:id/deploy", async (req, res) => {
    try {
      const { id } = req.params;
      const tokenId = parseInt(id);
      
      const token = await storage.getToken(tokenId);
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }

      // Simulate deployment process
      const mockTokenAddress = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      const mockTransactionId = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

      const updatedToken = await storage.updateToken(tokenId, {
        status: "deployed",
        tokenAddress: mockTokenAddress,
        transactionId: mockTransactionId,
      });

      res.json(updatedToken);
    } catch (error) {
      res.status(500).json({ message: "Failed to deploy token" });
    }
  });

  // Get token by ID
  app.get("/api/tokens/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const tokenId = parseInt(id);
      
      const token = await storage.getToken(tokenId);
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }

      res.json(token);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch token" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
