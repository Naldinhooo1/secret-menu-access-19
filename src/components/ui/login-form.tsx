
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { generatePassword } from "@/utils/passwordGenerator";
import { saveUser, setCurrentUser } from "@/utils/storage";
import { User } from "@/types";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }
    
    setIsLoading(true);
    
    // Generate user with password
    const password = generatePassword(6);
    const newUser: User = {
      id: Date.now().toString(),
      name: name.trim(),
      password,
      createdAt: new Date().toISOString()
    };
    
    // Save user and set as current
    saveUser(newUser);
    setCurrentUser(newUser.id);
    
    // Navigate to menu
    setTimeout(() => {
      setIsLoading(false);
      navigate("/menu");
    }, 800); // Small delay for better UX
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Bem-vindo!</CardTitle>
        <CardDescription className="text-center">
          Digite seu nome para receber uma senha e acessar o cardápio
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? "Gerando senha..." : "Gerar senha"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
