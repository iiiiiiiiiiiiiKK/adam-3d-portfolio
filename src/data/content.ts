import type { Locale } from "@/i18n/types";
import {
  SKILLS as SKILLS_ZH,
  EXPERIENCE as EXPERIENCE_ZH,
  themeDisclaimers as THEME_ZH,
  themeText as THEME_TEXT_ZH,
  type Skill,
  type Experience,
  SkillNames,
} from "./constants";
import {
  SKILL_DESCRIPTIONS_EN,
  EXPERIENCE_EN,
  THEME_DISCLAIMERS_EN,
  THEME_TEXT_EN,
} from "./constants-en";

/**
 * 按语言取技能表。英文版复用同一套 id / label / 图标 / 键帽颜色，
 * 只把 shortDescription 换成英文 —— 这样 3D 键盘的按键布局两边完全一致。
 */
export function getSkills(locale: Locale): Record<SkillNames, Skill> {
  if (locale === "en") {
    const out = {} as Record<SkillNames, Skill>;
    for (const [key, skill] of Object.entries(SKILLS_ZH) as [SkillNames, Skill][]) {
      out[key] = { ...skill, shortDescription: SKILL_DESCRIPTIONS_EN[key] ?? skill.shortDescription };
    }
    return out;
  }
  return SKILLS_ZH;
}

export function getExperience(locale: Locale): Experience[] {
  return locale === "en" ? (EXPERIENCE_EN as Experience[]) : EXPERIENCE_ZH;
}

export function getThemeDisclaimers(locale: Locale) {
  return locale === "en" ? THEME_DISCLAIMERS_EN : THEME_ZH;
}

export function getThemeText(locale: Locale) {
  return locale === "en" ? THEME_TEXT_EN : THEME_TEXT_ZH;
}

export { SkillNames };
export type { Skill, Experience };
