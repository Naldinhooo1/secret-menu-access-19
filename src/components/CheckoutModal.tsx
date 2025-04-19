
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCurrentUser, getUserByPassword } from "@/utils/storage";
import { toast } from "@/components/ui/use-toast";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CheckoutModal = ({ isOpen, onClose, onConfirm }: CheckoutModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  const currentUser = getCurrentUser();
  
  const handleVerifyPassword = () => {
    setError("");
    setIsVerifying(true);
    
    // Simulate delay for better UX
    setTimeout(() => {
      const user = getUserByPassword(password);
      
      if (!user || user.id !== currentUser?.id) {
        setError("Senha incorreta. Tente novamente.");
        setIsVerifying(false);
        return;
      }
      
      toast({
        title: "Pedido confirmado!",
        description: "Seu pedido foi enviado com sucesso.",
      });
      
      setIsVerifying(false);
      onConfirm();
    }, 800);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerifyPassword();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Pedido</DialogTitle>
          <DialogDescription>
            Por favor, digite a senha que foi gerada no início para confirmar seu pedido.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isVerifying}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!password || isVerifying}>
              {isVerifying ? "Verificando..." : "Confirmar Pedido"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
