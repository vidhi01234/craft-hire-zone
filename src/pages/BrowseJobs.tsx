import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, DollarSign, Clock } from "lucide-react";

// Mock data
const mockJobs = [
  {
    id: '1',
    title: 'Website Redesign Project',
    description: 'Looking for a skilled web designer to completely redesign our company website. Must have experience with modern design principles and responsive layouts.',
    category: 'Web Design',
    location: 'Remote',
    budget: 2500,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-15T10:00:00Z',
    posterName: 'Sarah Johnson',
    applicantCount: 12,
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Need a React Native developer to build a mobile app for our startup. The app should work on both iOS and Android platforms.',
    category: 'Mobile Development',
    location: 'New York, NY',
    budget: 75,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-10T14:30:00Z',
    posterName: 'TechStart Inc.',
    applicantCount: 8,
  },
  {
    id: '3',
    title: 'E-commerce Store Development',
    description: 'Build a modern e-commerce website using React and Node.js. Must include payment integration and admin dashboard.',
    category: 'Web Development',
    location: 'Remote',
    budget: 5000,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-18T09:00:00Z',
    posterName: 'RetailCorp',
    applicantCount: 15,
  },
  {
    id: '4',
    title: 'Logo Design for Startup',
    description: 'Looking for a creative designer to create a memorable logo for our tech startup. Must be modern and scalable.',
    category: 'Design',
    location: 'San Francisco, CA',
    budget: 45,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-17T16:20:00Z',
    posterName: 'Innovation Labs',
    applicantCount: 23,
  },
  {
    id: '5',
    title: 'Content Writing for Blog',
    description: 'Need an experienced content writer to create engaging blog posts about technology trends. SEO knowledge preferred.',
    category: 'Writing',
    location: 'Remote',
    budget: 30,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-16T11:00:00Z',
    posterName: 'Digital Media Co.',
    applicantCount: 7,
  },
  {
    id: '6',
    title: 'Data Analysis Project',
    description: 'Analyze customer data to identify trends and insights. Python and SQL experience required.',
    category: 'Data Science',
    location: 'Boston, MA',
    budget: 3500,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-19T08:15:00Z',
    posterName: 'Analytics Pro',
    applicantCount: 9,
  },
];

const categories = [
  'All Categories',
  'Web Development',
  'Mobile Development', 
  'Web Design',
  'Design',
  'Writing',
  'Data Science',
  'Marketing',
  'Other'
];

const locations = [
  'All Locations',
  'Remote',
  'New York, NY',
  'San Francisco, CA',
  'Boston, MA',
  'Chicago, IL',
  'Austin, TX'
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