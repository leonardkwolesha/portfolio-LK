import { personal } from '../data/content';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <span>
        © {year} {personal.name}<span className="footer-dot">.</span>
      </span>
      <span>
        Full Stack <span className="footer-dot">+</span> Mobile Developer
        &nbsp;·&nbsp;
        {personal.location}
      </span>
    </footer>
  );
};

export default Footer;
