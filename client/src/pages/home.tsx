import { useState } from "react";
import WalletConnection from "@/components/wallet-connection";
import TokenForm from "@/components/token-form";
import TokenPreview from "@/components/token-preview";
import DeploymentModal from "@/components/deployment-modal";
import SuccessModal from "@/components/success-modal";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
    decimals: 9,
    description: "",
    freezeAuthority: false,
    mintAuthority: false,
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedToken, setDeployedToken] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleWalletConnect = (address: string) => {
    setWalletConnected(true);
    setWalletAddress(address);
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  const handleDeploy = async () => {
    if (!walletConnected) return;
    
    setIsDeploying(true);
    
    try {
      // Create token
      const response = await fetch("/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          creatorWallet: walletAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create token");
      }

      const token = await response.json();

      // Simulate deployment delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Deploy token
      const deployResponse = await fetch(`/api/tokens/${token.id}/deploy`, {
        method: "POST",
      });

      if (!deployResponse.ok) {
        throw new Error("Failed to deploy token");
      }

      const deployedTokenData = await deployResponse.json();
      setDeployedToken(deployedTokenData);
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        name: "",
        symbol: "",
        supply: "",
        decimals: 9,
        description: "",
        freezeAuthority: false,
        mintAuthority: false,
      });
      
    } catch (error) {
      console.error("Deployment failed:", error);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full"></div>
                <h1 className="text-xl font-space font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                  SolanaTokenMaker
                </h1>
              </div>
            </div>
            
            <WalletConnection
              walletConnected={walletConnected}
              walletAddress={walletAddress}
              onConnect={handleWalletConnect}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-space font-bold mb-6">
            Create Your Own
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              {" "}Solana Token
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Launch your custom cryptocurrency token on Solana mainnet in minutes. 
            No coding required - just fill out the form and deploy.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 text-[#14F195]">✓</div>
              <span>Instant Deployment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 text-[#14F195]">✓</div>
              <span>Secure & Audited</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 text-[#14F195]">✓</div>
              <span>Low Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TokenForm
              formData={formData}
              onChange={handleFormChange}
            />
          </div>
          
          <div className="space-y-6">
            <TokenPreview
              formData={formData}
              walletConnected={walletConnected}
              onDeploy={handleDeploy}
              isDeploying={isDeploying}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <DeploymentModal isOpen={isDeploying} />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        token={deployedToken}
      />
    </div>
  );
}
