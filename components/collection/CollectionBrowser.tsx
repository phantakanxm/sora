"use client";

import { useMemo, useState } from "react";
import { families, fragrances } from "@/data/products";
import type { FamilyKey } from "@/types/product";
import { ProductCard } from "./ProductCard";

type Filter = FamilyKey | "all";

export function CollectionBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(
    () => (filter === "all" ? fragrances : fragrances.filter((f) => f.family.key === filter)),
    [filter],
  );

  const options: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: fragrances.length },
    ...families.map((family) => ({
      key: family.key,
      label: family.label,
      count: fragrances.filter((f) => f.family.key === family.key).length,
    })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter by fragrance family" className="-mx-2 flex flex-wrap gap-1">
          {options.map((option) => {
            const active = option.key === filter;
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.key)}
                className={`eyebrow flex min-h-11 items-center gap-2 px-3 transition-opacity duration-500 ${
                  active ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1 w-1 rounded-full bg-current transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                />
                {option.label}
                <span className="tabular-nums">({option.count})</span>
              </button>
            );
          })}
        </div>
        <p role="status" className="eyebrow text-ink-soft">
          Showing {visible.length} {visible.length === 1 ? "fragrance" : "fragrances"}
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="py-32 text-center">
          <p className="display text-h3">Nothing here, yet.</p>
          <p className="mt-4 text-ink-soft">No fragrance belongs to this family at the moment.</p>
          <button type="button" className="btn btn-dark mt-10" onClick={() => setFilter("all")}>
            Show all fragrances
          </button>
        </div>
      ) : (
        <ul className="mt-14 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {visible.map((fragrance, i) => (
            <li
              key={fragrance.slug}
              className={`animate-[card-in_900ms_var(--ease-silk)_both] ${
                visible.length === 3 && i === 1 ? "lg:mt-28" : ""
              }`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <ProductCard fragrance={fragrance} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
