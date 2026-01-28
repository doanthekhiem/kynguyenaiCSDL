// Newsletter Debug Page - KynguyenAI v3.0
// Admin page to debug and test newsletter sync

"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { ProcessingQueueItem, NewsletterNewsWithRelations } from "@/types";

interface TestSyncEmail {
  id: string;
  subject: string;
  from: string;
  receivedAt: string;
}

interface TestSyncResult {
  success: boolean;
  message?: string;
  error?: string;
  emailsFound?: number;
  processed?: number;
  created?: number;
  skipped?: number;
  emails?: TestSyncEmail[] | string[];
  errors?: string[];
  logs?: string[];
  duration?: number;
}

interface DebugInfo {
  config: {
    gmail: { configured: boolean; connected: boolean };
    perplexity: { configured: boolean; connected: boolean };
  };
  stats: {
    news: { total: number; latestDate: string | null };
    queue: {
      pending: number;
      processing: number;
      completed: number;
      failed: number;
    };
    sources: number;
  };
  recent: {
    queue: ProcessingQueueItem[];
    news: NewsletterNewsWithRelations[];
    pendingItems: ProcessingQueueItem[];
  };
  timestamp: string;
}

export default function NewsletterDebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [testSyncLoading, setTestSyncLoading] = useState(false);
  const [testSyncResult, setTestSyncResult] = useState<TestSyncResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const fetchDebugInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/newsletter/debug");
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      console.error("Error fetching debug info:", error);
    } finally {
      setLoading(false);
    }
  };

  const testSync = async () => {
    setTestSyncLoading(true);
    setTestSyncResult(null);
    setLogs([]);
    try {
      const response = await fetch("/api/newsletter/test-sync", {
        method: "POST",
      });
      const data = await response.json();
      setTestSyncResult(data);
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error("Error testing sync:", error);
      setTestSyncResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setTestSyncLoading(false);
    }
  };

  useEffect(() => {
    fetchDebugInfo();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchDebugInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Newsletter <span className="text-[hsl(199,89%,48%)]">Debug</span>
          </h1>
          <p className="text-muted-foreground">
            Kiểm tra và debug hệ thống newsletter sync
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={fetchDebugInfo}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-surface border border-surface-border hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            {loading ? "Đang tải..." : "Làm mới"}
          </button>
          <button
            onClick={testSync}
            disabled={testSyncLoading}
            className="px-4 py-2 rounded-lg bg-[hsl(199,89%,48%)] text-white hover:bg-[hsl(199,89%,43%)] transition-colors disabled:opacity-50"
          >
            {testSyncLoading ? "Đang test..." : "Test Sync (Dry Run)"}
          </button>
          <button
            onClick={async () => {
              setTestSyncLoading(true);
              setTestSyncResult(null);
              setLogs([]);
              try {
                const response = await fetch("/api/newsletter/test-full-sync", {
                  method: "POST",
                });
                const data = await response.json();
                setTestSyncResult(data);
                if (data.logs) {
                  setLogs(data.logs);
                }
                // Refresh debug info after full sync
                await fetchDebugInfo();
              } catch (error) {
                console.error("Error testing full sync:", error);
                setTestSyncResult({
                  success: false,
                  error: error instanceof Error ? error.message : "Unknown error",
                });
              } finally {
                setTestSyncLoading(false);
              }
            }}
            disabled={testSyncLoading}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {testSyncLoading ? "Đang xử lý..." : "Full Sync (Thực sự xử lý)"}
          </button>
        </div>

        {/* Configuration Status */}
        {debugInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Gmail Config */}
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Gmail Configuration</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Configured:</span>
                  <span
                    className={`font-medium ${debugInfo.config.gmail.configured ? "text-green-600" : "text-red-600"}`}
                  >
                    {debugInfo.config.gmail.configured ? "✓ Yes" : "✗ No"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Connected:</span>
                  <span
                    className={`font-medium ${debugInfo.config.gmail.connected ? "text-green-600" : "text-red-600"}`}
                  >
                    {debugInfo.config.gmail.connected ? "✓ Yes" : "✗ No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Perplexity Config */}
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Perplexity Configuration</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Configured:</span>
                  <span
                    className={`font-medium ${debugInfo.config.perplexity.configured ? "text-green-600" : "text-red-600"}`}
                  >
                    {debugInfo.config.perplexity.configured ? "✓ Yes" : "✗ No"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Connected:</span>
                  <span
                    className={`font-medium ${debugInfo.config.perplexity.connected ? "text-green-600" : "text-red-600"}`}
                  >
                    {debugInfo.config.perplexity.connected ? "✓ Yes" : "✗ No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        {debugInfo && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">Total News</div>
              <div className="text-2xl font-bold text-foreground">{debugInfo.stats.news.total}</div>
              {debugInfo.stats.news.latestDate && (
                <div className="text-xs text-muted-foreground mt-1">
                  Latest: {new Date(debugInfo.stats.news.latestDate).toLocaleDateString("vi-VN")}
                </div>
              )}
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">Pending</div>
              <div className="text-2xl font-bold text-orange-600">{debugInfo.stats.queue.pending}</div>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">Completed</div>
              <div className="text-2xl font-bold text-green-600">{debugInfo.stats.queue.completed}</div>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">Failed</div>
              <div className="text-2xl font-bold text-red-600">{debugInfo.stats.queue.failed}</div>
            </div>
          </div>
        )}

        {/* Test Sync Result */}
        {testSyncResult && (
          <div className="bg-surface border border-surface-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Test Sync Result</h2>
            <div
              className={`p-4 rounded-lg mb-4 ${testSyncResult.success ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
            >
              <div className="font-medium mb-2">
                {testSyncResult.success ? "✓ Success" : "✗ Failed"}
              </div>
              <div className="text-sm text-muted-foreground">
                {testSyncResult.message || testSyncResult.error}
              </div>
              {testSyncResult.emailsFound !== undefined && (
                <div className="text-sm text-muted-foreground mt-2">
                  Emails found: {testSyncResult.emailsFound}
                </div>
              )}
              {testSyncResult.duration && (
                <div className="text-sm text-muted-foreground mt-1">
                  Duration: {testSyncResult.duration}ms
                </div>
              )}
            </div>

            {/* Logs */}
            {logs.length > 0 && (
              <div>
                <h3 className="font-medium text-foreground mb-2">Logs:</h3>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="mb-1">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Email Details */}
            {testSyncResult.emails && testSyncResult.emails.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-foreground mb-2">Emails Found:</h3>
                <div className="space-y-2">
                  {testSyncResult.emails.map((email: TestSyncEmail | string, index: number) => {
                    if (typeof email === "string") {
                      return (
                        <div key={index} className="bg-surface-hover p-3 rounded-lg text-sm">
                          <div className="font-medium text-foreground">{email}</div>
                        </div>
                      );
                    }
                    return (
                      <div key={index} className="bg-surface-hover p-3 rounded-lg text-sm">
                        <div className="font-medium text-foreground">{email.subject}</div>
                        <div className="text-muted-foreground text-xs mt-1">
                          From: {email.from} | {new Date(email.receivedAt).toLocaleString("vi-VN")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recent Queue Items */}
        {debugInfo && debugInfo.recent.queue.length > 0 && (
          <div className="bg-surface border border-surface-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Queue Items</h2>
            <div className="space-y-2">
              {debugInfo.recent.queue.map((item, index) => (
                <div key={index} className="bg-surface-hover p-3 rounded-lg text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{item.email_subject}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : item.status === "failed"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : item.status === "processing"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleString("vi-VN")}
                    {item.error_message && (
                      <span className="text-red-600 ml-2">Error: {item.error_message}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent News */}
        {debugInfo && debugInfo.recent.news.length > 0 && (
          <div className="bg-surface border border-surface-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent News</h2>
            <div className="space-y-2">
              {debugInfo.recent.news.map((news, index) => (
                <div key={index} className="bg-surface-hover p-3 rounded-lg text-sm">
                  <div className="font-medium text-foreground mb-1">{news.title_vi}</div>
                  <div className="text-xs text-muted-foreground">
                    {news.published_at && new Date(news.published_at).toLocaleString("vi-VN")}
                    {news.source && ` | Source: ${news.source.name}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        {debugInfo && (
          <div className="text-center text-sm text-muted-foreground">
            Last updated: {new Date(debugInfo.timestamp).toLocaleString("vi-VN")}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
