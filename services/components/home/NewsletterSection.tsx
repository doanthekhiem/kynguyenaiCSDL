// Newsletter Section - KynguyenAI v3.0

import { NewsletterTile } from "@/components/bento/BentoGrid";

export function NewsletterSection() {
  return (
    <section className="mb-12">
      <NewsletterTile>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Đăng ký nhận tin AI <span className="opacity-90">hàng tuần</span>
          </h2>
          <p className="opacity-90 mb-8 text-lg">
            Nhận tổng hợp tin tức AI quan trọng nhất mỗi tuần qua email. Hoàn toàn miễn phí!
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="email@example.com"
              className="px-5 py-3 rounded-xl text-foreground bg-white dark:bg-white/10 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-muted-foreground dark:placeholder:text-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[hsl(270,70%,50%)] font-semibold rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap hover-lift"
            >
              Đăng ký ngay
            </button>
          </form>
          <p className="text-xs opacity-70 mt-4">Không spam, hủy đăng ký bất cứ lúc nào</p>
        </div>
      </NewsletterTile>
    </section>
  );
}
