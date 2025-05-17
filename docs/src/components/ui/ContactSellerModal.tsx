import { useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { usePayment } from '@/lib/usePayment';
import { useLocation } from 'wouter';
import { Product } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ContactSellerModalProps {
  product: Product;
  trigger?: React.ReactNode;
}

const ContactSellerModal = ({ product, trigger }: ContactSellerModalProps) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const { processContactFee, isLoading } = usePayment();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Check if user already has access
  const { data: accessData, isLoading: isCheckingAccess } = useQuery({
    queryKey: [`/api/contact-access/check?productId=${product.id}&buyerId=1`], // Hard-coded buyer ID for demo
    enabled: !!currentUser && open,
  });
  
  const { data: sellerData, isLoading: isLoadingSeller } = useQuery({
    queryKey: [`/api/users/${product.sellerId}`],
    enabled: !!currentUser && open && accessData?.hasAccess,
  });

  const handleContactSeller = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to contact the seller",
        variant: "destructive",
      });
      setOpen(false);
      setLocation("/login");
      return;
    }
    
    try {
      const result = await processContactFee(product.id, product.sellerId, {
        amount: 500, // ₹5 in paisa
        description: `Access fee for ${product.title}`,
        metadata: {
          productId: product.id,
          buyerId: 1, // Hard-coded for demo
        },
      });
      
      if (result && result.hasAccess) {
        toast({
          title: "Access Granted",
          description: "You can now contact the seller.",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "Could not process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderContactInfo = () => {
    if (isCheckingAccess || isLoadingSeller) {
      return (
        <div className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
        </div>
      );
    }
    
    if (!accessData?.hasAccess) {
      return (
        <div className="py-6 space-y-4">
          <div className="bg-yellow-50 p-4 rounded-md text-yellow-800 text-sm">
            <p className="font-medium mb-1">Contact Fee</p>
            <p>Pay ₹5 to access the seller's contact information.</p>
          </div>
          
          <Button 
            onClick={handleContactSeller} 
            className="w-full bg-primary-500 hover:bg-primary-600"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Pay ₹5 to Contact Seller
          </Button>
        </div>
      );
    }
    
    return (
      <div className="py-6 space-y-4">
        <div className="bg-green-50 p-4 rounded-md text-green-800 text-sm">
          <p className="font-medium mb-1">Access Granted!</p>
          <p>You can now contact the seller using the information below.</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-800">+91 9876543210</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-800">{sellerData?.email || 'seller@example.com'}</span>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="text-sm text-gray-500">
          <p className="font-medium mb-1">Safety Tips:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Meet in a public place on campus</li>
            <li>Inspect the item carefully before purchasing</li>
            <li>Be respectful and on time for meetups</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full bg-primary-500 hover:bg-primary-600">
            Contact Seller
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
          <DialogDescription>
            Connect with the seller to arrange a meetup for {product.title}
          </DialogDescription>
        </DialogHeader>
        
        {renderContactInfo()}
        
        <DialogFooter className="sm:justify-start">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSellerModal;
