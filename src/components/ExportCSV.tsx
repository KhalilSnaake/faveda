"use client";

import { Download } from "lucide-react";
import { formatCfa } from "@/lib/format";
import { statusLabel, paymentLabel } from "@/lib/catalog";

type Order = {
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  paymentMethod: string;
  status: string;
  total: number;
  createdAt: string;
};

export function ExportCSV({ orders }: { orders: Order[] }) {
  function download() {
    const headers = ["Code suivi", "Client", "Téléphone", "Ville", "Adresse", "Paiement", "Statut", "Total", "Date"];
    const rows = orders.map((order) => [
      order.trackingCode,
      order.customerName,
      order.customerPhone,
      order.city,
      `"${order.address.replace(/"/g, '""')}"`,
      paymentLabel(order.paymentMethod),
      statusLabel(order.status),
      formatCfa(order.total),
      new Date(order.createdAt).toLocaleDateString("fr-FR"),
    ]);

    const csv = [headers.join(";"), ...rows.map((row) => row.join(";"))].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `faveda-commandes-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="inline-flex items-center gap-2 rounded-full border border-leaf/15 px-4 py-2 text-sm text-leaf-dark transition hover:bg-leaf-mist"
    >
      <Download size={14} /> Export CSV
    </button>
  );
}
