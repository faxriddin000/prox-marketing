import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CMS_DATA } from '../data/initialData';
import { sendLeadToTelegram } from '../services/telegramService';

const CMS_STORAGE_KEY = 'prox_marketing_cms_state_v1';

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with INITIAL_CMS_DATA so new schema keys are not lost
        return {
          ...INITIAL_CMS_DATA,
          ...parsed,
          hero: {
            ...INITIAL_CMS_DATA.hero,
            ...(parsed.hero || {})
          },
          services: {
            ...INITIAL_CMS_DATA.services,
            ...(parsed.services || {}),
            marketing: (parsed.services?.marketing || INITIAL_CMS_DATA.services.marketing).filter(
              (item) => item.id !== 'mkt-6' && item.id !== 'mkt-7' && !item.titleUz?.includes("Sotuv bo'limi") && !item.titleUz?.includes("To'liq sotuvni")
            )
          },
          tariffs: {
            ...INITIAL_CMS_DATA.tariffs,
            ...(parsed.tariffs || {}),
            smm: (parsed.tariffs?.smm || INITIAL_CMS_DATA.tariffs.smm).map((item, idx) => ({
              ...(INITIAL_CMS_DATA.tariffs.smm[idx] || {}),
              ...item
            }))
          },
          partners: (parsed.partners || INITIAL_CMS_DATA.partners).map((item, idx) => {
            if (!item.logo || item.logo.includes('unsplash.com')) {
              return INITIAL_CMS_DATA.partners[idx] || item;
            }
            return item;
          }),
          contact: {
            ...INITIAL_CMS_DATA.contact,
            ...(parsed.contact || {})
          },
          portfolio: {
            ...INITIAL_CMS_DATA.portfolio,
            ...(parsed.portfolio || {})
          },
          team: {
            ...INITIAL_CMS_DATA.team,
            ...(parsed.team || {})
          },
          telegramSettings: {
            ...INITIAL_CMS_DATA.telegramSettings,
            ...(parsed.telegramSettings || {})
          }
        };
      }
    } catch (e) {
      console.error('Failed to load CMS data from localStorage:', e);
    }
    return INITIAL_CMS_DATA;
  });

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save CMS data to localStorage:', e);
    }
  }, [data]);

  // Reset to default TZ data
  const resetToDefaults = () => {
    setData(INITIAL_CMS_DATA);
    try {
      localStorage.removeItem(CMS_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Section updaters
  const updateHero = (heroUpdates) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates }
    }));
  };

  const updateAbout = (aboutUpdates) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, ...aboutUpdates }
    }));
  };

  const updateServices = (category, items) => {
    setData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [category]: items
      }
    }));
  };

  const updateServiceItem = (category, itemId, itemData) => {
    setData((prev) => {
      const currentList = prev.services[category] || [];
      const updatedList = currentList.map((item) =>
        item.id === itemId ? { ...item, ...itemData } : item
      );
      return {
        ...prev,
        services: {
          ...prev.services,
          [category]: updatedList
        }
      };
    });
  };

  const addServiceItem = (category, itemData) => {
    setData((prev) => {
      const currentList = prev.services[category] || [];
      const newItem = {
        ...itemData,
        id: `${category}-${Date.now()}`
      };
      return {
        ...prev,
        services: {
          ...prev.services,
          [category]: [...currentList, newItem]
        }
      };
    });
  };

  const deleteServiceItem = (category, itemId) => {
    setData((prev) => {
      const currentList = prev.services[category] || [];
      return {
        ...prev,
        services: {
          ...prev.services,
          [category]: currentList.filter((item) => item.id !== itemId)
        }
      };
    });
  };

  const updateTariffs = (tariffUpdates) => {
    setData((prev) => ({
      ...prev,
      tariffs: { ...prev.tariffs, ...tariffUpdates }
    }));
  };

  const updatePartners = (partnersList) => {
    setData((prev) => ({
      ...prev,
      partners: partnersList
    }));
  };

  const updatePartner = (partnerId, updatedFields) => {
    setData((prev) => ({
      ...prev,
      partners: (prev.partners || []).map((p) =>
        p.id === partnerId ? { ...p, ...updatedFields } : p
      )
    }));
  };

  const addPartner = (partnerData) => {
    setData((prev) => ({
      ...prev,
      partners: [
        ...prev.partners,
        { ...partnerData, id: `partner-${Date.now()}` }
      ]
    }));
  };

  const deletePartner = (partnerId) => {
    setData((prev) => ({
      ...prev,
      partners: prev.partners.filter((p) => p.id !== partnerId)
    }));
  };

  const updatePortfolio = (portfolioUpdates) => {
    setData((prev) => ({
      ...prev,
      portfolio: { ...prev.portfolio, ...portfolioUpdates }
    }));
  };

  const updateTeam = (teamUpdates) => {
    setData((prev) => ({
      ...prev,
      team: { ...prev.team, ...teamUpdates }
    }));
  };

  const updateContact = (contactUpdates) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactUpdates }
    }));
  };

  const updateTelegramSettings = (telegramUpdates) => {
    setData((prev) => ({
      ...prev,
      telegramSettings: { ...prev.telegramSettings, ...telegramUpdates }
    }));
  };

  const updateBlog = (blogUpdates) => {
    setData((prev) => ({
      ...prev,
      blog: { ...prev.blog, ...blogUpdates }
    }));
  };

  // Lead management
  const addLead = async (lead) => {
    const newLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Yangi'
    };

    // Send real-time notification to Telegram Bot API
    let telegramResult = null;
    try {
      telegramResult = await sendLeadToTelegram(newLead, data.telegramSettings);
      newLead.sentToTelegram = Boolean(telegramResult?.success);
    } catch (err) {
      console.warn('Telegram Bot notification attempt failed:', err);
      newLead.sentToTelegram = false;
    }

    // Save lead locally in CMS state
    setData((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads]
    }));

    return {
      lead: newLead,
      telegram: telegramResult
    };
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    }));
  };

  const deleteLead = (leadId) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== leadId)
    }));
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        resetToDefaults,
        updateHero,
        updateAbout,
        updateServices,
        updateServiceItem,
        addServiceItem,
        deleteServiceItem,
        updateTariffs,
        updatePartners,
        updatePartner,
        addPartner,
        deletePartner,
        updatePortfolio,
        updateTeam,
        updateContact,
        updateTelegramSettings,
        updateBlog,
        addLead,
        updateLeadStatus,
        deleteLead
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
