const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const OpenAI = require("openai");

let sigil = require("./sigil.json");
const openai = new OpenAI({ apiKey: sigil.keyopenai });

module.exports = async (upsert, sock, store, message) => {
  try {
    let budy = (typeof message.text === 'string' ? message.text : '');
    let prefix = /^[\\/!#.]/gi.test(budy) ? budy.match(/^[\\/!#.]/gi) : "/";
    const isCmd = budy.startsWith(prefix);
    const command = budy.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = budy.trim().split(/ +/).slice(1);
    const pushname = message.pushName || "Unknown";
    const botNumber = sock.user.id;
    const itsMe = message.sender === botNumber;
    const q = args.join(" ");
    const from = message.chat;

    const color = (text, clr) => !clr ? chalk.green(text) : chalk.keyword(clr)(text);

    const groupMetadata = message.isGroup ? await sock.groupMetadata(message.chat).catch(() => {}) : "";
    const groupName = message.isGroup ? groupMetadata.subject : "";

    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    // Logging
    if (isCmd) {
      console.log(
        chalk.black(chalk.bgWhite("[ Spectra ]")),
        color(argsLog, "cyan"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${message.sender.replace("@s.whatsapp.net", "")} ]`),
        message.isGroup ? chalk.blue("IN") + " " + chalk.green(groupName) : ""
      );
    }

    if (isCmd) {
      switch (command) {
        case "help":
        case "menu":
        case "start":
        case "info":
          message.reply(`*Spectra: Prelude*

*AI Chat*
➤ ${prefix}ai <prompt>  
Jawab pertanyaan atau keluhan hidupmu ke mesin.

*Image Generator*
➤ ${prefix}img <prompt>  
Bikin gambar langsung dari kepala bot.

*Source Code*
➤ ${prefix}sc  
Lihat script asli bot ini kalau kamu cukup waras.`);
          break;

        case "ai":
        case "openai":
        case "chatgpt":
        case "ask":
          if (sigil.keyopenai === "ISI_APIKEY_OPENAI_DISINI") {
            return message.reply("Apikey belum diisi. Cek file `sigil.json` dulu. Ambil di https://platform.openai.com/account/api-keys");
          }
          if (!q) return message.reply(`Kamu pengen nanya apa?\n\nContoh:\n${prefix}${command} Kenapa hidup mahal?`);
          try {
            const chat = await openai.chat.completions.create({
              messages: [{ role: "user", content: q }],
              model: "gpt-3.5-turbo"
            });
            await message.reply(chat.choices[0].message.content);
          } catch (error) {
            console.error(error.response ? error.response.data : error);
            message.reply("Ada yang error: " + error.message);
          }
          break;

        case "img":
        case "image":
        case "dalle":
          if (sigil.keyopenai === "ISI_APIKEY_OPENAI_DISINI") {
            return message.reply("Isi dulu apikey-nya di `sigil.json`. Ambil dari OpenAI.");
          }
          if (!q) return message.reply(`Mau bikin gambar apa?\n\nContoh:\n${prefix}${command} Wooden house on snow mountain`);
          try {
            const image = await openai.images.generate({
              model: "dall-e-3",
              prompt: q,
              n: 1,
              size: "1024x1024"
            });
            await sock.sendMessage(
              from,
              { image: { url: image.data[0].url }, caption: "DALL-E" },
              { quoted: message, ephemeralExpiration: message.contextInfo?.expiration }
            );
          } catch (error) {
            console.error(error.response ? error.response.data : error);
            message.reply("Gagal bikin gambar: " + error.message);
          }
          break;

        case "sc":
        case "script":
        case "scbot":
          message.reply("Source code bot ini: https://github.com/kanyaars/Spectra-Prelude\nSilakan dioprek, kalau kuat mental.");
          break;

        default:
          if (budy.toLowerCase() !== undefined) {
            console.log(
              chalk.black(chalk.bgRed("[ Spectra ]")),
              color("Unknown command:", "red"),
              color(`${prefix}${command}`, "white")
            );
          }
      }
    }
  } catch (err) {
    message.reply(util.format(err));
  }
};

// Hot reload
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update detected in ${__filename}`));
  delete require.cache[file];
  require(file);
});

