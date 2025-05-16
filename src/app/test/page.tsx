'use client';

import { useState } from 'react';

export default function TestPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <main className="min-h-screen bg-background p-4 text-foreground antialiased">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Theme Preview</h1>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Toggle {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Theme Colors */}
        <section className="mb-12 rounded-lg bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-card-foreground">Theme Colors</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-primary shadow-sm transition-transform hover:scale-105" />
              <p className="font-medium">Primary</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-secondary shadow-sm transition-transform hover:scale-105" />
              <p className="font-medium">Secondary</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-accent shadow-sm transition-transform hover:scale-105" />
              <p className="font-medium">Accent</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-muted shadow-sm transition-transform hover:scale-105" />
              <p className="font-medium">Muted</p>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-12 rounded-lg bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-card-foreground">Border Radius</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="space-y-3">
              <div className="h-24 rounded-sm bg-primary shadow-sm transition-transform hover:scale-105" />
              <p className="font-medium">Small</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-md bg-primary shadow-sm transition-transform hover:scale-105" />
              <p className="font-medium">Medium</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-primary shadow-sm transition-transform hover:scale-105" />
              <p className="font-medium">Large</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-xl bg-primary shadow-sm transition-transform hover:scale-105" />
              <p className="font-medium">Extra Large</p>
            </div>
          </div>
        </section>

        {/* Chart Colors */}
        <section className="mb-12 rounded-lg bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-card-foreground">Chart Colors</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="space-y-3">
                <div className={`h-24 rounded-lg bg-chart-${num} shadow-sm transition-transform hover:scale-105`} />
                <p className="font-medium">Chart {num}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cards */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold">Cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="group rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                Regular Card
              </h3>
              <p className="text-card-foreground/80">
                This is a card with default styling. Hover to see the shadow effect.
              </p>
            </div>
            <div className="group rounded-lg bg-sidebar p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-sidebar-foreground">
                Sidebar Style
              </h3>
              <p className="text-sidebar-foreground/80">
                This uses sidebar color variants. Hover to see the shadow effect.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 