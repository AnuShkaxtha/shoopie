
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addProduct } from '../api/productApi';
import { fetchCategoriesApi } from '@/entities/Home/api/categoryApi';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SubCategory {
  id: number;
  attributes: {
    name: string;
  };
}

interface Category {
  id: number;
  attributes: {
    name: string;
    sub_categories: {
      data: SubCategory[];
    };
  };
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    brand: '',
    shortDescription: '',
    longDescription: '',
    category: '',
    sub_categories: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesResponse = await fetchCategoriesApi();
        setCategories(categoriesResponse);
      } catch (error: any) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCategoryChange = (value: string) => {
    setProductData({ ...productData, category: value });
  };

  const handleSubcategoryChange = (value: string) => {
    setProductData({ ...productData, sub_categories: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      // Prepare product data to be added
      const productToAdd = {
        ...productData,
        shortDescription: [
          { type: "paragraph", children: [{ text: productData.shortDescription, type: "text" }] }
        ],
        longDescription: [
          { type: "paragraph", children: [{ text: productData.longDescription, type: "text" }] }
        ],
        category: {
          id: productData.category
        },
        subcategory: {
          id: productData.sub_categories
        },
        
      };

      console.log(productToAdd)
      await addProduct(productToAdd);
      setLoading(false);

      setProductData({
        name: '',
        price: '',
        brand: '',
        shortDescription: '',
        longDescription: '',
        category: '',
        sub_categories: '',
       
      });

      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Error adding product:', error.message);
      setLoading(false);
    }
  };



  const selectedCategory = categories.find(category => category.id.toString() === productData.category);

  return (
    <div className="flex justify-center mt-12 text-left">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className='space-y-4'>
            <Input
              placeholder="Product Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
            />
            <Textarea
              placeholder="Short Description"
              name="shortDescription"
              value={productData.shortDescription}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Long Description"
              name="longDescription"
              value={productData.longDescription}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleInputChange}
              required
            />

            <Select onValueChange={handleCategoryChange} value={productData.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.attributes.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {selectedCategory && selectedCategory.attributes.sub_categories.data.length > 0 && (
              <Select onValueChange={handleSubcategoryChange} value={productData.sub_categories}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectedCategory.attributes.sub_categories.data.map((subCategory) => (
                      <SelectItem key={subCategory.id} value={subCategory.id.toString()}>
                        {subCategory.attributes.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

          
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding Product...' : 'Add Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;