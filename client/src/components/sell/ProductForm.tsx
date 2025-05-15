import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/useAuth";
import { usePayment } from "@/lib/usePayment";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { productValidationSchema } from "@shared/schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const formSchema = productValidationSchema.extend({
  image: z.instanceof(FileList).optional().refine(
    (files) => !files || files.length === 0 || (files.length === 1 && files[0].size <= 5 * 1024 * 1024),
    {
      message: "The image must be less than 5MB",
    }
  ),
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { processListingFee, isLoading: isPaymentLoading } = usePayment();
  const [, setLocation] = useLocation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "books",
      condition: "good",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to list an item",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image if provided - in a real app this would upload to Firebase Storage
      let imageUrl = null;
      if (data.image && data.image.length > 0) {
        // Simulate image upload - in a real app this would upload to Firebase Storage
        // For demo purposes, we'll just use the preview URL
        imageUrl = imagePreview;
      }

      // Create the product first
      const productData = {
        title: data.title,
        description: data.description,
        price: Math.round(data.price * 100), // Convert to paisa
        category: data.category,
        condition: data.condition,
        imageUrl: imageUrl || null,
        sellerId: 1, // This would be the actual user ID in a real app
      };

      const response = await apiRequest("POST", "/api/products", productData);
      const product = await response.json();
      
      if (product && product.id) {
        // Process the listing fee
        const paymentResult = await processListingFee(product.id, {
          amount: 2000, // ₹20 in paisa
          description: "Listing fee for " + data.title,
          metadata: {
            productId: product.id,
            sellerId: 1, // This would be the actual user ID in a real app
          },
        });

        if (paymentResult) {
          // Success - invalidate products query to refresh listings
          queryClient.invalidateQueries({ queryKey: ['/api/products'] });
          // Also invalidate the seller's product list
          queryClient.invalidateQueries({ queryKey: ['/api/products?sellerId=1'] });
          
          toast({
            title: "Product Listed Successfully",
            description: "Your item has been listed on the marketplace. View it in your dashboard.",
            // Success toast - no variant needed for default style
          });
          
          // Redirect to dashboard instead of marketplace to see the listing
          setLocation("/dashboard?tab=listings");
        }
      }
    } catch (error) {
      console.error("Error during product listing:", error);
      toast({
        title: "Listing Failed",
        description: "There was an error listing your product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Calculus Textbook (8th Edition)" {...field} />
              </FormControl>
              <FormDescription>
                Be descriptive to help buyers find your item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="1000" 
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>
                  Set a competitive price to sell faster.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothes">Clothes</SelectItem>
                    <SelectItem value="stationery">Stationery</SelectItem>
                    <SelectItem value="misc">Miscellaneous</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the most appropriate category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like_new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Be honest about the condition of your item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your item in detail. Include any defects or special features." 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                The more details you provide, the more likely someone will buy.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image (Optional)</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target.files);
                      handleImageChange(e);
                    }}
                    {...fieldProps}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-500 mb-2">Preview:</p>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full max-w-md h-auto rounded-md border border-gray-300" 
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload a clear image of your item (max 5MB).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800">
          <p className="font-medium mb-1">Listing Fee</p>
          <p>A listing fee of ₹20 will be charged. You'll receive 50% back as cashback when your item sells.</p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary-500 hover:bg-primary-600"
          disabled={isSubmitting || isPaymentLoading}
        >
          {(isSubmitting || isPaymentLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          List Item and Pay ₹20
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
