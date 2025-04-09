export default {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "https://rhei-resume.pages.dev/build/"
      : "/resume/build/",
};
