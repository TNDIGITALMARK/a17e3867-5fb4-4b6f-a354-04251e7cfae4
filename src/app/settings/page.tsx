import { MainLayout } from "@/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Download,
  Trash2,
  AlertTriangle,
  Save
} from "lucide-react";

export const dynamic = 'force-dynamic'

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-legal-secondary" />
          <h1 className="text-3xl font-bold text-legal-text-light">Platform Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your account preferences, notifications, and privacy settings
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-legal-card-bg border-legal-secondary/20">
              <CardHeader>
                <CardTitle className="text-legal-text-light">Settings Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { icon: User, label: "Profile", active: true },
                  { icon: Bell, label: "Notifications", active: false },
                  { icon: Shield, label: "Privacy & Security", active: false },
                  { icon: Palette, label: "Appearance", active: false },
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant={item.active ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-2 ${
                      item.active ? "bg-legal-secondary/10 text-legal-secondary" : "text-legal-text-light"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card className="bg-legal-card-bg border-legal-secondary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-legal-secondary" />
                  <CardTitle className="text-legal-text-light">Profile Information</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-legal-text-light">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="bg-legal-secondary/5 border-legal-secondary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-legal-text-light">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="bg-legal-secondary/5 border-legal-secondary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-legal-text-light">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-legal-secondary/5 border-legal-secondary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-legal-text-light">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    className="bg-legal-secondary/5 border-legal-secondary/20"
                    rows={3}
                  />
                </div>

                <Button className="bg-legal-secondary hover:bg-legal-secondary/80 text-legal-secondary-foreground">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-legal-card-bg border-legal-secondary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-legal-secondary" />
                  <CardTitle className="text-legal-text-light">Notification Preferences</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Choose how you want to receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    title: "Case Updates",
                    description: "Get notified about important changes to your cases",
                    defaultChecked: true
                  },
                  {
                    title: "Document Reminders",
                    description: "Receive reminders about pending document uploads",
                    defaultChecked: true
                  },
                  {
                    title: "Legal Deadlines",
                    description: "Alert me about upcoming legal deadlines",
                    defaultChecked: true
                  },
                  {
                    title: "Platform Updates",
                    description: "Notify me about new features and platform updates",
                    defaultChecked: false
                  },
                  {
                    title: "Marketing Communications",
                    description: "Receive promotional emails and newsletters",
                    defaultChecked: false
                  }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-legal-text-light font-medium">{setting.title}</Label>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch defaultChecked={setting.defaultChecked} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="bg-legal-card-bg border-legal-secondary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-legal-secondary" />
                  <CardTitle className="text-legal-text-light">Privacy & Security</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Manage your privacy settings and account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-legal-text-light font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-legal-secondary text-legal-secondary">
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-legal-text-light font-medium">Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">All your data is encrypted at rest and in transit</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-legal-text-light font-medium">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Automatically sign out after 30 minutes of inactivity</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="bg-legal-card-bg border-legal-secondary/20">
              <CardHeader>
                <CardTitle className="text-legal-text-light">Data Management</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Export or delete your account data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-legal-secondary/5 rounded-lg">
                  <div>
                    <Label className="text-legal-text-light font-medium">Export Data</Label>
                    <p className="text-sm text-muted-foreground">Download all your case data and documents</p>
                  </div>
                  <Button variant="outline" className="border-legal-secondary text-legal-secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-lg">
                  <div>
                    <Label className="text-red-400 font-medium flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Delete Account
                    </Label>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}