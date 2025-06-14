import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: any;
}

export default function SuccessModal({ isOpen, onClose, token }: SuccessModalProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 max-w-md card-glow">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl">✓</span>
          </div>
          
          <h3 className="text-xl font-space font-bold mb-2">Token Deployed Successfully!</h3>
          <p className="text-gray-400 mb-6">Your token is now live on Solana mainnet</p>
          
          {token && (
            <>
              <div className="bg-[#0F0F0F] border border-gray-700 rounded-lg p-4 mb-6">
                <div className="text-xs text-gray-400 mb-1">Token Address</div>
                <div className="text-sm font-mono bg-gray-800 px-3 py-2 rounded break-all">
                  {token.tokenAddress}
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <Button
                  className="w-full py-2 px-4 bg-[#9945FF] text-white rounded-lg hover:bg-[#9945FF]/90 transition-colors"
                  onClick={() => window.open(`https://solscan.io/token/${token.tokenAddress}`, '_blank')}
                >
                  <span className="mr-2">🔗</span>
                  View on Solscan
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-2 px-4 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg hover:border-gray-600 transition-colors"
                  onClick={() => copyToClipboard(token.tokenAddress)}
                >
                  <span className="mr-2">📋</span>
                  Copy Token Address
                </Button>
              </div>
            </>
          )}
          
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
