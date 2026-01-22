// Tools Directory Page - KynguyenAI v3.0
// AI Tools listing with filtering and search

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { getToolsList, getCategories } from "@/lib/data";

export const metadata = {
  title: "AI Tools Directory - KynguyenAI",
  description:
    "Khám phá hàng trăm công cụ AI tốt nhất cho mọi nhu cầu. Tìm kiếm, so sánh và đánh giá các công cụ AI phổ biến nhất.",
};

export default async function ToolsPage() {
  const { data: tools } = await getToolsList({ limit: 100 });
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI Tools <span className="text-[hsl(199,89%,48%)]">Directory</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá và so sánh hàng trăm công cụ AI tốt nhất cho công việc, sáng tạo và phát triển sản phẩm
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: `${tools.length}+`, label: "Công cụ AI" },
            { value: "10", label: "Danh mục" },
            { value: "50k+", label: "Lượt đánh giá" },
            { value: "24/7", label: "Cập nhật" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl bg-surface border border-surface-border text-center hover:border-primary/30 transition-colors"
            >
              <div className="text-2xl md:text-3xl font-bold text-[hsl(199,89%,48%)] mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Tools Grid */}
        <ToolGrid tools={tools} categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
