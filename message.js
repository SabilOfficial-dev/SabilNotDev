const { Telegraf } = require('telegraf');
const fs = require('fs-extra');
const archiver  = require("archiver")
const chokidar  = require("chokidar")
const crypto = require('crypto');
const { execSync } = require("child_process")
const { exec } = require("child_process")

function escapeHtml(text = "") {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function autoInstall(moduleName) {

    try {

        // cek module
        require.resolve(moduleName)

        console.log(
            `MODULE ${moduleName} sudah terinstall`
        )

    } catch {

        console.log(
            `INSTALL installing ${moduleName}...`
        )

        try {

            execSync(
                `npm install ${moduleName}`,
                {
                    stdio: "inherit"
                }
            )

            console.log(
                `SUCCESS ${moduleName} berhasil diinstall`
            )

        } catch (err) {

            console.log(
                `PROSES INSTALL ${moduleName}`
            )

            console.log(
                err.message
            )
        }
    }
}

// =============================
// AUTO INSTALL LIST
// =============================
const modules = [

    "crypto",
    "axios",
    "fs-extra",
    "grammy",
    "moment-timezone",
    "path",
    "chokidar",
    "archiver@5.3.1",
    "acorn",
    "os",
    "vm",
    "http",
    "https",
    "chalk@4",
    "cheerio"
]

// =============================
// RUN AUTO INSTALL
// =============================
for (const mod of modules) {

    autoInstall(mod)
}
const axios = require('axios')
const os = require('os')
const https = require("https")
const http = require("http")
const vm = require('vm')
const acorn = require('acorn')
const path = require('path')
const chalk = require('chalk')
const { Bot, InputFile } = require('grammy')
const cheerio = require('cheerio')
const moment = require("moment-timezone")
const config = require('./config');
const updater = require("./updater");
const updateLink = require("./updatelink");

console.clear()
console.log(chalk.green(`
█▀ ▀█▀ ▄▀█ █▀█ ▀█▀
▄█ ░█░ █▀█ █▀▄ ░█░
Developer : @SabilOfficial
Version : 1 Gen 2
Name : Obfuscated Bot
System : Hard And Free
Status : Bot Acctive`));


// helper euyy
const PATH_MAINTENANCE = "./database/maintenance.json"

// =============================
// CREATE FILE
// =============================
if (!fs.existsSync(PATH_MAINTENANCE)) {

    fs.writeFileSync(
        PATH_MAINTENANCE,
        JSON.stringify({
            status: false,
            reason: "-"
        }, null, 2)
    )
}

// helper baca status maintenance
function isMaintenance() {
    try {
        const data = JSON.parse(
            fs.readFileSync(PATH_MAINTENANCE, "utf8")
        )
        return data.status === true
    } catch {
        return false
    }
}

// Backup Files Jirr
const BACKUP_OWNER_ID = config.OWNER_ID

const BACKUP_DIR =
path.join(__dirname, "backup")

// =============================
// CREATE BACKUP DIR
// =============================
if (!fs.existsSync(BACKUP_DIR)) {

    fs.mkdirSync(
        BACKUP_DIR,
        {
            recursive: true
        }
    )
}

const LOCAL_FILE = "./index.js"

const UPDATE_FLAG =
"./update.flag"

// Func
const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const E = {
  bot: `<tg-emoji emoji-id='5987802868734760945'>✨</tg-emoji>`,
  botStar: `<tg-emoji emoji-id='4956232383721374836'>✨</tg-emoji>`,
  dev: `<tg-emoji emoji-id='5879770735999717115'>✨</tg-emoji>`,
  doc: `<tg-emoji emoji-id='5839380580080293813'>✨</tg-emoji>`,
  dot: `<tg-emoji emoji-id='5832251986635920010'>✨</tg-emoji>`,
  duration: `<tg-emoji emoji-id='5776213190387961618'>✨</tg-emoji>`,
  emoFree: `<tg-emoji emoji-id='5368324170671202286'>✨</tg-emoji>`,
  err: `<tg-emoji emoji-id='5886496611835581345'>✨</tg-emoji>`,
  games: `<tg-emoji emoji-id='4958903389523018769'>✨</tg-emoji>`,
  group: `<tg-emoji emoji-id='5879896690210639947'>✨</tg-emoji>`,
  grp: `<tg-emoji emoji-id='5983399041197675256'>✨</tg-emoji>`,
  id: `<tg-emoji emoji-id='5819078828017849357'>✨</tg-emoji>`,
  info2: `<tg-emoji emoji-id='5886440807325504167'>✨</tg-emoji>`,
  key: `<tg-emoji emoji-id='5877307202888273539'>✨</tg-emoji>`,
  link: `<tg-emoji emoji-id='5796440171364749940'>✨</tg-emoji>`,
  mute: `<tg-emoji emoji-id='5771511103141975115'>✨</tg-emoji>`,
  name: `<tg-emoji emoji-id='5883964170268840032'>✨</tg-emoji>`,
  ok: `<tg-emoji emoji-id='6296501388276926215'>✨</tg-emoji>`,
  set: `<tg-emoji emoji-id='5886707481844912001'>✨</tg-emoji>`,
  shield: `<tg-emoji emoji-id='5843862283964390528'>✨</tg-emoji>`,
  status: `<tg-emoji emoji-id='5839354140261619193'>✨</tg-emoji>`,
  tools: `<tg-emoji emoji-id='5924720918826848520'>✨</tg-emoji>`,
  total: `<tg-emoji emoji-id='5888799736508454231'>✨</tg-emoji>`,
  user: `<tg-emoji emoji-id='5920344347152224466'>✨</tg-emoji>`,
  version: `<tg-emoji emoji-id='5956561749070057536'>✨</tg-emoji>`,
  warn: `<tg-emoji emoji-id='5881702736843511327'>✨</tg-emoji>`,
  warnInfo: `<tg-emoji emoji-id='5954175920506933873'>✨</tg-emoji>`,

  alasan: `<tg-emoji emoji-id='5839380580080293813'>📝</tg-emoji>`,
  cantik: `<tg-emoji emoji-id='6296501388276926215'>💄</tg-emoji>`,
  casino: `<tg-emoji emoji-id='4958903389523018769'>🎰</tg-emoji>`,
  crown: `<tg-emoji emoji-id='5881702736843511327'>👑</tg-emoji>`,
  game: `<tg-emoji emoji-id='4958903389523018769'>🎮</tg-emoji>`,
  green: `<tg-emoji emoji-id='6296501388276926215'>🟢</tg-emoji>`,
  jackpot: `<tg-emoji emoji-id='6296501388276926215'>🎉</tg-emoji>`,
  kaya: `<tg-emoji emoji-id='6296501388276926215'>💵</tg-emoji>`,
  khodam: `<tg-emoji emoji-id='5987802868734760945'>🔮</tg-emoji>`,
  label: `<tg-emoji emoji-id='5886440807325504167'>🏷️</tg-emoji>`,
  lilin: `<tg-emoji emoji-id='5839354140261619193'>🕯️</tg-emoji>`,
  lock: `<tg-emoji emoji-id='5886496611835581345'>🔒</tg-emoji>`,
  miskin: `<tg-emoji emoji-id='6296501388276926215'>💸</tg-emoji>`,
  namebadge: `<tg-emoji emoji-id='5883964170268840032'>📛</tg-emoji>`,
  pantun: `<tg-emoji emoji-id='5839380580080293813'>📜</tg-emoji>`,
  red: `<tg-emoji emoji-id='5886496611835581345'>🔴</tg-emoji>`,
  sad: `<tg-emoji emoji-id='5886496611835581345'>😢</tg-emoji>`,
  spek: `<tg-emoji emoji-id='5883964170268840032'>📊</tg-emoji>`,
  star2: `<tg-emoji emoji-id='5881702736843511327'>⭐</tg-emoji>`,
  tampan: `<tg-emoji emoji-id='6296501388276926215'>🪞</tg-emoji>`,
  tolol: `<tg-emoji emoji-id='5987802868734760945'>🧠</tg-emoji>`,
  ukur: `<tg-emoji emoji-id='5839380580080293813'>📐</tg-emoji>`,
  umur: `<tg-emoji emoji-id='5839354140261619193'>🎂</tg-emoji>`,
  unlock: `<tg-emoji emoji-id='6296501388276926215'>🔓</tg-emoji>`,
};

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

function analyseCode(code) {
  let errorMsg   = ""
  let errorLine  = null
  let errorCol   = null
  let fixSuggest = ""

  try {
    new Function(code) // eslint-disable-line no-new-func
  } catch (e) {
    errorMsg = e.message
    const msg = e.message

    let m = msg.match(/line (\d+)/i)
    if (m) errorLine = parseInt(m[1])

    if (!errorLine) {
      m = (e.stack || "").match(/<anonymous>:(\d+):(\d+)/)
      if (m) { errorLine = parseInt(m[1]) - 2; errorCol = parseInt(m[2]) }
    }

    if      (/unexpected token 'else'/i.test(msg))       fixSuggest = "Ada blok `if` tidak lengkap atau kurung kurawal `{}` hilang sebelum `else`."
    else if (/unexpected token/i.test(msg))              fixSuggest = "Periksa tanda kurung `()`, kurawal `{}`, siku `[]`, atau titik koma `;` yang hilang/salah posisi."
    else if (/is not defined/i.test(msg))                fixSuggest = "Variabel/fungsi belum dideklarasikan. Tambahkan `const/let/var` atau pastikan sudah di-import."
    else if (/cannot read propert/i.test(msg))           fixSuggest = "Objek bernilai null/undefined. Gunakan optional chaining `?.` atau cek nilai terlebih dahulu."
    else if (/await is only valid/i.test(msg))           fixSuggest = "`await` hanya valid di dalam `async function`. Bungkus kode dengan `async function() {}`."
    else if (/missing \) after/i.test(msg))              fixSuggest = "Tanda kurung `()` tidak ditutup dengan benar."
    else if (/missing } after/i.test(msg))               fixSuggest = "Kurung kurawal `{}` tidak ditutup. Cek penutupan function/object/class."
    else if (/invalid or unexpected/i.test(msg))         fixSuggest = "Token tidak valid di posisi ini. Cek sintaks di sekitar baris error."
    else if (/assignment to constant/i.test(msg))        fixSuggest = "Tidak bisa mengubah nilai `const`. Ganti dengan `let` jika perlu re-assign."
    else if (/duplicate parameter/i.test(msg))           fixSuggest = "Ada parameter yang sama dalam function. Ganti nama parameter yang duplikat."
    else if (/identifier.*already.*declared/i.test(msg)) fixSuggest = "Nama variabel sudah dipakai di scope yang sama. Ganti nama atau hapus deklarasi duplikat."
    else if (/cannot use.*before.*init/i.test(msg))      fixSuggest = "Variabel dipakai sebelum dideklarasikan (temporal dead zone). Pindahkan deklarasi ke atas."
    else if (/unexpected end of input/i.test(msg))       fixSuggest = "Kode belum selesai. Ada kurung atau string yang tidak ditutup di bagian akhir."
    else if (/octal.*strict/i.test(msg))                 fixSuggest = "Literal oktal tidak diizinkan di strict mode. Hapus angka 0 di depan atau gunakan 0o prefix."
    else                                                 fixSuggest = "Periksa sintaks dan logika di sekitar baris yang ditunjuk."
  }

  const annotated = code.split("\n").map((ln, idx) => {
    const no    = String(idx + 1).padStart(4, " ")
    const isErr = errorLine && idx + 1 === errorLine
    return isErr
      ? `${no} | >>>  ${ln}${errorCol ? `   ← ERROR col ${errorCol}` : "   ← ERROR DI SINI"}`
      : `${no} |     ${ln}`
  }).join("\n")

  return { errorMsg, errorLine, errorCol, fixSuggest, annotated, hasError: !!errorMsg }
}

async function downloadTgFile(telegram, fileId) {

    const file =
    await telegram.getFile(fileId)

    const url =
    `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`

    return new Promise((resolve, reject) => {

        https.get(url, (res) => {

            const chunks = []

            res.on("data", d =>
                chunks.push(d)
            )

            res.on("end", () =>
                resolve(
                    Buffer.concat(chunks)
                    .toString("utf8")
                )
            )

            res.on("error", reject)

        }).on("error", reject)

    })
}

function renderAnnotated(code, errLine) {
  return code.split("\n").map((ln, idx) => {
    const no = String(idx + 1).padStart(4, " ")
    return errLine && idx + 1 === errLine
      ? `${no} | >>>  ${ln}   ← ERROR`
      : `${no} |     ${ln}`
  }).join("\n")
}

function cleanCode(code) {
  const lines  = code.split("\n")
  let   indent = 0
  const STEP   = 2
  const out    = []

  for (const raw of lines) {
    const content = raw.trimEnd().trimStart()
    if (!content) { out.push(""); continue }

    if (/^[}\])]/.test(content)) indent = Math.max(0, indent - STEP)
    out.push(" ".repeat(indent) + content)

    const stripped = content.replace(/\/\/.*$/, "").replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, "").trimEnd()
    const op = (stripped.match(/[{[(]/g) || []).length
    const cl = (stripped.match(/[}\])]/g) || []).length
    if (op > cl) indent += STEP
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim()
}

