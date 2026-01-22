import { Search, ChevronDown } from "lucide-react";
import { type FilterOptions, REGIONS, SUPPORT_TYPES } from "../types";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-card p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="자격증 이름, 기관, 키워드로 검색..."
            value={filters.keyword || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, keyword: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none transition-all text-sm"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2">
          {/* Region Filter */}
          <div className="relative">
            <select
              value={filters.region || "전체"}
              onChange={(e) =>
                onFilterChange({ ...filters, region: e.target.value })
              }
              className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none transition-all cursor-pointer text-sm min-w-[100px]"
            >
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filters.status || "all"}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  status: e.target.value as FilterOptions["status"],
                })
              }
              className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none transition-all cursor-pointer text-sm min-w-[100px]"
            >
              <option value="all">전체 상태</option>
              <option value="open">접수중</option>
              <option value="upcoming">접수예정</option>
              <option value="closed">마감</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Support Type Filter */}
          <div className="relative">
            <select
              value={filters.supportType || "전체"}
              onChange={(e) =>
                onFilterChange({ ...filters, supportType: e.target.value })
              }
              className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none transition-all cursor-pointer text-sm min-w-[100px]"
            >
              {SUPPORT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
