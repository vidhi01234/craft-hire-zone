import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, DollarSign, Clock } from "lucide-react";

// Import job images
import gardeningImage from "@/assets/job-gardening.jpg";
import electricianImage from "@/assets/job-electrician.jpg";
import plumbingImage from "@/assets/job-plumbing.jpg";
import cleaningImage from "@/assets/job-cleaning.jpg";
import handymanImage from "@/assets/job-handyman.jpg";
import tutoringImage from "@/assets/job-tutoring.jpg";
import webDesignImage from "@/assets/job-web-design.jpg";
import mobileDevImage from "@/assets/job-mobile-dev.jpg";

// Mock data - Household & Daily Services Platform
const mockJobs = [
  {
    id: '1',
    title: 'Garden Maintenance & Landscaping',
    description: 'Need an experienced gardener for weekly garden maintenance, pruning, lawn care, and seasonal planting in residential property.',
    category: 'Gardening',
    location: 'Brooklyn, NY',
    budget: 40,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-15T10:00:00Z',
    posterName: 'Sarah Johnson',
    applicantCount: 8,
    image: gardeningImage,
  },
  {
    id: '2',
    title: 'Electrical Wiring & Installation',
    description: 'Licensed electrician needed for home electrical work including outlet installation, lighting fixtures, and electrical panel upgrade.',
    category: 'Electrical',
    location: 'Queens, NY',
    budget: 75,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-10T14:30:00Z',
    posterName: 'Mike Wilson',
    applicantCount: 5,
    image: electricianImage,
  },
  {
    id: '3',
    title: 'Kitchen Plumbing Repair',
    description: 'Experienced plumber needed to fix kitchen sink leak, replace faucet, and check water pressure issues. Same day service preferred.',
    category: 'Plumbing',
    location: 'Manhattan, NY',
    budget: 200,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-18T09:00:00Z',
    posterName: 'Lisa Chen',
    applicantCount: 12,
    image: plumbingImage,
  },
  {
    id: '4',
    title: 'Deep House Cleaning Service',
    description: 'Professional house cleaning service needed for 3-bedroom apartment. Looking for thorough cleaning including windows, appliances, and bathrooms.',
    category: 'Cleaning',
    location: 'Bronx, NY',
    budget: 150,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-17T16:20:00Z',
    posterName: 'Robert Martinez',
    applicantCount: 15,
    image: cleaningImage,
  },
  {
    id: '5',
    title: 'Home Renovation & Repairs',
    description: 'Skilled handyman needed for various home repairs including drywall patching, painting, door installation, and furniture assembly.',
    category: 'Handyman',
    location: 'Staten Island, NY',
    budget: 50,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-16T11:00:00Z',
    posterName: 'Jennifer Davis',
    applicantCount: 6,
    image: handymanImage,
  },
  {
    id: '6',
    title: 'Math Tutoring for High School',
    description: 'Experienced math tutor needed for high school student. Help with algebra, geometry, and calculus preparation. Flexible schedule preferred.',
    category: 'Tutoring',
    location: 'Long Island, NY',
    budget: 35,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-19T08:15:00Z',
    posterName: 'Thomas Brown',
    applicantCount: 9,
    image: tutoringImage,
  },
  {
    id: '7',
    title: 'Website Development for Local Business',
    description: 'Small business needs a simple website with contact information, services, and online booking system. Mobile-friendly design required.',
    category: 'Web Development',
    location: 'Brooklyn, NY',
    budget: 800,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-14T12:00:00Z',
    posterName: 'Maria Rodriguez',
    applicantCount: 11,
    image: webDesignImage,
  },
  {
    id: '8',
    title: 'Mobile App for Service Booking',
    description: 'Looking for mobile developer to create a service booking app for home maintenance services. iOS and Android compatibility needed.',
    category: 'Mobile Development',
    location: 'Manhattan, NY',
    budget: 65,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-13T15:30:00Z',
    posterName: 'David Kim',
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
  'Mobile Development'
];

const locations = [
  'All Locations',
  'Brooklyn, NY',
  'Queens, NY',
  'Manhattan, NY',
  'Bronx, NY',
  'Staten Island, NY',
  'Long Island, NY'
];

export default function BrowseJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [budgetType, setBudgetType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Jobs</h1>
          <p className="text-muted-foreground">
            Discover opportunities that match your skills and interests
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-card-border sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  className="w-full"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
                    setSelectedLocation('All Locations');
                    setBudgetType('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-muted-foreground">
                  {sortedJobs.length} job{sortedJobs.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
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

            {/* Active Filters */}
            {(searchQuery || selectedCategory !== 'All Categories' || selectedLocation !== 'All Locations' || budgetType !== 'all') && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
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
                  <Badge variant="secondary" className="flex items-center gap-1">
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
                  <Badge variant="secondary" className="flex items-center gap-1">
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
                  <Badge variant="secondary" className="flex items-center gap-1">
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
              <div className="space-y-6">
                {sortedJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    showApplyButton={true}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-gradient-card border-card-border text-center py-12">
                <CardContent>
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No jobs found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or clearing some filters.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Categories');
                      setSelectedLocation('All Locations');
                      setBudgetType('all');
                    }}
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