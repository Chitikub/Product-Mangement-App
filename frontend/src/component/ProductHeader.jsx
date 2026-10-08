import React from "react";
import { Package } from "lucide-react";

function ProductHeader() {
  return (
    <header className="hero-panel rounded-box px-5 py-7 text-blue-500 shadow-xl sm:px-8">
      <div className="flex flex-col gap 6 sm:flex-row sm:item-end sm:justify-between">
        <div>
          <div className="mb-3 flex  items-center gap-3">
            <div className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-blue-500">
              <Package className="size-7" />
            </div>
            <span className="badge badge-outline border-blue-500 text-black font-bold ring-1 ring-white/40 sm:text-sm">
              Product
            </span>
          </div>
          <h1 className="text-2xl font-bold  tracking-tight sm: text-4xl">
            Product Management
          </h1>
          <p className="mt-2 max-w-xl text-sm text-black ">
            จัดการสินค้าและราคาได้อย่างรวดเร็ว
          </p>
        </div>
      </div>
    </header>
  );
}

export default ProductHeader;
