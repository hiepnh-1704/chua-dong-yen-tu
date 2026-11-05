# Chùa Đồng Yên Tử

Trang đi lễ chùa Đồng trên đỉnh Yên Tử trong không gian 3D: thắp hương, lễ Phật trước ban Tam Bảo, thỉnh chuông, thả hoa đăng, trò chuyện và đăng ký đi lễ mùng Một, ngày Rằm.

## Chạy trên GitHub Pages

Trang là một file `index.html` duy nhất, không cần cài đặt hay build.
Thư viện 3D (three.js r128) được tải từ cdnjs.cloudflare.com.

1. Tạo repository mới, tải `index.html`, `.nojekyll` và `README.md` lên nhánh `main`.
2. Vào **Settings → Pages**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`.
3. Sau 1–2 phút, trang có ở `https://<tên-tài-khoản>.github.io/<tên-repository>/`.

## Về dữ liệu

Khi chạy ngoài Claude, trang dùng **chế độ độc lập**:

- Đăng ký, hoa đăng và hội thoại được lưu trong `localStorage` của trình duyệt người dùng. Không gửi đi đâu.
- Các tab trong cùng một trình duyệt nhìn thấy nhau (BroadcastChannel). Người ở máy khác thì chưa thấy nhau.

Để nhiều người ở nhiều nơi cùng đi lễ và đọc chung danh sách đăng ký, cần thêm một dịch vụ dữ liệu thời gian thực (ví dụ Firebase hoặc Supabase), có xác thực người dùng, phân quyền và kiểm duyệt nội dung.

Khung cảnh mô phỏng theo cảm hứng chùa Đồng Yên Tử, mang tính tượng trưng, không phải bản sao kiến trúc thật.
