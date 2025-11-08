import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle2, Clock, XCircle, ShieldCheck } from 'lucide-react';
import { useIdentityVerification, useSubmitVerification, DocumentType } from '@/hooks/useIdentityVerification';

export const IdentityVerification = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType>('national_id');
  
  const { data: verification, isLoading } = useIdentityVerification();
  const submitVerification = useSubmitVerification();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    submitVerification.mutate({ documentType, file: selectedFile });
    setSelectedFile(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <CardTitle>Identity Verification</CardTitle>
        </div>
        <CardDescription>
          Verify your identity to build trust with job givers and unlock more opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {verification ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div>
                <p className="font-medium">Verification Status</p>
                <p className="text-sm text-muted-foreground">
                  Submitted on {new Date(verification.submitted_at).toLocaleDateString()}
                </p>
              </div>
              {getStatusBadge(verification.status)}
            </div>

            {verification.status === 'rejected' && verification.reviewer_notes && (
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Reason:</strong> {verification.reviewer_notes}
                </AlertDescription>
              </Alert>
            )}

            {verification.status === 'rejected' && (
              <p className="text-sm text-muted-foreground">
                You can submit a new verification request below.
              </p>
            )}

            {verification.status === 'pending' && (
              <Alert>
                <AlertDescription>
                  Your verification is under review. This typically takes 1-2 business days.
                </AlertDescription>
              </Alert>
            )}

            {verification.status === 'approved' && (
              <Alert className="border-green-500/50 bg-green-500/10">
                <AlertDescription className="text-green-600">
                  Your identity has been verified! You now have a verified badge on your profile.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Upload a government-issued ID to verify your identity. Accepted documents include passport, driver's license, or national ID card.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select value={documentType} onValueChange={(value) => setDocumentType(value as DocumentType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national_id">National ID Card</SelectItem>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">Upload Document</Label>
              <div className="flex items-center gap-2">
                <input
                  id="document"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('document')?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {selectedFile ? selectedFile.name : 'Choose File'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Accepted formats: JPG, PNG, PDF (max 10MB)
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!selectedFile || submitVerification.isPending}
              className="w-full"
            >
              {submitVerification.isPending ? 'Submitting...' : 'Submit for Verification'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
