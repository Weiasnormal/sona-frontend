import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const navLinkClass = "flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm lg:text-base 2xl:text-lg font-medium text-muted-foreground transition-colors transition-transform duration-200 xl:px-4 xl:py-2.5 2xl:px-5 2xl:py-3 whitespace-nowrap"

export default function MBTICard() {  
  return (
    <Card className="overflow-hidden lg:col-span-5 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
      <CardHeader className="p-5 sm:p-6 lg:p-7 bg-muted/50">
        <div className="flex justify-between items-start sm:items-center flex-wrap gap-2">
          <div>
            <CardTitle className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              INFJ Profile
            </CardTitle>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              The Advocate
            </p>
          </div>

          <Link 
            href="/mbti/profile" 
            className="inline-flex items-center text-sm sm:text-base lg:text-lg font-medium text-primary hover:text-primary/90 mt-1 sm:mt-0 transition-colors group"
          >
            Explore Deeper
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </CardHeader>

<CardContent className="grid gap-4 sm:gap-5 p-5 sm:p-6 lg:p-7">
  <div className="grid grid-cols-2 gap-4 sm:gap-5">
    <div className={`${navLinkClass} justify-start sm:gap-10 bg-muted/30 hover:bg-muted/40 hover:scale-105 transition-transform`}>
      <span className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-600">I</span>
      <span className="col-span-3 text-sm sm:text-base lg:text-lg text-muted-foreground">Introvert</span>
    </div>  
    <div className={`${navLinkClass} justify-start sm:gap-10 bg-muted/30 hover:bg-muted/40 hover:scale-105 transition-transform`}>
      <span className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-600">N</span>
      <span className="col-span-3 text-sm sm:text-base lg:text-lg text-muted-foreground">Intuitive</span>
    </div>
    <div className={`${navLinkClass} justify-start sm:gap-10 bg-muted/30 hover:bg-muted/40 hover:scale-105 transition-transform`}>
      <span className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-600">F</span>
      <span className="col-span-3 text-sm sm:text-base lg:text-lg text-muted-foreground">Feeling</span>
    </div>
    <div className={`${navLinkClass} justify-start sm:gap-10 bg-muted/30 hover:bg-muted/40 hover:scale-105 transition-transform`}>
      <span className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-600">J</span>
      <span className="col-span-3 text-sm sm:text-base lg:text-lg text-muted-foreground">Judging</span>
    </div>
  </div>
 
</CardContent>
</Card>
  )
}