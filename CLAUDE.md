# CLAUDE.md - Dlicom: Journey to DCO (Dlicom AI Game Jam)

File này là kim chỉ nam khi build game. Đọc kèm `GAME_DESIGN.md` (thiết kế đầy đủ). Khi làm, luôn nghía lại `GAME_DESIGN.md` để không lệch thiết kế.

## Nguyên tắc chống over-engineering

- Ưu tiên giải pháp ĐƠN GIẢN NHẤT chạy được. Không thêm abstraction, hệ thống, hay tính năng ngoài yêu cầu.
- Không dựng kiến trúc phức tạp (state machine cầu kỳ, hệ thống entity tổng quát hoá, config engine...) khi chưa thật sự cần.
- Chưa cần thì chưa làm: chỉ 3 màn, 3 boss, không cần hệ thống màn vô hạn hay data-driven quá mức.
- Nếu thấy một hướng làm phức tạp hơn hẳn, DỪNG LẠI HỎI trước khi làm, đừng tự quyết đi đường phức tạp.

## Các quy tắc LUÔN áp dụng

1. Không dùng dấu gạch dài (em dash) trong mọi text, UI, comment, content. Chỉ dùng "-" hoặc bỏ.
2. Xử lý điều kiện tiên quyết trước: khi build 1 chức năng cần bước/điều kiện trước đó, kiểm tra và làm điều kiện đó trước, không nhảy thẳng vào chức năng chính.
3. Chẩn đoán lỗi trước khi sửa: khi gặp lỗi hoặc được yêu cầu sửa, phải tìm và giải thích NGUYÊN NHÂN GỐC trước, chờ duyệt rồi mới sửa code.
4. Tên biến và tên hàm dùng tiếng Anh toàn bộ.
5. Mỗi dòng code kèm 1 comment tiếng Việt giải thích dòng đó làm gì (để đọc code thành lời).
6. Gặp thứ không làm được (thiếu asset, thư viện lỗi, bị chặn): báo NGAY lúc phát hiện, dừng lại hỏi, không tự lách rồi tới lúc giao mới nói.

## Tech

- Phaser 3 + HTML/JS thuần. Không backend, không ví, không giao dịch, không dữ liệu riêng tư.
- Chạy trên trình duyệt PC và mobile (responsive + nút cảm ứng).

## Điều khiển

- PC: mũi tên trái/phải = đi, mũi tên lên = nhảy, A = bắn, S = skill 1, D = skill 2.
- Mobile: nút ảo đi/nhảy bên trái, nút bắn + 2 nút skill bên phải.

## Nguyên tắc lát cắt (RẤT QUAN TRỌNG)

Làm 1 màn NGẮN chạy trọn vẹn trước (đi hết màn, gặp boss, thắng), rồi mới kéo dài tới 5 phút và thêm màn. Lúc nào cũng phải có một bản chơi được từ đầu tới cuối. Không làm dở dang nhiều thứ cùng lúc.

## DANH SÁCH CHECKPOINT

Làm tuần tự, xong checkpoint nào test chạy được rồi mới sang cái sau.

- [x] CP1 - Khung: Phaser chạy, sàn + nhân vật Verified (xám), đi trái/phải + nhảy (trọng lực). Hitbox nhỏ hơn sprite.
- [x] CP2 - Camera cuộn ngang: màn dài hơn màn hình, camera bám nhân vật.
- [x] CP3 - Bắn thường: phím A bắn đạn thẳng, đạn tự biến mất.
- [x] CP4 - Quái + hệ máu: 1 con bot_1_1 (WALKER), trúng đạn thì chết. Nhân vật có máu, trúng đòn thì bị đẩy lùi + bất tử 1s, hết máu thì thua + chơi lại.
- [x] CP5 - 4 kiểu hành vi quái WALKER, FLYER, SHOOTER, CHARGER, có báo trước đúng GAME_DESIGN mục 10. Mỗi kiểu 1 con test.
- [x] CP6 - Địa hình vẽ bằng code: sàn, bục nổi, tường, hố rơi, gai. Viền neon theo màu màn (GAME_DESIGN mục 10b).
- [x] CP7 - LÁT CẮT: 1 màn NGẮN chạy trọn. Đi hết màn, quái rải đường, phòng boss, boss Dliever đủ pattern + báo trước + chuỗi chết boss. Bản chơi được đầu tiên, phải xong mới đi tiếp.
- [x] CP8 - Chiếm role: cảnh thành Dliever (đổi màu, cộng máu), mở skill S = 5 tia (hồi 5s) + hiệu ứng.
- [x] CP9 - Màn 2 + boss Dcoded đủ pattern. Thắng -> thành Dcoded, mở skill D = lao tới (hồi 10s) + vệt mờ.
- [x] CP10 - Màn 3 + boss DCO đủ pattern + combo + phase dưới 50% máu. Thắng -> màn chiến thắng.
- [x] CP11 - 9 quái: nạp đủ bot_1_1..bot_3_3, gán hành vi theo GAME_DESIGN mục 6, rải vào 3 màn. Chuỗi chết quái đầy đủ (tắt va chạm, rơi đất, nằm 1s nhấp nháy, nổ, rơi máu). bot_3_1 phóng to 1.5 lần.
- [x] CP12 - Checkpoint hồi sinh (2 giữa màn + 1 trước boss) + cục máu. Rơi hố thì về checkpoint gần nhất.
- [x] CP13 - Kéo dài mỗi màn tới ~5 phút: thêm địa hình, đặt thêm quái, cân độ khó.
- [x] CP14 - HUD: máu người chơi, máu boss, icon 2 skill + hồi chiêu, nhãn màn/role.
- [x] CP15 - Âm thanh: đủ SFX + nhạc nền theo AUDIO_SOURCES.md.
- [x] CP16 - Màn tiêu đề, chọn màn, lưu tiến độ (localStorage, bọc try/catch), tạm dừng, hướng dẫn phím, màn thắng/thua, credit (GAME_DESIGN mục 10c).
- [x] CP17 - Mobile: nút ảo di chuyển/nhảy/bắn/skill/tạm dừng, layout co giãn, test trên trình duyệt mobile.
- [ ] CP18 - Đưa lên itch.io, test link trên PC và điện thoại. Làm SỚM ngay sau khi CP7 xong để biết deploy chạy được, sau đó cập nhật lại mỗi khi xong checkpoint lớn.
- [ ] CP19 - Polish: hit-stop, rung màn hình, slow-motion boss chết, chuyển cảnh, cân bằng cuối. Chỉ làm khi CP1-18 xong.

## File tham chiếu

- `GAME_DESIGN.md` - thiết kế đầy đủ: nhân vật, 3 màn, 9 quái + 4 hành vi, đạn, HUD, âm thanh, hiệu ứng, asset, phạm vi. Nghía lại khi làm mỗi checkpoint.
- `AUDIO_SOURCES.md` - nguồn âm thanh/nhạc CC0 miễn phí, dùng ở CP15.
- `assets/` - toàn bộ sprite đã cắt sẵn (characters, enemies, bullets, background, items, audio).
