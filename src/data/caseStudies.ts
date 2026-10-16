import type { CaseStudy } from "@/types/caseStudy";
import { site } from "./site";

/**
 * Case-study content. Every claim here is grounded in the actual project repos.
 * No invented users, research, metrics, testimonials, or client work. Where a
 * project is a prototype or independent piece, it says so plainly.
 *
 * Assets are the real project artifacts, in /public/case/<slug>/ (plus a couple
 * of covers). Copy is lowercase and em-dash-free, matching the site.
 */

export const caseStudies: Record<string, CaseStudy> = {
  // ─────────────────────────────────────────────────────────────── kochi1app ──
  kochi1app: {
    slug: "kochi1app",
    hero: {
      kicker: "service design + ux · kochi metro",
      title: "kochi1app",
      subtitle:
        "a service-design redesign of kochi's official transit app: plan a trip by intention, make the greener route the easy one, and design the transfers and the last mile the map leaves out.",
      media: {
        type: "image",
        src: "/case/kochi1app/hero.jpg",
        width: 1800,
        height: 992,
        alt: "hands holding a phone over a metro concourse, route lines flowing outward",
      },
      mediaFit: "cover",
      mediaPosition: "center",
      meta: [
        { label: "role", value: "service design + ux" },
        { label: "context", value: "kochi metro · mobility app redesign" },
        { label: "year", value: "2024" },
      ],
      links: [
        {
          label: "service design report",
          href: "https://www.behance.net/gallery/212543637/Public-Transport-Systems-Service-Design",
        },
      ],
    },
    /*
     * The deck, in its own order. This case study used to show three images
     * and describe the rest; the study itself is twenty-four slides and the
     * argument is in them, so they run here in the sequence they were made,
     * with the narrative sections holding them together rather than
     * replacing them.
     */
    sections: [
      { kind: "thesis", eyebrow: "product thesis", text: "people could already find a route in kochi1app. what they could not find was what the trip would actually be like, whether the transfer was walkable, where the exit came out, how long they would be standing in the sun waiting for the connection. the redesign is mostly about that gap." },
      {
        kind: "context",
        label: "role and ownership",
        paragraphs: [
          "kochi1app is the official app for kochi's metro and water metro. i ran an end-to-end service-design study across the city's multimodal transport, interviews with riders, station staff and management, personas, journey maps, service blueprints and a competitor teardown, to find where the app leaves people stranded rather than just where a screen looks dated.",
          "everything on this page is mine: the research, the framing, the information architecture, the screens and the usability testing.",
        ],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/01-why-care.png", width: 1920, height: 1869, alt: "survey data on why people adopt public transport in kochi" },
        caption: "the case, in the city's own numbers: around 60 per cent mode share across kochi's 2.6 million travellers, 72 per cent asking for direct services and 60 per cent for better information (cppr mobility study).",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/02-existing-app.png", width: 1920, height: 1445, alt: "the existing kochi1 app, its feature set and its store rating" },
        fit: "contain",
        frame: true,
        caption: "what had already shipped. plan trips, book tickets, manage the kochi1 card, explore the city, bus and metro details, emergency messages. over 100,000 downloads and 2.5 stars across 2.26k reviews, which is the gap this project starts in.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/03-goals.png", width: 1920, height: 1080, alt: "the four goals of the redesign" },
        fit: "contain",
        frame: true,
        caption: "four goals, set before any screen.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/04-board.png", width: 2171, height: 3200, alt: "the redesign board, all four themes at once" },
        caption: "the whole redesign on one board.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/05-gaps.png", width: 1920, height: 1316, alt: "the gaps, sorted into seven categories" },
        fit: "contain",
        frame: true,
        caption: "the gaps, sorted before any of them were solved.",
      },
      {
        kind: "context",
        label: "the research",
        paragraphs: [
          "secondary research and case studies from ahmedabad, kolkata, chennai and bangalore, then primary work in kochi: ecosystem mapping, interviews across riders, station staff and management, stakeholder and affinity mapping, and service experience mapping through a customer gap model, touchpoint maps and causal loops.",
        ],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/06-background-research.png", width: 1920, height: 1185, alt: "the six stages of the background research" },
        fit: "contain",
        frame: true,
        caption: "the method. the study produced policy recommendations alongside design ones, since a transfer that does not exist cannot be designed around.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/07-competitor-analysis.png", width: 1920, height: 1275, alt: "a feature matrix comparing eight transit apps" },
        fit: "contain",
        frame: true,
        caption: "eight apps against twelve capabilities. kochi1app is the only one in the set with no offline access, no first and last mile suggestions, no multimodal transport, no live crowd information and no fare calculation. the red column is the brief.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/08-personas.png", width: 1920, height: 2136, alt: "five rider personas across the city" },
        caption: "five riders the app has to serve at once: a school student, a new call-centre commuter, a daily-wage worker who walks when the fare is too high, a last-mile auto driver, and a visitor with no local knowledge.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/09-unboxing.png", width: 1920, height: 1453, alt: "evaluating the existing app: usability goals, heuristic evaluation and task-based evaluation" },
        fit: "contain",
        frame: true,
        caption: "what already shipped, evaluated three ways: usability goals, a heuristic evaluation scored on ten dimensions, and a task-based evaluation with real users.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/10-findings.png", width: 1920, height: 1394, alt: "what users said about the existing app" },
        fit: "contain",
        frame: true,
        caption: "the findings in the words they arrived in. the homepage does not cater to the primary task, the route turns from horizontal to vertical halfway, options in filter and sort do not make sense, and it felt like a generic app.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/11-sorting-the-pile.png", width: 1920, height: 1325, alt: "what to retain and what to improve" },
        fit: "contain",
        frame: true,
        caption: "sorting the pile into two questions: what has to be kept because people rely on it, and what would actually make it better.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/12-ia-existing.png", width: 1920, height: 1394, alt: "the existing information architecture, colour-coded" },
        fit: "contain",
        frame: true,
        caption: "the existing architecture, audited node by node. the circled planner is where the app's actual job lives and where almost none of its screen went.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/13-ia-redesigned.png", width: 1920, height: 1550, alt: "the redesigned information architecture" },
        fit: "contain",
        frame: true,
        caption: "the architecture rebuilt around eight areas. the planner stops being one item in a menu.",
      },
      {
        kind: "decisions",
        label: "key design decisions",
        items: [
          {
            n: "01",
            title: "plan by intention",
            why: "people don't only travel to an address. they travel to explore, to catch a scenic route, to be home before dark. the old app only understood destinations.",
            tradeoff: "the planner has to turn a fuzzy intent, i want to explore the city, into concrete routes.",
            result: "a dynamic intention layer: choose cultural, scenic, food, half a day or home by dinner, and the trip is built around that, not only the fastest line.",
          },
          {
            n: "02",
            title: "make the greener choice the easy one",
            why: "a sustainability nudge only works if it costs the rider nothing to think about.",
            tradeoff: "reward mechanics turn gimmicky fast if they are not tied to something real.",
            result: "a green card tracks carbon saved against a monthly target and pays out small, real rewards, a free ride or an offer, for low-carbon routes.",
          },
          {
            n: "03",
            title: "design the transfer and the last mile",
            why: "the trip breaks where the app stops: the confusing exit, the missed connection, the walk nobody mapped.",
            tradeoff: "far more surface than a point-to-point route: buffers, alternatives, live context.",
            result: "editable transfer buffers, alternative modes priced inline, and weather-aware routing, a shaded route when it is sunny and a place to wait out a downpour.",
          },
          {
            n: "04",
            title: "let the city be part of the trip",
            why: "a first-time visitor and a daily commuter want different things from the same line.",
            tradeoff: "surfacing places and stories without burying the core task of getting somewhere.",
            result: "landmarks, cultural stops and quieter paths you can add to a route, so a journey can be built around what is worth seeing rather than only how fast it is.",
          },
        ],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/14-ui-homescreen.png", width: 2683, height: 1334, alt: "the homescreen redesign and its iterations" },
        fit: "contain",
        frame: true,
        caption: "the homescreen. it leads with green nudges and frequent tasks, and defaults geodata for a novice.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/15-ui-route.png", width: 2243, height: 1308, alt: "the route suggestion redesign and its iterations" },
        fit: "contain",
        frame: true,
        caption: "route suggestion, annotated through three rounds.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/16-user-flows.png", width: 2143, height: 5922, alt: "the full set of user flows" },
        caption: "every flow in the redesign, including the ones that only exist because the intention layer does.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/17-what-you-see.png", width: 2370, height: 1703, alt: "the nearest point of commute flow" },
        fit: "contain",
        frame: true,
        caption: "the first thing the app now does is answer where you are and what is near you, rather than opening on a menu.",
      },
      {
        kind: "pipeline",
        label: "planning by intention",
        steps: [
          { glyph: "input", label: "intention", text: "cultural, scenic, food, half a day, home by dinner." },
          { glyph: "map", label: "route", text: "the trip is built around that rather than only the fastest line." },
          { glyph: "converge", label: "transfer", text: "editable buffers, and weather-aware routing when the wait is in the sun." },
          { glyph: "cards", label: "last mile", text: "walk, cycle or auto, priced inline, plus the landmarks worth stopping at." },
        ],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/18-daily-route.png", width: 4562, height: 1141, alt: "the daily route and monthly pass flow" },
        fit: "contain",
        frame: true,
        caption: "the daily route and the monthly pass: the commuter case, where the job is to remove decisions rather than offer them.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/19-travel-mode.png", width: 4035, height: 1141, alt: "planning by travel mode" },
        fit: "contain",
        frame: true,
        caption: "planning by travel mode, through to the qr at the gate and the places worth stopping at on the way.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/20-edit-intermediate.png", width: 2584, height: 1141, alt: "editing intermediate travel options" },
        fit: "contain",
        frame: true,
        caption: "the transfer, made editable. an intermediate leg can be changed without rebuilding the journey, which is the part the old planner could not do at all.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/21-previous-transactions.png", width: 1905, height: 1141, alt: "booking a journey from a previous transaction" },
        fit: "contain",
        frame: true,
        caption: "booking from a past transaction, because most trips in a commuter's week are a trip they have already taken.",
      },
      {
        kind: "context",
        label: "testing it",
        paragraphs: [
          "the redesign was tested with sixteen participants aged fifteen to fifty, against three task scenarios: intention-based navigation, micro-route suggestions, and the sustainability nudges.",
          "the protocol was written before the prototype, and so was what to observe, so difficulty, recognition, efficiency and frustration were recorded rather than remembered.",
        ],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/22-evaluation-plan.png", width: 746, height: 836, alt: "the evaluation plan: key questions, precautions, target users, test goals and screener" },
        fit: "contain",
        frame: true,
        caption: "the plan before the test. travel cannot be replicated in a room, so the scenario has to carry it.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/23-test-design.png", width: 865, height: 697, alt: "the test protocol and the three task scenarios with their metrics" },
        fit: "contain",
        frame: true,
        caption: "three scenarios with their success criteria set in advance: intention-based navigation at 80 per cent, micro-route suggestions at 90, sustainability nudges at 70. writing the target down first is what makes a result a result.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/kochi1app/deck/24-test-results.png", width: 871, height: 337, alt: "the test results: sus and nasa-tlx scores, per-task completion and the four failures" },
        fit: "contain",
        frame: true,
        caption: "the results, including the parts that did not work.",
      },
      {
        kind: "turn",
        label: "the part of the thesis the testing did not support",
        tried: "the sustainability layer was the argument i cared most about: carbon saved against a monthly target, small real rewards for low-carbon routes, and the greener option surfaced inside the planner rather than parked in its own tab.",
        result: "it tested worst of the three. the sustainability scenario scored 70 on sus against 80.5 and 85 for the other two, it was the only task that did not reach full completion, and nine of the sixteen participants failed to recognise which routes were the sustainable ones at all.",
        change: "a nudge is a visual-hierarchy problem before it is a behavioural one. the work assumed that if the greener route was present and cheap to choose it would be chosen; most people never saw it was on offer. recognition has to be measured separately from completion, because a task can complete at ninety per cent while the thing it was meant to demonstrate goes unseen.",
      },
      {
        kind: "outcome",
        paragraphs: [
          "tested with sixteen participants across three task scenarios. the redesign scored 80 on the system usability scale, 80.5 for intention-based navigation, 85 for micro-route suggestions and 70 for the sustainability nudges. task completion was 100 per cent, 100 per cent and 90 per cent against targets of 80, 90 and 70 set before the test.",
          "cognitive load came out at 53.8 on nasa-tlx, with mental demand at 70 and temporal demand at 65 the two highest components and frustration lowest at 29.8. the load is in reading and deciding rather than in operating the interface, which is the right place for it in a planner and the wrong place for it in a commuter's daily route.",
          "the failures are the more useful half. thirteen of sixteen could not cancel a trip, ten of sixteen were confused by sorting for the nearest station, nine of sixteen did not recognise the sustainable routes, and five of sixteen missed the qr code after confirming a trip. three of those four are recognition failures rather than comprehension ones.",
          "it was delivered to kochi metro as a service-design study, personas, journey maps, service blueprints and policy plus design recommendations, not just a set of screens.",
        ],
      },
      {
        kind: "deeper",
        paragraphs: [
          "the twenty-four boards above are the study as it was made. what is not here is the raw material behind them: the interview transcripts, the full service blueprints, the causal loop diagrams and the policy recommendations that went out alongside the design ones.",
          "the full service-design report is public. i am happy to walk through the research and the rounds the screens went through privately.",
        ],
        links: [
          {
            label: "the complete study",
            href: "https://www.behance.net/gallery/212543637/Public-Transport-Systems-Service-Design",
          },
          { label: "get in touch", href: `mailto:${site.email}` },
        ],
      },
      { kind: "reflection", text: "i spent far more of this project in interviews and service blueprints than in a design file, and the screens only got obvious once i could see the whole service around them: the station staff, the auto drivers outside, the walk at the end nobody had mapped. the testing then did what testing is for, which is to disagree with you. the part i was most attached to is the part sixteen people could not find." },
    ],

  },

  // ───────────────────────────────────────────── a century of villains ──
  // ────────────────────────────────────────────────────────────────── vision ──
  "vision": {
    slug: "vision",
    hero: {
      kicker: "internal tooling · airtribe",
      title: "vision",
      subtitle:
        "the whole company's payments ran through a google sheet. moving them into airtribe's internal sales and operations product, in three phases, without the sheet ever going dark.",
      media: {
        /*
         * Vision's surfaces composed on a transparent ground: the saved view
         * and its filter rows floating above, the payments record itself, the
         * cohort filter open across three courses, the bulk slack-access
         * modal, a row's action menu, and the selection bar the bulk actions
         * hang off. It runs on the synthetic cast, the leads are famous
         * mathematicians, the addresses are example.com and the phone numbers
         * are 9876543210, so nothing here is a real learner.
         *
         * The plain payments capture it replaces is still in the page, in the
         * decision that argues for the view control. This fold is the product
         * as an object; that figure is the screen as an argument.
         *
         * Contained and unframed: the artwork is drawn to its own edges on a
         * transparent ground, so a cover crop would cut the outer surfaces and
         * a hairline box would put a specimen case around a product shot.
         */
        type: "image",
        src: "/case/vision/hero.webp",
        width: 2000,
        height: 1392,
        alt: "vision's payments record with its surfaces laid around it: the view switcher and filter rows above, the cohort filter open across three courses, a modal setting slack access for several learners at once, a row's action menu offering change cohort, assign unit, re-sync and remove access, and a selection bar reading ten selected",
      },
      mediaFit: "contain",
      mediaFrame: false,
      meta: [
        { label: "role", value: "product designer" },
        { label: "team", value: "four: two product designers, one backend, one frontend" },
        { label: "context", value: "airtribe · internal sales and operations" },
        { label: "year", value: "2026" },
      ],
    },
    sections: [
      { kind: "thesis", eyebrow: "product thesis", text: "every enrolment, instalment and refund the company took lived in one google sheet, and finance, delivery and onboarding all read from it. the brief was to replace it. the harder fact was that nobody was unhappy with it: it was fast, it was visible, and it had never once asked anyone for permission." },
      {
        kind: "context",
        label: "role and ownership",
        paragraphs: [
          "two product designers ran this end to end. i took the ground research, the problem framing, the conversations with every team that touches a payment, and the design decisions below; we split the ui screens, and the other designer led the handoff. one backend and one frontend engineer alongside. no researcher and no ux writer, so the column list, the payment states and the dropdown copy are decisions rather than inherited requirements.",
          "vision is airtribe's internal operations dashboard, none of it learner-facing. payments sit at the seam: sales records what a learner paid and how, and enrolment, slack access, onboarding and invoicing all key off that record.",
                  ],
      },
      {
        kind: "question",
        text: "what does a product have to do before someone gives up a spreadsheet they trust?",
      },
      {
        /*
         * The sales sheet, redacted the same way. It used to be the hero, from
         * a time when no capture of vision itself could leave. Now that one
         * can, the two sheets belong together as the before: the product opens
         * the page, and the thing it replaced is the evidence underneath it.
         */
        kind: "full",
        media: {
          type: "image",
          src: "/case/vision/sheet-sales.jpg",
          width: 1978,
          height: 1398,
          alt: "the sales sheet the product replaced, with every cell's contents redacted: columns of struck-out rows, cleared payments banded in green, refund flags cutting across in red",
        },
        fit: "contain",
        frame: true,
        caption: "the sales sheet, redacted. green is a cleared payment, red a refund flag, and that is the only thing in the file findable at a glance.",
      },
      {
        /*
         * The onboarding sheet. Data rows destroyed, header row deliberately
         * left at full resolution: column names are not personal data, and
         * they are the whole argument. The one thing a reader can recover by
         * zooming is the one thing worth recovering.
         */
        kind: "full",
        media: {
          type: "image",
          src: "/case/vision/sheet-onboarding.png",
          width: 1764,
          height: 770,
          alt: "the onboarding sheet: a legible header row of close to thirty column names above rows of colour-coded cells whose contents have been destroyed",
        },
        fit: "contain",
        frame: true,
        caption: "the onboarding sheet, redacted. close to thirty columns for one person, two adjacent and both called remarks, one called problematic leaner, spelled exactly like that.",
      },
      {
        kind: "constraints",
        label: "what the decisions were based on",
        items: [
          { label: "primary research with the teams", text: "sessions with the sales and lxd people who lived in the sheet, before anything was designed. the column list came out of those, not out of the schema." },
          { label: "clarity session data", text: "how people moved through the existing screens rather than how they described it. this is what made the filter overflow visible before anyone complained." },
          { label: "algolia search data", text: "what people searched for, which told us which fields were being filtered by hand because no filter existed yet." },
          { label: "testing with the same people", text: "every phase went back to the teammates who would use it. onboarding changed most: unused columns were deleted, and several that were really a sequence of tasks became a checklist." },
        ],
      },
      {
        kind: "decisions",
        label: "the decisions that shaped the screen",
        items: [
          {
            n: "01",
            title: "a table, by default",
            why: "the sales team had spent years in a grid. opening on cards or a form would have made every one of them slower on day one, which is when a replacement earns trust or loses it.",
            tradeoff: "a table is the least forgiving layout there is, and it commits you to solving density everywhere else: filters, views, permissions, overflow.",
            result: "nobody needed a re-learning period. the work went into making the table hold more than a sheet could.",
          },
          {
            n: "02",
            title: "views instead of one table",
            why: "by phase 3 a payment carried slack access, dashboard access, an lxd comment and the onboarding sheet as well. one table meant both teams scrolled past two thirds of it to reach their own third.",
            tradeoff: "views split a shared surface, and a shared surface was half of why the sheet was trusted. so they overlap deliberately, and an all view stays available.",
            result: "sales, lxd and all, with the columns inside each one governed by role and permission rather than by preference.",
            /*
             * This capture used to be the fold. It is a better argument than
             * an opening image: the view switcher reading all and onboarding
             * is the decision, and it is legible here next to the reasoning
             * rather than sitting above it unexplained.
             */
            media: { type: "image", src: "/case/vision/payments-all.png", width: 1078, height: 742, alt: "the payments record in vision: a view switcher reading all and onboarding, four rows of filters, and a table of payment rows with inline track dropdowns" },
            fit: "contain",
          },
          {
            n: "03",
            title: "friction proportional to consequence",
            why: "a typo in a comment costs nothing; a change to a payment status moves money and triggers access downstream. a spreadsheet treats both identically.",
            tradeoff: "every piece of friction is a slower edit for someone who knew exactly what they were doing.",
            result: "each column is either directly editable or behind an action button that names what is about to happen, and that menu is role-dependent. change logs sit alongside, so a row can be asked who last touched it.",
          },
        ],
      },
      {
        kind: "full",
        media: {
          type: "image",
          src: "/case/vision/onboarding-view.png",
          width: 1498,
          height: 924,
          alt: "the onboarding view: a different filter set and a different column set, with a row's action menu open on change cohort, assign unit, re-sync and remove access",
        },
        fit: "contain",
        frame: true,
        caption: "the same rows under the other view. onboarding gets its own filters and columns, career service, ctc, profile, the two track assignments, and none of the payment machinery it never touches. that is where the scroll went.",
      },
      {
        kind: "pipeline",
        label: "three phases, in the order they shipped",
        steps: [
          { glyph: "grid", label: "phase 1 · the sales sheet", text: "the payments record, moved into vision as a table.", note: "sales first, because it is the team that creates the record rather than one of the teams that reads it" },
          { glyph: "layers", label: "phase 2 · widened for lxd", text: "a confirmed lead goes to lxd for final payment, slack access and dashboard access, so the record widened to carry them.", note: "this is why a payments row now holds an lxd comment and two access states: the sheet had already put them there" },
          { glyph: "converge", label: "phase 3 · the onboarding sheet", text: "onboarding folded in on the same pattern, and the combined table became too long to be one table.", note: "this is the phase that produced views, and the phase where testing deleted columns rather than adding them" },
        ],
        caption: "staged rather than migrated at once. the sheet was live money the whole time.",
      },
      {
        kind: "system",
        label: "what one payment record has to hold",
        paragraphs: [
          "a payment is an amount, the instrument it arrived by, where that instrument is now, and what each downstream team may do next. the statuses are not a pipeline, they are the states a real payment gets stuck in. the row spans sales, finance and delivery, for people who each care about a third of it.",
        ],
        mapping: [
          { from: "paid in one shot", to: "cleared, or still pending verification" },
          { from: "part payment", to: "part paid by airtribe, or awaiting the rest" },
          { from: "credit card, no cost emi", to: "will pay by credit card, then cleared" },
          { from: "credit card, cost emi", to: "same path, different maths" },
          { from: "loan, no cost emi", to: "pushed for loan, documents, approval, disbursement" },
          { from: "loan, cost emi", to: "or rejected, which is its own state and not a failure of the form" },
        ],
        metrics: [
          { label: "payment types", value: "6" },
          { label: "payment statuses", value: "11" },
          { label: "fields on the record", value: "~18" },
          { label: "teams reading the same row", value: "3" },
        ],
        note: "it also carries slack access, onboarding status, an lxd comment and dashboard access. phase 2: other teams' columns inside a sales record, because that is where the sheet had put them.",
      },
      {
        /*
         * These were written as callouts for a screenshot that did not exist
         * yet. Captures do exist now and sit above and below this block, but
         * these six stay as prose: each states its own decision in full, and
         * six labels pinned around one frame would make a diagram out of
         * something that reads better as a list.
         */
        kind: "constraints",
        label: "the decisions the screen had to make",
        items: [
          { label: "constrain anything with a definitive answer", text: "every field with a finite set of correct answers became a dropdown. this is what made filtering possible at all: you cannot filter a column eleven people have spelled eleven ways, and the sheet had several." },
          { label: "colour is for spotting, not reading", text: "only the anomalies carry colour: likely to refund, confirmed but not paid, loan rejected. the ordinary states do not, because if everything is coloured nothing is." },
          { label: "sync is a state, not a success message", text: "reconciling with the sheet resolves six ways: created, pulled in, already in sync, not found or not permitted, failed, or ambiguous. ambiguous is the one that matters, because a person at 6pm has to be told which record they are looking at and which they are not." },
          { label: "a rejected loan is a state, not an error", text: "loan rejected, access removed, awaiting documents and waiting for disbursement are ordinary places a payment sits. as error states they would say the agent had done something wrong." },
          { label: "the same learner, twice, on purpose", text: "a learner who re-enrols is a second payment record, not a correction of the first, so duplicates by name are legitimate and cannot be merged away. the latest carries a live badge; the older ones stay readable." },
          { label: "the same name leads two different places", text: "the same lead opens the opportunities page for sales and the learner profile for lxd. the row is shared; the job you are doing with it is not." },
        ],
      },
      {
        kind: "turn",
        label: "the flaw we shipped",
        tried: "a name and an email are never read apart, so we merged them into one cell: name on the line, email as a subline. it tested well with the sales team and gave back a column on a table that needed the room.",
        result: "it broke a workflow nobody had shown us. the people granting slack access take the whole column at once: one drag, about five minutes for a cohort. as a subline there was nothing to select, so it became copying by hand, about fifty minutes. we had researched the team that writes the record and missed the team that reads it a hundred rows at a time.",
        change: "the email came back out as its own column, and the rule came with it: a column is not a field, it is a workflow. every merge candidate now gets a second question, not is it read beside its neighbour, but is it ever selected, sorted, exported or copied alone.",
      },
      {
        kind: "full",
        media: {
          type: "image",
          src: "/case/vision/slack-bulk.png",
          width: 1662,
          height: 744,
          alt: "rows selected across the table, a bar reading ten selected with copy ten emails and update slack access, and the dialogue that collects the selected addresses as chips",
        },
        fit: "contain",
        frame: true,
        caption: "the repair. select the rows, take all ten addresses in one click, or set slack access for all of them in one dialogue. fifty minutes of copying is now the fastest path in the product.",
      },
      {
        kind: "context",
        label: "filters, and a chicken and egg problem",
        paragraphs: [
          "an opportunity carries about twenty five fields across three lifecycle axes people mistake for one: a status, a stage, and a separate lead status. showing all of them was the overflow; burying them two clicks deep would have made the product slower than the sheet at the task the sheet was worst at.",
          "so the filter set stopped being fixed. a new user gets recommended filters, then the bar shows what they last used, and the rest expand in place. a combination worth keeping becomes a named view. search gained include and exclude, to stop a query quietly returning the wrong queue.",
        ],
      },
      {
        kind: "full",
        media: {
          type: "image",
          src: "/case/vision/filters-before.png",
          width: 1045,
          height: 155,
          alt: "the old filter bar: twenty-nine filter controls wrapping onto four rows",
        },
        fit: "contain",
        frame: true,
        caption: "before. twenty-nine filters over four rows, between the search box and the table they govern, and the same twenty-nine for everyone.",
      },
      {
        kind: "full",
        media: {
          type: "image",
          src: "/case/vision/filters-after.png",
          width: 1160,
          height: 145,
          alt: "the new filter bar: nine filters over two rows, four of them active and showing their values, with more filters, save filter view and a saved view selector",
        },
        fit: "contain",
        frame: true,
        caption: "after. nine, and they are this person's nine. an active filter prints its value and counts the rest, so the bar states the query rather than the fields. the other twenty expand in place.",
      },
      {
        kind: "context",
        label: "email templates, for managers and agents",
        paragraphs: ["the same product, a different muscle. templates are what the sales team sends from, and the design question is not the editor, it is the line between the two roles: what a manager can author and what an agent can only send. it is the same question the permissions work below asks at the level of the whole product."],
      },
      {
        kind: "context",
        label: "who is allowed to see what",
        paragraphs: [
          "almost nobody should see the whole row, so access runs on four axes that are deliberately not the same thing: department, role, permission group, and who you report to. a title is not a permission.",
          "permissions are namespaced into eleven categories and compose into named groups rather than being handed out one at a time. it took the longest to argue for, and it is what makes every other decision on this page enforceable: views, editable columns and the action menu all read from it.",
        ],
      },
      {
        kind: "full",
        media: {
          type: "image",
          src: "/case/vision/team-members.png",
          width: 1294,
          height: 1068,
          alt: "the team members table: department, role, manager and permission group as four separate columns, with a row's action menu open on edit, login as, block access and remove",
        },
        fit: "contain",
        frame: true,
        caption: "four columns because they are four separate questions. six of the eight rows here carry a role and a permission group that do not match. blocking and removing are different things, which matters when somebody leaves and their records must not.",
      },
      {
        kind: "full",
        media: {
          type: "image",
          src: "/case/vision/permission-group.png",
          width: 1782,
          height: 692,
          alt: "building a permission group: a category sidebar, namespaced permission checkboxes, and a review dialogue listing every permission selected before the group is created",
        },
        fit: "contain",
        frame: true,
        caption: "opportunity management alone holds ten permissions, through to manage descendant's opportunities, which reads the reporting line to decide whose records you can touch. the group is listed back in full before it exists, and again before anyone is given it.",
      },
      {
        kind: "statement",
        text: "a spreadsheet's real advantage is not that it is flexible. it is that nobody has ever had to ask it for permission.",
      },
      {
        kind: "outcome",
        paragraphs: [
          "the sales sheet is no longer the source of truth. three spreadsheets across two departments are now one table carrying the whole lead lifecycle, first payment through to onboarding into the lms. all three phases shipped, alongside the email template flow, the cohort filter and the filters and search redesign.",
          "views and role-based permissions cut scroll depth in half, and accidental edits dropped once a row could be asked who last touched it. the sales team moved off the sheet with no re-learning period. onboarding ended with fewer columns than it started with. the one workflow the design broke, bulk-copying emails, went from five minutes to fifty before it was caught.",
          ],
      },
      {
        kind: "deeper",
        paragraphs: [
          "the rest of vision, the opportunities pages, the learner profile, the email templates and the permission work, sits behind an airtribe nda, as do the research sessions and the phases that were tested and cut. i can walk through it privately.",
        ],
        links: [{ label: "get in touch", href: `mailto:${site.email}` }],
      },
      {
        kind: "reflection",
        text: "the first phase went on matching the sheet rather than beating it, and everything after on the two things it structurally could not do. i think that order was the whole job. the sync states are the proof of how long it takes: the product had to say already in sync for months before anyone agreed it was the source of truth.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────── airtribe ai skills ──
  "airtribe-ai-skills": {
    slug: "airtribe-ai-skills",
    hero: {
      kicker: "ai systems · airtribe",
      title: "airtribe ai skills",
      subtitle:
        "two skills at airtribe. one used by the team that writes what paid learners get, one by the learner. in both, what is being designed is how much room the author is allowed.",
      /*
       * The pre-read components themselves, composed over a render on a
       * transparent ground: a rice calculator with its live ranking, the
       * three-column dimensions table, the type-hint lab and a budget
       * allocator already two weeks over. The fold introduces the internal
       * skill, so it opens on what that skill produces.
       *
       * Contained, not filled. The cards are laid to the frame's edges and a
       * cover crop eats the outermost two; the transparent ground means the
       * space either side is the page, not a band.
       */
      media: {
        type: "image",
        src: "/case/airtribe-ai-skills/hero.webp",
        width: 2000,
        height: 1148,
        alt: "four pre-read components composed over a purple render: a rice calculator with a live priority ranking, a table comparing the product manager's job across three company stages, a type-hint clarity lab, and a quarterly budget allocator flagged two weeks over",
      },
      mediaFit: "contain",
      mediaFrame: false,
      meta: [
        { label: "role", value: "product designer" },
        { label: "team", value: "four: two product designers, one backend, one frontend" },
        { label: "context", value: "airtribe · pre-reads and cohort live" },
        { label: "year", value: "2026" },
      ],
      /*
       * No links in this fold. It used to carry kai's live demo and a link
       * out to kai's own page, which sent a reader to the second half of the
       * page before they had read the first, and out of the site entirely
       * before the pre-read skill, which is what the fold introduces, had
       * said anything. Kai is now a chapter below rather than a separate
       * case study, so its demo link sits where kai is discussed.
       */
    },
    sections: [
      { kind: "thesis", eyebrow: "product thesis", text: "a skill is a packaged set of instructions a model works inside. airtribe's two are not versions of each other, and in both the work is the same: deciding what the author may change and what they may never touch." },
      {
        kind: "context",
        paragraphs: [
          "the two pull in opposite directions. inside, the author is a colleague building for a catalogue, so the risk is drift. outside, the author is the model itself, writing for one reader who cannot easily check it, so the risk is trust. the pre-read skill protects the product from its authors; kai protects the reader from the product.",
        ],
      },
      {
        /*
         * Stated once, at the top, rather than repeated inside each of the
         * two case studies below: it is one team and one way of working
         * across both skills.
         */
        kind: "context",
        label: "role and ownership",
        paragraphs: [
          "two product designers ran both of these end to end. i took the ground research, the problem framing, the conversations with the lxd team and the stakeholders around them, and the design decisions below; we split the ui screens, and the other designer led the handoff. one backend and one frontend engineer alongside. each skill below is its own case study.",
        ],
      },

      /*
       * ── 01 · PRE-READS, THE INTERNAL SKILL ────────────────────────────
       *
       * Two case studies share this page, and each one runs its own full
       * arc: thesis, context, question, the product, the decisions, the
       * outcome. They open on a `thesis` rather than a labelled `context`
       * because the eyebrow plus display type is the only break on this site
       * big enough to read as "a new project starts here" in one scroll.
       *
       * The internal skill leads. Both are ai work, but this is the one that
       * is a system somebody else has to author inside, and that is the
       * harder thing to have done. Kai follows, and the page still opens on
       * kai's landing, because the index tile is kai and a reader clicking a
       * tile should arrive at the picture they clicked.
       */
      {
        kind: "thesis",
        eyebrow: "01 · pre-reads · the internal skill",
        text: "a pre-read is what a learner gets before a live session, and at airtribe they are written by learning designers rather than visual ones. across a growing catalogue that produced fifty lessons which each looked slightly like whoever wrote them.",
      },
      {
        kind: "context",
        label: "what drifted, and how",
        paragraphs: [
          "the lxd team took up the problem that pre-reads were walls of text and wanted them interactive enough to be worth opening. the catch is who writes them.",
        ],
      },
      {
        kind: "question",
        text: "how do you hand ten to fifteen people the freedom to build anything a lesson needs, and still have it come out looking like one product?",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/airtribe-ai-skills/boards.webp", width: 2000, height: 1168, alt: "two working boards side by side: on the left the component exploration in light and dark, from avatars and text blocks through chat, quiz, visualisation and loader states; on the right the comp board for the product management programme" },
        fit: "contain",
        frame: true,
        caption: "the working boards, at the zoom where you stop reading them and start seeing the size of the problem.",
      },
      /*
       * The four-stage research run that used to sit here (frame, audit,
       * scan, synthesise) came out. It documented method rather than
       * decisions, and everything it carried is said more usefully elsewhere:
       * the audit is the restyle checklist quoted in the context above, and
       * the eight families are the system section below. The decisions block
       * that replaces it is the same work, cut as calls rather than steps.
       */
      {
        kind: "decisions",
        label: "key decisions · pre-reads",
        items: [
          {
            n: "01",
            title: "a skill, not templates or a rulebook",
            why: "templates hold a catalogue together by capping what a lesson can be. a rulebook leaves an author free and gets read once. the lxd team needed both halves at once, across a catalogue still growing.",
            tradeoff: "a skill has to be comprehensive enough to write a whole lesson inside, far more to author and maintain than a page of guidelines.",
            result: "the brand is inherited by construction rather than checked after the fact, so the only thing left for a learning designer to decide is the teaching.",
          },
          {
            n: "02",
            title: "classify by behaviour",
            why: "most of a real pre-read is not a library primitive. it is dioramas, chat dialogues, tap-sort exercises, a gamification rail, a 3d rice space. whatever a library failed to cover would have been the interesting part of the lesson.",
            tradeoff: "eight behaviours is coarser than a list of components, and it asks an author to decide what a thing does before building it.",
            result: "anything new is placed by what it does, prose, widget, data-figure, chrome or code, inherits that family's surfaces, and comes out airtribe without passing a designer.",
          },
          {
            n: "03",
            title: "govern the look and nothing else",
            why: "a skill that reached into structure or pedagogy is one the learning designers would route around, and its whole value is that they author inside it.",
            tradeoff: "it can produce a pre-read that is perfectly on-brand and badly taught, and there is no guardrail in it that would catch that.",
            result: "one accent, cool neutrals, two typefaces, every state defined. structure, sections and the teaching stay with the author, and the skill says so in as many words.",
          },
        ],
      },
      {
        kind: "turn",
        label: "the tool we built and threw away",
        tried: "the lxd team arrived with a version that had every possible interaction in it. we broke it into categories, shipped a basic version, and it was rejected: too simple. so we went back and did the pedagogical work we had skipped, then built a component maker, a framer-like tool for assembling the artifacts.",
        result: "it made the workflow worse. the chain already ran designer, program manager, copy-paste into the dashboard; the maker added another station and one more place for an error to enter.",
        change: "we scratched it and built the skill instead, comprehensive enough that the designer writes the whole lesson inside it and hands over a link. the rule: when a tool sits between the person who understands the material and the thing the learner reads, the tool is the problem.",
      },
      /*
       * The pedagogical pass. The `turn` above says we went back and did the
       * work we had skipped; this is that work, and without it the claim is
       * just a sentence. The finding that mattered is the cheapest one on the
       * board: the last beat already existed, it was in the wrong place.
       */
      {
        kind: "annotated",
        label: "what interactive was actually doing",
        media: { type: "image", src: "/case/airtribe-ai-skills/pedagogy-jobs.png", width: 940, height: 640, alt: "a board splitting the prototype's interactive elements into two jobs: forcing active thought, and visual variety as a palate cleanser" },
        fit: "contain",
        frame: true,
        items: [
          { title: "two jobs, and only one of them teaches", text: "every interactive element in the prototype, sorted into two piles. job a forces active thought: the quiz that interrupts the narrative, the prompt that makes you apply it. job b is visual variety: radar charts, fake chrome, mock terminals." },
          { title: "job b is allowed, it is just not progress", text: "visual variety makes a page less monotonous. it does not change what the learner remembers. the prototype was dense with job b, and we had read that density as evidence the lesson was interactive." },
          { title: "name the mechanism, or you are only adding widgets", text: "job a works because of retrieval practice, spaced thinking and the generation effect. writing those down let us argue for one interaction over another instead of about how many there were." },
        ],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/airtribe-ai-skills/pedagogy-loop.png", width: 1000, height: 920, alt: "a four beat learning loop: encountering a situation, forming a position, testing it against reality, connecting it to yourself" },
        fit: "contain",
        frame: true,
        caption: "what a learner does in a good lesson, as four beats. the second is new: commit to an answer before the explanation arrives, and the explanation can be written as a reply to what you picked. the fourth existed but sat at the end. moving it cost no new components.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/airtribe-ai-skills/interactivity.png", width: 1616, height: 936, alt: "probable types of interactivity mapped across three programmes: product management, backend engineering and generative ai" },
        fit: "contain",
        frame: true,
        caption: "the three programmes do not share a way of being right. a product answer is defended, so pml gets decision scenarios and spec critique. a backend answer is executable, so bel gets a sandbox. a generative ai answer is evaluated, so gai gets prompt iteration and eval design. one approved list could not have served all three.",
      },
      {
        kind: "pipeline",
        label: "the workflow the skill actually changed",
        steps: [
          { glyph: "input", label: "the designer writes the lesson", text: "the learning experience designer designs the material and its teaching in one pass, inside the skill.", note: "before, they designed the material and handed it on to someone else to assemble" },
          { glyph: "receipt", label: "a link, not a document", text: "what comes out is an interactive lesson at a url.", note: "before, a program manager copy-pasted the material into the internal dashboard, which is where errors entered" },
          { glyph: "converge", label: "the manager embeds the link", text: "the program manager drops it into the learner dashboard. that is the whole handover.", note: "content quality now belongs to the person with the pedagogy, and uniformity belongs to the skill" },
        ],
      },
      /*
       * The first spec, and why it had to be loosened. Without this the page
       * contradicts itself: it argues for eight behaviour families while the
       * artifact on screen is a thirteen-component library. The contradiction
       * is the story, so it is stated rather than cropped out.
       */
      {
        kind: "full",
        media: { type: "image", src: "/case/airtribe-ai-skills/spec.png", width: 2000, height: 1236, alt: "the first skill's output contract: its five sections, and the required html boilerplate with the pinned babel version and the exact script tag called out" },
        fit: "contain",
        caption: "section 1.2 of the first skill version, typeset from the file: the tag verbatim, with the failure written next to the version that causes it. a rule an author can paste survives the next person who tidies a dependency list.",
      },
      /*
       * The part that is not a style guide. A reader can dismiss tokens and
       * families as taste; these are the rules that decide whether the file
       * renders on the platform at all, and they are the reason an author
       * without an engineer can ship one.
       */
      {
        kind: "constraints",
        label: "what the spec carries besides colour",
        items: [
          { label: "a file, not a design file", text: "one self-contained html page, react and tailwind from a cdn, no build step, so a learning designer can upload it without an engineer." },
          { label: "a pinned version, with the reason next to it", text: "babel standalone is pinned to 7.17.12. newer builds default to the automatic jsx runtime, which injects an import into a non-module script and renders a blank page. the pin is written down with the failure beside it." },
          { label: "one exact script tag", text: "type text/babel, with no data-presets, no data-type and no type module. each reintroduces the same blank page." },
          { label: "a weight budget", text: "the renderer accepts 500kb. generated pre-reads land between 50 and 80kb, so the budget is headroom rather than something an author thinks about." },
          { label: "an allowlist, not a hope", text: "the content security policy names the script, font and avatar hosts by hand. without it a file works on the designer's laptop and nowhere else, and the failure arrives weeks later as somebody else's bug." },
          { label: "no em dashes, anywhere", text: "a copy rule that is really a visual one, checked with a grep before shipping. the smallest rule in the system and the most reliable tell for whether a lesson went through it." },
        ],
      },
      {
        kind: "turn",
        label: "the spec that was too tight",
        tried: "the first version was prescriptive: thirteen components with their full source in the file, two permitted border radii, twenty-two named prohibitions, and a rule saying do not invent new components. on its own terms it worked.",
        result: "the lxd team found it too limiting. they built their own pre-reads outside it, with components the thirteen did not cover, and those were the ones that shipped, off the visual language. the worst available outcome: a spec nobody authored inside, and a catalogue that had stopped looking like one product.",
        change: "it was rewritten to govern less. thirteen components became eight behaviour families, radius went back to the author, and the scope narrowed to the visual layer alone. a rule people route around protects nothing.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/airtribe-ai-skills/comps.png", width: 1368, height: 1512, alt: "the component comp board for the product management programme: text, dialogue, table, tab, progressive, quiz, slider calculator and data-viz cards" },
        fit: "contain",
        frame: true,
        caption: "the inventory for one programme, and the drift, in one picture. each column is a behaviour the system had to cover. the cream grounds, the orange tabs and the serif heading are what the restyle checklist lists.",
      },
      {
        kind: "system",
        label: "eight families, not a component library",
        paragraphs: [
          "the catalogue is not a set of components, it is eight behaviours with a visual treatment attached. each family carries the same three constants: purple is the one accent, neutrals are cool, colour means state.",
        ],
        mapping: [
          { from: "01 reading & narrative", to: "prose on the ground, accent for emphasis, never a boxed paragraph" },
          { from: "02 characters & dialogue", to: "learner bubble purple-tinted, mentor neutral, always inside a panel" },
          { from: "03 assessment & interaction", to: "selected purple, correct green, wrong red, no confetti" },
          { from: "04 calculators & inputs", to: "purple is the value, semantics are the state, tabular numerals" },
          { from: "05 comparison & structured", to: "column tags, hairline separators, a middle dot for an empty cell" },
          { from: "06 data-viz & dioramas", to: "chart palette purple-led, real type inside the svg, dark surfaces never black" },
          { from: "07 app chrome & gamification", to: "purple progress on cool neutrals, calm rather than arcade" },
          { from: "08 technical, code & diagrams", to: "a defined code surface, mono for code, palette-restrained connectors" },
        ],
        colors: [
          { hex: "#683FBE", name: "purple, the one accent" },
          { hex: "#2563EB", name: "blue, info" },
          { hex: "#12875A", name: "green, correct" },
          { hex: "#DC2626", name: "red, wrong" },
          { hex: "#CA8A04", name: "yellow, warning" },
        ],
        type: [
          { name: "display", value: "plus jakarta sans" },
          { name: "body", value: "inter" },
          { name: "data", value: "jetbrains mono, real code only" },
        ],
        note: "permissive on purpose. radius is the author's choice as long as one pre-read is consistent with itself.",
      },
      {
        kind: "annotated",
        label: "what a guardrail looks like up close",
        media: { type: "image", src: "/case/airtribe-ai-skills/components-states.png", width: 2560, height: 1690, alt: "a quiz answered correctly, a slider calculator and a counter allocator, each with its motion spec" },
        fit: "contain",
        frame: true,
        items: [
          { title: "one accent, one job", text: "the score, the slider fill and the chosen row are the same purple. correctness is green, over-budget is red, because colour is only ever allowed to mean state." },
          { title: "every state, or it isn't done", text: "hover, focus-visible, selected, correct, incorrect, disabled. a component with only a default state is unfinished." },
          { title: "the spec sits in the corner", text: "200ms, ease-out, colour transition, written beside the component so the next author does not guess at what calm looks like." },
          { title: "replay, not confetti", text: "the reward for a right answer is the state change, plus a way to run it again." },
          { title: "a written list of what we are not doing", text: "kind a hangs off an interaction, eases out, finishes inside 500ms. kind b was decorative, scroll fades on prose, confetti, ambient loops, bounce and elastic easings, and it did not ship. it sits in the spec under what we are not doing." },
        ],
      },
      {
        kind: "figures",
        media: [
          { type: "image", src: "/case/airtribe-ai-skills/lesson.png", width: 2560, height: 2700, alt: "a pre-read opening with its learning objectives and a tabbed comparison of three systems" },
          { type: "image", src: "/case/airtribe-ai-skills/exercise.png", width: 2560, height: 1700, alt: "a four-step trace exercise that fills in as the learner answers" },
        ],
        columns: 2,
        fit: "contain",
        caption: "built inside the guardrails, by learning designers. neither is a component in a library. both were placed by behaviour and inherited the treatment.",
      },

      {
        kind: "outcome",
        label: "outcome · pre-reads",
        paragraphs: [
          "the skill carries around fifty pre-reads across fifty modules, five subtracks and three courses, reaching more than fifteen hundred learners, authored by ten to fifteen people with no visual designer in the loop. those are scope figures, not outcome claims.",
          "of the four hundred and twenty learners who answered the closing prompt in phase one, sixty per cent called the format more positive and engaging. that is one phase across two tracks, not the catalogue, and it is the one measured signal this work has so far.",
          "what the system did to the work is still the next thing to measure against a baseline: adoption over one-off styling, review rounds per pre-read before and after, brand-audit pass rate, and whether authors say they can ship on-brand without design support.",
        ],
      },

      /* ── 02 · KAI, THE CONSUMER SKILL ─────────────────────────────────── */
      {
        kind: "thesis",
        eyebrow: "02 · kai · the consumer skill",
        text: "most 'learn anything with ai' products are a chat box with a better frame: you ask, it answers, and what you are left with is a transcript. kai writes a lesson instead, to four answers you give before it starts.",
      },
      {
        /*
         * The chapter opener, straight after the eyebrow that names it, so
         * the second case study starts on an image the way the page does.
         * Contained on a transparent ground and unframed, like the two
         * heroes: the artwork is drawn to its own edges and a box round it
         * would read as a specimen case.
         */
        kind: "full",
        media: {
          type: "image",
          src: "/case/airtribe-learn/kai-opener.webp",
          alt: "kai's landing: learn something you've been wondering about, a prompt field, and three steps reading you bring the question, kai builds the lesson around you, you learn test and explore. around it, a concept map of consciousness and a diagram of photosynthesis, both produced inside a lesson",
          width: 2000,
          height: 1403,
        },
        fit: "contain",
        caption: "a guided lesson with sources, not an answer. what sits around the landing is the part a chat box cannot do: a map of what the topic is made of, and a diagram where a third paragraph would have gone.",
      },
      {
        kind: "context",
        label: "what kai is",
        paragraphs: [
          "kai is an ai-first learning experience for the airtribe community: give it a topic, answer four questions, and it writes the lesson to those answers. a concept map draws the ideas as you read, a library holds the source behind every claim, and kai unpacks any phrase you highlight.",
        ],
      },
      {
        kind: "question",
        text: "what if ai adapted to how someone learns, instead of only answering what they asked?",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/airtribe-learn/lesson.png", width: 1800, height: 1125, alt: "the three-pane workspace: kai chat, the lesson, and the lesson, map and library tabs" },
        fit: "cover",
        caption: "kai on the left, the lesson in the centre, the map and library one tab away. the tip up top is the whole posture: highlight anything and ask.",
      },
      { kind: "statement", text: "kai opens a lesson by naming what you already know. it is one sentence, and it does more for trust than anything else in the product." },
      {
        kind: "pipeline",
        label: "how a lesson gets made",
        steps: [
          { glyph: "input", label: "topic", text: "you give kai something you have been wondering about." },
          { glyph: "cards", label: "intake", text: "four questions: purpose, background, prior knowledge, depth.", note: "asked once, up front. personalising afterwards writes the lesson for no one" },
          { glyph: "layers", label: "lesson", text: "a hook, a worked example, the misconception, a quick check, a reflection." },
          { glyph: "graph", label: "map", text: "the concepts and their links, drawn as you read." },
          { glyph: "archive", label: "library", text: "the source behind each claim, marked cited and linked out." },
        ],
      },
      {
        kind: "decisions",
        label: "key decisions · kai",
        items: [
          {
            n: "01",
            title: "build it the way a teacher would",
            why: "a chat answers the question you asked and skips the shape around it. that is nearly the opposite of teaching.",
            tradeoff: "the output has to be planned before it is written, which is far more machinery than answering.",
            result: "a hook, a worked example, the misconception that keeps the idea fuzzy, a quick check, a reflection. the hard idea gets a diagram, not another paragraph.",
            media: { type: "image", src: "/case/airtribe-learn/framework.png", width: 1272, height: 1476, alt: "a lesson diagram splitting the easy problems from the hard problem" },
            fit: "contain",
          },
          {
            n: "02",
            title: "ask four questions, then commit",
            why: "personalising after the fact, a simplify-this button, comes too late; the lesson is already written for no one.",
            tradeoff: "four questions is four screens before anyone has read a single word.",
            result: "purpose, background, prior knowledge and depth are set once, and the lesson, its examples and how far each section pushes are written to them.",
            media: { type: "image", src: "/case/airtribe-learn/intake.png", width: 1800, height: 1125, alt: "the four-question intake before a lesson is written" },
            fit: "cover",
          },
          {
            n: "03",
            title: "draw the topic while you read it",
            why: "a lesson you read and close leaves nothing you can hold onto.",
            tradeoff: "a second, structural view of the topic to build and keep in step with the lesson.",
            result: "the map draws the concepts and their links as you go, with room for your own notes, so the shape of the topic outlives the reading.",
            media: { type: "image", src: "/case/airtribe-learn/map.png", width: 1800, height: 1125, alt: "a concept map connecting the ideas in the lesson" },
            fit: "cover",
          },
          {
            n: "04",
            title: "cite sources, not vibes",
            why: "an ai that merely sounds confident is easy to build and easy to distrust.",
            tradeoff: "every claim has to trace to something real, in the lesson and in the library.",
            result: "key sentences are footnoted, and the library gathers the sources, each marked cited and linked out.",
            media: { type: "image", src: "/case/airtribe-learn/library.png", width: 1800, height: 1125, alt: "the library of cited and further-reading sources" },
            fit: "cover",
          },
        ],
      },
      {
        /*
         * The same three moves on a phone. Cut out of the mobile prototype's
         * own captures and unframed, so they stand on the page in either
         * theme. Three separate figures rather than one composed strip: the
         * grid drops to a single column under md, and a strip of three
         * phones on a 375px screen is three phones at 100px each.
         */
        kind: "figures",
        columns: 3,
        frame: false,
        media: [
          { type: "image", src: "/case/airtribe-learn/mobile-waiting.webp", width: 822, height: 1635, alt: "kai on a phone while a lesson is being written: the opening hook in large type, ready when you are underneath it, and a start reading button" },
          { type: "image", src: "/case/airtribe-learn/mobile-map-sheet.webp", width: 822, height: 1635, alt: "the map and library arriving as a sheet over the lesson, with the concept tree listed under retrieval augmented generation" },
          { type: "image", src: "/case/airtribe-learn/mobile-concept-map.webp", width: 822, height: 1635, alt: "the concept map as a vertical tree, with cosine similarity open in a detail sheet showing what it relates to and a jump to lesson 3 button" },
        ],
        caption: "the wait, the map and library as a sheet over the lesson, and the concept map with one concept open. each of the three is a desktop answer that had to be rebuilt rather than resized.",
      },
      {
        kind: "turn",
        label: "the wait we tried to hide",
        tried: "generating a lesson takes ten to thirty seconds, and the first instinct was the usual furniture for that gap: a spinner, or a progress bar.",
        result: "a progress bar that tracks nothing is a lie, and neither it nor a spinner gives the learner anything to do. the countdown we tried next was worse than both: naming the seconds left makes the wait feel longer.",
        change: "the building screen became a wait ladder: a hook lands immediately, then the shape of the lesson assembles line by line while the rest is written, so the learner is reading before the lesson exists. a notify me hatch sits under it. the rule: dead time is a content problem before it is a loading problem.",
      },
      {
        kind: "turn",
        label: "the map that could not be shrunk",
        tried: "on desktop the concept map is an svg, with measured and word-wrapped text and collision-free tree packing. the obvious move for the phone was to scale that same svg down.",
        result: "shrunk, it is unreadable and un-tappable. the svg had already cost a layout bug, labels like 'knowledge argument (mary's room)' overflowing their nodes. the phone version was not a rendering problem, it was the wrong object.",
        change: "the phone got a different map rather than a smaller one: a native vertical tree of plain dom lists with css connector spines. it scrolls, it wraps, a tap opens a focus card. two renderings for two jobs beats one compromised for both.",
      },
      {
        kind: "constraints",
        label: "the rest of what the phone changed",
        items: [
          { label: "kai is a sheet, not a screen", text: "kai was close to becoming a separate destination, which fights the product: the lesson is the point. it became a peek and expand sheet, a line at the bottom that one tap brings up over the lesson, so the lesson never leaves." },
          { label: "the header was carrying desktop clutter", text: "teach appeared twice on the expanded sheet, and the demo badge sat on the header's map icon. the fix was not to nudge either: the header came down to brand left and map icon right, the breadcrumb went, the badge moved to the bottom. a collision is usually a density problem in a positioning costume." },
          { label: "the em dash rule did the editing", text: "the hook was written with em dashes, which the project style forbids. rewriting them as full sentence breaks made it punchier. the pre-reads spec above carries the same rule." },
        ],
      },
      {
        kind: "panel",
        label: "a way out of the model",
        emphasise: [0],
        paragraphs: [
          "an ai-first product that never points outside itself is asking to be trusted more than it has earned.",
        ],
      },
      {
        kind: "bleed",
        media: { type: "image", src: "/case/airtribe-learn/launch/thesis.png", width: 1600, height: 842, alt: "a kai lesson on the hard problem of consciousness, with its concept map open beside it" },
      },
      {
        kind: "outcome",
        label: "outcome · kai",
        paragraphs: [
          "kai runs inside airtribe and has reached more than ten thousand learners. it sits behind the login, where it is available to enrolled learners and nobody else.",
          "so what is linked here is a demo build: one seeded lesson running the full system end to end, with the intake open to any topic. it exists so that this page has something you can actually open. what it carries is the shape, an ai learning product can plan a lesson rather than answer a question, and the cost is four screens of intake before anyone reads a word.",
        ],
      },

      // ── close ────────────────────────────────────────────────────────────
      {
        kind: "statement",
        text: "both are defined by what they refuse. the pre-read skill refuses confetti. kai refuses to just answer. in a system that generates, the design decision worth having is almost always a subtraction.",
      },
      /*
       * The single combined outcome that used to sit here has been split in
       * two and moved: each skill now closes its own case study with its own
       * result, because a catalogue of fifty pre-reads and a shipped lesson
       * agent are not the same kind of claim and reading them as one
       * paragraph invited someone to average them.
       */
      {
        kind: "deeper",
        paragraphs: [
          "the pre-reads the internal skill produces are what paid learners get, so the system and the reasoning are public here and the lessons themselves are not.",
          "the spec, the audit the eight families came out of, and the version that was built and thrown away are all things i am happy to walk through privately.",
        ],
        links: [
          { label: "open the kai demo", href: "https://willowy-blancmange-6a230b.netlify.app/" },
          { label: "get in touch", href: `mailto:${site.email}` },
        ],
      },
      { kind: "reflection", text: "i was annoyed when the first version came back as too simple, and it took me a while to hear what was being asked: not more components, but evidence we had thought about the teaching. the skill still governs only how a pre-read looks, so it can produce something on-brand and badly taught." },
    ],
  },
  // ──────────────────────────────────────────────────────────────── lipi ──
  lipi: {
    slug: "lipi",
    hero: {
      kicker: "figma plugin · self-initiated",
      title: "lipi",
      // TODO · the framer page carries kai's subtitle in this slot. this is
      // lipi's own line, from the case study it replaced.
      subtitle:
        "a figma plugin that pressure-tests a screen against localized copy, then points at the component causing the break.",
      media: { type: "video", src: "/case/lipi/film.mp4", alt: "lipi generating a localized screen and finding the layout break" },
      mediaFit: "cover",
      mediaPosition: "center",
      mode: "launch",
      meta: [
        { label: "role", value: "design + direction, built with ai" },
        { label: "context", value: "self-initiated · localisation testing" },
        { label: "year", value: "2026" },
      ],
    },
    sections: [
      {
        kind: "credits",
        label: "about",
        paragraphs: [
          "interfaces are usually designed in one language and adapted to many others later. but languages don't simply replace words, they change the geometry of a layout.",
          "the project explores a question: what if localization could be treated as a design-system stress test rather than a translation task?",
          "lipi is a figma plugin that pressure-tests interfaces across indian languages. it translates screens, measures how language changes their geometry, and points at the component behind the break.",
        ],
        creditsLabel: "credits",
        credits: [
          { role: "creative direction, product strategy", name: "evana sajan" },
          { role: "ui & ux design", name: "evana sajan" },
          { role: "coding & development", name: "claude, chatgpt" },
        ],
      },
      /*
       * Lipi keeps its long read: the edge cases ARE the product here, and
       * cutting them would cut the argument. The demo goes in early anyway,
       * because a plugin that finds layout breaks is far easier to believe
       * once you have watched it find one.
       */
      {
        kind: "prototype",
        label: "try it",
        src: "/play/lipi/index.html",
        title: "lipi, running on a simulated figma canvas",
        frame: "wide",
        hint: "tick a language, then press generate and test. the demo dictionary runs with no api key, so the whole loop works: it localizes the frames, measures what moved, and marks the components that broke.",
        caption: "the plugin running against a mock food-delivery app. the canvas is simulated; the panel, the dictionary and the detection are the real build.",
      },
      {
        kind: "detail",
        media: { type: "image", src: "/case/lipi/launch/thesis.png", width: 395, height: 769, alt: "a hindi checkout screen with a text-overflow flag on the primary button" },
        fit: "contain",
        side: "right",
        title: "product thesis",
        text: "ai has made translating products into new languages almost trivial. designing interfaces that survive those translations isn't.",
      },
      {
        kind: "bleed",
        media: { type: "image", src: "/case/lipi/launch/languages-bleed.png", width: 2000, height: 1002, alt: "one checkout, five scripts, side by side" },
      },
      {
        kind: "bleed",
        media: { type: "image", src: "/case/lipi/launch/system-board.png", width: 2000, height: 1125, alt: "the lipi component library" },
        overlay: {
          placement: "below",
          label: "behind the experience",
          // TODO · the framer page runs deep cuts' seven-stage journey here
          // (question, ai brain, paths, exploration, synthesis, receipt,
          // archive). these four are lipi's real loop, from its own pipeline.
          columns: [
            { label: "select", text: "point it at the english frames you care about" },
            { label: "generate", text: "a clone is translated and re-measured", note: "/never writes to your file" },
            { label: "preview", text: "the localized version lays over the original; reveal draws the measurements" },
            { label: "export", text: "the only permanent write in the whole tool" },
          ],
        },
      },
      {
        kind: "panel",
        label: "designed for systemic fixes",
        emphasise: [1, 4],
        paragraphs: [
          "localization testing is usually treated as a screen-by-screen qa task.",
          "we designed lipi to find the decision behind the failure.",
          "a translated button overflowing on six screens isn't six problems. it's one component problem. lipi connects individual failures back to their shared cause.",
          "don't just find what broke. find what caused it.",
          "the goal wasn't to help designers fix more localization issues. it was to help them fix fewer things that solve more problems.",
        ],
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/lipi/launch/four-scripts.png", width: 1300, height: 1300, alt: "four language tabs over the same checkout" },
          { type: "image", src: "/case/lipi/launch/reveal-panel.png", width: 1300, height: 1300, alt: "the reveal panel naming the exact layer" },
        ],
        captions: [
          { label: "one design · multiple scripts", text: "lipi scans the same checkout across hindi, tamil, bengali and kannada in one pass: four language tabs, six screens each, eleven findings, and it flags each script's clipped cta on the canvas." },
          { label: "preview · reveal · compare", text: "english fits, hindi overflows. lipi reveals the pressure in context, and its reveal panel names the exact layer and the recommended fix." },
        ],
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/lipi/launch/fix-recheck.png", width: 1300, height: 1300, alt: "before and after a re-check" },
          { type: "image", src: "/case/lipi/launch/root-cause.png", width: 1300, height: 1300, alt: "the design system tab collapsing failures into root causes" },
        ],
        captions: [
          { label: "fix · re-check", text: "you apply the fix (the button hugs its label); lipi re-checks the same screens and confirms. lipi doesn't auto-decide: the designer applies, lipi verifies." },
          { label: "screen → component → system", text: "three separate screen-level failures collapse into one root cause. lipi's design system tab: one decision, many resolutions." },
        ],
      },
      {
        kind: "panel",
        label: "interaction design",
        emphasise: [0, 6],
        paragraphs: [
          "lipi is a lens.",
          "recognition over reading. the canvas is the narrator; the panel stays quiet.",
          "two lenses, never merged. per-screen triage (fix now) and systemic root cause (fix once) are different jobs.",
          "preview by default. see it localized on the canvas immediately. problems should feel real, not tabular.",
          "one accent, calm colour. no dashboard, no ai theatre. credibility over impressiveness.",
          "optimize for clearing issues, not counting them. the whole loop is built to reduce the number, not admire it.",
          "the tool does the checking and the bookkeeping. the designer decides what should change.",
        ],
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/lipi/launch/preview-toggle.gif", width: 960, height: 960, alt: "preview turning on and off, restoring the original each time" },
          { type: "image", src: "/case/lipi/launch/system-tab.gif", width: 960, height: 960, alt: "the design system tab in motion" },
        ],
        captions: [
          { label: "never touch the original", text: "preview lays a hidden clone over the original; reveal draws locked overlays and drops you back on the editable layer." },
          { label: "roll the failures up", text: "fix the button once and watch the count fall across every screen it appears in." },
        ],
      },
      {
        kind: "bleed",
        media: { type: "image", src: "/case/lipi/system.png", width: 2560, height: 1600, alt: "the results view grouped by the component behind the failures" },
        overlay: {
          placement: "below",
          label: "system design",
          // TODO · the framer page runs deep cuts' hardware mapping here
          // (wheel, play, orange, shuffle). these lines are lipi's own.
          paragraphs: [
            "every flag is geometry: the baseline bounds, the localized bounds, and the growth between them. the interface never shows a severity score it cannot justify.",
          ],
          lines: [
            "select → the frames you care about",
            "generate → clone, translate, re-measure",
            "preview → localized over original",
            "reveal → the exact layer, and the fix",
            "export → the only permanent write",
            "languages · hindi and tamil today, the script ranges written for more",
          ],
        },
      },
      {
        kind: "panel",
        label: "edge cases",
        emphasise: [0, 4],
        paragraphs: [
          "the final phase focused on making localization testing resilient to the messy parts of real design systems.",
          "no frames selected / missing translation api key / external-library components / unsupported fonts / empty results / multiple languages / preview toggled mid-run.",
          "multi-language tests are treated as separate lenses over the same system. designers can switch between language reports without losing the shared findings.",
          "at the end of the loop, re-check compares the fixed state against the original findings, showing what disappeared, what remains, and how the issue count moved.",
          "the edge case isn't an exception to the workflow. it is part of the workflow.",
        ],
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/lipi/results.png", width: 2560, height: 1600, alt: "the results view" },
          { type: "image", src: "/case/lipi/reveal.png", width: 2560, height: 1600, alt: "reveal mode drawing measurement overlays on the canvas" },
        ],
        captions: [
          { label: "results", text: "issues aggregate into root causes, so the count falls by component rather than by screen." },
          { label: "reveal", text: "locked overlays on the canvas, and the editable layer still underneath." },
        ],
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/lipi/before-after.png", width: 2560, height: 1600, alt: "a fixed-width cta before and after it learns to hug its label" },
          { type: "image", src: "/case/lipi/product.png", width: 2560, height: 1600, alt: "lipi running in a dark figma workspace" },
        ],
        captions: [
          { label: "before · after", text: "one component learns to hug its label, and six screens stop breaking." },
          { label: "in place", text: "the plugin sits in the file you are already working in." },
        ],
      },
      {
        kind: "bleed",
        media: { type: "image", src: "/case/lipi/launch/languages-bleed.png", width: 2000, height: 1002, alt: "one design, many scripts" },
      },
    ],
  },


  // ─────────────────────────────────────────────────────── gateway to kerala ──
  "gateway-to-kerala": {
    slug: "gateway-to-kerala",
    hero: {
      kicker: "b.arch thesis · spa new delhi",
      title: "gateway to kerala",
      subtitle:
        "phase ii of the vytilla mobility hub in kochi, india's first multimodal transit hub: a mixed-use development over a bus terminal, beside a metro station, on a river.",
      media: { type: "image", src: "/case/gateway-to-kerala/01.jpg", width: 2400, height: 1592, alt: "the thesis model at night, two lattice towers over a podium on the river" },
      mediaFit: "cover",
      mediaPosition: "center",
      meta: [
        { label: "role", value: "architect, solo thesis" },
        { label: "context", value: "b.arch thesis, school of planning and architecture, new delhi" },
        { label: "year", value: "2023" },
      ],
      links: [{ label: "full thesis on behance", href: "https://www.behance.net/gallery/186846123/t-h-e-s-i-s" }],
    },
    sections: [
      {
        kind: "constraints",
        label: "in short",
        items: [
          { label: "problem", text: "vytilla is where kochi's buses, metro, water metro and national highway meet. the hub's second phase had to turn a place people pass through into one they stay in." },
          { label: "what i did", text: "a podium of retail, culture and entertainment tied to the metro concourse, two towers of offices, a business centre and service apartments joined by a skywalk, and the river edge given back as public ground." },
          { label: "result", text: "second best thesis at spa new delhi, 2023, and a charles correa gold medal finalist." },
        ],
      },
      { kind: "thesis", eyebrow: "thesis", text: "a transit hub is usually designed for the minute between two vehicles. this one asks what it would take for the same ground to work for the office-goer, the visitor, a family on a sunday, and the city seen from the flyover." },
      {
        kind: "full",
        media: { type: "image", src: "/case/gateway-to-kerala/02.jpg", width: 1695, height: 2400, alt: "the thesis proposition: the development seen from the highway, metro, bus terminal, river and walkway" },
        fit: "contain",
        frame: true,
        caption: "the proposition. one development read from five places, the highway, the metro station, the bus terminal, the river and the walkway, each with its own first image of the city.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/gateway-to-kerala/05.jpg", width: 1695, height: 2400, alt: "the programme stacked floor by floor over the site" },
        fit: "contain",
        frame: true,
        caption: "the programme, floor by floor. every position on this diagram is argued by a rule: noise, structure, privacy or the water table.",
      },
      {
        kind: "decisions",
        label: "decisions the site made",
        items: [
          { n: "01", title: "no basement", why: "the groundwater at vytilla sits too high to dig.", result: "parking goes into a mechanical multi-level car park, levels 0 to 10, and every service gathers into one utility centre at grade." },
          { n: "02", title: "the podium meets the metro", why: "most people will arrive by train.", result: "the podium connects at the metro concourse level, and all pedestrian circulation is lifted above the parking and service ground." },
          { n: "03", title: "entertainment on top of retail", why: "cinemas and amusement need long spans and make noise.", result: "retail keeps only the first three floors, and the cineplex and indoor amusement sit above it, where their structure belongs." },
          { n: "04", title: "two offices, one skywalk", why: "government and private offices need separate addresses and drop-offs.", result: "two towers, joined by a business centre and a skywalk at levels 20 to 24 that doubles as a vantage point." },
          { n: "05", title: "the river as ground, not backdrop", why: "activity is what keeps a river edge from neglect.", result: "viewing decks step down to a waterfront for kayaking, boating and fishing." },
        ],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/gateway-to-kerala/07.jpg", width: 2400, height: 1705, alt: "two site sections through the towers, metro station, flyover and river" },
        fit: "contain",
        frame: true,
        caption: "site sections. the towers rise to about 150 m between the flyover, the metro line and the kaniyampuzha river.",
      },
      {
        kind: "figures",
        media: [
          { type: "image", src: "/case/gateway-to-kerala/08.jpg", alt: "site plan" },
          { type: "image", src: "/case/gateway-to-kerala/15.jpg", alt: "floor plans" },
          { type: "image", src: "/case/gateway-to-kerala/13.jpg", alt: "elevation" },
        ],
        columns: 3,
        fit: "contain",
        caption: "site plan, floor plans and an elevation.",
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/gateway-to-kerala/22.jpg", alt: "detailed model of the towers" },
          { type: "image", src: "/case/gateway-to-kerala/23.jpg", alt: "site model" },
        ],
        captions: [{ label: "detailed model" }, { label: "site model" }],
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/gateway-to-kerala/24.jpg", alt: "concept sketch of the towers and podium" },
          { type: "image", src: "/case/gateway-to-kerala/25.jpg", alt: "concept sketch of the site" },
        ],
        captions: [{ label: "sketchbook" }, { text: "the boards were drawn from these." }],
      },
      { kind: "reflection", text: "this was the first time i had to hold a building, a junction, a river and a timetable in one drawing. the junction outside the site became a project of its own, and the city's transit app later became a product redesign." },
    ],
  },

  // ─────────────────────────────────────────────────────── madipur hospital ──
  "madipur-hospital": {
    slug: "madipur-hospital",
    hero: {
      kicker: "hospital design studio · spa new delhi",
      title: "madipur general hospital",
      subtitle:
        "a 600-bed general hospital in west delhi, with housing on the same site, planned around how patients, staff and services move, and checked against every rule that applies.",
      media: { type: "image", src: "/case/madipur-hospital/20.jpg", width: 2400, height: 1695, alt: "rendered view of the hospital towers over the podium" },
      mediaFit: "cover",
      mediaPosition: "center",
      meta: [
        { label: "role", value: "architect, in a group of three with athul raghunath and ejas muhammed" },
        { label: "context", value: "hospital design studio, spa new delhi" },
        { label: "year", value: "2021" },
      ],
      links: [{ label: "full project on behance", href: "https://www.behance.net/gallery/208697909/Madipur-General-Hospital-Proposal" }],
    },
    sections: [
      {
        kind: "constraints",
        label: "in short",
        items: [
          { label: "problem", text: "a hospital is the most regulated building most architects will draw: departments that must touch, flows that must never cross, and every bylaw at once." },
          { label: "what i did", text: "zoned seventeen floors and two basements by level of care, then tested the scheme against coverage, setbacks, parking, fire access, stormwater and solar radiation." },
          { label: "result", text: "a scheme where every department's position is argued by a rule or a flow, with every check done by hand." },
        ],
      },
      { kind: "thesis", eyebrow: "the problem", text: "in a hospital the plan is a set of adjacencies with a building around it. emergency beside diagnostics, critical care above emergency, and the services somewhere no visitor will ever see them." },
      {
        kind: "full",
        media: { type: "image", src: "/case/madipur-hospital/02.jpg", width: 2400, height: 1350, alt: "site analysis with bylaws and a swot of the site" },
        fit: "contain",
        frame: true,
        caption: "site analysis. a plot of about 34,000 m² beside paschim vihar, 15 m front and 12 m side setbacks, 2 car spaces per 100 m², and a residential tower and multi-level car park sharing the site.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/madipur-hospital/10.jpg", width: 2400, height: 1350, alt: "stacking diagram of every department from basement to helipad" },
        fit: "contain",
        frame: true,
        caption: "the whole hospital as one stacking diagram. emergency, pharmacy and diagnostics on the ground; critical care stacked above emergency, with outpatients beside it; a service floor between the podium and the ward tower; plant, stores and the mortuary in the basements, away from patients and visitors.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/madipur-hospital/08.jpg", width: 2400, height: 1350, alt: "design process: massing models and concept sketches" },
        fit: "contain",
        frame: true,
        caption: "design process. massing models revised against the brief and the site, with the concept sketches beside them.",
      },
      {
        kind: "constraints",
        label: "checked by hand",
        items: [
          { label: "coverage and setbacks", text: "plot area, permissible ground coverage, the floor area split between hospital and housing, and the 15 m and 12 m setbacks, worked out in one table before any plan was drawn." },
          { label: "parking", text: "2 car spaces per 100 m² of built-up area, met with a multi-level car park of about 510 spaces." },
          { label: "fire", text: "a 6 m fire tender loop to the main road, fire stairs and cores within a 30 m radius of every point, and a pump house behind 120-minute fire walls." },
          { label: "stormwater", text: "runoff from roofs, hardscape and softscape at a peak intensity of 35 mm an hour gives a load of about 651 m³ an hour, which sized eight rainwater harvesting pits." },
          { label: "sun", text: "radiation studied in summer and winter. the long faces turn north and south, and the cores and ramp sit east and west as buffers." },
        ],
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/madipur-hospital/14.jpg", alt: "fire services: tender path, exit radii and pump house" },
          { type: "image", src: "/case/madipur-hospital/12.jpg", alt: "site services: rainwater harvesting calculations" },
        ],
        captions: [{ label: "fire services" }, { label: "site services" }],
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/madipur-hospital/11.jpg", alt: "site planning table and site plan" },
          { type: "image", src: "/case/madipur-hospital/17.jpg", alt: "radiation analysis in summer and winter" },
        ],
        captions: [{ label: "site planning" }, { label: "radiation analysis" }],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/madipur-hospital/01.jpg", width: 2400, height: 1350, alt: "white massing model of the hospital towers over a podium" },
        fit: "contain",
        frame: true,
        caption: "the scheme as a massing model: two ward towers over a podium of outpatient and critical care.",
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/madipur-hospital/22.jpg", alt: "site sections" },
          { type: "image", src: "/case/madipur-hospital/23.jpg", alt: "ground floor plan" },
        ],
        captions: [{ label: "site sections" }, { label: "ground floor plan" }],
      },
      { kind: "reflection", text: "every check on this page was done by hand, in a spreadsheet, on a scheme that kept changing under it, so a number checked on monday could be wrong by friday. that is the problem counterweight is built for." },
    ],
  },

  // ──────────────────────────────────────────────────────── vytilla junction ──
  "vytilla-junction": {
    slug: "vytilla-junction",
    hero: {
      kicker: "mobility design concept · kochi",
      title: "vytilla junction",
      subtitle:
        "a concept for kochi's busiest junction: read from peak-hour traffic counts and signal capacity, then redrawn as loops that fold the mobility hub, the metro and the water metro into one system.",
      media: { type: "image", src: "/case/vytilla-junction/01.jpg", width: 2400, height: 1351, alt: "vytilla junction traffic, an alternative approach" },
      mediaFit: "cover",
      mediaPosition: "center",
      meta: [
        { label: "role", value: "solo: analysis and design concept" },
        { label: "context", value: "mobility concept, kochi" },
        { label: "year", value: "2024" },
      ],
      links: [{ label: "full project on behance", href: "https://www.behance.net/gallery/215075201/Junction-Mobility-Design-Concept" }],
    },
    sections: [
      {
        kind: "constraints",
        label: "in short",
        items: [
          { label: "problem", text: "vytilla junction stayed a bottleneck after the flyover was built, and at the morning peak every signalled arm ran over capacity." },
          { label: "what i did", text: "read the junction from passenger car unit counts and signal timings, then redrew circulation as loops around two squares under the flyover, with the hub inside the junction rather than beside it." },
          { label: "result", text: "a concept with no signals and no crossing paths, plus bus bays, pedestrian zones and parking for the first and last mile." },
        ],
      },
      { kind: "thesis", eyebrow: "the problem", text: "the mobility hub was built to fix vytilla. it cannot, while the junction outside it still stops every vehicle that reaches it." },
      {
        kind: "full",
        media: { type: "image", src: "/case/vytilla-junction/02.jpg", width: 1680, height: 2400, alt: "peak-hour traffic counts and signal occupancy at vytilla junction" },
        fit: "contain",
        frame: true,
        caption: "the present scenario at the morning peak, 9:30 to 10:30, in passenger car units. on a 150-second cycle, bypass south, sa road and ettumanoor run at 110% of capacity and bypass north at 105%.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/vytilla-junction/04.jpg", width: 2395, height: 2400, alt: "context: the flyover, the hub, the development area and the water metro terminal" },
        fit: "contain",
        frame: true,
        caption: "what a redesign has to take as given: the flyover, the mobility hub, the property development area and the water metro terminal.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/vytilla-junction/03.jpg", width: 1491, height: 2400, alt: "the objectives of the proposal" },
        fit: "contain",
        frame: true,
        caption: "the objectives. no signals and no crossing paths, and the hub inside the junction rather than beside it.",
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/vytilla-junction/05.jpg", alt: "proposed vehicular paths and route development" },
          { type: "image", src: "/case/vytilla-junction/06.jpg", alt: "junction detailing, pedestrian zones, bus bays, greens and parking" },
        ],
        captions: [
          { label: "circulation", text: "vehicles loop around a square under the flyover, and a second loop takes traffic through the hub." },
          { label: "layers", text: "eight junction details, then pedestrian zones, bus bays, greens and parking drawn as separate layers." },
        ],
      },
      { kind: "reflection", text: "this is the junction outside my thesis site. the thesis designed the building and assumed the traffic; this project starts from the traffic." },
    ],
  },

  // ─────────────────────────────────────────────────────────────── basant lok ──
  "basant-lok": {
    slug: "basant-lok",
    hero: {
      kicker: "urban design studio · spa new delhi",
      title: "reimagining community centres",
      subtitle:
        "basant lok, one of delhi's planned community centres in vasant vihar, redesigned around its metro gates, a city connector road and the greens the master plan requires.",
      media: { type: "image", src: "/case/basant-lok/07.jpg", width: 2400, height: 1074, alt: "aerial view of the proposed precinct" },
      mediaFit: "cover",
      mediaPosition: "center",
      meta: [
        { label: "role", value: "urban designer, in a group of four with ejas, athul and sahiba" },
        { label: "context", value: "urban design studio, spa new delhi" },
        { label: "year", value: "2023" },
      ],
      links: [{ label: "the publication on behance", href: "https://www.behance.net/gallery/208716931/Urban-Design" }],
    },
    sections: [
      {
        kind: "constraints",
        label: "in short",
        items: [
          { label: "problem", text: "a planned community centre cut through by a city connector road, with metro gates inside the site and greens the master plan makes mandatory." },
          { label: "what i did", text: "read two precedents as dos and don'ts, mapped the neighbourhood and the site, and planned a mixed precinct around the three constraints that could not move." },
          { label: "result", text: "a precinct of offices, housing and public space, drawn from neighbourhood scale down to floor plans." },
        ],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/basant-lok/02.jpg", width: 2400, height: 1604, alt: "precedent studies of wuhan yangchun lake and cyber city gurugram" },
        fit: "contain",
        frame: true,
        caption: "precedents, read as dos and don'ts. sasaki's wuhan yangchun lake plan for its transit cores and green axes; dlf's cyber city in gurugram mostly for what to avoid, such as an underpass that added to the traffic it was meant to remove.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/basant-lok/03.jpg", width: 2400, height: 1609, alt: "neighbourhood and site analysis with the three site constraints" },
        fit: "contain",
        frame: true,
        caption: "neighbourhood and site analysis: land use, noise, the informal sector, service roads and transit, ending in the three constraints the design could not move. the city connector through the site, the metro gates within it, and the mandatory greens.",
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/basant-lok/06.jpg", alt: "street sections and elevations of the precinct" },
          { type: "image", src: "/case/basant-lok/13.jpg", alt: "precinct plans" },
        ],
        captions: [{ label: "sections" }, { label: "plans" }],
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/basant-lok/19.jpg", width: 2400, height: 1595, alt: "physical model of the precinct" },
        fit: "cover",
        caption: "the precinct as a model.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────── into the tall grass ──
  "into-the-tall-grass": {
    slug: "into-the-tall-grass",
    hero: {
      kicker: "installation design · spa new delhi",
      title: "into the tall grass",
      subtitle:
        "a kinetic canopy of grass-like strands, hung at human height, that rises to make a space around each person who walks under it. drawn from the fields and the walled city of amritsar.",
      media: { type: "image", src: "/case/into-the-tall-grass/04.jpg", width: 2400, height: 1350, alt: "people walking under the canopy of hanging strands" },
      mediaFit: "cover",
      mediaPosition: "center",
      meta: [
        { label: "role", value: "designer, group project" },
        { label: "context", value: "semester project, spa new delhi" },
        { label: "year", value: "2021" },
      ],
      links: [{ label: "full project on behance", href: "https://www.behance.net/gallery/128552701/Into-the-Tall-Grass" }],
    },
    sections: [
      {
        kind: "constraints",
        label: "in short",
        items: [
          { label: "problem", text: "learning rarely leaves the four walls of a classroom, and public space rarely responds to the person standing in it." },
          { label: "what i did", text: "a canopy of 1 m modules of sixteen strands each, lifted by motors when weight sensors in the floor detect someone, with each module drawn from a pattern in phulkari embroidery." },
          { label: "result", text: "a private bubble that follows each visitor through the grid and closes again behind them." },
        ],
      },
      {
        kind: "flow",
        label: "how it responds",
        steps: [
          { label: "step onto the platform", note: "a weight sensor sits at the centre of each 2 m square of floor" },
          { label: "the modules overhead wake", note: "the sensor signals the motors above it" },
          { label: "the strands retract", note: "a void opens around the person" },
          { label: "the canopy swells", note: "it is otherwise flat" },
          { label: "step away", note: "the canopy flattens and the strands fall again" },
        ],
        caption: "the response follows each person's position on the grid, so the bubble moves with them.",
      },
      {
        kind: "full",
        media: { type: "image", src: "/case/into-the-tall-grass/02.jpg", width: 2400, height: 732, alt: "elevation of the canopy and strands" },
        fit: "contain",
        frame: true,
        caption: "the canopy in elevation, at human height.",
      },
      {
        kind: "duo",
        media: [
          { type: "image", src: "/case/into-the-tall-grass/03.jpg", alt: "module detail and phulkari pattern" },
          { type: "image", src: "/case/into-the-tall-grass/01.jpg", alt: "the installation at dusk" },
        ],
        captions: [
          { label: "the module", text: "ripstop nylon strands on a motorised 1 m grid; each module is one motif of a phulkari." },
          { label: "the installation" },
        ],
      },
    ],
  },


};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
