'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schoolSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Upload, School, ArrowLeft, CheckCircle, ImageIcon, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schoolSchema),
  });

  const watchedFields = watch();

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for combined data and image upload
      const formData = new FormData();
      
      // Add school data
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email', data.email);
      
      // Add image if provided
      if (imageFile) {
        formData.append('image', imageFile);
      }

      // Submit combined data and image
      const response = await fetch('/api/schools/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add school');
      }

      const result = await response.json();

      toast.success('School has been added successfully!', {
        description: 'You can now view it in the schools directory.',
        action: {
          label: 'View Schools',
          onClick: () => router.push('/schools'),
        },
      });

      // Reset form
      reset();
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      toast.error('Failed to add school', {
        description: error.message || 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldStatus = (fieldName) => {
    if (errors[fieldName]) return 'error';
    if (watchedFields[fieldName] && !errors[fieldName]) return 'success';
    return 'default';
  };

  const getInputClassName = (fieldName) => {
    const status = getFieldStatus(fieldName);
    const baseClasses = "h-12 transition-all duration-200 focus:ring-2 focus:ring-offset-2";
    
    switch (status) {
      case 'error':
        return `${baseClasses} border-red-500 focus:border-red-500 focus:ring-red-500/20`;
      case 'success':
        return `${baseClasses} border-green-500 focus:border-green-500 focus:ring-green-500/20`;
      default:
        return `${baseClasses} focus:border-blue-500 focus:ring-blue-500/20`;
    }
  };

  return (
    <div className="min-h-screen relative py-8 px-4">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" className="hover:scale-105 transition-all duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full mb-6 shadow-lg">
            <School className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Add New School</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Register a new educational institution with comprehensive details and documentation
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-b border-border/50">
            <CardTitle className="text-2xl text-foreground flex items-center">
              <School className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              School Registration Form
            </CardTitle>
            <CardDescription className="text-base">
              Please fill out all required fields marked with an asterisk (*) to register the school
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center">
                      School Name *
                      {getFieldStatus('name') === 'success' && (
                        <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                      )}
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Enter the full school name"
                      className={getInputClassName('name')}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center">
                      Email Address *
                      {getFieldStatus('email') === 'success' && (
                        <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                      )}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="contact@school.edu"
                      className={getInputClassName('email')}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-medium text-foreground flex items-center">
                    Complete Address *
                    {getFieldStatus('address') === 'success' && (
                      <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                    )}
                  </Label>
                  <Input
                    id="address"
                    {...register('address')}
                    placeholder="Enter the complete street address"
                    className={getInputClassName('address')}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 flex items-center">
                      <X className="w-4 h-4 mr-1" />
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm font-medium text-foreground flex items-center">
                      City *
                      {getFieldStatus('city') === 'success' && (
                        <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                      )}
                    </Label>
                    <Input
                      id="city"
                      {...register('city')}
                      placeholder="City name"
                      className={getInputClassName('city')}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-medium text-foreground flex items-center">
                      State *
                      {getFieldStatus('state') === 'success' && (
                        <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                      )}
                    </Label>
                    <Input
                      id="state"
                      {...register('state')}
                      placeholder="State name"
                      className={getInputClassName('state')}
                    />
                    {errors.state && (
                      <p className="text-sm text-red-600 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="contact" className="text-sm font-medium text-foreground flex items-center">
                      Contact Number *
                      {getFieldStatus('contact') === 'success' && (
                        <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                      )}
                    </Label>
                    <Input
                      id="contact"
                      {...register('contact')}
                      placeholder="10-digit phone number"
                      className={getInputClassName('contact')}
                    />
                    {errors.contact && (
                      <p className="text-sm text-red-600 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.contact.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">School Image</h3>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-foreground">
                    Upload School Photo (Optional)
                  </Label>
                  
                  {!imagePreview ? (
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                        dragActive
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                          : 'border-border hover:border-blue-400 hover:bg-muted/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground mb-2">
                        Drop your image here, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports JPG, PNG, GIF up to 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border shadow-lg">
                        <img
                          src={imagePreview}
                          alt="School preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeImage}
                            className="shadow-lg"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remove Image
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        Click on the image to remove it
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Adding School...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-3" />
                      Add School to Directory
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    setImageFile(null);
                    setImagePreview('');
                  }}
                  className="px-8 h-14 hover:scale-105 transition-all duration-200 font-medium"
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team or{' '}
            <Link href="/schools" className="text-blue-600 dark:text-blue-400 hover:underline">
              view existing schools
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}