function tryAutoFix(code) {
let fixed    = code
  let fixNotes = []

  // Pass 1 — await di luar async
  if (/\bawait\b/.test(fixed) && !/async\s*(function|\()/.test(fixed)) {
    fixed = `async function _autoWrapper() {\n${fixed}\n}\n_autoWrapper().catch(console.error)`
    fixNotes.push("Membungkus dalam async function (await di luar async)")
  }
  let r = analyseCode(fixed)
  if (!r.hasError) return { fixed, fixNotes, result: r }

  // Pass 2 — missing semicolons
  const pass2 = fixed.split("\n").map(ln => {
    const tr = ln.trimEnd()
    if (
      /^(const|let|var|return|throw|break|continue)\b/.test(tr.trim()) &&
      !tr.endsWith(";") && !tr.endsWith("{") && !tr.endsWith("}") &&
      !tr.endsWith(",") && !tr.startsWith("//") && !tr.startsWith("*")
    ) return tr + ";"
    return ln
  }).join("\n")
  r = analyseCode(pass2)
  if (!r.hasError) { fixed = pass2; fixNotes.push("Menambahkan semicolon yang hilang"); return { fixed, fixNotes, result: r } }

  // Pass 3 — tutup kurung kurawal
  const opens3  = (fixed.match(/\{/g) || []).length
  const closes3 = (fixed.match(/\}/g) || []).length
  if (opens3 > closes3) {
    fixed += "\n" + "}".repeat(opens3 - closes3)
    fixNotes.push(`Menambahkan ${opens3 - closes3} kurung kurawal penutup`)
    r = analyseCode(fixed)
    if (!r.hasError) return { fixed, fixNotes, result: r }
  }

  // Pass 4 — tutup tanda kurung biasa
  const openP  = (fixed.match(/\(/g) || []).length
  const closeP = (fixed.match(/\)/g) || []).length
  if (openP > closeP) {
    fixed += ")".repeat(openP - closeP)
    fixNotes.push(`Menutup ${openP - closeP} tanda kurung`)
    r = analyseCode(fixed)
    if (!r.hasError) return { fixed, fixNotes, result: r }
  }

  // Pass 5 — tutup kurung siku
  const openB  = (fixed.match(/\[/g) || []).length
  const closeB = (fixed.match(/\]/g) || []).length
  if (openB > closeB) {
    fixed += "]".repeat(openB - closeB)
    fixNotes.push(`Menutup ${openB - closeB} kurung siku`)
    r = analyseCode(fixed)
    if (!r.hasError) return { fixed, fixNotes, result: r }
  }

  // Pass 6 — hapus baris error dan coba lagi
  if (r.errorLine) {
    const lines6  = fixed.split("\n")
    const errIdx  = r.errorLine - 1
    const removed = lines6.splice(errIdx, 1)[0]
    const after6  = lines6.join("\n")
    const r6      = analyseCode(after6)
    if (!r6.hasError) {
      fixed = after6
      fixNotes.push(`Menghapus baris ${r.errorLine} penyebab error: "${removed.trim()}"`)
      return { fixed, fixNotes, result: r6 }
    }
  }

  return { fixed, fixNotes, result: r }
}

function formatRuntime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days}D, ${hours}H, ${minutes}M, ${secs}S`
}

const startTime = Math.floor(Date.now() / 1000);

function getBotRuntime() {
  const now = Math.floor(Date.now() / 1000);
  return formatRuntime(now - startTime);
}

async function typing(ctx, ms = 100) {

    try {

        await ctx.telegram.sendChatAction(
            ctx.chat.id,
            "typing"
        )

        await new Promise(resolve =>
            setTimeout(resolve, ms)
        )

    } catch {}

}

// ==================== FUNGSI DOWNLOAD ASSET ====================
async function downloadAsset(url, outputPath) {
    try {
        const response = await axios.get(url, { responseType: 'stream', timeout: 10000 });
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (err) {
        console.error(`Gagal download asset: ${url}`, err.message);
    }
}

// ==================== FUNGSI EKSTRAK DAN ZIP WEBSITE ====================
async function downloadWebsite(url, outputDir, zipPath) {
    try {
        await fs.ensureDir(outputDir);
        
        const response = await axios.get(url, { 
            responseType: 'text', 
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const html = response.data;
        const $ = cheerio.load(html);
        
        await fs.writeFile(path.join(outputDir, 'index.html'), html);
        
        const assets = [];
        
        $('link[rel="stylesheet"]').each((i, el) => {
            let href = $(el).attr('href');
            if (href && !href.startsWith('data:') && !href.startsWith('http')) {
                href = new URL(href, url).href;
                assets.push({ url: href, type: 'css' });
            } else if (href && href.startsWith('http')) {
                assets.push({ url: href, type: 'css' });
            }
        });
        
        $('script[src]').each((i, el) => {
            let src = $(el).attr('src');
            if (src && !src.startsWith('data:') && !src.startsWith('http')) {
                src = new URL(src, url).href;
                assets.push({ url: src, type: 'js' });
            } else if (src && src.startsWith('http')) {
                assets.push({ url: src, type: 'js' });
            }
        });
        
        $('img').each((i, el) => {
            let src = $(el).attr('src');
            if (src && !src.startsWith('data:') && !src.startsWith('http')) {
                src = new URL(src, url).href;
                assets.push({ url: src, type: 'img' });
            } else if (src && src.startsWith('http')) {
                assets.push({ url: src, type: 'img' });
            }
        });
        
        const assetDir = path.join(outputDir, 'assets');
        await fs.ensureDir(assetDir);
        
        for (let i = 0; i < assets.length; i++) {
            const asset = assets[i];
            const ext = path.extname(asset.url).split('?')[0] || '.bin';
            const filename = `${asset.type}_${i}${ext}`;
            const assetPath = path.join(assetDir, filename);
            await downloadAsset(asset.url, assetPath);
        }
        
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        return new Promise((resolve, reject) => {
            output.on('close', () => resolve(zipPath));
            archive.on('error', reject);
            archive.pipe(output);
            archive.directory(outputDir, path.basename(outputDir));
            archive.finalize();
        });
        
    } catch (err) {
        throw new Error(`Gagal download website: ${err.message}`);
    }
}

// ==================== PROSES DOWNLOAD ====================
async function processDownload(ctx, url) {
    const ts      = Date.now()
    const tempDir = path.join(__dirname, `temp_${ts}`)
    const zipPath = path.join(__dirname, `website_${ts}.zip`)

    const waitMsg = await ctx.reply(
        `🌐 <b>Mengunduh website...</b>\n\n` +
        `⏳ Mohon tunggu, proses ini bisa memakan waktu 10–60 detik.`,
        { parse_mode: 'HTML' }
    )

    const cleanup = async () => {
        await fs.remove(tempDir).catch(() => {})
        await fs.remove(zipPath).catch(() => {})
    }

    const deleteWait = () =>
        ctx.telegram.deleteMessage(waitMsg.chat.id, waitMsg.message_id).catch(() => {})

    try {
        await downloadWebsite(url, tempDir, zipPath)

        const zipExists = await fs.pathExists(zipPath)
        if (!zipExists) throw new Error('File ZIP tidak terbentuk setelah proses download.')

        const stats      = await fs.stat(zipPath)
        const fileSizeKB = (stats.size / 1024).toFixed(2)
        const fileName   = `source_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.zip`

        await deleteWait()

        await ctx.replyWithDocument(
            { source: zipPath, filename: fileName },
            {
                caption:
                    `<blockquote><b>Get Source Selesai</b></blockquote>\n` +
                    `🌐 URL : <code>${url}</code>\n` +
                    `📦 Ukuran : ${fileSizeKB} KB\n` +
                    `📁 Isi : HTML, CSS, JS, dan aset`,
                parse_mode: 'HTML'
            }
        )

    } catch (err) {
        console.error('[processDownload] error:', err)
        await deleteWait()
        await ctx.reply(
            `❌ <b>Gagal mengunduh website!</b>\n\n` +
            `<code>${err.message}</code>`,
            { parse_mode: 'HTML' }
        )
    } finally {
        await cleanup()
    }
}

// ===================== Clear ========\\\
const bot = new Telegraf(config.BOT_TOKEN);
// Plugin
bot.telegram.setMyCommands([
    {
        command: 'start',
        description: 'Mulai bot'
    },
    {
        command: 'ai',
        description: 'Chat Ai'
    },
    {
        command: 'chatowner',
        description: 'Memberi pesan ke owner'
    }
])
.then(() => {
    console.log(chalk.cyan('Success register cmd'));
})
.catch(console.error)

// =============================
// LOG AKTIVITAS USER ONLY
// =============================
bot.use(async (ctx, next) => {

    // hanya message text
    if (!ctx.message?.text) {
        return next()
    }

    const text =
        ctx.message.text

    // hanya command
    if (!text.startsWith("/")) {
        return next()
    }

    const user =
        ctx.from

    const userId =
        Number(user.id)

    // skip owner
    if (userId === config.OWNER_ID) {
        return next()
    }

    // waktu
    const waktu =
        new Date().toLocaleString(
            "id-ID"
        )

    // ambil cmd
    const cmd =
        text.split(" ")[0]

    // ambil args
    const args =
        text.split(" ")
        .slice(1)
        .join(" ") || "-"

    // username
    const username =
        user.username
        ? "@" + user.username
        : "Tidak ada"

    // mention
    const mention =
`${ctx.from.first_name}`

    // kirim log ke owner
    await bot.telegram.sendMessage(
        config.OWNER_ID,
`\`\`\`js
╔═══════ ೋღ 🌺 ღೋ ═══════╗
     Aktifitas-User-Terdeteksi
╚═══════ ೋღ 🌺 ღೋ ═══════╝
👤 USER : ${mention}
👥 USERNAME : ${username}
🆔 ID : ${userId}
⚡ COMMAND : ${cmd}
🕒 WAKTU : ${waktu}\`\`\`
`,
        {
            parse_mode: "Markdown",
            disable_web_page_preview: true
        }
    ).catch(() => {})

    return next()

})

// =============================
// MAINTENANCE MIDDLEWARE
// =============================
bot.use(async (ctx, next) => {

    const data = JSON.parse(
        fs.readFileSync(PATH_MAINTENANCE, "utf8")
    )

    const maintenance = data.status
    const reason = data.reason || "Tidak ada alasan"

    const userId = Number(ctx.from.id)

    // =============================
    // OWNER BYPASS
    // =============================
    if (userId === config.OWNER_ID) {
        return next()
    }

    // =============================
    // MAINTENANCE OFF
    // =============================
    if (!maintenance) {
        return next()
    }

    // =============================
    // USER & PREMIUM TERKENA
    // =============================
    return ctx.reply(
        `\`\`\`js
═════════•°•⚠️•°•═════════
⚙️ BOT SEDANG MAINTENANCE

Tunggu hingga maintenance selesai.
📝 information : ${reason}
═════════════════════════\`\`\`

`,
        {
            parse_mode: "Markdown"
        }
    )
})


const CHAT_SESSION = {}
const REPLY_MAP = {}
const WAITING_UPDATE_LINK = {}
const waitingForUrl = new Map();
const sesiMusic = {}

// ==================== DATABASE AKSES ====================
const ACCESS_FILE = './akses.json';

function loadAkses() {
    if (!fs.existsSync(ACCESS_FILE)) {
        fs.writeJsonSync(ACCESS_FILE, { users: {} });
    }
    return fs.readJsonSync(ACCESS_FILE);
}

function saveAkses(data) {
    fs.writeJsonSync(ACCESS_FILE, data, { spaces: 2 });
}

function isUserHasAccess(userId) {
    const data = loadAkses();
    return data.users[userId] === true;
}

function setUserAccess(userId, hasAccess) {
    const data = loadAkses();

    if (hasAccess) {
        data.users[userId] = true;
    } else {
        delete data.users[userId];
    }

    saveAkses(data);
}

// ==================== THUMBNAIL LOKAL ====================
async function getThumbnailBuffer() {
    try {
        if (await fs.pathExists(config.THUMBNAIL_PATH)) return await fs.readFile(config.THUMBNAIL_PATH);
        return null;
    } catch (err) { return null; }
}
// ==================== KONFIGURASI DISCO ====================
const COLORS = ['primary', 'success', 'danger'];
const discoSessions = new Map(); // userId -> { interval, messageId }

// ==================== FUNGSI GET STYLE ====================
function getDiscoStyle() {
    const index = Math.floor(Date.now() / 4000) % COLORS.length;
    return COLORS[index];
}

// ==================== FUNGSI KEYBOARD ====================
function getOpenMenuKeyboard() {
    const style = getDiscoStyle();
    return {
        inline_keyboard: [
            [
                { 
                    text: "🧸 𝙼𝙴𝙽𝚄 🧸", 
                    callback_data: "tools_menu", 
                    style: style
                }
            ],
            [
                { 
                    text: "👑 𝙾𝚆𝙽𝙴𝚁 👑", 
                    url: "https://t.me/sabilofficial",
                    style: style
                },
                { 
                    text: "🔔 𝙲𝙷𝙰𝙽𝙽𝙴𝙻 🔔",
                    url: "t.me/aboutbil",
                    style: style
                }
            ]
        ]
    };
}

function getToolsKeyboard() {
    const style = getDiscoStyle();
    return {
        inline_keyboard: [
            [
                { 
                    text: "⪨ 𝙱𝙰𝙲𝙺", 
                    callback_data: "main_menu",
                    style: style
                },
                { 
                    text: "𝙽𝙴𝚇𝚃 ⪩", 
                    callback_data: "enc_menu_v1",
                    style: style
                }
            ]
        ]
    };
}

function getEncV1Keyboard() {
    const style = getDiscoStyle();
    return {
        inline_keyboard: [
            [
                { 
                    text: "⪨ 𝙱𝙰𝙲𝙺", 
                    callback_data: "tools_menu",
                    style: style
                },
                { 
                    text: "𝙽𝙴𝚇𝚃 ⪩", 
                    callback_data: "enc_menu_v2",
                    style: style
                }
            ]
        ]
    };
}

function getEncV2Keyboard() {
    const style = getDiscoStyle();
    return {
        inline_keyboard: [
            [
                { 
                    text: "⪨ 𝙱𝙰𝙲𝙺", 
                    callback_data: "enc_menu_v1",
                    style: style
                },
                { 
                    text: "𝙽𝙴𝚇𝚃 ⪩", 
                    callback_data: "main_menu",
                    style: style
                }
            ]
        ]
    };
}

function getcrotown() {
    const style = getDiscoStyle();
    return {
  inline_keyboard: [
   [
    {
      text: "👑 Open Menu Owner",
      callback_data: "owner_menu",
      style: style
     }
    ]
  ]
 };
}

function getownmenu() {
     const style = getDiscoStyle();
     return  {
         inline_keyboard: [
                     [ 
                       { 
                         text: "⪨ 𝙱𝙰𝙲𝙺", 
                         callback_data: "owner_back", 
                         style: style
                        }
                       ]
                     ]
                   };
                 }

function getkeyboardown() {
      const style = getDiscoStyle();
      return {
        inline_keyboard: [
                        [
                            {
                                text: "👑 Open Menu Owner",
                                callback_data: "owner_menu",
                                style: style
                            }
                        ]
                    ]
                };
              }
