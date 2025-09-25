import { MainLayout } from "@/components/main-layout";
import { AIAssessmentCard } from "@/components/ai-assessment-card";
import { EvidenceUploadZone } from "@/components/evidence-upload-zone";
import { CommunityConnections } from "@/components/community-connections";
import { DocumentGenerator } from "@/components/document-generator";
import { ProgressTracker } from "@/components/progress-tracker";

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-legal-secondary to-legal-primary bg-clip-text text-transparent">
            Empowering Your Rights with
          </h1>
          <h2 className="text-4xl font-bold text-legal-text-light">
            Intelligent Legal Tech
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant AI-powered assessment of your legal case, upload evidence,
            and connect with community support - all in one platform.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - AI Assessment */}
          <div className="lg:col-span-1">
            <AIAssessmentCard />
          </div>

          {/* Middle Column - Evidence Upload */}
          <div className="lg:col-span-1">
            <EvidenceUploadZone />
          </div>

          {/* Right Column - Community */}
          <div className="lg:col-span-1">
            <CommunityConnections />
          </div>
        </div>

        {/* Bottom Row - Document Generation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentGenerator />
          <ProgressTracker />
        </div>
      </div>
    </MainLayout>
  );
}