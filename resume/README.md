# Résumé source

`resume.html` is the source for `public/resume.pdf`. It lives outside
`public/` on purpose, so the html itself is not published alongside the pdf.

The pdf that shipped before this was a 548-byte placeholder reading
"Resume - placeholder", linked from every page on the site.

To regenerate after editing, print the file to pdf at A4 with background
graphics on and "preferCSSPageSize" (the `@page` rule sets the margins):

    Chrome → open resume/resume.html → Print → Save as PDF → A4,
    margins: default, Background graphics: on

Headless equivalent:

    chrome --headless=new --print-to-pdf=public/resume.pdf \
      --no-pdf-header-footer resume/resume.html

On macOS headless Chrome can stay open after it writes the file. Once the
pdf ends in `%%EOF` it is complete and Chrome can be quit.

Keep it to ONE page, filled. At the current margins (16mm top/bottom,
18mm sides) and 8.5pt body, the content box is 658 x 1002 css px and the
layout lands at about 995, so there is less than one line of headroom.
Adding a bullet means taking one out.

No colour. The document is black on white and links are identified by the
underline, not by a hue: the site's magenta is a screen accent and it
reads as decoration on a printed page.

## Readable by an applicant tracking system

An ATS reads the pdf's text layer, not the page. The earlier pdf looked
right and parsed wrong, so each rule below exists because of a failure it
had:

- **Arial, not Inter.** Chrome prints a variable web font (Inter from Google
  Fonts) as Type3 glyphs, which some parsers return as blank or garbage.
  A static system TrueType font is embedded as real text.
- **Nothing positioned.** Chrome paints `position: relative` and `absolute`
  elements after everything else, so `li{position:relative}` put every
  bullet after the Skills section in the pdf's text order, detached from
  its job. Hang the bullet with padding and a negative margin instead.
- **No letter-spacing.** Tracked headings were read as "E X P E R I E N C E",
  and no section was found. Headings are typed in capitals, not set with
  `text-transform`.
- **Bullets are a character.** `li::before{content:"•"}` puts a bullet in the
  text. A drawn dot does not.
- **URLs written out.** Parsers keep the visible text and drop the link, so
  "LinkedIn" alone gave them nothing.
- **One line per role: `Title | Company | Dates`.** A date floated to the
  right is read as a separate block, and anything else in the company
  slot ("under B.V. Doshi", "(AI-native learning)") becomes part of the
  employer's name.
- **Standard headings and full degree names.** Summary, Experience,
  Projects, Education, Skills; "Master of Design", not only "M.Des", so
  degree filters match.

To check a new pdf, select all of its text and paste it into a plain text
editor. It should read top to bottom in page order, with each bullet under
its job and every heading as a whole word.
In this AEC portfolio, `public/resume.pdf` is printed from `resume.html` (2026-10-17). The note below is about the design portfolio:
As of 2026-10-13, `public/resume.pdf` is an externally authored pdf, not a
print of `resume.html`. Regenerating from the html will overwrite it with
the older content.
