/* =============================================
   LANGUAGE STATE
   Reads saved preference from localStorage, defaults to Chinese.
============================================== */
let currentLang = localStorage.getItem('roadtrip-lang') || 'zh';

/* =============================================
   UI STRING TRANSLATIONS
   Keys used by buildMetaTable and buildContentGrid.
============================================== */
const ui = {
  zh: {
    driveLabel:   '開車時間',
    driveNote:    '（不含停留）',
    stayLabel:    '過夜城市',
    themeLabel:   '今日主題',
    mapsLink:     'Google Maps 路線 →',
    morningH:     'Morning & Drive',
    foodH:        'Food & Drinks',
    attractionsH: 'Main Attractions',
    notesH:       'Notes',
    expand:       '展開行程',
    collapse:     '收合行程',
  },
  en: {
    driveLabel:   'Drive Time',
    driveNote:    ' (excl. stops)',
    stayLabel:    'Overnight',
    themeLabel:   'Theme',
    mapsLink:     'Google Maps Route →',
    morningH:     'Morning & Drive',
    foodH:        'Food & Drinks',
    attractionsH: 'Main Attractions',
    notesH:       'Notes',
    expand:       'Expand day',
    collapse:     'Collapse day',
  }
};

/* =============================================
   TRIP DATA — bilingual
   Each day has zh/en fields for dynamic content.
   Static location names (route, stay) stay in English.
============================================== */
const tripData = [
  {
    day: 1,
    title:        "McKinney to Amarillo",
    subtitle:     "峽谷落日之路",
    subtitle_en:  "Canyon Sunset Drive",
    route: ["McKinney", "Wichita Falls", "Caprock Canyons", "Amarillo", "Palo Duro Canyon"],
    driveTime:    "約 5.5 小時",
    driveTime_en: "~5.5 hrs",
    stay: "Amarillo, TX",
    theme:    "長途駕駛 + 峽谷日落",
    theme_en: "Long drive + canyon sunset",
    mapsUrl: "https://maps.app.goo.gl/V18HYFjHC1ScH2Fk9",
    photos: { header: "Day1-1.JPG", gallery: ["Day1-4.JPG", "Day1-2.JPG"] },
    stops: [
      "McKinney Tao — 吃飽飽早餐",
      "Wichita Falls — 科博館舒服尿尿點",
      "Caprock Canyons — 峽谷景點",
      "Childress — 加油 / 休息",
      "Amarillo — 飯店 Check-in",
      "Palo Duro Canyon — 日落觀景"
    ],
    stops_en: [
      "McKinney Tao — hearty breakfast before the road",
      "Wichita Falls — museum rest stop",
      "Caprock Canyons — canyon scenery",
      "Childress — gas & rest",
      "Amarillo — hotel check-in",
      "Palo Duro Canyon — sunset viewpoint"
    ],
    attractions: [
      "Caprock Canyons State Park（峽谷景觀到處都可以爬 + 野牛）",
      "Cadillac Ranch（沙漠凱迪拉克排排站 拍照點）",
      "Palo Duro Canyon State Park（德州大峽谷看日落）",
      "Route 66 Historic District"
    ],
    attractions_en: [
      "Caprock Canyons State Park — hike the canyon, spot bison",
      "Cadillac Ranch — iconic art installation in the desert",
      "Palo Duro Canyon State Park — Texas's Grand Canyon, great for sunset",
      "Route 66 Historic District"
    ],
    food: [
      "早餐：McKinney Tao 或附近咖啡店",
      "晚餐：Big Texan Steak Ranch 很德州風味ㄉ牛排館，建議先訂位"
    ],
    food_en: [
      "Breakfast: McKinney Tao or nearby café",
      "Dinner: Big Texan Steak Ranch — quintessential Texas steakhouse, reserve ahead"
    ],
    notes: [
      "建議從 McKinney 出發：早上 8:00",
      "下午 6:15–6:30 出發前往 Palo Duro Canyon 看日落",
      "記得攜帶水、防曬乳、帽子",
      "天氣炎熱，離開車子要帶水"
    ],
    notes_en: [
      "Depart McKinney by 8:00 AM",
      "Head to Palo Duro Canyon around 6:15–6:30 PM for sunset",
      "Bring water, sunscreen, and a hat",
      "It's hot — always carry water when leaving the car"
    ]
  },
  {
    day: 2,
    title:        "Amarillo to Colorado Springs",
    subtitle:     "火山地形 · 進入科羅拉多",
    subtitle_en:  "Volcanic Landscape · Into Colorado",
    route: ["Amarillo", "Clayton, NM", "Capulin Volcano", "Raton, NM", "Colorado Springs"],
    driveTime:    "約 6.5–7.5 小時",
    driveTime_en: "~6.5–7.5 hrs",
    stay: "Colorado Springs, CO",
    theme:    "火山景點 + 跨州進入科羅拉多",
    theme_en: "Volcano monument + crossing into Colorado",
    mapsUrl: "https://maps.app.goo.gl/kC7pzXVehb2NdrKPA",
    photos: { header: "Day2-1.JPG", gallery: ["Day2-2.JPG", "Day2-3.JPG"] },
    stops: [
      "Palace Coffee Company — 抹茶拿鐵＋濃縮好好喝",
      "Sí, Señor Tacos — 剛進到 New Mexico的粗暴 taco",
      "Capulin Volcano National Monument — 火山很漂亮壯觀，可以爬loop trail",
      "Raton — 休息 / 加油",
      "Colorado Springs — 下午抵達，溫泉小鎮 Manitou Springs 可以逛逛"
    ],
    stops_en: [
      "Palace Coffee Company — great matcha latte & espresso",
      "Sí, Señor Tacos — bold New Mexico tacos (two people share one breakfast burrito)",
      "Capulin Volcano National Monument — stunning volcano, hike the loop trail",
      "Raton — rest & gas",
      "Colorado Springs — arrive afternoon; stroll Manitou Springs"
    ],
    attractions: [
      "Capulin Volcano National Monument（火山國家紀念地）",
      "Raton Pass（科羅拉多州入境山口）",
      "Trinidad 短暫停留（可選）"
    ],
    attractions_en: [
      "Capulin Volcano National Monument",
      "Raton Pass — the Colorado state line crossing",
      "Trinidad — optional short stop"
    ],
    food: [
      "午餐：Sí, Señor Tacos",
      "晚餐：Shin Sa Dong Korean Restaurant（韓式泡菜鍋/石鍋拌飯，Colorado Springs 市區）"
    ],
    food_en: [
      "Lunch: Sí, Señor Tacos",
      "Dinner: Shin Sa Dong — excellent Korean hotpot & bibimbap, Colorado Springs"
    ],
    notes: [
      "建議從 Amarillo 出發：早上 7:30–8:00",
      "Capulin Volcano 的山頂道路有開放時間限制，不要太晚抵達",
      "今天開車行程有點硬，晚上可以吃飽好好休息"
    ],
    notes_en: [
      "Depart Amarillo by 7:30–8:00 AM",
      "The summit road at Capulin has timed access — don't arrive too late",
      "Heavy driving day — treat yourself to a good dinner and rest early"
    ]
  },
  {
    day: 3,
    title:        "Colorado Springs to Denver",
    subtitle:     "Pikes Peak · 前往Denver",
    subtitle_en:  "Pikes Peak · Into Denver",
    route: ["Colorado Springs", "Garden of the Gods", "Pikes Peak", "Denver"],
    driveTime:    "約 4–5 小時",
    driveTime_en: "~4–5 hrs",
    stay: "Denver, CO",
    theme:    "紅岩地形 + 高山風光",
    theme_en: "Red rock geology + alpine scenery",
    mapsUrl: "https://maps.app.goo.gl/q4ZWtAkWtsWsk6g97",
    photos: { header: "Day3-1.JPG", gallery: ["Day3-2.JPG", "Day3-3.png"] },
    stops: [
      "Garden of the Gods — 上午觀景健行",
      "Pikes Peak — 高山風光 ＆ 山路",
      "Denver — 下午 / 傍晚抵達"
    ],
    stops_en: [
      "Garden of the Gods — morning hike & scenic views",
      "Pikes Peak — alpine drive or cog railway",
      "Denver — arrive afternoon / early evening"
    ],
    attractions: [
      "Garden of the Gods（眾神花園）",
      "Pikes Peak（很值得上山，可開車或搭觀光列車）"
    ],
    attractions_en: [
      "Garden of the Gods — dramatic red sandstone formations",
      "Pikes Peak — drive or take the cog railway to 14,115 ft"
    ],
    food: [
      "早午餐 / 午餐：Omelette Parlor（很好吃很大份的歐姆蛋，可愛小店）",
      "晚餐：Aloy Modern Thai / The Cherry Cricket 漢堡",
      "點心：Milk Tea People / Izzio Bakery（可買可頌當隔天早餐）"
    ],
    food_en: [
      "Brunch / Lunch: Omelette Parlor — generous, delicious omelettes",
      "Dinner: Aloy Modern Thai or The Cherry Cricket for burgers",
      "Snacks: Milk Tea People / Izzio Bakery — grab croissants for tomorrow's breakfast"
    ],
    notes: [
      "Garden of the Gods 早晨光線最美，建議早點出發",
      "Pikes Peak 海拔 14,115 ft，疲憊的話可以搭觀光列車",
      "吃飽多喝水，高度適應需要時間"
    ],
    notes_en: [
      "Garden of the Gods is most beautiful in morning light — start early",
      "Pikes Peak is 14,115 ft; take the cog railway if feeling tired",
      "Drink plenty of water — altitude acclimatization takes time"
    ]
  },
  {
    day: 4,
    title:        "Denver · White River National Forest",
    subtitle:     "丹佛山區一日遊",
    subtitle_en:  "Denver Mountain Day Trip",
    route: ["Denver", "Red Rocks Amphitheatre", "White River National Forest", "Frisco, CO", "Denver"],
    driveTime:    "約 6–7 小時（視停留）",
    driveTime_en: "~6–7 hrs (depending on stops)",
    stay: "Denver, CO",
    theme:    "丹佛周邊山區探索",
    theme_en: "Mountain exploration around Denver",
    mapsUrl: "https://maps.app.goo.gl/bR17QURiDeF8gMkXA",
    photos: { header: "Day4-1.JPG", gallery: ["Day4-3.JPG", "Day4-2.JPG"] },
    stops: [
      "U.S. Mint at Denver — 鑄幣局博物館",
      "Red Rocks Amphitheatre — 自然山壁演唱會場館",
      "Penny Hot Springs — 野泉泡腳",
      "Frisco, CO 小鎮 — 晚餐推薦印度菜 India's Spice"
    ],
    stops_en: [
      "U.S. Mint at Denver — free museum tour",
      "Red Rocks Amphitheatre — iconic natural concert venue",
      "Penny Hot Springs — soak your feet (or go all in)",
      "Frisco, CO — dinner at India's Spice restaurant"
    ],
    attractions: [
      "U.S. Mint at Denver — 鑄幣局博物館",
      "Red Rocks Amphitheatre — 自然山壁演唱會場館",
      "Penny Hot Springs — 白河野泉"
    ],
    attractions_en: [
      "U.S. Mint at Denver — see how coins are made",
      "Red Rocks Amphitheatre — breathtaking natural sandstone concert venue",
      "Penny Hot Springs — natural hot springs on the White River"
    ],
    food: [
      "早餐 / 咖啡：Denver 市區",
      "晚餐：Frisco, CO — India's Spice 印度菜"
    ],
    food_en: [
      "Breakfast / Coffee: Denver downtown",
      "Dinner: Frisco, CO — India's Spice restaurant"
    ],
    notes: [
      "今天偏彈性的一天，行程可依體力調整",
      "Penny Hot Springs 比較遠，但沿途山區景點很推薦",
      "有往山上開建議早點回程，避免開夜間山路"
    ],
    notes_en: [
      "Flexible day — adjust based on energy",
      "Penny Hot Springs is a longer drive, but the scenery is worth it",
      "If driving into the mountains, return before dark — mountain roads at night can be tricky"
    ]
  },
  {
    day: 5,
    title:        "Denver to Wichita",
    subtitle:     "橫越堪薩斯 · 回程嚕",
    subtitle_en:  "Across Kansas · Heading Home",
    route: ["Denver", "Limon, CO", "Hays, KS", "Wichita, KS"],
    driveTime:    "約 7–8 小時",
    driveTime_en: "~7–8 hrs",
    stay: "Wichita, KS",
    theme:    "堪薩斯大平原駕駛日",
    theme_en: "Kansas plains driving day",
    mapsUrl: "https://maps.app.goo.gl/2QFCGeQ6eZ6SBQG5A",
    photos: { header: "Day5-2.JPG", gallery: ["Day5-1.JPG", "Day5-5.jpg"] },
    stops: [
      "Bennett — 買麥當勞早餐",
      "Limon — 咖啡 / 加油",
      "Hays — 午餐休息",
      "Salina — 短暫休息",
      "Wichita — 晚餐 + 飯店"
    ],
    stops_en: [
      "Bennett — McDonald's breakfast run",
      "Limon — coffee & gas",
      "Hays — lunch break",
      "Salina — quick rest",
      "Wichita — dinner + hotel"
    ],
    attractions: [
      "Keeper of the Plains（威奇托地標雕像）",
      "Old Town Wichita（老城區）",
      "Wichita-Sedgwick County Historical Museum（可選）"
    ],
    attractions_en: [
      "Keeper of the Plains — Wichita's landmark sculpture",
      "Old Town Wichita — historic district with restaurants & bars",
      "Wichita-Sedgwick County Historical Museum — optional"
    ],
    food: [
      "午餐：Hays 市區",
      "晚餐：Wichita Old Town 區域"
    ],
    food_en: [
      "Lunch: downtown Hays",
      "Dinner: Wichita Old Town district"
    ],
    notes: [
      "今天主要是駕駛日，景點不多",
      "盡量在天黑前抵達 Wichita",
      "不要安排太多繞路，保留體力",
      "計劃大約每小時一個停靠點，堪薩斯平原風景容易讓人疲勞"
    ],
    notes_en: [
      "Primarily a driving day — fewer stops",
      "Aim to reach Wichita before dark",
      "Don't over-schedule detours — save energy for Day 6",
      "Plan roughly one rest stop per hour; flat Kansas scenery can be monotonous"
    ]
  },
  {
    day: 6,
    title:        "Wichita to McKinney",
    subtitle:     "奧克拉荷馬 · 回家之路",
    subtitle_en:  "Oklahoma · The Road Home",
    route: ["Wichita, KS", "Ponca City, OK", "Oklahoma City, OK", "McKinney, TX"],
    driveTime:    "約 6–7 小時",
    driveTime_en: "~6–7 hrs",
    stay:    "回到家",
    stay_en: "Home",
    theme:    "歷史停留 + 返家",
    theme_en: "History stop + homecoming",
    mapsUrl: "https://maps.app.goo.gl/QJ7ycjRNvfS18dXs5",
    photos: { header: "Day6-1.JPG", gallery: ["Day6-3.JPG", "Day6-2.JPG"] },
    stops: [
      "Ponca City — 可選停留加油",
      "Oklahoma City — 午餐 + 參觀聯邦大樓爆炸案紀念館",
      "OKC 出發 — 返回德州",
      "McKinney — 回家"
    ],
    stops_en: [
      "Ponca City — optional gas & restroom",
      "Oklahoma City — lunch + OKC National Memorial visit",
      "Depart OKC — return to Texas",
      "McKinney — home"
    ],
    attractions: [
      "Oklahoma City National Memorial & Museum（爆炸案紀念館，門票$18/人）",
      "Bricktown 磚城區",
      "Marland Mansion in Ponca City（可選）"
    ],
    attractions_en: [
      "OKC National Memorial & Museum — sobering, powerful exhibition ($18/person)",
      "Bricktown — Oklahoma City's entertainment district",
      "Marland Mansion, Ponca City — optional historic stop"
    ],
    food: [
      "咖啡：Jane's Landing 可愛的過路咖啡廳",
      "午餐：OOZIE Mediterranean Restaurant — 黎巴嫩料理，超好吃"
    ],
    food_en: [
      "Coffee: Jane's Landing — charming roadside café",
      "Lunch: OOZIE Mediterranean Restaurant — outstanding Lebanese food"
    ],
    notes: [
      "Oklahoma City 紀念館氣氛莊重，建議安排 1.5–2 小時參觀",
      "戶外紀念牆參觀時間較短；博物館內需要更多時間",
      "盡早離開 OKC，避免開夜路回德州"
    ],
    notes_en: [
      "The OKC Memorial is sobering — allow 1.5–2 hours",
      "Outdoor memorial is a quick visit; the museum inside needs more time",
      "Leave OKC early to avoid driving rural Texas roads after dark"
    ]
  }
];

