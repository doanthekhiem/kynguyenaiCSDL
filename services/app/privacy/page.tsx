// Privacy Policy Page - KynguyenAI v3.0

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật - KynguyenAI",
  description:
    "Chính sách bảo mật của KynguyenAI. Tìm hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Chính sách <span className="text-[hsl(199,89%,48%)]">Bảo mật</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </section>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Giới thiệu</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              KynguyenAI ("chúng tôi", "của chúng tôi", hoặc "trang web") cam kết bảo vệ quyền riêng tư của người dùng.
              Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn
              khi sử dụng dịch vụ của chúng tôi.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Thông tin chúng tôi thu thập</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">2.1. Thông tin bạn cung cấp</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Thông tin đăng ký tài khoản (email, tên người dùng)</li>
                  <li>Thông tin khi bạn liên hệ với chúng tôi</li>
                  <li>Thông tin khi bạn đăng ký nhận newsletter</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">2.2. Thông tin tự động thu thập</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Địa chỉ IP và thông tin trình duyệt</li>
                  <li>Cookies và công nghệ theo dõi tương tự</li>
                  <li>Dữ liệu sử dụng trang web (trang đã truy cập, thời gian truy cập)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Chúng tôi sử dụng thông tin thu thập được để:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi</li>
              <li>Gửi thông báo và cập nhật về dịch vụ</li>
              <li>Phân tích cách người dùng sử dụng trang web để cải thiện trải nghiệm</li>
              <li>Bảo vệ quyền và tài sản của chúng tôi và người dùng</li>
              <li>Tuân thủ các nghĩa vụ pháp lý</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies và công nghệ theo dõi</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Chúng tôi sử dụng cookies và công nghệ tương tự để:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Ghi nhớ tùy chọn và cài đặt của bạn</li>
              <li>Phân tích lưu lượng truy cập và hành vi người dùng</li>
              <li>Cải thiện hiệu suất và trải nghiệm người dùng</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Bạn có thể kiểm soát cookies thông qua cài đặt trình duyệt của mình. Tuy nhiên, việc tắt cookies có thể
              ảnh hưởng đến chức năng của một số tính năng trên trang web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Chia sẻ thông tin</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Chúng tôi không bán thông tin cá nhân của bạn. Chúng tôi có thể chia sẻ thông tin trong các trường hợp
              sau:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong className="text-foreground">Nhà cung cấp dịch vụ:</strong> Chúng tôi có thể chia sẻ thông tin
                với các nhà cung cấp dịch vụ bên thứ ba giúp chúng tôi vận hành trang web (ví dụ: hosting, analytics)
              </li>
              <li>
                <strong className="text-foreground">Yêu cầu pháp lý:</strong> Khi được yêu cầu bởi pháp luật hoặc để
                bảo vệ quyền và an toàn của chúng tôi và người dùng
              </li>
              <li>
                <strong className="text-foreground">Với sự đồng ý của bạn:</strong> Trong các trường hợp khác khi bạn
                đồng ý rõ ràng
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Bảo mật thông tin</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn
              khỏi truy cập trái phép, mất mát, phá hủy hoặc thay đổi. Tuy nhiên, không có phương thức truyền tải qua
              internet hoặc lưu trữ điện tử nào là 100% an toàn.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Quyền của bạn</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Bạn có quyền:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Truy cập và nhận bản sao thông tin cá nhân của bạn</li>
              <li>Yêu cầu sửa đổi hoặc xóa thông tin cá nhân</li>
              <li>Phản đối việc xử lý thông tin cá nhân của bạn</li>
              <li>Rút lại sự đồng ý bất cứ lúc nào</li>
              <li>Yêu cầu hạn chế xử lý thông tin cá nhân</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Liên kết đến trang web bên thứ ba</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trang web của chúng tôi có thể chứa liên kết đến các trang web bên thứ ba. Chúng tôi không chịu trách
              nhiệm về các chính sách bảo mật hoặc nội dung của các trang web đó. Chúng tôi khuyến khích bạn đọc chính
              sách bảo mật của bất kỳ trang web nào bạn truy cập.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Thay đổi chính sách bảo mật</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ
              thay đổi nào bằng cách đăng chính sách mới trên trang này và cập nhật ngày "Cập nhật lần cuối" ở đầu trang.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Liên hệ</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi:
            </p>
            <div className="bg-surface border border-surface-border rounded-lg p-4">
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Email:</strong>{" "}
                <a href="mailto:privacy@kynguyenai.vn" className="text-[hsl(199,89%,48%)] hover:underline">
                  privacy@kynguyenai.vn
                </a>
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Hoặc:</strong>{" "}
                <a href="/contact" className="text-[hsl(199,89%,48%)] hover:underline">
                  Trang liên hệ
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
