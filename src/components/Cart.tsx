
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types";
import { saveCartItems } from "@/utils/storage";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface CartProps {
  items: CartItem[];
  onUpdateCart: (items: CartItem[]) => void;
  onCheckout: () => void;
}

const Cart = ({ items, onUpdateCart, onCheckout }: CartProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const updateItemQuantity = (id: string, change: number) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    saveCartItems(updatedItems);
    onUpdateCart(updatedItems);
  };
  
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-semibold text-lg">
              Seu Pedido {itemCount > 0 && `(${itemCount})`}
            </h2>
          </div>
          <span className="font-semibold">
            {cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <ScrollArea className="max-h-[300px] p-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Seu carrinho está vazio
              </p>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(item.price * item.quantity).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateItemQuantity(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateItemQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                {cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <Button 
              className="w-full" 
              disabled={items.length === 0}
              onClick={onCheckout}
            >
              Finalizar Pedido
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
