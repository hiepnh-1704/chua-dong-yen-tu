/**
 * Gửi email cho admin khi có người vào chùa Đồng Yên Tử.
 *
 * Cách dùng (làm một lần, bằng tài khoản Google sẽ nhận email):
 * 1. Mở https://script.google.com, tạo dự án mới, dán toàn bộ file này vào Code.gs.
 * 2. Triển khai → Tùy chọn triển khai mới → Loại: Ứng dụng web.
 *    Thực thi với tư cách: Tôi. Ai có quyền truy cập: Bất kỳ ai.
 * 3. Cấp quyền gửi email khi Google hỏi, rồi sao chép URL ứng dụng web
 *    và dán vào NOTIFY_URL trong index.html.
 *
 * Email nhận là chính tài khoản đã triển khai script, nên địa chỉ không nằm trong mã nguồn công khai.
 * Giới hạn để tránh bị lạm dụng: mỗi tên một email trong 10 phút, tối đa 80 email mỗi ngày
 * (Gmail thường cho script gửi khoảng 100 email mỗi ngày).
 */
const DAILY_LIMIT = 80;
const SAME_NAME_MINUTES = 10;

function doPost(e) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return reply('busy');
  try {
    let data = {};
    try { data = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return reply('bad'); }
    const clean = (s, n) => String(s || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, n);
    const name = clean(data.name, 40) || 'Phật tử';
    const gender = clean(data.gender, 6);
    const page = clean(data.page, 200);

    const tz = Session.getScriptTimeZone() || 'Asia/Ho_Chi_Minh';
    const now = new Date();
    const dayKey = 'count-' + Utilities.formatDate(now, tz, 'yyyyMMdd');
    const props = PropertiesService.getScriptProperties();
    const sent = Number(props.getProperty(dayKey) || 0);
    if (sent >= DAILY_LIMIT) return reply('limit');

    const cache = CacheService.getScriptCache();
    const nameKey = 'name-' + Utilities.base64EncodeWebSafe(name.toLowerCase());
    if (cache.get(nameKey)) return reply('recent');

    const when = Utilities.formatDate(now, tz, 'HH:mm, dd/MM/yyyy');
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      subject: '[Chùa Đồng Yên Tử] ' + name + ' vừa vào chùa',
      body: name + (gender ? ' (' + gender + ')' : '') + ' vừa vào chùa lúc ' + when + '.\n\n'
        + 'Xem chi tiết trong mục Báo cáo khi đăng nhập admin' + (page ? ': ' + page : '.') + '\n\n'
        + 'Hôm nay đã gửi ' + (sent + 1) + '/' + DAILY_LIMIT + ' email thông báo.'
    });
    props.setProperty(dayKey, String(sent + 1));
    cache.put(nameKey, '1', SAME_NAME_MINUTES * 60);
    return reply('ok');
  } finally {
    lock.releaseLock();
  }
}

function reply(text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);
}
