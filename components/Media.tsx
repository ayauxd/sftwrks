/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

interface MediaProps {
  onBack: () => void;
}

// Featured videos - add your YouTube/Vimeo URLs here
const FEATURED_VIDEOS = [
  {
    id: 'v1',
    title: 'Introduction to Softworks',
    description: 'Learn how we help businesses implement AI strategically.',
    embedUrl: '', // Add YouTube embed URL like: https://www.youtube.com/embed/VIDEO_ID
    thumbnail: '/assets/hero/bridge-metaphor.png',
    duration: '3:45',
    type: 'youtube' as const
  },
  {
    id: 'v2',
    title: 'AI Strategy Explained',
    description: 'Understanding the framework behind successful AI implementations.',
    embedUrl: '',
    thumbnail: '/assets/sections/strategy-map.png',
    duration: '5:20',
    type: 'youtube' as const
  },
  {
    id: 'v3',
    title: 'Case Study: Automating Compliance',
    description: 'How we helped a logistics company reduce processing time by 90%.',
    embedUrl: '',
    thumbnail: '/assets/case-studies/landmark-gears.png',
    duration: '7:15',
    type: 'youtube' as const
  }
];

const Media: React.FC<MediaProps> = ({ onBack }) => {
  // Load Twitter widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0A1628] pt-24">
      {/* Header */}
      <div className="px-6 lg:px-12 py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[#00D4FF] transition-colors mb-8 font-mono"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          
          <span className="font-mono text-xs text-[#00D4FF] uppercase tracking-widest">Media Hub</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 font-['Courier_Prime']">
            Videos & Updates
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl">
            Watch our latest content, case study breakdowns, and stay connected with our updates.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Video Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-['Courier_Prime']">
              Featured Videos
            </h2>
            
            <div className="space-y-8">
              {FEATURED_VIDEOS.map((video, idx) => (
                <div key={video.id} className="group">
                  {/* Video Embed or Placeholder */}
                  <div className="aspect-video bg-slate-200 dark:bg-[#1E3A5F] rounded-lg overflow-hidden relative border border-slate-300 dark:border-slate-700">
                    {video.embedUrl ? (
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-60"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-[#00D4FF]/90 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                            <svg className="w-8 h-8 text-[#0A1628] ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        {/* Coming Soon Badge */}
                        <div className="absolute top-4 right-4 bg-[#0A1628]/80 px-3 py-1 text-xs font-mono text-[#00D4FF] uppercase">
                          Coming Soon
                        </div>
                        {/* Duration */}
                        <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 text-xs font-mono text-white">
                          {video.duration}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Video Info */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Courier_Prime'] group-hover:text-[#00D4FF] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-3">Want to be featured?</h3>
              <p className="text-slate-400 mb-6">
                We produce case study videos for our clients. Interested in showcasing your AI transformation?
              </p>
              <a
                href="mailto:agents@sftwrks.com?subject=Video%20Feature%20Interest"
                className="inline-block bg-[#00D4FF] text-[#0A1628] px-6 py-3 font-semibold text-sm uppercase tracking-wider hover:bg-[#22D3EE] transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Twitter Feed - Takes 1 column */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-['Courier_Prime']">
              Latest Updates
            </h2>
            
            {/* Twitter Timeline Embed */}
            <div className="bg-white dark:bg-[#1E3A5F] rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <a
                className="twitter-timeline"
                data-height="800"
                data-theme="dark"
                data-chrome="noheader nofooter noborders transparent"
                href="https://twitter.com/sftwrks"
              >
                Loading tweets...
              </a>
              
              {/* Fallback if no Twitter handle set */}
              <div className="p-6 text-center" id="twitter-fallback">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-[#0A1628] flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                  Follow us on X for the latest AI insights and updates.
                </p>
                <a
                  href="https://twitter.com/sftwrks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#00D4FF] hover:underline text-sm font-medium"
                >
                  @sftwrks
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 p-6 bg-white dark:bg-[#1E3A5F] rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Connect With Us</h3>
              <div className="space-y-3">
                <a
                  href="https://twitter.com/sftwrks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X (Twitter)</span>
                </a>
                <a
                  href="https://linkedin.com/company/softworkstrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://youtube.com/@softworkstrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
