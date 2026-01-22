"use client";

// Language Filter Client Component
import { useRouter, useSearchParams } from "next/navigation";
import { POPULAR_LANGUAGES } from "@/lib/github-trending";

export function LanguageFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("language") || "";
  const since = searchParams.get("since") || "daily";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const params = new URLSearchParams();
    if (newLang) params.set("language", newLang);
    if (since && since !== "daily") params.set("since", since);
    const query = params.toString();
    router.push(query ? `/github?${query}` : "/github");
  };

  return (
    <select
      className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      defaultValue={currentLanguage}
      onChange={handleChange}
    >
      <option value="">Tất cả</option>
      {POPULAR_LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  );
}
