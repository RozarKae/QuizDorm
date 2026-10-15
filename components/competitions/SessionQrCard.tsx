"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { QrCode, Copy, Check, Share2, Maximize2, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

interface SessionQrCardProps {
  code: string;
  competitionTitle?: string;
  className?: string;
}

export function getCanonicalJoinUrl(code: string): string {
  const norm = code.trim().toUpperCase();
  const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;
  let origin = "https://quizclassroom.versal.app";
  if (envUrl && !envUrl.includes("localhost")) {
    origin = envUrl.replace(/\/+$/, "");
  } else if (typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("localhost")) {
    origin = window.location.origin;
  }
  return `${origin}/student/live/join?code=${encodeURIComponent(norm)}`;
}

export function SessionQrCard({ code, competitionTitle, className = "" }: SessionQrCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const joinUrl = getCanonicalJoinUrl(code);

  useEffect(() => {
    if (!code) return;
    const url = getCanonicalJoinUrl(code);

    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: "#111827",
        light: "#FFFFFF",
      },
    })
      .then((dataUri) => {
        setQrDataUrl(dataUri);
      })
      .catch((err) => {
        console.error("QR Code generation error:", err);
      });
  }, [code]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      toast.success("Join link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: competitionTitle ? `${competitionTitle} | QuizDorm Arena` : "QuizDorm Live Arena",
          text: `Join the live quiz arena on QuizDorm! Room PIN: ${code}`,
          url: joinUrl,
        });
        toast.success("Shared successfully!");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `quizdorm-${code}-qr.png`;
    link.click();
    toast.success("QR code downloaded");
  };

  return (
    <div className={`p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-indigo-200 flex items-center">
          <QrCode className="w-3.5 h-3.5 mr-1 text-amber-300" />
          ARENA QR JOIN
        </span>
        <button
          onClick={() => setDialogOpen(true)}
          className="text-white/70 hover:text-white transition-colors"
          title="Full Screen Projector QR"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Scannable QR code display */}
        <div
          onClick={() => setDialogOpen(true)}
          className="bg-white p-2.5 rounded-2xl shadow-lg shrink-0 cursor-pointer hover:scale-105 transition-transform"
        >
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt={`Scan QR code to join room ${code}`}
              className="w-28 h-28 object-contain rounded-lg"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center text-gray-400 text-xs">
              Generating QR...
            </div>
          )}
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
          <div>
            <p className="text-[10px] uppercase font-mono text-indigo-200">GAME PIN CODE</p>
            <p className="text-2xl font-mono font-extrabold tracking-widest text-amber-300">
              {code}
            </p>
          </div>

          <p className="text-[11px] text-indigo-100/90 leading-tight">
            Scan from phone or open: <br />
            <span className="font-mono text-[10px] text-white underline break-all">{joinUrl}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
            <Button
              size="sm"
              onClick={handleCopyLink}
              variant="outline"
              className="h-7 text-[11px] font-mono border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg px-2.5"
            >
              {copied ? <Check className="w-3 h-3 mr-1 text-emerald-400" /> : <Copy className="w-3 h-3 mr-1" />}
              {copied ? "Copied" : "Copy Link"}
            </Button>

            <Button
              size="sm"
              onClick={handleShare}
              variant="outline"
              className="h-7 text-[11px] font-mono border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg px-2.5"
            >
              <Share2 className="w-3 h-3 mr-1 text-amber-300" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Enlarged Dialog for Projectors & Classrooms */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-gray-950 text-white border-gray-800 text-center p-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display text-white">
              Scan to Join Live Arena
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-400">
              Point your smartphone camera at this QR code or navigate to the link below
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-white p-4 rounded-3xl inline-block mx-auto shadow-2xl">
              {qrDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt={`Scan QR code to join room ${code}`}
                  className="w-64 h-64 object-contain rounded-xl mx-auto"
                />
              )}
            </div>

            <div className="p-3 bg-gray-900 rounded-2xl border border-gray-800 space-y-1">
              <p className="text-[10px] font-mono uppercase text-gray-400">ROOM PIN</p>
              <p className="text-3xl font-mono font-black tracking-widest text-amber-400">{code}</p>
              <p className="text-xs font-mono text-gray-300 break-all">{joinUrl}</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={handleCopyLink}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs"
              >
                <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy Direct Link
              </Button>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="border-gray-700 hover:bg-gray-900 text-gray-200 font-mono text-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download QR
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
