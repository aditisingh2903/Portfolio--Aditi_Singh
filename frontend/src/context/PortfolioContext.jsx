import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchOne, fetchMany } from '../lib/api.js';
import {
  defaultProfile, defaultAbout, defaultSeo, defaultSkills, defaultProjects,
  defaultExperience, defaultEducation, defaultAchievements,
  defaultCertifications, defaultResearch,
} from '../lib/defaults.js';

const PortfolioContext = createContext(null);
export const usePortfolio = () => useContext(PortfolioContext);

// Prefer server value; fall back to resume-derived defaults when null/empty.
const nonEmpty = (v, fallback) => (v && (Array.isArray(v) ? v.length : true) ? v : fallback);

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [about, setAbout] = useState(defaultAbout);
  const [seo, setSeo] = useState(defaultSeo);
  const [skills, setSkills] = useState(defaultSkills);
  const [projects, setProjects] = useState(defaultProjects);
  const [experience, setExperience] = useState(defaultExperience);
  const [education, setEducation] = useState(defaultEducation);
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [certifications, setCertifications] = useState(defaultCertifications);
  const [research, setResearch] = useState(defaultResearch);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [p, a, sks, prs, exps, edus, achs, certs, rs, seoRes] = await Promise.all([
        fetchOne('/profile').catch(() => null),
        fetchOne('/about').catch(() => null),
        fetchMany('/skills', { published: 'true' }).catch(() => null),
        fetchMany('/projects', { published: 'true' }).catch(() => null),
        fetchMany('/experience', { published: 'true' }).catch(() => null),
        fetchMany('/education', { published: 'true' }).catch(() => null),
        fetchMany('/achievements', { published: 'true' }).catch(() => null),
        fetchMany('/certifications', { published: 'true' }).catch(() => null),
        fetchMany('/research', { published: 'true' }).catch(() => null),
        fetchOne('/seo').catch(() => null),
      ]);

      const any = [p, a, sks, prs, exps, edus, achs, seoRes].some(Boolean);
      setOffline(!any);

      setProfile(nonEmpty(p, defaultProfile));
      setAbout(nonEmpty(a, defaultAbout));
      setSeo(nonEmpty(seoRes, defaultSeo));
      setSkills(nonEmpty(sks, defaultSkills));
      setProjects(nonEmpty(prs, defaultProjects));
      setExperience(nonEmpty(exps, defaultExperience));
      setEducation(nonEmpty(edus, defaultEducation));
      setAchievements(nonEmpty(achs, defaultAchievements));
      setCertifications(nonEmpty(certs, defaultCertifications));
      setResearch(nonEmpty(rs, defaultResearch));
    } catch (e) {
      console.error('Failed to load portfolio data (using built-in defaults)', e);
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const value = {
    profile, about, seo, skills, projects, experience, education,
    achievements, certifications, research, loading, offline, reload: loadAll,
  };
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