/* =============================================
   CHECKLIST DATA — bilingual
============================================== */
const checklistData = [
  {
    category:    "🚗 駕駛 / 車輛",
    category_en: "🚗 Driving & Vehicle",
    items: [
      { zh: "確認車輛保養（機油、輪胎、雨刷）",         en: "Check vehicle maintenance (oil, tires, wipers)" },
      { zh: "下載離線地圖（Google Maps 或 Maps.me）",   en: "Download offline maps (Google Maps or Maps.me)" },
      { zh: "準備行車記錄器 / 充電線",                  en: "Dashcam & charging cables ready" },
      { zh: "後備輪胎確認",                              en: "Spare tire check" },
      { zh: "確認車險與道路救援資訊",                    en: "Confirm car insurance & roadside assistance" },
      { zh: "保險和車輛文件（駕照、註冊證、保險卡）",    en: "Carry documents: license, registration, insurance card" }
    ]
  },
  {
    category:    "🏨 住宿 / 行政",
    category_en: "🏨 Accommodation & Admin",
    items: [
      { zh: "確認 Amarillo 飯店訂房",                   en: "Confirm Amarillo hotel reservation" },
      { zh: "確認 Colorado Springs 飯店訂房",           en: "Confirm Colorado Springs hotel reservation" },
      { zh: "確認 Denver 飯店訂房（2 晚）",             en: "Confirm Denver hotel (2 nights)" },
      { zh: "確認 Wichita 飯店訂房",                    en: "Confirm Wichita hotel reservation" },
      { zh: "列印或截圖所有訂房確認信",                  en: "Print or screenshot all booking confirmations" },
      { zh: "室內拖鞋（Airbnb不會提供）",               en: "Indoor slippers (Airbnb won't provide these)" },
      { zh: "盥洗用品（可選）",                          en: "Toiletries (optional)" },
      { zh: "大毛巾",                                    en: "Large towel" }
    ]
  },
  {
    category:    "🥾 健行 / 戶外",
    category_en: "🥾 Hiking & Outdoors",
    items: [
      { zh: "運動鞋或登山鞋",           en: "Sneakers or hiking shoes" },
      { zh: "防曬乳 SPF 50+",           en: "Sunscreen SPF 50+" },
      { zh: "帽子",                     en: "Hat / cap" },
      { zh: "太陽眼鏡（開車必備！）",   en: "Sunglasses — essential for driving!" },
      { zh: "輕薄外套或防風外套",       en: "Light jacket or windbreaker" }
    ]
  },
  {
    category:    "🧃 食物 / 飲水",
    category_en: "🧃 Food & Water",
    items: [
      { zh: "保溫水壺（可去星巴克要冰水）",   en: "Insulated water bottle" },
      { zh: "車上備水（超市買一兩箱瓶裝水）", en: "Stock water in the car (pick up a case at a grocery store)" },
      { zh: "超多零食",                       en: "Lots of road trip snacks" },
      { zh: "冰桶讚讚",                       en: "Cooler / ice chest" },
      { zh: "衛生紙 / 紙巾",                  en: "Tissues / paper towels" },
      { zh: "餐具",                            en: "Utensils for eating in the car" }
    ]
  },
  {
    category:    "🩹 安全 / 急救",
    category_en: "🩹 Safety & First Aid",
    items: [
      { zh: "基本急救包",                                                 en: "Basic first aid kit" },
      { zh: "常備藥（止痛、腸胃、暈車）",                                en: "Medications: pain relief, antacids, motion sickness" },
      { zh: "緊急聯絡電話清單",                                           en: "Emergency contacts list" },
      { zh: "手機行動電源",                                               en: "Portable phone charger (power bank)" },
      { zh: "建議一定要帶維他命C、B群、鋅，補充免疫力，每天吃！！",      en: "Daily vitamins: Vitamin C, B complex, Zinc — take every day!" }
    ]
  }
];

