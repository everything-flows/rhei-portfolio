export default function Footer() {
  return (
    <footer className="content-x mt-12">
      <div className="mx-auto max-w-6xl py-8 border-t border-gray-300 dark:border-gray-700">
        <p>Copyright © {new Date().getFullYear()} Panta Rhei (Dahye Kang)</p>
        <p>Built with Remix, Next.js, and Tailwind CSS</p>
      </div>
    </footer>
  );
}
