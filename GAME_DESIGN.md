# Dlicom: Journey to DCO - Thiết kế game

Game dự thi Dlicom AI Game Jam (track Builder). Deadline: 23:59 UTC 05/10.

## 1. Ý tưởng cốt lõi (cái móc)

Bạn khởi đầu tay trắng (role Verified, màu xám, chưa thuộc về ai). Đi qua từng màn, cuối màn đấu 1 boss là 1 role cao hơn. Hạ boss = CHIẾM lấy role đó: nhân vật nhuộm màu của role, cộng máu, mở khóa skill của role đó. 3 màn = 3 lần lột xác, mỗi màn chơi một kiểu khác nhau. Đích cuối là chiếm role cao nhất: DCO.

Chủ đề bám dự án Dlicom (nền tảng SocialFi): bạn là user thật đang leo bậc role, quái là lũ bot rác phá nền tảng.

## 2. Thể loại và góc nhìn

- Platformer hành động cuộn ngang, góc nhìn ngang (side-view), kiểu Mega Man.
- Mỗi màn là một chặng dài hơn màn hình: đi từ trái sang phải, vượt địa hình, diệt quái rải dọc đường, tới cuối màn đấu boss.
- Camera cuộn ngang theo nhân vật.
- Có trọng lực và mặt đất, né đòn bằng chạy trái/phải và nhảy.
- Mỗi màn dài khoảng 5 phút, tổng khoảng 15 phút, có thể hơn.
- Chạy thẳng trên trình duyệt. Có bản mobile (responsive + nút cảm ứng).
- KHÔNG có ví, seed phrase, giao dịch, thanh toán, dữ liệu riêng tư (theo luật jam).

## 3. Nhân vật (4 dạng tiến hóa)

| Dạng | Màu | Máu | Skill mở khóa | Hồi chiêu |
|---|---|---|---|---|
| Verified | Xám nhạt | Yếu | (không, chỉ bắn thường) | - |
| Dliever | Xanh dương | Vừa | Bắn 5 tia thẳng cùng lúc | 5s |
| Dcoded | Vàng | Khá | Lao tới gây sát thương (dash) | 10s |
| DCO | Hồng | (chỉ dùng làm boss cuối) | - | - |

Quy tắc tiến hóa:
- Chiếm role xong: đổi màu sprite, tăng máu tối đa, mở skill mới, có hiệu ứng lột xác.
- Skill cũ vẫn giữ. Về cuối bạn có cả 2 skill (S và D).
- Bắn thường (A) luôn có từ đầu.

## 4. Ba màn chơi

Mỗi màn: một chặng cuộn ngang, quái rải dọc đường, boss ở cuối.

### Màn 1 - Boss Dliever (xanh)
- Bạn đang là: Verified (xám). Chỉ có bắn thường.
- Quái trong màn (xanh): bot_1_1, bot_1_2, bot_1_3 (xem mục 6).
- Boss Dliever: bắn 5 tia thẳng theo nhịp.
- Thắng: cắt cảnh chiếm role -> thành Dliever, mở skill S (5 tia).

### Màn 2 - Boss Dcoded (vàng)
- Bạn đang là: Dliever.
- Quái trong màn (vàng): bot_2_1, bot_2_2, bot_2_3.
- Boss Dcoded: lao tới cận chiến (dash) + thỉnh thoảng bắn.
- Thắng: chiếm role -> thành Dcoded, mở skill D (lao tới).

### Màn 3 - Boss DCO (hồng, trùm cuối)
- Bạn đang là: Dcoded.
- Quái trong màn (hồng): bot_3_1, bot_3_2, bot_3_3.
- Boss DCO: to nhất, máu nhiều nhất, sát thương cao nhất. Xài xen kẽ 5 tia (kiểu Dliever) và lao tới (kiểu Dcoded).
- Thắng: màn hình chiến thắng, hết game.

## 5. Điều khiển

### PC
- Mũi tên trái/phải: đi
- Mũi tên lên: nhảy
- A: bắn thường
- S: skill 1
- D: skill 2

