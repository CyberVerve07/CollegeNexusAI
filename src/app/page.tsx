import Image from "next/image";
import { Building2 } from "lucide-react";
import { LoginCard } from "@/components/login-card";
import placeholderImages from '@/lib/placeholder-images.json'

export default function Home() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === "hero-background");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background dark:bg-black">
       <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        {heroImage && <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <div className="flex items-center gap-3 mb-8 text-primary">
          <Building2 className="h-12 w-12" />
          <h1 className="text-5xl font-bold font-headline text-foreground">
            CollegeNexus AI
          </h1>
        </div>
        <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
          Your all-in-one college management solution. Please select your role to continue.
        </p>
        <LoginCard />
      </div>
    </main>
  );
}