// ==================== FUNGSI START DISCO ====================
function startDisco(ctx, messageId, getKeyboardFunc) {
    const userId = ctx.from.id;
    
    // Hentikan disco sebelumnya jika ada
    if (discoSessions.has(userId)) {
        const oldSession = discoSessions.get(userId);
        clearInterval(oldSession.interval);
        discoSessions.delete(userId);
    }
    
    // Simpan session
    const interval = setInterval(async () => {
        try {
            const keyboard = getKeyboardFunc();
            await ctx.telegram.editMessageReplyMarkup(
                ctx.chat.id,
                messageId,
                undefined,
                keyboard
            );
        } catch (err) {
            // Ignore jika pesan tidak ditemukan atau tidak berubah
            if (err.message.includes('message is not modified')) return;
            if (err.message.includes('message to edit not found')) {
                const session = discoSessions.get(userId);
                if (session) {
                    clearInterval(session.interval);
                    discoSessions.delete(userId);
                }
            }
        }
    }, 4000); // 2 detik (aman dari rate limit)
    
    discoSessions.set(userId, { interval, messageId });
}

// wik wok the tolk
async function sendEncryptProgress(ctx, waitMsg, modeName) {
    const steps = [
        { percent: 20, text: `  ⚙️ Mengunduh file (mode: ${modeName})`, delay: 600 },
        { percent: 40, text: `  ⚙️ PROSES ENCRYPT (${modeName})`, delay: 800 },
        { percent: 70, text: `  ⚙️ Encrypting dengan algoritma ${modeName}...`, delay: 5000 },
        { percent: 80, text: `  ⚙️ Penyelesaian Encrypt... Cukup Lama`, delay: 4000 },
        { percent: 100, text: `  ✅ File berhasil diencrypt! (${modeName})`, delay: 500 }
    ];
    for (const step of steps) {
        const barLength = 11;
        const filled = Math.round((step.percent / 100) * barLength);
        const bar = '▓'.repeat(filled) + '░'.repeat(barLength - filled);
        await ctx.telegram.editMessageText(waitMsg.chat.id, waitMsg.message_id, undefined, `\`\`\`js
   ✅ Encrypt Berjalan\n ${step.text}\n ${bar} ${step.percent}%\`\`\``, { parse_mode: 'Markdown' });
        await new Promise(resolve => setTimeout(resolve, step.delay));
    }
}

// kacung prime
async function processObfuscate(
    ctx,
    obfuscator,
    modeName = "default"
) {

    if (typeof obfuscator !== "function") {
        console.error(
            "Obfuscator tidak valid:",
            obfuscator
        )

        return ctx.reply(
            "❌ Obfuscator tidak valid."
        )
    }

    const userId = ctx.from.id

    if (
        !isUserHasAccess(userId) &&
        userId !== config.OWNER_ID
    ) {
        return ctx.reply(
            "❌ Akses ditolak."
        )
    }

    if (!ctx.message.reply_to_message) {
        return ctx.reply(
            "❌ Reply file .js"
        )
    }

    let code = ""
    let originalBaseName = "script"

    const replied =
        ctx.message.reply_to_message

    if (replied.text) {

        code = replied.text
        originalBaseName = "code"

    } else if (replied.document) {

        const doc = replied.document

        if (
            doc.mime_type !==
                "text/javascript" &&
            !doc.file_name.endsWith(".js")
        ) {
            return ctx.reply(
                "❌ File harus .js"
            )
        }

        originalBaseName =
            doc.file_name.replace(
                /\.[^/.]+$/,
                ""
            )

        const fileLink =
            await ctx.telegram.getFileLink(
                doc.file_id
            )

        const response =
            await axios.get(
                fileLink.href,
                {
                    responseType: "text"
                }
            )

        code = response.data

    } else {

        return ctx.reply(
            "❌ Reply file .js atau kode."
        )

    }

    const outputFilename =
        `${String(modeName)
            .replace(/ /g, "_")
            .toLowerCase()
        }-encrypt-${originalBaseName}.js`

    const waitMsg =
        await ctx.reply(
            `\`\`\`js
▓▓░░░░░░░░░ 10%
⚙️ Memulai Obfuscation: ${modeName}\`\`\``,
            {
                parse_mode: "Markdown"
            }
        )

    try {

        await sendEncryptProgress(
            ctx,
            waitMsg,
            modeName
        )

        const obfuscated =
            obfuscator(code)

        const buffer =
            Buffer.from(
                obfuscated,
                "utf8"
            )

        const fileSizeMB = (buffer.length / (1024 * 1024)).toFixed(2)

        await ctx.replyWithDocument(
            {
                source: buffer,
                filename: outputFilename
            },
            {
                caption:
                    `<blockquote><b>Proses Obf Selesai</b></blockquote>\n` +
                    `File : ${outputFilename}\n` +
                    `Ukuran : ${fileSizeMB} MB\n` +
                    `Mode Enc : ${modeName}`,
                parse_mode: "HTML"
            }
        )

        await ctx.deleteMessage(
            waitMsg.message_id
        ).catch(() => {})

    } catch (err) {

        console.error(err)

        await ctx.telegram
            .editMessageText(
                waitMsg.chat.id,
                waitMsg.message_id,
                undefined,
                `❌ Gagal:\n${err.message}`
            )
            .catch(() => {})

    }

}
bot.start(async (ctx) => {
const keyboard = getcrotown();
const userId =
    String(ctx.from.id)

if (
    !isUserHasAccess(
        userId
    )
) {

    setUserAccess(
        userId,
        true
    )

    console.log(chalk.green(
        `NEW USER ${ctx.from.first_name || 'No Name'} (${userId})`
    ));

}

try {

    await ctx.telegram.sendChatAction(
        ctx.chat.id,
        "typing"
    )

    await new Promise(
        resolve =>
        setTimeout(
            resolve,
            4000
        )
    )

} catch (err) {

    console.log(
        "Typing Error:",
        err.message
    )

}

await showMenu1(ctx)

if (
    Number(ctx.from.id) ===
    Number(config.OWNER_ID)
) {

    await ctx.reply(

`
<blockquote><b>Hai Owner Ku 👋</b></blockquote>
<blockquote>Silahkan klik button bawah
untuk menampilkan menu owner.</blockquote>
`,
{
parse_mode:
 "HTML",
 reply_markup: keyboard
})

}

});

// ==================== TAMPILAN MENU ====================
async function showMenu1(ctx, messageId = null) {
    const keyboard = getOpenMenuKeyboard();
    const bottime = getBotRuntime();
    const caption = `\`\`\`js
( 👋 ) 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 ${ctx.from.first_name}

( 🔔 ) 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 :
♱ developer : @SabilOfficial
♱ version : 1 Gen 2
♱ language : JavaScipt / Js
♱ type : Auto Update

( ⚙️ ) 𝗦𝘆𝘀𝘁𝗲𝗺 :
♱ system : Free Access
♱ username : ${ctx.from.username}
♱ id : ${ctx.from.id}
♱ runtime : ${bottime}

( 🔥 ) 𝗦𝘆𝘀𝘁𝗲𝗺 𝗦𝗰𝘂𝗿𝗶𝘁𝘆 :
♱ 𝖠𝗇𝗍𝗂 𝖤𝗋𝗋𝗈𝗋
♱ 𝖤𝗇𝖼 𝖧𝖺𝗋𝖽 𝟣𝟢𝟢%
♱ 𝖠𝗇𝗍𝗂 𝖡𝗒𝗉𝖺𝗌𝗌 𝖲𝖼𝗋𝗂𝗉𝗍/𝗐𝖾𝖻
♱ 𝖠𝗇𝗍𝗂 𝖢𝗋𝖺𝖼𝗄 𝖲𝖼𝗋𝗂𝗉𝗍/𝗐𝖾𝖻
♱ 𝖧𝖺𝗋𝖽 𝖮𝖻𝖿\`\`\`
`;
    const thumb = await getThumbnailBuffer();
    if (messageId) {
        // Edit pesan yang sudah ada
        if (thumb) {
            await ctx.telegram.editMessageMedia(ctx.chat.id, messageId, undefined, {
                type: 'photo',
                media: { source: thumb },
                caption,
                parse_mode: 'Markdown'
            }, { reply_markup: keyboard });
            startDisco(ctx, messageId, getOpenMenuKeyboard);
        } else {
            await ctx.telegram.editMessageText(ctx.chat.id, messageId, undefined, caption, {
                parse_mode: 'Markdown',
                reply_markup: keyboard
            });
            startDisco(ctx, messageId, getOpenMenuKeyboard);
        }
    } else {
        // Kirim pesan baru
        if (thumb) {
            await ctx.replyWithPhoto({ source: thumb }, { caption, parse_mode: 'Markdown', reply_markup: keyboard });
            startDisco(ctx, messageId, getOpenMenuKeyboard);
        } else {
            await ctx.reply(caption, { parse_mode: 'Markdown', reply_markup: keyboard });
            startDisco(ctx, messageId, getOpenMenuKeyboard);
        }
    }
}

async function showMenu2(ctx, messageId = null) {
    const keyboard = getToolsKeyboard();
    const caption = `\`\`\`js
━━━━━ 🛠️ 𝖳𝗈𝗈𝗅𝗌 𝖬𝖾𝗇𝗎 ━━━━━

 ♱ /cekfunc Reply code
 ♱ /cekerror Reply file/code
 ♱ /infoerror Reply File/code
 ♱ /cekidemoji Reply emoji
 ♱ /fixerror Reply file/code
 ♱ /cleancode Reply File/code
 ♱ /ai 𝖢𝗁𝖺𝗍 teks
 ♱ /getsource Link Https\`\`\`
`;
    const thumb = await getThumbnailBuffer();
    if (messageId) {
        if (thumb) {
            await ctx.telegram.editMessageMedia(ctx.chat.id, messageId, undefined, {
                type: 'photo',
                media: { source: thumb },
                caption,
                parse_mode: 'Markdown'
            }, { reply_markup: keyboard });
             startDisco(ctx, messageId, getToolsKeyboard);
        } else {
            await ctx.telegram.editMessageText(ctx.chat.id, messageId, undefined, caption, {
                parse_mode: 'Markdown',
                reply_markup: keyboard
            });
            startDisco(ctx, messageId, getToolsKeyboard);
        }
    } else {
        if (thumb) {
            await ctx.replyWithPhoto({ source: thumb }, { caption, parse_mode: 'Markdown', reply_markup: keyboard });
        } else {
            await ctx.reply(caption, { parse_mode: 'Markdown', reply_markup: keyboard });
            startDisco(ctx, messageId, getToolsKeyboard);
        }
    }
}

async function EncV1(ctx, messageId = null) {
    const keyboard = getEncV1Keyboard();
    const caption = `\`\`\`js
━━━ ⚙️ 𝖤𝗇𝖼𝗋𝗒𝗉𝗍 𝖬𝖾𝗇𝗎 𝖵𝟣 ━━━
 ♱ /artillery Light & Secure 𝗉𝗋𝗈𝗍𝖾𝖼𝗍𝗂𝗈𝗇
 ♱ /hardcode Max Protection mode
 ♱ /phantom Invisible & Strong code
 ♱ /balanced Smart & Stable defense
 ♱ /reversed Rename & Shield system
 ♱ /rosemary 𝖴𝗅𝗍𝗋𝖺 𝖣𝖾𝖿𝖾𝗇𝗌𝖾 𝗆𝗈𝖽𝖾
 ♱ /enctime 𝟥𝟢 (𝟥𝟢 𝗁𝖺𝗋𝗂)
 ♱ /hardhtml Encrypt Hard Html

━━━ 🔍 Cara Penggunaan ━━━
 ♱ /enctime 30
 ♱ Jadi setiap angka = 1hari
 ♱ Jadi kalo 10 = 10hari\`\`\`

`;
    const thumb = await getThumbnailBuffer();
    if (messageId) {
        if (thumb) {
            await ctx.telegram.editMessageMedia(ctx.chat.id, messageId, undefined, {
                type: 'photo',
                media: { source: thumb },
                caption,
                parse_mode: 'Markdown'
            }, { reply_markup: keyboard });
            startDisco(ctx, messageId, getEncV1Keyboard);
        } else {
            await ctx.telegram.editMessageText(ctx.chat.id, messageId, undefined, caption, {
                parse_mode: 'Markdown',
                reply_markup: keyboard
            });
            startDisco(ctx, messageId, getEncV1Keyboard);
        }
    } else {
        if (thumb) {
            await ctx.replyWithPhoto({ source: thumb }, { caption, parse_mode: 'Markdown', reply_markup: keyboard });
            startDisco(ctx, messageId, getEncV1Keyboard);
        } else {
            await ctx.reply(caption, { parse_mode: 'Markdown', reply_markup: keyboard });
            startDisco(ctx, messageId, getEncV1Keyboard);
        }
    }
}

async function EncV2(ctx, messageId = null) {
    const keyboard = getEncV2Keyboard();
    const caption = `\`\`\`js
━━━ ⚙️ 𝖤𝗇𝖼𝗋𝗒𝗉𝗍 𝖬𝖾𝗇𝗎 𝖵𝟤 ━━━
 ♱ /enccustom 𝖢𝗎𝗌𝗍𝗈𝗆 𝖭𝖺𝗆𝖾
 ♱ /invisenc 𝖨𝗇𝗏𝗂𝗌𝖻𝗅𝖾 𝖧𝖺𝗋𝖽
 ♱ /japanenc 𝖩𝖺𝗉𝖺𝗇𝖾𝗌𝖾 𝖲𝗍𝗒𝗅𝖾
 ♱ /encarab 𝖠𝗋𝖺𝖻 𝖲𝗍𝗒𝗅𝖾
 ♱ /siuenc 𝖲𝗂𝗎 𝖲𝗍𝗒𝗅𝖾
 ♱ /japan 𝖩𝖺𝗉𝖺𝗇 𝖲𝗍𝗒𝗅𝖾
 ♱ /nebula 𝖭𝖾𝖻𝗎𝗅𝖺 𝖲𝗍𝗒𝗅𝖾
 ♱ /𝗏𝖺𝗋 𝖵𝖺𝗋 𝖲𝗍𝗒𝗅𝖾
 ♱ /invishtml Encrypt Hmtl

━━━ 🔍 Cara Penggunaan ━━━
 ♱ /enccustom 果Prime皮Sabil出
 ♱ Jangan ada spasi dalam text\`\`\`
`;
    const thumb = await getThumbnailBuffer();
    if (messageId) {
        if (thumb) {
            await ctx.telegram.editMessageMedia(ctx.chat.id, messageId, undefined, {
                type: 'photo',
                media: { source: thumb },
                caption,
                parse_mode: 'Markdown'
            }, { reply_markup: keyboard });
            startDisco(ctx, messageId, getEncV2Keyboard);
        } else {
            await ctx.telegram.editMessageText(ctx.chat.id, messageId, undefined, caption, {
                parse_mode: 'Markdown',
                reply_markup: keyboard
            });
            startDisco(ctx, messageId, getEncV2Keyboard);
        }
    } else {
        if (thumb) {
            await ctx.replyWithPhoto({ source: thumb }, { caption, parse_mode: 'Markdown', reply_markup: keyboard });
            startDisco(ctx, messageId, getEncV2Keyboard);
        } else {
            await ctx.reply(caption, { parse_mode: 'Markdown', reply_markup: keyboard });
          startDisco(ctx, messageId, getEncV2Keyboard);  
        }
    }
}

