import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DeploymentModalProps {
  isOpen: boolean;
}

export default function DeploymentModal({ isOpen }: DeploymentModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 max-w-md card-glow">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <h3 className="text-xl font-space font-bold mb-2">Deploying Token</h3>
          <p className="text-gray-400 mb-6">Please confirm the transaction in your wallet</p>
          
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-[#14F195] rounded-full flex items-center justify-center">
                <span className="text-black text-xs">✓</span>
              </div>
              <span className="text-sm">Wallet connected</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-[#9945FF] rounded-full flex items-center justify-center animate-pulse">
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <span className="text-sm">Creating token account...</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⏰</span>
              </div>
              <span className="text-sm text-gray-500">Waiting for confirmation</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              Transaction ID will appear here after confirmation
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