/* =============================================
   INITIALISE
============================================== */
document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
  renderChecklist();
  renderDayEntries();
  initBackToTop();
  initNavScroll();
  initLangToggle();
});

/* =============================================
   LANGUAGE TOGGLE
============================================== */
function initLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;

  updateToggleLabel(btn);

  btn.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('roadtrip-lang', currentLang);
    applyLang(currentLang);

    /* Re-render dynamic sections with new language */
    document.getElementById('days-container').innerHTML = '';
    document.getElementById('checklist-container').innerHTML = '';
    renderChecklist();
    renderDayEntries();
    updateToggleLabel(btn);
  });
}

function updateToggleLabel(btn) {
  btn.textContent = currentLang === 'zh' ? 'EN' : '中';
  btn.setAttribute('aria-label', currentLang === 'zh' ? 'Switch to English' : '切換為中文');
}

/* Swap all [data-zh] / [data-en] elements */
function applyLang(lang) {
  document.querySelectorAll('[data-zh]').forEach(el => {
    el.textContent = lang === 'zh' ? el.dataset.zh : el.dataset.en;
  });
}

/* =============================================
   NAV SCROLL EFFECT
============================================== */
function initNavScroll() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* =============================================
   CHECKLIST
============================================== */
function renderChecklist() {
  const container = document.getElementById('checklist-container');
  if (!container) return;

  const saved = JSON.parse(localStorage.getItem('roadtrip-checklist') || '{}');

  checklistData.forEach((cat, ci) => {
    const catDiv = document.createElement('div');
    catDiv.className = 'checklist-category';

    const title = document.createElement('div');
    title.className = 'checklist-cat-title';
    title.textContent = currentLang === 'zh' ? cat.category : cat.category_en;
    catDiv.appendChild(title);

    cat.items.forEach((item, ii) => {
      const key = `${ci}-${ii}`;
      const checked = saved[key] === true;
      const text = currentLang === 'zh' ? item.zh : item.en;

      const label = document.createElement('label');
      label.className = 'checklist-item' + (checked ? ' checked' : '');

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = checked;

      const span = document.createElement('span');
      span.textContent = text;

      cb.addEventListener('change', () => {
        const state = JSON.parse(localStorage.getItem('roadtrip-checklist') || '{}');
        state[key] = cb.checked;
        localStorage.setItem('roadtrip-checklist', JSON.stringify(state));
        label.classList.toggle('checked', cb.checked);
      });

      label.appendChild(cb);
      label.appendChild(span);
      catDiv.appendChild(label);
    });

    container.appendChild(catDiv);
  });
}

