import { Icon } from "@iconify/react/dist/iconify.js";

const FooterLanding = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} MyCMS. Dibuat dengan 💙 oleh Iemaduddin.</p>
        <div className="flex justify-center mt-3 space-x-4">
          <a href="mailto:iemaduddin17@gmail.com" className="hover:text-blue-600">
            <Icon icon="mdi:gmail" width="30"></Icon>
          </a>
          <a href="https://www.linkedin.com/in/iemaduddin" className="hover:text-blue-600">
            <Icon icon="mdi:linkedin" width="30"></Icon>
          </a>
          <a href="https://github.com/Iemaduddin" className="hover:text-blue-600">
            <Icon icon="mdi:github" width="30"></Icon>
          </a>
          <a href="https://www.instagram.com/didinn_id" className="hover:text-blue-600">
            <Icon icon="mdi:instagram" width="30"></Icon>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
