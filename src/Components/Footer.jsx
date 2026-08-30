import { GithubIcon, LinkedinIcon, FigmaIcon, TwitterIcon } from './SocialIcons';
import useMagnetic from '../hooks/useMagnetic';

const links = [
  { href: 'https://github.com/AmanKumarVerma11',          Icon: GithubIcon,   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/aman-kr-verma11/', Icon: LinkedinIcon, label: 'LinkedIn' },
  { href: 'https://www.figma.com/@akv',                   Icon: FigmaIcon,    label: 'Figma'    },
  { href: 'https://x.com/mai_amanhoon',                   Icon: TwitterIcon,  label: 'Twitter'  },
];

function Footer() {
  const magneticRef = useMagnetic(0.12);

  return (
    <footer className="border-t border-wire">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-10">

        <p className="text-haze text-xs font-semibold tracking-[0.18em] uppercase mb-5">
          Available for new projects
        </p>

        <a
          ref={magneticRef}
          href="mailto:akverma11aug2002@gmail.com"
          className="magnetic inline-block text-[clamp(2.8rem,7vw,7.5rem)] text-ink leading-[0.88] mb-16 hover:text-dim transition-colors duration-300"
          style={{ fontVariationSettings: "'wdth' 84, 'wght' 800" }}
        >
          Let’s build<span className="text-signal">.</span>
        </a>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-wire">
          <p className="text-haze text-sm">© {new Date().getFullYear()} Aman Kumar Verma</p>
          <div className="flex items-center gap-5">
            {links.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-haze hover:text-ink transition-colors duration-200"
              >
                <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
