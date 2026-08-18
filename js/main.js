/* ===========================================================
   NYC Protect — Shared Site Shell
   -----------------------------------------------------------
   This file defines the navigation bar, disclaimer banner, and
   footer ONE TIME, then stamps them onto every page that has
   these two empty placeholder tags in its HTML:

     <div id="site-header"></div>   (near the top of <body>)
     <div id="site-footer"></div>   (near the bottom of <body>)

   ...plus this one line right before </body>:

     <script src="js/main.js"></script>

   From now on, to change the nav or footer on EVERY page at
   once, we edit the two HTML strings below — never the
   individual pages.

   A note on HOW this works, for the curious: we could instead
   have each page fetch() separate header.html/footer.html
   files. We're not doing that because fetch() of local files is
   blocked by browsers when you preview a page by double-clicking
   it (no web server involved) — and being able to instantly
   preview a page before uploading it is exactly what's been
   catching our mistakes early. Storing the shared HTML as plain
   text in this JavaScript file works everywhere: on your computer
   AND once the site is live online.
   =========================================================== */

const SITE_HEADER_HTML = `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="disclaimer-banner">
    NYC Protect is an independent educational resource. We are not affiliated with the NYPD, New York City, or New York State.
  </div>
  <header class="site-nav">
    <div class="container--wide site-nav__inner">
      <a href="index.html" class="site-nav__brand">NYC Protect</a>
      <ul class="site-nav__links">
        <li><a href="start-here.html">Start Here</a></li>
        <li><a href="roadmap.html">Roadmap</a></li>
        <li><a href="faq.html">FAQ</a></li>
      </ul>
    </div>
  </header>
`;

const SITE_FOOTER_HTML = `
  <footer class="site-footer">
    <div class="container--wide stack">
      <p><strong>NYC Protect is independent.</strong> We are not affiliated with, endorsed by, or acting on behalf of the NYPD, the City of New York, New York State, or any government agency. Official government sources always control — when in doubt, verify directly with them.</p>
      <p class="text-muted">This site is for educational and administrative purposes only. It is not legal advice.</p>
      <ul class="site-footer__links">
        <li><a href="about.html">About &amp; Disclaimer</a></li>
        <li><a href="legal-concepts.html">Legal &amp; Safety Concepts</a></li>
        <li><a href="resources.html">Official Resources</a></li>
      </ul>
      <p class="text-muted">&copy; 2026 NYC Protect</p>
    </div>
  </footer>
`;

function injectSiteShell() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  if (headerSlot) {
    headerSlot.innerHTML = SITE_HEADER_HTML;
  }
  if (footerSlot) {
    footerSlot.innerHTML = SITE_FOOTER_HTML;
  }
}

// Wait until the page's HTML has fully loaded before inserting
// the header/footer, so the placeholder tags definitely exist.
document.addEventListener('DOMContentLoaded', injectSiteShell);
