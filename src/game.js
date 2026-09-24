// Dlicom: Journey to DCO - 3 màn, 3 boss, 4 dạng nhân vật

const GAME_W = 960; // chiều rộng khung hình
const GAME_H = 540; // chiều cao khung hình
const GROUND_Y = 480; // mặt trên của sàn chính
const GRAVITY = 1400; // trọng lực
const JUMP_HIGH = 165; // giữ phím: nhảy cao 165px (hơn cũ 20%)
const JUMP_LOW = 82; // bấm nhanh: nhảy 82px (60% độ cao cũ)
const JUMP_V = Math.sqrt(2 * GRAVITY * JUMP_HIGH); // lực bật để đạt độ cao tối đa
const JUMP_TAP_MS = 110; // thả phím trong 0.11 giây thì tính là bấm nhanh
const FONT = '"Chakra Petch", monospace'; // phông chữ thường (có dấu tiếng Việt)
const FONT_TITLE = '"Bungee", "Chakra Petch", sans-serif'; // phông tiêu đề kiểu arcade
const LEVEL_W = 8600; // chiều dài màn 1
const ARENA_X = 7600; // mép trái phòng boss
const ROLES = { verified: { maxHp: 5 }, dliever: { maxHp: 8 }, dcoded: { maxHp: 11 } }; // máu tối đa theo role
const LEVELS = { // dữ liệu từng màn
  1: { // màn 1 - xanh
    neon: 0x3399ff, bgTint: 0x6699ff, color: 0x3399ff, music: 'music_stage', startRole: 'verified', boss: 'dliever', bossHp: 30, // màu, nhạc, role đầu màn, boss
    ground: [[0, 900], [1000, 1900], [2020, 2700], [2800, 3700], [3820, 4600], [4740, 5500], [5620, 6500], [6620, LEVEL_W]], // các đoạn sàn, khe giữa là hố
    platforms: [[560, 380, 160], [1180, 370, 140], [1380, 300, 140], [2180, 370, 180], [2950, 370, 160], [3400, 360, 140], [3650, 300, 160], [4100, 370, 180], [4900, 360, 140], [5100, 290, 140], [5900, 370, 180], [6900, 360, 160], [7200, 300, 140]], // bục nổi
    walls: [[1640, 80], [4350, 80], [6200, 100]], // tường (x, cao)
    spikes: [1520, 2450, 4450, 5300, 6350], // vị trí gai
    health: [[5170, 250], [2270, 330]], // cục máu đặt sẵn
    checkpoints: [2900, 5700, 7450], // cột hồi sinh: 2 giữa màn + 1 trước boss
    enemies: [['bot_1_1', 'WALKER', 520], ['bot_1_2', 'FLYER', 1100], ['bot_1_1', 'WALKER', 1300], ['bot_1_3', 'CHARGER', 1850], ['bot_1_2', 'FLYER', 2300], ['bot_1_1', 'WALKER', 2550], ['bot_1_1', 'SHOOTER', 3030, 370], ['bot_1_3', 'CHARGER', 3300], ['bot_1_1', 'WALKER', 3900], ['bot_1_2', 'FLYER', 4200], ['bot_1_1', 'WALKER', 4900], ['bot_1_1', 'SHOOTER', 5170, 290], ['bot_1_3', 'CHARGER', 5400], ['bot_1_2', 'FLYER', 5800], ['bot_1_1', 'WALKER', 6000], ['bot_1_1', 'WALKER', 6800], ['bot_1_2', 'FLYER', 7000], ['bot_1_3', 'CHARGER', 7400]], // quái (tên, kiểu, x, mặt đứng)
  },
  2: { // màn 2 - vàng
    neon: 0xffcc33, bgTint: 0xffcc77, color: 0xffcc33, music: 'music_level2', startRole: 'dliever', boss: 'dcoded', bossHp: 42, // màu, nhạc, role đầu màn, boss
    ground: [[0, 1000], [1120, 2000], [2150, 2900], [3050, 3800], [3950, 4700], [4850, 5600], [5750, 6500], [6650, LEVEL_W]], // các đoạn sàn
    platforms: [[500, 370, 160], [800, 300, 140], [1400, 360, 160], [1700, 290, 140], [2400, 370, 180], [3200, 360, 160], [3500, 290, 140], [4200, 370, 160], [4950, 360, 160], [5300, 290, 140], [6000, 370, 180], [6900, 360, 160], [7250, 300, 140]], // bục nổi
    walls: [[1900, 90], [4500, 90], [6300, 110]], // tường
    spikes: [1300, 2600, 4100, 5450, 6150], // gai
    health: [[1770, 250], [5370, 250]], // cục máu
    checkpoints: [3100, 5800, 7450], // cột hồi sinh: 2 giữa màn + 1 trước boss
    enemies: [['bot_2_1', 'WALKER', 600], ['bot_2_3', 'FLYER', 1000], ['bot_2_1', 'WALKER', 1500], ['bot_2_1', 'WALKER', 1560], ['bot_2_2', 'SHOOTER', 1760, 290], ['bot_2_3', 'FLYER', 2500], ['bot_2_1', 'WALKER', 3300], ['bot_2_1', 'WALKER', 3350], ['bot_2_2', 'SHOOTER', 3570, 290], ['bot_2_3', 'FLYER', 4000], ['bot_2_1', 'WALKER', 4300], ['bot_2_2', 'SHOOTER', 5030, 360], ['bot_2_1', 'WALKER', 5100], ['bot_2_3', 'FLYER', 5700], ['bot_2_1', 'WALKER', 6100], ['bot_2_1', 'WALKER', 6150], ['bot_2_1', 'WALKER', 6900], ['bot_2_3', 'FLYER', 7000], ['bot_2_2', 'SHOOTER', 7320, 300]], // quái màn 2
  },
  3: { // màn 3 - hồng, trùm cuối
    neon: 0xff44cc, bgTint: 0xcc66ff, color: 0xff44cc, music: 'music_level3', startRole: 'dcoded', boss: 'dco', bossHp: 60, // màu, nhạc, role đầu màn, boss
    ground: [[0, 800], [930, 1800], [1950, 2600], [2760, 3600], [3760, 4500], [4660, 5400], [5560, 6400], [6560, LEVEL_W]], // các đoạn sàn
    platforms: [[450, 360, 150], [700, 290, 140], [1300, 360, 160], [1550, 290, 140], [2200, 360, 160], [3000, 370, 180], [3300, 300, 140], [4000, 360, 160], [4250, 290, 140], [4900, 370, 160], [5800, 360, 160], [6050, 290, 140], [6900, 360, 160], [7250, 300, 140]], // bục nổi
    walls: [[1700, 100], [3500, 90], [5200, 110], [6300, 100]], // tường
    spikes: [1100, 2400, 3900, 4800, 5950, 6800], // gai
    health: [[1620, 250], [4320, 250], [6120, 250]], // cục máu
    checkpoints: [2850, 5650, 7450], // cột hồi sinh
    enemies: [['bot_3_3', 'CHARGER', 600], ['bot_3_2', 'FLYER', 900], ['bot_3_1', 'SHOOTER', 1400], ['bot_3_2', 'FLYER', 1900], ['bot_3_3', 'CHARGER', 2300], ['bot_3_2', 'FLYER', 2900], ['bot_3_1', 'SHOOTER', 3200], ['bot_3_3', 'CHARGER', 3850], ['bot_3_2', 'FLYER', 4100], ['bot_3_3', 'CHARGER', 4450], ['bot_3_1', 'SHOOTER', 5000], ['bot_3_2', 'FLYER', 5500], ['bot_3_3', 'CHARGER', 6000], ['bot_3_2', 'FLYER', 6700], ['bot_3_1', 'SHOOTER', 7000], ['bot_3_3', 'CHARGER', 7300]], // quái màn 3
  },
};
const PLAYER_FRAMES = ['idle_1', 'idle_2', 'run_1', 'run_2', 'run_3', 'run_4', 'jump_up', 'jump_down', 'shoot_1', 'shoot_2', 'hit_1', 'death_1', 'death_2']; // 13 khung nhân vật
const ENEMY_FRAMES = ['move_1', 'move_2', 'jump_up', 'jump_down', 'attack_1', 'death_1', 'death_2']; // 7 khung quái
const V2_SPEC = { idle: [4, 5.5], run: [8, 12.5], jump: [6, 0], shoot: [3, 9], hit: [2, 8], death: [4, 5] }; // bộ vẽ mới: [số khung, hình/giây]
const V2 = { verified: { ...V2_SPEC, runshoot: [8, 12.5] }, dliever: { ...V2_SPEC, runshoot: [8, 12.5] }, dcoded: { ...V2_SPEC, runshoot: [8, 12.5] } }; // các role đã có bộ vẽ mới (kèm khung vừa chạy vừa bắn)
const V2_MAP = { jump_up: 'jump_2', jump_down: 'jump_5', death_1: 'death_2', death_2: 'death_4' }; // đổi tên khung cũ sang khung mới (dùng cho boss)
function frameKey(role, name) { return `${role}_${V2[role] && V2_MAP[name] ? V2_MAP[name] : name}`; } // tên khung đúng theo bộ vẽ của role
const MINION_SIZE = { bot_1_1: [0.339, 48, 49], bot_1_2: [0.307, 45, 49], bot_1_3: [0.256, 44, 49], bot_2_1: [0.216, 30, 49], bot_2_2: [0.246, 39, 49], bot_2_3: [0.359, 72, 49], bot_3_1: [0.351, 60, 74], bot_3_2: [0.237, 36, 49], bot_3_3: [0.311, 56, 49] }; // [tỉ lệ vẽ để cao bằng người chơi (xe tăng 1.5 lần), rộng hitbox, cao hitbox]
const CHAR_KEYS = ['verified', 'dliever', 'dcoded', 'dco']; // các nhân vật cần nạp
const BOT_KEYS = ['bot_1_1', 'bot_1_2', 'bot_1_3', 'bot_2_1', 'bot_2_2', 'bot_2_3', 'bot_3_1', 'bot_3_2', 'bot_3_3']; // 9 quái của 3 màn

class GameScene extends Phaser.Scene { // cảnh chơi chính
  constructor() { super('Game'); } // đặt tên cảnh là Game

  preload() { // nạp tài nguyên
    for (const k of CHAR_KEYS) { // lặp từng nhân vật
      if (V2[k]) { for (const a in V2[k]) for (let n = 1; n <= V2[k][a][0]; n++) this.load.image(`${k}_${a}_${n}`, `assets/characters/${k}/${k}_${a}_${n}.png`); } // bộ mới: nạp theo số khung từng động tác
      else for (const f of PLAYER_FRAMES) this.load.image(`${k}_${f}`, `assets/characters/${k}/${k}_${f}.png`); // bộ cũ: 13 khung cố định
    }
    for (const k of BOT_KEYS) for (const f of ENEMY_FRAMES) this.load.image(`${k}_${f}`, `assets/enemies/${k}/${k}_${f}.png`); // nạp từng khung quái
    for (const b of ['bullet_player', 'bullet_spam', 'bullet_boss']) this.load.image(b, `assets/bullets/${b}.png`); // nạp 3 loại đạn
    for (const i of ['item_health', 'item_spikes', 'item_checkpoint_off', 'item_checkpoint_on']) this.load.image(i, `assets/items/${i}.png`); // nạp vật phẩm
    this.load.image('stage_bg', 'assets/background/stage_bg.png'); // nạp ảnh nền
    for (const n of ['shoot', 'fan', 'dash']) this.load.image(`icon_${n}`, `assets/ui/icon_${n}.png`); // nạp 3 icon nút bắn và skill
    for (const a of ['shoot', 'hit', 'jump', 'skill', 'enemy_fall', 'beep', 'explode_small', 'boss_down', 'explode_big', 'role_up', 'pickup', 'checkpoint', 'win', 'lose']) this.load.audio(a, `assets/audio/${a}.ogg`); // nạp 14 hiệu ứng âm thanh
    this.load.audio('music_stage', 'assets/audio/music_stage.mp3'); // nạp nhạc nền màn 1
    this.load.audio('music_level2', 'assets/audio/music_level2.mp3'); // nạp nhạc nền màn 2
    this.load.audio('music_level3', 'assets/audio/music_level3.mp3'); // nạp nhạc nền màn 3
    this.load.audio('music_win', 'assets/audio/music_win.mp3'); // nạp nhạc thắng
  }

