
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuItemCard from "@/components/MenuItemCard";
import Cart from "@/components/Cart";
import CheckoutModal from "@/components/CheckoutModal";
import { getCurrentUser, getCartItems, clearCart, clearCurrentUser } from "@/utils/storage";
import { CartItem } from "@/types";
import { menuItems } from "@/data/menuItems";

const Menu = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }
    
    // Load cart items
    const savedCartItems = getCartItems();
    setCartItems(savedCartItems);
  }, [navigate]);
  
  const handleCartUpdate = (items: CartItem[]) => {
    setCartItems(items);
  };
  
  const handleOpenCheckout = () => {
    setIsCheckoutModalOpen(true);
  };
  
  const handleCheckoutComplete = () => {
    clearCart();
    setCartItems([]);
    setIsCheckoutModalOpen(false);
  };
  
  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };
  
  const foodItems = menuItems.filter(item => item.category === "food");
  const drinkItems = menuItems.filter(item => item.category === "drink");
  const currentUser = getCurrentUser();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-800">Cardápio</h1>
            <div className="flex items-center gap-4">
              <p className="text-green-700">
                Olá, <span className="font-medium">{currentUser?.name}</span>
              </p>
              <Button variant="outline" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="food" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="food" className="flex-1">Comidas</TabsTrigger>
                <TabsTrigger value="drink" className="flex-1">Bebidas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="food">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {foodItems.map(item => (
                    <MenuItemCard 
                      key={item.id} 
                      item={item} 
                      onAddToCart={handleCartUpdate} 
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="drink">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {drinkItems.map(item => (
                    <MenuItemCard 
                      key={item.id} 
                      item={item} 
                      onAddToCart={handleCartUpdate} 
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Cart 
              items={cartItems} 
              onUpdateCart={handleCartUpdate} 
              onCheckout={handleOpenCheckout} 
            />
          </div>
        </div>
      </div>
      
      <CheckoutModal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleCheckoutComplete}
      />
    </div>
  );
};

export default Menu;
