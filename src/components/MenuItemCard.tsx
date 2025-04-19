
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem as MenuItemType, CartItem } from "@/types";
import { getCartItems, saveCartItems } from "@/utils/storage";
import { toast } from "@/components/ui/use-toast";

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (updatedCart: CartItem[]) => void;
}

const MenuItemCard = ({ item, onAddToCart }: MenuItemProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { id, name, description, price, image } = item;

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Get current cart
    const currentCart = getCartItems();
    
    // Check if item already exists in cart
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === id);
    
    let updatedCart: CartItem[];
    
    if (existingItemIndex >= 0) {
      // Increase quantity if item exists
      updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item if it doesn't exist
      updatedCart = [
        ...currentCart,
        {
          id,
          name,
          price,
          quantity: 1,
          category: item.category
        }
      ];
    }
    
    // Save updated cart
    saveCartItems(updatedCart);
    
    // Update parent component
    onAddToCart(updatedCart);
    
    // Show toast
    toast({
      title: "Item adicionado",
      description: `${name} foi adicionado ao carrinho`,
      duration: 2000
    });
    
    // Reset loading state
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="line-clamp-2 h-10">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="font-medium text-lg">
          {price.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          })}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? "Adicionando..." : "Adicionar ao carrinho"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
