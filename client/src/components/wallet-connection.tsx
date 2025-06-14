import { useState } from "react";
import { Button } from "@/components/ui/button";

interface WalletConnectionProps {
  walletConnected: boolean;
  walletAddress: string;
  onConnect: (address: string) => void;
}

export default function WalletConnection({ walletConnected, walletAddress, onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (walletConnected) return;
    
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = "7xKX" + Math.random().toString(36).substring(2, 8).toUpperCase() + "9mPq";
      onConnect(mockAddress);
      setIsConnecting(false);
    }, 1000);
  };

  if (walletConnected) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 border border-[#9945FF]/30 rounded-lg">
        <div className="w-2 h-2 bg-[#14F195] rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">
          {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
        </span>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-lg hover:border-[#9945FF] transition-colors"
    >
      {isConnecting ? (
        <>
          <div className="w-4 h-4 border-2 border-[#9945FF] border-t-transparent rounded-full animate-spin"></div>
          <span className="hidden sm:inline">Connecting...</span>
        </>
      ) : (
        <>
          <div className="w-4 h-4 text-[#9945FF]">💼</div>
          <span className="hidden sm:inline">Connect Wallet</span>
        </>
      )}
    </Button>
  );
}
