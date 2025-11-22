
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Database,
  Share2,
  KeyRound,
  ShieldCheck,
  FileCode,
} from "lucide-react";

export default function BackendExplanationPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Share2 className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-bold font-headline">
            Understanding the Backend
          </h1>
          <p className="text-lg text-muted-foreground">
            How your application's data and security work without a traditional API.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="text-accent" />
            1. The Database: Google Firestore
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            This application uses **Google Firestore** as its database. Firestore is a NoSQL, document-based database, which means data is stored in a way that looks very similar to JSON.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              **Collections**: Think of these as folders (e.g., `users`, `courses`, `notices`).
            </li>
            <li>
              **Documents**: These are the individual files inside the folders. Each document has a unique ID and contains the actual data (e.g., a specific user's profile).
            </li>
          </ul>
          <p>
            The overall structure of our database is defined as a blueprint in the `docs/backend.json` file.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="text-accent" />
            2. Where is the API? The "API-less" Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            You might be wondering where the backend code for the API is. The answer is: **there isn't one!**
          </p>
          <p>
            This app uses a modern "API-less" or "backend-as-a-service" architecture. Instead of your app talking to an API server that you built, which then talks to the database, your app communicates **directly and securely with Firebase services** from the user's browser.
          </p>
          <p>
            This is made possible by the **Firebase Client SDK (Software Development Kit)**, which is a library that provides all the functions needed to interact with Firebase services.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="text-accent" />
            3. Authentication: Firebase Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            User login is handled by **Firebase Authentication**. When a user signs in on the login page (`src/app/page.tsx`), the Firebase SDK securely communicates with the authentication service to verify their credentials.
          </p>
          <p>
            Once logged in, Firebase provides an authentication token that is automatically attached to all future requests to other Firebase services, like Firestore. This is how the system knows who is making a request.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="text-accent" />
            4. Security: How is the data protected?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            This is the most critical part of an API-less architecture. If the browser talks directly to the database, what stops a malicious user from reading or deleting all the data?
          </p>
          <p>
            The answer is **Firestore Security Rules**.
          </p>
          <p>
            The `firestore.rules` file contains a set of rules that live on the Firebase servers. Before any data operation (read, write, delete) is allowed, Firebase checks these rules. The rules look at the incoming request's authentication token (from Step 3) to determine if the user is allowed to perform that action.
          </p>
           <p>
            For example, a rule might say: `allow update: if isOwner(userId);` which means a user can only update their own profile document and no one else's. This makes the system very secure, as the rules are enforced on the server, not in the browser.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
