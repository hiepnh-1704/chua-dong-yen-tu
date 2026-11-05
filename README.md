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

Admin vào trang bằng tên **Nguyen Hai Hiep** (viết có dấu hay không đều được) và mật khẩu riêng. Người khác không chọn được tên này nếu không có mật khẩu. Admin được thêm nhiều người khi đăng ký, gỡ đăng ký và xóa hội thoại, trên bất kỳ máy nào.

1. Trong **Authentication → Sign-in method**, bật **Email/Password**.
2. Trong **Authentication → Users**, thêm người dùng có email `admin@chua-dong-yen-tu.invalid` và một mật khẩu mạnh.
3. Sao chép **User UID** của người dùng đó vào `config` → `owner` trong tab **Data** của Realtime Database.

Để đổi mật khẩu, dùng menu của người dùng đó trong **Authentication → Users**. Khi dùng máy chung, bấm **Đăng xuất admin** ở khung trò chuyện trước khi rời đi.

Trang chưa có kiểm duyệt tự động. Nội dung xấu cần được xóa thủ công trên trang hoặc trong Firebase Console.

Khung cảnh mô phỏng theo cảm hứng chùa Đồng Yên Tử, mang tính tượng trưng, không phải bản sao kiến trúc thật.
