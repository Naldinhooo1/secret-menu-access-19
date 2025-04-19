
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import LoginForm from "@/components/ui/login-form";
import { isAdminPassword } from "@/utils/storage";
import { toast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/utils/storage";

const Index = () => {
  const navigate = useNavigate();
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  
  const handleAdminAccess = () => {
    setIsAdminDialogOpen(true);
  };
  
  const handleAdminLogin = () => {
    if (isAdminPassword(adminPassword)) {
      navigate("/admin");
    } else {
      toast({
        title: "Erro de Acesso",
        description: "Senha administrativa incorreta.",
        variant: "destructive"
      });
    }
    setIsAdminDialogOpen(false);
    setAdminPassword("");
  };

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate("/menu");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Menu Secret</h1>
          <p className="text-lg text-green-700">
            Sistema de pedidos com acesso seguro
          </p>
        </header>
        
        <main className="max-w-lg mx-auto">
          <LoginForm />
          
          <div className="mt-8 text-center">
            <Button
              variant="link"
              className="text-sm text-gray-500"
              onClick={handleAdminAccess}
            >
              Acesso administrativo
            </Button>
          </div>
        </main>
      </div>

      <Dialog 
        open={isAdminDialogOpen} 
        onOpenChange={(open) => setIsAdminDialogOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Acesso Administrativo</DialogTitle>
            <DialogDescription>
              Digite a senha de administrador para acessar o painel
            </DialogDescription>
          </DialogHeader>
          
          <Input 
            type="password"
            placeholder="Senha administrativa"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          
          <DialogFooter>
            <Button 
              variant="default" 
              onClick={handleAdminLogin}
              disabled={!adminPassword}
            >
              Acessar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