/* =============================================
   DAY ENTRIES
============================================== */
function renderDayEntries() {
  const container = document.getElementById('days-container');
  if (!container) return;
  tripData.forEach(day => container.appendChild(buildDayEntry(day)));
}

function buildDayEntry(day) {
  const lang = currentLang;
  const t = ui[lang];

  const entry = document.createElement('div');
  entry.className = 'day-entry';
  entry.id = `day-${day.day}`;

  /* Header row */
  const header = document.createElement('div');
  header.className = 'day-entry-header';

  const numCol = document.createElement('div');
  numCol.className = 'day-num-col';
  numCol.innerHTML = `
    <span class="day-label-small">Day</span>
    <span class="day-num-large">${String(day.day).padStart(2,'0')}</span>
  `;

  const subtitle = lang === 'zh' ? day.subtitle : day.subtitle_en;
  const drive    = lang === 'zh' ? day.driveTime : day.driveTime_en;
  const stay     = (lang === 'en' && day.stay_en) ? day.stay_en : day.stay;

  const textCol = document.createElement('div');
  textCol.className = 'day-header-text';
  textCol.innerHTML = `
    <h3 class="day-entry-title">${day.title}</h3>
    <p class="day-entry-subtitle">${subtitle}</p>
    <p class="day-entry-route-text">${day.route.join(' → ')}</p>
    <p class="day-entry-quick-meta">${t.driveLabel}: ${drive} &nbsp;·&nbsp; ${t.stayLabel}: ${stay}</p>
  `;

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'day-toggle-btn';
  toggleBtn.setAttribute('aria-label', t.expand);
  toggleBtn.textContent = '▾';

  header.appendChild(numCol);
  header.appendChild(textCol);
  header.appendChild(toggleBtn);

  /* Expandable body */
  const body = document.createElement('div');
  body.className = 'day-entry-body';
  body.appendChild(buildRoutePhotoHeader(day));
  body.appendChild(buildMetaTable(day));
  body.appendChild(buildContentGrid(day));
  body.appendChild(buildPhotoGrid(day));

  header.addEventListener('click', () => {
    const isOpen = entry.classList.toggle('open');
    toggleBtn.setAttribute('aria-label', isOpen ? t.collapse : t.expand);
    if (isOpen) {
      setTimeout(() => entry.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
    }
  });

  entry.appendChild(header);
  entry.appendChild(body);
  return entry;
}

function buildRoutePhotoHeader(day) {
  const lang = currentLang;
  const subtitle = lang === 'zh' ? day.subtitle : day.subtitle_en;
  const drive    = lang === 'zh' ? day.driveTime : day.driveTime_en;
  const stay     = (lang === 'en' && day.stay_en) ? day.stay_en : day.stay;
  const t = ui[lang];

  const div = document.createElement('div');
  div.className = 'route-photo-header';
  if (day.photos && day.photos.header) {
    div.style.backgroundImage = `url('${day.photos.header}')`;
  }

  const overlay = document.createElement('div');
  overlay.className = 'rph-overlay';

  const content = document.createElement('div');
  content.className = 'rph-content';
  content.innerHTML = `
    <p class="rph-eyebrow">Day ${day.day} &nbsp;·&nbsp; ${subtitle}</p>
    <p class="rph-route-name">${day.title}</p>
    ${buildLinearRouteSVG(day.route)}
    <div class="rph-stats-row">
      <span class="rph-stat">Drive <strong>${drive}</strong></span>
      <span class="rph-stat">Stops <strong>${day.stops.length}</strong></span>
      <span class="rph-stat">${t.stayLabel} <strong>${stay}</strong></span>
    </div>
  `;

  div.appendChild(overlay);
  div.appendChild(content);
  return div;
}

function buildLinearRouteSVG(stops) {
  const n = stops.length;
  if (n < 2) return '';
  const W = 520, H = 54, margin = 12;
  const usable = W - margin * 2;
  const y = 22;
  const xs = stops.map((_, i) => margin + (usable / (n - 1)) * i);

  let svg = `<svg class="rph-route-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet">`;

  for (let i = 0; i < n - 1; i++) {
    svg += `<line x1="${xs[i].toFixed(1)}" y1="${y}" x2="${xs[i+1].toFixed(1)}" y2="${y}"
      stroke="rgba(255,255,255,0.32)" stroke-width="1.5" stroke-dasharray="5,4"/>`;
  }

  stops.forEach((stop, i) => {
    const x = xs[i];
    const isEndpoint = i === 0 || i === n - 1;
    const r    = isEndpoint ? 5.5 : 4;
    const fill = isEndpoint ? 'rgba(240,217,138,0.92)' : 'rgba(255,255,255,0.78)';
    const label = stop.length > 13 ? stop.substring(0, 12) + '…' : stop;
    svg += `<circle cx="${x.toFixed(1)}" cy="${y}" r="${r}" fill="${fill}"/>`;
    svg += `<text x="${x.toFixed(1)}" y="${H - 4}" text-anchor="middle"
      fill="rgba(255,255,255,0.65)" font-size="8.5"
      font-family="'Inter','Noto Sans TC',system-ui">${label}</text>`;
  });

  svg += '</svg>';
  return svg;
}

function buildMetaTable(day) {
  const lang = currentLang;
  const t = ui[lang];
  const drive = lang === 'zh' ? day.driveTime : day.driveTime_en;
  const stay  = (lang === 'en' && day.stay_en) ? day.stay_en : day.stay;
  const theme = lang === 'zh' ? day.theme : day.theme_en;

  const div = document.createElement('div');
  div.className = 'day-meta-table';
  div.innerHTML = `
    <div class="dmt-item">
      <span class="dmt-label">${t.driveLabel}</span>
      <span class="dmt-value">${drive}${t.driveNote}</span>
    </div>
    <div class="dmt-item">
      <span class="dmt-label">${t.stayLabel}</span>
      <span class="dmt-value">${stay}</span>
    </div>
    <div class="dmt-item">
      <span class="dmt-label">${t.themeLabel}</span>
      <span class="dmt-value">${theme}</span>
    </div>
    <a href="${day.mapsUrl}" target="_blank" rel="noopener noreferrer" class="maps-text-link">
      ${t.mapsLink}
    </a>
  `;
  return div;
}

function buildContentGrid(day) {
  const lang = currentLang;
  const t = ui[lang];
  const stops       = lang === 'zh' ? day.stops       : day.stops_en;
  const attractions = lang === 'zh' ? day.attractions : day.attractions_en;
  const food        = lang === 'zh' ? day.food        : day.food_en;
  const notes       = lang === 'zh' ? day.notes       : day.notes_en;

  const grid = document.createElement('div');
  grid.className = 'day-content-grid';

  const left = document.createElement('div');
  left.className = 'content-col';
  left.innerHTML = `
    <span class="content-section-h">${t.morningH}</span>
    <ul class="content-list">
      ${stops.map(s => `<li>${s}</li>`).join('')}
    </ul>
    <span class="content-section-h">${t.foodH}</span>
    <ul class="content-list">
      ${food.map(f => `<li>${f}</li>`).join('')}
    </ul>
  `;

  const right = document.createElement('div');
  right.className = 'content-col';
  right.innerHTML = `
    <span class="content-section-h">${t.attractionsH}</span>
    <ul class="content-list">
      ${attractions.map(a => `<li>${a}</li>`).join('')}
    </ul>
    <span class="content-section-h">${t.notesH}</span>
    <div class="notes-block">
      ${notes.map(n => `<p>${n}</p>`).join('')}
    </div>
  `;

  grid.appendChild(left);
  grid.appendChild(right);
  return grid;
}

function buildPhotoGrid(day) {
  const grid = document.createElement('div');
  grid.className = 'day-photo-grid';

  if (!day.photos || !day.photos.gallery || day.photos.gallery.length === 0) {
    for (let i = 0; i < 2; i++) {
      const ph = document.createElement('div');
      ph.className = 'photo-item placeholder';
      grid.appendChild(ph);
    }
    return grid;
  }

  day.photos.gallery.forEach(src => {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.style.backgroundImage = `url('${src}')`;
    grid.appendChild(item);
  });

  return grid;
}

/* =============================================
   BACK TO TOP
============================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
