'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, User } from "lucide-react";
import "@/app/globals.css";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="text-2xl font-bold flex items-center gap-2">
          <Music className="w-6 h-6 text-pink-400" />
          Sona Music
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="ghost">Explore</Button>
          <Button variant="ghost">My MBTI</Button>
          <Button variant="ghost">Settings</Button>
          <Button variant="outline" className="text-white border-white">Logout</Button>
        </div>
      </nav>

      {/* Greeting Section */}
      <header className="px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">Welcome back, Alex!</h1>
        <p className="text-xl text-gray-300">Your MBTI Type: INFP - The Mediator 🎵</p>
      </header>

      {/* MBTI Summary Card */}
      <div className="px-6 pb-6">
        <Card className="bg-white bg-opacity-10 text-white w-full md:w-1/2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Your Personality Summary</h2>
            <p className="mb-4 text-gray-300">
              As an INFP, you’re introspective, idealistic, and guided by your values. Here’s music that resonates with your vibe.
            </p>
            <Button variant="secondary">Explore Deeper</Button>
          </CardContent>
        </Card>
      </div>

      {/* Music Carousels */}
      <section className="space-y-12 px-6 pb-24">
        {[
          "Chill Vibes",
          "Focus Mode",
          "Energy Boost",
          "INFP Compatible Picks"
        ].map((category) => (
          <div key={category}>
            <h3 className="text-2xl font-bold mb-4">{category}</h3>
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {[...Array(10)].map((_, i) => (
                <Card
                  key={i}
                  className="min-w-[160px] bg-white bg-opacity-10 hover:bg-opacity-20 transition p-4 rounded-2xl flex flex-col items-center text-center"
                >
                  <img
                    src={`https://via.placeholder.com/150?text=Track+${i + 1}`}
                    alt={`Track ${i + 1}`}
                    className="rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium">Track {i + 1}</p>
                  <p className="text-xs text-gray-400">Artist Name</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Music Player */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-md p-4 flex justify-between items-center text-sm">
        <div className="flex gap-4 items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Now Playing"
            className="rounded"
          />
          <div>
            <p className="font-medium">Now Playing</p>
            <p className="text-gray-400">Track Name - Artist</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="ghost">⏮️</Button>
          <Button variant="ghost">⏯️</Button>
          <Button variant="ghost">⏭️</Button>
        </div>
      </footer>
    </div>
  );
}
