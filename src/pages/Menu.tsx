// Menu.tsx
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

export default function Menu() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Aqui você pode completar com os elementos visuais, como Tabs, cards, etc. */}
        <h1 className="text-2xl font-bold mb-4">Cardápio</h1>
        <Tabs defaultValue="food" className="mb-8">
          <TabsList>
            <TabsTrigger value="food">Comidas</TabsTrigger>
            <TabsTrigger value="drink">Bebidas</TabsTrigger>
          </TabsList>
          <TabsContent value="food">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodItems.map(item => (
                <MenuItemCard key={item.id} item={item} onCartUpdate={handleCartUpdate} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="drink">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drinkItems.map(item => (
                <MenuItemCard key={item.id} item={item} onCartUpdate={handleCartUpdate} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Cart
          items={cartItems}
          onCheckout={handleOpenCheckout}
          onCartUpdate={handleCartUpdate}
          onLogout={handleLogout}
        />

        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          onCheckoutComplete={handleCheckoutComplete}
        />
      </div>
    </div>
  );
}