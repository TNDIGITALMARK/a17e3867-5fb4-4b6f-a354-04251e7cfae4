import { MainLayout } from "@/components/main-layout";
import { EvidenceUploadZone } from "@/components/evidence-upload-zone";
import { EvidenceGallery } from "@/components/evidence-gallery";
import { CaseTimeline } from "@/components/case-timeline";
import { CaseMetrics } from "@/components/case-metrics";
import { DocumentLibrary } from "@/components/document-library";

export const dynamic = 'force-dynamic'

export default function CasesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-legal-text-light">
              Case Dashboard & Evidence Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your case evidence, track progress, and organize documentation
            </p>
          </div>
        </div>

        {/* Metrics Row */}
        <CaseMetrics />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Evidence Upload */}
            <EvidenceUploadZone />

            {/* Case Timeline */}
            <CaseTimeline />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Evidence Gallery */}
            <EvidenceGallery />

            {/* Document Library */}
            <DocumentLibrary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}