// ==================== CALLBACK ====================
bot.action('open_menu', async (ctx) => {
    const messageId = ctx.callbackQuery.message.message_id;
    await showMenu1(ctx, messageId);
    await ctx.answerCbQuery();
});

bot.action('main_menu', async (ctx) => {
    const messageId = ctx.callbackQuery.message.message_id;
    await ctx.answerCbQuery();
    await showMenu1(ctx, messageId);
});

bot.action('enc_menu_v1', async (ctx) => {
    const messageId = ctx.callbackQuery.message.message_id;
    await ctx.answerCbQuery();
    await EncV1(ctx, messageId);
});

bot.action('enc_menu_v2', async (ctx) => {
    const messageId = ctx.callbackQuery.message.message_id;
    await ctx.answerCbQuery();
    await EncV2(ctx, messageId);
});

bot.action('tools_menu', async (ctx) => {
    const messageId = ctx.callbackQuery.message.message_id;
    await ctx.answerCbQuery();
    await showMenu2(ctx, messageId);
});

bot.action("owner_menu", async (ctx) => {
   const keyboard = getownmenu();
   const userId =
        Number(
            ctx.from.id
        )

    if (
        userId !==
        Number(
            config.OWNER_ID
        )
    ) {

        return ctx.answerCbQuery(
            "❌ Khusus Owner",
            {
                show_alert:
                true
            }
        )

    }

    await ctx.answerCbQuery()
    await ctx.editMessageText(

`
<blockquote><b>👑 Owner Menu</b></blockquote>
<blockquote><b>/broadcast
Forward To User</b></blockquote>
<blockquote><b>/setlinkupdate
Setting Link Auto Update</b></blockquote>
<blockquote><b>/cekupdate
Cek Update From Link Raw.Github</b></blockquote>
<blockquote><b>/maintenane On/Off + Reason</b></blockquote>
`,
            {
                parse_mode: "HTML",
                reply_markup: keyboard
                  })
})

bot.action("owner_back", async (ctx) => {
        const keyboard = getkeyboardown();
        const userId = Number(ctx.from.id)

        if (
            userId !==
            Number(
                config.OWNER_ID
            )
        ) {

            return ctx.answerCbQuery(
                "❌ Khusus Owner",
                {
                    show_alert: true
                }
            )

        }

        await typing(ctx)
        await ctx.answerCbQuery()
        await ctx.editMessageText(
`
<blockquote><b>Hai Owner Ku 👋</b></blockquote>
<blockquote>Silahkan klik button bawah
untuk menampilkan menu owner.</blockquote>
`,
            {
                parse_mode: "HTML",
                reply_markup: keyboard
            }
        )

    }
)
// ==================== RANDOM ====================


// Fixed helper functions
const ZW = "\u200c"

/** Encode string: randomly alternate \uXXXX and \xXX escapes */
function encStr(s) {
  return s.split("").map(c => {
    const code = c.charCodeAt(0)
    return Math.random() > 0.5
      ? "\\u" + code.toString(16).padStart(4, "0")
      : "\\x" + code.toString(16).padStart(2, "0")
  }).join("")
}

/** Produce a random alphanumeric identifier (no special chars) */
function randId(len = 7) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  const nums  = "0123456789"
  let s = chars[Math.floor(Math.random() * chars.length)]
  for (let i = 1; i < len; i++) {
    const pool = chars + nums
    s += pool[Math.floor(Math.random() * pool.length)]
  }
  return s
}

/** Inject zero-width chars randomly into an identifier */
function zwInject(name, density = 0.5) {
  return name.split("").map(c => Math.random() < density ? c + ZW : c).join("")
}

/** Build a flat const array that contains all the template strings + payload */
function buildArray(arrName, items) {
  const encoded = items.map(item => {
    if (typeof item === "string") {
      // decide: use "\\xNN\\xNN" or "\\uNNNN\\uNNNN" style per char
      const escaped = item.split("").map(c => {
        const code = c.charCodeAt(0)
        if (code < 128) {
          return Math.random() > 0.5
            ? "\\u" + code.toString(16).padStart(4, "0")
            : "\\x" + code.toString(16).padStart(2, "0")
        }
        return "\\u" + code.toString(16).padStart(4, "0")
      }).join("")
      return `"${escaped}"`
    }
    if (item === null)      return "null"
    if (item === undefined) return "undefined"
    if (item === true)      return "true"
    if (item === false)     return "false"
    if (typeof item === "number") return String(item)
    return JSON.stringify(item)
  })
  return `const ${arrName}=[${encoded.join(",")}]`
}

/** The shift-loop function boilerplate */
function shiftFn(fnName, arrParam, loopVar) {
  return `function ${fnName}(${fnName},${arrParam}){for(var ${loopVar}=0;${loopVar}<${arrParam};${loopVar}++){${fnName}["${encStr("push")}"](${fnName}["${encStr("shift")}"]())}return ${fnName}}`
}

/**
 * Build the full obfuscated IIFE from parts:
 * arr[IDX_WRAPPER_OPEN] + fnName + arr[IDX_B64VAR] + b64payload + arr[IDX_RETURN] + arr[IDX_CLOSE]
 * All indices are stored in the const array itself.
 *
 * Array layout used by the IIFE (appended at end of array):
 *   [base]   = "\n(function(){\n\nfunction "
 *   [base+1] = "()\n{\n\nconst "
 *   [base+2] = "=\""                         <-- varName ="
 *   [base+3] = b64payload
 *   [base+4] = "\"\n\nreturn Buffer\n.from(\n"
 *   [base+5] = ",\n\"base64\"\n)\n.toString()\n\n}\n\neval(\n"
 *   [base+6] = "()\n)\n\n})()\n"
 */
