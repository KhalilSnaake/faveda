"use client";

const checkoutSteps = [
  { id: 1, label: "Informations" },
  { id: 2, label: "Livraison" },
  { id: 3, label: "Paiement" },
  { id: 4, label: "Confirmation" },
];

export function CheckoutStepper({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      {checkoutSteps.map((step, index) => (
        <div key={step.id} className="flex flex-1 items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`grid h-9 w-9 place-items-center rounded-full text-sm font-medium transition ${
                current >= step.id
                  ? "bg-leaf text-cream"
                  : "border border-leaf/15 bg-paper text-muted"
              }`}
            >
              {current > step.id ? "✓" : step.id}
            </div>
            <span className="hidden text-[11px] text-muted sm:block">{step.label}</span>
          </div>
          {index < checkoutSteps.length - 1 && (
            <div
              className={`mx-2 h-0.5 flex-1 rounded-full transition ${
                current > step.id ? "bg-leaf" : "bg-leaf/15"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
