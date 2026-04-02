export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  // Disabled for static GitHub Pages hosting
  ssr: false,
  // Set basename to /ticketline-portal only for production builds
  basename: process.env.NODE_ENV === "production" ? "/ticketline-portal" : "/",
};