function buildIIFE(arrName, b64, funcIdxName, varIdxName, base, debugger_ = false) {
  const debugPart = debugger_
    ? `\n\nsetInterval(()=>{\n\ndebugger\n\n},1)\n\nconsole.clear()\n\nfunction `
    : `\n\nfunction `

  const wrapperOpen   = `\n(function(){\n\n` + (debugger_ ? `setInterval(()=>{\n\ndebugger\n\n},1)\n\nconsole.clear()\n\nfunction ` : `function `)
  const funcOpen      = `(){\n\nconst `
  const assign        = `="`
  const retBuf        = `"\n\nreturn Buffer\n.from(\n`
  const retClose      = `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`
  const iifClose      = `()\n)\n\n})()\n`

  return {
    templateItems: [wrapperOpen, funcOpen, assign, b64, retBuf, retClose, iifClose],
    // generates: arr[b]+funcName+arr[b+1]+varName+arr[b+2]+b64+arr[b+3]+arr[b+4]+funcName+arr[b+5]+arr[b+6]
    // but since b64 is already in arr[b+3], the IIFE just uses array refs:
    iife: `${arrName}[${base}]+${funcIdxName}+${arrName}[${base+1}]+${varIdxName}+${arrName}[${base+2}]+${arrName}[${base+3}]+${arrName}[${base+4}]+${arrName}[${base+5}]+${funcIdxName}+${arrName}[${base+6}]`
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: balanced
// Identifiers: random alphanum with zero-width chars injected
// Const array: decimal numbers, escaped strings
// ─────────────────────────────────────────────────────────────────────────────
function balancedStyle(code) {
  const arrName  = zwInject(randId(8), 0.4)
  const shiftFnN = zwInject(randId(8), 0.4)
  const loopVar  = zwInject(randId(8), 0.3)
  const mainFnN  = zwInject(randId(8), 0.4)
  const b64VarN  = zwInject(randId(8), 0.4)

  const b64 = Buffer.from(code).toString("base64")

  // Items: numbers + kanji mood words + template strings
  const baseIdx = 10
  const templateItems = [
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    ...templateItems
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)

  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: japan
// Identifiers: hiragana chars with zero-width injected
// Const array: decimal numbers + hiragana words + template strings
// ─────────────────────────────────────────────────────────────────────────────
function japanStyle(code) {
  const kana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
  const pickKana = (n=5) => Array.from({length:n+Math.floor(Math.random()*4)},
    ()=>kana[Math.floor(Math.random()*kana.length)]).join("")

  const arrName  = pickKana()
  const shiftFnN = pickKana()
  const loopVar  = pickKana()
  const mainFnN  = pickKana()
  const b64VarN  = pickKana()

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: arab
// Identifiers: arabic letter words
// ─────────────────────────────────────────────────────────────────────────────
function arabStyle(code) {
  const arabChars = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي"
  const pickArab = (n=4) => Array.from({length:n+Math.floor(Math.random()*4)},
    ()=>arabChars[Math.floor(Math.random()*arabChars.length)]).join("")

  const arrName  = pickArab()
  const shiftFnN = pickArab()
  const loopVar  = pickArab(3)
  const mainFnN  = pickArab()
  const b64VarN  = pickArab()

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\nreturn ${b64VarN}\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: hardcore
// Identifiers: random alphanum, NO zero-width, leading var declarations
// Const array: numbers written in 0x HEX format
// Includes setInterval(debugger) trap
// ─────────────────────────────────────────────────────────────────────────────
function hardcoreStyle(code) {
  const arrName  = randId(6)
  const shiftFnN = randId(6)
  const loopVar  = randId(6)
  const mainFnN  = randId(6)
  const b64VarN  = randId(6)

  // generate extra top-level var declarations (like hardcore-style.js)
  const extraVars = Array.from({length:17}, ()=>randId(7)).join(",")

  const b64 = Buffer.from(code).toString("base64")

  // hardcore uses 0x hex for numbers
  function hexNum(n) { return "0x" + n.toString(16) }

  const baseIdx = 10
  const items = [
    null, hexNum(0), hexNum(1), hexNum(2), hexNum(4),
    hexNum(8), hexNum(16), hexNum(32), hexNum(64), hexNum(128),
    `\n(function(){\n\nsetInterval(()=>{\n\ndebugger\n\n},1)\n\nconsole.clear()\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  // For hardcore, encode number items as 0x hex strings in array
  const encodedItems = items.map(item => {
    if (typeof item === "string" && item.startsWith("0x")) return item // already hex
    if (typeof item === "string") {
      const escaped = item.split("").map(c => {
        const code2 = c.charCodeAt(0)
        return Math.random() > 0.5
          ? "\\u" + code2.toString(16).padStart(4,"0")
          : "\\x" + code2.toString(16).padStart(2,"0")
      }).join("")
      return `"${escaped}"`
    }
    if (item === null) return "null"
    return String(item)
  })

  const arrayCode = `const ${arrName}=[${encodedItems.join(",")}]`
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `var ${extraVars};\n${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: phantom
// Identifiers: JS RESERVED KEYWORDS + hundreds of U+200C appended
// (this‌‌‌‌, typeof‌‌‌‌, void‌‌‌‌, in‌‌‌‌, new‌‌‌‌)
// ─────────────────────────────────────────────────────────────────────────────
function phantomStyle(code) {
  const ZWS = ZW  // U+200C
  const reserved = ["this","typeof","void","in","new","return","delete","throw","case","try"]

  function zwKw(kw, n) {
    return kw + ZWS.repeat(n)
  }

  // generate unique identifiers from reserved words + different ZW counts
  let counter = 100
  const ids = {}
  const pick = (base) => {
    if (!ids[base]) ids[base] = 0
    ids[base]++
    return zwKw(base, counter++ )
  }

  const r = reserved
  const arrName  = pick(r[0])  // this‌‌‌...
  const shiftFnN = pick(r[1])  // typeof‌‌‌...
  const loopVar  = pick(r[2])  // void‌‌‌...
  const mainFnN  = pick(r[3])  // in‌‌‌...
  const b64VarN  = pick(r[4])  // new‌‌‌...

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: artillery
// Identifiers: JS RESERVED KEYWORDS + massive U+200C padding (600+ chars wide)
// (export‌‌‌‌...600, default‌‌‌‌...600, typeof‌‌‌‌...600)
// ─────────────────────────────────────────────────────────────────────────────
function artilleryStyle(code) {
  const ZWS = ZW
  const PAD = 600

  const arrName  = "default" + ZWS.repeat(PAD + Math.floor(Math.random()*20))
  const shiftFnN = "export"  + ZWS.repeat(PAD + Math.floor(Math.random()*20))
  const loopVar  = "typeof"  + ZWS.repeat(PAD + Math.floor(Math.random()*20))
  const mainFnN  = "export"  + ZWS.repeat(PAD + 50 + Math.floor(Math.random()*20))
  const b64VarN  = "default" + ZWS.repeat(PAD + 50 + Math.floor(Math.random()*20))

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: siucalcrick
// Identifiers: 'CalceKarik' + chinese kanji (和无与伦比的帅气) + random alphanum suffix
// ─────────────────────────────────────────────────────────────────────────────
function siuStyle(code) {
  const kanji = "和无与伦比的帅气超级厉害牛逼强大无敌"
  const prefix = "CalceKarik"
  const pickKanji = (n=8) => Array.from({length:n},
    ()=>kanji[Math.floor(Math.random()*kanji.length)]).join("")
  const mkId = () => prefix + pickKanji() + randId(6)

  const arrName  = mkId()
  const shiftFnN = mkId()
  const loopVar  = mkId()
  const mainFnN  = mkId()
  const b64VarN  = mkId()

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: reversed
// Identifiers: kanji (難読化装置) interleaved with 'senzy' repeatedly
// ─────────────────────────────────────────────────────────────────────────────
function reversedStyle(code) {
  const kanjiParts = ["難読","化装置","読化","装置"]
  const suffix = "senzy"
  const mkId = () => {
    let s = ""
    const len = 4 + Math.floor(Math.random() * 4)
    for (let i = 0; i < len; i++) {
      s += kanjiParts[Math.floor(Math.random() * kanjiParts.length)]
      if (i % 2 === 0) s += suffix
    }
    return s + randId(4)
  }

  const arrName  = mkId()
  const shiftFnN = mkId()
  const loopVar  = mkId()
  const mainFnN  = mkId()
  const b64VarN  = mkId()

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: var-style
// Identifiers: var_ prefix + random alphanum (NO unicode, NO zero-width)
// Const array: decimal numbers only (not hex), leading var declarations
// ─────────────────────────────────────────────────────────────────────────────
function varStyle(code) {
  const mkId = () => "var_" + Math.random().toString(36).slice(2, 8)

  const arrName  = mkId()
  const shiftFnN = mkId()
  const loopVar  = mkId()
  const mainFnN  = mkId()
  const b64VarN  = mkId()

  // extra pre-declarations like var-style.js
  const extraVars = Array.from({length:15}, mkId).join(",")

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `var ${extraVars};\n${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: custom (enc-custom-style)
// Identifiers: ${NameCustom}_XXXX pattern (caller supplies name prefix)
// ─────────────────────────────────────────────────────────────────────────────
function customStyle(code, name) {
  const safeName = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `$(name}`
  const mkId = (suffix) => `\${${safeName}}_${suffix || randId(4)}`

  // Use literal $ notation the way enc-custom-style does
  const arrName  = `${safeName}_${randId(4)}`
  const shiftFnN = `${safeName}_${randId(4)}`
  const loopVar  = `${safeName}_${randId(4)}`
  const mainFnN  = `${safeName}_${randId(4)}`
  const b64VarN  = `${safeName}_${randId(4)}`

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: timeLock — same pattern but with expiry guard in const array
// ─────────────────────────────────────────────────────────────────────────────
function timeLockStyle(code, days) {
  const arrName  = zwInject(randId(8), 0.4)
  const shiftFnN = zwInject(randId(8), 0.4)
  const loopVar  = zwInject(randId(8), 0.3)
  const mainFnN  = zwInject(randId(8), 0.4)
  const b64VarN  = zwInject(randId(8), 0.4)

  const expired = Date.now() + Number(days) * 86400000
  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\nif(Date.now()>${expired}){console.log("Script Expired");process.exit()}\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: nebula (bonus — same structure, kanji space theme, largest array)
// ─────────────────────────────────────────────────────────────────────────────
function nebulaStyle(code) {
  const kanji2 = "星雲宇宙銀河闇ブラック無限ゼロ超新星中性子"
  const pick = (n=6) => Array.from({length:n}, ()=>kanji2[Math.floor(Math.random()*kanji2.length)]).join("")

  const arrName  = pick()
  const shiftFnN = pick()
  const loopVar  = pick(4)
  const mainFnN  = pick()
  const b64VarN  = pick()

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


// ─────────────────────────────────────────────────────────────────────────────
// STYLE: invis / rosemary — same structural pattern, different themes
// ─────────────────────────────────────────────────────────────────────────────
function invisStyle(code) {
  return balancedStyle(code) // invis follows balanced structure
}

function rosemaryStyle(code) {
  const kanji3 = "薔薇深夜死夢幽霧影魂"
  const pick = (n=5) => Array.from({length:n}, ()=>kanji3[Math.floor(Math.random()*kanji3.length)]).join("")

  const arrName  = pick()
  const shiftFnN = pick()
  const loopVar  = pick(3)
  const mainFnN  = pick()
  const b64VarN  = pick()

  const b64 = Buffer.from(code).toString("base64")

  const baseIdx = 10
  const items = [
    null, 0, 1, 2, 4, 8, 16, 32, 64, 128,
    `\n(function(){\n\nfunction `,
    `(){\n\nconst `,
    `="`,
    b64,
    `"\n\nreturn Buffer\n.from(\n`,
    `,\n"base64"\n)\n.toString()\n\n}\n\neval(\n`,
    `()\n)\n\n})()\n`
  ]

  const arrayCode = buildArray(arrName, items)
  const shift = shiftFn(shiftFnN, arrName, loopVar)
  const iife = `eval(${arrName}[${baseIdx}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+1}]+${JSON.stringify(b64VarN)}+${arrName}[${baseIdx+2}]+${arrName}[${baseIdx+3}]+${arrName}[${baseIdx+4}]+${arrName}[${baseIdx+5}]+${JSON.stringify(mainFnN)}+${arrName}[${baseIdx+6}])`

  return `${shift}\n${arrayCode}\n${iife}`
}


module.exports = {
  balancedStyle,
  japanStyle,
  arabStyle,
  hardcoreStyle,
  phantomStyle,
  artilleryStyle,
  siuStyle,
  reversedStyle,
  varStyle,
  customStyle,
  timeLockStyle,
  nebulaStyle,
  invisStyle,
  rosemaryStyle,
}




// COMMAND
// /artillery
bot.command('artillery', (ctx) => processObfuscate(ctx, artilleryStyle, 'Artillery'))

// /hardcore
bot.command('hardcore', (ctx) => processObfuscate(ctx, hardcoreStyle, 'Hardcore'))

// /phantom
bot.command('phantom', (ctx) => processObfuscate(ctx, phantomStyle, 'Phantom'))

// /balanced
bot.command('balanced', (ctx) => processObfuscate(ctx, balancedStyle, 'Balanced'))

// /reversed
bot.command('reversed', (ctx) => processObfuscate(ctx, reversedStyle, 'Reversed'))

// /rosemary
bot.command('rosemary', (ctx) => processObfuscate(ctx, rosemaryStyle, 'Rosemary'))

// /invisenc
bot.command('invisenc', (ctx) => processObfuscate(ctx, invisStyle, 'InvisEnc'))

// /japanenc
bot.command('japanenc', (ctx) => processObfuscate(ctx, japanStyle, 'japanenc'))

// /encarab
bot.command('encarab', (ctx) => processObfuscate(ctx, arabStyle, 'encarab'))

// /siuenc
bot.command('siuenc', (ctx) => processObfuscate(ctx, siuStyle, 'siuenc'))

// /japan
bot.command('japan', (ctx) => processObfuscate(ctx, japanStyle, 'Japan'))

// /nebula
bot.command('nebula', (ctx) => processObfuscate(ctx, nebulaStyle, 'Nebula'))

// /var
bot.command('var', (ctx) => processObfuscate(ctx, varStyle, 'Var'))

// /enctime
bot.command(
'enctime',
async(ctx)=>{

const days =
ctx.message.text
.split(' ')[1]

if(!days){

return ctx.reply(
'❌ Example : /enctime 30'
)

}

await processObfuscate(
ctx,
(code)=>timeLockStyle(code, days),
'EncTime'
)

}
)

// /enccustom
bot.command(
'enccustom',
async(ctx)=>{

const text =
ctx.message.text
.split(' ')
.slice(1)
.join(' ')

if(!text){

return ctx.reply(
'❌ Example : /enccustom SabilOfficial'
)

}

await processObfuscate(
ctx,
(code)=>customStyle(code, text),
'EncCustom'
)

}
)

// ==================== HARDHTML ====================

bot.command("hardhtml", async (ctx) => {

try {

if (!ctx.message.reply_to_message?.document) {
return ctx.reply("Reply file html.");
}

const file =
await ctx.telegram.getFile(
ctx.message.reply_to_message.document.file_id
)

const link = `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`

const res =
await axios.get(link)

const html = res.data

const b64 =
Buffer
.from(html)
.toString("base64")

let anti = ""

for(let i=0;i<800;i++){

anti += `
var _${randomHex(8)}="${randomHex(50)}";
`

}

const result = `
<script>
${anti}
setInterval(()=>{
debugger
},1)
eval(
atob(
"${b64}"
)
)
</script>
`

await ctx.replyWithDocument({
source: Buffer.from(result),
filename: "hardhtml.html"
})

} catch(e){

ctx.reply(String(e))

}

})

// ==================== INVISHTML ====================

bot.command("invishtml", async (ctx) => {

try {

if (!ctx.message.reply_to_message?.document) {
return ctx.reply("Reply file html.");
}

const file =
await ctx.telegram.getFile(
ctx.message.reply_to_message.document.file_id
)

const link = `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`

const res =
await axios.get(link)

const html = res.data

const uni =
escape(
Buffer
.from(html)
.toString("base64")
)

const result = `
<script>
eval(
atob(
unescape(
"${uni}"
)
)
)
</script>
`

await ctx.replyWithDocument({
source: Buffer.from(result),
filename: "invishtml.html"
})

} catch(e){

ctx.reply(String(e))

}

})

// ==================== GETSOURCE ====================

const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/

bot.command('getsource', async (ctx) => {
    const userId = ctx.from.id

    if (!isUserHasAccess(userId) && userId !== config.OWNER_ID) {
        return ctx.reply('❌ Akses ditolak.')
    }

    const args = ctx.message.text.split(/\s+/)
    const url = args[1]

    // URL langsung disertakan di command
    if (url) {
        if (!URL_REGEX.test(url)) {
            return ctx.reply(
                `❌ <b>URL tidak valid!</b>\n\n` +
                `Pastikan URL diawali <code>http://</code> atau <code>https://</code>\n\n` +
                `<b>Contoh:</b>\n<code>/getsource https://example.com</code>`,
                { parse_mode: 'HTML' }
            )
        }
        return processDownload(ctx, url)
    }

    // Tidak ada URL — minta kirim URL lewat pesan
    waitingForUrl.set(userId, {
        type: 'getsource',
        expires: Date.now() + 2 * 60 * 1000   // timeout 2 menit
    })

    return ctx.reply(
        `🌐 <b>GET SOURCE WEBSITE</b>\n\n` +
        `Kirimkan URL website yang ingin didownload source-nya.\n\n` +
        `<b>Contoh:</b>\n<code>https://example.com</code>\n\n` +
        `<i>⏳ Sesi aktif selama 2 menit.</i>`,
        { parse_mode: 'HTML' }
    )
})

// ==================== HANDLER UNTUK MENERIMA URL ====================
bot.on('text', async (ctx, next) => {
    const userId = ctx.from.id
    const session = waitingForUrl.get(userId)

    if (!session || session.type !== 'getsource') return next()

    // Cek timeout sesi
    if (Date.now() > session.expires) {
        waitingForUrl.delete(userId)
        return next()
    }

    waitingForUrl.delete(userId)

    const url = ctx.message.text.trim()

    if (!URL_REGEX.test(url)) {
        return ctx.reply(
            `❌ <b>URL tidak valid!</b>\n\n` +
            `Pastikan URL diawali <code>http://</code> atau <code>https://</code>\n\n` +
            `Coba lagi dengan <code>/getsource https://example.com</code>`,
            { parse_mode: 'HTML' }
        )
    }

    return processDownload(ctx, url)
})
// ==================== CEKFUNC MULTI-BAHASA ====================
bot.command("cekfunc", async (ctx) => {
  try {
    // Cek apakah reply ke pesan
    if (!ctx.message.reply_to_message) {
      return ctx.reply(
        `
ɢᴜɴᴀᴋᴀɴ /cekfunc sᴀᴍʙɪʟ ʀᴇᴘʟʏ ғɪʟᴇ ᴀᴛᴀᴜ ᴘᴇsᴀɴ ᴄᴏᴅᴇ`,
        { parse_mode: "Markdown" }
      );
    }

    const replied = ctx.message.reply_to_message;
    let code = "";
    let fileName = "code";
    let isFile = false;

    // Ambil kode dari reply
    if (replied.document) {
      const ext = path.extname(replied.document.file_name).toLowerCase();
      const allowed = [".js", ".py", ".html", ".json"];

      if (!allowed.includes(ext)) {
        return ctx.reply(
          `\`\`\`js
❌ Format tidak didukung!\`\`\``,
          { parse_mode: "Markdown" }
        );
      }

      fileName = replied.document.file_name;
      isFile = true;

      try {
        code = await downloadTgFile(ctx.telegram, replied.document.file_id);
      } catch (e) {
        return ctx.reply(
          `
❌ Gagal download file:
\`\`\`js
${e.message}\`\`\``,
          { parse_mode: "Markdown" }
        );
      }
    } else if (replied.text || replied.caption) {
      code = (replied.text || replied.caption || "").trim();
    } else {
      return ctx.reply(
        `\`\`\`js
❌ Reply kode atau file yang ingin dicek.\`\`\``,
        { parse_mode: "Markdown" }
      );
    }

    if (!code.trim()) {
      return ctx.reply(
        `\`\`\`js
❌ Kode kosong.\`\`\``,
        { parse_mode: "Markdown" }
      );
    }

    // Kirim pesan loading
    const loadingMsg = await ctx.reply("🔍 *Menganalisis error...*", {
      parse_mode: "Markdown"
    });

    // Fungsi hapus loading
    const deleteLoading = async () => {
      try {
        await ctx.deleteMessage(loadingMsg.message_id);
      } catch (e) {
        // Abaikan
      }
    };

    // Deteksi bahasa
    const detectLanguage = (text) => {
      const trimmed = text.trim();

      // HTML
      if (/^<(!DOCTYPE|html|body|div|script|style|h1|p|a|img|ul|ol|li|table|form|input|button|link|meta)/i.test(trimmed)) {
        return "html";
      }

      // JSON
      if (/^[{[]/.test(trimmed) && /[}\]]$/.test(trimmed)) {
        try {
          JSON.parse(trimmed);
          return "json";
        } catch (e) {
          // Bukan JSON valid
        }
      }

      // Python
      if (/^(import|from|def|class|print|if __name__|#!\/usr\/bin\/env python|return\s+)/m.test(trimmed) ||
          /^[a-z_][a-z0-9_]*\s*\([^)]*\)\s*:/m.test(trimmed) ||
          /^class\s+[A-Za-z_][A-Za-z0-9_]*\s*[:\(]/m.test(trimmed)) {
        return "python";
      }

      // JavaScript (default)
      return "javascript";
    };

    const language = detectLanguage(code);
    let errorResult = null;
    let errorMsg = "";
    let errorLine = null;
    let errorCol = null;
    let fixSuggest = "";
    let annotated = "";

    // Analisis berdasarkan bahasa
    try {
      switch (language) {
        case "javascript": {
          // Cek JavaScript dengan Acorn
          let acorn;
          try {
            acorn = require("acorn");
          } catch {
            await deleteLoading();
            return ctx.reply(
              `
❌ *Module acorn belum terinstall.*

*Install dengan:*
\`\`\`js
npm install acorn\`\`\``,
              { parse_mode: "Markdown" }
            );
          }

          try {
            acorn.parse(code, {
              ecmaVersion: "latest",
              sourceType: "module",
              locations: true
            });
            errorResult = { success: true };
          } catch (err) {
            errorMsg = err.message;
            errorLine = err.loc?.line || null;
            errorCol = err.loc?.column || null;

            // Saran perbaikan untuk JavaScript
            if (/unexpected token 'else'/i.test(errorMsg)) {
              fixSuggest = "Ada blok `if` tidak lengkap atau kurung kurawal `{}` hilang sebelum `else`.";
            } else if (/unexpected token/i.test(errorMsg)) {
              fixSuggest = "Periksa tanda kurung `()`, kurawal `{}`, siku `[]`, atau titik koma `;` yang hilang/salah posisi.";
            } else if (/is not defined/i.test(errorMsg)) {
              fixSuggest = "Variabel/fungsi belum dideklarasikan. Tambahkan `const/let/var` atau pastikan sudah di-import.";
            } else if (/cannot read propert/i.test(errorMsg)) {
              fixSuggest = "Objek bernilai null/undefined. Gunakan optional chaining `?.` atau cek nilai terlebih dahulu.";
            } else if (/await is only valid/i.test(errorMsg)) {
              fixSuggest = "`await` hanya valid di dalam `async function`. Bungkus kode dengan `async function() {}`.";
            } else if (/missing \} after/i.test(errorMsg)) {
              fixSuggest = "Tanda kurung `()` tidak ditutup dengan benar.";
            } else if (/missing \} after/i.test(errorMsg)) {
              fixSuggest = "Kurung kurawal `{}` tidak ditutup. Cek penutupan function/object/class.";
            } else if (/invalid or unexpected/i.test(errorMsg)) {
              fixSuggest = "Token tidak valid di posisi ini. Cek sintaks di sekitar baris error.";
            } else if (/assignment to constant/i.test(errorMsg)) {
              fixSuggest = "Tidak bisa mengubah nilai `const`. Ganti dengan `let` jika perlu re-assign.";
            } else if (/duplicate parameter/i.test(errorMsg)) {
              fixSuggest = "Ada parameter yang sama dalam function. Ganti nama parameter yang duplikat.";
            } else if (/identifier.*already.*declared/i.test(errorMsg)) {
              fixSuggest = "Nama variabel sudah dipakai di scope yang sama. Ganti nama atau hapus deklarasi duplikat.";
            } else if (/cannot use.*before.*init/i.test(errorMsg)) {
              fixSuggest = "Variabel dipakai sebelum dideklarasikan (temporal dead zone). Pindahkan deklarasi ke atas.";
            } else if (/unexpected end of input/i.test(errorMsg)) {
              fixSuggest = "Kode belum selesai. Ada kurung atau string yang tidak ditutup di bagian akhir.";
            } else if (/octal.*strict/i.test(errorMsg)) {
              fixSuggest = "Literal oktal tidak diizinkan di strict mode. Hapus angka 0 di depan atau gunakan 0o prefix.";
            } else {
              fixSuggest = "Periksa sintaks dan logika di sekitar baris yang ditunjuk.";
            }

            // Annotasi
            const lines = code.split("\n");
            annotated = lines.map((ln, idx) => {
              const no = String(idx + 1).padStart(4, " ");
              return errorLine && idx + 1 === errorLine
                ? `${no} | >>>  ${ln}   ← ERROR DI SINI`
                : `${no} |     ${ln}`;
            }).join("\n");
          }
          break;
        }

        case "python": {
          // Validasi Python sederhana
          const errors = [];
          const lines = code.split("\n");

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const stripped = line.trim();
            if (!stripped) continue;

            // Cek indentasi
            const spaces = line.length - line.trimStart().length;
            if (spaces > 0 && spaces % 4 !== 0) {
              errors.push(`Indentasi tidak konsisten di baris ${i + 1} (${spaces} spasi)`);
            }

            // Cek colon
            if (/^(if|for|while|def|class|elif|else|try|except|finally|with)\b/.test(stripped)) {
              if (!/:$/.test(stripped)) {
                errors.push(`Missing ':' di baris ${i + 1}`);
              }
            }

            // Cek parentheses
            if (stripped.includes("(") && !stripped.includes(")")) {
              const openCount = (stripped.match(/\(/g) || []).length;
              const closeCount = (stripped.match(/\)/g) || []).length;
              if (openCount > closeCount) {
                errors.push(`Tanda kurung tidak seimbang di baris ${i + 1}`);
              }
            }
          }

          if (errors.length > 0) {
            errorMsg = errors.join("\n");
            errorLine = 1;
            fixSuggest = "Perbaiki indentasi dan pastikan semua blok memiliki ':'.";
            annotated = code.split("\n").map((ln, idx) => {
              return `${String(idx + 1).padStart(4, " ")} | ${ln}`;
            }).join("\n");
          } else {
            errorResult = { success: true };
          }
          break;
        }

        case "html": {
          const errors = [];
          const openTagMap = {};
          const closeTagMap = {};

          // Ambil semua tag
          const openTags = code.match(/<([a-z][a-z0-9]*)\b[^>]*>/gi) || [];
          const closeTags = code.match(/<\/([a-z][a-z0-9]*)>/gi) || [];

          openTags.forEach(tag => {
            const name = tag.replace(/<([a-z][a-z0-9]*).*/i, '$1').toLowerCase();
            if (!["br", "hr", "img", "input", "meta", "link", "area", "base", "col", "embed", "source", "track", "wbr"].includes(name)) {
              openTagMap[name] = (openTagMap[name] || 0) + 1;
            }
          });

          closeTags.forEach(tag => {
            const name = tag.replace(/<\/([a-z][a-z0-9]*)>/i, '$1').toLowerCase();
            closeTagMap[name] = (closeTagMap[name] || 0) + 1;
          });

          // Cek keseimbangan tag
          for (const [tag, count] of Object.entries(openTagMap)) {
            const closeCount = closeTagMap[tag] || 0;
            if (count !== closeCount) {
              errors.push(`Tag <${tag}> tidak seimbang (buka: ${count}, tutup: ${closeCount})`);
            }
          }

          // Cek tag penutup tanpa pembuka
          for (const [tag, count] of Object.entries(closeTagMap)) {
            if (!openTagMap[tag]) {
              errors.push(`Tag penutup </${tag}> tanpa pembuka`);
            }
          }

          if (errors.length > 0) {
            errorMsg = errors.join("\n");
            errorLine = 1;
            fixSuggest = "Pastikan semua tag HTML seimbang dan tidak ada tag penutup tanpa pembuka.";
            annotated = code.split("\n").map((ln, idx) => {
              return `${String(idx + 1).padStart(4, " ")} | ${ln}`;
            }).join("\n");
          } else {
            errorResult = { success: true };
          }
          break;
        }

        case "json": {
          try {
            JSON.parse(code);
            errorResult = { success: true };
          } catch (err) {
            errorMsg = err.message;
            // Coba cari posisi error
            const match = errorMsg.match(/position (\d+)/);
            if (match) {
              const pos = parseInt(match[1]);
              const lines = code.split("\n");
              let charCount = 0;
              for (let i = 0; i < lines.length; i++) {
                charCount += lines[i].length + 1;
                if (charCount > pos) {
                  errorLine = i + 1;
                  break;
                }
              }
            } else {
              errorLine = 1;
            }
            fixSuggest = "Periksa format JSON. Pastikan semua string ditutup dengan quote, tidak ada trailing comma, dan struktur benar.";
            annotated = code.split("\n").map((ln, idx) => {
              return `${String(idx + 1).padStart(4, " ")} | ${ln}`;
            }).join("\n");
          }
          break;
        }

        default:
          errorResult = { success: true };
      }
    } catch (err) {
      errorMsg = err.message;
      errorLine = 1;
      fixSuggest = "Terjadi error saat analisis kode.";
    }

    // Hapus loading
    await deleteLoading();

    // Kirim hasil
    const fileInfo = isFile ? `📄 File: ${fileName}` : `📝 Kode: ${fileName}`;
    const langDisplay = {
      javascript: "JavaScript",
      python: "Python",
      html: "HTML",
      json: "JSON"
    }[language] || language;

    if (errorResult?.success) {
      // Tidak ada error
      const successMsg = `
☑︎ TIDAK ADA ERROR
─────────────────────────
📌 Language:
\`\`\`
${langDisplay}\`\`\`

✨ Hasil Analisis:
─────────────────────────
\`\`\`js
✅︎ Tidak ditemukan error pada kode
✅︎ Sintaks valid
✅︎ Struktur kode aman\`\`\`

─────────────────────────
☑︎ Kode AMAN! 🚀`;

      return ctx.reply(successMsg, { parse_mode: "Markdown" });
      
    } else {
      // Ada error
      let errorMsgClean = errorMsg || "Tidak terdeteksi";
      let annotatedClean = annotated || code;

      // Batasi panjang annotated
      const annotatedLines = annotatedClean.split("\n");
      if (annotatedLines.length > 20) {
        const start = Math.max(0, errorLine ? errorLine - 8 : 0);
        const end = Math.min(annotatedLines.length, errorLine ? errorLine + 8 : 20);
        annotatedClean = annotatedLines.slice(start, end).join("\n");
        annotatedClean = `... (menampilkan baris ${start + 1}-${end})\n${annotatedClean}`;
      }

      const errorMsg2 = `
ERROR DITEMUKAN
─────────────────────────
📋 Error:
\`\`\`js
${errorMsgClean}\`\`\`

─────────────────────────

📍 Baris Error:
\`\`\`js
${errorLine ? `Baris ke-${errorLine}${errorCol ? `, Kolom ${errorCol}` : ""}` : "Tidak terdeteksi"}\`\`\`

─────────────────────────

💡 Saran Perbaikan:
\`\`\`js
${fixSuggest || "Periksa sintaks dan logika kode"}\`\`\`

─────────────────────────

📌 Cuplikan Kode:
\`\`\`js
${annotatedClean}\`\`\`
─────────────────────────
`;

      // Jika pesan terlalu panjang, kirim sebagai file
      if (errorMsg2.length > 4000) {
        const txtFile = path.join(__dirname, `analisis-error-${Date.now()}.txt`);
        fs.writeFileSync(txtFile, errorMsg2);
        await ctx.replyWithDocument(
          { source: txtFile, filename: "analisis-error.txt" },
          { caption: `📄 Hasil analisis error (${langDisplay})` }
        );
        fs.unlinkSync(txtFile);
      } else {
        return ctx.reply(errorMsg2, { parse_mode: "Markdown" });
      }
    }

  } catch (e) {
    console.error("Error cekfunc command:", e);
    return ctx.reply(
      `
❌ Terjadi error saat mengecek code.
\`\`\`js
${e.message || "Unknown error"}\`\`\``,
      { parse_mode: "Markdown" }
    );
  }
});

// ==================== INFOERROR ====================

bot.command("infoerror", async (ctx) => {

try {

if (!ctx.message.reply_to_message?.document) {
return ctx.reply("Reply file js.");
}

const file =
await ctx.telegram.getFile(
ctx.message.reply_to_message.document.file_id
)

const link = `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`

const res =
await axios.get(link)

let code = res.data

let info = []

if(code.includes("eval(eval(")){
info.push("Nested eval detected")
}

if(code.includes("debugger")){
info.push("Debugger detected")
}

if(code.includes("while(true)")){
info.push("Infinite loop detected")
}

if(code.length > 500000){
info.push("File too large")
}

if(info.length < 1){
info.push("No problem detected")
}

ctx.reply(
`INFO ERROR:\n\n- ${info.join("\n- ")}`
)

} catch(e){

ctx.reply(String(e))

}

})

// ==================== FIXFUNC ====================

bot.command("fixfunc", async (ctx) => {

try {

if (!ctx.message.reply_to_message?.document) {
return ctx.reply("Reply file js.");
}

const file =
await ctx.telegram.getFile(
ctx.message.reply_to_message.document.file_id
)

const link = `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`

const res =
await axios.get(link)

let code = res.data

code = code
.replace(/debugger;/g,"")
.replace(/while\s*\(\s*true\s*\)/g,"while(false)")
.replace(/eval\(eval\(/g,"eval(")

await ctx.replyWithDocument({
source: Buffer.from(code),
filename: "fixed.js"
})

} catch(e){

ctx.reply(String(e))

}

})

// =============================
// CMD BACKUP
// =============================
bot.command("backup", async (ctx) => {

        const userId =
            Number(ctx.from.id)

        // owner only
        if (userId !== config.OWNER_ID) {

            return ctx.reply(
                "❌ Owner only."
            )
        }

        await ctx.reply(
            "📦 Membuat backup..."
        )

        await sendBackup(
            "Manual Backup"
        )

        await ctx.reply(
            "✅ Backup berhasil dikirim ke owner."
        )
})

// =============================
// CMD CHATADMIN
// =============================
bot.command("chatowner", async (ctx) => {

    const userId = Number(ctx.from.id)
    const OWNER_ID = Number(config.OWNER_ID)

    if (userId === OWNER_ID) {
        return ctx.reply(
            "Command ini hanya untuk user."
        )
    }

    CHAT_SESSION[userId] = true

    const kb = {
        inline_keyboard: [[
            {
                text: "❌ Batalkan",
                callback_data: "cancel_chat_admin"
            }
        ]]
    }

    await ctx.reply(
`
<blockquote><b>💬 CHAT OWNER</b></blockquote>
<blockquote>
Silahkan kirim pesan anda untuk owner.
Pesan akan langsung diteruskan ke owner.
</blockquote>
`,
        {
            parse_mode: "HTML",
            reply_markup: kb
        }
    )

})

bot.action("cancel_chat_admin", async (ctx) => {

    const userId = Number(ctx.from.id)

    delete CHAT_SESSION[userId]

    await ctx.editMessageText(
`
<blockquote><b>❌ Chat Owner Dibatalkan</b></blockquote>
`,
        {
            parse_mode: "HTML"
        }
    )

    await ctx.answerCbQuery(
        "Chat dibatalkan."
    )

})

bot.on("text", async (ctx, next) => {

    const userId = Number(ctx.from.id)
    const OWNER_ID = Number(config.OWNER_ID)

    if (userId === OWNER_ID)
        return next()

    if (!CHAT_SESSION[userId])
        return next()

    if (ctx.message.text.startsWith("/"))
        return next()

    const waktu = new Date()
        .toLocaleString("id-ID")

    console.log(
        "[CHATOWNER]",
        userId,
        ctx.message.text
    )

    const sent =
        await bot.telegram.sendMessage(
            OWNER_ID,
`
<blockquote><b>📩 PESAN USER</b></blockquote>
<blockquote>
👤 Username : @${ctx.from.username || "Tidak ada"}
🆔 ID : <code>${userId}</code>
🕒 Waktu : ${waktu}
📝 Pesan :
${ctx.message.text}</blockquote>
<blockquote><b>Reply pesan ini untuk membalas user.</b></blockquote>
`,
            {
                parse_mode: "HTML"
            }
        ).catch(err => {

            console.log(
                "[SEND OWNER ERROR]",
                err
            )

            return null

        })

    if (!sent) {

        return ctx.reply(
            "❌ Gagal mengirim pesan ke owner."
        )

    }

    REPLY_MAP[
        sent.message_id
    ] = userId

    await ctx.reply(
`
<blockquote><b>✅ Pesan Berhasil Dikirim</b></blockquote>
<blockquote>Tunggu hingga owner membalas pesan anda.</blockquote>
`,
        {
            parse_mode: "HTML"
        }
    )

})

bot.on("text", async (ctx, next) => {

    const ownerId =
        Number(ctx.from.id)

    const OWNER_ID =
        Number(config.OWNER_ID)

    if (ownerId !== OWNER_ID)
        return next()

    const reply =
        ctx.message.reply_to_message

    if (!reply)
        return next()

    if (ctx.message.text.startsWith("/"))
        return next()

    const targetUser =
        REPLY_MAP[
            reply.message_id
        ]

    if (!targetUser)
        return next()

    await bot.telegram.sendMessage(
        targetUser,
`
<blockquote><b>💬 BALASAN OWNER</b></blockquote>
<blockquote>${ctx.message.text}</blockquote>
`,
        {
            parse_mode: "HTML"
        }
    ).catch(err => {

        console.log(
            "[REPLY USER ERROR]",
            err
        )

    })

    await ctx.reply(
        "✅ Balasan berhasil dikirim."
    )

})

bot.command("broadcast", async (ctx) => {

    if (ctx.from.id !== config.OWNER_ID) {
        return ctx.reply(
            "❌ Khusus Owner"
        )
    }

    if (!ctx.message.reply_to_message) {
        return ctx.reply(
            "Reply pesan dengan command /broadcast"
        )
    }

    if (!fs.existsSync(ACCESS_FILE)) {
        return ctx.reply(
            "❌ Database user tidak ditemukan."
        )
    }

    const db = JSON.parse(
        fs.readFileSync(
            ACCESS_FILE,
            "utf8"
        )
    )

    const users = Object.keys(
        db.users || {}
    )
    .map(id => Number(id))
    .filter(
        id =>
        id !== config.OWNER_ID
    )

    if (!users.length) {
        return ctx.reply(
            "❌ Tidak ada user terdaftar."
        )
    }

    const replyMsg =
        ctx.message.reply_to_message

    const waitMsg =
        await ctx.reply(
`<pre>░░░░░░░░░░░0%</pre>
Memulai Broadcast...`,
            {
                parse_mode: "HTML"
            }
        )

    const steps = [
        {
            percent: 10,
            text: "⚙️ Mengambil Database User",
            delay: 500
        },
        {
            percent: 40,
            text: "⚙️ Menyiapkan Broadcast",
            delay: 700
        },
        {
            percent: 50,
            text: "⚙️ Memvalidasi User Aktif",
            delay: 600
        },
        {
            percent: 70,
            text: "⚙️ Mengirim Broadcast",
            delay: 800
        },
        {
            percent: 90,
            text: "⚙️ Menyelesaikan Broadcast",
            delay: 600
        },
        {
            percent: 100,
            text: "✅ Broadcast Siap Dikirim",
            delay: 500
        }
    ]

    for (const step of steps) {

        const barLength = 11

        const filled =
            Math.round(
                (
                    step.percent /
                    100
                ) *
                barLength
            )

        const bar =
            "▓".repeat(
                filled
            ) +
            "░".repeat(
                barLength -
                filled
            )

        await ctx.telegram
        .editMessageText(
            waitMsg.chat.id,
            waitMsg.message_id,
            undefined,
`<pre>${bar} ${step.percent}%
${step.text}</pre>
⋘ 𝑃𝑙𝑒𝑎𝑠𝑒 𝑤𝑎𝑖𝑡... ⋙
`,
            {
                parse_mode:
                "HTML"
            }
        )
        .catch(() => {})

        await pause(
            step.delay
        )

    }

    let success = 0
    let failed = 0

    for (const userId of users) {

        try {

            await ctx.telegram
            .copyMessage(
                userId,
                ctx.chat.id,
                replyMsg.message_id
            )

            success++

        } catch (err) {

            console.log(
                `Broadcast gagal ke ${userId}`,
                err.message
            )

            failed++

        }

        await pause(100)

    }

    await ctx.telegram
    .deleteMessage(
        ctx.chat.id,
        waitMsg.message_id
    )
    .catch(() => {})

    await ctx.reply(
`<blockquote>📢 <b>BROADCAST SELESAI</b></blockquote>
<blockquote>
✅ Berhasil : ${success}
❌ Gagal : ${failed}
👥 Total : ${users.length}</blockquote>
<blockquote>Broadcast berhasil dikirim ke seluruh user aktif.</blockquote>`,
        {
            parse_mode:
            "HTML"
        }
    )

})

// =============================
// MAINTENANCE COMMAND
// =============================
bot.command("maintenance", async (ctx) => {

    const userId = Number(ctx.from.id)

    // owner only
    if (userId !== config.OWNER_ID) {
        return ctx.reply("❌ Khusus owner.")
    }

    const text = ctx.message.text

    // ambil args
    const args = text.split(" ").slice(1).join(" ")

    // kalau kosong
    if (!args) {
        return ctx.reply(`\`\`\`js
📌 Maintenance Mode

/maintenance on|update system
/maintenance off|maintenance selesai\`\`\`
            `,
            {
                parse_mode: "Markdown"
            }
        )
    }

    // split on/off dan alasan
    const [mode, ...reasonArray] = args.split("|")

    const input = mode.trim().toLowerCase()

    const reason = reasonArray.join("|").trim() || "Tidak ada alasan"

    // =============================
    // ON
    // =============================
    if (input === "on") {

        fs.writeFileSync(
            PATH_MAINTENANCE,
            JSON.stringify({
                status: true,
                reason
            }, null, 2)
        )

        return ctx.reply(
            `\`\`\`js
🛠 Maintenance Enabled

📌 Status : ON
📝 Alasan : ${reason}\`\`\`
            `,
            {
                parse_mode: "Markdown"
            }
        )
    }

    // =============================
    // OFF
    // =============================
    if (input === "off") {

        fs.writeFileSync(
            PATH_MAINTENANCE,
            JSON.stringify({
                status: false,
                reason
            }, null, 2)
        )

        return ctx.reply(
            `\`\`\`js
✅ Maintenance Disabled

📌 Status : OFF
📝 Keterangan : ${reason}\`\`\`
            `,
            {
                parse_mode: "Markdown"
            }
        )
    }

    // invalid
    return ctx.reply(
        `\`\`\`js
✘ Format Salah

/maintenance on|alasan
/maintenance off|alasan\`\`\`
        `,
        {
            parse_mode: "Markdown"
        }
    )
})
// ==================== COMMAND /CLAUDE ====================
bot.command('ai', async (ctx) => {

    const chatId = ctx.chat.id;
    const ownerId = config.OWNER_ID;
    const sessionFp = path.join(__dirname, './database/ai.json');

    // Cek maintenance (jika fungsi isMaintenance ada)
    if (typeof isMaintenance === 'function' && isMaintenance() && chatId !== ownerId) {
        return ctx.reply('🛠 Bot sedang maintenance.');
    }

    // Ambil teks setelah /claude
    const q = ctx.message.text.replace(/^\/ai\s*/, '').trim();
    if (!q) {
        return ctx.reply('Ketik /ai sambil isi pesan yang ingin di tanyakan');
    }

    // Kirim pesan "sedang memproses..."
    const waitMsg = await ctx.reply('Waiting...');

    // Fungsi load/save session
    const loadAI = () => {
        try {
            if (!fs.existsSync(sessionFp)) {
                fs.writeJsonSync(sessionFp, {});
                return {};
            }
            return fs.readJsonSync(sessionFp);
        } catch (e) {
            console.error('[AI-SESS-ERR]', e.message);
            return {};
        }
    };
    const saveAI = (data) => {
        try {
            fs.writeJsonSync(sessionFp, data, { spaces: 2 });
        } catch (e) {
            console.error('[AI-SAVE-ERR]', e.message);
        }
    };
    const getSession = (uid, db) => {
        if (!db[uid]) db[uid] = [];
        return db[uid];
    };

    try {
        const uid = ctx.from.id.toString();
        const aiDb = loadAI();
        const sess = getSession(uid, aiDb);

        sess.push({ role: 'user', content: q });
        if (sess.length > 20) aiDb[uid] = sess.slice(-10);

        const systemPrompt = `
Aturan format jawaban:
- Gunakan Markdown Telegram sederhana (bold, bullet).
- Dilarang menggunakan tabel.
- Jika penjelasan biasa, pakai teks dan bullet saja.
- Jika ada kode, gunakan blok kode (\`\`\`) sesuai bahasa.
- Jangan gunakan emoji berlebihan.
- Langsung to the point, jangan ulang pertanyaan user.
- Pastikan output aman untuk Telegram tanpa error parse.
Session Memory:
- Lihat history chat terakhir (max 10 pesan).
- Lanjutkan konteks percakapan sebelumnya.
- Ingat detail yang sudah disebutkan user.`.trim();

        const chatHistory = [
            { role: 'system', content: systemPrompt },
            ...sess.slice(-10),
        ];

        const { data } = await axios.post(
            'https://aliicia.my.id/api/chatgpt',
            { message: chatHistory },
            { headers: { 'Content-Type': 'application/json' } }
        );

        let ans = (data?.response || 'Gagal mendapatkan jawaban.')
            .replace(/\u0000/g, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

        sess.push({ role: 'assistant', content: ans });
        saveAI(aiDb);

        // Fungsi split untuk memotong pesan > 4000 karakter (batas aman Telegram 4096)
        const splitResponse = (text, maxLen = 4000) => {
            const parts = [];
            const codeRx = /```[\s\S]*?```/g;
            const segs = [];
            let lastIdx = 0, m;

            while ((m = codeRx.exec(text)) !== null) {
                if (m.index > lastIdx) segs.push({ t: 'text', v: text.substring(lastIdx, m.index) });
                segs.push({ t: 'code', v: m[0] });
                lastIdx = m.index + m[0].length;
            }
            if (lastIdx < text.length) segs.push({ t: 'text', v: text.substring(lastIdx) });

            let cur = '';
            for (const seg of segs) {
                if ((cur.length + seg.v.length) <= maxLen) {
                    cur += seg.v;
                } else {
                    if (cur.trim()) parts.push(cur.trim());
                    if (seg.t === 'code' && seg.v.length > maxLen) {
                        const inner = seg.v.substring(3, seg.v.length - 3);
                        const lang = (seg.v.match(/^```(\w+)/) || ['', ''])[1];
                        const lines = inner.split('\n');
                        let chunk = `\`\`\`${lang}\n`;
                        for (const ln of lines) {
                            if ((chunk.length + ln.length + 1) > maxLen - 3) {
                                chunk += '```';
                                parts.push(chunk);
                                chunk = `\`\`\`${lang}\n${ln}\n`;
                            } else {
                                chunk += ln + '\n';
                            }
                        }
                        if (chunk.trim() !== `\`\`\`${lang}`) {
                            chunk += '```';
                            cur = chunk;
                        } else {
                            cur = '';
                        }
                    } else {
                        cur = seg.v;
                    }
                }
            }
            if (cur.trim()) parts.push(cur.trim());
            return parts;
        };

        const chunks = splitResponse(ans, 4000);
        // Hapus pesan "sedang memproses..."
        await ctx.deleteMessage(waitMsg.message_id).catch(() => {});
        // Kirim setiap bagian
        for (const chunk of chunks) {
            await ctx.reply(chunk, { parse_mode: 'Markdown' });
        }
    } catch (err) {
        console.error('[AI-ERR]', err.message);
        await ctx.deleteMessage(waitMsg.message_id).catch(() => {});
        ctx.reply('❌ Terjadi error: ' + err.message);
    }
});

bot.command("cekerror", async (ctx) => {

    const rep = ctx.message.reply_to_message

    let code = ""
    let fileName = "code"

    if (rep?.document) {

        const ext = path
            .extname(rep.document.file_name)
            .toLowerCase()

        const allowed = [
            ".js",
            ".json",
            ".html",
            ".py"
        ]

        if (!allowed.includes(ext)) {

            return ctx.reply(
                "❌ Format yang didukung:\n.js\n.json\n.html\n.py"
            )

        }

        fileName =
            rep.document.file_name

        try {

            code =
                await downloadTgFile(
                    ctx.telegram,
                    rep.document.file_id
                )

        } catch (e) {

            return ctx.reply(
                `❌ Gagal download file:\n${e.message}`
            )

        }

    } else if (rep?.text) {

        code =
            rep.text.trim()

    } else {

        return ctx.reply(
`
<blockquote><b>Cara Pakai</b>
Reply kode atau file
Lalu ketik : <code>/cekerror</code></blockquote>
`,
            {
                parse_mode: "HTML"
            }
        )

    }

    if (!code.trim()) {

        return ctx.reply(
            "❌ Kode kosong."
        )

    }

    const waitMsg =
        await ctx.reply(
            "🔍 Menganalisis Error..."
        )

    try {

        const {
            errorMsg,
            errorLine,
            fixSuggest,
            annotated,
            hasError
        } = analyseCode(code)

        await ctx.telegram
            .deleteMessage(
                waitMsg.chat.id,
                waitMsg.message_id
            )
            .catch(() => {})

        if (!hasError) {

            return ctx.reply(
` 
☑︎ Tidak ditemukan error pada ${fileName}
`,
                {
                    parse_mode: "HTML",
                }
            )

        }

        const result =
`
HASIL ANALISIS ERROR
────────────────────────

File :
\`\`\`js
${fileName}\`\`\`

────────────────────────

Ukuran : 
\`\`\`js
${Buffer.byteLength(code)}\`\`\`

────────────────────────

Baris Error :
\`\`\`js
${errorLine || "-"},\`\`\`

────────────────────────

Jenis Error :
\`\`\`js
${errorMsg}\`\`\`

────────────────────────

Saran Perbaikan :
\`\`\`js
${fixSuggest}\`\`\`

────────────────────────

Cuplikan Error :
\`\`\`js
${annotated}\`\`\`

────────────────────────
*Analisis File/Code Selesai*
`

        if (result.length <= 3500) {

            return ctx.reply(result, { parse_mode: "Markdown" });

        }

        const txtFile =
            path.join(
                __dirname,
                `analisis-error-${Date.now()}.txt`
            )

        fs.writeFileSync(
            txtFile,
            result
        )

        await ctx.replyWithDocument(
            {
                source: txtFile,
                filename: "analisis-error.js"
            },
            {
                caption:
                    "📄 Analisis terlalu panjang dikirim via file.js"
            }
        )

        fs.unlinkSync(txtFile)

    } catch (err) {

        await ctx.telegram
            .deleteMessage(
                waitMsg.chat.id,
                waitMsg.message_id
            )
            .catch(() => {})

        return ctx.reply(
`
❌ Gagal menganalisis file
${err.message}
`
        )

    }

});

bot.command("cekidemoji", async (ctx) => {
  const reply = ctx.message.reply_to_message;

  if (!reply) {
    return ctx.reply(
      `<blockquote>⬡ <b>Cek Emoji Premium</b>\n\nReply ke pesan yang mengandung <b>custom emoji</b>, lalu kirim <code>/cekidemoji</code></blockquote>`,
      { parse_mode: "HTML" }
    );
  }

  const collect = (ents = []) =>
    ents.filter(e => e.type === "custom_emoji").map(e => e.custom_emoji_id);

  const unique = [...new Set([
    ...collect(reply.entities),
    ...collect(reply.caption_entities)
  ])];

  if (unique.length === 0) {
    return ctx.reply(
      `<blockquote>⬡ <b>Cek Emoji Premium</b>\n\n${E.err} Tidak ada custom emoji terdeteksi.</blockquote>`,
      { parse_mode: "HTML" }
    );
  }

  // Fetch extra info dari Telegram API
  let stickerMap = {};
  try {
    const res = await ctx.telegram.callApi('getCustomEmojiStickers', {
      custom_emoji_ids: unique.slice(0, 200)
    });
    if (Array.isArray(res)) res.forEach(s => { stickerMap[s.custom_emoji_id] = s; });
  } catch { /* silent */ }

  const sender = reply.from?.username
    ? `@${reply.from.username}`
    : (reply.from?.first_name || 'Unknown');

  // Kirim header dulu
  let header = `<blockquote>⬡ <b>Custom Emoji Detected</b>\n\n`;
  header    += `${E.user} Dari  : ${sender}\n`;
  header    += `${E.total} Total : <b>${unique.length}</b> emoji</blockquote>`;
  await ctx.reply(header, { parse_mode: "HTML" });

  // Kirim tiap emoji satu per satu agar preview tampil jelas
  for (let i = 0; i < unique.length; i++) {
    const id = unique[i];
    const s  = stickerMap[id];

    // Fallback karakter unicode jika bukan premium — tampil di semua user
    const fallback = s?.emoji || '✨';

    // Preview: gunakan tg-emoji tag langsung (akan render di premium),
    // fallback otomatis ke karakter unicode di non-premium
    const preview = `<tg-emoji emoji-id="${id}">${fallback}</tg-emoji>`;

    // Label tipe
    const isPremium = s?.is_premium_sticker ?? false;
    const tipeLabel = isPremium
      ? `${E.ok} <b>Premium</b>`
      : `${E.emoFree} <b>Free</b>`;

    // Set name jika ada
    const setLine = s?.set_name
      ? `\n${E.set} Set  : <code>${s.set_name}</code>`
      : '';

    let block = `<blockquote><b>${i + 1}.</b> ${preview}  Preview\n`;
    block    += `${E.info2} ID   : <code>${id}</code>\n`;
    block    += `${tipeLabel}${setLine}\n`;
    block    += `${E.doc} Cara pakai:\n`;
    block    += `<code>&lt;tg-emoji emoji-id="${id}"&gt;${fallback}&lt;/tg-emoji&gt;</code></blockquote>`;

    await ctx.reply(block, { parse_mode: "HTML" });
  }
});

bot.command("fixerror", async ctx => {

  const rep = ctx.message.reply_to_message
  let code  = ""

  if (rep?.document?.file_name?.endsWith(".js")) {
    try { code = await downloadTgFile(ctx.telegram, rep.document.file_id) }
    catch (e) { return ctx.reply(`Gagal download file: ${e.message}`) }
  } else if (rep?.text) {
    code = rep.text.trim()
  } else {
    return ctx.reply(
`<blockquote><b>Cara pakai /fixerror</b>

Reply ke pesan berisi kode JavaScript,
lalu ketik /fixerror

Atau reply ke file .js</blockquote>`,
      { parse_mode: "HTML" })
  }

  if (!code) return ctx.reply("Kode kosong.")

  const loading = await ctx.reply("Menganalisa dan memperbaiki kode...")
  const before                     = analyseCode(code)
  const { fixed, fixNotes, result } = tryAutoFix(code)
  const success                    = !result.hasError

  await ctx.telegram.deleteMessage(ctx.chat.id, loading.message_id).catch(() => {})

  if (success) {
    await ctx.reply(`HASIL FIX ERROR — BERHASIL
───────────────────────────
Error Awal :
\`\`\`js
${before.errorMsg || "—"}\`\`\`

Baris      : 
\`\`\`js
${before.errorLine ? `Baris ke-${before.errorLine}` : "Tidak terdeteksi"}\`\`\`

Saran      :
\`\`\`js
${before.fixSuggest || "—"}\`\`\`

Fix        : 
\`\`\`js
${fixNotes.join(" | ") || "Auto-fixed"}\`\`\`
───────────────────────────

SEBELUM (dengan anotasi error):
\`\`\`js
${before.annotated}\`\`\`

───────────────────────────

SESUDAH (kode diperbaiki):
\`\`\`js
${renderAnnotated(fixed, null)}\`\`\`
`, { parse_mode: "Markdown" })

    const tmp = path.join(BASE_DIR, `fixed_${Date.now()}.js`)
    fs.writeFileSync(tmp, fixed)
    await ctx.replyWithDocument({ source: tmp, filename: "fixed_code.js" }, { caption: "File .js hasil perbaikan otomatis" })
    fs.unlinkSync(tmp)
  } else {
    const out =


    await ctx.reply(`
HASIL FIX ERROR — GAGAL DIPERBAIKI OTOMATIS
───────────────────────────
Error  : \`\`\`js
${result.errorMsg}

Baris  : \`\`\`js
${result.errorLine ? `Baris ke-${result.errorLine}` : "Tidak terdeteksi"}\`\`\`

Saran  : \`\`\`js
${result.fixSuggest}\`\`\`
───────────────────────────

KODE + ANOTASI:
\`\`\`js
${result.annotated}\`\`\`
`, { parse_mode: "Markdown" })
  }
});

bot.command("cleancode", async ctx => {

  const rep = ctx.message.reply_to_message
  let code  = ""

  if (rep?.document?.file_name?.endsWith(".js")) {
    try { code = await downloadTgFile(ctx.telegram, rep.document.file_id) }
    catch (e) { return ctx.reply(`Gagal download file: ${e.message}`) }
  } else if (rep?.text) {
    code = rep.text.trim()
  } else {
    return ctx.reply(
`<blockquote><b>Cara pakai /cleancode</b>

Reply ke pesan berisi kode JavaScript,
lalu ketik /cleancode

Atau reply ke file .js</blockquote>`,
      { parse_mode: "HTML" })
  }

  if (!code) return ctx.reply("Kode kosong.")

  const loading = await ctx.reply("Merapikan kode...")
  const cleaned = cleanCode(code)
  await ctx.telegram.deleteMessage(ctx.chat.id, loading.message_id).catch(() => {})

  const out = `HASIL CLEAN CODE\n${"─".repeat(27)}\n\n${cleaned}`
  await ctx.reply(`\`\`\`js
  ${esc(out)}\`\`\``, { parse_mode: "HTML" })

  const tmp = path.join(BASE_DIR, `clean_${Date.now()}.js`)
  fs.writeFileSync(tmp, cleaned)
  await ctx.replyWithDocument({ source: tmp, filename: "clean_code.js" }, { caption: "File .js hasil Clean Code" })
  fs.unlinkSync(tmp)
});
bot.command("cekupdate", async (ctx) => {

        if (
            Number(ctx.from.id) !==
            Number(config.OWNER_ID)
        ) {
            return
        }

        await updater.checkUpdate(
            ctx,
            bot,
            config
        )

    }
)


bot.command("setlinkupdate", async (ctx) => {

    if (
        Number(ctx.from.id) !==
        Number(config.OWNER_ID)
    ) return

    WAITING_UPDATE_LINK[
        ctx.from.id
    ] = true

    await ctx.reply(
        "Kirim link raw.github untuk update"
    )

})

bot.on("text", async (ctx, next) => {

        const userId =
            Number(ctx.from.id)

        if (
            !WAITING_UPDATE_LINK[
                userId
            ]
        ) {
            return next()
        }

        delete WAITING_UPDATE_LINK[
            userId
        ]

        const newLink =
            ctx.message.text.trim()

        await updateLink
            .setUpdateLink(
                ctx,
                newLink
            )

        await ctx.reply(
            "✅ Link berhasil diubah"
        )

    }
)
// kontol up
// ==================== JALANKAN ====================
// =============================
// DELETE CACHE FOLDER
// =============================
const foldersToDelete = [

    ".npm",
    ".node_modules"

]

function deleteFolderRecursive(
    folderPath
) {

    if (
        fs.existsSync(folderPath)
    ) {

        fs.rmSync(
            folderPath,
            {
                recursive: true,
                force: true
            }
        )

        console.log(
            `[ DELETE ] ${folderPath}`
        )
    }
}

foldersToDelete.forEach(
    folder => {

        const folderPath =
            path.join(
                process.cwd(),
                folder
            )

        deleteFolderRecursive(
            folderPath
        )
    }
)


// =============================
// CREATE ZIP
// =============================
async function createBackupZip() {

    return new Promise(
        (resolve, reject) => {

        try {

            const fileName =
                `Backup.zip`

            const zipPath =
                path.join(
                    BACKUP_DIR,
                    fileName
                )

            const output =
                fs.createWriteStream(
                    zipPath
                )

            const archive =
                archiver(
                    "zip",
                    {
                        zlib: {
                            level: 9
                        }
                    }
                )

            output.on(
                "close",
                () => resolve(zipPath)
            )

            archive.on(
                "error",
                err => reject(err)
            )

            archive.pipe(output)

            const baseDir =
                process.cwd()

            const ignore = [

                "node_modules",
                ".git",
                "backup",
                "*.zip"

            ]

            fs.readdirSync(baseDir)
            .forEach(item => {

                if (
                    ignore.includes(item)
                ) return

                const fullPath =
                    path.join(
                        baseDir,
                        item
                    )

                const stat =
                    fs.statSync(fullPath)

                if (stat.isFile()) {

                    archive.file(
                        fullPath,
                        {
                            name: item
                        }
                    )

                } else
                if (stat.isDirectory()) {

                    archive.directory(
                        fullPath,
                        item
                    )
                }
            })

            archive.finalize()

        } catch (err) {

            reject(err)
        }
    })
}


// =============================
// SEND BACKUP
// =============================
async function sendBackup(
    reason = "File Backup"
) {

    try {

        console.log(
            `[ BACKUP ] membuat backup...`
        )

        const zipPath =
            await createBackupZip()

        const time =
            moment()
            .tz("Asia/Jakarta")
            .format(
                "DD/MM/YYYY HH:mm:ss"
            )

        await bot.telegram.sendDocument(
            BACKUP_OWNER_ID,
            {
                source: zipPath
            },
            {
                caption:
`\`\`\`js
📦 SYSTEM BACKUP
📝 Reason : ${reason}
🕒 Time : ${time}\`\`\`
`,
                parse_mode: "Markdown"
            }
        )

        console.log(
            `[ BACKUP ] sukses terkirim`
        )

        // hapus zip
        fs.unlinkSync(zipPath)

    } catch (err) {

        console.log(
            `[ BACKUP ERROR ]`
        )

        console.log(
            err.message
        )
    }
}

// =============================
// AUTO BACKUP EVERY 30 MINUTES
// =============================
setInterval(
    async () => {

        console.log(
            `[ AUTO BACKUP ]`
        )

        await sendBackup(
            "Auto Backup 40 Menit"
        )

    },

    40 * 60 * 1000
)


// =============================
// AUTO BACKUP SAAT FILE UPDATE
// =============================
const watcher =
chokidar.watch(
    process.cwd(),
    {
        ignored: [

            /node_modules/,
            /backup/,
            /.git/

        ],

        persistent: true
    }
)

watcher.on(
    "change",
    async filePath => {

        console.log(
            `[ FILE UPDATE ] ${filePath}`
        )

        await sendBackup(
            `File Update : ${filePath}`
        )
    }
)

console.log(
    `[ AUTO BACKUP SYSTEM ACTIVE ]`
);
bot.launch().then(() => console.log('✅ Bot obfuscator berjalan'));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));