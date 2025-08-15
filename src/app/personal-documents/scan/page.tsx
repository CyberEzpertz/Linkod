"use client";
// src/app/personal-documents/scan/page.tsx
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// Camera SVG (Lucide or inline)
function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 size-5"
    >
      <path d="M23 19V7a2 2 0 0 0-2-2h-3.17a2 2 0 0 1-1.41-.59l-.83-.83A2 2 0 0 0 13.17 3h-2.34a2 2 0 0 0-1.42.59l-.83.83A2 2 0 0 1 7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h17a2 2 0 0 0 2-2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

// ID card aspect ratio ≈ 1.585 (width:height)
const RECT_WIDTH = 320;
const RECT_HEIGHT = Math.round(RECT_WIDTH / 1.585); // ≈ 202

export default function ScanNationalIdPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        // Handle error (camera denied)
      }
    }
    enableCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const handleTakePicture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const vw = video.videoWidth || RECT_WIDTH;
    const vh = video.videoHeight || RECT_HEIGHT;
    // Crop center rectangle (ID aspect ratio)
    const sx = Math.floor((vw - RECT_WIDTH) / 2);
    const sy = Math.floor((vh - RECT_HEIGHT) / 2);

    const canvas = document.createElement("canvas");
    canvas.width = RECT_WIDTH;
    canvas.height = RECT_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        video,
        sx,
        sy,
        RECT_WIDTH,
        RECT_HEIGHT,
        0,
        0,
        RECT_WIDTH,
        RECT_HEIGHT
      );
      const imageDataUrl = canvas.toDataURL("image/png");
      localStorage.setItem("scannedIdImage", imageDataUrl);
      router.push("/personal-documents/confirm");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div
          className="rounded-lg border-4 border-dashed border-white"
          style={{
            width: `${RECT_WIDTH}px`,
            height: `${RECT_HEIGHT}px`,
            background: "rgba(255,255,255,0.05)",
          }}
        />
      </div>
      <div className="relative z-20 flex w-full justify-center pb-8">
        <Button
          variant="default"
          size="lg"
          className="w-[90%] max-w-md"
          onClick={handleTakePicture}
        >
          <CameraIcon />
          Take Picture
        </Button>
      </div>
    </div>
  );
}
