import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, Filter, MapPin, DollarSign, Clock, SlidersHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Import job images
import gardeningImage from "@/assets/job-gardening.jpg";
import electricianImage from "@/assets/job-electrician.jpg";
import plumbingImage from "@/assets/job-plumbing.jpg";
import cleaningImage from "@/assets/job-cleaning.jpg";
import handymanImage from "@/assets/job-handyman.jpg";
import tutoringImage from "@/assets/job-tutoring.jpg";
import webDesignImage from "@/assets/job-web-design.jpg";
import mobileDevImage from "@/assets/job-mobile-dev.jpg";

// Mock data - Indian Household Services Platform
const mockJobs = [
  {
    id: '1',
    title: 'Garden Maintenance & Landscaping',
    description: 'Need an experienced gardener for weekly garden maintenance, pruning, lawn care, and seasonal planting in residential property.',
    category: 'Gardening',
    location: 'Koramangala, Bangalore',
    budget: 2000,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-15T10:00:00Z',
    posterName: 'Priya Sharma',
    applicantCount: 8,
    image: gardeningImage,
  },
  {
    id: '2',
    title: 'Electrical Wiring & Installation',
    description: 'Licensed electrician needed for home electrical work including outlet installation, lighting fixtures, and electrical panel upgrade.',
    category: 'Electrical',
    location: 'Gurgaon, Delhi NCR',
    budget: 3500,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-10T14:30:00Z',
    posterName: 'Rajesh Kumar',
    applicantCount: 5,
    image: electricianImage,
  },
  {
    id: '3',
    title: 'Kitchen Plumbing Repair',
    description: 'Experienced plumber needed to fix kitchen sink leak, replace faucet, and check water pressure issues. Same day service preferred.',
    category: 'Plumbing',
    location: 'Bandra, Mumbai',
    budget: 1500,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-18T09:00:00Z',
    posterName: 'Anita Singh',
    applicantCount: 12,
    image: plumbingImage,
  },
  {
    id: '4',
    title: 'Deep House Cleaning Service',
    description: 'Professional house cleaning service needed for 3-bedroom apartment. Looking for thorough cleaning including windows, appliances, and bathrooms.',
    category: 'Cleaning',
    location: 'Powai, Mumbai',
    budget: 1200,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-17T16:20:00Z',
    posterName: 'Vivek Gupta',
    applicantCount: 15,
    image: cleaningImage,
  },
  {
    id: '5',
    title: 'Home Renovation & Repairs',
    description: 'Skilled handyman needed for various home repairs including wall painting, door installation, and furniture assembly.',
    category: 'Handyman',
    location: 'Indiranagar, Bangalore',
    budget: 2500,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-16T11:00:00Z',
    posterName: 'Meera Reddy',
    applicantCount: 6,
    image: handymanImage,
  },
  {
    id: '6',
    title: 'Math Tutoring for Class 12th',
    description: 'Experienced math tutor needed for Class 12th student. Help with algebra, calculus and board exam preparation. Flexible schedule preferred.',
    category: 'Tutoring',
    location: 'Connaught Place, Delhi',
    budget: 800,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-19T08:15:00Z',
    posterName: 'Ravi Joshi',
    applicantCount: 9,
    image: tutoringImage,
  },
  {
    id: '7',
    title: 'Website Development for Local Business',
    description: 'Small business needs a simple website with contact information, services, and online booking system. Mobile-friendly design required.',
    category: 'Web Development',
    location: 'Cyber City, Hyderabad',
    budget: 25000,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-14T12:00:00Z',
    posterName: 'Kavya Iyer',
    applicantCount: 11,
    image: webDesignImage,
  },
  {
    id: '8',
    title: 'Mobile App for Service Booking',
    description: 'Looking for mobile developer to create a service booking app for home maintenance services. iOS and Android compatibility needed.',
    category: 'Mobile Development',
    location: 'Whitefield, Bangalore',
    budget: 45000,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-13T15:30:00Z',
    posterName: 'Arjun Patel',
    applicantCount: 7,
    image: mobileDevImage,
  },
];

const categories = [
  'All Categories',
  'Gardening',
  'Electrical', 
  'Plumbing',
  'Cleaning',
  'Handyman',
  'Tutoring',
  'Web Development',
  'Mobile Development',
  'Cook/Maid',
  'Pest Control'
];

const locations = [
  'All Locations',
  'Bangalore',
  'Mumbai',
  'Delhi NCR',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata'
];

export default function BrowseJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [budgetType, setBudgetType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useIsMobile();

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || job.location === selectedLocation;
    const matchesBudget = budgetType === 'all' || job.budgetType === budgetType;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesBudget;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'budget-high':
        return b.budget - a.budget;
      case 'budget-low':
        return a.budget - b.budget;
      case 'applications':
        return (b.applicantCount || 0) - (a.applicantCount || 0);
      default: // newest
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    }
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setBudgetType('all');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locations.map(location => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Budget Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Budget Type</label>
        <Select value={budgetType} onValueChange={setBudgetType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="fixed">Fixed Price</SelectItem>
            <SelectItem value="hourly">Hourly Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full hover-scale"
        onClick={clearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">Browse Jobs</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Discover opportunities that match your skills and interests
          </p>
        </div>

        {/* Mobile Search Bar */}
        {isMobile && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-16"
              />
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card border-card-border sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterContent />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Jobs List */}
          <div className={isMobile ? "col-span-1" : "lg:col-span-3"}>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground text-sm sm:text-base">
                  {sortedJobs.length} job{sortedJobs.length !== 1 ? 's' : ''} found
                </p>
                {isMobile && (
                  <Badge variant="outline" className="text-xs">
                    {(searchQuery || selectedCategory !== 'All Categories' || selectedLocation !== 'All Locations' || budgetType !== 'all') 
                      ? 'Filtered' : 'All Jobs'}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                    <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                    <SelectItem value="applications">Most Applications</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters - Desktop Only */}
            {!isMobile && (searchQuery || selectedCategory !== 'All Categories' || selectedLocation !== 'All Locations' || budgetType !== 'all') && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1 hover-scale">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== 'All Categories' && (
                  <Badge variant="secondary" className="flex items-center gap-1 hover-scale">
                    {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory('All Categories')}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedLocation !== 'All Locations' && (
                  <Badge variant="secondary" className="flex items-center gap-1 hover-scale">
                    <MapPin className="h-3 w-3" />
                    {selectedLocation}
                    <button 
                      onClick={() => setSelectedLocation('All Locations')}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {budgetType !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1 hover-scale">
                    <DollarSign className="h-3 w-3" />
                    {budgetType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                    <button 
                      onClick={() => setBudgetType('all')}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Jobs Grid */}
            {sortedJobs.length > 0 ? (
              <div className={`grid gap-4 sm:gap-6 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 xl:grid-cols-3'}`}>
                {sortedJobs.map((job, index) => (
                  <div 
                    key={job.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <JobCard 
                      job={job} 
                      showApplyButton={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="bg-gradient-card border-card-border text-center py-8 sm:py-12">
                <CardContent>
                  <Search className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
                    No jobs found
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    Try adjusting your search criteria or clearing some filters.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={clearFilters}
                    className="hover-scale"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}