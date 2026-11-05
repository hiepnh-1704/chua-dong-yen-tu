# Chùa Đồng Yên Tử

Trang đi lễ chùa Đồng trên đỉnh Yên Tử trong không gian 3D: thắp hương, lễ Phật trước ban Tam Bảo, thỉnh chuông, thả hoa đăng, trò chuyện và đăng ký đi lễ mùng Một, ngày Rằm.

## Chạy trên GitHub Pages

Trang là một file `index.html` duy nhất, không cần cài đặt hay build.
Thư viện 3D (three.js r128) được tải từ cdnjs.cloudflare.com.

1. Tạo repository mới, tải `index.html`, `.nojekyll` và `README.md` lên nhánh `main`.
2. Vào **Settings → Pages**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`.
3. Sau 1–2 phút, trang có ở `https://<tên-tài-khoản>.github.io/<tên-repository>/`.

## Về dữ liệu

Mọi người vào trang cùng đi lễ trong **một ngôi chùa chung**, dùng Firebase (Realtime Database và đăng nhập ẩn danh). Người đi lễ không phải tạo tài khoản, chỉ cần nhập một tên đại diện và chọn giới tính khi vào. Tên không được kiểm tra trùng hay xác minh.

Khi đăng ký đi lễ, chỉ chủ trang được thêm nhiều người. Người khác đăng ký một người bằng tên đại diện của mình; trang chỉ tính và hiển thị một người cho các đăng ký này.

- Họ tên, lời nguyện, hoa đăng và lời nhắn hiện công khai cho tất cả người vào trang.
- Luật truy cập nằm trong `database.rules.json`. Khi sửa file này, cần dán lại vào tab **Rules** của Realtime Database trên Firebase Console.
- Cấu hình `FIREBASE_CONFIG` trong `index.html` là thông tin công khai của Firebase, không phải mật khẩu.
- Nếu để trống `FIREBASE_CONFIG`, trang về chế độ độc lập: dữ liệu chỉ lưu trong trình duyệt và người ở máy khác không thấy nhau.

### Quyền chủ trang

1. Mở trang với đuôi `#ma-cua-toi` rồi tải lại, sao chép mã hiện ở phần ghi chú cuối trang.
2. Trong tab **Data** của Realtime Database, tạo mục `config` → `owner` với giá trị là mã đó.
3. Tải lại trang. Chủ trang có thể gỡ đăng ký và xóa hội thoại. Nếu xóa dữ liệu trình duyệt, mã sẽ đổi và cần làm lại các bước này.

Trang chưa có kiểm duyệt tự động. Nội dung xấu cần được xóa thủ công trên trang hoặc trong Firebase Console.

Khung cảnh mô phỏng theo cảm hứng chùa Đồng Yên Tử, mang tính tượng trưng, không phải bản sao kiến trúc thật.