### Mobile
- Bên trái: nút ảo trái/phải + nút nhảy
- Bên phải: nút bắn (A) + 2 nút skill (S, D)
- Layout co giãn theo màn hình.

## 6. Quái (9 con, gom 4 kiểu hành vi)

9 ngoại hình khác nhau nhưng dùng chung 4 kiểu hành vi để nhẹ code. Code chỉ cần viết 4 kiểu, mỗi con quái gán 1 kiểu + 1 bộ sprite.

4 kiểu hành vi:
- WALKER: đi bộ trên đất, tiến về phía người chơi.
- FLYER: bay trên không, di chuyển lượn hoặc zíc zắc.
- SHOOTER: đứng hoặc bay tại chỗ, bắn đạn về phía người chơi.
- CHARGER: lao thẳng nhanh vào người chơi (cận chiến).

Danh sách 9 con và gán hành vi. Tên file theo dạng bot_<màn>_<thứ tự>. Màu thân = màu boss của màn đó.

| Tên | Con | Màn / màu | Hành vi | Ghi chú |
|---|---|---|---|---|
| bot_1_1 | Spam Bot | 1 / xanh | WALKER | bò chậm, đông, ném phong bì |
| bot_1_2 | Troll Bot | 1 / xanh | FLYER | bay zíc zắc |
| bot_1_3 | Scam Bot | 1 / xanh | CHARGER | lao thẳng vào |
| bot_2_1 | Clone Bot | 2 / vàng | WALKER | đầu màn hình CRT, đi theo bầy |
| bot_2_2 | Ad Bot | 2 / vàng | SHOOTER | popup SALE bay, bắn 2 hướng |
| bot_2_3 | Bot Fan | 2 / vàng | FLYER | quả cầu cánh dơi, bay lượn |
| bot_3_1 | Botnet Node | 3 / hồng | SHOOTER | xe tăng, trâu máu. PHÓNG TO 1.5 lần bằng code (sprite vẽ cỡ thường) |
| bot_3_2 | Deepfake Bot | 3 / hồng | FLYER | con ma mặt nạ, bay nhanh khó đoán |
| bot_3_3 | Phishing Bot | 3 / hồng | CHARGER | cá lồng đèn, lao tới cắn |

Với quái FLYER: khung jump_up = bay lên, jump_down = lao xuống. Với WALKER/CHARGER: khung attack_1 dùng lúc tấn công. SHOOTER: attack_1 lúc bắn.

Đạn quái: bong bóng chat đỏ / dấu chấm than (nhìn là biết spam).

## 7. Đạn và hitbox

- bullet_player: đạn xanh (người chơi bắn thường).
- bullet_spam: bong bóng đỏ (quái bắn).
- bullet_boss: cầu năng lượng hồng (boss bắn).
- Hitbox nhân vật NHỎ HƠN hình vẽ, để né đạn không ức chế.

## 8. HUD

- Thanh máu người chơi, thanh máu boss (khi vào phòng boss).
- Icon 2 skill + đồng hồ hồi chiêu.
- Nhãn màn / role đang giữ.
- Vạch tiến độ màn (đi được bao xa) là điểm cộng, không bắt buộc.

## 9. Âm thanh (dùng asset miễn phí CC0)

Không tự tạo, tải từ nguồn miễn phí dùng thoải mái (xem AUDIO_SOURCES.md), bỏ vào assets/audio/. Cần:
- SFX: bắn, trúng đòn, nhảy, dùng skill, quái ngã (bịch), beep đếm nổ, nổ nhỏ, boss ngã (rè điện), nổ lớn, lên role, nhặt máu, chạm checkpoint, thắng, thua.
- Nhạc nền: 1 track loop cho lúc chơi, 1 đoạn ngắn lúc thắng. Có thể mỗi màn 1 track nếu dư thời gian.

## 10. Hiệu ứng, kỹ năng boss/quái, cảm giác đánh

Toàn bộ hiệu ứng làm bằng code (particles, tint, tween, camera shake), không cần vẽ thêm.

