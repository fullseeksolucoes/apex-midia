"use client";

import { useMemo, useState } from "react";

import { copy } from "@/lib/i18n";
import type { Project, ProjectCategory } from "@/types/project";

type Filter = ProjectCategory | "all";

interface FilterOption {
  value: Filter;
  label: string;
}

export function useProjectGrid(projects: Project[]) {
  const [filter, setFilter] = useState<Filter>("all");

  const categoriesInData = useMemo(() => {
    const set = new Set<ProjectCategory>();
    projects.forEach((p) => set.add(p.category));
    return set;
  }, [projects]);

  const filterOptions: FilterOption[] = useMemo(() => {
    const categoryOptions: Array<{ value: ProjectCategory; label: string }> = [
      { value: "brand", label: copy.portfolio.filters.brand },
      { value: "fashion", label: copy.portfolio.filters.fashion },
      { value: "shortFilm", label: copy.portfolio.filters.shortFilm },
      { value: "commercial", label: copy.portfolio.filters.commercial },
      { value: "music", label: copy.portfolio.filters.music },
    ];
    return [
      { value: "all", label: copy.portfolio.filters.all },
      ...categoryOptions.filter((o) => categoriesInData.has(o.value)),
    ];
  }, [categoriesInData]);

  const visible = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  return { filter, setFilter, filterOptions, visible };
}
