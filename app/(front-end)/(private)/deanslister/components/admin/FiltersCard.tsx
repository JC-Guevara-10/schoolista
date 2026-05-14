type FiltersCardProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
};

export default function FiltersCard({
  searchValue,
  onSearchChange,
  onClearFilters,
}: FiltersCardProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase mb-3">
        Filters
      </p>

      <input
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search student..."
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={onClearFilters}
        className="mt-3 w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
      >
        Clear Filters
      </button>
    </div>
  );
}
