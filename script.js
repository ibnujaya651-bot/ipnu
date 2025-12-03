// === DATA KARAKTER (20) ===
// NOTE: simpan gambar di folder /images dengan nama file lowercase tanpa spasi,
// misal: images/kelly.jpg, images/hayato.jpg, images/chrono.jpg, dll.
// Jika belum ada gambar, buat file images/placeholder.jpg untuk sementara.

const characters = [
  { name: "Kelly", clue: "Pelari cepat, skill Dash Run.", img: "images/kelly.jpg" },
  { name: "Hayato", clue: "Samurai, skill Bushido.", img: "images/hayato.jpg" },
  { name: "Chrono", clue: "Shield biru, kolaborasi CR7.", img: "images/chrono.jpg" },
  { name: "Alok", clue: "DJ, skill heal area.", img: "images/alok.jpg" },
  { name: "Jota", clue: "Sustain ketika pakai SMG/Shotgun.", img: "images/jota.jpg" },
  { name: "K", clue: "Karakter misterius, skill unik.", img: "images/k.jpg" },
  { name: "Moco", clue: "Deteksi musuh lewat jejak.", img: "images/moco.jpg" },
  { name: "Caroline", clue: "Tough, cocok untuk tank.", img: "images/caroline.jpg" },
  { name: "Laura", clue: "Akurat dengan sniper.", img: "images/laura.jpg" },
  { name: "Antonio", clue: "Tambahan HP awal.", img: "images/antonio.jpg" },
  { name: "Ford", clue: "Peran support, tahan banting.", img: "images/ford.jpg" },
  { name: "Kla", clue: "Damage melee tinggi.", img: "images/kla.jpg" },
  { name: "Maxim", clue: "Pengumpul uang lebih cepat.", img: "images/maxim.jpg" },
  { name: "Nikita", clue: "Ahli SMG, reload cepat.", img: "images/nikita.jpg" },
  { name: "Paloma", clue: "Membagikan senjata ke tim.", img: "images/paloma.jpg" },
  { name: "Olivia", clue: "Mendukung dengan heal kecil.", img: "images/olivia.jpg" },
  { name: "Rafael", clue: "Sniper berkemampuan spesial.", img: "images/rafael.jpg" },
  { name: "Miguel", clue: "Meningkatkan ADRENALINE, damage.", img: "images/miguel.jpg" },
  { name: "Kapella", clue: "Support healer, cocok tim.", img: "images/kapella.jpg" },
  { name: "Shirou", clue: "Damage ke armor musuh meningkat.", img: "images/shirou.jpg" }
];

// GAME STATE
let order = [];      // urutan soal (acak)
let current = 0;     // index di order
let score = 0;

const totalSpan = document.getElementById('total');
const progressSpan = document.getElementById('progress');
const scoreSpan = document.getElementById('score');
const clueEl = document.getElementById('clue');
const imgEl = document.getElementById('char-img');
const resultEl = document.getElementById('result');
const answerInput = document.getElementById('answer');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

totalSpan.textContent = characters.length;

// util: shuffle array
function shuffle(arr) {
  for (let i = arr.length -1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame() {
  order = characters.map((_,i)=>i);
  shuffle(order);
  current = 0;
  score = 0;
  scoreSpan.textContent = score;
  restartBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  loadQuestion();
}

function loadQuestion() {
  const idx = order[current];
  const char = characters[idx];
  clueEl.textContent = char.clue;
  imgEl.src = char.img || 'images/placeholder.jpg';
  imgEl.alt = char.name;
  resultEl.textContent = "";
  resultEl.className = "";
  answerInput.value = "";
  progressSpan.textContent = current + 1;
  answerInput.focus();
}

function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, '');
}

function checkAnswer() {
  const user = normalize(answerInput.value);
  const correct = normalize(characters[order[current]].name);

  if (!user) return;
  if (user === correct) {
    // benar
    score++;
    scoreSpan.textContent = score;
    resultEl.textContent = "Benar! 🎉";
    resultEl.className = "correct";

    // auto next setelah delay kecil supaya pemain lihat efek
    nextBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden'); // show restart if last
    if (current < order.length - 1) {
      setTimeout(()=> {
        current++;
        loadQuestion();
      }, 700);
    } else {
      // selesai semua
      resultEl.textContent = `Kamu menyelesaikan semua soal! Skor: ${score} / ${order.length}`;
      nextBtn.classList.add('hidden');
      restartBtn.classList.remove('hidden');
    }
  } else {
    // salah
    resultEl.textContent = "Salah! Coba lagi.";
    resultEl.className = "wrong";
    // tunjukkan tombol next agar pemain bisa skip (opsional)
    nextBtn.classList.remove('hidden');
  }
}

function nextQuestion() {
  if (current < order.length - 1) {
    current++;
    loadQuestion();
  } else {
    resultEl.textContent = `Sudah soal terakhir. Skor: ${score} / ${order.length}`;
    nextBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
  }
}

function restartGame() {
  startGame();
}

// event listeners
checkBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);
answerInput.addEventListener('keyup', function(e){
  if (e.key === 'Enter') checkAnswer();
});

startGame();
