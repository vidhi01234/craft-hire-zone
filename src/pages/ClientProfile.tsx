import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/layout/Navigation";
import { MapPin, Mail, Phone } from "lucide-react";

// Mock data
const mockClient = {
  id: '1',
  name: 'Sarah Johnson',
  avatar: '',
  location: 'San Francisco, CA',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  bio: `I'm looking for talented professionals to help with various projects. I value clear communication, timely delivery, and high-quality work. I provide detailed project requirements and am always available to answer questions throughout the project lifecycle.`,
};

export default function ClientProfile() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gradient-card border-card-border">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Avatar className="h-32 w-32 mx-auto md:mx-0">
                <AvatarImage src={mockClient.avatar} />
                <AvatarFallback className="text-2xl">{mockClient.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-4">{mockClient.name}</h1>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span>{mockClient.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <a href={`mailto:${mockClient.email}`} className="hover:text-primary transition-colors">
                      {mockClient.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <a href={`tel:${mockClient.phone}`} className="hover:text-primary transition-colors">
                      {mockClient.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {mockClient.bio}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}