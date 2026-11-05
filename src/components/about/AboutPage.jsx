import React from 'react';
import { ShieldCheck, TrendingUp, Zap, Users, Target, Sparkles, ArrowRight, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';

export const AboutPage = ({ onOpenConsultation }) => {
  const { language, t } = useLanguage();
  const { data } = useCMS();
  const about = data.about || {};
  const team = data.team || { showOnAbout: false, members: [] };

  const currentDesc = about.description?.[language] || about.description?.uz;
  const currentMissionTitle = about.mission?.[`title${language.charAt(0).toUpperCase() + language.slice(1)}`] || about.mission?.titleUz;
  const currentMissionDesc = about.mission?.[`desc${language.charAt(0).toUpperCase() + language.slice(1)}`] || about.mission?.descUz;

  const valueIcons = {
    ShieldCheck: ShieldCheck,
    TrendingUp: TrendingUp,
    Zap: Zap,
    Users: Users
  };

  return (
    <div className="pt-32 pb-24 space-y-24">
      {/* Hero / Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            {t('about_badge')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('about_title')}
          </h1>
          <p className="text-sm sm:text-base text-indigo-300 font-medium">
            {t('about_tagline')}
          </p>
        </div>

        {/* Agency Description Card */}
        <div className="mt-12 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto space-y-6 text-center sm:text-left">
            <div className="inline-block px-3 py-1 bg-slate-800 rounded-lg text-xs font-bold text-slate-300">
              Prox Marketing Agency
            </div>
            <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal">
              "{currentDesc}"
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Rasmiy korporativ agentlik
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Toshkent, O'zbekiston
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                proxmarketing.uz
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mission Card */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-indigo-950/50 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {currentMissionTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentMissionDesc}
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onOpenConsultation('Marketing')}
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>Biz bilan hamkorlik qilish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Values Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {about.values?.map((val, idx) => {
              const IconComp = valueIcons[val.icon] || ShieldCheck;
              const title = val[`title${language.charAt(0).toUpperCase() + language.slice(1)}`] || val.titleUz;
              const desc = val[`desc${language.charAt(0).toUpperCase() + language.slice(1)}`] || val.descUz;

              return (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:-translate-y-0.5"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Members (Conditional per TZ: default hidden/empty, toggleable from admin) */}
      {team.showOnAbout && team.members && team.members.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="w-3.5 h-3.5" />
              {t('about_team_title')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('about_team_subtitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.members.map((member) => {
              const role = member[`role${language.charAt(0).toUpperCase() + language.slice(1)}`] || member.roleUz;
              const bio = member[`bio${language.charAt(0).toUpperCase() + language.slice(1)}`] || member.bioUz;

              return (
                <div
                  key={member.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group"
                >
                  <div className="aspect-[4/3] bg-slate-950 overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-lg font-bold text-white">{member.name}</h4>
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{role}</p>
                    <p className="text-xs text-slate-400 pt-1 leading-relaxed">{bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-indigo-900/40 via-slate-900 to-cyan-900/30 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Biznesingizni yangi bosqichga olib chiqishga tayyormisiz?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Prox Marketing Agency ekspertlari bilan 15 daqiqalik bepul tahlil va konsultatsiya oling.
          </p>
          <button
            onClick={() => onOpenConsultation('Marketing')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span>{t('hero_consult_btn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
