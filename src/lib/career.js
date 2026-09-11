// Shared easing for every scroll reveal on the home page. Expo-out: leaves
// fast, settles slowly, never overshoots.
export const RAIL_EASE = [0.16, 1, 0.3, 1];
export const EASE = RAIL_EASE;

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

// "may 2026 — aug 2026" -> Date(2026, 7)
export const endDateOf = (dateRange) => {
  const parts = dateRange.split('—');
  const [month, year] = parts[parts.length - 1].trim().split(/\s+/);
  return new Date(parseInt(year, 10), MONTHS[month] ?? 0);
};

export const startDateOf = (dateRange) => {
  const [month, year] = dateRange.split('—')[0].trim().split(/\s+/);
  return new Date(parseInt(year, 10), MONTHS[month] ?? 0);
};

// "may 2026 — aug 2026" -> "may — aug 2026"   (the year prints once)
// "sep 2024 — apr 2025" -> "sep 2024 — apr 2025"
export const compactRange = (dateRange) => {
  const [rawStart, rawEnd] = dateRange.split('—').map((s) => s.trim());
  if (!rawEnd) return rawStart;
  const [startMonth, startYear] = rawStart.split(/\s+/);
  const [, endYear] = rawEnd.split(/\s+/);
  return startYear === endYear ? `${startMonth} — ${rawEnd}` : `${rawStart} — ${rawEnd}`;
};

export const sortByRecency = (experiences) =>
  [...experiences].sort((a, b) => endDateOf(b.dateRange) - endDateOf(a.dateRange));

// Roles bucketed under the year they finished, newest first.
export const groupByYear = (experiences) => {
  const groups = [];
  for (const experience of sortByRecency(experiences)) {
    const year = endDateOf(experience.dateRange).getFullYear();
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.items.push(experience);
    else groups.push({ year, items: [experience] });
  }
  return groups;
};

// "may 2026 — aug 2026" -> 2026
export const startYearOf = (dateRange) => startDateOf(dateRange).getFullYear();

// The rail is a ruler, not a second copy of the list: a tick per role, but the
// year only prints when it changes.
export const buildRailItems = (experiences) =>
  experiences.map((exp, i, all) => {
    const year = startYearOf(exp.dateRange);
    const prev = i > 0 ? startYearOf(all[i - 1].dateRange) : null;
    return {
      id: exp.id,
      company: exp.company,
      shortCompany: exp.company.replace(/\s*\([^)]*\)/g, '').trim(),
      year,
      showYear: year !== prev
    };
  });
