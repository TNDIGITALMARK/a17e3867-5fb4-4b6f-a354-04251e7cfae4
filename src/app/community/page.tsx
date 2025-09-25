import { MainLayout } from "@/components/main-layout";
import { CommunityConnections } from "@/components/community-connections";
import { ResourceLibrary } from "@/components/resource-library";
import { CommunityStats } from "@/components/community-stats";
import { SuccessStories } from "@/components/success-stories";
import { LegalExperts } from "@/components/legal-experts";

export const dynamic = 'force-dynamic'

export default function CommunityPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-legal-text-light">
            Community & Legal Resources Hub
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with others, access legal resources, and learn from success stories
            in our supportive community platform
          </p>
        </div>

        {/* Community Stats */}
        <CommunityStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Community */}
          <div className="lg:col-span-1 space-y-6">
            <CommunityConnections />
            <SuccessStories />
          </div>

          {/* Middle Column - Resources */}
          <div className="lg:col-span-1">
            <ResourceLibrary />
          </div>

          {/* Right Column - Experts */}
          <div className="lg:col-span-1">
            <LegalExperts />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}