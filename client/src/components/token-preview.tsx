import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TokenPreviewProps {
  formData: {
    name: string;
    symbol: string;
    supply: string;
    decimals: number;
    description: string;
    freezeAuthority: boolean;
    mintAuthority: boolean;
  };
  walletConnected: boolean;
  onDeploy: () => void;
  isDeploying: boolean;
}

export default function TokenPreview({ formData, walletConnected, onDeploy, isDeploying }: TokenPreviewProps) {
  const isFormValid = formData.name && formData.symbol && formData.supply;
  const canDeploy = walletConnected && isFormValid && !isDeploying;

  const formatSupply = (supply: string) => {
    if (!supply) return "0";
    return Number(supply).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Token Preview Card */}
      <Card className="bg-[#1A1A1A] border border-gray-800 rounded-2xl card-glow">
        <CardContent className="p-6">
          <h3 className="text-lg font-space font-bold mb-4">Token Preview</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#0F0F0F] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">
                    {formData.symbol || "MAT"}
                  </span>
                </div>
                <div>
                  <div className="font-medium">
                    {formData.name || "My Awesome Token"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {formData.symbol || "MAT"}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Supply:</span>
                <span>{formatSupply(formData.supply)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Decimals:</span>
                <span>{formData.decimals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Network:</span>
                <span className="text-[#14F195]">Solana Mainnet</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Breakdown Card */}
      <Card className="bg-[#1A1A1A] border border-gray-800 rounded-2xl card-glow">
        <CardContent className="p-6">
          <h3 className="text-lg font-space font-bold mb-4">Fee Breakdown</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Network Fee:</span>
              <span className="text-white">0.01 SOL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Service Fee:</span>
              <span className="text-white">0.1 SOL</span>
            </div>
            <div className="border-t border-gray-700 pt-3">
              <div className="flex justify-between items-center font-medium">
                <span>Total Cost:</span>
                <span className="text-[#14F195]">0.11 SOL</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-[#9945FF]/10 border border-[#9945FF]/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 text-[#9945FF] mt-0.5">ℹ️</div>
              <div className="text-xs text-gray-300">
                <p>Fees are calculated based on network conditions and current SOL price.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deploy Button */}
      <Button
        onClick={onDeploy}
        disabled={!canDeploy}
        className="w-full py-4 px-6 button-gradient text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isDeploying ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Deploying...
          </>
        ) : (
          <>
            <span className="mr-2">🚀</span>
            Deploy Token
          </>
        )}
      </Button>
      
      {/* Wallet Connection Warning */}
      {!walletConnected && (
        <Alert className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <AlertDescription className="flex items-center space-x-2">
            <span className="text-yellow-500">⚠️</span>
            <span className="text-sm text-yellow-200">Connect your wallet to deploy</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
