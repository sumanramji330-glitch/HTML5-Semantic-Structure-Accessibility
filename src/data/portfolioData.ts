import { Project, Article } from '../types/index.ts';

export const ALEX_PROFILE = {
  name: 'Alex Smith',
  title: 'Web Accessibility Specialist & Senior Frontend Engineer',
  yearsExperience: '5+',
  certifications: ['CPACC Certified', 'WAS Credentialed', 'W3C WAI Contributor'],
  bio: 'I am a passionate web developer with over 5 years of experience specializing in front-end technologies and digital accessibility. My core philosophy is that the web should be accessible to all, regardless of hardware, software, language, location, or ability. When I am not engineering enterprise design systems, I contribute to open-source accessibility tools, train developer teams on WCAG 2.2, and publish technical guides on semantic HTML5 and screen-reader compatibility.',
  stats: [
    { value: '120+', label: 'Accessibility Audits Delivered', detail: 'Across fintech, healthcare & state gov' },
    { value: '100%', label: 'WCAG 2.2 AAA Target Pass', detail: 'Verified with axe-core & manual testing' },
    { value: '45,000+', label: 'Engineers Reached via Guides', detail: 'W3C & CSS-Tricks featured articles' },
    { value: '5', label: 'Open-Source Auditing Tools', detail: 'ARIA linter & keyboard focus trap helpers' },
  ],
  corePrinciples: [
    {
      title: 'First Rule of ARIA: Use Native Semantic HTML',
      description: 'Before reaching for aria-label or role="button", use a native <button>. Native browser elements deliver free keyboard navigation, focus management, and accessibility API wiring.',
      iconName: 'Code2',
    },
    {
      title: 'Keyboard as a First-Class Citizen',
      description: 'Every interaction reachable by pointer must be equally effortless with Tab, Shift+Tab, Enter, Space, and Arrow keys—with prominent, high-contrast focus rings.',
      iconName: 'Keyboard',
    },
    {
      title: 'Multi-Modal Assistive Technology Testing',
      description: 'Automated linters only catch 30-40% of WCAG issues. Authentic compliance demands manual evaluation across VoiceOver, NVDA, JAWS, Dragon, and physical switch controls.',
      iconName: 'Glasses',
    },
    {
      title: 'Forgiving Inputs & Graceful Error Recovery',
      description: 'Forms must never wipe user inputs on failure. Clear error messages tied to inputs via aria-describedby ensure cognitive ease and quick resolution.',
      iconName: 'ShieldCheck',
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'inclusive-banking-portal',
    title: 'Inclusive Banking Portal',
    subtitle: 'WCAG 2.2 AAA Compliant Financial Dashboard for Low-Vision & Elderly Users',
    category: 'fintech',
    summary: 'A fully WCAG AAA compliant banking dashboard specifically engineered for elderly users, screen-reader reliance, and motor-impaired keyboard navigators.',
    image: '/src/assets/images/banking_dashboard_mockup_1793381332833.jpg',
    wcagTarget: 'AAA',
    primaryTech: ['HTML5', 'WAI-ARIA 1.2', 'React 19', 'Tailwind CSS'],
    keyChallenge: 'Traditional online banking interfaces contain complex dynamic transaction tables, timeout modals that trap screen reader focus, and micro-typography unreadable by users with age-related macular degeneration or tremors.',
    solution: 'Designed an ultra-clear information hierarchy with a minimum 7:1 contrast ratio, customizable typography scaling up to 200% without layout clipping, audible transaction confirmations via aria-live regions, and an automated session warning system that lets users extend time with single-key shortcuts.',
    wcagCriteria: [
      {
        code: '1.4.3 & 1.4.6',
        name: 'Contrast (Enhanced)',
        level: 'AAA',
        description: 'Exceeded minimum 7:1 contrast for all text and 4.5:1 for interactive graphics, verifiable across custom dark and super-contrast presets.',
      },
      {
        code: '2.1.2',
        name: 'No Keyboard Trap',
        level: 'A',
        description: 'Engineered strict modal and dialog focus trapping with clean focus return to the originating trigger element on dismissal.',
      },
      {
        code: '2.2.1',
        name: 'Timing Adjustable',
        level: 'A',
        description: 'Configured accessible warning dialogs 2 minutes before financial session timeout, granting single-keystroke 10-minute extensions.',
      },
      {
        code: '3.3.1 & 3.3.3',
        name: 'Error Identification & Suggestion',
        level: 'AA',
        description: 'Integrated live assertive error announcements and automatic inline field guidance for payment recipient inputs.',
      },
    ],
    impactMetrics: [
      { metric: '99.4%', label: 'Elderly User Task Completion' },
      { metric: '0', label: 'Remaining WCAG Automated Violations' },
      { metric: '3.2x', label: 'Faster Keyboard Navigation Speed' },
      { metric: '100%', label: 'Screen Reader VoiceOver / NVDA Parity' },
    ],
    codeComparison: {
      inaccessibleTitle: 'Typical Inaccessible Div-Soup',
      inaccessibleCode: `<div class="btn" onclick="sendMoney()">
  <span>Transfer</span>
</div>
<div class="balance">$24,680.15</div>
<div class="row" onclick="selectAccount(1)">
  Checking Account - $15,120.40
</div>`,
      inaccessibleExplanation: 'Non-semantic divs lack role, cannot be focused via Tab, convey zero state or value to assistive tech, and break keyboard triggers.',
      accessibleTitle: 'Alex Smith Semantic Implementation',
      accessibleCode: `<button type="button" 
  class="px-5 py-2.5 font-semibold text-white bg-blue-700 hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-amber-500 rounded-md"
  aria-label="Confirm transfer of $250.00 to Checking Account"
  onClick={handleTransfer}>
  Transfer Funds
</button>
<p class="text-3xl font-bold" aria-live="polite">
  <span class="sr-only">Available Balance: </span>
  <span class="font-mono tabular-nums">$24,680.15</span>
</p>`,
      accessibleExplanation: 'Native <button> inherits full keyboard focus, explicit accessible label informs users of exact context, and aria-live gently notifies balance changes.',
    },
    liveDemoType: 'banking-stepper',
  },
  {
    id: 'a11y-ecommerce',
    title: 'A11y E-Commerce Platform',
    subtitle: 'High-Contrast, Keyboard-Navigable Shopping Bag & Catalog Prototype',
    category: 'ecommerce',
    summary: 'A high-contrast, fully keyboard-navigable e-commerce shopping cart and catalog prototype ensuring a seamless checkout experience for all ability levels.',
    image: '/src/assets/images/ecommerce_a11y_mockup_1793381333588.jpg',
    wcagTarget: 'AAA',
    primaryTech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Accessible Radix Primitives'],
    keyChallenge: 'E-commerce filters, color swatches, dynamic cart drawers, and price sliders routinely trigger focus loss, lack accessible labels, and fail color-blind users who cannot tell which product variant is chosen.',
    solution: 'Implemented roving tabindex for product swatch grids, semantic fieldsets for variant selections with explicit text tags, live inventory status announcements via polite live regions, and an accessible fly-out cart with strict keyboard focus containment.',
    wcagCriteria: [
      {
        code: '1.4.1',
        name: 'Use of Color',
        level: 'A',
        description: 'Product variant swatches pair color visual fills with explicit text labels and checkmark outlines so color is never the sole indicator.',
      },
      {
        code: '2.4.7',
        name: 'Focus Visible',
        level: 'AA',
        description: 'Custom high-contrast focus rings (3px solid #1d4ed8 with 3px offset) visible on all product cards, buttons, and form inputs.',
      },
      {
        code: '4.1.2',
        name: 'Name, Role, Value',
        level: 'A',
        description: 'Dynamic cart counter announces "Cart updated: 2 items, total $225.00" without interrupting the user reading the product specifications.',
      },
      {
        code: '2.5.5',
        name: 'Target Size (Enhanced)',
        level: 'AAA',
        description: 'All tap and click targets measure at least 48x48px on mobile and desktop viewports.',
      },
    ],
    impactMetrics: [
      { metric: '+28%', label: 'Increase in Checkout Conversions' },
      { metric: '48px', label: 'Minimum Touch Target Guarantee' },
      { metric: '100%', label: 'Keyboard Cart Flow Operability' },
      { metric: '4.9/5', label: 'Assistive Tech User Satisfaction' },
    ],
    codeComparison: {
      inaccessibleTitle: 'Common Color Swatch Pattern',
      inaccessibleCode: `<div class="swatch" style="background: #2563eb;" 
  onclick="selectColor('blue')"></div>
<div class="swatch" style="background: #dc2626;" 
  onclick="selectColor('red')"></div>`,
      inaccessibleExplanation: 'Divs without role="radio" or name do not announce to screen readers what the circle does, and colorblind users cannot verify the color name.',
      accessibleTitle: 'Alex Smith Semantic Swatch Group',
      accessibleCode: `<fieldset class="border-0 p-0 m-0">
  <legend class="text-sm font-semibold mb-2">Select Variant Color</legend>
  <div role="radiogroup" aria-label="Available Colors" class="flex gap-3">
    <button role="radio" aria-checked={selected === 'blue'}
      aria-label="Cobalt Blue (In Stock, 4 left)"
      class="flex items-center gap-2 px-3 py-1.5 border-2 rounded-md font-medium">
      <span class="w-4 h-4 rounded-full bg-blue-600" aria-hidden="true" />
      <span>Cobalt Blue</span>
    </button>
  </div>
</fieldset>`,
      accessibleExplanation: 'Native fieldset, legend, and radiogroup tell assistive technology the grouping, while explicit text labels make the choice unmistakable.',
    },
    liveDemoType: 'cart-drawer',
  },
  {
    id: 'civic-connect-portal',
    title: 'Civic Connect Public Services Portal',
    subtitle: 'Section 508 & EN 301 549 Certified Multi-Step Public Application System',
    category: 'civic',
    summary: 'A resilient government application portal for housing assistance and civic benefits, designed with plain-language readability, large touch targets, and assistive hardware compatibility.',
    image: '/src/assets/images/civic_portal_mockup_1793381332949.jpg',
    wcagTarget: 'AAA',
    primaryTech: ['Semantic HTML5', 'ARIA Form Patterns', 'TypeScript', 'WCAG Audit CI'],
    keyChallenge: 'Complex multi-step government forms often cause high abandonment among citizens with cognitive disabilities, English-as-second-language learners, and screen-magnifier users who lose field context when zoomed 400%.',
    solution: 'Engineered a progressive disclosure form with breadcrumb stepper landmarks, continuous inline autosave, clear step labels, plain language at 6th-grade reading level, and accessible drag-and-drop file upload with alternative standard file pickers.',
    wcagCriteria: [
      {
        code: '3.1.5',
        name: 'Reading Level',
        level: 'AAA',
        description: 'All application instructions and error prompts benchmarked against Flesh-Kincaid Grade 6 readability standard.',
      },
      {
        code: '1.4.10',
        name: 'Reflow (400% Zoom)',
        level: 'AA',
        description: 'Content reflows without loss of information or functionality down to 320 CSS pixels wide, with zero horizontal scroll.',
      },
      {
        code: '3.3.4',
        name: 'Error Prevention (Legal/Financial)',
        level: 'AAA',
        description: 'Complete review step before final submission allows applicants to check, edit, and confirm civic declarations.',
      },
    ],
    impactMetrics: [
      { metric: '94%', label: 'First-Time Submission Success' },
      { metric: '400%', label: 'Full Zoom Reflow Compliance' },
      { metric: 'Grade 6', label: 'Plain Language Benchmark' },
      { metric: '100%', label: 'Section 508 Federal Compliance' },
    ],
    codeComparison: {
      inaccessibleTitle: 'Generic Inaccessible File Upload',
      inaccessibleCode: `<div class="drop-zone" ondrop="handleDrop(event)">
  <span>Drag files here</span>
</div>`,
      inaccessibleExplanation: 'Drag-and-drop only workflows completely lock out keyboard users, voice navigation users, and switch control operators.',
      accessibleTitle: 'Alex Smith Multi-Modal Upload System',
      accessibleCode: `<div class="border-2 border-dashed p-6 rounded-lg text-center" 
  aria-describedby="upload-requirements">
  <p id="upload-requirements" class="text-sm text-zinc-600 mb-4">
    Supported formats: PDF, JPG, PNG (Max 10MB per file)
  </p>
  <label for="document-upload" 
    class="inline-block px-4 py-2 font-medium bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-800 focus-within:ring-4 focus-within:ring-blue-300">
    Browse and Upload Document
  </label>
  <input type="file" id="document-upload" name="document" 
    class="sr-only" aria-label="Upload identification document" />
</div>`,
      accessibleExplanation: 'Provides both visual drop area and standard keyboard-triggerable input tied to unambiguous descriptor text.',
    },
    liveDemoType: 'form-feedback',
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'first-rule-of-aria',
    title: 'The First Rule of ARIA: Why Semantic HTML Always Wins',
    date: 'February 2026',
    readTime: '6 min read',
    topic: 'Semantic HTML & ARIA',
    summary: 'Why reaching for role="button" or aria-label often introduces more bugs than it solves. A deep dive into browser accessibility trees and native element behaviors.',
    slug: 'first-rule-of-aria',
  },
  {
    id: 'focus-states-without-ruining-design',
    title: 'Designing High-Contrast Focus States That Look Exceptional',
    date: 'January 2026',
    readTime: '5 min read',
    topic: 'Design Systems',
    summary: 'Never use outline: none without a better replacement. How to craft WCAG 2.2-compliant focus rings using modern CSS focus-visible and offset geometry.',
    slug: 'focus-states-design',
  },
  {
    id: 'screen-reader-traversal-spas',
    title: 'How Assistive Tech Actually Traverses Single Page Applications',
    date: 'November 2025',
    readTime: '8 min read',
    topic: 'React Architecture',
    summary: 'Client-side routing often leaves screen readers stranded on empty wrappers. Best practices for route announcements, title updates, and focus shifts.',
    slug: 'screen-readers-spa',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Alex transformed our financial platform from failing federal audits to being recognized as a benchmark for accessible banking design. His attention to keyboard navigation and screen-reader fidelity is unmatched.',
    author: 'Sarah Jenkins',
    role: 'VP of Digital Experience',
    company: 'Apex Horizon Financial',
  },
  {
    quote: 'Working with Alex made our entire engineering department care about semantic markup. His workshops and pragmatic code reviews showed us that accessibility enhances usability for everyone.',
    author: 'Marcus Vance',
    role: 'Lead Frontend Architect',
    company: 'CivicForge Technologies',
  },
];