NGUYÊN TẮC BÁO TRƯỚC (telegraph): mọi đòn mạnh của boss và quái đều có tín hiệu báo trước 0.5-1s (chớp sáng, rung người, vạch đỏ chỉ đường đánh) để người chơi kịp né. Không đánh bất ngờ.

### Kỹ năng người chơi
- Skill 5 tia (S): chớp sáng xanh + 5 viên tỏa hình quạt.
- Skill lao tới (D): vệt mờ vàng theo thân, gây sát thương dọc đường lao.

### Boss
Dliever (màn 1, dễ):
- Bắn 5 tia hình quạt: báo trước bằng chớp xanh 0.6s.
- Nhảy qua lại đổi phía màn.
- Dưới 50% máu: bắn 2 loạt liên tiếp, nhanh hơn.

Dcoded (màn 2):
- Lao ngang màn: lùi lấy đà + vạch đỏ chỉ đường lao 0.8s, để lại vệt vàng mờ.
- Bắn 3 viên đạn vàng.
- Dưới 50% máu: lao 2 lần liên tiếp.

DCO (màn 3, trùm, KHÔNG có skill riêng):
- Xen kẽ 5 tia hồng và lao tới, to hơn, sát thương cao hơn.
- Combo: lao xong bắn 5 tia ngay.
- Dưới 50% máu: nền nhấp nháy hồng, mọi đòn nhanh hơn.

### Quái (theo 4 kiểu hành vi)
- WALKER: đi tới, chạm người gây sát thương, thỉnh thoảng ném đạn.
- FLYER: bay lượn sóng, khi ở trên đầu người chơi thì chớp 1 cái rồi bổ nhào xuống.
- SHOOTER: đứng lại, nháy sáng 0.4s rồi bắn.
- CHARGER: thấy người chơi thì khựng + rung 0.5s rồi lao thẳng.
- Đạn quái dùng chung bullet_spam, tint theo màu màn (xanh/vàng/hồng).

### Cảm giác đánh (game feel)
- Đánh trúng địch: địch chớp trắng, game khựng ~0.05s (hit-stop).
- Người chơi trúng đòn: bị đẩy lùi, nhấp nháy + bất tử 1 giây.

### Chuỗi chết của QUÁI
1. Trúng đòn cuối: chớp trắng + khựng 0.05s, hiện death_1 (ngã).
2. TẮT VA CHẠM ngay lúc ngã: xác không gây sát thương, không chặn đường.
3. Quái bay: rơi xuống đất trước (bật trọng lực), không nằm lơ lửng.
4. Nằm ở death_2 khoảng 1s, nhấp nháy đỏ nhanh dần.
5. Nổ vụn pixel màu thân + chớp sáng nhỏ. Tỉ lệ rơi cục máu (~20%).
Âm thanh: enemy_fall (bịch) -> beep dồn dần -> explode_small.

### Chuỗi chết của BOSS
1. Khựng 0.2s, slow-motion, rung màn hình.
2. Ngã (death_1), nằm (death_2) khoảng 2s, nhấp nháy dồn dập.
3. Nổ liên hoàn 4-5 phát khắp thân, cuối cùng chớp trắng cả màn.
4. Cảnh chiếm role: màu boss bay vào người chơi, người chơi đổi màu + chữ role mới hiện lên.
5. DCO: nổ to hơn, rồi mờ dần sang màn chiến thắng.
Âm thanh: boss_down (rè điện) -> beep dồn dập -> explode_big liên hoàn -> role_up.

## 10b. Địa hình, checkpoint, vật phẩm

Địa hình VẼ BẰNG CODE (không dùng tile AI vì hay lệch mép): khối tối, viền neon theo màu màn. Gồm sàn, bục nổi, tường, hố rơi (rơi hố = mất 1 phần máu và về checkpoint gần nhất).

Vật phẩm (assets/items/, cần tạo 1 sheet nhỏ):
- item_health: cục máu, hồi 1 phần máu. Rơi từ quái hoặc đặt sẵn.
- item_checkpoint_off / item_checkpoint_on: cột hồi sinh. Chạm vào thì bật sáng, chết sẽ hồi sinh tại đây.
- item_spikes: gai trên sàn, chạm là mất máu.

