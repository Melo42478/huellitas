"use client";

import { lazy, Suspense } from "react";

const DonateModal = lazy(() => import("./DonateModal"));

export default function DonateModalLazy() {
  return (
    <Suspense fallback={null}>
      <DonateModal />
    </Suspense>
  );
}
