"use client";

import { useState } from "react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-6 space-y-3">
      {items.map((item, index) => (
        <button
          key={item.q}
          type="button"
          onClick={() => setOpen(index === open ? -1 : index)}
          className="w-full rounded-[24px] bg-paper px-5 py-4 text-left"
        >
          <p className="font-medium text-leaf-dark">{item.q}</p>
          {open === index && <p className="mt-2 text-sm leading-6 text-muted">{item.a}</p>}
        </button>
      ))}
    </div>
  );
}
