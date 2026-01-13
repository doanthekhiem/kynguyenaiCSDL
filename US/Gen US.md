# Assignment #
Bạn hãy thực hiện những nhiệm vụ sau, theo thứ tự từ trên xuống dưới, thực hiện tuần tự. 
1. Đọc mục **CÁC ĐIỀU KIỆN PHẢI TUÂN THỦ** để hiểu về các điều kiện BẮT BUỘC PHẢI TUÂN THEO khi thực hiện
2. Đọc mục **CÁC YÊU CẦU BẮT BUỘC** để biết cần làm những gì.
3. Viết tất cả các US mới theo từng HLD đảm bảo đúng và đủ các điều kiện sau: 
    - Luồng chính (Happy Paths)
    - Luồng thay thế (Alternative Paths)
    - Các trường hợp ngoại lệ & lỗi (Edge Cases & Error Conditions)
4. Tạo ra tài liệu US theo mẫu được mô tả ở mục US-temp.md
5. Save file US vào thư mục: 


# CÁC ĐIỀU KIỆN PHẢI TUÂN THỦ # 
1. Chuyển hóa sang ngôn ngữ nghiệp vụ dễ hiểu theo User story  
2. Sử dụng markdown heading 
3. Sử dụng ngôn ngữ, định nghĩa đồng nhất giữa các màn hình trên cùng 1 chức năng nghiệp vụ
4. Sử dụng ngôn ngữ của người dùng cuối, không mô tả về kỹ thuật. Sử dụng tối đa tiếng việt, chỉ dùng tiếng anh khi không có từ tương đương hoặc tiếng việt không rõ nghĩa
5. Nếu thiếu thông tin, hãy nêu rõ ASSUMPTION trước rồi tiếp tục thiết kế, không được dừng lại hoặc yêu cầu thêm thông tin giữa chừng.  
6. Nếu mô tả màn hình nhập liệu thì cần mô tả trường nhập liệu theo dạng: | Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
7. Nếu mô tả các trường dropdown thì cần mô tả dữ liệu load lên từ dropdown lấy trong danh mục nào, chỉ lấy những bản ghi có trạng thái gì
8. Không cần mô tả về màu sắc, size, font, badge... (những phần sẽ thể hiện trong thiết kế)
9. Không cần mô tả về phân trang (hệ thống đã có sẵn common rule cho phần này)
10. Các câu cảnh báo phải được đánh mã rõ ràng, kèm theo nội dung thông báo để tiện tracking cho dev, qc. Ưu tiên sử dụng những câu thông báo sử dụng common base, tránh sử lý quá phức tạp để có thể hiện thị được thông báo
11. Gộp các AC trong US theo từng nhóm tính năng để dễ follow

# CÁC YÊU CẦU BẮT BUỘC #
1. KHÔNG lặp lại văn bản dài  
2. KHÔNG đưa giả định ngoài các yêu cầu đã đưa
3. Tài liệu phải theo đúng bố cục US-temp.md
4. Bảng phải rõ ràng, không viết liền trên một dòng
5. Những thông tin bị "Xóa" thì không được phép "Xóa" mà phải comment lại
6. Những thông tin "bổ sung" hoặc "Sửa" phải có comment 
7. Hết 1 câu phải xuống dòng, KHÔNG được viết liền trên 1 dòng

# TEMPLATE
Sử dụng theo mẫu trong file \US-temp.md và ví dụ từ us-example.md