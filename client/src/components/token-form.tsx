import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface TokenFormProps {
  formData: {
    name: string;
    symbol: string;
    supply: string;
    decimals: number;
    description: string;
    freezeAuthority: boolean;
    mintAuthority: boolean;
  };
  onChange: (data: any) => void;
}

export default function TokenForm({ formData, onChange }: TokenFormProps) {
  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Card className="bg-[#1A1A1A] border border-gray-800 rounded-2xl card-glow">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-space font-bold">Token Details</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-[#14F195] rounded-full"></div>
            <span>Mainnet Deployment</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium mb-2">Token Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="My Awesome Token"
                className="w-full px-4 py-3 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] transition-colors input-glow"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="symbol" className="block text-sm font-medium mb-2">Symbol</Label>
              <Input
                id="symbol"
                type="text"
                value={formData.symbol}
                onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
                placeholder="MAT"
                maxLength={10}
                className="w-full px-4 py-3 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] transition-colors input-glow"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="supply" className="block text-sm font-medium mb-2">Total Supply</Label>
              <Input
                id="supply"
                type="number"
                value={formData.supply}
                onChange={(e) => handleInputChange("supply", e.target.value)}
                placeholder="1000000"
                className="w-full px-4 py-3 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] transition-colors input-glow"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="decimals" className="block text-sm font-medium mb-2">Decimals</Label>
              <Select
                value={formData.decimals.toString()}
                onValueChange={(value) => handleInputChange("decimals", parseInt(value))}
              >
                <SelectTrigger className="w-full px-4 py-3 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">9 (Recommended)</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="block text-sm font-medium mb-2">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your token's purpose and utility..."
              rows={3}
              className="w-full px-4 py-3 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] transition-colors input-glow resize-none"
            />
          </div>

          <div className="bg-[#0F0F0F] border border-gray-700 rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center">
              <div className="w-4 h-4 text-[#9945FF] mr-2">⚙️</div>
              Advanced Settings
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block text-sm font-medium">Freeze Authority</Label>
                  <p className="text-xs text-gray-400">Ability to freeze token accounts</p>
                </div>
                <Switch
                  checked={formData.freezeAuthority}
                  onCheckedChange={(checked) => handleInputChange("freezeAuthority", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="block text-sm font-medium">Mint Authority</Label>
                  <p className="text-xs text-gray-400">Ability to mint additional tokens</p>
                </div>
                <Switch
                  checked={formData.mintAuthority}
                  onCheckedChange={(checked) => handleInputChange("mintAuthority", checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
