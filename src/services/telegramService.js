/**
 * Telegram Bot API Service for Prox / Promax Marketing
 * Handles instant lead collection dispatch directly to specified Telegram chat or channel
 */

// Helper to escape HTML characters for Telegram HTML parse_mode
export const escapeTelegramHtml = (text = '') => {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Get active Telegram credentials from environment variables or custom CMS settings
 */
export const getTelegramConfig = (customSettings = {}) => {
  const envToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const envChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  const botToken = customSettings.botToken?.trim() || envToken?.trim() || '';
  const chatId = customSettings.chatId?.trim() || envChatId?.trim() || '';

  return {
    botToken,
    chatId,
    isConfigured: Boolean(botToken && chatId)
  };
};

/**
 * Send lead details to Telegram via Bot API sendMessage
 * @param {Object} lead - { name, phone, service, comment, source }
 * @param {Object} settings - optional { botToken, chatId }
 * @returns {Promise<{ success: boolean, data?: any, error?: string, simulated?: boolean }>}
 */
export const sendLeadToTelegram = async (lead, settings = {}) => {
  const { botToken, chatId, isConfigured } = getTelegramConfig(settings);

  // If not configured, gracefully simulate success and record warning
  if (!isConfigured) {
    console.info(
      'ℹ️ [Telegram Bot Service] Bot Token yoki Chat ID kiritilmagan. ' +
      'Lead mahalliy tizimda saqlandi. Telegram integratsiyasini faollashtirish uchun .env faylida ' +
      'VITE_TELEGRAM_BOT_TOKEN va VITE_TELEGRAM_CHAT_ID ni kiriting yoki Admin Panel -> "Telegram Bot API" orqali sozlang.'
    );
    return {
      success: true,
      simulated: true,
      message: 'Lead saved locally. Telegram credentials not configured yet.'
    };
  }

  // Format timestamp (Tashkent Time UTC+5)
  const now = new Date();
  const formattedTime = now.toLocaleString('uz-UZ', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const clientName = escapeTelegramHtml(lead.name || 'Noma\'lum mijoz');
  const clientPhone = escapeTelegramHtml(lead.phone || 'Kiritilmagan');
  const chosenService = escapeTelegramHtml(lead.service || 'Belgilanmagan');
  const clientComment = escapeTelegramHtml(lead.comment?.trim() || 'Mavjud emas');
  const source = escapeTelegramHtml(lead.source || 'Veb-sayt arizasi');

  // Stylish, high-readability HTML message
  const telegramMessage = [
    `🚀 <b>YANGI ARIZA QABUL QILINDI!</b>`,
    `<i>Prox / Promax Marketing Web Platform</i>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Mijoz:</b> ${clientName}`,
    `📞 <b>Telefon:</b> <code>${clientPhone}</code>`,
    `💼 <b>Xizmat / Kurs:</b> <b>${chosenService}</b>`,
    `📝 <b>Izoh / Xabar:</b> ${clientComment}`,
    `🌐 <b>Manba:</b> ${source}`,
    `⏱ <b>Vaqt:</b> ${formattedTime} (Toshkent vaqti)`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `⚡️ <i>Tezkor aloqaga chiqing!</i>`
  ].join('\n');

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.ok) {
      const errorDescription = responseData?.description || 'Telegram API yuborishda xatolik yuz berdi';
      console.error('❌ [Telegram Bot API Error]:', errorDescription);
      return {
        success: false,
        error: errorDescription
      };
    }

    return {
      success: true,
      messageId: responseData.result?.message_id,
      data: responseData
    };
  } catch (error) {
    console.error('❌ [Telegram Fetch Network Error]:', error);
    return {
      success: false,
      error: error.message || 'Tarmoq xatosi tufayli Telegramga yuborilmadi'
    };
  }
};

/**
 * Send a verification test message to Telegram
 */
export const testTelegramConnection = async (settings = {}) => {
  const { botToken, chatId } = getTelegramConfig(settings);

  if (!botToken || !chatId) {
    throw new Error('Bot Token va Chat ID to\'liq kiritilishi shart!');
  }

  const testMessage = [
    `🔔 <b>TEST XABARI - TELEGRAM BOT INTEGRATSIYASI</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `✅ Ulanish muvaffaqiyatli o'rnatildi!`,
    `🏢 <b>Loyiha:</b> Prox / Promax Marketing Agency`,
    `⏱ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `💡 <i>Endi saytdan tushgan barcha arizalar to'g'ridan-to'g'ri ushbu chatga kelib tushadi.</i>`
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: testMessage,
      parse_mode: 'HTML'
    })
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data?.description || 'Telegram serveri xabarni rad etdi');
  }

  return data;
};