  create() { // dựng màn chơi
    this.physics.world.resume(); // chắc chắn vật lý chạy lại khi chơi lại
    this.tweens.timeScale = 1; // bỏ slow motion còn sót
    this.physicsFrozen = false; // bỏ cờ khựng còn sót
    this.level = this.registry.get('level') || 1; // màn đang chơi
    this.lv = LEVELS[this.level]; // dữ liệu màn đang chơi
    this.canNext = false; // chưa được sang màn sau
    this.paused = false; // chưa tạm dừng
    this.time.paused = false; // đồng hồ cảnh chạy lại khi vào màn
    this.tweens.resumeAll(); // chạy lại tween nếu lúc trước đang tạm dừng
    this.anims.resumeAll(); // chạy lại animation nếu lúc trước đang tạm dừng
    this.makeAnims(); // tạo các animation
    this.makePixelTexture(); // tạo hạt pixel cho hiệu ứng nổ
    this.bg = this.add.tileSprite(0, 0, GAME_W, GAME_H, 'stage_bg').setOrigin(0).setScrollFactor(0); // nền lặp ngang, đứng yên theo camera
    this.bg.tileScaleX = this.bg.tileScaleY = GAME_H / 941; // co ảnh nền vừa chiều cao màn hình
    this.bg.setTint(this.lv.bgTint); // ám màu theo màn
    this.physics.world.setBounds(0, 0, LEVEL_W, GAME_H + 200); // biên thế giới, chừa khoảng dưới cho hố rơi
    this.physics.world.checkCollision.down = false; // cho phép rơi ra khỏi đáy (hố)
    this.solids = this.physics.add.staticGroup(); // nhóm khối đặc (sàn, bục, tường)
    this.spikes = this.physics.add.staticGroup(); // nhóm gai
    this.items = this.physics.add.group({ allowGravity: false }); // nhóm cục máu
    this.pBullets = this.physics.add.group({ allowGravity: false }); // đạn người chơi
    this.eBullets = this.physics.add.group({ allowGravity: false }); // đạn quái và boss
    this.enemyBoxes = this.physics.add.group(); // hitbox quái
    this.enemies = []; // danh sách quái
    this.buildLevel(); // vẽ địa hình
    this.createPlayer(this.registry.get('cpX') || 120, GROUND_Y - 40); // tạo nhân vật ở đầu màn hoặc ở checkpoint đã chạm
    this.spawnEnemies(); // rải quái
    this.setupCollisions(); // cài va chạm
    this.setupInput(); // cài phím
    this.cameras.main.setBounds(0, 0, LEVEL_W, GAME_H); // giới hạn camera trong màn
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1); // camera bám nhân vật
    const help = this.add.text(GAME_W / 2, 60, tr(`MÀN ${this.level}   `, `STAGE ${this.level}   `) + (this.scheme === 'wasd' ? tr('A D đi   W nhảy   J bắn   K L skill   P dừng', 'A D move   W jump   J shoot   K L skill   P pause') : tr('← → đi   ↑ nhảy   A bắn   S D skill   P dừng', '← → move   ↑ jump   A shoot   S D skill   P pause')), { fontFamily: FONT, fontSize: 18, color: '#aaddff', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setScrollFactor(0).setDepth(100); // hướng dẫn phím đầu màn
    this.tweens.add({ targets: help, alpha: 0, delay: 5000, duration: 800 }); // mờ dần sau 5 giây
    this.boss = null; // chưa có boss
    this.bossStarted = false; // chưa vào phòng boss
    this.levelOver = false; // màn chưa kết thúc
    this.setupAudio(); // cài nhạc nền và nút bật tắt âm thanh
    this.createHud(); // thanh máu, icon skill, tiến độ màn
    this.createTouch(); // nút ảo cho điện thoại
    this.cameras.main.fadeIn(400); // hiện dần khi vào màn
  }

  setupAudio() { // nhạc nền + 2 nút Nhạc / SFX ở góc phải
    this.sound.stopAll(); // tắt âm thanh còn sót khi chơi lại
    if (this.registry.get('musicOn') === undefined) this.registry.set('musicOn', loadFlag('musicOn')); // đọc cài đặt nhạc đã lưu
    if (this.registry.get('sfxOn') === undefined) this.registry.set('sfxOn', loadFlag('sfxOn')); // đọc cài đặt SFX đã lưu
    this.music = this.sound.add(this.lv.music, { loop: true, volume: 0.35 * musicVol() }); // nhạc nền lặp theo màn, nhân âm lượng người chơi chỉnh
    if (this.registry.get('musicOn')) this.music.play(); // bật nhạc nếu đang cho phép
    const style = { fontFamily: FONT, fontSize: 16, color: '#ffffff', backgroundColor: '#12122a', padding: { x: 8, y: 5 } }; // kiểu nút
    const musicBtn = this.add.text(GAME_W - 16, 12, '', style).setOrigin(1, 0).setScrollFactor(0).setDepth(150).setInteractive({ useHandCursor: true }); // nút nhạc góc phải
    const sfxBtn = this.add.text(GAME_W - 16, 44, '', style).setOrigin(1, 0).setScrollFactor(0).setDepth(150).setInteractive({ useHandCursor: true }); // nút SFX ngay dưới
    const refresh = () => { // cập nhật chữ trên nút
      musicBtn.setText(`${tr('Nhạc', 'Music')}: ${this.registry.get('musicOn') ? tr('BẬT', 'ON') : tr('TẮT', 'OFF')}`); // chữ nút nhạc
      sfxBtn.setText(`SFX: ${this.registry.get('sfxOn') ? tr('BẬT', 'ON') : tr('TẮT', 'OFF')}`); // chữ nút SFX
    };
    refresh(); // hiện chữ lần đầu
    musicBtn.on('pointerdown', () => { // bấm nút nhạc
      const on = !this.registry.get('musicOn'); // đảo trạng thái
      this.registry.set('musicOn', on); // lưu trong game
      saveFlag('musicOn', on); // lưu vào trình duyệt
      if (on) { if (this.music.isPaused) this.music.resume(); else if (!this.music.isPlaying) this.music.play(); } else this.music.pause(); // bật hoặc tạm dừng nhạc
      refresh(); // cập nhật chữ
    });
    const pauseBtn = this.add.text(GAME_W - 16, 76, tr('Dừng (P)', 'Pause (P)'), style).setOrigin(1, 0).setScrollFactor(0).setDepth(150).setInteractive({ useHandCursor: true }); // nút tạm dừng
    pauseBtn.on('pointerdown', () => this.togglePause()); // bấm thì tạm dừng hoặc chơi tiếp
    sfxBtn.on('pointerdown', () => { // bấm nút SFX
      const on = !this.registry.get('sfxOn'); // đảo trạng thái
      this.registry.set('sfxOn', on); // lưu trong game
      saveFlag('sfxOn', on); // lưu vào trình duyệt
      refresh(); // cập nhật chữ
    });
  }

  sfx(key, volume = 0.5) { // phát 1 hiệu ứng âm thanh nếu SFX đang bật
    if (this.registry.get('sfxOn')) this.sound.play(key, { volume: volume * sfxVol() }); // phát âm thanh theo âm lượng người chơi chỉnh
  }

  makeAnims() { // tạo animation cho nhân vật và quái
    for (const k of CHAR_KEYS) { // lặp từng nhân vật
      if (this.anims.exists(`${k}_idle`)) continue; // đã tạo rồi thì bỏ qua (khi chơi lại)
      if (V2[k]) { // bộ vẽ mới
        const seq = (a) => Array.from({ length: V2[k][a][0] }, (_, i) => ({ key: `${k}_${a}_${i + 1}` })); // danh sách khung của 1 động tác
        for (const [a, rep] of [['idle', -1], ['run', -1], ['runshoot', -1], ['shoot', 0], ['hit', 0], ['death', 0]]) if (V2[k][a]) this.anims.create({ key: `${k}_${a}`, frames: seq(a), frameRate: V2[k][a][1], repeat: rep }); // tạo animation theo nhịp của file gốc
        continue; // xong nhân vật này
      }
      this.anims.create({ key: `${k}_idle`, frames: [{ key: `${k}_idle_1` }, { key: `${k}_idle_2` }], frameRate: 3, repeat: -1 }); // đứng yên lặp 2 khung
      this.anims.create({ key: `${k}_run`, frames: [1, 2, 3, 4].map(n => ({ key: `${k}_run_${n}` })), frameRate: 13, repeat: -1 }); // chạy lặp 4 khung
      this.anims.create({ key: `${k}_shoot`, frames: [{ key: `${k}_shoot_1` }, { key: `${k}_shoot_2` }], frameRate: 12, repeat: 0 }); // bắn 2 khung
      this.anims.create({ key: `${k}_death`, frames: [{ key: `${k}_death_1` }, { key: `${k}_death_2` }], frameRate: 3, repeat: 0 }); // chết 2 khung rồi dừng
    }
    for (const k of BOT_KEYS) { // lặp từng quái
      if (this.anims.exists(`${k}_move`)) continue; // đã tạo rồi thì bỏ qua
      this.anims.create({ key: `${k}_move`, frames: [{ key: `${k}_move_1` }, { key: `${k}_move_2` }], frameRate: 8, repeat: -1 }); // quái di chuyển lặp 2 khung
    }
  }

  makePixelTexture() { // tạo 1 ô vuông trắng nhỏ làm hạt nổ
    if (this.textures.exists('px')) return; // đã có thì thôi
    const g = this.add.graphics(); // bút vẽ tạm
    g.fillStyle(0xffffff).fillRect(0, 0, 6, 6); // vẽ ô trắng 6x6
    g.generateTexture('px', 6, 6); // lưu thành texture tên px
    g.destroy(); // xoá bút vẽ
  }

  addBlock(x, y, w, h) { // thêm 1 khối đặc có viền neon
    const r = this.add.rectangle(x, y, w, h, 0x0d0d1f).setOrigin(0).setStrokeStyle(3, this.lv.neon); // khối tối viền neon theo màu màn
    this.solids.add(r); // đưa vào nhóm khối đặc (tạo body tĩnh)
    return r; // trả về khối
  }

  addSpikes(x) { // đặt gai trên sàn tại toạ độ x
    const s = this.spikes.create(x, GROUND_Y, 'item_spikes').setOrigin(0.5, 1).setScale(0.5); // ảnh gai đứng trên sàn
    s.refreshBody(); // cập nhật body theo kích thước mới
    return s; // trả về gai
  }

  buildLevel() { // vẽ địa hình theo dữ liệu màn
    const lv = this.lv; // dữ liệu màn
    for (const [a, b] of lv.ground) this.addBlock(a, GROUND_Y, b - a, GAME_H - GROUND_Y + 10); // các đoạn sàn, khe giữa là hố
    for (const [x, y, w] of lv.platforms) this.addBlock(x, y, w, 20); // bục nổi
    for (const [x, h] of lv.walls) this.addBlock(x, GROUND_Y - h, 40, h); // tường phải nhảy qua
    this.addBlock(ARENA_X - 20, 0, 20, 160); // mép trên cửa phòng boss (trang trí)
    this.addBlock(ARENA_X + GAME_W - 20, 0, 40, GROUND_Y); // tường mép phải phòng boss, không lao hay đi ra khỏi màn
    for (const x of lv.spikes) this.addSpikes(x); // gai
    for (const [x, y] of lv.health) this.addHealth(x, y); // cục máu đặt sẵn
    this.cps = this.physics.add.staticGroup(); // nhóm cột hồi sinh
    for (const x of lv.checkpoints) this.addCheckpoint(x); // đặt cột hồi sinh
  }

  addCheckpoint(x) { // đặt 1 cột hồi sinh trên sàn
    const on = x <= (this.registry.get('cpX') || 0); // đã chạm từ lần trước thì bật sẵn
    const c = this.cps.create(x, GROUND_Y, on ? 'item_checkpoint_on' : 'item_checkpoint_off').setOrigin(0.5, 1).setScale(0.6).setDepth(5); // hình cột
    c.refreshBody(); // cập nhật body theo kích thước
    c.cpOn = on; // trạng thái bật
  }

  touchCheckpoint(c) { // người chơi chạm cột hồi sinh
    if (c.cpOn) return; // đã bật rồi thì thôi
    c.cpOn = true; // bật cột
    c.setTexture('item_checkpoint_on'); // đổi hình sáng
    this.respawnX = c.x; // rơi hố thì về đây
    this.registry.set('cpX', c.x); // chết thì hồi sinh ở đây
    this.sfx('checkpoint', 0.6); // tiếng chạm checkpoint
    this.explode(c.x, GROUND_Y - 60, this.lv.color, 16); // bùng hạt nhỏ
  }

  addHealth(x, y) { // tạo cục máu tại x, y
    const it = this.items.create(x, y, 'item_health').setScale(0.4); // ảnh cục máu thu nhỏ
    this.tweens.add({ targets: it, y: y - 8, yoyo: true, repeat: -1, duration: 600 }); // nhún lên xuống cho dễ thấy
    return it; // trả về vật phẩm
  }

  createPlayer(x, y) { // tạo nhân vật người chơi
    this.player = this.add.rectangle(x, y, 26, 50); // hitbox vô hình, nhỏ hơn hình vẽ
    this.physics.add.existing(this.player); // gắn body vật lý
    this.player.body.setMaxVelocityY(900); // giới hạn tốc độ rơi
    this.role = this.lv.startRole; // role đầu màn (đã chiếm ở màn trước)
    this.pSprite = this.add.sprite(x, y, `${this.role}_idle_1`).setOrigin(0.5, 1).setScale(0.42).setDepth(10); // hình vẽ nhân vật
    this.maxHp = ROLES[this.role].maxHp; // máu tối đa theo role
    this.hp = this.maxHp; // máu hiện tại
    this.facing = 1; // hướng nhìn (1 phải, -1 trái)
    this.invulUntil = 0; // mốc hết bất tử
    this.knockUntil = 0; // mốc hết bị đẩy lùi (khoá điều khiển)
    this.shootReadyAt = 0; // mốc được bắn tiếp
    this.shootAnimUntil = 0; // mốc hết tư thế bắn
    this.hasSkill1 = this.role !== 'verified'; // từ Dliever trở lên có skill 5 tia
    this.skill1ReadyAt = 0; // mốc hồi xong skill 5 tia
    this.hasSkill2 = this.role === 'dcoded'; // Dcoded có skill lao tới
    this.skill2ReadyAt = 0; // mốc hồi xong skill lao
    this.dashUntil = 0; // mốc hết cú lao
    this.dashId = 0; // số thứ tự cú lao (mỗi quái chỉ bị trúng 1 lần mỗi cú)
    this.dead = false; // còn sống
    this.respawnX = x; // điểm hồi sinh khi rơi hố
  }

  spawnEnemies() { // rải quái dọc đường theo dữ liệu màn
    for (const [key, type, x, gy] of this.lv.enemies) this.addEnemy(key, type, x, gy); // tạo từng con
  }

  addEnemy(key, type, x, groundY = GROUND_Y) { // tạo 1 quái
    const flying = type === 'FLYER'; // có phải quái bay không
    const big = key === 'bot_3_1'; // xe tăng Botnet Node phóng to 1.5 lần
    const [scale, bw, bh] = MINION_SIZE[key]; // cỡ vẽ và cỡ hitbox của con này
    const box = this.add.rectangle(x, flying ? 250 : groundY - bh / 2 - 2, bw, bh); // hitbox khớp hình, nhỏ hơn hình một chút
    this.physics.add.existing(box); // gắn body vật lý
    this.enemyBoxes.add(box); // đưa vào nhóm quái
    box.body.setAllowGravity(!flying); // quái bay thì không trọng lực
    const spr = this.add.sprite(x, box.y, `${key}_move_1`).setOrigin(0.5, 1).setScale(scale).setDepth(9); // hình vẽ quái, cao bằng người chơi
    spr.play(`${key}_move`); // chạy animation di chuyển
    const e = { key, type, box, spr, hp: big ? 7 : 3, state: 'alive', mode: 'idle', nextAt: this.time.now + 1500, baseY: box.y, color: this.lv.color }; // dữ liệu quái
    box.enemy = e; // gắn ngược dữ liệu vào hitbox
    this.enemies.push(e); // lưu vào danh sách
    return e; // trả về quái
  }

  setupCollisions() { // cài các va chạm
    this.physics.add.collider(this.player, this.solids); // nhân vật đứng trên địa hình
    this.physics.add.collider(this.enemyBoxes, this.solids, null, (b) => !(b.enemy && b.enemy.type === 'FLYER' && b.enemy.state === 'alive')); // quái đứng trên địa hình, quái bay lúc sống thì xuyên qua
    this.physics.add.collider(this.pBullets, this.solids, (b) => b.destroy()); // đạn người chơi chạm tường thì mất
    this.physics.add.collider(this.eBullets, this.solids, (b) => b.destroy()); // đạn quái chạm tường thì mất
    this.physics.add.overlap(this.pBullets, this.enemyBoxes, (b, box) => { if (box.enemy.state !== 'alive') return; b.destroy(); this.hitEnemy(box.enemy, 1); }); // đạn trúng quái còn sống
    this.physics.add.overlap(this.player, this.enemyBoxes, (p, box) => { // chạm quái
      const e = box.enemy; // dữ liệu quái
      if (e.state !== 'alive') return; // xác thì không làm gì
      if (this.time.now < this.dashUntil) { if (e.dashHit !== this.dashId) { e.dashHit = this.dashId; this.hitEnemy(e, 3); } return; } // đang lao thì gây sát thương cho quái
      this.damagePlayer(1, box.x); // bình thường thì người chơi mất máu
    });
    this.physics.add.overlap(this.player, this.eBullets, (p, b) => { const bx = b.x, dmg = b.dmg || 1; b.destroy(); this.damagePlayer(dmg, bx); }); // trúng đạn địch (đạn DCO đau hơn)
    this.physics.add.overlap(this.player, this.cps, (p, c) => this.touchCheckpoint(c)); // chạm cột hồi sinh
    this.physics.add.overlap(this.player, this.spikes, (p, s) => this.damagePlayer(1, s.x)); // dẫm gai
    this.physics.add.overlap(this.player, this.items, (p, it) => { it.destroy(); this.hp = Math.min(this.maxHp, this.hp + 2); this.sfx('pickup'); }); // nhặt cục máu hồi 2 máu
  }

  setupInput() { // cài phím điều khiển
    this.scheme = this.registry.get('scheme') || 'arrows'; // kiểu điều khiển đã chọn ở menu
    const map = this.scheme === 'wasd' // bảng phím theo kiểu điều khiển
      ? { left: 'A', right: 'D', jump: 'W', shoot: 'J', skill1: 'K', skill2: 'L' } // kiểu FPS: WASD, J bắn, K L skill
      : { left: 'LEFT', right: 'RIGHT', jump: 'UP', shoot: 'A', skill1: 'S', skill2: 'D' }; // kiểu mũi tên: A bắn, S D skill
    this.keys = this.input.keyboard.addKeys(map); // tạo các phím theo bảng
    this.keyR = this.input.keyboard.addKey('R'); // phím R chơi lại
    this.keyEnter = this.input.keyboard.addKey('ENTER'); // phím Enter sang màn sau
    this.keyPause = this.input.keyboard.addKey('P'); // phím P tạm dừng
    this.keyEsc = this.input.keyboard.addKey('ESC'); // Esc cũng tạm dừng được
    this.keyM = this.input.keyboard.addKey('M'); // phím M về menu
  }

  update(time) { // chạy mỗi khung hình
    this.bg.tilePositionX = this.cameras.main.scrollX * 0.3 / this.bg.tileScaleX; // nền cuộn chậm hơn (parallax)
    if ((Phaser.Input.Keyboard.JustDown(this.keyPause) || Phaser.Input.Keyboard.JustDown(this.keyEsc)) && !this.dead && !this.levelOver) this.togglePause(); // P (hoặc Esc) tạm dừng hoặc chơi tiếp
    if (this.keyM.isDown && (this.paused || this.dead || this.levelOver)) { this.goMenu(); return; } // M về menu
    if (this.paused) return; // đang dừng thì không cập nhật gì
    if (this.keyR.isDown && (this.dead || this.levelOver)) { this.retry(); return; } // thua hoặc thắng thì bấm R chơi lại màn này
    if (this.keyEnter.isDown && this.canNext) { this.nextLevel(); return; } // chiếm role xong bấm Enter sang màn sau
    this.updatePlayer(time); // cập nhật nhân vật
    for (const e of this.enemies) if (e.state === 'alive') this.updateEnemy(e, time); // cập nhật quái còn sống
    this.enemies = this.enemies.filter(e => e.state !== 'gone'); // bỏ quái đã biến mất khỏi danh sách
    for (const e of this.enemies) this.animateEnemy(e, time); // hình vẽ quái bám hitbox + nhún, nghiêng
    const view = this.cameras.main.worldView; // vùng đang thấy trên màn hình
    for (const b of this.eBullets.getChildren().slice()) if (!Phaser.Geom.Rectangle.Overlaps(view, b.getBounds())) b.destroy(); // đạn địch bay ra khỏi màn thì xoá
    if (this.boss) this.updateBoss(time); // cập nhật boss
    if (!this.bossStarted && this.player.x > ARENA_X + 80) this.startBoss(); // bước vào phòng boss
    this.updateHud(time); // cập nhật HUD
  }

  updatePlayer(time) { // xử lý di chuyển, bắn, animation của nhân vật
    const body = this.player.body; // body vật lý
    this.pSprite.x = this.player.x; // hình vẽ bám theo x
    this.pSprite.y = body.bottom; // chân hình vẽ đặt ở đáy hitbox
    if (this.dead) return; // chết rồi thì không điều khiển
    if (this.player.y > GAME_H + 80) { this.fallInPit(); return; } // rơi xuống hố
    const onGround = body.blocked.down; // có đang đứng trên đất không
    if (onGround && this.wasAir && body.velocity.y >= 0) this.landFx(); // vừa đáp đất thì nhún bẹp + bụi
    this.wasAir = !onGround; // nhớ trạng thái trên không cho khung sau
    if (time < this.dashUntil) { // đang lao tới
      body.setVelocity(this.facing * 900, 0); // lao ngang nhanh, không rơi
      if (time > (this.nextGhostAt || 0)) { this.nextGhostAt = time + 30; this.addGhost(); } // để lại vệt mờ vàng
      return; // trong lúc lao không điều khiển gì khác
    }
    if (time > this.knockUntil) { // hết bị đẩy lùi thì mới điều khiển được
      if (this.keys.left.isDown || this.touch.left) { body.setVelocityX(-220); this.facing = -1; } // đi trái
      else if (this.keys.right.isDown || this.touch.right) { body.setVelocityX(220); this.facing = 1; } // đi phải
      else body.setVelocityX(0); // đứng yên
      if (this.pressed('jump') && onGround) { body.setVelocityY(-JUMP_V); this.jumpCut = true; this.jumpY0 = body.bottom; this.jumpT0 = time; this.sfx('jump', 0.3); this.jumpFx(); } // nhảy khi đang đứng đất (lực tối đa)
      const jumpHeld = this.keys.jump.isDown || this.touch.jump; // còn giữ phím nhảy không
      if (this.jumpCut && !jumpHeld && time - this.jumpT0 < JUMP_TAP_MS) { // thả phím ngay: nhảy thấp
        const left = JUMP_LOW - (this.jumpY0 - body.bottom); // độ cao còn thiếu để đạt mức thấp
        body.setVelocityY(left > 0 ? -Math.sqrt(2 * GRAVITY * left) : 0); // đặt lại lực để đỉnh nhảy đúng mức thấp
        this.jumpCut = false; // đã quyết định mức nhảy
      }
      if (time - this.jumpT0 >= JUMP_TAP_MS) this.jumpCut = false; // giữ đủ lâu: nhảy cao hết mức
    }
    if ((this.keys.shoot.isDown || this.touch.shoot) && time > this.shootReadyAt) this.playerShoot(time); // giữ phím bắn để bắn liên tục có nhịp
    if (this.hasSkill1 && this.pressed('skill1') && time > this.skill1ReadyAt) this.playerFan(time); // dùng skill 5 tia khi đã hồi xong
    if (this.hasSkill2 && this.pressed('skill2') && time > this.skill2ReadyAt) this.playerDash(time); // dùng skill lao khi đã hồi xong
    this.pSprite.setFlipX(this.facing < 0); // quay mặt theo hướng
    const k = this.role; // tiền tố tên khung theo role
    const v2 = V2[k]; // role này có bộ vẽ mới không
    const vy = body.velocity.y; // tốc độ dọc
    if (time < this.knockUntil) { if (v2) this.playAnim(this.pSprite, `${k}_hit`); else this.setFrame(this.pSprite, `${k}_hit_1`); } // đang trúng đòn
    else if (v2 && time < this.takeoffUntil) this.setFrame(this.pSprite, `${k}_jump_1`); // khung nhún lấy đà lúc bật nhảy
    else if (!onGround && v2) this.setFrame(this.pSprite, `${k}_jump_${vy < -300 ? 2 : vy < -80 ? 3 : vy < 120 ? 4 : 5}`); // trên không: lên nhanh, lên chậm, đỉnh, rơi
    else if (!onGround) this.setFrame(this.pSprite, vy < 0 ? `${k}_jump_up` : `${k}_jump_down`); // trên không (bộ cũ)
    else if (v2 && time < this.landUntil) this.setFrame(this.pSprite, `${k}_jump_6`); // khung đáp đất
    else if (time < this.shootAnimUntil && v2 && v2.runshoot && body.velocity.x !== 0) this.swapRunAnim(`${k}_runshoot`); // vừa chạy vừa bắn
    else if (time < this.shootAnimUntil) this.playAnim(this.pSprite, `${k}_shoot`); // đang bắn
    else if (body.velocity.x !== 0) { if (v2 && v2.runshoot) this.swapRunAnim(`${k}_run`); else this.playAnim(this.pSprite, `${k}_run`); } // đang chạy
    else this.playAnim(this.pSprite, `${k}_idle`); // đứng yên
    this.touch.jumpTap = this.touch.skill1Tap = this.touch.skill2Tap = false; // xoá lần chạm đã xử lý
    const running = onGround && body.velocity.x !== 0 && time > this.knockUntil; // đang chạy trên đất
    if (running) { // nhún và nghiêng theo nhịp bước
      const drawn = v2; // khung chạy mới đã vẽ sẵn nhún và đổ người
      if (!drawn) this.pSprite.y = body.bottom - Math.abs(Math.sin(time / 55)) * 4; // chỉ nhún bằng code khi khung cũ chưa có
      this.pSprite.setAngle(drawn ? 0 : this.facing * 5); // khung mới đã đổ người sẵn nên không nghiêng thêm
      if (time > (this.nextDustAt || 0)) { this.nextDustAt = time + 170; this.dust(this.player.x - this.facing * 10, body.bottom, 3); } // bụi nhỏ mỗi bước
    } else this.pSprite.setAngle(!onGround && !v2 ? this.facing * 3 : 0); // bộ cũ trên không hơi nghiêng, còn lại thẳng
  }

  landFx() { // đáp đất: nhún bẹp rồi bật lại + tung bụi
    if (V2[this.role]) { this.landUntil = this.time.now + 110; this.dust(this.player.x, this.player.body.bottom, 8); return; } // bộ mới có khung đáp đất vẽ sẵn, chỉ cần bụi
    this.tweens.add({ targets: this.pSprite, scaleX: 0.42 * 1.18, scaleY: 0.42 * 0.8, duration: 70, yoyo: true, onComplete: () => this.pSprite.setScale(0.42) }); // bẹp xuống rồi trả lại
    this.dust(this.player.x, this.player.body.bottom, 8); // bụi hai bên chân
  }

  jumpFx() { // bật nhảy: kéo dãn người
    if (V2[this.role]) { this.takeoffUntil = this.time.now + 70; this.dust(this.player.x, this.player.body.bottom, 5); return; } // bộ mới có khung nhún lấy đà vẽ sẵn
    this.tweens.add({ targets: this.pSprite, scaleX: 0.42 * 0.85, scaleY: 0.42 * 1.18, duration: 90, yoyo: true, onComplete: () => this.pSprite.setScale(0.42) }); // dãn dọc rồi trả lại
    this.dust(this.player.x, this.player.body.bottom, 5); // bụi lúc bật
  }

  dust(x, y, n) { // tung vài hạt bụi xám dưới chân
    const p = this.add.particles(x, y, 'px', { speed: { min: 20, max: 70 }, angle: { min: 200, max: 340 }, lifespan: 300, scale: { start: 0.7, end: 0 }, alpha: { start: 0.7, end: 0 }, tint: 0xaaaacc, emitting: false }).setDepth(8); // bộ phát bụi
    p.explode(n); // bắn n hạt
    this.time.delayedCall(400, () => p.destroy()); // dọn bộ phát
  }

  animateEnemy(e, time) { // hình quái bám hitbox, thêm nhún và nghiêng cho đỡ trượt
    e.spr.x = e.box.x; // bám x
    e.spr.y = e.box.body.bottom; // chân ở đáy hitbox
    if (e.state !== 'alive' || e.mode === 'warn') { if (e.state !== 'alive') e.spr.setAngle(0); return; } // chết hoặc đang rung báo trước thì không đụng
    const vx = e.box.body.velocity.x; // tốc độ ngang
    const phase = e.box.x * 0.05; // lệch pha để các con không nhún đồng loạt
    if (e.type === 'FLYER') { // quái bay
      e.spr.y += Math.sin(time / 140 + phase) * 3; // nhún nhẹ như đang đập cánh
      e.spr.setAngle(Phaser.Math.Clamp(vx / 12, -12, 12)); // nghiêng theo hướng bay
    } else if (e.mode === 'charge') { // đang lao
      e.spr.setAngle(Math.sign(vx) * 12); // đổ người mạnh về trước
      e.spr.y -= Math.abs(Math.sin(time / 35)) * 3; // nhún nhanh
      if (time > (e.nextDustAt || 0)) { e.nextDustAt = time + 90; this.dust(e.box.x, e.box.body.bottom, 3); } // bụi khi lao
    } else if (vx !== 0) { // đang đi bộ
      e.spr.y -= Math.abs(Math.sin(time / 110 + phase)) * 4; // nhún theo bước
      e.spr.setAngle(Math.sin(time / 110 + phase) * 5); // lắc lư trái phải
    } else e.spr.setAngle(0); // đứng yên thì thẳng
  }

  pressed(name) { // vừa bấm phím hoặc vừa chạm nút ảo trong khung này
    return Phaser.Input.Keyboard.JustDown(this.keys[name]) || this.touch[name + 'Tap']; // bàn phím hoặc cảm ứng
  }

  togglePause() { // tạm dừng hoặc chơi tiếp
    this.paused = !this.paused; // đảo trạng thái
    if (this.paused) { // bắt đầu dừng
      this.physics.world.pause(); // dừng vật lý
      this.time.paused = true; // dừng đồng hồ (hẹn giờ của boss, quái)
      this.tweens.pauseAll(); // dừng tween
      this.anims.pauseAll(); // dừng animation
      if (this.music.isPlaying) this.music.pause(); // dừng nhạc
      this.buildPauseMenu(); // hiện bảng tạm dừng có chỉnh âm lượng
    } else { // chơi tiếp
      this.physics.world.resume(); // chạy vật lý
      this.time.paused = false; // chạy đồng hồ
      this.tweens.resumeAll(); // chạy tween
      this.anims.resumeAll(); // chạy animation
      if (this.music.isPaused && this.registry.get('musicOn')) this.music.resume(); // chạy nhạc nếu đang bật
      for (const o of this.pauseUi || []) o.destroy(); // xoá bảng tạm dừng
      this.pauseUi = []; // làm rỗng danh sách
    }
  }

  buildPauseMenu() { // bảng tạm dừng: tiêu đề, 2 thanh âm lượng, hướng dẫn
    const ui = this.pauseUi = []; // các thành phần để xoá khi chơi tiếp
    const add = (o) => { ui.push(o.setScrollFactor(0).setDepth(210)); return o; }; // thêm vào bảng, cố định theo camera
    add(this.add.rectangle(GAME_W / 2, GAME_H / 2, 520, 330, 0x0a0a1c, 0.92).setStrokeStyle(3, this.lv.neon)); // khung nền bảng
    add(this.add.text(GAME_W / 2, 135, tr('TẠM DỪNG', 'PAUSED'), { fontFamily: FONT_TITLE, fontSize: 32, color: '#ffffff', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5).setPadding(12 + 6).setShadow(0, 0, '#ffffff', 12, true, true)); // tiêu đề
    this.makeSlider(215, tr('Nhạc', 'Music'), 'musicVol', (v) => { this.music.setVolume(0.35 * v); }); // thanh âm lượng nhạc
    this.makeSlider(280, tr('Hiệu ứng', 'Effects'), 'sfxVol', null); // thanh âm lượng hiệu ứng (thả tay thì phát thử)
    const resume = add(this.add.text(GAME_W / 2, 350, tr('▶ Chơi tiếp (P)', '▶ Resume (P)'), { fontFamily: FONT, fontSize: 22, color: '#ffffff', backgroundColor: '#2a4a8a', padding: { x: 16, y: 8 } }).setOrigin(0.5).setInteractive({ useHandCursor: true })); // nút chơi tiếp
    resume.on('pointerdown', () => this.togglePause()); // bấm thì chơi tiếp
    const menu = add(this.add.text(GAME_W / 2, 400, tr('Về menu (M)', 'Menu (M)'), { fontFamily: FONT, fontSize: 16, color: '#aaaacc' }).setOrigin(0.5).setInteractive({ useHandCursor: true })); // nút về menu
    menu.on('pointerdown', () => this.goMenu()); // bấm thì về menu
  }

  makeSlider(y, label, key, onChange) { // 1 thanh kéo âm lượng 0-100%
    const x0 = GAME_W / 2 - 90, w = 240; // mép trái và độ dài thanh
    const add = (o) => { this.pauseUi.push(o.setScrollFactor(0).setDepth(211)); return o; }; // thêm vào bảng tạm dừng
    let v = key === 'musicVol' ? musicVol() : sfxVol(); // giá trị hiện tại
    add(this.add.text(x0 - 20, y, label, { fontFamily: FONT, fontSize: 18, color: '#ffffff' }).setOrigin(1, 0.5)); // nhãn bên trái
    const bar = add(this.add.rectangle(x0, y, w, 10, 0x333355).setOrigin(0, 0.5).setInteractive({ useHandCursor: true })); // rãnh thanh
    const fill = add(this.add.rectangle(x0, y, w * v, 10, this.lv.neon).setOrigin(0, 0.5)); // phần đã chọn
    const knob = add(this.add.circle(x0 + w * v, y, 13, 0xffffff).setStrokeStyle(3, this.lv.neon).setInteractive({ draggable: true, useHandCursor: true })); // núm kéo
    const pct = add(this.add.text(x0 + w + 18, y, '', { fontFamily: FONT, fontSize: 18, color: '#ffffff' }).setOrigin(0, 0.5)); // số phần trăm
    const set = (px) => { // đặt giá trị theo toạ độ ngón tay/chuột
      v = Phaser.Math.Clamp((px - x0) / w, 0, 1); // đổi toạ độ ra 0-1
      knob.x = x0 + w * v; // dời núm
      fill.width = w * v; // tô phần đã chọn
      pct.setText(`${Math.round(v * 100)}%`); // hiện phần trăm
      this.registry.set(key, v); // dùng ngay trong game
      saveNum(key, Math.round(v * 100)); // lưu vào trình duyệt
      if (onChange) onChange(v); // cập nhật nhạc đang phát
    };
    set(x0 + w * v); // hiện giá trị ban đầu
    bar.on('pointerdown', (p) => set(p.x)); // bấm vào rãnh thì nhảy tới đó
    knob.on('drag', (p) => set(p.x)); // kéo núm
    const preview = () => { if (key === 'sfxVol' && this.registry.get('sfxOn')) this.sound.play('pickup', { volume: 0.5 * v }); }; // phát thử tiếng hiệu ứng
    bar.on('pointerup', preview); // thả tay trên rãnh thì phát thử
    knob.on('dragend', preview); // thả núm thì phát thử
  }

  retry() { // chơi lại màn này
    if (!this.dead) this.registry.set('cpX', null); // thắng rồi chơi lại thì bắt đầu từ đầu màn
    this.scene.restart(); // dựng lại màn (thua thì hồi sinh ở checkpoint)
  }

  nextLevel() { // sang màn sau
    if (!LEVELS[this.level + 1]) return; // hết màn thì thôi
    this.registry.set('level', this.level + 1); // tăng màn
    this.registry.set('cpX', null); // màn mới bắt đầu từ đầu
    this.scene.restart(); // dựng màn mới
  }

  goMenu() { // về menu
    this.sound.stopAll(); // tắt âm thanh
    this.scene.start('Menu'); // mở menu
  }

  createHud() { // HUD: máu, icon skill, tiến độ màn
    const d = 100; // độ sâu vẽ HUD
    const neonHex = '#' + this.lv.neon.toString(16).padStart(6, '0'); // màu chữ theo màn
    this.hudLabel = this.add.text(16, 8, '', { fontFamily: FONT, fontSize: 16, color: neonHex, stroke: '#000', strokeThickness: 3 }).setScrollFactor(0).setDepth(d); // nhãn màn và role
    this.add.rectangle(16, 32, 204, 16, 0x000000).setOrigin(0).setStrokeStyle(2, 0xffffff).setScrollFactor(0).setDepth(d); // khung thanh máu
    this.hpFill = this.add.rectangle(18, 34, 200, 12, 0x44ff66).setOrigin(0).setScrollFactor(0).setDepth(d); // thanh máu
    this.hpNum = this.add.text(228, 30, '', { fontFamily: FONT, fontSize: 16, color: '#ffffff', stroke: '#000', strokeThickness: 3 }).setScrollFactor(0).setDepth(d); // số máu
    this.cdUi = []; // danh sách nút có hiển thị hồi chiêu
    if (!this.sys.game.device.input.touch) { // máy tính: 2 icon skill dưới thanh máu
      const wasd = this.scheme === 'wasd'; // kiểu điều khiển
      [['fan', wasd ? 'K' : 'S', 1], ['dash', wasd ? 'L' : 'D', 2]].forEach(([icon, key, n], i) => { // skill 1 và 2
        const x = 44 + i * 64, y = 84, r = 26; // tâm và bán kính icon
        const img = this.add.image(x, y, `icon_${icon}`).setDisplaySize(r * 2, r * 2).setScrollFactor(0).setDepth(d); // hình icon
        const keyTxt = this.add.text(x, y + r + 9, `[${key}]`, { fontFamily: FONT, fontSize: 12, color: '#ccccee', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setScrollFactor(0).setDepth(d); // phím bấm dưới icon
        this.addCdUi(x, y, r, [img, keyTxt], n); // gắn vòng hồi chiêu
      });
    }
    this.add.rectangle(GAME_W / 2 - 150, 10, 300, 4, 0xffffff, 0.25).setOrigin(0, 0.5).setScrollFactor(0).setDepth(d); // vạch tiến độ màn
    this.progDot = this.add.circle(GAME_W / 2 - 150, 10, 6, this.lv.neon).setScrollFactor(0).setDepth(d); // chấm vị trí người chơi
  }

  updateHud(time) { // cập nhật HUD mỗi khung
    this.hudLabel.setText(`${tr('MÀN', 'STAGE')} ${this.level}  ${this.role.toUpperCase()}`); // nhãn màn và role
    const ratio = Math.max(0, this.hp) / this.maxHp; // tỉ lệ máu
    this.hpFill.width = 200 * ratio; // độ dài thanh máu
    this.hpFill.fillColor = ratio > 0.5 ? 0x44ff66 : ratio > 0.25 ? 0xffcc33 : 0xff4444; // đổi màu khi yếu máu
    this.hpNum.setText(`${Math.max(0, this.hp)}/${this.maxHp}`); // số máu
    for (const c of this.cdUi) this.drawCd(c, time); // vẽ vòng hồi chiêu của mọi nút
    this.progDot.x = GAME_W / 2 - 150 + 300 * Phaser.Math.Clamp(this.player.x / ARENA_X, 0, 1); // vị trí trên vạch tiến độ
  }

  addCdUi(x, y, r, parts, n) { // tạo lớp phủ hồi chiêu cho 1 nút (n: 0 bắn, 1 skill 5 tia, 2 skill lao)
    const g = this.add.graphics().setScrollFactor(0).setDepth(170); // lớp phủ tối hình quạt
    const txt = this.add.text(x, y, '', { fontFamily: FONT, fontSize: Math.round(r * 0.75), color: '#ffffff', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setScrollFactor(0).setDepth(171); // số giây hồi
    this.cdUi.push({ x, y, r, parts, n, g, txt }); // lưu lại để cập nhật mỗi khung
  }

  drawCd(c, time) { // vẽ hồi chiêu kiểu MOBA: quạt tối thu dần theo chiều kim đồng hồ + số giây
    const info = [[true, this.shootReadyAt, 333], [this.hasSkill1, this.skill1ReadyAt, 5000], [this.hasSkill2, this.skill2ReadyAt, 10000]][c.n]; // [đã mở, mốc hồi xong, tổng thời gian hồi]
    const [has, readyAt, total] = info; // tách dữ liệu
    for (const p of c.parts) p.setAlpha(has ? 1 : 0.3); // chưa mở thì mờ
    const left = has ? Math.max(0, readyAt - time) : 0; // thời gian hồi còn lại
    c.g.clear(); // xoá hình cũ
    if (left > 0) { // đang hồi chiêu
      const start = -Math.PI / 2; // bắt đầu từ đỉnh (12 giờ)
      c.g.fillStyle(0x000000, 0.65); // màu tối mờ
      c.g.slice(c.x, c.y, c.r, start + Math.PI * 2 * (1 - left / total), start + Math.PI * 2, false); // phần còn phải chờ
      c.g.fillPath(); // tô quạt
    }
    c.txt.setText(left > 0 && total >= 1000 ? (left < 1000 ? (left / 1000).toFixed(1) : String(Math.ceil(left / 1000))) : ''); // skill hiện số giây, nút bắn chỉ hiện quạt
  }

  createTouch() { // nút ảo cho điện thoại
    this.touch = {}; // trạng thái các nút ảo
    if (!this.sys.game.device.input.touch) return; // máy không cảm ứng thì bỏ qua
    this.input.addPointer(3); // cho phép chạm nhiều ngón cùng lúc
    const mk = (x, y, r, name, label, icon, n) => { // tạo 1 nút tròn (có icon thì vẽ icon)
      const c = this.add.circle(x, y, r, 0xffffff, icon ? 0.001 : 0.15).setStrokeStyle(icon ? 0 : 2, 0xffffff, 0.6).setScrollFactor(0).setDepth(160).setInteractive(); // vùng chạm
      const face = icon ? this.add.image(x, y, `icon_${icon}`).setDisplaySize(r * 2, r * 2) : this.add.text(x, y, label, { fontFamily: FONT, fontSize: 26, color: '#ffffff' }).setOrigin(0.5); // icon hoặc chữ
      face.setScrollFactor(0).setDepth(161); // cố định theo camera
      const base = face.scale; // cỡ gốc để nhún khi bấm
      c.on('pointerdown', () => { this.touch[name] = true; this.touch[name + 'Tap'] = true; face.setScale(base * 0.88); if (!icon) c.setFillStyle(0xffffff, 0.4); }); // chạm vào nút
      const up = () => { this.touch[name] = false; face.setScale(base); if (!icon) c.setFillStyle(0xffffff, 0.15); }; // nhả nút
      c.on('pointerup', up); // nhấc ngón
      c.on('pointerout', up); // trượt ngón ra ngoài
      if (n !== undefined) this.addCdUi(x, y, r, [face], n); // nút bắn và skill có vòng hồi chiêu
    };
    mk(75, 460, 46, 'left', '◀'); // trái: đi trái
    mk(190, 460, 46, 'right', '▶'); // trái: đi phải
    mk(860, 440, 56, 'shoot', '', 'shoot', 0); // phải: nút bắn to
    mk(735, 470, 46, 'jump', '▲'); // phải: nút nhảy cạnh nút bắn
    mk(760, 345, 38, 'skill1', '', 'fan', 1); // phải: skill 5 tia
    mk(880, 310, 38, 'skill2', '', 'dash', 2); // phải: skill lao
  }

  swapRunAnim(key) { // đổi qua lại giữa chạy và chạy bắn, giữ đúng bước chân đang chạy
    const a = this.pSprite.anims; // bộ animation của nhân vật
    if (a.currentAnim && a.currentAnim.key === key && a.isPlaying) return; // đang chạy đúng cái đó rồi
    const same = a.currentAnim && /_run(shoot)?$/.test(a.currentAnim.key) && a.currentFrame; // đang ở 1 trong 2 kiểu chạy
    this.pSprite.play({ key, startFrame: same ? a.currentFrame.index - 1 : 0 }); // nối tiếp từ khung đang có
  }

  playAnim(spr, key) { // chạy animation nếu chưa chạy
    const cur = spr.anims.currentAnim; // animation hiện tại
    if (cur && cur.key === key && (spr.anims.isPlaying || key.endsWith('_shoot'))) return; // đang chạy rồi, hoặc bắn xong thì giữ khung cuối
    spr.play(key); // chạy animation
  }

  setFrame(spr, tex) { // hiện 1 khung tĩnh
    spr.anims.stop(); // dừng animation
    spr.setTexture(tex); // đổi sang khung cần hiện
  }

  playerShoot(time) { // bắn đạn thường
    this.shootReadyAt = time + 333; // nhịp bắn 0.33 giây (3 viên/giây)
    this.shootAnimUntil = time + (V2[this.role] ? 340 : 200); // giữ tư thế bắn (bộ mới đủ 3 khung: giơ tay, chớp lửa, thu tay)
    const v2 = V2[this.role], b0 = this.player.body; // bộ vẽ của role và body nhân vật
    if (!(v2 && v2.runshoot && b0.velocity.x !== 0 && b0.blocked.down)) this.pSprite.play(`${this.role}_shoot`); // đứng bắn thì chạy lại animation bắn, còn chạy bắn thì để chân bước tiếp
    const b = this.pBullets.create(this.player.x + this.facing * 28, this.player.y - 4, 'bullet_player').setScale(0.1); // tạo viên đạn trước mặt
    b.setFlipX(this.facing < 0); // quay đạn theo hướng bắn
    b.body.setAllowGravity(false); // đạn bay thẳng
    b.setVelocityX(this.facing * 820); // tốc độ đạn (nhanh hơn)
    this.sfx('shoot', 0.25); // tiếng bắn
    this.time.delayedCall(1150, () => b.destroy()); // đạn tự biến mất sau 1.15 giây (bay xa hơn)
  }

  playerFan(time) { // skill 5 tia của Dliever
    this.skill1ReadyAt = time + 5000; // hồi chiêu 5 giây
    this.shootAnimUntil = time + 250; // giữ tư thế bắn
    this.pSprite.play(`${this.role}_shoot`); // animation bắn
    this.sfx('skill', 0.5); // tiếng dùng skill
    const flash = this.add.circle(this.player.x, this.player.y, 30, 0x66ccff, 0.8).setDepth(11); // chớp sáng xanh quanh người
    this.tweens.add({ targets: flash, scale: 2.2, alpha: 0, duration: 250, onComplete: () => flash.destroy() }); // chớp tỏa ra rồi tan
    const base = this.facing > 0 ? 0 : Math.PI; // hướng gốc theo hướng nhìn
    for (const deg of [-20, -10, 0, 10, 20]) { // 5 viên tỏa hình quạt
      const ang = base + Phaser.Math.DegToRad(deg); // góc từng viên
      const b = this.pBullets.create(this.player.x + this.facing * 28, this.player.y - 4, 'bullet_player').setScale(0.13); // viên đạn to hơn đạn thường
      b.body.setAllowGravity(false); // bay thẳng
      b.setVelocity(Math.cos(ang) * 650, Math.sin(ang) * 650); // tốc độ theo góc
      b.setRotation(ang); // xoay hình theo hướng bay
      this.time.delayedCall(900, () => b.destroy()); // tự mất sau 0.9 giây
    }
  }

  playerDash(time) { // skill lao tới của Dcoded
    this.skill2ReadyAt = time + 10000; // hồi chiêu 10 giây
    this.dashUntil = time + 260; // lao trong 0.26 giây
    this.dashId++; // cú lao mới
    this.invulUntil = Math.max(this.invulUntil, time + 400); // bất tử trong lúc lao
    this.sfx('skill', 0.5); // tiếng dùng skill
    this.setFrame(this.pSprite, `${this.role}_run_2`); // tư thế lao
  }

  addGhost() { // 1 bóng mờ vàng theo thân khi lao
    const g = this.add.image(this.pSprite.x, this.pSprite.y, this.pSprite.texture.key).setOrigin(0.5, 1).setScale(0.42).setFlipX(this.pSprite.flipX).setTintFill(0xffcc33).setAlpha(0.6).setDepth(9); // bản sao hình nhân vật
    this.tweens.add({ targets: g, alpha: 0, duration: 250, onComplete: () => g.destroy() }); // mờ dần rồi xoá
  }

  captureRole(role, color, fromX, fromY) { // cảnh chiếm role: màu boss bay vào người chơi
    for (let i = 0; i < 14; i++) { // 14 đốm màu
      const orb = this.add.circle(fromX + Phaser.Math.Between(-40, 40), fromY + Phaser.Math.Between(-60, 20), 7, color).setDepth(60); // đốm màu tại xác boss
      this.tweens.add({ targets: orb, x: this.player.x, y: this.player.y, scale: 0.3, delay: i * 70, duration: 700, ease: 'Cubic.easeIn', onComplete: () => orb.destroy() }); // bay dần vào người chơi
    }
    this.time.delayedCall(14 * 70 + 700, () => { // khi đốm cuối chạm người
      this.role = role; // đổi role (đổi bộ sprite theo màu mới)
      this.maxHp = ROLES[role].maxHp; // máu tối đa theo role mới
      this.hp = this.maxHp; // hồi đầy máu
      this.hasSkill1 = true; // có skill 5 tia
      if (role === 'dcoded') this.hasSkill2 = true; // Dcoded mở thêm skill lao
      this.canNext = true; // cho phép sang màn sau
      this.registry.set('cpX', null); // qua màn thì bỏ checkpoint
      saveNum('unlocked', Math.max(loadNum('unlocked', 1), this.level + 1)); // lưu tiến độ: mở khóa màn sau
      saveNum('role_' + (this.level + 1), 1); // đánh dấu đã có role mới
      this.sfx('role_up', 0.7); // âm lên role
      this.pSprite.setTintFill(0xffffff); // chớp trắng lúc lột xác
      this.time.delayedCall(150, () => this.pSprite.clearTint()); // tắt chớp
      this.explode(this.player.x, this.player.y, color, 30); // bùng hạt màu quanh người
      const wasd = this.scheme === 'wasd'; // kiểu điều khiển
      const skill = role === 'dliever' ? tr(`5 tia (phím ${wasd ? 'K' : 'S'})`, `5-way shot (key ${wasd ? 'K' : 'S'})`) : tr(`lao tới (phím ${wasd ? 'L' : 'D'})`, `dash (key ${wasd ? 'L' : 'D'})`); // tên skill vừa mở
      const next = LEVELS[this.level + 1] ? tr('Enter / chạm: sang màn sau   R: chơi lại', 'Enter / tap: next stage   R: replay') : tr('R: chơi lại', 'R: replay'); // hướng dẫn tiếp
      this.showCenterText(`${role.toUpperCase()}!\n${tr('Mở khóa skill', 'Skill unlocked')}: ${skill}\n${next}`, '#' + color.toString(16).padStart(6, '0'), () => this.nextLevel()); // chữ role mới, chạm để sang màn sau
    });
  }

  damagePlayer(amount, fromX) { // nhân vật trúng đòn
    if (this.dead || this.time.now < this.invulUntil || this.levelOver) return; // đang bất tử hoặc đã xong thì bỏ qua
    this.hp -= amount; // trừ máu
    this.invulUntil = this.time.now + 1000; // bất tử 1 giây
    this.knockUntil = this.time.now + 250; // khoá điều khiển 0.25 giây
    const dir = this.player.x < fromX ? -1 : 1; // đẩy ngược phía nguồn sát thương
    this.player.body.setVelocity(dir * 260, -260); // đẩy lùi và nảy lên
    this.cameras.main.shake(120, 0.006); // rung màn nhẹ
    this.sfx('hit'); // tiếng trúng đòn
    this.tweens.add({ targets: this.pSprite, alpha: 0.2, yoyo: true, repeat: 4, duration: 100, onComplete: () => this.pSprite.setAlpha(1) }); // nhấp nháy trong 1 giây
    if (this.hp <= 0) this.killPlayer(); // hết máu thì chết
  }

  fallInPit() { // rơi xuống hố
    this.hp -= 1; // mất 1 phần máu
    if (this.hp <= 0) { this.killPlayer(); return; } // hết máu thì thua
    this.player.setPosition(this.respawnX, GROUND_Y - 60); // về điểm hồi sinh
    this.player.body.setVelocity(0, 0); // đứng im
    this.invulUntil = this.time.now + 1000; // bất tử 1 giây sau khi về
  }

  killPlayer() { // nhân vật chết, thua
    this.dead = true; // đánh dấu đã chết
    this.hp = 0; // máu về 0
    this.player.body.setVelocity(0, 0); // dừng lại
    this.player.body.setAllowGravity(this.player.y < GAME_H); // rơi hố thì treo tại chỗ, còn lại thì nằm đất
    this.pSprite.setAlpha(1).play(`${this.role}_death`); // chạy animation chết
    this.music.stop(); // tắt nhạc nền
    this.sfx('lose'); // nhạc thua
    this.showCenterText(tr('THUA RỒI\nR / chạm: chơi lại từ checkpoint\nM: về menu', 'GAME OVER\nR / tap: retry from checkpoint\nM: menu'), '#ff6677', () => this.retry()); // báo thua
  }

  showCenterText(msg, color, onTap) { // hiện chữ lớn giữa màn hình, chạm được trên mobile
    const t = this.add.text(GAME_W / 2, GAME_H / 2, msg, { fontFamily: FONT_TITLE, fontSize: 32, color, align: 'center', stroke: '#000', strokeThickness: 6, lineSpacing: 6 }).setPadding(14 + 6).setShadow(0, 0, color, 14, true, true).setOrigin(0.5).setScrollFactor(0).setDepth(200); // chữ cố định theo camera
    if (onTap) t.setInteractive({ useHandCursor: true }).on('pointerdown', onTap); // chạm vào chữ để thực hiện
    return t; // trả về chữ
  }

  // ---------- QUÁI ----------

  updateEnemy(e, time) { // hành vi quái theo kiểu
    const dx = this.player.x - e.box.x; // khoảng cách ngang tới người chơi
    const dir = Math.sign(dx) || 1; // hướng tới người chơi
    const near = Math.abs(dx) < 520 && !this.dead; // người chơi ở gần và còn sống
    const body = e.box.body; // body quái
    if (e.mode !== 'charge') e.spr.setFlipX(dir < 0); // quay mặt về người chơi
    if (e.type === 'WALKER') { // quái đi bộ
      body.setVelocityX(near ? dir * 60 : 0); // tiến chậm về người chơi
      if (near && time > e.nextAt) { e.nextAt = time + 3500; this.warnFlash(e, 300, () => this.enemyShoot(e, dir, 0)); } // thỉnh thoảng nháy rồi ném đạn
    } else if (e.type === 'SHOOTER') { // quái bắn đứng yên
      body.setVelocityX(0); // đứng tại chỗ
      if (near && time > e.nextAt) { e.nextAt = time + 2200; this.warnFlash(e, 400, () => { this.enemyShoot(e, dir, 1); if (e.key === 'bot_2_2') this.enemyShoot(e, -dir, 0); }); } // nháy 0.4 giây rồi bắn nhắm người chơi
    } else if (e.type === 'CHARGER') { // quái lao
      if (e.mode === 'idle') { body.setVelocityX(0); if (Math.abs(dx) < 360 && time > e.nextAt) { e.mode = 'warn'; e.chargeDir = dir; e.spr.anims.stop(); e.spr.setTexture(`${e.key}_attack_1`); this.tweens.add({ targets: e.spr, angle: 8, yoyo: true, repeat: 5, duration: 40, onComplete: () => e.spr.setAngle(0) }); this.time.delayedCall(500, () => { if (e.state === 'alive') { e.mode = 'charge'; e.modeUntil = this.time.now + 800; } }); } } // thấy người chơi thì khựng rung 0.5 giây
      else if (e.mode === 'warn') body.setVelocityX(0); // đứng yên lúc báo trước
      else if (e.mode === 'charge') { body.setVelocityX(e.chargeDir * 420); if (time > e.modeUntil) { e.mode = 'idle'; e.nextAt = time + 1200; e.spr.play(`${e.key}_move`); } } // lao thẳng 0.8 giây rồi nghỉ
    } else if (e.type === 'FLYER') { // quái bay
      if (e.mode === 'idle') { // đang lượn
        body.setVelocityX(near ? dir * (e.key === 'bot_3_2' ? 160 : 90) : 0); // bay về phía người chơi (Deepfake bay nhanh)
        body.setVelocityY((e.baseY + Math.sin(time / 300) * 30 - e.box.y) * 4); // lượn sóng quanh độ cao gốc
        if (Math.abs(dx) < 30 && time > e.nextAt) { e.mode = 'warn'; body.setVelocity(0, 0); this.warnFlash(e, 400, () => { e.mode = 'dive'; e.spr.setTexture(`${e.key}_jump_down`); e.modeUntil = this.time.now + 700; }); } // ở trên đầu thì chớp rồi bổ nhào
      } else if (e.mode === 'warn') body.setVelocity(0, 0); // khựng lúc báo trước
      else if (e.mode === 'dive') { body.setVelocity(0, e.key === 'bot_3_2' ? 560 : 420); if (time > e.modeUntil || e.box.y > GROUND_Y - 30) { e.mode = 'rise'; e.spr.setTexture(`${e.key}_jump_up`); } } // bổ nhào xuống
      else if (e.mode === 'rise') { body.setVelocity(0, -220); if (e.box.y <= e.baseY) { e.mode = 'idle'; e.nextAt = time + 1500; e.spr.play(`${e.key}_move`); } } // bay lên lại độ cao cũ
    }
    if (e.box.y > GAME_H + 100) { e.state = 'gone'; e.box.destroy(); e.spr.destroy(); } // rơi hố thì biến mất
  }

  warnFlash(e, ms, then) { // báo trước: nháy sáng rồi ra đòn
    e.spr.setTintFill(0xffffff); // chớp trắng
    this.time.delayedCall(ms / 2, () => { if (e.state === 'alive') e.spr.clearTint(); }); // tắt chớp nửa chừng
    this.time.delayedCall(ms, () => { if (e.state === 'alive') then(); }); // hết thời gian báo trước thì ra đòn nếu còn sống
  }

  enemyShoot(e, dir, aim) { // quái bắn 1 viên đạn spam
    const b = this.eBullets.create(e.box.x, e.box.y - 10, 'bullet_spam').setScale(0.09).setTint(e.color); // tạo đạn tint màu màn
    b.body.setAllowGravity(false); // đạn bay thẳng
    const ang = aim ? Phaser.Math.Angle.Between(b.x, b.y, this.player.x, this.player.y) : (dir > 0 ? 0 : Math.PI); // có nhắm thì bắn về người chơi, không thì bắn ngang
    b.setVelocity(Math.cos(ang) * 260, Math.sin(ang) * 260); // tốc độ đạn quái
    b.setFlipX(Math.cos(ang) < 0); // quay đạn theo hướng bay
    this.time.delayedCall(2500, () => b.destroy()); // đạn tự mất sau 2.5 giây
  }

  hitEnemy(e, dmg) { // quái trúng đạn
    e.hp -= dmg; // trừ máu quái
    if (e.hp <= 0) { this.killEnemy(e); return; } // hết máu thì vào chuỗi chết
    e.spr.setTintFill(0xffffff); // chớp trắng khi trúng
    this.time.delayedCall(60, () => { if (e.state === 'alive') e.spr.clearTint(); }); // tắt chớp
  }

  killEnemy(e) { // chuỗi chết của quái
    e.state = 'dying'; // tắt va chạm với người chơi và đạn (các callback kiểm tra state)
    e.spr.anims.stop(); // dừng animation
    e.spr.setTexture(`${e.key}_death_1`).setTintFill(0xffffff); // khung ngã + chớp trắng
    this.hitStop(50); // khựng 0.05 giây
    this.sfx('enemy_fall'); // tiếng bịch khi ngã
    e.box.body.setAllowGravity(true); // quái bay cũng rơi xuống đất
    e.box.body.setVelocity(0, 0); // dừng di chuyển
    this.time.delayedCall(250, () => { e.spr.clearTint().setTexture(`${e.key}_death_2`); this.blinkRedThenExplode(e); }); // chuyển khung nằm rồi nhấp nháy đỏ
  }

  blinkRedThenExplode(e) { // nhấp nháy đỏ nhanh dần trong 1 giây rồi nổ
    const gaps = [200, 160, 130, 110, 90, 75, 65, 55, 50, 45, 40]; // khoảng nháy ngắn dần (tổng khoảng 1 giây)
    let t = 0; // mốc thời gian cộng dồn
    gaps.forEach((g, i) => { t += g; this.time.delayedCall(t, () => { if (i % 2 === 0) { e.spr.setTint(0xff3333); this.sfx('beep', 0.2); } else e.spr.clearTint(); }); }); // bật tắt màu đỏ theo từng mốc
    this.time.delayedCall(t + 30, () => { // hết nháy thì nổ
      this.explode(e.spr.x, e.spr.y - 20, e.color, 24); // nổ vụn pixel màu thân
      this.sfx('explode_small', 0.4); // tiếng nổ nhỏ
      if (Math.random() < 0.2) this.addHealth(e.spr.x, e.spr.y - 30); // 20% rơi cục máu
      e.state = 'gone'; // đánh dấu đã biến mất
      e.box.destroy(); // xoá hitbox
      e.spr.destroy(); // xoá hình vẽ
    });
  }

  explode(x, y, color, count) { // hiệu ứng nổ bằng hạt pixel
    const p = this.add.particles(x, y, 'px', { speed: { min: 80, max: 280 }, lifespan: 550, scale: { start: 1, end: 0 }, tint: [color, 0xffffff], emitting: false }).setDepth(50); // bộ phát hạt
    p.explode(count); // bắn ra một lần
    const flash = this.add.circle(x, y, 26, 0xffffff, 0.9).setDepth(51); // chớp sáng nhỏ
    this.tweens.add({ targets: flash, alpha: 0, scale: 1.8, duration: 180, onComplete: () => flash.destroy() }); // chớp tan dần
    this.time.delayedCall(700, () => p.destroy()); // dọn bộ phát hạt
  }

  hitStop(ms) { // khựng game trong chốc lát
    this.physics.world.pause(); // dừng vật lý
    this.time.delayedCall(ms, () => { if (!this.physicsFrozen && !this.paused) this.physics.world.resume(); }); // chạy lại sau ms mili giây
  }

  // ---------- BOSS DLIEVER ----------

  startBoss() { // vào phòng boss
    this.bossStarted = true; // đánh dấu đã vào
    this.cameras.main.stopFollow(); // ngừng bám nhân vật
    this.cameras.main.pan(ARENA_X + GAME_W / 2, GAME_H / 2, 600); // lia camera khoá phòng boss
    this.addBlock(ARENA_X - 20, 160, 20, GROUND_Y - 160); // đóng cửa phòng, không chạy ra được
    this.respawnX = ARENA_X + 80; // rơi hố thì về đầu phòng boss
    const huge = this.lv.boss === 'dco'; // DCO to nhất
    const [bw, bh] = { dliever: [73, 87], dcoded: [74, 88], dco: [99, 106] }[this.lv.boss]; // hitbox khớp hình boss, nhỏ hơn hình một chút
    const box = this.add.rectangle(ARENA_X + 760, GROUND_Y - bh / 2 - 2, bw, bh); // hitbox boss
    this.physics.add.existing(box); // gắn body
    this.physics.add.collider(box, this.solids); // boss đứng trên sàn
    const key = this.lv.boss; // tên boss của màn
    const spr = this.add.sprite(box.x, box.y, `${key}_idle_1`).setOrigin(0.5, 1).setScale(huge ? 0.95 : 0.75).setDepth(9); // hình vẽ boss
    spr.play(`${key}_idle`); // boss đứng thở
    this.boss = { key, box, spr, hp: this.lv.bossHp, maxHp: this.lv.bossHp, state: 'alive', step: 0 }; // dữ liệu boss
    this.bossDashHit = -1; // cú lao cuối đã trúng boss
    this.physics.add.overlap(this.pBullets, box, (bx, b) => { const bullet = bx === box ? b : bx; bullet.destroy(); this.hitBoss(1); }); // đạn trúng boss
    this.physics.add.overlap(this.player, box, () => { // chạm boss
      if (this.boss.state !== 'alive') return; // boss chết thì thôi
      if (this.time.now < this.dashUntil) { if (this.bossDashHit !== this.dashId) { this.bossDashHit = this.dashId; this.hitBoss(3); } return; } // đang lao thì gây sát thương boss
      this.damagePlayer((this.boss.dashing ? 2 : 1) + (this.boss.key === 'dco' ? 1 : 0), box.x); // boss đang lao thì đau hơn, DCO đau hơn nữa
    });
    this.bossBarBg = this.add.rectangle(GAME_W / 2, GAME_H - 28, 504, 18, 0x000000).setStrokeStyle(2, this.lv.neon).setScrollFactor(0).setDepth(100); // khung thanh máu boss
    this.bossBar = this.add.rectangle(GAME_W / 2 - 250, GAME_H - 28, 500, 12, this.lv.neon).setOrigin(0, 0.5).setScrollFactor(0).setDepth(101); // thanh máu boss
    this.add.text(GAME_W / 2, GAME_H - 52, key.toUpperCase(), { fontFamily: FONT, fontSize: 16, color: '#' + this.lv.neon.toString(16).padStart(6, '0') }).setOrigin(0.5).setScrollFactor(0).setDepth(101); // tên boss
    this.time.delayedCall(1200, () => this.bossNext()); // boss bắt đầu đánh sau 1.2 giây
  }

  updateBoss() { // cập nhật hình boss mỗi khung
    const b = this.boss; // boss
    b.spr.x = b.box.x; // hình bám x hitbox
    b.spr.y = b.box.body.bottom; // chân hình ở đáy hitbox
    if (b.state !== 'alive') return; // chết rồi thì thôi
    if (!b.dashing) b.spr.setFlipX(this.player.x < b.box.x); // quay mặt về người chơi (lúc lao thì giữ hướng)
    if (b.box.body.blocked.down && b.jumping && this.time.now > b.jumpAt + 200) { b.jumping = false; b.box.body.setVelocityX(0); } // đáp đất sau cú nhảy (bỏ qua lúc vừa bật khỏi đất)
    if (!b.acting && !b.dashing && !b.jumping && b.box.body.blocked.down) this.bossWalk(b); // giữa các đòn thì đi bộ
    this.bossBar.width = 500 * b.hp / b.maxHp; // cập nhật thanh máu boss
  }

  bossNext() { // chọn đòn tiếp theo của boss
    const b = this.boss; // boss
    if (b.state !== 'alive' || this.dead) return; // boss chết hoặc người chơi thua thì dừng
    const rage = b.hp <= b.maxHp / 2; // dưới 50% máu thì hăng hơn
    b.step++; // tăng đếm đòn
    if (b.key === 'dcoded') { this.dcodedNext(rage); return; } // boss màn 2 có bộ đòn riêng
    if (b.key === 'dco') { this.dcoNext(rage); return; } // trùm cuối có bộ đòn riêng
    if (b.step % 3 === 0) { // cứ đòn thứ 3 thì nhảy đổi phía
      const left = ARENA_X + 120, right = ARENA_X + GAME_W - 120; // 2 vị trí đứng trong phòng
      const target = b.box.x < ARENA_X + GAME_W / 2 ? right : left; // nhảy sang phía đối diện
      b.jumping = true; // đánh dấu đang nhảy
      b.jumpAt = this.time.now; // mốc bật nhảy
      b.spr.anims.stop(); // dừng animation
      b.spr.setTexture(frameKey(b.key, 'jump_up')); // khung nhảy
      b.box.body.setVelocity((target - b.box.x) / 1.0, -600); // bay khoảng 1 giây tới đích
      this.time.delayedCall(1100, () => { if (b.state === 'alive') { b.spr.play(`${b.key}_idle`); this.bossNext(); } }); // đáp xong thì đánh tiếp
      return; // xong lượt này
    }
    this.bossTelegraph(600, () => { // chớp xanh 0.6 giây báo trước
      this.bossFan(0x66bbff, 200, 1); // bắn 5 tia xanh
      if (rage) this.time.delayedCall(350, () => { if (b.state === 'alive') this.bossFan(0x66bbff, 200, 1); }); // dưới 50% bắn thêm loạt 2
      this.time.delayedCall(rage ? 800 : 1000, () => this.bossWaitClear()); // chờ đạn bay hết rồi mới đánh tiếp
    });
  }

  dcodedNext(rage) { // bộ đòn boss Dcoded: lao ngang màn xen kẽ bắn 3 viên
    const b = this.boss; // boss
    if (b.step % 2 === 1) { this.dcodedDash(rage ? 2 : 1); return; } // lượt lẻ: lao (dưới 50% lao 2 lần)
    this.bossTelegraph(500, () => { // chớp vàng báo trước 0.5 giây
      this.bossShoot3(); // bắn 3 viên vàng
      this.time.delayedCall(800, () => this.bossWaitClear()); // đợi đạn bay hết rồi đánh tiếp
    }, 0xffdd66);
  }

  dcodedDash(times, onDone) { // boss lùi lấy đà, hiện vạch đỏ rồi lao ngang màn
    const b = this.boss; // boss
    if (b.state !== 'alive' || this.dead) return; // hết trận thì thôi
    const dir = this.player.x < b.box.x ? -1 : 1; // lao về phía người chơi
    const endX = dir > 0 ? ARENA_X + GAME_W - 60 : ARENA_X + 60; // điểm dừng ở mép phòng
    b.spr.setFlipX(dir < 0); // quay mặt về hướng lao
    b.dashing = true; // giữ hướng mặt trong lúc lấy đà và lao
    b.box.body.setVelocityX(-dir * 120); // lùi lấy đà
    const lineX = Math.min(b.box.x, endX), lineW = Math.abs(endX - b.box.x); // vùng vạch đỏ
    const line = this.add.rectangle(lineX, GROUND_Y - 50, lineW, 40, 0xff2222, 0.35).setOrigin(0, 0.5).setDepth(8); // vạch đỏ chỉ đường lao
    this.tweens.add({ targets: line, alpha: 0.1, yoyo: true, repeat: 3, duration: 100 }); // vạch nhấp nháy
    this.time.delayedCall(b.fast ? 550 : 800, () => { // hết báo trước (DCO nổi điên thì báo ngắn hơn)
      line.destroy(); // xoá vạch
      if (b.state !== 'alive') return; // boss chết thì thôi
      b.spr.play(`${b.key}_run`); // chạy animation lao
      b.box.body.setVelocityX(dir * (b.fast ? 800 : 650)); // lao nhanh
      const ghostEv = this.time.addEvent({ delay: 40, loop: true, callback: () => { // để lại vệt vàng mờ
        const g = this.add.image(b.spr.x, b.spr.y, b.spr.texture.key).setOrigin(0.5, 1).setScale(b.spr.scale).setFlipX(b.spr.flipX).setTintFill(this.lv.color).setAlpha(0.5).setDepth(8); // bóng mờ boss
        this.tweens.add({ targets: g, alpha: 0, duration: 300, onComplete: () => g.destroy() }); // mờ dần
      } });
      const check = this.time.addEvent({ delay: 16, loop: true, callback: () => { // kiểm tra tới mép phòng chưa
        if (b.state === 'alive' && (dir > 0 ? b.box.x < endX : b.box.x > endX)) return; // chưa tới thì lao tiếp
        check.remove(); ghostEv.remove(); // dừng kiểm tra và vệt mờ
        b.dashing = false; // hết lao
        b.box.body.setVelocityX(0); // dừng lại
        if (b.state !== 'alive') return; // boss chết thì thôi
        b.spr.play(`${b.key}_idle`); // về đứng
        if (times > 1) this.time.delayedCall(300, () => this.dcodedDash(times - 1, onDone)); // còn lượt thì lao tiếp
        else if (onDone) onDone(); // có đòn nối tiếp (combo) thì ra ngay
        else this.time.delayedCall(900, () => this.bossNext()); // hết lượt thì nghỉ rồi đánh tiếp
      } });
    });
  }

  dcoNext(rage) { // bộ đòn DCO: xen kẽ 5 tia hồng và lao tới, lao xong bắn 5 tia ngay (combo)
    const b = this.boss; // boss
    if (rage && !b.fast) { // lần đầu xuống dưới 50% máu
      b.fast = true; // mọi đòn nhanh hơn
      this.bg.setTint(0xff3399); // nền ám hồng đậm
      this.tweens.add({ targets: this.bg, alpha: 0.55, yoyo: true, repeat: -1, duration: 280 }); // nền nhấp nháy hồng
    }
    const speed = b.fast ? 300 : 240; // tốc độ đạn
    const fanThenRest = () => { // bắn 5 tia rồi đợi đạn bay hết
      this.bossFan(0xff66cc, speed, 2); // 5 tia hồng, mỗi viên 2 sát thương
      this.time.delayedCall(800, () => this.bossWaitClear()); // đợi hết đạn rồi đánh tiếp
    };
    const dashReady = this.time.now - (b.lastDashAt || -1e9) >= 12000; // cú lao hồi 12 giây (skill lao của người chơi hồi 10 giây nên luôn kịp né)
    if (b.step % 2 === 1 && dashReady) { b.lastDashAt = this.time.now; this.dcodedDash(1, () => this.bossTelegraph(b.fast ? 250 : 350, fanThenRest, 0xff88dd)); return; } // lượt lẻ: lao rồi bắn 5 tia ngay (chớp rất ngắn)
    this.bossTelegraph(b.fast ? 400 : 600, fanThenRest, 0xff88dd); // lượt chẵn: chớp hồng rồi bắn 5 tia
  }

  bossShoot3() { // bắn 3 viên vàng nhắm người chơi
    const b = this.boss; // boss
    b.spr.anims.stop(); // dừng animation
    b.spr.setTexture(`${b.key}_shoot_2`); // tư thế bắn
    this.time.delayedCall(250, () => { if (b.state === 'alive') b.spr.play(`${b.key}_idle`); }); // bắn xong về đứng
    const dir = Phaser.Math.Angle.Between(b.box.x, b.box.y, this.player.x, this.player.y); // hướng tới người chơi
    for (const deg of [-25, 0, 25]) { // 3 viên tỏa ra
      const ang = dir + Phaser.Math.DegToRad(deg); // góc từng viên
      const bl = this.eBullets.create(b.box.x, b.box.y, 'bullet_boss').setScale(0.11).setTint(0xffcc33); // đạn vàng
      bl.body.setAllowGravity(false); // bay thẳng
      bl.setVelocity(Math.cos(ang) * 240, Math.sin(ang) * 240); // tốc độ theo góc
      bl.setRotation(ang); // xoay theo hướng bay
      this.time.delayedCall(6000, () => bl.destroy()); // tự mất
    }
    this.sfx('shoot', 0.4); // tiếng bắn
  }

  bossWaitClear() { // đợi tới khi không còn đạn boss trên màn
    if (this.boss.state !== 'alive') return; // boss chết thì thôi
    if (this.eBullets.countActive(true) > 0) { this.time.delayedCall(200, () => this.bossWaitClear()); return; } // còn đạn thì kiểm tra lại sau 0.2 giây
    this.time.delayedCall(400, () => this.bossNext()); // hết đạn thì nghỉ chút rồi đánh tiếp
  }

  bossWalk(b) { // boss đi bộ giữa các đòn, mỗi con một kiểu
    const dx = this.player.x - b.box.x, dist = Math.abs(dx), dir = Math.sign(dx) || 1; // khoảng cách và hướng tới người chơi
    let v = 0; // tốc độ đi
    if (b.key === 'dliever') v = dist < 300 ? -dir * 90 : dist > 520 ? dir * 70 : 0; // Dliever bắn xa: giữ khoảng cách 300-520
    else if (dist > 110) v = dir * (b.key === 'dco' ? (b.fast ? 130 : 80) : 90); // Dcoded, DCO: áp sát người chơi, DCO nổi điên đi nhanh hơn
    const nx = b.box.x + v * 0.15; // vị trí sắp tới
    if (nx < ARENA_X + 70 || nx > ARENA_X + GAME_W - 70) v = 0; // không ra khỏi phòng boss
    b.box.body.setVelocityX(v); // đi
    if (v !== 0) this.playAnim(b.spr, `${b.key}_run`); // đang đi thì chạy animation bước
    else this.playAnim(b.spr, `${b.key}_idle`); // đứng thì thở
  }

  bossTelegraph(ms, then, color = 0x88ddff) { // boss chớp màu báo trước đòn
    const b = this.boss; // boss
    b.acting = true; // đang ra đòn: đứng yên, không đi bộ
    b.box.body.setVelocityX(0); // dừng lại để báo trước
    this.playAnim(b.spr, `${b.key}_idle`); // thôi bước, đứng lại
    this.time.addEvent({ delay: 100, repeat: Math.floor(ms / 100) - 1, callback: () => { if (b.state !== 'alive') return; if (b.spr.isTinted) b.spr.clearTint(); else b.spr.setTintFill(color); } }); // bật tắt chớp màu
    this.time.delayedCall(ms, () => { if (b.state !== 'alive') return; b.spr.clearTint(); then(); this.time.delayedCall(350, () => { b.acting = false; }); }); // hết báo trước thì ra đòn, xong đòn mới được đi tiếp
  }

  bossFan(tint, speed, dmg) { // bắn 5 tia hình quạt về phía người chơi
    const b = this.boss; // boss
    b.spr.anims.stop(); // dừng animation
    b.spr.setTexture(`${b.key}_shoot_2`); // tư thế bắn
    this.time.delayedCall(250, () => { if (b.state === 'alive') b.spr.play(`${b.key}_idle`); }); // bắn xong về đứng
    const dir = Phaser.Math.Angle.Between(b.box.x, b.box.y + 20, this.player.x, this.player.y); // hướng gốc nhắm thẳng người chơi
    for (const deg of [-40, -20, 0, 20, 40]) { // 5 góc tỏa quạt rộng, có khe giữa các tia để né
      const ang = dir + Phaser.Math.DegToRad(deg); // góc bắn từng tia
      const bl = this.eBullets.create(b.box.x, b.box.y + 20, 'bullet_boss').setScale(0.1).setTint(tint); // đạn boss tint theo màu boss
      bl.dmg = dmg; // sát thương của viên đạn
      bl.body.setAllowGravity(false); // bay thẳng
      bl.setVelocity(Math.cos(ang) * speed, Math.sin(ang) * speed); // tốc độ theo góc
      bl.setRotation(ang); // xoay hình theo hướng bay
      this.time.delayedCall(6000, () => bl.destroy()); // tự mất sau 6 giây (đủ bay hết màn)
    }
  }

  hitBoss(dmg) { // boss trúng đạn
    const b = this.boss; // boss
    if (b.state !== 'alive') return; // chết rồi thì bỏ qua
    b.hp -= dmg; // trừ máu
    this.bossBar.width = 500 * Math.max(0, b.hp) / b.maxHp; // cập nhật thanh máu
    if (b.hp <= 0) { this.killBoss(); return; } // hết máu thì vào chuỗi chết boss
    b.spr.setTintFill(0xffffff); // chớp trắng
    this.time.delayedCall(50, () => { if (b.state === 'alive') b.spr.clearTint(); }); // tắt chớp
  }

  killBoss() { // chuỗi chết của boss
    const b = this.boss; // boss
    b.state = 'dying'; // tắt va chạm và dừng đánh
    this.levelOver = true; // người chơi không còn bị đánh
    this.eBullets.clear(true, true); // xoá hết đạn địch trên màn
    b.box.body.setVelocity(0, 0); // boss dừng
    b.dashing = false; // hết lao
    this.physicsFrozen = true; // giữ vật lý đứng yên trong lúc khựng
    this.physics.world.pause(); // khựng 0.2 giây
    this.cameras.main.shake(900, 0.012); // rung màn hình
    this.tweens.timeScale = 0.5; // làm chậm chuyển động (slow motion)
    this.time.delayedCall(200, () => { this.physicsFrozen = false; this.physics.world.resume(); }); // hết khựng
    b.spr.anims.stop(); // dừng animation
    b.spr.setTexture(frameKey(b.key, 'death_1')); // khung ngã
    this.music.stop(); // tắt nhạc nền
    this.sfx('boss_down', 0.7); // tiếng rè điện khi boss ngã
    for (let i = 0; i < 12; i++) this.time.delayedCall(600 + i * 150, () => this.sfx('beep', 0.25)); // beep dồn dập trước khi nổ
    this.time.delayedCall(500, () => { // nằm xuống
      b.spr.setTexture(frameKey(b.key, 'death_2')); // khung nằm
      this.tweens.timeScale = 1; // hết slow motion
      this.time.addEvent({ delay: 70, repeat: 26, callback: () => { if (b.spr.isTinted) b.spr.clearTint(); else b.spr.setTintFill(0xffffff); } }); // nhấp nháy dồn dập khoảng 2 giây
    });
    this.tweens.killTweensOf(this.bg); // dừng nền nhấp nháy
    this.bg.setAlpha(1); // trả độ sáng nền
    const nBoom = b.key === 'dco' ? 9 : 5; // DCO nổ nhiều hơn
    for (let i = 0; i < nBoom; i++) this.time.delayedCall(2500 + i * 220, () => { this.explode(b.box.x + Phaser.Math.Between(-40, 40), b.box.y + Phaser.Math.Between(-50, 30), this.lv.color, b.key === 'dco' ? 70 : 40); this.cameras.main.shake(150, b.key === 'dco' ? 0.02 : 0.01); this.sfx('explode_big', 0.6); }); // nổ liên hoàn 5 phát khắp thân
    this.time.delayedCall(3700, () => { // phát cuối
      b.spr.destroy(); // boss biến mất
      this.cameras.main.flash(500, 255, 255, 255); // chớp trắng cả màn
      this.sfx('win', 0.6); // âm thanh thắng
      if (this.registry.get('musicOn')) this.time.delayedCall(1500, () => this.sound.play('music_win', { volume: 0.4 * musicVol() })); // nhạc thắng sau jingle
      this.bossBar.width = 0; // thanh máu về 0
    });
    if (b.key === 'dco') { this.time.delayedCall(4700, () => this.finalWin()); return; } // trùm cuối: sang màn chiến thắng
    this.time.delayedCall(4300, () => this.captureRole(b.key, this.lv.color, b.box.x, b.box.y)); // cảnh chiếm role của boss
  }

  finalWin() { // hạ DCO: mờ dần sang màn chiến thắng
    saveNum('unlocked', 3); // giữ tiến độ đã mở hết
    saveNum('won', 1); // đánh dấu đã phá đảo
    this.registry.set('cpX', null); // bỏ checkpoint
    this.cameras.main.fadeOut(1500, 255, 255, 255); // mờ dần sang trắng
    this.cameras.main.once('camerafadeoutcomplete', () => { this.sound.stopAll(); this.scene.start('Win'); }); // xong thì mở màn chiến thắng
  }
}

let LANG = (() => { try { return localStorage.getItem('lang') === 'en' ? 'en' : 'vi'; } catch (e) { return 'vi'; } })(); // ngôn ngữ đang dùng, đọc từ trình duyệt

function tr(vi, en) { return LANG === 'en' ? en : vi; } // chọn chữ theo ngôn ngữ

function musicVol() { const v = game.registry.get('musicVol'); return v !== undefined ? v : loadNum('musicVol', 100) / 100; } // âm lượng nhạc 0-1 (mặc định 100%)

function sfxVol() { const v = game.registry.get('sfxVol'); return v !== undefined ? v : loadNum('sfxVol', 100) / 100; } // âm lượng hiệu ứng 0-1 (mặc định 100%)

function loadFlag(name) { // đọc cài đặt bật/tắt từ trình duyệt, mặc định bật
  try { return localStorage.getItem(name) !== '0'; } catch (e) { return true; } // lỗi bộ nhớ thì coi như bật
}

function saveFlag(name, on) { // lưu cài đặt bật/tắt vào trình duyệt
  try { localStorage.setItem(name, on ? '1' : '0'); } catch (e) { /* lỗi bộ nhớ thì bỏ qua, game vẫn chạy */ } // bọc try/catch theo thiết kế
}

function loadNum(name, def) { // đọc số đã lưu trong trình duyệt
  try { const v = parseInt(localStorage.getItem(name), 10); return isNaN(v) ? def : v; } catch (e) { return def; } // lỗi thì dùng mặc định
}

function saveNum(name, v) { // lưu số vào trình duyệt
  try { localStorage.setItem(name, String(v)); } catch (e) { /* lỗi bộ nhớ thì bỏ qua */ } // bọc try/catch
}

class MenuScene extends Phaser.Scene { // màn tiêu đề: chọn điều khiển + chọn màn
  constructor() { super('Menu'); } // đặt tên cảnh là Menu

  create() { // dựng menu
    this.sound.stopAll(); // tắt âm thanh còn sót
    let scheme = this.registry.get('scheme') || (loadNum('scheme', 1) === 2 ? 'wasd' : 'arrows'); // kiểu điều khiển đã lưu
    this.registry.set('scheme', scheme); // dùng chung cho các cảnh
    const unlocked = Phaser.Math.Clamp(loadNum('unlocked', 1), 1, 3); // số màn đã mở khóa
    this.add.text(GAME_W / 2, 60, 'Dlicom: Journey to DCO', { fontFamily: FONT_TITLE, fontSize: 40, color: '#88ccff', stroke: '#000', strokeThickness: 6 }).setPadding(18 + 6).setShadow(0, 0, '#3399ff', 18, true, true).setOrigin(0.5); // tên game
    this.add.text(GAME_W / 2, 105, tr('Từ Verified tay trắng, leo từng role lên tới DCO', 'Start as Verified, climb every role up to DCO'), { fontFamily: FONT, fontSize: 16, color: '#aaaacc' }).setOrigin(0.5); // mô tả ngắn
    this.add.text(GAME_W / 2, 150, tr('Điều khiển (phím C để đổi)', 'Controls (press C to switch)'), { fontFamily: FONT, fontSize: 18, color: '#ffffff' }).setOrigin(0.5); // tiêu đề chọn điều khiển
    const style = { fontFamily: FONT, fontSize: 16, color: '#ffffff', align: 'center', backgroundColor: '#12122a', padding: { x: 14, y: 10 } }; // kiểu nút
    const schemeBtns = [['arrows', tr('Mũi tên\n← → đi  ↑ nhảy\nA bắn  S D skill', 'Arrow keys\n← → move  ↑ jump\nA shoot  S D skill')], ['wasd', tr('Kiểu FPS\nA D đi  W nhảy\nJ bắn  K L skill', 'FPS style\nA D move  W jump\nJ shoot  K L skill')]].map(([sc, label], i) => { // 2 nút điều khiển
      const b = this.add.text(GAME_W / 2 + (i === 0 ? -150 : 150), 215, label, style).setOrigin(0.5).setInteractive({ useHandCursor: true }); // nút
      b.on('pointerdown', () => setScheme(sc)); // bấm thì chọn
      return [sc, b]; // lưu để tô màu
    });
    const setScheme = (sc) => { // chọn kiểu điều khiển
      scheme = sc; // nhớ lựa chọn
      this.registry.set('scheme', sc); // dùng chung
      saveNum('scheme', sc === 'wasd' ? 2 : 1); // lưu vào trình duyệt
      for (const [k, b] of schemeBtns) b.setBackgroundColor(k === sc ? '#2a4a8a' : '#12122a'); // tô nút đang chọn
    };
    setScheme(scheme); // tô lần đầu
    this.add.text(GAME_W / 2, 300, tr('Chọn màn (phím 1 2 3)', 'Select stage (keys 1 2 3)'), { fontFamily: FONT, fontSize: 18, color: '#ffffff' }).setOrigin(0.5); // tiêu đề chọn màn
    const info = [[tr('Màn 1', 'Stage 1'), 'Boss Dliever', '#3399ff'], [tr('Màn 2', 'Stage 2'), 'Boss Dcoded', '#ffcc33'], [tr('Màn 3', 'Stage 3'), 'Boss DCO', '#ff44cc']]; // thông tin 3 màn
    info.forEach(([name, boss, color], i) => { // vẽ 3 nút màn
      const open = i + 1 <= unlocked; // đã mở khóa chưa
      const b = this.add.text(GAME_W / 2 + (i - 1) * 220, 370, open ? `${name}\n${boss}` : `${name}\n${tr('KHÓA', 'LOCKED')}`, { ...style, fontSize: 20, color: open ? color : '#555566' }).setOrigin(0.5); // nút màn
      if (open) { b.setInteractive({ useHandCursor: true }); b.on('pointerdown', () => this.startLevel(i + 1)); } // mở rồi thì bấm được
    });
    if (unlocked > 1) this.add.text(GAME_W / 2, 425, tr(`Tiến độ đã lưu: mở tới màn ${unlocked}`, `Progress saved: stage ${unlocked} unlocked`), { fontFamily: FONT, fontSize: 14, color: '#88ff99' }).setOrigin(0.5); // báo có tiến độ lưu
    this.add.text(GAME_W / 2, 505, tr('Âm thanh: Kenney.nl (CC0), nhạc: Juhani Junkala (CC0)', 'SFX: Kenney.nl (CC0), music: Juhani Junkala (CC0)'), { fontFamily: FONT, fontSize: 13, color: '#666688' }).setOrigin(0.5); // credit âm thanh
    this.input.keyboard.on('keydown-ONE', () => this.startLevel(1)); // phím 1 vào màn 1
    this.input.keyboard.on('keydown-TWO', () => { if (unlocked >= 2) this.startLevel(2); }); // phím 2 vào màn 2 nếu đã mở
    this.input.keyboard.on('keydown-THREE', () => { if (unlocked >= 3) this.startLevel(3); }); // phím 3 vào màn 3 nếu đã mở
    this.input.keyboard.on('keydown-C', () => setScheme(scheme === 'wasd' ? 'arrows' : 'wasd')); // phím C đổi điều khiển
    const langBtn = this.add.text(GAME_W - 16, 14, LANG === 'en' ? '[ EN ] / VI' : '[ VI ] / EN', { fontFamily: FONT, fontSize: 18, color: '#ffffff', backgroundColor: '#2a4a8a', padding: { x: 10, y: 6 } }).setOrigin(1, 0).setInteractive({ useHandCursor: true }); // nút đổi ngôn ngữ góc phải
    const toggleLang = () => { LANG = LANG === 'en' ? 'vi' : 'en'; try { localStorage.setItem('lang', LANG); } catch (e) { /* lỗi bộ nhớ thì bỏ qua */ } this.scene.restart(); }; // đổi ngôn ngữ, lưu lại, vẽ lại menu
    langBtn.on('pointerdown', toggleLang); // bấm nút thì đổi
    this.input.keyboard.on('keydown-L', toggleLang); // phím L đổi ngôn ngữ
    this.add.text(GAME_W - 16, 50, tr('Ngôn ngữ (L)', 'Language (L)'), { fontFamily: FONT, fontSize: 12, color: '#8888aa' }).setOrigin(1, 0); // chú thích dưới nút
  }

  startLevel(n) { // vào màn n
    this.registry.set('level', n); // màn cần chơi
    this.registry.set('cpX', null); // bắt đầu từ đầu màn
    this.scene.start('Game'); // mở cảnh chơi
  }
}

class WinScene extends Phaser.Scene { // màn chiến thắng cuối game
  constructor() { super('Win'); } // đặt tên cảnh là Win

  create() { // dựng màn thắng
    this.cameras.main.fadeIn(800, 255, 255, 255); // hiện dần từ trắng
    if (this.registry.get('musicOn')) this.sound.play('music_win', { volume: 0.5 * musicVol() }); // nhạc thắng
    this.add.text(GAME_W / 2, 70, tr('BẠN ĐÃ LÊN ROLE DCO!', 'YOU REACHED THE DCO ROLE!'), { fontFamily: FONT_TITLE, fontSize: 34, color: '#ff66cc', stroke: '#000', strokeThickness: 6 }).setPadding(18 + 6).setShadow(0, 0, '#ff44cc', 18, true, true).setOrigin(0.5); // chữ chiến thắng
    this.add.text(GAME_W / 2, 115, 'Verified → Dliever → Dcoded → DCO', { fontFamily: FONT, fontSize: 18, color: '#ffffff' }).setOrigin(0.5); // hành trình
    const spr = this.add.sprite(GAME_W / 2, 330, 'dco_idle_1').setOrigin(0.5, 1).setScale(0.9); // DCO đứng giữa màn
    spr.play('dco_idle'); // DCO thở
    this.add.particles(GAME_W / 2, 0, 'px', { x: { min: -480, max: 480 }, speedY: { min: 60, max: 160 }, lifespan: 4000, tint: [0xff44cc, 0x3399ff, 0xffcc33], frequency: 60 }); // mưa pháo giấy 3 màu
    this.add.text(GAME_W / 2, 400, tr('Credit\nGame: làm cho Dlicom AI Game Jam\nSFX: Kenney.nl (CC0)\nNhạc: Juhani Junkala - 5 Action Chiptunes (CC0)', 'Credits\nGame: made for the Dlicom AI Game Jam\nSFX: Kenney.nl (CC0)\nMusic: Juhani Junkala - 5 Action Chiptunes (CC0)'), { fontFamily: FONT, fontSize: 15, color: '#aaaacc', align: 'center' }).setOrigin(0.5); // credit
    this.add.text(GAME_W / 2, 505, tr('Enter / chạm: về menu', 'Enter / tap: back to menu'), { fontFamily: FONT, fontSize: 18, color: '#ffffff' }).setOrigin(0.5); // hướng dẫn
    const back = () => { this.sound.stopAll(); this.scene.start('Menu'); }; // về menu
    this.input.keyboard.once('keydown-ENTER', back); // Enter về menu
    this.time.delayedCall(800, () => this.input.once('pointerdown', back)); // chạm về menu (chờ chút để khỏi bấm nhầm)
  }
}

const fontsReady = document.fonts ? Promise.race([Promise.all(['16px "Chakra Petch"', '700 16px "Chakra Petch"', '16px "Bungee"'].map(f => document.fonts.load(f))), new Promise(r => setTimeout(r, 3000))]) : Promise.resolve(); // đợi phông tối đa 3 giây
fontsReady.catch(() => {}).then(() => { window.game = new Phaser.Game({ // khởi tạo game sau khi có phông
  type: Phaser.AUTO, // tự chọn WebGL hoặc Canvas
  parent: 'game', // gắn vào thẻ div#game
  width: GAME_W, // chiều rộng logic
  height: GAME_H, // chiều cao logic
  backgroundColor: '#05050c', // màu nền
  pixelArt: true, // giữ nét pixel khi phóng to thu nhỏ
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }, // co giãn vừa màn hình, căn giữa
  physics: { default: 'arcade', arcade: { gravity: { y: GRAVITY }, debug: false } }, // vật lý arcade có trọng lực
  scene: [MenuScene, GameScene, WinScene], // menu, cảnh chơi, màn chiến thắng
}); });
