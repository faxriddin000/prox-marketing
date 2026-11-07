import React, { useState } from 'react';
import {
  LayoutDashboard, Users, FileText, DollarSign, Image, Briefcase,
  Phone, Send, RotateCcw, LogOut, CheckCircle2, AlertTriangle,
  Plus, Trash2, Edit3, Save, Search, Filter, ExternalLink, Shield,
  Layers, Lock, Eye, EyeOff, Bot, Sparkles, Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';

export const AdminDashboard = ({ onBackToSite }) => {
  const { currentUser, isAdmin, isEditor, logout, canEditPricing, canManageSettings, canDeleteLeads } = useAuth();
  const {
    data, resetToDefaults,
    updateHero, updateAbout, updateServices, updateServiceItem, addServiceItem, deleteServiceItem,
    updateTariffs, updatePartners, addPartner, deletePartner,
    updatePortfolio, updateTeam, updateContact, updateTelegramSettings,
    updateBlog, updateLeadStatus, deleteLead
  } = useCMS();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState('');
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Leads filter & search
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('ALL');

  // Hero state
  const [heroForm, setHeroForm] = useState({
    titleUz: data.hero.title.uz,
    titleRu: data.hero.title.ru,
    subtitleUz: data.hero.subtitle.uz,
    subtitleRu: data.hero.subtitle.ru,
    badgeUz: data.hero.badge.uz,
    badgeRu: data.hero.badge.ru,
    ctaUz: data.hero.ctaButton.uz,
    ctaRu: data.hero.ctaButton.ru,
    bannerImage: data.hero.bannerImage
  });

  // Contact state
  const [contactForm, setContactForm] = useState({
    phone: data.contact.phone,
    telegram: data.contact.telegram,
    telegramUrl: data.contact.telegramUrl,
    instagram: data.contact.instagram,
    instagramUrl: data.contact.instagramUrl,
    address: data.contact.address || '',
    mapIframeUrl: data.contact.mapIframeUrl || ''
  });

  // Telegram settings state
  const [tgSettings, setTgSettings] = useState({
    botToken: data.telegramSettings.botToken || '',
    chatId: data.telegramSettings.chatId || '',
    directFallbackUser: data.telegramSettings.directFallbackUser || 'manager_prox'
  });
  const [tgTestStatus, setTgTestStatus] = useState('');

  // Service editor state
  const [serviceCategory, setServiceCategory] = useState('smm');
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [newServiceModalOpen, setNewServiceModalOpen] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({
    titleUz: '',
    titleRu: '',
    descUz: '',
    descRu: '',
    icon: 'Sparkles'
  });

  // Partner editor state
  const [newPartnerForm, setNewPartnerForm] = useState({
    name: '',
    industryUz: '',
    industryRu: '',
    logo: ''
  });

  // Tariffs editor state
  const [smmPricing, setSmmPricing] = useState(data.tariffs.smm);
  const [mktPrice, setMktPrice] = useState(data.tariffs.marketing.startingPrice || '$2000');

  const showNotice = (msg) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(''), 4000);
  };

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateHero({
      title: { ...data.hero.title, uz: heroForm.titleUz, ru: heroForm.titleRu },
      subtitle: { ...data.hero.subtitle, uz: heroForm.subtitleUz, ru: heroForm.subtitleRu },
      badge: { ...data.hero.badge, uz: heroForm.badgeUz, ru: heroForm.badgeRu },
      ctaButton: { ...data.hero.ctaButton, uz: heroForm.ctaUz, ru: heroForm.ctaRu },
      bannerImage: heroForm.bannerImage
    });
    showNotice("Bosh sahifa banner ma'lumotlari muvaffaqiyatli saqlandi!");
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    updateContact({
      ...contactForm,
      phoneClean: contactForm.phone.replace(/\s+/g, '')
    });
    showNotice("Aloqa ma'lumotlari va xarita yangilandi!");
  };

  const handleSaveTelegram = (e) => {
    e.preventDefault();
    updateTelegramSettings(tgSettings);
    showNotice("Telegram Bot sozlamalari saqlandi!");
  };

  const handleTestTelegram = async () => {
    if (!tgSettings.botToken || !tgSettings.chatId) {
      setTgTestStatus("Iltimos, Bot Token va Chat ID ni kiriting!");
      return;
    }
    setTgTestStatus("Yuborilmoqda...");
    try {
      const res = await fetch(`https://api.telegram.org/bot${tgSettings.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgSettings.chatId,
          text: `🔔 *Prox Marketing Agency — Test Xabari*\n\nAdmin panel orqali ulanish muvaffaqiyatli tekshirildi!`,
          parse_mode: 'Markdown'
        })
      });
      const json = await res.json();
      if (json.ok) {
        setTgTestStatus("✓ Xabar muvaffaqiyatli yuborildi!");
      } else {
        setTgTestStatus(`Xatolik: ${json.description || 'Telegram rad etdi'}`);
      }
    } catch (err) {
      setTgTestStatus(`Tarmoq xatosi: ${err.message}`);
    }
  };

  const handleSavePricing = () => {
    if (!canEditPricing) {
      alert("Faqat Bosh Administrator narxlarni o'zgartirishi mumkin!");
      return;
    }
    updateTariffs({
      smm: smmPricing,
      marketing: {
        ...data.tariffs.marketing,
        startingPrice: mktPrice
      }
    });
    showNotice("Tariflar va narxlar darhol yangilandi!");
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newServiceForm.titleUz) return;
    addServiceItem(serviceCategory, {
      titleUz: newServiceForm.titleUz,
      titleRu: newServiceForm.titleRu || newServiceForm.titleUz,
      descUz: newServiceForm.descUz,
      descRu: newServiceForm.descRu || newServiceForm.descUz,
      icon: newServiceForm.icon || 'Sparkles'
    });
    setNewServiceForm({ titleUz: '', titleRu: '', descUz: '', descRu: '', icon: 'Sparkles' });
    setNewServiceModalOpen(false);
    showNotice("Yangi xizmat kartochkasi qo'shildi!");
  };

  const handleAddPartner = (e) => {
    e.preventDefault();
    if (!newPartnerForm.name) return;
    addPartner({
      name: newPartnerForm.name,
      industryUz: newPartnerForm.industryUz,
      industryRu: newPartnerForm.industryRu || newPartnerForm.industryUz,
      logo: newPartnerForm.logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&h=80&q=80'
    });
    setNewPartnerForm({ name: '', industryUz: '', industryRu: '', logo: '' });
    showNotice("Yangi hamkor logotipi qo'shildi!");
  };

  // Filtered Leads
  const filteredLeads = (data.leads || []).filter((lead) => {
    const matchSearch =
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch) ||
      (lead.comment && lead.comment.toLowerCase().includes(leadSearch.toLowerCase()));
    const matchStatus = leadStatusFilter === 'ALL' || lead.status === leadStatusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pt-16">
      {/* Top Admin Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            CMS
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Prox Marketing Admin</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isAdmin ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                {isAdmin ? "To'liq Administrator" : "Kontent-menejer"}
              </span>
            </h1>
            <span className="text-[10px] text-slate-400 font-mono">proxmarketing.uz</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setResetModalOpen(true)}
            className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Texnik topshiriq standart holatiga qaytarish"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Standart holatga qaytarish</span>
          </button>

          <button
            onClick={onBackToSite}
            className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Saytga qaytish</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={logout}
            className="text-xs text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Chiqish"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Success alert banner */}
      {saveSuccessNotice && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Layout Grid: Sidebar Navigation + Main Panel Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800 p-4 shrink-0 space-y-1">
          {[
            { id: 'dashboard', label: 'Umumiy hisobot', icon: LayoutDashboard },
            { id: 'leads', label: `Lidlar / Arizalar (${data.leads?.length || 0})`, icon: Users },
            { id: 'hero', label: 'Bosh sahifa Banner', icon: Sparkles },
            { id: 'services', label: 'Xizmatlar (SMM, MKT, IT)', icon: Layers },
            { id: 'tariffs', label: 'Tariflar va Narxlar', icon: DollarSign, protected: !isAdmin },
            { id: 'partners', label: 'Hamkorlar Logotiplari', icon: Building2 },
            { id: 'portfolio', label: 'Portfolio / Keyslar', icon: Briefcase },
            { id: 'team', label: "Jamoa a'zolari", icon: Users },
            { id: 'contact', label: 'Aloqa va Xarita', icon: Phone },
            { id: 'telegram', label: 'Telegram Bot API', icon: Bot, protected: !isAdmin },
            { id: 'blog', label: 'Blog / Yangiliklar', icon: FileText }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </span>
                {item.protected && <Lock className="w-3 h-3 text-slate-500" />}
              </button>
            );
          })}
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Boshqaruv markazi</h2>
                <p className="text-xs text-slate-400">Prox Marketing tizimining umumiy holati va faolligi</p>
              </div>

              {/* Stats metric cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs text-slate-400 font-semibold block mb-1">Jami arizalar</span>
                  <span className="text-3xl font-extrabold text-white">{data.leads?.length || 0}</span>
                  <span className="text-[11px] text-indigo-400 block mt-2">Barcha qabul qilingan lidlar</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs text-slate-400 font-semibold block mb-1">Yangi so'rovlar</span>
                  <span className="text-3xl font-extrabold text-amber-400">
                    {data.leads?.filter(l => l.status === 'Yangi').length || 0}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-2">Kutilayotgan qayta aloqa</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs text-slate-400 font-semibold block mb-1">Faol xizmatlar</span>
                  <span className="text-3xl font-extrabold text-emerald-400">
                    {(data.services?.smm?.length || 0) + (data.services?.marketing?.length || 0) + (data.services?.it?.length || 0)}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-2">SMM (6), Marketing (7), IT (6)</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs text-slate-400 font-semibold block mb-1">Hamkorlar soni</span>
                  <span className="text-3xl font-extrabold text-cyan-400">{data.partners?.length || 0}</span>
                  <span className="text-[11px] text-slate-400 block mt-2">Rasmiy logotiplar</span>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">So'nggi kelib tushgan arizalar</h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Barcha lidlarni ko'rish &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2.5 px-3">Vaqt</th>
                        <th className="py-2.5 px-3">Mijoz</th>
                        <th className="py-2.5 px-3">Telefon</th>
                        <th className="py-2.5 px-3">Xizmat</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {(data.leads || []).slice(0, 5).map((lead) => (
                        <tr key={lead.id}>
                          <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{lead.date}</td>
                          <td className="py-3 px-3 font-semibold text-white">{lead.name}</td>
                          <td className="py-3 px-3">{lead.phone}</td>
                          <td className="py-3 px-3 text-indigo-300">{lead.service}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LEADS CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Kelib tushgan arizalar (CRM)</h2>
                  <p className="text-xs text-slate-400">Sayt va bot orqali murojaat qilgan potensial mijozlar</p>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Ism yoki telefon..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ALL">Barcha statuslar</option>
                    <option value="Yangi">Yangi</option>
                    <option value="Jarayonda">Jarayonda</option>
                    <option value="Muvaffaqiyatli">Muvaffaqiyatli</option>
                    <option value="Bekor qilingan">Bekor qilingan</option>
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-950/70 border-b border-slate-800 text-slate-400">
                        <th className="py-3 px-4">Sana / Vaqt</th>
                        <th className="py-3 px-4">Mijoz Ismi</th>
                        <th className="py-3 px-4">Telefon</th>
                        <th className="py-3 px-4">Xizmat turi</th>
                        <th className="py-3 px-4">Izoh</th>
                        <th className="py-3 px-4">Holat (Status)</th>
                        {canDeleteLeads && <th className="py-3 px-4 text-right">Amal</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-slate-500">
                            Hech qanday ariza topilmadi.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-850/60">
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{lead.date}</td>
                            <td className="py-3.5 px-4 font-bold text-white">{lead.name}</td>
                            <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">
                              <a href={`tel:${lead.phone}`} className="hover:text-indigo-400">
                                {lead.phone}
                              </a>
                            </td>
                            <td className="py-3.5 px-4 text-indigo-300">{lead.service}</td>
                            <td className="py-3.5 px-4 max-w-xs truncate text-slate-400" title={lead.comment}>
                              {lead.comment || '—'}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-lg border bg-slate-950 cursor-pointer focus:outline-none ${
                                  lead.status === 'Yangi'
                                    ? 'text-amber-400 border-amber-500/30'
                                    : lead.status === 'Jarayonda'
                                    ? 'text-sky-400 border-sky-500/30'
                                    : lead.status === 'Muvaffaqiyatli'
                                    ? 'text-emerald-400 border-emerald-500/30'
                                    : 'text-rose-400 border-rose-500/30'
                                }`}
                              >
                                <option value="Yangi">Yangi</option>
                                <option value="Jarayonda">Jarayonda</option>
                                <option value="Muvaffaqiyatli">Muvaffaqiyatli</option>
                                <option value="Bekor qilingan">Bekor qilingan</option>
                              </select>
                            </td>
                            {canDeleteLeads && (
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  onClick={() => {
                                    if (confirm("Ushbu arizani o'chirmoqchimisiz?")) {
                                      deleteLead(lead.id);
                                    }
                                  }}
                                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                                  title="O'chirish"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HERO BANNER */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Bosh sahifa Banner boshqaruvi</h2>
                <p className="text-xs text-slate-400">Hero sarlavhasi, ta'rifi, tugma matnlari va rasm URL manzili</p>
              </div>

              <form onSubmit={handleSaveHero} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Badge matni (UZ):
                    </label>
                    <input
                      type="text"
                      value={heroForm.badgeUz}
                      onChange={(e) => setHeroForm({ ...heroForm, badgeUz: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Badge matni (RU):
                    </label>
                    <input
                      type="text"
                      value={heroForm.badgeRu}
                      onChange={(e) => setHeroForm({ ...heroForm, badgeRu: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Asosiy Sarlavha (UZ):
                  </label>
                  <textarea
                    rows="2"
                    value={heroForm.titleUz}
                    onChange={(e) => setHeroForm({ ...heroForm, titleUz: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Asosiy Sarlavha (RU):
                  </label>
                  <textarea
                    rows="2"
                    value={heroForm.titleRu}
                    onChange={(e) => setHeroForm({ ...heroForm, titleRu: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Qisqacha ta'rif (UZ):
                  </label>
                  <textarea
                    rows="3"
                    value={heroForm.subtitleUz}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitleUz: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Qisqacha ta'rif (RU):
                  </label>
                  <textarea
                    rows="3"
                    value={heroForm.subtitleRu}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitleRu: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      CTA Tugmasi matni (UZ):
                    </label>
                    <input
                      type="text"
                      value={heroForm.ctaUz}
                      onChange={(e) => setHeroForm({ ...heroForm, ctaUz: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      CTA Tugmasi matni (RU):
                    </label>
                    <input
                      type="text"
                      value={heroForm.ctaRu}
                      onChange={(e) => setHeroForm({ ...heroForm, ctaRu: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Banner Rasm URL (Mockup):
                  </label>
                  <input
                    type="url"
                    value={heroForm.bannerImage}
                    onChange={(e) => setHeroForm({ ...heroForm, bannerImage: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>O'zgarishlarni saqlash</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB: SERVICES MANAGER */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Xizmatlar boshqaruvi</h2>
                  <p className="text-xs text-slate-400">SMM (6 ta), Marketing (7 ta) va IT (6 ta) xizmatlarini tahrirlash</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex">
                    <button
                      onClick={() => setServiceCategory('smm')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${serviceCategory === 'smm' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
                    >
                      SMM ({data.services.smm.length})
                    </button>
                    <button
                      onClick={() => setServiceCategory('marketing')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${serviceCategory === 'marketing' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                    >
                      Marketing ({data.services.marketing.length})
                    </button>
                    <button
                      onClick={() => setServiceCategory('it')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${serviceCategory === 'it' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
                    >
                      IT ({data.services.it.length})
                    </button>
                  </div>

                  <button
                    onClick={() => setNewServiceModalOpen(true)}
                    className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi xizmat</span>
                  </button>
                </div>
              </div>

              {/* Service Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(data.services[serviceCategory] || []).map((service) => (
                  <div
                    key={service.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{service.id}</span>
                        <button
                          onClick={() => {
                            if (confirm("Rostdan ham ushbu xizmatni o'chirmoqchimisiz?")) {
                              deleteServiceItem(serviceCategory, service.id);
                            }
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-bold text-white text-sm mb-1">{service.titleUz}</h4>
                      <p className="text-[11px] text-slate-400 mb-3">{service.descUz}</p>

                      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
                        <span className="font-medium text-slate-400">RU: </span>
                        <span>{service.titleRu}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TARIFFS & PRICING */}
          {activeTab === 'tariffs' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Tariflar va Narxlar boshqaruvi</h2>
                <p className="text-xs text-slate-400">SMM oylik paketlari narxlari va Marketing boshlang'ich narxini real vaqtda tahrirlash</p>
              </div>

              {!canEditPricing && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{t('admin_role_restriction')}</span>
                </div>
              )}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
                  8.1 SMM Xizmati Paketlari Narxlari
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {smmPricing.map((item, idx) => (
                    <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-bold text-white block">{item.durationUz}</span>
                      <div>
                        <label className="text-[11px] text-slate-400 block">Narx (oylik):</label>
                        <input
                          type="text"
                          disabled={!canEditPricing}
                          value={item.price}
                          onChange={(e) => {
                            const updated = [...smmPricing];
                            updated[idx] = { ...updated[idx], price: e.target.value };
                            setSmmPricing(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block">Chegirma / Foyda izohi:</label>
                        <input
                          type="text"
                          disabled={!canEditPricing}
                          value={item.savingsUz || ''}
                          onChange={(e) => {
                            const updated = [...smmPricing];
                            updated[idx] = { ...updated[idx], savingsUz: e.target.value };
                            setSmmPricing(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400 mb-3">
                    8.2 Marketing Xizmati Narxi
                  </h3>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Boshlang'ich narx:</label>
                    <input
                      type="text"
                      disabled={!canEditPricing}
                      value={mktPrice}
                      onChange={(e) => setMktPrice(e.target.value)}
                      className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white font-bold"
                    />
                  </div>
                </div>

                {canEditPricing && (
                  <button
                    onClick={handleSavePricing}
                    className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Narxlarni saqlash va yangilash</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB: PARTNERS LOGOS */}
          {activeTab === 'partners' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Hamkorlar logotiplari</h2>
                  <p className="text-xs text-slate-400">Hamkor va mijozlar ro'yxatini boshqarish</p>
                </div>
              </div>

              {/* Add Partner Form */}
              <form onSubmit={handleAddPartner} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Yangi hamkor qo'shish</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Kompaniya nomi (masalan: Apex Retail)"
                    value={newPartnerForm.name}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, name: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Sohasi (masalan: Retail & Savdo)"
                    value={newPartnerForm.industryUz}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, industryUz: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="url"
                    placeholder="Logotip rasm URL"
                    value={newPartnerForm.logo}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, logo: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Qo'shish</span>
                </button>
              </form>

              {/* Partners Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {(data.partners || []).map((p) => (
                  <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center relative group">
                    <button
                      onClick={() => {
                        if (confirm("Ushbu hamkorni o'chirmoqchimisiz?")) {
                          deletePartner(p.id);
                        }
                      }}
                      className="absolute top-2 right-2 text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-full h-16 bg-slate-950 rounded-xl mb-3 flex items-center justify-center p-2">
                      <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="font-bold text-white text-xs">{p.name}</span>
                    <span className="text-[11px] text-slate-400">{p.industryUz}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PORTFOLIO & KEYSLAR */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 max-w-3xl animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Portfolio / Keyslar sozlamalari</h2>
                <p className="text-xs text-slate-400">Navigatsiyada ko'rinish va "Tez orada" holatini boshqarish</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                {/* Toggle Navbar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white">Navigatsiya menyusida ko'rsatish</h4>
                    <p className="text-xs text-slate-400">Sayt tepasidagi menyuda "Keyslar" tugmasini yoqish yoki yashirish</p>
                  </div>
                  <button
                    onClick={() => updatePortfolio({ showInNav: !data.portfolio.showInNav })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      data.portfolio.showInNav ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      data.portfolio.showInNav ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Toggle Coming Soon Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">"Tez orada" (Coming Soon) rejimini yoqish</h4>
                    <p className="text-xs text-slate-400">TZ bo'yicha boshlang'ichda 0 ta keys va zamonaviy "Tez orada" banneri ko'rsatiladi</p>
                  </div>
                  <button
                    onClick={() => updatePortfolio({ comingSoonMode: !data.portfolio.comingSoonMode })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      data.portfolio.comingSoonMode ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      data.portfolio.comingSoonMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TEAM MEMBERS */}
          {activeTab === 'team' && (
            <div className="space-y-6 max-w-3xl animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Jamoa a'zolari boshqaruvi</h2>
                <p className="text-xs text-slate-400">TZ bo'yicha sukut bo'yicha yashirin, tayyor modul orqali yoqish mumkin</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">"Biz haqimizda" sahifasida jamoani ko'rsatish</h4>
                    <p className="text-xs text-slate-400">Ushbu tugmani yoqsangiz, jamoa bloklari darhol saytda paydo bo'ladi</p>
                  </div>
                  <button
                    onClick={() => updateTeam({ showOnAbout: !data.team.showOnAbout })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      data.team.showOnAbout ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      data.team.showOnAbout ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CONTACT & MAP */}
          {activeTab === 'contact' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Aloqa ma'lumotlari va Xarita</h2>
                <p className="text-xs text-slate-400">Telefon, Telegram, Instagram va ofis xaritasi manzili</p>
              </div>

              <form onSubmit={handleSaveContact} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Telefon raqam:
                    </label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Telegram username:
                    </label>
                    <input
                      type="text"
                      value={contactForm.telegram}
                      onChange={(e) => setContactForm({ ...contactForm, telegram: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Instagram username:
                    </label>
                    <input
                      type="text"
                      value={contactForm.instagram}
                      onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Ofis jismoniy manzili (agar bo'lsa):
                    </label>
                    <input
                      type="text"
                      placeholder="Toshkent sh., Chilonzor tumani..."
                      value={contactForm.address}
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Google Xarita Iframe URL (agar manzil kiritilsa):
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    value={contactForm.mapIframeUrl}
                    onChange={(e) => setContactForm({ ...contactForm, mapIframeUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-slate-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    TZ bo'yicha hozircha manzil yo'qligi sababli bo'sh. Manzil yoki iframe kiritilishi bilan saytda avtomatik paydo bo'ladi.
                  </p>
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Aloqa ma'lumotlarini saqlash</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB: TELEGRAM BOT INTEGRATION */}
          {activeTab === 'telegram' && (
            <div className="space-y-6 max-w-3xl animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Telegram Bot API integratsiyasi</h2>
                <p className="text-xs text-slate-400">Saytdan tushgan arizalarni Telegram guruhingizga real vaqtda yetkazish</p>
              </div>

              {!canManageSettings && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  {t('admin_role_restriction')}
                </div>
              )}

              <form onSubmit={handleSaveTelegram} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telegram Bot Token:
                  </label>
                  <input
                    type="password"
                    disabled={!canManageSettings}
                    placeholder="1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ..."
                    value={tgSettings.botToken}
                    onChange={(e) => setTgSettings({ ...tgSettings, botToken: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telegram Chat ID / Guruh ID:
                  </label>
                  <input
                    type="text"
                    disabled={!canManageSettings}
                    placeholder="-100123456789 yoki shaxsiy ID..."
                    value={tgSettings.chatId}
                    onChange={(e) => setTgSettings({ ...tgSettings, chatId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {tgTestStatus && (
                  <div className="p-3 rounded-xl bg-slate-950 text-xs text-indigo-300 border border-slate-800 font-mono">
                    {tgTestStatus}
                  </div>
                )}

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={!canManageSettings}
                    className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Sozlamalarni saqlash</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTestTelegram}
                    className="py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider text-sky-300 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ulanishni tekshirish (Test yuborish)</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: BLOG / YANGILIKLAR */}
          {activeTab === 'blog' && (
            <div className="space-y-6 max-w-3xl animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Blog va Yangiliklar moduli</h2>
                <p className="text-xs text-slate-400">Kelajakda maqolalar va yangiliklar bo'limini faollashtirish</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Blog modulini faollashtirish</h4>
                    <p className="text-xs text-slate-400">Saytda yangiliklar sahifasini ochish</p>
                  </div>
                  <button
                    onClick={() => updateBlog({ enabled: !data.blog?.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      data.blog?.enabled ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      data.blog?.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Confirmation Modal for Reset to Defaults */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white text-center">
              Standart TZ holatiga qaytarish
            </h3>
            <p className="text-xs text-slate-300 text-center leading-relaxed">
              {t('admin_reset_confirm')}
            </p>
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  setResetModalOpen(false);
                  showNotice("Barcha ma'lumotlar asl holatiga qaytarildi!");
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
              >
                Ha, tiklash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Service Modal */}
      {newServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              Yangi {serviceCategory.toUpperCase()} xizmatini qo'shish
            </h3>

            <form onSubmit={handleAddService} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Xizmat nomi (UZ):</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Maxsus Bot yaratish"
                  value={newServiceForm.titleUz}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, titleUz: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Xizmat nomi (RU):</label>
                <input
                  type="text"
                  placeholder="Например: Создание специального бота"
                  value={newServiceForm.titleRu}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, titleRu: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ta'rif (UZ):</label>
                <textarea
                  rows="2"
                  required
                  placeholder="Xizmat haqida batafsil ma'lumot..."
                  value={newServiceForm.descUz}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, descUz: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ta'rif (RU):</label>
                <textarea
                  rows="2"
                  placeholder="Подробное описание услуги..."
                  value={newServiceForm.descRu}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, descRu: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setNewServiceModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
