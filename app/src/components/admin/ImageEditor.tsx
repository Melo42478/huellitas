"use client";

import { useRef, useState, useEffect } from "react";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (canvas: HTMLCanvasElement) => void;
  onCancel: () => void;
}

export default function ImageEditor({
  imageUrl,
  onSave,
  onCancel,
}: ImageEditorProps) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const saveCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Draw canvas with current zoom/offset
  const drawCanvas = (canvas: HTMLCanvasElement | null, isPreview = true) => {
    if (!canvas || !imgRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    // Ensure zoom is within valid range
    const validZoom = Math.max(0.25, Math.min(3, zoom));
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);

    const img = imgRef.current;
    const scaledWidth = img.naturalWidth * validZoom;
    const scaledHeight = img.naturalHeight * validZoom;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 400, 400);
    ctx.clip();

    ctx.drawImage(
      img,
      0, 0,
      img.naturalWidth, img.naturalHeight,
      offsetX, offsetY,
      scaledWidth, scaledHeight
    );

    ctx.restore();

    if (isPreview) {
      console.log("Preview updated - zoom:", zoom.toFixed(2), "offset:", offsetX.toFixed(0), offsetY.toFixed(0));
    }
  };

  // Update preview whenever zoom/offset changes
  useEffect(() => {
    drawCanvas(previewCanvasRef.current, true);
  }, [zoom, offsetX, offsetY]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setIsDragging(true);
    setDragStart({
      x: (e.clientX - rect.left) - offsetX,
      y: (e.clientY - rect.top) - offsetY,
    });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const rect = canvas.getBoundingClientRect();

    setOffsetX((e.clientX - rect.left) - dragStart.x);
    setOffsetY((e.clientY - rect.top) - dragStart.y);
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const newZoom = Math.max(0.5, Math.min(3, zoom - e.deltaY * 0.001));
    setZoom(newZoom);
  };

  const handleSave = async () => {
    if (!saveCanvasRef.current || !imgRef.current) return;

    // Draw the canvas
    drawCanvas(saveCanvasRef.current, false);

    // Wait a moment for canvas to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = saveCanvasRef.current;
    console.log("✓ Canvas ready for save - checking content...");

    // Verify canvas has content
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    console.log("Canvas data URL length:", dataUrl.length);

    if (dataUrl.length < 5000) {
      console.warn("⚠️ WARNING: Canvas might be empty!");
      return;
    }

    onSave(canvas);
  };

  const resetImage = () => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-card max-w-2xl w-full">
        <div className="p-6 border-b border-border">
          <h3 className="font-display font-extrabold text-xl text-text">
            Editar Imagen - Vista Previa (400x400)
          </h3>
          <p className="text-xs text-text-muted mt-1">La imagen se verá exactamente así cuando se guarde</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Canvas preview - shows exactly what will be saved */}
          <canvas
            ref={previewCanvasRef}
            width={400}
            height={400}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            onWheel={handleCanvasWheel}
            className="w-full border-2 border-dashed border-border rounded-row cursor-grab active:cursor-grabbing bg-white"
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
            }}
          />

          {/* Hidden image for canvas drawing */}
          <img
            ref={imgRef}
            src={imageUrl}
            alt="edit"
            style={{ display: "none" }}
            onLoad={() => {
              drawCanvas(previewCanvasRef.current, true);
            }}
          />

          <div className="space-y-2">
            <label className="block text-sm font-bold text-text">
              Zoom: {(zoom * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-text-muted">
              Arrastra en la imagen para centrar • Rueda del ratón para zoom
            </p>
          </div>

          <button
            onClick={resetImage}
            className="w-full px-4 py-2 border border-border rounded-row text-sm font-bold text-text hover:bg-surface transition-colors"
          >
            Restablecer
          </button>
        </div>

        <div className="p-6 border-t border-border flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-border rounded-pill font-bold text-sm hover:bg-surface cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-teal text-white rounded-pill font-bold text-sm hover:bg-teal-dark cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Hidden canvas for final save */}
      <canvas ref={saveCanvasRef} style={{ display: "none" }} />
    </div>
  );
}
