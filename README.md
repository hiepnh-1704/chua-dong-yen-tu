# Chùa Đồng Yên Tử

Trang đi lễ chùa Đồng trên đỉnh Yên Tử trong không gian 3D: vái lạy, thắp hương và quỳ bái trong chánh điện (20 chỗ quỳ), thỉnh chuông, thả hoa đăng, trò chuyện bằng bong bóng lời thoại và đăng ký đi lễ mùng Một, ngày Rằm.

## Chạy trên GitHub Pages

Trang là một file `index.html` duy nhất, không cần cài đặt hay build.
Thư viện 3D (three.js r128) được tải từ cdnjs.cloudflare.com.

1. Tạo repository mới, tải `index.html`, `.nojekyll` và `README.md` lên nhánh `main`.
2. Vào **Settings → Pages**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`.
3. Sau 1–2 phút, trang có ở `https://<tên-tài-khoản>.github.io/<tên-repository>/`.

## Về dữ liệu

Mọi người vào trang cùng đi lễ trong **một ngôi chùa chung**, dùng Firebase (Realtime Database và đăng nhập ẩn danh). Người đi lễ không phải tạo tài khoản, chỉ cần nhập một tên đại diện và chọn giới tính khi vào. Tên không được kiểm tra trùng hay xác minh.

Cảnh chùa chiếm toàn màn hình, mọi chức năng nằm ở thanh dọc bên phải. Chọn một người trong mục **Người đi lễ**, hoặc bấm vào tên trên đầu nhân vật, là mở trò chuyện với người đó.

Khi đóng trang, trình duyệt quên tên, giới tính và phiên đăng nhập (kể cả admin); máy chủ xóa ngay vị trí và lời nhắn của người đó. Đăng ký đi lễ và hoa đăng vẫn được giữ. Tải lại trang cũng xóa lời nhắn của chính mình nhưng giữ tên.

Mỗi tên chỉ ở trong chùa một nơi (không phân biệt hoa thường, có dấu hay không). Cùng một tên vào ở máy hoặc tab khác thì phiên vào sau được giữ; phiên cũ tự rời chùa và hiện nút **Vào lại ở máy này**. Admin đăng nhập ở hai máy cũng vậy. Tên không được xác minh, nên người lạ dùng đúng tên của bạn cũng sẽ đẩy phiên của bạn ra.

### Báo cáo cho admin

Mục **Báo cáo** (chỉ admin thấy) ghi lại: ai vào chùa và lúc nào, lời nhắn, hoa đăng cầu gì, đăng ký và lời nguyện, các việc lễ, ôm và hôn. Người đi lễ được báo trước ở màn hình vào chùa. Admin đưa chuột (hoặc chạm trên điện thoại) vào một hoa đăng trên hồ sen để xem lời nguyện trong bong bóng. Lời nguyện của hoa đăng và đăng ký chỉ admin đọc được; người khác chỉ thấy hoa đăng trôi trên hồ. Nhật ký nằm ở mục `logs` của Realtime Database, chỉ admin đọc và xóa được.

### Email khi có người vào chùa

Trang gửi tín hiệu tới một Google Apps Script (`email-notify.gs`) chạy bằng tài khoản Google của admin, script gửi email về chính tài khoản đó. Làm theo hướng dẫn ở đầu file `email-notify.gs`, rồi dán URL ứng dụng web vào `NOTIFY_URL` trong `index.html`. Để trống thì trang không gửi email.

### Ôm, hôn và va chạm

Nhân vật không đi xuyên qua nhau. Khi đứng gần một người, nút **Ôm** và **Hôn** hiện ra; người kia phải bấm **Đồng ý** thì mới diễn ra. Riêng admin ôm, hôn được ngay không cần hỏi; người nhận thấy dòng báo kèm nút **Không muốn nữa**, hoặc bỏ chọn ô cho phép trong mục **Đi lễ**, khi đó admin phải hỏi như mọi người. Người có chữ **Linh** trong tên (viết hoa hay thường, có dấu hay không đều được, ví dụ Mỹ Linh, linh xinh) ôm, hôn admin cũng không cần hỏi; với người khác vẫn phải hỏi như thường. Người có chữ Linh trong tên thì ai ôm, hôn họ cũng diễn ra ngay, không cần đăng nhập admin: không có hộp hỏi, không có nút **Không muốn nữa** và ô cho phép được ẩn.

Khi đăng ký đi lễ, chỉ chủ trang được thêm nhiều người. Người khác đăng ký một người bằng tên đại diện của mình; trang chỉ tính và hiển thị một người cho các đăng ký này.

- Họ tên, lời nguyện, hoa đăng và lời nhắn hiện công khai cho tất cả người vào trang.
- Luật truy cập nằm trong `database.rules.json`. Khi sửa file này, cần dán lại vào tab **Rules** của Realtime Database trên Firebase Console.
- Cấu hình `FIREBASE_CONFIG` trong `index.html` là thông tin công khai của Firebase, không phải mật khẩu.
- Nếu để trống `FIREBASE_CONFIG`, trang về chế độ độc lập: dữ liệu chỉ lưu trong trình duyệt và người ở máy khác không thấy nhau.

### Quyền chủ trang

Admin vào trang bằng tên **Nguyen Hai Hiep** (viết có dấu hay không đều được) và mật khẩu riêng. Nếu trình duyệt đã lưu tên khác, nhập tên admin vào ô **Đổi tên** để mở màn hình nhập mật khẩu. Người khác không chọn được tên này nếu không có mật khẩu. Admin được thêm nhiều người khi đăng ký, gỡ đăng ký và xóa hội thoại, trên bất kỳ máy nào.

1. Trong **Authentication → Sign-in method**, bật **Email/Password**.
2. Trong **Authentication → Users**, thêm người dùng có email `admin@chua-dong-yen-tu.invalid` và một mật khẩu mạnh.
3. Sao chép **User UID** của người dùng đó vào `config` → `owner` trong tab **Data** của Realtime Database.

Để đổi mật khẩu, dùng menu của người dùng đó trong **Authentication → Users**. Khi dùng máy chung, bấm **Đăng xuất admin** ở khung trò chuyện trước khi rời đi.

Trang chưa có kiểm duyệt tự động. Nội dung xấu cần được xóa thủ công trên trang hoặc trong Firebase Console.

Khung cảnh mô phỏng theo cảm hứng chùa Đồng Yên Tử, mang tính tượng trưng, không phải bản sao kiến trúc thật.
