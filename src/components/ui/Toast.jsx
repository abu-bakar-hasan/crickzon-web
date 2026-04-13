"use client";
import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: "#F0FDF4", border: "#86EFAC", text: "#166534", icon: "✓" },
    error: { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B", icon: "✕" },
    info: { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF", icon: "ℹ" },
    warning: { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E", icon: "⚠" },
  };

  const c = colors[type] || colors.info;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        padding: "14px 20px",
        minWidth: 280,
        maxWidth: 400,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        animation: "slideIn 200ms ease",
      }}
    >
      <span style={{ fontSize: 16, color: c.text, fontWeight: 700 }}>
        {c.icon}
      </span>
      <span style={{ fontSize: 14, color: c.text, flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: c.text,
          fontSize: 16,
          padding: 0,
        }}
      >
        ×
      </button>
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
