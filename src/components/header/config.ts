import { Link } from "@/types";
import { asset } from "@/lib/asset-path";

const links: Link[] = [
  {
    title: "Home",
    href: "/",
    thumbnail: asset("/assets/nav-link-previews/landing.png"),
  },
  {
    title: "Skills",
    href: "/#skills",
    thumbnail: asset("/assets/nav-link-previews/skills.png"),
  },
  {
    title: "Experience",
    href: "/#experience",
    thumbnail: asset("/assets/nav-link-previews/landing.png"),
  },
  {
    title: "Projects",
    href: "/#projects",
    thumbnail: asset("/assets/nav-link-previews/projects.png"),
  },
  {
    title: "Blog",
    href: "/blogs",
    thumbnail: asset("/assets/nav-link-previews/blog.png"),
  },
  {
    title: "Contact",
    href: "/#contact",
    thumbnail: asset("/assets/nav-link-previews/contact.png"),
  },
];

export { links };
