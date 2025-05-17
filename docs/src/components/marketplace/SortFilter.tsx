import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SortFilter = ({ value, onChange }: SortFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort options" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Recently Added</SelectItem>
          <SelectItem value="lowest">Price: Low to High</SelectItem>
          <SelectItem value="highest">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;
