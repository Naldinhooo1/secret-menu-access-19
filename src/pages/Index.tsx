
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/ui/login-form";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/utils/storage";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate("/menu");
    }
  }, [navigate]);

  const handleAdminAccess = () => {
    navigate("/admin");
  };

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
    </div>
  );
};

export default Index;
