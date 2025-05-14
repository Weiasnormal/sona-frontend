import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WelcomeSection() {
  return (
    <div className="space-y-6 py-8">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back, Sarah!</CardTitle>
          <CardDescription>Your personality type is INFJ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Your top traits:</p>
              <ul className="list-disc list-inside text-sm">
                <li>Introverted</li>
                <li>Intuitive</li>
                <li>Feeling</li>
                <li>Judging</li>
              </ul>
            </div>
            <Button variant="outline">View Full Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Music Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Chill Vibes</h2>
          <Button variant="ghost" className="text-blue-600">See All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Music Cards */}
          <Card>
            <CardContent className="p-4">
              <div className="aspect-square rounded-lg bg-gray-100 mb-3" />
              <h3 className="font-medium">Peaceful Piano</h3>
              <p className="text-sm text-gray-500">Relax and indulge</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="aspect-square rounded-lg bg-gray-100 mb-3" />
              <h3 className="font-medium">Deep Focus</h3>
              <p className="text-sm text-gray-500">Keep calm and focus</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="aspect-square rounded-lg bg-gray-100 mb-3" />
              <h3 className="font-medium">Nature Sounds</h3>
              <p className="text-sm text-gray-500">Natural white noise</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 