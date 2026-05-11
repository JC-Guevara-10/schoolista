type SummaryCardProps = {
  totalCount: number;
  trend: string;
  currentTerm: string;
};

export default function SummaryCard({
  totalCount,
  trend,
  currentTerm,
}: SummaryCardProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase">
        Current Summary
      </p>
      <h2 className="text-3xl font-bold text-slate-800 mt-2">
        {totalCount}
      </h2>
      <p className="text-sm text-slate-500 mt-1">{currentTerm}</p>
      <p className="text-xs text-emerald-600 mt-2">{trend}</p>
    </div>
  );
}