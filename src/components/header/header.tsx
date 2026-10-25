"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { getSiteConfig } from "@/data/config";
import { EmbedTriggers } from "../embeds/embed-triggers";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/i18n/context";

interface HeaderProps {
  loader?: boolean;
  // server-rendered slot; client header can't fetch it itself without a mount-time shift
  githubStars?: React.ReactNode;
}

const Header = ({ loader, githubStars }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { locale, t, href } = useI18n();
  const config = getSiteConfig(locale);

  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in z-[1000]"
      )}
      style={{
        background: isActive ? "hsl(var(--background) / .8)" : "transparent",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: loader ? 3.5 : 0, duration: 0.8 }}
    >
      <div className={cn(styles.bar, "flex items-center justify-between")}>
        <Link href={href("/")} className="flex items-center justify-center">
          <Button variant={"link"} className="text-md">
            {config.author}
          </Button>
        </Link>

        <div className="flex items-center">
          <FunnyThemeToggle className="w-6 h-6 mr-4 hidden md:flex" />
          <LanguageSwitcher className="mr-3 hidden sm:flex" />
          <EmbedTriggers className="mr-3" />
          {githubStars}
          <Button
            variant={"ghost"}
            onClick={() => setIsActive(!isActive)}
            aria-label={isActive ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isActive}
            className={cn(
              styles.el,
              "m-0 p-0 h-6 bg-transparent flex items-center justify-center"
            )}
          >
            <div className="relative hidden md:flex items-center">
              <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>
                {t.nav.menu}
              </motion.p>
              <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
                {t.nav.close}
              </motion.p>
            </div>
            <div
              className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}
            ></div>
          </Button>
        </div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        onClick={() => setIsActive(false)}
        className={styles.background}
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} locale={locale} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