Mỗi màn: 2 checkpoint giữa màn + 1 checkpoint ngay trước phòng boss.

## 10c. Màn hình phụ và lưu tiến độ

- Màn tiêu đề: tên "Dlicom: Journey to DCO" + nút Play (+ Continue nếu có lưu).
- Chọn màn: chỉ hiện màn đã mở khóa.
- Lưu tiến độ bằng localStorage (bộ nhớ trình duyệt): màn đã mở + role đã có. Bọc try/catch, lỗi thì vẫn chơi được bình thường.
- Tạm dừng (phím Esc / nút trên mobile).
- Hướng dẫn phím hiện ngắn gọn ở đầu màn 1.
- Màn thua: nút chơi lại từ checkpoint. Màn thắng cuối game + credit âm thanh.
- Lý do lưu tiến độ: ban giám khảo có thể không chơi liền 15 phút, phải vào lại chơi tiếp được để thấy tới DCO.

## 11. Danh sách asset (đã có sẵn, file PNG rời)

Tất cả nền trong suốt, tên theo động tác. Nạp từng PNG rời rồi ghép thành animation (KHÔNG cắt theo lưới cứng, mỗi khung rộng khác nhau).

Nhân vật chính (mỗi con 13 khung): idle_1/2, run_1..4, jump_up, jump_down, shoot_1/2, hit_1, death_1/2
- assets/characters/verified/verified_...
- assets/characters/dliever/dliever_...
- assets/characters/dcoded/dcoded_...
- assets/characters/dco/dco_... (dùng idle + shoot + hit + death, run/jump dự phòng)

Quái (9 con, mỗi con 7 khung): move_1/2, jump_up, jump_down, attack_1, death_1/2
- assets/enemies/bot_1_1 ... bot_3_3, file dạng bot_2_1_move_1.png

Vật phẩm: assets/items/item_health.png, item_checkpoint_off.png, item_checkpoint_on.png, item_spikes.png

Đạn: assets/bullets/bullet_player.png, bullet_spam.png, bullet_boss.png

Nền: assets/background/stage_bg.png (dùng chung 3 màn, phủ màu theo màn bằng code: màn 1 ám xanh, màn 2 ám vàng, màn 3 tím/hồng). Vì màn cuộn ngang dài hơn ảnh, lặp (tile) nền theo chiều ngang hoặc cho cuộn chậm (parallax) là được.

Ánh xạ animation:
- idle: lặp idle_1, idle_2
- run: lặp run_1..run_4
- jump: jump_up khi lên, jump_down khi rơi
- shoot: shoot_1, shoot_2 rồi về idle
- hit: hit_1 chớp ngắn
- death: death_1, death_2 rồi dừng
- quái move: lặp move_1, move_2; attack: attack_1; death: death_1, death_2

## 12. Phạm vi và thứ tự làm (chống ôm đồm)

Làm theo lát cắt: xong 1 màn NGẮN chạy trọn trước, rồi mới kéo dài và thêm màn. Lúc nào cũng có bản chơi được.

Ưu tiên: 3 màn cuộn ngang chạy trọn, 3 boss, 9 quái (4 hành vi), 4 dạng nhân vật, âm thanh cơ bản, mobile.

Chỉ thêm nếu dư thời gian: nhạc riêng từng màn, parallax nhiều lớp, vạch tiến độ, hiệu ứng cầu kỳ, màn hình cốt truyện.

## 13. Tech stack

- Phaser 3 (thư viện JavaScript làm game 2D trên trình duyệt, lo sẵn trọng lực, va chạm, camera cuộn, sprite, audio).
- HTML + JS thuần, không backend, không ví.
- Deploy: 1 trang web tĩnh, đưa lên itch.io (miễn phí, chuyên game HTML5, chơi được trên mobile). Đưa lên thử SỚM, không đợi ngày cuối.
