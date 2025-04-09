export default function Footer() {
  return (
    <footer className="content-x mt-12 border-t border-gray-300 py-8 dark:border-gray-700">
      <p>Copyright © {new Date().getFullYear()} Panta Rhei (Dahye Kang)</p>
      <p>Built with Remix, Tailwind CSS</p>
    </footer>
  );
}
