export default function Font() {
  return (
    <>
      <link
        rel="preload"
        as="style"
        href={PRETENDARD_CSS_URL}
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={PRETENDARD_CSS_URL} />
    </>
  );
}

const PRETENDARD_CSS_URL =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css";
