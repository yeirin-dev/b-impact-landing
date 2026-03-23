"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const STORAGE_KEY = "popup-ad-dismissed";

export default function PopupAd() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      if (
        dismissedDate.getFullYear() === now.getFullYear() &&
        dismissedDate.getMonth() === now.getMonth() &&
        dismissedDate.getDate() === now.getDate()
      ) {
        return;
      }
    }
    setVisible(true);
  }, []);

  const handleClose = () => setVisible(false);

  const handleDismissToday = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[420px] max-h-[90vh] rounded-2xl overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href="https://forms.gle/AVAwKCxfjWU1Edxb8"
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-auto max-h-[75vh]"
        >
          <Image
            src="/popup-ad.png"
            alt="예이린 아동·청소년 마음성장 아카데미 4월 특강 안내"
            width={2338}
            height={3316}
            className="w-full h-auto"
            priority
          />
        </a>
        <div className="flex border-t border-gray-200">
          <button
            onClick={handleDismissToday}
            className="flex-1 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            오늘 하루 보지 않기
          </button>
          <div className="w-px bg-gray-200" />
          <button
            onClick={handleClose}
            className="flex-1 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
