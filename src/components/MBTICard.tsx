import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function MBTICard() {
  return (
    <Card className="shadow-lg bg-white">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">INFJ Profile</CardTitle>
          <CardDescription className="text-gray-600">The Advocate</CardDescription>
        </div>
        <Link 
          href="/mbti/infj" 
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
        >
          Explore Deeper →
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-blue-600 text-2xl font-bold mb-1">I</span>
            <span className="text-sm text-gray-600">Introvert</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-blue-600 text-2xl font-bold mb-1">N</span>
            <span className="text-sm text-gray-600">Intuitive</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-blue-600 text-2xl font-bold mb-1">F</span>
            <span className="text-sm text-gray-600">Feeling</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-blue-600 text-2xl font-bold mb-1">J</span>
            <span className="text-sm text-gray-600">Judging</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 