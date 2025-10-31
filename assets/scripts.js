document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
  const THEME_KEY = 'aura-memoria-theme';
  const LANG_KEY = 'aura-memoria-lang';
  const USERS_KEY = 'aura-memoria-users';
  const CURRENT_USER_KEY = 'aura-memoria-current-user';
  const themeToggle = document.getElementById('theme-toggle');
  const languageMenu = document.querySelector('[data-language-menu]');
  const languageToggle = languageMenu ? languageMenu.querySelector('.language-menu__toggle') : null;
  const languageList = languageMenu ? languageMenu.querySelector('.language-menu__list') : null;
  const languageLabel = languageMenu ? languageMenu.querySelector('[data-language-label]') : null;
  const languageOptions = languageMenu ? Array.from(languageMenu.querySelectorAll('.language-menu__option')) : [];
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenuOverlay = document.querySelector('[data-mobile-menu-overlay]');
  const mobileMenuCloseButtons = mobileMenu
    ? Array.from(mobileMenu.querySelectorAll('[data-mobile-menu-close]'))
    : [];
  const mobileMenuLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll('[data-mobile-menu-link]')) : [];
  const mobileMenuInitialFocus = mobileMenu
    ? mobileMenu.querySelector('[data-mobile-menu-initial]') || mobileMenu.querySelector('[data-mobile-menu-close]')
    : null;
  const revealElements = document.querySelectorAll('.reveal');
  const parallaxItems = document.querySelectorAll('[data-parallax]');
  const contactForm = document.querySelector('[data-form="contact"]');
  const registerForm = document.querySelector('[data-form="register"]');
  const loginForm = document.querySelector('[data-form="login"]');
  const bookingForm = document.querySelector('[data-form="booking"]');
  const manageAppointmentsBtn = document.querySelector('[data-manage-appointments]');
  const bookingModal = document.querySelector('[data-booking-modal]');
  const bookingOpeners = document.querySelectorAll('[data-booking-open]');
  const bookingClosers = document.querySelectorAll('[data-booking-close]');
  const authElements = document.querySelectorAll('[data-auth-visible]');
  const roleElements = document.querySelectorAll('[data-role-visible]');
  const logoutButtons = document.querySelectorAll('[data-action="logout"]');
  const appointmentsModal = document.querySelector('[data-appointments-modal]');
  const appointmentsList = appointmentsModal ? appointmentsModal.querySelector('[data-appointments-list]') : null;
  const appointmentsEmptyState = appointmentsModal ? appointmentsModal.querySelector('[data-appointments-empty]') : null;
  const appointmentsCloseButtons = appointmentsModal
    ? Array.from(appointmentsModal.querySelectorAll('[data-appointments-close]'))
    : [];
  const adminFilterStatus = document.querySelector('[data-admin-filter-status]');
  const adminFilterUser = document.querySelector('[data-admin-filter-user]');
  const adminFilterDate = document.querySelector('[data-admin-filter-date]');
  const adminSort = document.querySelector('[data-admin-sort]');
  const adminTableBody = document.querySelector('[data-admin-table-body]');
  const adminEmptyRow = document.querySelector('[data-admin-empty]');
  const adminRescheduleModal = document.querySelector('[data-admin-reschedule]');
  const adminRescheduleForm = adminRescheduleModal
    ? adminRescheduleModal.querySelector('[data-admin-reschedule-form]')
    : null;
  const adminRescheduleCloseButtons = adminRescheduleModal
    ? Array.from(adminRescheduleModal.querySelectorAll('[data-admin-reschedule-close]'))
    : [];
  const adminRescheduleBackdrop = adminRescheduleModal
    ? adminRescheduleModal.querySelector('[data-admin-reschedule-backdrop]')
    : null;
  const backToTopLinks = document.querySelectorAll('[data-scroll-top]');
  const page = document.body.dataset.page || 'home';

  const ADMIN_LOGIN = 'admin';
  const ADMIN_PASSWORD = 'admin';
  const STATUS_PENDING = 'pending';
  const STATUS_CONFIRMED = 'confirmed';
  const STATUS_CANCELLED = 'cancelled';
  let activeBookingService = 'clinic';
  let adminRescheduleState = {
    appointmentId: null,
    userLogin: null,
  };
  let openAdminActionMenu = null;
  const compactAdminMedia = window.matchMedia('(max-width: 900px)');
  const mobileMenuDesktopMedia = window.matchMedia('(min-width: 901px)');
  let mobileMenuHideTimeout = null;
  let mobileMenuOverlayHideTimeout = null;
  let mobileMenuHistoryActive = false;
  let mobileMenuShouldReturnFocus = false;

  if (mobileMenu) {
    const initialAriaHidden = mobileMenu.getAttribute('aria-hidden');
    if (!initialAriaHidden) {
      mobileMenu.setAttribute('aria-hidden', mobileMenu.hidden ? 'true' : 'false');
    }
  }

  const translations = {
    en: {
      'meta.homeTitle': 'Aura Memoria — Where care and memory live side by side',
      'meta.loginTitle': 'Aura Memoria — Sign in',
      'meta.registerTitle': 'Aura Memoria — Create account',
      'meta.dashboardTitle': 'Aura Memoria — Personal cabinet',
      'meta.clinicTitle': 'Aura Memoria — Veterinary center',
      'meta.memorialTitle': 'Aura Memoria — Memorial park',
      'meta.aboutTitle': 'Aura Memoria — About us',
      "meta.memorialLunaTitle": "Aura Memoria — Luna's story",
      "meta.memorialMiroTitle": "Aura Memoria — Miro's story",
      "meta.memorialAriaTitle": "Aura Memoria — Aria's song",
      'header.tagline': 'Care • Memory • Nature',
      'header.login': 'Sign in',
      'header.register': 'Create account',
      'header.dashboard': 'Personal cabinet',
      'header.adminPanel': 'Admin panel',
      'header.logout': 'Sign out',
      'header.languageToggle': 'Select language',
      'header.bookAppointment': 'Book a visit',
      'header.home': 'Home',
      'header.menuOpen': 'Open menu',
      'header.menuClose': 'Close menu',
      'nav.services': 'Services',
      'nav.memory': 'Memory',
      'nav.about': 'About',
      'hero.title': 'Where care and memory live side by side.',
      'hero.subtitle': 'Aura Memoria unites veterinary care, love, and everlasting remembrance in harmony with nature and light.',
      'hero.primaryCta': 'Book an Appointment',
      'hero.secondaryCta': 'Explore Services',
      'services.kicker': 'Our Essence',
      'services.title': 'A sanctuary for every chapter of life',
      'services.clinic.title': 'Veterinary Center',
      'services.clinic.copy': 'Comprehensive care guided by compassion, modern diagnostics, and a calm environment for every visit.',
      'services.clinic.link': 'Discover more',
      'services.memorial.title': 'Memorial Park',
      'services.memorial.copy': 'Personalized remembrance ceremonies, cremation services, and timeless tributes embraced by serene gardens.',
      'services.memorial.link': 'Visit the park',
      'services.park.title': 'Recreation Grove',
      'services.park.copy': 'Quiet walks, gentle tea terraces, and shared moments beneath emerald canopies with the pets you love.',
      'memory.quote': '“In the whisper of leaves we hear their everlasting love.”',
      'memory.copy': 'Our memorial keepers craft tributes that honor the joy, loyalty, and light our companions bring into our lives.',
      'memory.cta': 'Learn more',
      'stories.kicker': 'Stories of Memory',
      'stories.title': 'Echoes of love continuing to bloom',
      'stories.card1.title': 'Sunlit Path for Luna',
      'stories.card1.copy': 'How a gentle garden ceremony helped a family celebrate their husky’s adventurous spirit.',
      'stories.card2.title': 'The Cedar Bench',
      'stories.card2.copy': 'A community-built tribute spot where visitors leave handwritten notes for companions passed.',
      'stories.card3.title': 'Tea at Dusk',
      'stories.card3.copy': 'Weekly gatherings blending mindfulness, art therapy, and quiet moments with friends.',
      'stories.card.button': 'Coming soon',
      'about.kicker': 'About Aura Memoria',
      'about.title': 'A sanctuary shaped by light, care, and memory',
      'about.body1':
        'Aura Memoria was created as a single home where veterinary expertise, remembrance rituals, and tranquil green spaces meet without boundaries.',
      'about.body2':
        'Every material, scent, and sound is chosen to soften transitions for families and companions, guiding them from attentive treatment to tender celebration.',
      'about.quote': '“We create a space where light, care, and memory unite as one.”',
      'about.imageCaption': 'Reception lounge welcoming guests to Aura Memoria',
      'about.imageAlt': 'Aura Memoria reception hall with sculpted desk and golden logo',
      'about.details.kicker': 'Our atmosphere',
      'about.details.title': 'What greets you when you arrive',
      'about.details.item1.title': 'Serene welcome',
      'about.details.item1.copy':
        'Concierge hosts offer herbal infusions, warm lighting, and gentle music to settle every heartbeat.',
      'about.details.item2.title': 'Connected guidance',
      'about.details.item2.copy':
        'Veterinary caretakers and memorial keepers coordinate each step so no moment feels rushed or alone.',
      'about.details.item3.title': 'Living memories',
      'about.details.item3.copy':
        'Indoor gardens, story alcoves, and digital archives invite families to return, remember, and continue traditions.',
      'contact.kicker': 'Connect',
      'contact.title': 'We are here to listen and to help',
      'contact.visit.title': 'Visit',
      'contact.visit.address': 'Golden Grove Lane 12, Serene District',
      'contact.visit.hours': 'Open daily 8:00 – 22:00',
      'contact.call.title': 'Call',
      'contact.call.primary': '+7 (495) 123-45-67',
      'contact.call.secondary': '+90 555 123 45 67',
      'contact.write.title': 'Write',
      'contact.write.email': 'hello@auramemoria.com',
      'contact.form.name': 'Name',
      'contact.form.namePlaceholder': 'Your name',
      'contact.form.email': 'Email',
      'contact.form.emailPlaceholder': 'you@example.com',
      'contact.form.message': 'Message',
      'contact.form.messagePlaceholder': 'How can we support you?',
      'contact.form.submit': 'Send message',
      'footer.copy': '© 2025 Aura Memoria. All rights reserved.',
      'footer.backToTop': 'Back to top',
      'login.title': 'Sign in to Aura Memoria',
      'login.subtitle': 'Continue supporting your companions and families with compassion and calm.',
      'login.loginLabel': 'Login',
      'login.loginPlaceholder': 'aurora',
      'login.passwordLabel': 'Password',
      'login.passwordPlaceholder': 'Enter your password',
      'login.submit': 'Sign in',
      'login.forgot': 'Forgot password',
      'login.switchPrompt': 'Don’t have an account?',
      'login.switchLink': 'Create one',
      'register.title': 'Create your Aura Memoria account',
      'register.subtitle': 'Join our community to book visits, plan memorials, and share stories of cherished companions.',
      'register.firstNameLabel': 'First name',
      'register.firstNamePlaceholder': 'Alexei',
      'register.lastNameLabel': 'Last name',
      'register.lastNamePlaceholder': 'Petrov',
      'register.loginLabel': 'Login',
      'register.loginPlaceholder': 'aurora',
      'register.passwordLabel': 'Create password',
      'register.passwordPlaceholder': 'Create a password',
      'register.confirmLabel': 'Confirm password',
      'register.confirmPlaceholder': 'Repeat password',
      'register.submit': 'Create account',
      'register.switchPrompt': 'Already have an account?',
      'register.switchLink': 'Sign in',
      'dashboard.kicker': 'Personal cabinet',
      'dashboard.subtitle': 'Your serene space for every shared journey.',
      'dashboard.greeting': 'Welcome back, {name}!',
      'dashboard.nextVisit.title': 'Upcoming visit',
      'dashboard.nextVisit.note': 'We reserved a tranquil room with warm lighting and soft music for you and your companion.',
      'dashboard.nextVisit.manage': 'Manage appointments',
      'dashboard.nextVisit.none': 'No visit scheduled yet — choose your moment on the clinic page.',
      'dashboard.profile.title': 'Guest profile',
      'dashboard.profile.firstName': 'First name',
      'dashboard.profile.lastName': 'Last name',
      'dashboard.profile.memberSince': 'Member since',
      'dashboard.profile.favoriteDrink': 'Tea ritual',
      'dashboard.profile.favoriteDrinkValue': 'Golden chamomile with sage honey',
      'dashboard.profile.preferredDoctor': 'Preferred doctor',
      'dashboard.profile.preferredDoctorValue': 'Dr. Elizaveta Serin',
      'dashboard.profile.edit': 'Update preferences',
      'dashboard.appointments.title': 'Your appointments',
      'dashboard.appointments.subtitle': 'Manage every visit with gentle adjustments.',
      'dashboard.appointments.close': 'Close appointment list',
      'dashboard.appointments.empty': 'No appointments yet. Book a serene visit to see it here.',
      'dashboard.appointments.editDate': 'Adjust date',
      'dashboard.appointments.editTime': 'Adjust time',
      'dashboard.appointments.save': 'Save changes',
      'dashboard.appointments.delete': 'Cancel appointment',
      'dashboard.appointments.deleteConfirm': 'Are you sure you want to cancel this appointment?',
      'appointments.status.pending': 'Awaiting confirmation',
      'appointments.status.confirmed': 'Confirmed',
      'appointments.status.cancelled': 'Cancelled',
      'appointments.service.clinic': 'Veterinary center',
      'appointments.service.memorial': 'Memorial consultation',
      'appointments.service.recreation': 'Recreation visit',
      'dashboard.appointments.save': 'Save changes',
      'dashboard.appointments.delete': 'Remove booking',
      'dashboard.appointments.confirmDelete': 'Cancel this appointment?',
      'dashboard.appointments.status.pending': 'Awaiting confirmation',
      'dashboard.appointments.status.confirmed': 'Confirmed',
      'dashboard.appointments.status.cancelled': 'Cancelled',
      'dashboard.history.title': 'Visit history',
      'dashboard.history.item1.title': 'Wellness examination',
      'dashboard.history.item1.note': 'Gentle check-in, holistic aromatherapy, and updated health plan.',
      'dashboard.history.item2.title': 'Memorial garden ceremony',
      'dashboard.history.item2.note': 'Planted a moonlit sage tree with family blessings.',
      'dashboard.history.item3.title': 'Tea circle gathering',
      'dashboard.history.item3.note': 'Shared stories with the community and received guided meditation recordings.',
      'dashboard.insights.title': 'Wellbeing insights',
      'dashboard.insights.item1': 'Remember to stretch together at sunrise for gentle joint care.',
      'dashboard.insights.item2': 'Bring your companion’s favorite blanket for each visit to anchor them in comfort.',
      'dashboard.insights.item3': 'Write a short gratitude note after each walk to keep your shared memories glowing.',
      'dashboard.insights.cta': 'Download tailored plan',
      'admin.kicker': 'Administrator',
      'admin.title': 'Management panel',
      'admin.subtitle': 'Review every guest appointment, confirm serene visits, and keep the schedule flowing gently.',
      'admin.filter.status': 'Filter by status',
      'admin.filter.statusAll': 'All statuses',
      'admin.filter.statusPending': 'Awaiting confirmation',
      'admin.filter.statusConfirmed': 'Confirmed',
      'admin.filter.statusCancelled': 'Cancelled',
      'admin.filter.user': 'Filter by guest',
      'admin.filter.userAll': 'All guests',
      'admin.filter.date': 'Filter by date',
      'admin.sort.label': 'Sort by',
      'admin.sort.dateAsc': 'Date — oldest first',
      'admin.sort.dateDesc': 'Date — newest first',
      'admin.sort.status': 'Status',
      'admin.sort.guest': 'Guest name',
      'admin.table.title': 'Guest appointments',
      'admin.table.subtitle': 'Confirm, reschedule, or cancel with a gentle touch.',
      'admin.table.guest': 'Guest',
      'admin.table.service': 'Service',
      'admin.table.guardian': 'Guardian',
      'admin.table.contact': 'Contact',
      'admin.table.notes': 'Notes',
      'admin.table.datetime': 'Date & time',
      'admin.table.status': 'Status',
      'admin.table.actions': 'Actions',
      'admin.table.showDetails': 'Show details',
      'admin.table.hideDetails': 'Hide details',
      'admin.actions.confirm': 'Confirm',
      'admin.actions.pending': 'Mark pending',
      'admin.actions.cancel': 'Cancel',
      'admin.actions.action': 'Action',
      'admin.actions.reschedule': 'Reschedule',
      'admin.actions.delete': 'Delete',
      'admin.actions.deleteConfirm': 'Remove this appointment from the schedule?',
      'admin.table.empty': 'No appointments yet.',
      'admin.reschedule.title': 'Adjust appointment',
      'admin.reschedule.subtitle': 'Update the time and confirm when the guest is ready.',
      'admin.reschedule.date': 'New date',
      'admin.reschedule.time': 'New time',
      'admin.reschedule.submit': 'Save changes',
      'admin.reschedule.cancel': 'Cancel',
      'clinic.kicker': 'Veterinary center',
      'clinic.title': 'Gentle medicine surrounded by light',
      'clinic.subtitle': 'Aura Memoria’s medical wing unites advanced diagnostics with spa-like rituals to keep every visit serene.',
      'clinic.booking.cta': 'Book a visit',
      'clinic.booking.authCta': 'Sign in to book',
      'clinic.learnMore': 'Meet the doctor',
      'clinic.doctor.name': 'Dr. Elizaveta Serin',
      'clinic.doctor.role': 'Chief Veterinary Therapist',
      'clinic.doctor.bio': 'A graduate of the Vienna Veterinary Institute, Dr. Serin guides each visit with mindfulness, aroma therapy, and integrative medicine tailored to every companion. Her sessions begin with shared breathing rituals that calm both guardian and pet.',
      'clinic.doctor.highlight1': 'Certified in grief-sensitive veterinary support',
      'clinic.doctor.highlight2': 'Creates personalized herbal recovery plans',
      'clinic.doctor.highlight3': 'Hosts twilight tea circles for anxious guests',
      'clinic.doctor.button': 'Reserve with Dr. Serin',
      'clinic.doctor.loginPrompt': 'Sign in to reserve',
      'clinic.therapy.title': 'Spaces tuned to healing',
      'clinic.therapy.copy': 'From moonlit hydrotherapy pools to crystal-infused diagnostics, every detail honors balance, scent, and gentle touch.',
      'clinic.therapy.room': 'Aurora treatment room',
      'clinic.therapy.roomCopy': 'Infrared warmth, forest soundscapes, and a private terrace for aftercare tea.',
      'clinic.therapy.lab': 'Biolight laboratory',
      'clinic.therapy.labCopy': 'Rapid diagnostics illuminated by soft biophilic lighting and artisan ceramics.',
      'clinic.therapy.rest': 'Calm renewal lounge',
      'clinic.therapy.restCopy': 'Weighted blankets, guided breathing, and bespoke sound healing playlists.',
      'clinic.booking.title': 'Schedule your visit',
      'clinic.booking.intro': 'Choose a time that feels right. Our caretakers will confirm with a warm message within the hour.',
      'clinic.booking.date': 'Preferred date',
      'clinic.booking.time': 'Preferred time',
      'clinic.booking.guardian': 'Guardian name',
      'clinic.booking.guardianPlaceholder': 'Your full name',
      'clinic.booking.contact': 'Contact details',
      'clinic.booking.contactPlaceholder': '+7 999 000 00 00',
      'clinic.booking.notes': 'Notes for Dr. Serin',
      'clinic.booking.notesPlaceholder': 'Share any special needs or cherished rituals…',
      'clinic.booking.submit': 'Confirm request',
      'clinic.booking.close': 'Close booking window',
      'memorial.kicker': 'Memorial park',
      'memorial.title': 'Stories carried by wind and light',
      'memorial.subtitle': 'Walk along the sage-lined pathways where every pet is celebrated through music, scent, and handwritten letters from their family.',
      'memorial.info.hours': 'Open daily for quiet reflection 07:00 – 23:00',
      'memorial.info.ceremony': 'Ceremonies guided at dawn, noon, and moonrise',
      'memorial.gallery.title': 'Families of light',
      'memorial.gallery.subtitle': 'Select a companion to enter their dedicated remembrance space.',
      'memorial.luna.name': 'Luna',
      'memorial.luna.caption': 'Dancing snow-heart, family of the Volkovs',
      'memorial.miro.name': 'Miro',
      'memorial.miro.caption': 'Sunbeam poet, cherished by the Demir family',
      'memorial.aria.name': 'Aria',
      'memorial.aria.caption': 'Celestial singer, part of the Schneider home',
      'memorial.rituals.title': 'Rituals of remembrance',
      'memorial.rituals.copy': 'Keepers compose fragrant envelopes, light amber lanterns, and guide families through storytelling circles beneath the willow canopy. Every tribute is recorded in our auric library for generations to revisit.',
      'memorial.rituals.item1': 'Petal pathways illuminated by soft candlelight',
      'memorial.rituals.item2': 'Hand-bound books capturing whispered memories',
      'memorial.rituals.item3': 'Sound bath ceremonies harmonized with favorite melodies',
      'memorial.detail.back': '← Back to Memorial Park',
      'memorial.luna.title': 'Luna — Keeper of Northern Lights',
      'memorial.luna.family': 'Family member of the Volkov home',
      'memorial.luna.summary': 'Luna’s paws carved constellations in every snowy path. She taught her family to chase dawn, laugh at storm clouds, and rest against birch trees when the world felt fast.',
      'memorial.luna.storyTitle': 'Moments we cherish',
      'memorial.luna.story': 'Luna adored the silver bell tied to her collar; each chime meant another adventure. She greeted every guest with a gentle paw press before guiding them to the cedar bench where tea waited. Her final night was spent watching northern lights with the family bundled close.',
      'memorial.luna.quote': '“She reminded us that loyalty is a warm lantern in winter.”',
      'memorial.luna.fact1.title': 'Favorite scent',
      'memorial.luna.fact1.value': 'White tea with pine resin',
      'memorial.luna.fact2.title': 'Beloved ritual',
      'memorial.luna.fact2.value': 'Stargazing walks at midnight',
      'memorial.luna.fact3.title': 'Guardian words',
      'memorial.luna.fact3.value': '“Her howl was our family choir.”',
      'memorial.luna.galleryTitle': 'Gallery of glow',
      'memorial.luna.gallery1': 'Morning pause before the cedar trail',
      'memorial.luna.gallery2': 'Family tea by the frozen lake',
      'memorial.luna.gallery3': 'Lantern ceremony honoring her adventures',
      'memorial.miro.title': 'Miro — Poet of Sunbeams',
      'memorial.miro.family': 'Family member of the Demir home',
      'memorial.miro.summary': 'Miro composed silent poems with his slow blinks. He curled beside sketchbooks, napped on piano lids, and announced dinner with a single melodic trill.',
      'memorial.miro.storyTitle': 'Moments we cherish',
      'memorial.miro.story': 'Each afternoon Miro led the family to the garden for five minutes of quiet sun. He loved lying on illustrated storybooks, flicking pages with his tail when it was time for the next chapter. Rainy nights meant jazz records and a lap shared between two siblings.',
      'memorial.miro.quote': '“He taught us that patience shines brighter than any chandelier.”',
      'memorial.miro.fact1.title': 'Favorite scent',
      'memorial.miro.fact1.value': 'Orange blossom ink',
      'memorial.miro.fact2.title': 'Beloved ritual',
      'memorial.miro.fact2.value': 'Window-seat storytelling',
      'memorial.miro.fact3.title': 'Guardian words',
      'memorial.miro.fact3.value': '“His purr painted our home with sunlight.”',
      'memorial.miro.galleryTitle': 'Gallery of soft verses',
      'memorial.miro.gallery1': 'Sunrise reflections on the atelier sill',
      'memorial.miro.gallery2': 'Lanterns crafted from his haiku notes',
      'memorial.miro.gallery3': 'Evening reading nook with warm tea',
      'memorial.aria.title': 'Aria — Celestial Songkeeper',
      'memorial.aria.family': 'Family member of the Schneider home',
      'memorial.aria.summary': 'Aria greeted morning light with lilting harmonies that matched the nearby church bells. She perched on shoulders during family breakfasts and whispered lullabies each evening.',
      'memorial.aria.storyTitle': 'Moments we cherish',
      'memorial.aria.story': 'Her songs guided the family’s breathing meditations. Aria learned verses in four languages, weaving them into dawn serenades. She loved to press her head against the youngest sibling’s forehead, humming until the day felt brave.',
      'memorial.aria.quote': '“She turned every worry into a melody of hope.”',
      'memorial.aria.fact1.title': 'Favorite scent',
      'memorial.aria.fact1.value': 'Citrus blossoms at dawn',
      'memorial.aria.fact2.title': 'Beloved ritual',
      'memorial.aria.fact2.value': 'Evening starlight duet',
      'memorial.aria.fact3.title': 'Guardian words',
      'memorial.aria.fact3.value': '“Her chorus held our family steady.”',
      'memorial.aria.galleryTitle': 'Gallery of melodies',
      'memorial.aria.gallery1': 'Morning rehearsal in the botanical atrium',
      'memorial.aria.gallery2': 'Family listening to her twilight aria',
      'memorial.aria.gallery3': 'Lantern release echoing her final song',
      'toast.register.success': 'Account created — welcome to Aura Memoria.',
      'toast.register.loginExists': 'That login is already in use.',
      'toast.register.loginShort': 'Login must be at least 3 characters.',
      'toast.register.mismatch': 'Passwords do not match — please try again.',
      'toast.login.success': 'Welcome back. Your memories await.',
      'toast.login.error': 'We could not find that login and password combination.',
      'toast.logout.success': 'You have signed out. Our lantern will await your return.',
      'toast.contact.success': 'Message sent with warmth. We will reach out shortly.',
      'toast.booking.success': 'Your visit request has been received. Expect a confirmation soon.',
      'toast.booking.userOnly': 'Guest accounts may book visits. Please sign in with your Aura Memoria profile.',
      'toast.appointment.updated': 'Appointment updated with care.',
      'toast.appointment.deleted': 'Appointment removed.',
      'toast.appointment.confirmed': 'Appointment confirmed.',
      'toast.appointment.pending': 'Appointment marked as awaiting confirmation.',
      'toast.appointment.cancelled': 'Appointment cancelled.',
      'toast.auth.required': 'Please sign in to continue this journey.',
      'toast.auth.adminOnly': 'Administrator access required.',
    },
    ru: {
      'meta.homeTitle': 'Aura Memoria — Где забота и память живут рядом',
      'meta.loginTitle': 'Aura Memoria — Вход',
      'meta.registerTitle': 'Aura Memoria — Регистрация',
      'meta.dashboardTitle': 'Aura Memoria — Личный кабинет',
      'meta.clinicTitle': 'Aura Memoria — Ветеринарный центр',
      'meta.memorialTitle': 'Aura Memoria — Мемориальный парк',
      'meta.aboutTitle': 'Aura Memoria — О нас',
      'meta.memorialLunaTitle': 'Aura Memoria — История Луны',
      'meta.memorialMiroTitle': 'Aura Memoria — История Миро',
      'meta.memorialAriaTitle': 'Aura Memoria — Песнь Арии',
      'header.tagline': 'Забота • Память • Природа',
      'header.login': 'Войти',
      'header.register': 'Создать аккаунт',
      'header.dashboard': 'Личный кабинет',
      'header.adminPanel': 'Панель управления',
      'header.logout': 'Выйти',
      'header.languageToggle': 'Выбрать язык',
      'header.bookAppointment': 'Записаться на приём',
      'header.home': 'Главная',
      'header.menuOpen': 'Открыть меню',
      'header.menuClose': 'Закрыть меню',
      'nav.services': 'Услуги',
      'nav.memory': 'Память',
      'nav.about': 'О нас',
      'hero.title': 'Где забота и память живут рядом.',
      'hero.subtitle': 'Aura Memoria объединяет ветеринарную помощь, любовь и вечную память в гармонии с природой и светом.',
      'hero.primaryCta': 'Записаться на приём',
      'hero.secondaryCta': 'Посмотреть услуги',
      'services.kicker': 'Наша сущность',
      'services.title': 'Пространство для каждого этапа жизни',
      'services.clinic.title': 'Ветеринарный центр',
      'services.clinic.copy': 'Комплексная забота с сочувствием, современной диагностикой и спокойной атмосферой каждого визита.',
      'services.clinic.link': 'Узнать подробнее',
      'services.memorial.title': 'Мемориальный парк',
      'services.memorial.copy': 'Персональные церемонии прощания, кремация и вечные памятные знаки в объятиях тихих садов.',
      'services.memorial.link': 'Посетить парк',
      'services.park.title': 'Рекреационная роща',
      'services.park.copy': 'Тихие прогулки, чайные террасы и разделённые моменты под изумрудной кроной с любимыми питомцами.',
      'memory.quote': '«В шёпоте листьев слышим их вечную любовь.»',
      'memory.copy': 'Наши хранители памяти создают обряды, что чтут радость, верность и свет, которыми делятся наши спутники.',
      'memory.cta': 'Узнать больше',
      'stories.kicker': 'Истории памяти',
      'stories.title': 'Эхо любви продолжает цвести',
      'stories.card1.title': 'Солнечная тропа для Луны',
      'stories.card1.copy': 'Как нежная церемония в саду помогла семье отпраздновать авантюрный дух своей хаски.',
      'stories.card2.title': 'Кедровая скамья',
      'stories.card2.copy': 'Место, созданное сообществом, где посетители оставляют записки ушедшим друзьям.',
      'stories.card3.title': 'Чай на закате',
      'stories.card3.copy': 'Еженедельные встречи, сочетающие осознанность, арт-терапию и тихое общение.',
      'stories.card.button': 'Скоро',
      'about.kicker': 'Об Aura Memoria',
      'about.title': 'Пространство света, заботы и памяти',
      'about.body1':
        'Aura Memoria родилась как единый дом, где ветеринарная забота, ритуалы памяти и зелёные прогулочные зоны существуют без границ.',
      'about.body2':
        'Каждый материал, аромат и звук призваны мягко вести семьи и их компаньонов от внимательного лечения к тёплым воспоминаниям.',
      'about.quote': '«Мы создаём пространство, где свет, забота и память соединяются в одном месте.»',
      'about.imageCaption': 'Зона ресепшен Aura Memoria приветствует гостей',
      'about.imageAlt': 'Ресепшен Aura Memoria с мягким светом и золотым логотипом',
      'about.details.kicker': 'Наша атмосфера',
      'about.details.title': 'Что встречает вас при входе',
      'about.details.item1.title': 'Тихое приветствие',
      'about.details.item1.copy':
        'Консьерж предлагает травяные настои, мягкий свет и спокойную музыку, чтобы унять любое волнение.',
      'about.details.item2.title': 'Согласованное сопровождение',
      'about.details.item2.copy':
        'Ветеринарные специалисты и хранители памяти координируют каждый шаг, чтобы ни один момент не казался поспешным.',
      'about.details.item3.title': 'Живые воспоминания',
      'about.details.item3.copy':
        'Сады, комнаты историй и цифровой архив приглашают семьи возвращаться и продолжать традиции.',
      'contact.kicker': 'Связаться',
      'contact.title': 'Мы здесь, чтобы слушать и помогать',
      'contact.visit.title': 'Приходите',
      'contact.visit.address': 'Золотая Роща, 12, район Серенити',
      'contact.visit.hours': 'Открыто ежедневно 8:00 – 22:00',
      'contact.call.title': 'Позвоните',
      'contact.call.primary': '+7 (495) 123-45-67',
      'contact.call.secondary': '+90 555 123 45 67',
      'contact.write.title': 'Напишите',
      'contact.write.email': 'hello@auramemoria.com',
      'contact.form.name': 'Имя',
      'contact.form.namePlaceholder': 'Ваше имя',
      'contact.form.email': 'Электронная почта',
      'contact.form.emailPlaceholder': 'name@example.com',
      'contact.form.message': 'Сообщение',
      'contact.form.messagePlaceholder': 'Как мы можем поддержать вас?',
      'contact.form.submit': 'Отправить сообщение',
      'footer.copy': '© 2025 Aura Memoria. Все права защищены.',
      'footer.backToTop': 'Наверх',
      'login.title': 'Войдите в Aura Memoria',
      'login.subtitle': 'Продолжайте поддерживать питомцев и семьи с теплом и спокойствием.',
      'login.loginLabel': 'Логин',
      'login.loginPlaceholder': 'aurora',
      'login.passwordLabel': 'Пароль',
      'login.passwordPlaceholder': 'Введите пароль',
      'login.submit': 'Войти',
      'login.forgot': 'Забыли пароль?',
      'login.switchPrompt': 'Нет аккаунта?',
      'login.switchLink': 'Зарегистрироваться',
      'register.title': 'Создайте аккаунт Aura Memoria',
      'register.subtitle': 'Присоединяйтесь, чтобы записываться на приём, планировать церемонии и делиться историями о любимцах.',
      'register.firstNameLabel': 'Имя',
      'register.firstNamePlaceholder': 'Алексей',
      'register.lastNameLabel': 'Фамилия',
      'register.lastNamePlaceholder': 'Петров',
      'register.loginLabel': 'Логин',
      'register.loginPlaceholder': 'aurora',
      'register.passwordLabel': 'Создайте пароль',
      'register.passwordPlaceholder': 'Придумайте пароль',
      'register.confirmLabel': 'Повторите пароль',
      'register.confirmPlaceholder': 'Введите пароль ещё раз',
      'register.submit': 'Создать аккаунт',
      'register.switchPrompt': 'Уже есть аккаунт?',
      'register.switchLink': 'Войти',
      'dashboard.kicker': 'Личный кабинет',
      'dashboard.subtitle': 'Тихое пространство для каждого совместного пути.',
      'dashboard.greeting': 'С возвращением, {name}!',
      'dashboard.nextVisit.title': 'Ближайший визит',
      'dashboard.nextVisit.note': 'Мы подготовили комнату с мягким светом и музыкой специально для вас и питомца.',
      'dashboard.nextVisit.manage': 'Управлять записями',
      'dashboard.nextVisit.none': 'Визит ещё не назначен — выберите удобное время на странице центра.',
      'dashboard.profile.title': 'Профиль гостя',
      'dashboard.profile.firstName': 'Имя',
      'dashboard.profile.lastName': 'Фамилия',
      'dashboard.profile.memberSince': 'С нами с',
      'dashboard.profile.favoriteDrink': 'Чайный ритуал',
      'dashboard.profile.favoriteDrinkValue': 'Золотая ромашка с шалфейным мёдом',
      'dashboard.profile.preferredDoctor': 'Любимый доктор',
      'dashboard.profile.preferredDoctorValue': 'Др. Елизавета Серин',
      'dashboard.profile.edit': 'Обновить предпочтения',
      'dashboard.appointments.title': 'Ваши записи',
      'dashboard.appointments.subtitle': 'Управляйте каждой записью мягко и спокойно.',
      'dashboard.appointments.close': 'Закрыть список записей',
      'dashboard.appointments.empty': 'Записей пока нет. Забронируйте визит, и он появится здесь.',
      'dashboard.appointments.editDate': 'Изменить дату',
      'dashboard.appointments.editTime': 'Изменить время',
      'dashboard.appointments.save': 'Сохранить изменения',
      'dashboard.appointments.delete': 'Отменить запись',
      'dashboard.appointments.deleteConfirm': 'Вы уверены, что хотите отменить эту запись?',
      'appointments.status.pending': 'В ожидании подтверждения',
      'appointments.status.confirmed': 'Подтверждена',
      'appointments.status.cancelled': 'Отменена',
      'appointments.service.clinic': 'Ветеринарный центр',
      'appointments.service.memorial': 'Консультация в мемориальном парке',
      'appointments.service.recreation': 'Прогулка в зелёной зоне',
      'dashboard.history.title': 'История посещений',
      'dashboard.history.item1.title': 'Профилактический осмотр',
      'dashboard.history.item1.note': 'Нежный приём, ароматерапия и обновлённый план здоровья.',
      'dashboard.history.item2.title': 'Церемония в мемориальном саду',
      'dashboard.history.item2.note': 'Посадили лунный шалфей вместе с семьёй.',
      'dashboard.history.item3.title': 'Чайный круг',
      'dashboard.history.item3.note': 'Поделились историями и получили медитации для дома.',
      'dashboard.insights.title': 'Советы благополучия',
      'dashboard.insights.item1': 'Растягивайтесь вместе на рассвете для заботы о суставах.',
      'dashboard.insights.item2': 'Приносите любимый плед питомца, чтобы ему было спокойнее.',
      'dashboard.insights.item3': 'Пишите благодарность после каждой прогулки, чтобы память сияла.',
      'dashboard.insights.cta': 'Скачать персональный план',
      'admin.kicker': 'Администратор',
      'admin.title': 'Панель управления',
      'admin.subtitle': 'Просматривайте записи гостей, подтверждайте визиты и поддерживайте плавный график.',
      'admin.filter.status': 'Фильтр по статусу',
      'admin.filter.statusAll': 'Все статусы',
      'admin.filter.statusPending': 'Ожидает подтверждения',
      'admin.filter.statusConfirmed': 'Подтверждено',
      'admin.filter.statusCancelled': 'Отменено',
      'admin.filter.user': 'Фильтр по гостю',
      'admin.filter.userAll': 'Все гости',
      'admin.filter.date': 'Фильтр по дате',
      'admin.sort.label': 'Сортировка',
      'admin.sort.dateAsc': 'Дата — сначала ранние',
      'admin.sort.dateDesc': 'Дата — сначала поздние',
      'admin.sort.status': 'Статус',
      'admin.sort.guest': 'Имя гостя',
      'admin.table.title': 'Записи гостей',
      'admin.table.subtitle': 'Подтверждайте, переносите или отменяйте бережно.',
      'admin.table.guest': 'Гость',
      'admin.table.guardian': 'Хранитель',
      'admin.table.contact': 'Контакты',
      'admin.table.notes': 'Заметки',
      'admin.table.service': 'Услуга',
      'admin.table.datetime': 'Дата и время',
      'admin.table.status': 'Статус',
      'admin.table.actions': 'Действия',
      'admin.table.showDetails': 'Показать детали',
      'admin.table.hideDetails': 'Скрыть детали',
      'admin.actions.confirm': 'Подтвердить',
      'admin.actions.pending': 'Отметить как ожидающую',
      'admin.actions.cancel': 'Отменить',
      'admin.actions.action': 'Действие',
      'admin.actions.reschedule': 'Перенести',
      'admin.actions.delete': 'Удалить',
      'admin.actions.deleteConfirm': 'Удалить эту запись из расписания?',
      'admin.table.empty': 'Записей пока нет.',
      'admin.reschedule.title': 'Перенести запись',
      'admin.reschedule.subtitle': 'Обновите время и подтвердите, когда гость будет готов.',
      'admin.reschedule.date': 'Новая дата',
      'admin.reschedule.time': 'Новое время',
      'admin.reschedule.submit': 'Сохранить изменения',
      'admin.reschedule.cancel': 'Отменить',
      'clinic.kicker': 'Ветеринарный центр',
      'clinic.title': 'Нежная медицина в окружении света',
      'clinic.subtitle': 'Медицинское крыло Aura Memoria сочетает технологии и ритуалы спа, чтобы каждый визит был спокойным.',
      'clinic.booking.cta': 'Записаться',
      'clinic.booking.authCta': 'Войдите, чтобы записаться',
      'clinic.learnMore': 'Познакомиться с доктором',
      'clinic.doctor.name': 'Др. Елизавета Серин',
      'clinic.doctor.role': 'Главный ветеринарный терапевт',
      'clinic.doctor.bio': 'Выпускница Венского ветеринарного института, доктор Серин проводит приёмы с внимательностью, ароматерапией и интегративной медициной. Каждая сессия начинается с совместного дыхания, чтобы успокоить хранителя и питомца.',
      'clinic.doctor.highlight1': 'Сертифицированный специалист по поддержке в период утрат',
      'clinic.doctor.highlight2': 'Составляет персональные травяные планы восстановления',
      'clinic.doctor.highlight3': 'Проводит вечерние чайные круги для тревожных гостей',
      'clinic.doctor.button': 'Записаться к доктору Серин',
      'clinic.doctor.loginPrompt': 'Войдите, чтобы записаться к доктору',
      'clinic.therapy.title': 'Пространства, настроенные на исцеление',
      'clinic.therapy.copy': 'От гидротерапии при лунном свете до кристально-инфузионной диагностики — каждая деталь служит равновесию, аромату и мягкому прикосновению.',
      'clinic.therapy.room': 'Комната «Аврора»',
      'clinic.therapy.roomCopy': 'Инфракрасное тепло, лесные звуки и приватная терраса для чая после сеанса.',
      'clinic.therapy.lab': 'Лаборатория «Биосвет»',
      'clinic.therapy.labCopy': 'Быстрая диагностика в мягком биофильном освещении и ручной керамике.',
      'clinic.therapy.rest': 'Гостиная тихого восстановления',
      'clinic.therapy.restCopy': 'Утяжелённые пледы, дыхательные практики и индивидуальные плейлисты.',
      'clinic.booking.title': 'Запланируйте визит',
      'clinic.booking.intro': 'Выберите подходящее время. Наши кураторы свяжутся с тёплым подтверждением в течение часа.',
      'clinic.booking.date': 'Желаемая дата',
      'clinic.booking.time': 'Желаемое время',
      'clinic.booking.guardian': 'Имя хранителя',
      'clinic.booking.guardianPlaceholder': 'Ваше полное имя',
      'clinic.booking.contact': 'Контакты',
      'clinic.booking.contactPlaceholder': '+7 999 000 00 00',
      'clinic.booking.notes': 'Заметки для доктора Серин',
      'clinic.booking.notesPlaceholder': 'Поделитесь особыми потребностями или любимыми ритуалами…',
      'clinic.booking.submit': 'Подтвердить заявку',
      'clinic.booking.close': 'Закрыть окно бронирования',
      'memorial.kicker': 'Мемориальный парк',
      'memorial.title': 'Истории, которые несут ветер и свет',
      'memorial.subtitle': 'Пройдитесь по тропам шалфея, где каждого питомца чтят музыкой, ароматами и письмами семьи.',
      'memorial.info.hours': 'Открыто ежедневно для тихого созерцания 07:00 – 23:00',
      'memorial.info.ceremony': 'Церемонии на рассвете, в полдень и при луне',
      'memorial.gallery.title': 'Семьи света',
      'memorial.gallery.subtitle': 'Выберите спутника, чтобы войти в его пространство памяти.',
      'memorial.luna.name': 'Луна',
      'memorial.luna.caption': 'Танцующее снежное сердце семьи Волковых',
      'memorial.miro.name': 'Миро',
      'memorial.miro.caption': 'Поэт солнечных лучей, любимец семьи Демир',
      'memorial.aria.name': 'Ария',
      'memorial.aria.caption': 'Небесная певица дома Шнайдеров',
      'memorial.rituals.title': 'Ритуалы памяти',
      'memorial.rituals.copy': 'Хранители собирают ароматные конверты, зажигают янтарные фонари и ведут семьи через круги воспоминаний под ивами. Каждый обряд записан в нашей аурной библиотеке.',
      'memorial.rituals.item1': 'Дорожки из лепестков в мягком свечении',
      'memorial.rituals.item2': 'Ручные книги, хранящие шёпот воспоминаний',
      'memorial.rituals.item3': 'Звуковые купания с любимыми мелодиями',
      'memorial.detail.back': '← Вернуться в Мемориальный парк',
      'memorial.luna.title': 'Луна — хранительница северного сияния',
      'memorial.luna.family': 'Член семьи Волковых',
      'memorial.luna.summary': 'Следы Луны в снегу складывались в созвездия. Она учила семью встречать рассвет, смеяться над бурями и отдыхать у берёз.',
      'memorial.luna.storyTitle': 'Моменты, что мы бережём',
      'memorial.luna.story': 'Луна обожала серебряный колокольчик на ошейнике — каждый звон значил новое приключение. Она приветствовала гостей мягким прикосновением лапы и вела к кедровой скамье. Последнюю ночь провела, глядя на северное сияние с родными.',
      'memorial.luna.quote': '«Она напоминала, что верность — тёплый фонарь зимой.»',
      'memorial.luna.fact1.title': 'Любимый аромат',
      'memorial.luna.fact1.value': 'Белый чай с сосновой смолой',
      'memorial.luna.fact2.title': 'Дорогой ритуал',
      'memorial.luna.fact2.value': 'Прогулки под звёздами в полночь',
      'memorial.luna.fact3.title': 'Слова семьи',
      'memorial.luna.fact3.value': '«Её вой был нашим семейным хором.»',
      'memorial.luna.galleryTitle': 'Галерея сияния',
      'memorial.luna.gallery1': 'Утренний привал перед кедровой тропой',
      'memorial.luna.gallery2': 'Семейный чай у замёрзшего озера',
      'memorial.luna.gallery3': 'Церемония фонарей в честь её приключений',
      'memorial.miro.title': 'Миро — поэт солнечных лучей',
      'memorial.miro.family': 'Член семьи Демир',
      'memorial.miro.summary': 'Миро сочинял молчаливые стихи медленными морганиями. Он дремал на пианино и созывал всех к ужину одним мелодичным трелем.',
      'memorial.miro.storyTitle': 'Моменты, что мы бережём',
      'memorial.miro.story': 'Каждый день Миро выводил семью в сад на пять минут солнечной тишины. Он любил лежать на иллюстрированных книгах, переворачивая страницы хвостом. В дождливые ночи слушал джаз и делил колени двух сестёр.',
      'memorial.miro.quote': '«Он учил нас терпению — светлее любого люстра.»',
      'memorial.miro.fact1.title': 'Любимый аромат',
      'memorial.miro.fact1.value': 'Апельсиновый цвет и чернила',
      'memorial.miro.fact2.title': 'Дорогой ритуал',
      'memorial.miro.fact2.value': 'Истории на подоконнике',
      'memorial.miro.fact3.title': 'Слова семьи',
      'memorial.miro.fact3.value': '«Его мурлыканье окрашивало дом солнечным светом.»',
      'memorial.miro.galleryTitle': 'Галерея мягких стихов',
      'memorial.miro.gallery1': 'Рассветные отражения на подоконнике',
      'memorial.miro.gallery2': 'Фонари из его хайку',
      'memorial.miro.gallery3': 'Вечерний уголок с тёплым чаем',
      'memorial.aria.title': 'Ария — хранительница небесной песни',
      'memorial.aria.family': 'Член семьи Шнайдеров',
      'memorial.aria.summary': 'Ария встречала утро мелодиями, подхватывая звон церковных колоколов. Она сидела на плечах за завтраком и шептала колыбельные по вечерам.',
      'memorial.aria.storyTitle': 'Моменты, что мы бережём',
      'memorial.aria.story': 'Её песни направляли семейные дыхательные практики. Ария знала куплеты на четырёх языках и вплетала их в рассветные серенады. Она касалась лбом младшего ребёнка, напевая храбрость новому дню.',
      'memorial.aria.quote': '«Она превращала любую тревогу в мелодию надежды.»',
      'memorial.aria.fact1.title': 'Любимый аромат',
      'memorial.aria.fact1.value': 'Цветы цитруса на заре',
      'memorial.aria.fact2.title': 'Дорогой ритуал',
      'memorial.aria.fact2.value': 'Вечерний дуэт под звёздами',
      'memorial.aria.fact3.title': 'Слова семьи',
      'memorial.aria.fact3.value': '«Её хор удерживал наш дом устойчивым.»',
      'memorial.aria.galleryTitle': 'Галерея мелодий',
      'memorial.aria.gallery1': 'Утренняя репетиция в ботаническом атриуме',
      'memorial.aria.gallery2': 'Семья слушает её сумеречную арию',
      'memorial.aria.gallery3': 'Запуск фонарей в честь её последней песни',
      'toast.register.success': 'Аккаунт создан — добро пожаловать в Aura Memoria.',
      'toast.register.loginExists': 'Такой логин уже используется.',
      'toast.register.loginShort': 'Логин должен быть не короче 3 символов.',
      'toast.register.mismatch': 'Пароли не совпадают — попробуйте ещё раз.',
      'toast.login.success': 'Рады видеть вас снова. Воспоминания ждут.',
      'toast.login.error': 'Не удалось найти такую пару логина и пароля.',
      'toast.logout.success': 'Вы вышли. Светильник будет ждать вашего возвращения.',
      'toast.contact.success': 'Сообщение отправлено с теплом. Мы свяжемся в ближайшее время.',
      'toast.booking.success': 'Запрос на визит получен. Ждите подтверждение.',
      'toast.booking.userOnly': 'Записываются только гостевые аккаунты. Войдите в личный кабинет.',
      'toast.appointment.updated': 'Запись обновлена бережно.',
      'toast.appointment.deleted': 'Запись удалена.',
      'toast.appointment.confirmed': 'Запись подтверждена.',
      'toast.appointment.pending': 'Запись отмечена как ожидающая.',
      'toast.appointment.cancelled': 'Запись отменена.',
      'toast.auth.required': 'Пожалуйста, войдите, чтобы продолжить путь.',
      'toast.auth.adminOnly': 'Требуется доступ администратора.',
    },
    tr: {
      'meta.homeTitle': 'Aura Memoria — Şefkat ve anı yan yana yaşatıyoruz',
      'meta.loginTitle': 'Aura Memoria — Giriş',
      'meta.registerTitle': 'Aura Memoria — Kayıt',
      'meta.dashboardTitle': 'Aura Memoria — Kişisel alan',
      'meta.clinicTitle': 'Aura Memoria — Veteriner merkezi',
      'meta.memorialTitle': 'Aura Memoria — Anı parkı',
      'meta.aboutTitle': 'Aura Memoria — Hakkımızda',
      "meta.memorialLunaTitle": "Aura Memoria — Luna'nın hikayesi",
      "meta.memorialMiroTitle": "Aura Memoria — Miro'nun hikayesi",
      "meta.memorialAriaTitle": "Aura Memoria — Aria'nın şarkısı",
      'header.tagline': 'Şefkat • Anı • Doğa',
      'header.login': 'Giriş yap',
      'header.register': 'Hesap oluştur',
      'header.dashboard': 'Kişisel alan',
      'header.adminPanel': 'Yönetim paneli',
      'header.logout': 'Çıkış yap',
      'header.languageToggle': 'Dili seçin',
      'header.bookAppointment': 'Randevu al',
      'header.home': 'Ana sayfa',
      'header.menuOpen': 'Menüyü aç',
      'header.menuClose': 'Menüyü kapat',
      'nav.services': 'Hizmetler',
      'nav.memory': 'Hatıra',
      'nav.about': 'Hakkımızda',
      'hero.title': 'Şefkat ve anı yan yana yaşatıyoruz.',
      'hero.subtitle': 'Aura Memoria veteriner bakımı, sevgiyi ve sonsuz hatırayı doğa ve ışıkla uyum içinde bir araya getirir.',
      'hero.primaryCta': 'Randevu al',
      'hero.secondaryCta': 'Hizmetleri keşfet',
      'services.kicker': 'Özümüz',
      'services.title': 'Hayatın her evresi için bir sığınak',
      'services.clinic.title': 'Veteriner merkezi',
      'services.clinic.copy': 'Her ziyarette şefkat, modern teşhisler ve sakin bir ortamla kapsamlı bakım.',
      'services.clinic.link': 'Daha fazlası',
      'services.memorial.title': 'Anı parkı',
      'services.memorial.copy': 'Kişiye özel vedalar, kremasyon hizmetleri ve huzurlu bahçelerde zamansız anıtlar.',
      'services.memorial.link': 'Parkı ziyaret et',
      'services.park.title': 'Dinlenme Koruluğu',
      'services.park.copy': 'Sevdiklerinizle yeşil gölgelerde dingin yürüyüşler, çay terasları ve paylaşılan anlar.',
      'memory.quote': '“Yaprakların fısıltısında onların sonsuz sevgisini duyarız.”',
      'memory.copy': 'Anı bekçilerimiz dostlarımızın hayatımıza kattığı sevinç, sadakat ve ışığı onurlandıran törenler tasarlar.',
      'memory.cta': 'Daha fazla bilgi',
      'stories.kicker': 'Anı Hikayeleri',
      'stories.title': 'Solmayan sevginin yankıları',
      'stories.card1.title': 'Luna için güneşli patika',
      'stories.card1.copy': 'Nazik bir bahçe töreni, bir ailenin huskylerinin maceracı ruhunu kutlamasına nasıl yardımcı oldu.',
      'stories.card2.title': 'Sedir bank',
      'stories.card2.copy': 'Ziyaretçilerin ayrılan dostları için notlar bıraktığı, toplum tarafından oluşturulan anı noktası.',
      'stories.card3.title': 'Alacakaranlıkta çay',
      'stories.card3.copy': 'Farkındalık, sanat terapisi ve sakin paylaşımları buluşturan haftalık buluşmalar.',
      'stories.card.button': 'Yakında',
      'about.kicker': 'Aura Memoria hakkında',
      'about.title': 'Işığın, şefkatin ve anının buluştuğu sığınak',
      'about.body1':
        'Aura Memoria, veteriner uzmanlığının, anma ritüellerinin ve huzurlu yeşil alanların sınır olmadan buluştuğu tek bir yuva olarak tasarlandı.',
      'about.body2':
        'Her malzeme, koku ve ses aileleri ve dostlarını özenli tedaviden şefkatli kutlama anlarına yumuşakça taşımak için seçildi.',
      'about.quote': '“Işığın, şefkatin ve anının tek bir yerde buluştuğu bir alan yaratıyoruz.”',
      'about.imageCaption': 'Aura Memoria resepsiyon salonu misafirleri karşılıyor',
      'about.imageAlt': 'Yumuşak ışıklı Aura Memoria resepsiyon alanı ve altın logo',
      'about.details.kicker': 'Atmosferimiz',
      'about.details.title': 'Kapıdan içeri adım attığınızda sizi karşılayanlar',
      'about.details.item1.title': 'Sakin karşılama',
      'about.details.item1.copy':
        'Karşılayıcılarımız bitki çayları, sıcak aydınlatma ve yumuşak melodilerle her kalbi sakinleştirir.',
      'about.details.item2.title': 'Birlikte rehberlik',
      'about.details.item2.copy':
        'Veteriner ekipleri ve anı rehberleri her adımı koordine eder, böylece hiçbir an telaşlı ya da yalnız hissettirmez.',
      'about.details.item3.title': 'Yaşayan anılar',
      'about.details.item3.copy':
        'İç bahçeler, hikâye köşeleri ve dijital arşiv aileleri geri dönmeye ve gelenekleri sürdürmeye davet eder.',
      'contact.kicker': 'Bağlanın',
      'contact.title': 'Dinlemek ve destek olmak için buradayız',
      'contact.visit.title': 'Ziyaret edin',
      'contact.visit.address': 'Golden Grove Lane 12, Huzur Bölgesi',
      'contact.visit.hours': 'Her gün 8:00 – 22:00 arası açıktır',
      'contact.call.title': 'Arayın',
      'contact.call.primary': '+7 (495) 123-45-67',
      'contact.call.secondary': '+90 555 123 45 67',
      'contact.write.title': 'Yazın',
      'contact.write.email': 'hello@auramemoria.com',
      'contact.form.name': 'İsim',
      'contact.form.namePlaceholder': 'Adınız',
      'contact.form.email': 'E-posta',
      'contact.form.emailPlaceholder': 'ornek@example.com',
      'contact.form.message': 'Mesaj',
      'contact.form.messagePlaceholder': 'Size nasıl destek olabiliriz?',
      'contact.form.submit': 'Mesaj gönder',
      'footer.copy': '© 2025 Aura Memoria. Tüm hakları saklıdır.',
      'footer.backToTop': 'Başa dön',
      'login.title': 'Aura Memoria hesabınıza giriş yapın',
      'login.subtitle': 'Evcil dostlara ve ailelere şefkat ve huzurla eşlik etmeye devam edin.',
      'login.loginLabel': 'Kullanıcı adı',
      'login.loginPlaceholder': 'aurora',
      'login.passwordLabel': 'Parola',
      'login.passwordPlaceholder': 'Parolanızı girin',
      'login.submit': 'Giriş yap',
      'login.forgot': 'Parolanızı mı unuttunuz?',
      'login.switchPrompt': 'Hesabınız yok mu?',
      'login.switchLink': 'Oluşturun',
      'register.title': 'Aura Memoria hesabınızı oluşturun',
      'register.subtitle': 'Randevu almak, anma törenleri planlamak ve sevgili dostların hikayelerini paylaşmak için aramıza katılın.',
      'register.firstNameLabel': 'Ad',
      'register.firstNamePlaceholder': 'Ahmet',
      'register.lastNameLabel': 'Soyad',
      'register.lastNamePlaceholder': 'Yılmaz',
      'register.loginLabel': 'Kullanıcı adı',
      'register.loginPlaceholder': 'aurora',
      'register.passwordLabel': 'Parola oluşturun',
      'register.passwordPlaceholder': 'Bir parola oluşturun',
      'register.confirmLabel': 'Parolayı doğrulayın',
      'register.confirmPlaceholder': 'Parolanızı tekrar yazın',
      'register.submit': 'Hesap oluştur',
      'register.switchPrompt': 'Zaten hesabınız var mı?',
      'register.switchLink': 'Giriş yapın',
      'dashboard.kicker': 'Kişisel alan',
      'dashboard.subtitle': 'Her ortak yolculuk için huzurlu alanınız.',
      'dashboard.greeting': 'Tekrar hoş geldiniz, {name}!',
      'dashboard.nextVisit.title': 'Yaklaşan randevu',
      'dashboard.nextVisit.note': 'Sizin ve dostunuz için yumuşak ışıklı, müzikli bir oda hazırladık.',
      'dashboard.nextVisit.manage': 'Randevuları yönet',
      'dashboard.nextVisit.none': 'Henüz bir ziyaret planlanmadı — klinik sayfasından zaman seçebilirsiniz.',
      'dashboard.profile.title': 'Misafir profili',
      'dashboard.profile.firstName': 'Ad',
      'dashboard.profile.lastName': 'Soyad',
      'dashboard.profile.memberSince': 'Bizimle',
      'dashboard.profile.favoriteDrink': 'Çay ritüeli',
      'dashboard.profile.favoriteDrinkValue': 'Adaçaylı altın papatya',
      'dashboard.profile.preferredDoctor': 'Tercih edilen doktor',
      'dashboard.profile.preferredDoctorValue': 'Dr. Elizaveta Serin',
      'dashboard.profile.edit': 'Tercihleri güncelle',
      'dashboard.appointments.title': 'Randevularınız',
      'dashboard.appointments.subtitle': 'Her ziyareti nazik dokunuşlarla yönetin.',
      'dashboard.appointments.close': 'Randevu listesini kapat',
      'dashboard.appointments.empty': 'Henüz randevu yok. Yeni bir ziyaret ayarladığınızda burada görünecek.',
      'dashboard.appointments.editDate': 'Tarihi güncelle',
      'dashboard.appointments.editTime': 'Saati güncelle',
      'dashboard.appointments.save': 'Değişiklikleri kaydet',
      'dashboard.appointments.delete': 'Randevuyu iptal et',
      'dashboard.appointments.deleteConfirm': 'Bu randevuyu iptal etmek istediğinize emin misiniz?',
      'appointments.status.pending': 'Onay bekliyor',
      'appointments.status.confirmed': 'Onaylandı',
      'appointments.status.cancelled': 'İptal edildi',
      'appointments.service.clinic': 'Veteriner merkezi',
      'appointments.service.memorial': 'Anı parkı danışmanlığı',
      'appointments.service.recreation': 'Yeşil alan ziyareti',
      'dashboard.history.title': 'Ziyaret geçmişi',
      'dashboard.history.item1.title': 'Sağlık kontrolü',
      'dashboard.history.item1.note': 'Nazik karşılama, aromaterapi ve güncellenen sağlık planı.',
      'dashboard.history.item2.title': 'Anı bahçesi töreni',
      'dashboard.history.item2.note': 'Aileyle birlikte ay ışığı adaçayı dikildi.',
      'dashboard.history.item3.title': 'Çay çemberi buluşması',
      'dashboard.history.item3.note': 'Toplulukla paylaşılan hikâyeler ve rehberli meditasyon kayıtları.',
      'dashboard.insights.title': 'İyilik ipuçları',
      'dashboard.insights.item1': 'Güneş doğarken birlikte esneyin, eklemlere iyi gelir.',
      'dashboard.insights.item2': 'Her ziyarette dostunuzun en sevdiği battaniyeyi getirin.',
      'dashboard.insights.item3': 'Her yürüyüşten sonra kısa bir şükran notu yazın.',
      'dashboard.insights.cta': 'Kişisel planı indir',
      'admin.kicker': 'Yönetici',
      'admin.title': 'Yönetim paneli',
      'admin.subtitle': 'Tüm misafir randevularını inceleyin, nazikçe onaylayın ve programın akışını koruyun.',
      'admin.filter.status': 'Duruma göre filtrele',
      'admin.filter.statusAll': 'Tüm durumlar',
      'admin.filter.statusPending': 'Onay bekliyor',
      'admin.filter.statusConfirmed': 'Onaylandı',
      'admin.filter.statusCancelled': 'İptal edildi',
      'admin.filter.user': 'Misafire göre filtrele',
      'admin.filter.userAll': 'Tüm misafirler',
      'admin.filter.date': 'Tarihe göre filtrele',
      'admin.sort.label': 'Sırala',
      'admin.sort.dateAsc': 'Tarih — eskiden yeniye',
      'admin.sort.dateDesc': 'Tarih — yeniden eskiye',
      'admin.sort.status': 'Durum',
      'admin.sort.guest': 'Misafir adı',
      'admin.table.title': 'Misafir randevuları',
      'admin.table.subtitle': 'Nazik dokunuşlarla onaylayın, yeniden planlayın veya iptal edin.',
      'admin.table.guest': 'Misafir',
      'admin.table.guardian': 'Bakıcı',
      'admin.table.contact': 'İletişim',
      'admin.table.notes': 'Notlar',
      'admin.table.service': 'Hizmet',
      'admin.table.datetime': 'Tarih ve saat',
      'admin.table.status': 'Durum',
      'admin.table.actions': 'İşlemler',
      'admin.table.showDetails': 'Detayları göster',
      'admin.table.hideDetails': 'Detayları gizle',
      'admin.actions.confirm': 'Onayla',
      'admin.actions.pending': 'Beklemede işaretle',
      'admin.actions.cancel': 'İptal et',
      'admin.actions.action': 'İşlem',
      'admin.actions.reschedule': 'Yeniden planla',
      'admin.actions.delete': 'Sil',
      'admin.actions.deleteConfirm': 'Bu randevuyu programdan kaldırmak istiyor musunuz?',
      'admin.table.empty': 'Henüz randevu yok.',
      'admin.reschedule.title': 'Randevuyu güncelle',
      'admin.reschedule.subtitle': 'Zamanı güncelleyin ve hazır olduğunda onaylayın.',
      'admin.reschedule.date': 'Yeni tarih',
      'admin.reschedule.time': 'Yeni saat',
      'admin.reschedule.submit': 'Değişiklikleri kaydet',
      'admin.reschedule.cancel': 'İptal',
      'clinic.kicker': 'Veteriner merkezi',
      'clinic.title': 'Işıkla çevrili nazik tıp',
      'clinic.subtitle': 'Aura Memoria\'nın tıbbi kanadı modern teşhisi spa benzeri ritüellerle birleştirir.',
      'clinic.booking.cta': 'Randevu al',
      'clinic.booking.authCta': 'Randevu için giriş yapın',
      'clinic.learnMore': 'Doktorla tanış',
      'clinic.doctor.name': 'Dr. Elizaveta Serin',
      'clinic.doctor.role': 'Baş veteriner terapist',
      'clinic.doctor.bio': 'Viyana Veteriner Enstitüsü mezunu Dr. Serin her ziyareti farkındalık, aromaterapi ve misafire özel bütünsel tıp ile yönetir. Seanslar, bakıcı ve dostu sakinleştiren ortak nefes ritüeli ile başlar.',
      'clinic.doctor.highlight1': 'Kayba duyarlı veteriner destek sertifikası',
      'clinic.doctor.highlight2': 'Kişiye özel bitkisel iyileşme planları hazırlar',
      'clinic.doctor.highlight3': 'Kaygılı misafirler için alacakaranlık çay buluşmaları düzenler',
      'clinic.doctor.button': 'Dr. Serin ile rezervasyon yap',
      'clinic.doctor.loginPrompt': 'Rezervasyon için giriş yapın',
      'clinic.therapy.title': 'Şifaya ayarlı alanlar',
      'clinic.therapy.copy': 'Ay ışığında hidroterapi havuzlarından kristal destekli teşhise kadar her detay denge ve nazik dokunuş içindir.',
      'clinic.therapy.room': 'Aurora tedavi odası',
      'clinic.therapy.roomCopy': 'Kızılötesi sıcaklık, orman sesleri ve seans sonrası çay terası.',
      'clinic.therapy.lab': 'Biyolight laboratuvarı',
      'clinic.therapy.labCopy': 'Yumuşak biyofilik ışık ve el yapımı seramiklerle hızlı teşhis.',
      'clinic.therapy.rest': 'Sakin yenilenme salonu',
      'clinic.therapy.restCopy': 'Ağırlıklı battaniyeler, nefes egzersizleri ve özel çalma listeleri.',
      'clinic.booking.title': 'Ziyaretinizi planlayın',
      'clinic.booking.intro': 'Size uygun zamanı seçin. Görevlilerimiz sıcak bir mesajla kısa sürede onaylayacak.',
      'clinic.booking.date': 'Tercih edilen tarih',
      'clinic.booking.time': 'Tercih edilen saat',
      'clinic.booking.guardian': 'Bakıcı adı',
      'clinic.booking.guardianPlaceholder': 'Tam adınız',
      'clinic.booking.contact': 'İletişim bilgileri',
      'clinic.booking.contactPlaceholder': '+90 555 000 00 00',
      'clinic.booking.notes': 'Dr. Serin\'e notlar',
      'clinic.booking.notesPlaceholder': 'Özel ihtiyaçlar veya sevdiği ritüeller…',
      'clinic.booking.submit': 'Talebi onayla',
      'clinic.booking.close': 'Rezervasyon penceresini kapat',
      'memorial.kicker': 'Anı parkı',
      'memorial.title': 'Rüzgârın ve ışığın taşıdığı hikâyeler',
      'memorial.subtitle': 'Her evcil dostun müzik, koku ve el yazısı mektuplarla onurlandırıldığı adaçayı yollarında yürüyün.',
      'memorial.info.hours': 'Sessiz anılar için her gün 07:00 – 23:00 arası açık',
      'memorial.info.ceremony': 'Şafakta, öğle vakti ve ay ışığında törenler',
      'memorial.gallery.title': 'Işık aileleri',
      'memorial.gallery.subtitle': 'Özel anı alanına girmek için bir dost seçin.',
      'memorial.luna.name': 'Luna',
      'memorial.luna.caption': 'Kar kalpli dansçı, Volkov ailesinin üyesi',
      'memorial.miro.name': 'Miro',
      'memorial.miro.caption': 'Güneş ışığı şairi, Demir ailesinin gözdesi',
      'memorial.aria.name': 'Aria',
      'memorial.aria.caption': 'Göksel şarkıcı, Schneider ailesinin parçası',
      'memorial.rituals.title': 'Anı ritüelleri',
      'memorial.rituals.copy': 'Görevliler koku zarfları hazırlar, kehribar fenerler yakar ve söğütlerin altında hikâye halkaları düzenler. Her anı, gelecek nesiller için aurik kütüphanemizde saklanır.',
      'memorial.rituals.item1': 'Yumuşak mum ışığında aydınlanan yaprak yollar',
      'memorial.rituals.item2': 'Fısıldanan anıları toplayan el yapımı defterler',
      'memorial.rituals.item3': 'Sevilen melodilerle uyumlanan ses banyosu törenleri',
      'memorial.detail.back': '← Anı parkına dön',
      'memorial.luna.title': 'Luna — Kuzey ışıklarının bekçisi',
      'memorial.luna.family': 'Volkov ailesinin üyesi',
      'memorial.luna.summary': 'Luna\'nın patileri karda takımyıldızlar çizdi. Ailesine şafağı kovalamayı, fırtınalara gülmeyi ve hızlanan dünyada huşlara yaslanmayı öğretti.',
      'memorial.luna.storyTitle': 'Hatırladığımız anlar',
      'memorial.luna.story': 'Luna boynundaki gümüş çanı çok severdi; her çınlama yeni macera demekti. Misafirleri nazikçe patisiyle selamlayıp çay bekleyen sedir bankına götürürdü. Son gecesini ailece kuzey ışıklarını izleyerek geçirdi.',
      'memorial.luna.quote': '“Bize sadakatin kışta sıcak bir fener olduğunu hatırlattı.”',
      'memorial.luna.fact1.title': 'En sevdiği koku',
      'memorial.luna.fact1.value': 'Çam reçineli beyaz çay',
      'memorial.luna.fact2.title': 'Sevdiği ritüel',
      'memorial.luna.fact2.value': 'Gece yarısı yıldız yürüyüşleri',
      'memorial.luna.fact3.title': 'Aile sözleri',
      'memorial.luna.fact3.value': '“Uluması aile koromuzdu.”',
      'memorial.luna.galleryTitle': 'Işıltı galerisi',
      'memorial.luna.gallery1': 'Sedir yolundan önce sabah molası',
      'memorial.luna.gallery2': 'Dondurulmuş göl kenarında aile çayı',
      'memorial.luna.gallery3': 'Maceralarını onurlandıran fener töreni',
      'memorial.miro.title': 'Miro — güneş ışığı şairi',
      'memorial.miro.family': 'Demir ailesinin üyesi',
      'memorial.miro.summary': 'Miro yavaş göz kırpmalarıyla sessiz şiirler yazardı. Eskiz defterlerinin yanında kıvrılır, piyano kapağında uyur ve akşam yemeklerini melodik bir trill ile duyururdu.',
      'memorial.miro.storyTitle': 'Hatırladığımız anlar',
      'memorial.miro.story': 'Her öğleden sonra Miro aileyi beş dakikalık güneş sessizliği için bahçeye götürürdü. Resimli kitapların üzerinde yatmayı, zamanı geldiğinde kuyruğuyla sayfayı çevirmeyi severdi. Yağmurlu geceler caz plakları ve paylaşılan bir kucak demekti.',
      'memorial.miro.quote': '“Bize sabrın her avizeden parlak olduğunu öğretti.”',
      'memorial.miro.fact1.title': 'En sevdiği koku',
      'memorial.miro.fact1.value': 'Portakal çiçeği mürekkebi',
      'memorial.miro.fact2.title': 'Sevdiği ritüel',
      'memorial.miro.fact2.value': 'Pencere kenarında hikâye saati',
      'memorial.miro.fact3.title': 'Aile sözleri',
      'memorial.miro.fact3.value': '“Mırlaması evimizi güneşle boyardı.”',
      'memorial.miro.galleryTitle': 'Yumuşak dizeler galerisi',
      'memorial.miro.gallery1': 'Atölye pervazında gün doğumu yansımaları',
      'memorial.miro.gallery2': 'Haiku notlarından yapılan fenerler',
      'memorial.miro.gallery3': 'Sıcak çayla akşam okuma köşesi',
      'memorial.aria.title': 'Aria — göksel şarkı bekçisi',
      'memorial.aria.family': 'Schneider ailesinin üyesi',
      'memorial.aria.summary': 'Aria sabah ışığını çevredeki çanlarla uyumlu ezgilerle karşılardı. Aile kahvaltılarında omuzlara konar, akşamları ninniler fısıldardı.',
      'memorial.aria.storyTitle': 'Hatırladığımız anlar',
      'memorial.aria.story': 'Şarkıları ailenin nefes meditasyonlarını yönlendirirdi. Aria dört dilde mısralar öğrendi ve onları şafak serenatlarına dokudu. En küçük kardeşin alnına başını yaslayıp günü cesur kılana dek mırıldanmayı severdi.',
      'memorial.aria.quote': '“Her endişeyi umut melodisine dönüştürdü.”',
      'memorial.aria.fact1.title': 'En sevdiği koku',
      'memorial.aria.fact1.value': 'Şafakta narenciye çiçekleri',
      'memorial.aria.fact2.title': 'Sevdiği ritüel',
      'memorial.aria.fact2.value': 'Akşam yıldız düeti',
      'memorial.aria.fact3.title': 'Aile sözleri',
      'memorial.aria.fact3.value': '“Korosu ailemizi ayakta tuttu.”',
      'memorial.aria.galleryTitle': 'Ezgi galerisi',
      'memorial.aria.gallery1': 'Botanik atriyumda sabah provası',
      'memorial.aria.gallery2': 'Ailenin alacakaranlık aryasını dinlemesi',
      'memorial.aria.gallery3': 'Son şarkısını yansıtan fener bırakma',
      'toast.register.success': 'Hesabınız oluşturuldu — Aura Memoria\'ya hoş geldiniz.',
      'toast.register.loginExists': 'Bu kullanıcı adı zaten kullanılıyor.',
      'toast.register.loginShort': 'Kullanıcı adı en az 3 karakter olmalı.',
      'toast.register.mismatch': 'Parolalar eşleşmiyor — lütfen tekrar deneyin.',
      'toast.login.success': 'Tekrar hoş geldiniz. Anılarınız sizi bekliyor.',
      'toast.login.error': 'Bu kullanıcı adı ve parola eşleşmesi bulunamadı.',
      'toast.logout.success': 'Çıkış yaptınız. Fenerimiz dönüşünüzü bekleyecek.',
      'toast.contact.success': 'Mesajınız sıcaklıkla gönderildi. Kısa süre içinde size ulaşacağız.',
      'toast.booking.success': 'Randevu talebiniz alındı. Yakında onay gelecektir.',
      'toast.booking.userOnly': 'Randevu oluşturmak için misafir hesabınızla giriş yapın.',
      'toast.appointment.updated': 'Randevu nazikçe güncellendi.',
      'toast.appointment.deleted': 'Randevu silindi.',
      'toast.appointment.confirmed': 'Randevu onaylandı.',
      'toast.appointment.pending': 'Randevu onay bekliyor olarak işaretlendi.',
      'toast.appointment.cancelled': 'Randevu iptal edildi.',
      'toast.auth.required': 'Lütfen devam etmek için giriş yapın.',
      'toast.auth.adminOnly': 'Bu işlem için yönetici erişimi gerekiyor.',
    },
    de: {
      'meta.homeTitle': 'Aura Memoria – Wo Fürsorge und Erinnerung Seite an Seite leben',
      'meta.loginTitle': 'Aura Memoria – Anmeldung',
      'meta.registerTitle': 'Aura Memoria – Konto erstellen',
      'meta.dashboardTitle': 'Aura Memoria – Persönlicher Bereich',
      'meta.clinicTitle': 'Aura Memoria – Tierärztliches Zentrum',
      'meta.memorialTitle': 'Aura Memoria – Gedenkpark',
      'meta.aboutTitle': 'Aura Memoria – Über uns',
      'meta.memorialLunaTitle': 'Aura Memoria – Lunas Geschichte',
      'meta.memorialMiroTitle': 'Aura Memoria – Miros Geschichte',
      'meta.memorialAriaTitle': 'Aura Memoria – Arias Lied',
      'header.tagline': 'Fürsorge • Erinnerung • Natur',
      'header.login': 'Anmelden',
      'header.register': 'Konto erstellen',
      'header.dashboard': 'Persönlicher Bereich',
      'header.adminPanel': 'Verwaltungspanel',
      'header.logout': 'Abmelden',
      'header.languageToggle': 'Sprache auswählen',
      'header.bookAppointment': 'Termin buchen',
      'header.home': 'Startseite',
      'header.menuOpen': 'Menü öffnen',
      'header.menuClose': 'Menü schließen',
      'nav.services': 'Leistungen',
      'nav.memory': 'Erinnerung',
      'nav.about': 'Über uns',
      'hero.title': 'Wo Fürsorge und Erinnerung Seite an Seite leben.',
      'hero.subtitle': 'Aura Memoria vereint Tiermedizin, Liebe und ewiges Gedenken im Einklang mit Natur und Licht.',
      'hero.primaryCta': 'Termin buchen',
      'hero.secondaryCta': 'Leistungen ansehen',
      'services.kicker': 'Unser Wesen',
      'services.title': 'Ein Refugium für jede Lebensphase',
      'services.clinic.title': 'Tierärztliches Zentrum',
      'services.clinic.copy': 'Umfassende Betreuung mit Mitgefühl, moderner Diagnostik und einer ruhigen Atmosphäre bei jedem Besuch.',
      'services.clinic.link': 'Mehr erfahren',
      'services.memorial.title': 'Gedenkpark',
      'services.memorial.copy': 'Individuelle Abschiedszeremonien, Kremationsdienste und zeitlose Erinnerungsorte in sanften Gärten.',
      'services.memorial.link': 'Park besuchen',
      'services.park.title': 'Erholungswald',
      'services.park.copy': 'Stille Spaziergänge, sanfte Teeterrassen und geteilte Momente unter smaragdgrünen Kronen mit Ihren Lieblingen.',
      'memory.quote': '„Im Flüstern der Blätter hören wir ihre ewige Liebe.“',
      'memory.copy': 'Unsere Erinnerungshüter gestalten Zeremonien, die die Freude, Treue und das Licht ehren, die unsere Gefährten in unser Leben bringen.',
      'memory.cta': 'Mehr erfahren',
      'stories.kicker': 'Erinnerungsgeschichten',
      'stories.title': 'Echos der Liebe, die weiterblühen',
      'stories.card1.title': 'Sonnenpfad für Luna',
      'stories.card1.copy': 'Wie eine sanfte Gartenzeremonie einer Familie half, den abenteuerlichen Geist ihres Huskys zu feiern.',
      'stories.card2.title': 'Die Zedernbank',
      'stories.card2.copy': 'Ein von der Gemeinschaft geschaffener Ort, an dem Besucher handgeschriebene Notizen für verstorbene Gefährten hinterlassen.',
      'stories.card3.title': 'Tee in der Dämmerung',
      'stories.card3.copy': 'Wöchentliche Treffen, die Achtsamkeit, Kunsttherapie und stille Momente mit Freunden verbinden.',
      'stories.card.button': 'Demnächst',
      'about.kicker': 'Über Aura Memoria',
      'about.title': 'Ein Refugium aus Licht, Fürsorge und Erinnerung',
      'about.body1':
        'Aura Memoria entstand als ein Zuhause, in dem tierärztliche Kompetenz, Abschiedsrituale und ruhige Grünflächen grenzenlos ineinandergreifen.',
      'about.body2':
        'Jedes Material, jeder Duft und jeder Klang wurde gewählt, um Familien und Begleiter sanft von achtsamer Behandlung zu liebevollen Erinnerungen zu führen.',
      'about.quote': '„Wir schaffen einen Ort, an dem Licht, Fürsorge und Erinnerung eins werden.“',
      'about.imageCaption': 'Empfangsbereich von Aura Memoria heißt Gäste willkommen',
      'about.imageAlt': 'Empfang von Aura Memoria mit goldenem Logo und sanftem Licht',
      'about.details.kicker': 'Unsere Atmosphäre',
      'about.details.title': 'Das erwartet Sie beim Ankommen',
      'about.details.item1.title': 'Sanfter Empfang',
      'about.details.item1.copy':
        'Gastgeber reichen Kräutertee, warmes Licht und leise Musik, damit jeder Herzschlag zur Ruhe kommt.',
      'about.details.item2.title': 'Verbundenes Begleiten',
      'about.details.item2.copy':
        'Tierärztliche Betreuer und Erinnerungshüter stimmen jeden Schritt ab, damit kein Moment gehetzt oder einsam wirkt.',
      'about.details.item3.title': 'Lebendige Erinnerungen',
      'about.details.item3.copy':
        'Innengärten, Erzähl-Nischen und digitale Archive laden Familien ein, zurückzukehren, zu erinnern und Rituale weiterzuführen.',
      'contact.kicker': 'Kontakt',
      'contact.title': 'Wir sind da, um zuzuhören und zu helfen',
      'contact.visit.title': 'Besuchen',
      'contact.visit.address': 'Golden Grove Lane 12, Bezirk der Ruhe',
      'contact.visit.hours': 'Täglich geöffnet von 8:00 – 22:00 Uhr',
      'contact.call.title': 'Anrufen',
      'contact.call.primary': '+7 (495) 123-45-67',
      'contact.call.secondary': '+90 555 123 45 67',
      'contact.write.title': 'Schreiben',
      'contact.write.email': 'hello@auramemoria.com',
      'contact.form.name': 'Name',
      'contact.form.namePlaceholder': 'Ihr Name',
      'contact.form.email': 'E-Mail',
      'contact.form.emailPlaceholder': 'name@example.com',
      'contact.form.message': 'Nachricht',
      'contact.form.messagePlaceholder': 'Wie können wir Sie unterstützen?',
      'contact.form.submit': 'Nachricht senden',
      'footer.copy': '© 2025 Aura Memoria. Alle Rechte vorbehalten.',
      'footer.backToTop': 'Nach oben',
      'login.title': 'Melden Sie sich bei Aura Memoria an',
      'login.subtitle': 'Begleiten Sie weiterhin Tiere und Familien mit Mitgefühl und Ruhe.',
      'login.loginLabel': 'Login',
      'login.loginPlaceholder': 'aurora',
      'login.passwordLabel': 'Passwort',
      'login.passwordPlaceholder': 'Geben Sie Ihr Passwort ein',
      'login.submit': 'Anmelden',
      'login.forgot': 'Passwort vergessen?',
      'login.switchPrompt': 'Noch kein Konto?',
      'login.switchLink': 'Jetzt erstellen',
      'register.title': 'Erstellen Sie Ihr Aura Memoria Konto',
      'register.subtitle': 'Nehmen Sie teil, um Termine zu buchen, Erinnerungsfeiern zu planen und Geschichten über geliebte Begleiter zu teilen.',
      'register.firstNameLabel': 'Vorname',
      'register.firstNamePlaceholder': 'Anna',
      'register.lastNameLabel': 'Nachname',
      'register.lastNamePlaceholder': 'Schneider',
      'register.loginLabel': 'Login',
      'register.loginPlaceholder': 'aurora',
      'register.passwordLabel': 'Passwort erstellen',
      'register.passwordPlaceholder': 'Passwort erstellen',
      'register.confirmLabel': 'Passwort bestätigen',
      'register.confirmPlaceholder': 'Passwort wiederholen',
      'register.submit': 'Konto erstellen',
      'register.switchPrompt': 'Bereits ein Konto?',
      'register.switchLink': 'Anmelden',
      'dashboard.kicker': 'Persönlicher Bereich',
      'dashboard.subtitle': 'Ihr ruhiger Raum für jede gemeinsame Reise.',
      'dashboard.greeting': 'Willkommen zurück, {name}!',
      'dashboard.nextVisit.title': 'Bevorstehender Termin',
      'dashboard.nextVisit.note': 'Wir haben einen Raum mit warmem Licht und leiser Musik für Sie und Ihren Begleiter vorbereitet.',
      'dashboard.nextVisit.manage': 'Termine verwalten',
      'dashboard.nextVisit.none': 'Noch kein Termin geplant – wählen Sie Ihre Zeit auf der Klinikseite.',
      'dashboard.profile.title': 'Gästeprofil',
      'dashboard.profile.firstName': 'Vorname',
      'dashboard.profile.lastName': 'Nachname',
      'dashboard.profile.memberSince': 'Mitglied seit',
      'dashboard.profile.favoriteDrink': 'Tee-Ritual',
      'dashboard.profile.favoriteDrinkValue': 'Goldene Kamille mit Salbeihonig',
      'dashboard.profile.preferredDoctor': 'Bevorzugte Ärztin',
      'dashboard.profile.preferredDoctorValue': 'Dr. Elizaveta Serin',
      'dashboard.profile.edit': 'Präferenzen aktualisieren',
      'dashboard.appointments.title': 'Ihre Termine',
      'dashboard.appointments.subtitle': 'Verwalten Sie jede Buchung mit sanften Anpassungen.',
      'dashboard.appointments.close': 'Terminliste schließen',
      'dashboard.appointments.empty': 'Noch keine Termine. Nach der Buchung erscheinen sie hier.',
      'dashboard.appointments.editDate': 'Datum anpassen',
      'dashboard.appointments.editTime': 'Uhrzeit anpassen',
      'dashboard.appointments.save': 'Änderungen speichern',
      'dashboard.appointments.delete': 'Termin stornieren',
      'dashboard.appointments.deleteConfirm': 'Möchten Sie diesen Termin wirklich stornieren?',
      'appointments.status.pending': 'Wartet auf Bestätigung',
      'appointments.status.confirmed': 'Bestätigt',
      'appointments.status.cancelled': 'Storniert',
      'appointments.service.clinic': 'Tierärztliches Zentrum',
      'appointments.service.memorial': 'Beratung im Gedenkpark',
      'appointments.service.recreation': 'Besuch im Grüngarten',
      'dashboard.history.title': 'Besuchshistorie',
      'dashboard.history.item1.title': 'Wellness-Untersuchung',
      'dashboard.history.item1.note': 'Sanfter Empfang, Aromatherapie und aktualisierter Gesundheitsplan.',
      'dashboard.history.item2.title': 'Zeremonie im Gedenkgarten',
      'dashboard.history.item2.note': 'Gemeinsam einen Mondschein-Salbei gepflanzt.',
      'dashboard.history.item3.title': 'Teekreis am Abend',
      'dashboard.history.item3.note': 'Geschichten geteilt und geführte Meditationen erhalten.',
      'dashboard.insights.title': 'Wohlfühltipps',
      'dashboard.insights.item1': 'Dehnen Sie sich im Sonnenaufgang – das stärkt sanft die Gelenke.',
      'dashboard.insights.item2': 'Bringen Sie für jeden Besuch die Lieblingsdecke Ihres Gefährten mit.',
      'dashboard.insights.item3': 'Schreiben Sie nach jedem Spaziergang einen kurzen Dankbarkeitsgruß.',
      'dashboard.insights.cta': 'Individuellen Plan herunterladen',
      'admin.kicker': 'Administrator',
      'admin.title': 'Verwaltungspanel',
      'admin.subtitle': 'Prüfen Sie alle Gästetermine, bestätigen Sie behutsam und halten Sie den Ablauf im Fluss.',
      'admin.filter.status': 'Nach Status filtern',
      'admin.filter.statusAll': 'Alle Status',
      'admin.filter.statusPending': 'Wartet auf Bestätigung',
      'admin.filter.statusConfirmed': 'Bestätigt',
      'admin.filter.statusCancelled': 'Storniert',
      'admin.filter.user': 'Nach Gast filtern',
      'admin.filter.userAll': 'Alle Gäste',
      'admin.filter.date': 'Nach Datum filtern',
      'admin.sort.label': 'Sortieren nach',
      'admin.sort.dateAsc': 'Datum – älteste zuerst',
      'admin.sort.dateDesc': 'Datum – neueste zuerst',
      'admin.sort.status': 'Status',
      'admin.sort.guest': 'Gastname',
      'admin.table.title': 'Gästetermine',
      'admin.table.subtitle': 'Bestätigen, verschieben oder stornieren Sie mit sanfter Begleitung.',
      'admin.table.guest': 'Gast',
      'admin.table.guardian': 'Begleitperson',
      'admin.table.contact': 'Kontakt',
      'admin.table.notes': 'Notizen',
      'admin.table.service': 'Leistung',
      'admin.table.datetime': 'Datum & Uhrzeit',
      'admin.table.status': 'Status',
      'admin.table.actions': 'Aktionen',
      'admin.table.showDetails': 'Details anzeigen',
      'admin.table.hideDetails': 'Details verbergen',
      'admin.actions.confirm': 'Bestätigen',
      'admin.actions.pending': 'Als ausstehend markieren',
      'admin.actions.cancel': 'Stornieren',
      'admin.actions.action': 'Aktion',
      'admin.actions.reschedule': 'Verschieben',
      'admin.actions.delete': 'Löschen',
      'admin.actions.deleteConfirm': 'Diesen Termin aus dem Plan entfernen?',
      'admin.table.empty': 'Noch keine Termine.',
      'admin.reschedule.title': 'Termin anpassen',
      'admin.reschedule.subtitle': 'Zeit aktualisieren und bestätigen, sobald der Gast bereit ist.',
      'admin.reschedule.date': 'Neues Datum',
      'admin.reschedule.time': 'Neue Uhrzeit',
      'admin.reschedule.submit': 'Änderungen speichern',
      'admin.reschedule.cancel': 'Abbrechen',
      'clinic.kicker': 'Tierärztliches Zentrum',
      'clinic.title': 'Sanfte Medizin im Licht',
      'clinic.subtitle': 'Das medizinische Flügel von Aura Memoria verbindet moderne Diagnostik mit Spa-Ritualen für einen ruhigen Termin.',
      'clinic.booking.cta': 'Termin buchen',
      'clinic.booking.authCta': 'Zum Buchen anmelden',
      'clinic.learnMore': 'Ärztin kennenlernen',
      'clinic.doctor.name': 'Dr. Elizaveta Serin',
      'clinic.doctor.role': 'Leitende Veterinärtherapeutin',
      'clinic.doctor.bio': 'Die Absolventin des Wiener Veterinärinstituts führt jeden Besuch mit Achtsamkeit, Aromatherapie und individueller integrativer Medizin. Jede Sitzung beginnt mit gemeinsamen Atemritualen, die Mensch und Tier beruhigen.',
      'clinic.doctor.highlight1': 'Zertifiziert in trauerbegleitender Tiermedizin',
      'clinic.doctor.highlight2': 'Erstellt persönliche Kräuterpläne für die Heilung',
      'clinic.doctor.highlight3': 'Moderiert Teekreise in der Dämmerung für sensible Gäste',
      'clinic.doctor.button': 'Termin bei Dr. Serin reservieren',
      'clinic.doctor.loginPrompt': 'Zum Reservieren anmelden',
      'clinic.therapy.title': 'Räume für Heilung',
      'clinic.therapy.copy': 'Von Mondschein-Hydrotherapie bis zu kristallgestützten Diagnosen – jedes Detail ehrt Balance, Duft und Berührung.',
      'clinic.therapy.room': 'Aurora-Behandlungsraum',
      'clinic.therapy.roomCopy': 'Infrarote Wärme, Waldklänge und eine private Terrasse für den Nachsorgetee.',
      'clinic.therapy.lab': 'Biolicht-Labor',
      'clinic.therapy.labCopy': 'Schnelle Diagnostik im sanften, biophilen Licht und handgefertigter Keramik.',
      'clinic.therapy.rest': 'Salon der stillen Erneuerung',
      'clinic.therapy.restCopy': 'Gewichtsdecken, Atemanleitungen und maßgeschneiderte Klanglandschaften.',
      'clinic.booking.title': 'Termin planen',
      'clinic.booking.intro': 'Wählen Sie den passenden Moment. Unsere Betreuer melden sich innerhalb einer Stunde mit warmer Bestätigung.',
      'clinic.booking.date': 'Wunschtermin',
      'clinic.booking.time': 'Wunschzeit',
      'clinic.booking.guardian': 'Name des Begleiters',
      'clinic.booking.guardianPlaceholder': 'Ihr vollständiger Name',
      'clinic.booking.contact': 'Kontakt',
      'clinic.booking.contactPlaceholder': '+49 170 000 00 00',
      'clinic.booking.notes': 'Notizen für Dr. Serin',
      'clinic.booking.notesPlaceholder': 'Besondere Bedürfnisse oder beruhigende Rituale…',
      'clinic.booking.submit': 'Anfrage bestätigen',
      'clinic.booking.close': 'Buchungsfenster schließen',
      'memorial.kicker': 'Gedenkpark',
      'memorial.title': 'Geschichten, getragen von Wind und Licht',
      'memorial.subtitle': 'Wandeln Sie auf salbeigesäumten Pfaden, auf denen jedes Tier mit Musik, Düften und Briefen geehrt wird.',
      'memorial.info.hours': 'Täglich geöffnet für leises Gedenken 07:00 – 23:00 Uhr',
      'memorial.info.ceremony': 'Zeremonien bei Morgengrauen, Mittag und Mondaufgang',
      'memorial.gallery.title': 'Familien des Lichts',
      'memorial.gallery.subtitle': 'Wählen Sie einen Gefährten und betreten Sie seinen Erinnerungsraum.',
      'memorial.luna.name': 'Luna',
      'memorial.luna.caption': 'Tanzendes Schneeherz der Familie Wolkow',
      'memorial.miro.name': 'Miro',
      'memorial.miro.caption': 'Sonnenstrahl-Poet, geliebt von Familie Demir',
      'memorial.aria.name': 'Aria',
      'memorial.aria.caption': 'Himmlische Sängerin des Hauses Schneider',
      'memorial.rituals.title': 'Rituale des Gedenkens',
      'memorial.rituals.copy': 'Hüter bereiten duftende Umschläge vor, entzünden bernsteinfarbene Laternen und führen Familien unter Weiden durch Erzählkreise. Jede Ehrung wird in unserer aurischen Bibliothek bewahrt.',
      'memorial.rituals.item1': 'Blütenpfade im sanften Kerzenschein',
      'memorial.rituals.item2': 'Handgebundene Bücher für geflüsterte Erinnerungen',
      'memorial.rituals.item3': 'Klangbäder mit ihren Lieblingsmelodien',
      'memorial.detail.back': '← Zurück zum Gedenkpark',
      'memorial.luna.title': 'Luna – Hüterin des Nordlichts',
      'memorial.luna.family': 'Familienmitglied der Wolkows',
      'memorial.luna.summary': 'Lunas Pfoten zeichneten Sternbilder in den Schnee. Sie lehrte ihre Familie, die Morgenröte zu jagen, über Stürme zu lachen und sich an Birken zu lehnen.',
      'memorial.luna.storyTitle': 'Momente, die wir bewahren',
      'memorial.luna.story': 'Luna liebte das silberne Glöckchen an ihrem Halsband; jedes Klingen bedeutete ein neues Abenteuer. Gäste begrüßte sie mit einer sanften Pfote und führte sie zur Zedernbank, wo Tee wartete. Ihre letzte Nacht verbrachte sie unter dem Nordlicht, eng umarmt von der Familie.',
      'memorial.luna.quote': '„Sie erinnerte uns daran, dass Loyalität eine warme Laterne im Winter ist.“',
      'memorial.luna.fact1.title': 'Lieblingsduft',
      'memorial.luna.fact1.value': 'Weißer Tee mit Harz',
      'memorial.luna.fact2.title': 'Liebster Ritus',
      'memorial.luna.fact2.value': 'Mitternächtliche Sternenspaziergänge',
      'memorial.luna.fact3.title': 'Worte der Familie',
      'memorial.luna.fact3.value': '„Ihr Heulen war unser Familienchor.“',
      'memorial.luna.galleryTitle': 'Galerie des Glühens',
      'memorial.luna.gallery1': 'Morgendliche Pause vor dem Zedernpfad',
      'memorial.luna.gallery2': 'Familientee am zugefrorenen See',
      'memorial.luna.gallery3': 'Laternenzeremonie zu Ehren ihrer Abenteuer',
      'memorial.miro.title': 'Miro – Poet der Sonnenstrahlen',
      'memorial.miro.family': 'Familienmitglied der Demirs',
      'memorial.miro.summary': 'Miro verfasste stille Gedichte mit langsamen Blinzeln. Er schlief auf dem Klavierdeckel und kündigte das Abendessen mit einem melodischen Triller an.',
      'memorial.miro.storyTitle': 'Momente, die wir bewahren',
      'memorial.miro.story': 'Jeden Nachmittag führte Miro die Familie für fünf Minuten Sonnenstille in den Garten. Er lag gern auf Bilderbüchern und blätterte mit dem Schwanz weiter. Regentage bedeuteten Jazzplatten und einen geteilten Schoß.',
      'memorial.miro.quote': '„Er lehrte uns, dass Geduld heller strahlt als jede Deckenleuchte.“',
      'memorial.miro.fact1.title': 'Lieblingsduft',
      'memorial.miro.fact1.value': 'Orangenblüten-Tinte',
      'memorial.miro.fact2.title': 'Liebster Ritus',
      'memorial.miro.fact2.value': 'Geschichten am Fensterplatz',
      'memorial.miro.fact3.title': 'Worte der Familie',
      'memorial.miro.fact3.value': '„Sein Schnurren malte unser Zuhause in Sonnenlicht.“',
      'memorial.miro.galleryTitle': 'Galerie sanfter Verse',
      'memorial.miro.gallery1': 'Sonnenaufgang im Atelierfenster',
      'memorial.miro.gallery2': 'Laternen aus seinen Haikus',
      'memorial.miro.gallery3': 'Leseecke am Abend mit warmem Tee',
      'memorial.aria.title': 'Aria – Hüterin des Himmelslieds',
      'memorial.aria.family': 'Familienmitglied der Schneiders',
      'memorial.aria.summary': 'Aria begrüßte das Morgenlicht mit Melodien, die den Kirchenglocken glichen. Sie saß bei Frühstücken auf den Schultern und flüsterte jeden Abend Wiegenlieder.',
      'memorial.aria.storyTitle': 'Momente, die wir bewahren',
      'memorial.aria.story': 'Ihre Lieder führten die Atemmeditationen der Familie. Aria beherrschte Verse in vier Sprachen und verwob sie in die Morgenserenaden. Sie drückte ihre Stirn an die der jüngsten Geschwister und summte, bis der Tag Mut fasste.',
      'memorial.aria.quote': '„Sie verwandelte jede Sorge in eine Melodie der Hoffnung.“',
      'memorial.aria.fact1.title': 'Lieblingsduft',
      'memorial.aria.fact1.value': 'Zitrusblüten im Morgengrauen',
      'memorial.aria.fact2.title': 'Liebster Ritus',
      'memorial.aria.fact2.value': 'Abendlicher Sternenduett',
      'memorial.aria.fact3.title': 'Worte der Familie',
      'memorial.aria.fact3.value': '„Ihr Chor hielt unsere Familie zusammen.“',
      'memorial.aria.galleryTitle': 'Galerie der Melodien',
      'memorial.aria.gallery1': 'Morgenprobe im botanischen Atrium',
      'memorial.aria.gallery2': 'Familie lauscht ihrer Abend-Arie',
      'memorial.aria.gallery3': 'Laternenzug, der ihr letztes Lied spiegelt',
      'toast.register.success': 'Konto erstellt – willkommen bei Aura Memoria.',
      'toast.register.loginExists': 'Dieser Login wird bereits verwendet.',
      'toast.register.loginShort': 'Der Login muss mindestens 3 Zeichen lang sein.',
      'toast.register.mismatch': 'Die Passwörter stimmen nicht überein – bitte erneut versuchen.',
      'toast.login.success': 'Schön, dass Sie wieder da sind. Ihre Erinnerungen warten.',
      'toast.login.error': 'Diese Kombination aus Login und Passwort wurde nicht gefunden.',
      'toast.logout.success': 'Sie haben sich abgemeldet. Unsere Laterne wartet auf Ihre Rückkehr.',
      'toast.contact.success': 'Nachricht warm gesendet. Wir melden uns zeitnah.',
      'toast.booking.success': 'Ihre Terminanfrage ist eingegangen. Eine Bestätigung folgt bald.',
      'toast.booking.userOnly': 'Bitte melden Sie sich mit einem Gästekonto an, um Termine zu buchen.',
      'toast.appointment.updated': 'Termin sorgsam aktualisiert.',
      'toast.appointment.deleted': 'Termin entfernt.',
      'toast.appointment.confirmed': 'Termin bestätigt.',
      'toast.appointment.pending': 'Termin als wartend markiert.',
      'toast.appointment.cancelled': 'Termin storniert.',
      'toast.auth.required': 'Bitte melden Sie sich an, um fortzufahren.',
      'toast.auth.adminOnly': 'Administratorzugang erforderlich.',
    },
  };

  let currentLanguage = 'en';
  let currentDictionary = translations.en;
  let currentUser = null;
  let hasDashboardWarning = false;
  let hasAdminWarning = false;

  const titleKeyByPage = {
    home: 'meta.homeTitle',
    login: 'meta.loginTitle',
    register: 'meta.registerTitle',
    dashboard: 'meta.dashboardTitle',
    clinic: 'meta.clinicTitle',
    memorial: 'meta.memorialTitle',
    about: 'meta.aboutTitle',
    'memorial-luna': 'meta.memorialLunaTitle',
    'memorial-miro': 'meta.memorialMiroTitle',
    'memorial-aria': 'meta.memorialAriaTitle',
  };

  const toastStack = (() => {
    const stack = document.createElement('div');
    stack.className = 'toast-stack';
    stack.setAttribute('aria-live', 'polite');
    stack.setAttribute('aria-atomic', 'true');
    document.body.appendChild(stack);
    return stack;
  })();

  const showToast = (key, replacements = {}) => {
    const template = (currentDictionary && currentDictionary[key]) || translations.en[key] || key;
    let message = template;
    Object.entries(replacements).forEach(([token, value]) => {
      message = message.replace(new RegExp(`{${token}}`, 'g'), value);
    });

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastStack.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3400);
  };

  const createId = () => {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const normalizeLogin = (value) => (value || '').toString().trim().toLowerCase();

  const isMobileMenuOpen = () => mobileMenu && mobileMenu.classList.contains('is-visible');

  const showMobileMenuOverlay = () => {
    if (!mobileMenuOverlay) {
      return;
    }
    if (mobileMenuOverlayHideTimeout) {
      clearTimeout(mobileMenuOverlayHideTimeout);
      mobileMenuOverlayHideTimeout = null;
    }
    mobileMenuOverlay.hidden = false;
    requestAnimationFrame(() => {
      mobileMenuOverlay.classList.add('is-visible');
    });
  };

  const hideMobileMenuOverlay = () => {
    if (!mobileMenuOverlay) {
      return;
    }
    mobileMenuOverlay.classList.remove('is-visible');
    if (mobileMenuOverlayHideTimeout) {
      clearTimeout(mobileMenuOverlayHideTimeout);
    }
    mobileMenuOverlayHideTimeout = window.setTimeout(() => {
      if (!mobileMenuOverlay.classList.contains('is-visible')) {
        mobileMenuOverlay.hidden = true;
      }
      mobileMenuOverlayHideTimeout = null;
    }, 240);
  };

  const focusableMenuSelectors =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const getMobileMenuFocusable = () => {
    if (!mobileMenu) return [];
    return Array.from(mobileMenu.querySelectorAll(focusableMenuSelectors)).filter((el) =>
      el.offsetParent !== null && !el.hasAttribute('hidden') && !el.closest('[hidden]')
    );
  };

  const applyCloseMobileMenu = ({ returnFocus = false } = {}) => {
    if (!mobileMenu) return;
    if (mobileMenuHideTimeout) {
      clearTimeout(mobileMenuHideTimeout);
      mobileMenuHideTimeout = null;
    }
    mobileMenu.classList.remove('is-visible');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hideMobileMenuOverlay();
    document.body.classList.remove('has-open-mobile-menu');
    if (mobileMenuToggle) {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    mobileMenuHideTimeout = window.setTimeout(() => {
      if (mobileMenu && !mobileMenu.classList.contains('is-visible')) {
        mobileMenu.hidden = true;
      }
      mobileMenuHideTimeout = null;
    }, 260);
    if (returnFocus && mobileMenuToggle) {
      mobileMenuToggle.focus();
    }
  };

  const openMobileMenu = () => {
    if (!mobileMenu) return;
    if (mobileMenuHideTimeout) {
      clearTimeout(mobileMenuHideTimeout);
      mobileMenuHideTimeout = null;
    }
    mobileMenu.hidden = false;
    mobileMenu.setAttribute('aria-hidden', 'false');
    showMobileMenuOverlay();
    document.body.classList.add('has-open-mobile-menu');
    mobileMenuShouldReturnFocus = false;
    if (!mobileMenuHistoryActive && window.history?.pushState) {
      try {
        window.history.pushState({ auraMobileMenu: true }, '', window.location.href);
        mobileMenuHistoryActive = true;
      } catch (error) {
        mobileMenuHistoryActive = false;
      }
    }
    requestAnimationFrame(() => {
      mobileMenu.classList.add('is-visible');
      const focusTarget = mobileMenuInitialFocus || getMobileMenuFocusable()[0];
      if (focusTarget) {
        focusTarget.focus();
      }
    });
    if (mobileMenuToggle) {
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }
  };

  const closeMobileMenu = ({
    returnFocus = false,
    triggeredByHistory = false,
    manageHistory = true,
  } = {}) => {
    if (!mobileMenu) return;
    if (manageHistory && mobileMenuHistoryActive && !triggeredByHistory && window.history?.pushState) {
      mobileMenuShouldReturnFocus = mobileMenuShouldReturnFocus || returnFocus;
      window.history.back();
      return;
    }
    applyCloseMobileMenu({ returnFocus: returnFocus || mobileMenuShouldReturnFocus });
    mobileMenuHistoryActive = false;
    mobileMenuShouldReturnFocus = false;
  };

  const toggleMobileMenu = () => {
    if (!mobileMenu) return;
    if (isMobileMenuOpen()) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileMenu) {
    mobileMenu.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') {
        return;
      }
      const focusable = getMobileMenuFocusable();
      if (!focusable.length) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  const mobileMenuCloseElements = mobileMenuOverlay
    ? [...mobileMenuCloseButtons, mobileMenuOverlay]
    : mobileMenuCloseButtons;

  mobileMenuCloseElements.forEach((button) => {
    button.addEventListener('click', () => {
      const shouldReturnFocus =
        button.classList.contains('mobile-menu__close') || button.classList.contains('mobile-menu__overlay');
      closeMobileMenu({ returnFocus: shouldReturnFocus });
    });
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu({ manageHistory: false });
    });
  });

  if (mobileMenuDesktopMedia) {
    mobileMenuDesktopMedia.addEventListener('change', (event) => {
      if (event.matches) {
        closeMobileMenu({ manageHistory: false });
        if (mobileMenu) {
          mobileMenu.hidden = true;
          mobileMenu.classList.remove('is-visible');
        }
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMobileMenuOpen()) {
      closeMobileMenu({ returnFocus: true });
    }
  });

  window.addEventListener('popstate', (event) => {
    if (isMobileMenuOpen()) {
      closeMobileMenu({ returnFocus: true, triggeredByHistory: true });
    } else if (event.state && event.state.auraMobileMenu) {
      mobileMenuHistoryActive = false;
      mobileMenuShouldReturnFocus = false;
    }
  });

  const migrateAppointment = (appointment = {}, fallbackService = 'clinic') => {
    if (!appointment) {
      return {
        id: createId(),
        serviceType: fallbackService,
        date: '',
        time: '',
        status: STATUS_PENDING,
        guardian: '',
        contact: '',
        notes: '',
        createdAt: new Date().toISOString(),
      };
    }

    return {
      id: appointment.id || createId(),
      serviceType: appointment.serviceType || fallbackService,
      date: appointment.date || '',
      time: appointment.time || '',
      status: appointment.status || STATUS_PENDING,
      guardian: appointment.guardian || appointment.name || '',
      contact: appointment.contact || appointment.phone || '',
      notes: appointment.notes || '',
      createdAt: appointment.createdAt || new Date().toISOString(),
    };
  };

  const migrateUser = (user) => {
    if (!user) return null;
    const trimmedLogin = user.login ? user.login.toString().trim() : '';
    const fallbackName = user.name ? user.name.toString().trim() : '';
    const [firstName = '', ...restName] = (user.firstName ? user.firstName : fallbackName).split(' ');
    const lastName = user.lastName ? user.lastName : restName.join(' ').trim();
    const appointments = Array.isArray(user.appointments)
      ? user.appointments.map((appointment) => migrateAppointment(appointment, appointment?.serviceType || 'clinic'))
      : user.upcomingVisit
      ? [
          migrateAppointment(
            {
              ...user.upcomingVisit,
              status: STATUS_PENDING,
            },
            'clinic'
          ),
        ]
      : [];

    return {
      id: user.id || createId(),
      login: trimmedLogin || (user.email ? user.email.toString().trim() : ''),
      firstName: user.firstName ? user.firstName.toString().trim() : firstName.trim(),
      lastName: lastName,
      password: user.password || '',
      createdAt: user.createdAt || new Date().toISOString(),
      appointments,
      preferences: {
        teaRitual: user.preferences?.teaRitual || null,
        favoriteDoctor: user.preferences?.favoriteDoctor || null,
      },
    };
  };

  const loadUsers = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      return stored.map((entry) => migrateUser(entry)).filter(Boolean);
    } catch (error) {
      console.warn('Failed to parse saved users', error);
      return [];
    }
  };

  const saveUsers = (users) => {
    const sanitized = users.map((user) => {
      if (!user) return null;
      const { role, ...rest } = user;
      return rest;
    }).filter(Boolean);
    localStorage.setItem(USERS_KEY, JSON.stringify(sanitized));
  };

  const findUser = (login) => {
    const normalized = normalizeLogin(login);
    return loadUsers().find((user) => normalizeLogin(user.login) === normalized) || null;
  };

  const updateStoredUser = (login, updater) => {
    const users = loadUsers();
    const normalized = normalizeLogin(login);
    const index = users.findIndex((user) => normalizeLogin(user.login) === normalized);
    if (index === -1) {
      return null;
    }
    const draft = {
      ...users[index],
      appointments: Array.isArray(users[index].appointments)
        ? users[index].appointments.map((appointment) => ({ ...appointment }))
        : [],
      preferences: {
        ...users[index].preferences,
      },
    };
    const nextUser = updater ? updater(draft) || draft : draft;
    users[index] = nextUser;
    saveUsers(users);
    if (currentUser && currentUser.role === 'user' && normalizeLogin(currentUser.login) === normalized) {
      currentUser = { ...nextUser, role: 'user' };
    }
    return nextUser;
  };

  const getCurrentSession = () => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (!stored) return null;
      if (stored.startsWith('{')) {
        return JSON.parse(stored);
      }
      return {
        login: stored,
        role: 'user',
      };
    } catch (error) {
      console.warn('Failed to parse current user session', error);
      return null;
    }
  };

  const setCurrentSession = (session) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(session));
  };

  const clearCurrentSession = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const refreshCurrentUser = () => {
    const session = getCurrentSession();
    if (!session) {
      currentUser = null;
      return currentUser;
    }

    if (session.role === 'admin') {
      currentUser = {
        role: 'admin',
        login: ADMIN_LOGIN,
        firstName: 'Administrator',
        lastName: '',
      };
      return currentUser;
    }

    const storedUser = findUser(session.login);
    if (!storedUser) {
      clearCurrentSession();
      currentUser = null;
      return currentUser;
    }

    currentUser = { ...storedUser, role: 'user' };
    return currentUser;
  };

  const updateAuthUI = () => {
    const isSignedIn = Boolean(currentUser);
    authElements.forEach((element) => {
      const targetState = element.dataset.authVisible;
      const shouldShow = (targetState === 'signed-in' && isSignedIn) || (targetState === 'signed-out' && !isSignedIn);
      element.toggleAttribute('hidden', !shouldShow);
    });
    roleElements.forEach((element) => {
      const requiredRole = element.dataset.roleVisible;
      const shouldShowRole = isSignedIn && requiredRole && currentUser?.role === requiredRole;
      element.toggleAttribute('hidden', !shouldShowRole);
    });
    document.body.classList.toggle('is-authenticated', isSignedIn);
    document.body.classList.toggle('is-admin', currentUser?.role === 'admin');
  };

  const formatDateForDisplay = (value) => {
    if (!value) return '';
    try {
      const formatter = new Intl.DateTimeFormat(currentLanguage || 'en', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      return formatter.format(new Date(value));
    } catch (error) {
      return value;
    }
  };

  const formatDateTimeForDisplay = (dateValue, timeValue) => {
    if (!dateValue || !timeValue) return '';
    try {
      const date = new Date(`${dateValue}T${timeValue}`);
      const formatter = new Intl.DateTimeFormat(currentLanguage || 'en', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return formatter.format(date);
    } catch (error) {
      return `${dateValue} ${timeValue}`;
    }
  };

  const getTranslation = (key) => {
    if (currentDictionary && Object.prototype.hasOwnProperty.call(currentDictionary, key)) {
      return currentDictionary[key];
    }
    if (translations.en && Object.prototype.hasOwnProperty.call(translations.en, key)) {
      return translations.en[key];
    }
    return key;
  };

  const getUserDisplayName = (user) => {
    if (!user) return '';
    const parts = [user.firstName, user.lastName].map((part) => (part || '').toString().trim()).filter(Boolean);
    if (parts.length) {
      return parts.join(' ');
    }
    if (user.login) {
      return user.login;
    }
    return getTranslation('dashboard.profile.title');
  };

  const getAppointmentStatusLabel = (status) => getTranslation(`appointments.status.${status}`);

  const getAppointmentServiceLabel = (service) => getTranslation(`appointments.service.${service}`);

  const getStatusClass = (status) => {
    switch (status) {
      case STATUS_CONFIRMED:
        return 'status-badge status-badge--confirmed';
      case STATUS_CANCELLED:
        return 'status-badge status-badge--cancelled';
      case STATUS_PENDING:
      default:
        return 'status-badge status-badge--pending';
    }
  };

  const getAppointmentDateValue = (appointment) => {
    if (!appointment || !appointment.date || !appointment.time) return Number.POSITIVE_INFINITY;
    const value = new Date(`${appointment.date}T${appointment.time}`);
    const timestamp = value.getTime();
    return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
  };

  const smoothScrollToTop = () => {
    const start = window.scrollY || document.documentElement.scrollTop || 0;
    if (start === 0) return;
    const duration = 320;
    const startTime = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const next = Math.round(start * (1 - eased));
      window.scrollTo(0, next);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const pickNextAppointment = (appointments = []) => {
    const upcoming = appointments
      .filter((appointment) => appointment && appointment.status !== STATUS_CANCELLED)
      .filter((appointment) => appointment.date && appointment.time)
      .map((appointment) => ({
        ...appointment,
        __sortValue: getAppointmentDateValue(appointment),
      }))
      .filter((appointment) => Number.isFinite(appointment.__sortValue));
    if (!upcoming.length) return null;
    upcoming.sort((a, b) => a.__sortValue - b.__sortValue);
    return upcoming[0];
  };

  const renderUserAppointments = () => {
    if (!appointmentsList) return;
    const wrapper = appointmentsList;
    const existingItems = wrapper.querySelectorAll('[data-appointment-id]');
    existingItems.forEach((node) => node.remove());

    const appointments = currentUser?.role === 'user' ? currentUser?.appointments || [] : [];

    if (!appointments.length) {
      if (appointmentsEmptyState) {
        appointmentsEmptyState.hidden = false;
      }
      return;
    }

    if (appointmentsEmptyState) {
      appointmentsEmptyState.hidden = true;
    }

    appointments
      .slice()
      .sort((a, b) => getAppointmentDateValue(a) - getAppointmentDateValue(b))
      .forEach((appointment) => {
        const form = document.createElement('form');
        form.className = 'appointment-item';
        form.dataset.appointmentId = appointment.id;

        const header = document.createElement('div');
        header.className = 'appointment-item__header';

        const info = document.createElement('div');
        const service = document.createElement('p');
        service.className = 'appointment-item__service';
        service.textContent = getAppointmentServiceLabel(appointment.serviceType || 'clinic');
        const datetime = document.createElement('p');
        datetime.className = 'appointment-item__datetime';
        datetime.textContent = formatDateTimeForDisplay(appointment.date, appointment.time);
        info.append(service, datetime);

        const status = document.createElement('span');
        status.className = getStatusClass(appointment.status || STATUS_PENDING);
        status.dataset.statusBadge = 'true';
        status.textContent = getAppointmentStatusLabel(appointment.status || STATUS_PENDING);

        header.append(info, status);

        const fields = document.createElement('div');
        fields.className = 'appointment-item__fields';

        const dateLabel = document.createElement('label');
        const dateCaption = document.createElement('span');
        dateCaption.textContent = getTranslation('dashboard.appointments.editDate');
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.name = 'date';
        dateInput.required = true;
        dateInput.value = appointment.date || '';
        dateLabel.append(dateCaption, dateInput);

        const timeLabel = document.createElement('label');
        const timeCaption = document.createElement('span');
        timeCaption.textContent = getTranslation('dashboard.appointments.editTime');
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.name = 'time';
        timeInput.required = true;
        timeInput.value = appointment.time || '';
        timeLabel.append(timeCaption, timeInput);

        fields.append(dateLabel, timeLabel);

        const actions = document.createElement('div');
        actions.className = 'appointment-item__actions';

        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn--ghost';
        saveButton.type = 'submit';
        saveButton.textContent = getTranslation('dashboard.appointments.save');

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn--danger';
        deleteButton.type = 'button';
        deleteButton.dataset.appointmentDelete = 'true';
        deleteButton.textContent = getTranslation('dashboard.appointments.delete');

        actions.append(saveButton, deleteButton);

        form.append(header, fields, actions);
        wrapper.append(form);
      });
  };

  const getAllAppointments = () => {
    const users = loadUsers();
    return users.flatMap((user) =>
      (user.appointments || []).map((appointment) => ({
        user,
        appointment,
        login: user.login,
        normalizedLogin: normalizeLogin(user.login),
      }))
    );
  };

  const updateDetailsToggle = (row, expanded) => {
    const toggle = row.querySelector('[data-admin-toggle-details]');
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = getTranslation(expanded ? 'admin.table.hideDetails' : 'admin.table.showDetails');
    }
  };

  const syncAdminDetails = () => {
    if (!adminTableBody) return;
    adminTableBody.querySelectorAll('tr[data-admin-row]').forEach((row) => {
      const manual = row.dataset.detailsManual === 'true';
      if (!compactAdminMedia.matches) {
        row.classList.add('is-expanded');
        row.dataset.detailsManual = 'false';
        updateDetailsToggle(row, true);
        return;
      }
      if (!manual) {
        row.classList.remove('is-expanded');
        updateDetailsToggle(row, false);
      }
    });
  };

  const closeAdminActionMenu = () => {
    if (!openAdminActionMenu) return;
    const { menu, trigger } = openAdminActionMenu;
    if (menu) {
      menu.classList.remove('is-visible');
      menu.hidden = true;
    }
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
    }
    openAdminActionMenu = null;
  };

  const openAdminActionMenuFor = (trigger, menu) => {
    if (!menu || !trigger) return;
    if (openAdminActionMenu && openAdminActionMenu.menu === menu) {
      closeAdminActionMenu();
      return;
    }
    closeAdminActionMenu();
    menu.hidden = false;
    requestAnimationFrame(() => {
      menu.classList.add('is-visible');
    });
    trigger.setAttribute('aria-expanded', 'true');
    trigger.classList.add('is-open');
    openAdminActionMenu = { menu, trigger };
  };

  const openAdminRescheduleModal = (appointment) => {
    if (!adminRescheduleModal || !adminRescheduleForm) return;
    const dateField = adminRescheduleForm.querySelector('input[name="date"]');
    const timeField = adminRescheduleForm.querySelector('input[name="time"]');
    if (dateField) {
      dateField.value = appointment?.date || '';
    }
    if (timeField) {
      timeField.value = appointment?.time || '';
    }
    adminRescheduleModal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      adminRescheduleModal.classList.add('is-open');
    });
    syncModalState();
    const focusTarget = dateField || adminRescheduleForm.querySelector('input, button');
    if (focusTarget) {
      setTimeout(() => focusTarget.focus(), 50);
    }
  };

  const closeAdminRescheduleModal = () => {
    if (!adminRescheduleModal) return;
    adminRescheduleModal.classList.remove('is-open');
    adminRescheduleModal.setAttribute('hidden', '');
    if (adminRescheduleForm) {
      adminRescheduleForm.reset();
    }
    adminRescheduleState = {
      appointmentId: null,
      userLogin: null,
    };
    syncModalState();
  };

  const hydrateAdminPanel = () => {
    if (page !== 'admin') return;
    if (!currentUser || currentUser.role !== 'admin') {
      return;
    }

    const appointments = getAllAppointments();

    if (adminFilterUser) {
      const selectedValue = adminFilterUser.value || 'all';
      const uniqueUsers = Array.from(
        new Map(
          loadUsers().map((user) => [normalizeLogin(user.login), user])
        ).values()
      );
      const fragment = document.createDocumentFragment();
      const allOption = document.createElement('option');
      allOption.value = 'all';
      allOption.textContent = getTranslation('admin.filter.userAll');
      fragment.append(allOption);
      uniqueUsers
        .sort((a, b) => getUserDisplayName(a).localeCompare(getUserDisplayName(b)))
        .forEach((user) => {
          const option = document.createElement('option');
          option.value = normalizeLogin(user.login);
          option.textContent = getUserDisplayName(user);
          fragment.append(option);
        });
      adminFilterUser.innerHTML = '';
      adminFilterUser.append(fragment);
      adminFilterUser.value = selectedValue;
      if (!adminFilterUser.value) {
        adminFilterUser.value = 'all';
      }
    }

    const statusFilter = adminFilterStatus ? adminFilterStatus.value : 'all';
    const userFilter = adminFilterUser ? adminFilterUser.value : 'all';
    const dateFilter = adminFilterDate ? adminFilterDate.value : '';
    const sortMode = adminSort ? adminSort.value : 'dateAsc';

    const statusRank = {
      [STATUS_PENDING]: 0,
      [STATUS_CONFIRMED]: 1,
      [STATUS_CANCELLED]: 2,
    };

    const filtered = appointments
      .filter(({ appointment }) => (statusFilter === 'all' ? true : appointment.status === statusFilter))
      .filter(({ normalizedLogin }) => (userFilter === 'all' ? true : normalizedLogin === userFilter))
      .filter(({ appointment }) => (dateFilter ? appointment.date === dateFilter : true))
      .map((entry) => ({
        ...entry,
        sortValue: getAppointmentDateValue(entry.appointment),
      }));

    filtered.sort((a, b) => {
      switch (sortMode) {
        case 'dateDesc':
          return b.sortValue - a.sortValue;
        case 'status':
          return (statusRank[a.appointment.status] || 0) - (statusRank[b.appointment.status] || 0);
        case 'guest':
          return getUserDisplayName(a.user).localeCompare(getUserDisplayName(b.user));
        case 'dateAsc':
        default:
          return a.sortValue - b.sortValue;
      }
    });

    if (adminTableBody) {
      closeAdminActionMenu();
      adminTableBody.querySelectorAll('[data-admin-row]').forEach((row) => row.remove());

      const fallback = (value) => {
        const raw = (value || '').toString().trim();
        return raw.length ? raw : '—';
      };

      filtered.forEach(({ user, appointment }) => {
        const row = document.createElement('tr');
        row.dataset.adminRow = 'true';
        row.dataset.appointmentId = appointment.id;
        row.dataset.userLogin = normalizeLogin(user.login);
        row.dataset.detailsManual = 'false';
        row.className = 'admin-table__row';

        const guestCell = document.createElement('td');
        guestCell.dataset.label = getTranslation('admin.table.guest');
        guestCell.className = 'admin-table__cell admin-table__cell--guest';
        const guestName = document.createElement('div');
        guestName.className = 'admin-table__guest';
        guestName.textContent = getUserDisplayName(user);
        const guestLogin = document.createElement('div');
        guestLogin.className = 'admin-table__guest-login';
        guestLogin.textContent = `@${user.login}`;
        guestCell.append(guestName, guestLogin);

        const guardianCell = document.createElement('td');
        guardianCell.dataset.label = getTranslation('admin.table.guardian');
        guardianCell.className = 'admin-table__cell';
        guardianCell.textContent = fallback(appointment.guardian);

        const contactCell = document.createElement('td');
        contactCell.dataset.label = getTranslation('admin.table.contact');
        contactCell.className = 'admin-table__cell admin-table__cell--secondary';
        const contactValue = fallback(appointment.contact);
        contactCell.textContent = contactValue;
        contactCell.title = contactValue !== '—' ? contactValue : '';

        const notesCell = document.createElement('td');
        notesCell.dataset.label = getTranslation('admin.table.notes');
        notesCell.className = 'admin-table__cell admin-table__cell--secondary';
        const notesValue = fallback(appointment.notes);
        notesCell.textContent = notesValue;
        notesCell.title = notesValue !== '—' ? notesValue : '';

        const serviceCell = document.createElement('td');
        serviceCell.dataset.label = getTranslation('admin.table.service');
        serviceCell.className = 'admin-table__cell';
        serviceCell.textContent = getAppointmentServiceLabel(appointment.serviceType || 'clinic');

        const datetimeCell = document.createElement('td');
        datetimeCell.dataset.label = getTranslation('admin.table.datetime');
        datetimeCell.className = 'admin-table__cell admin-table__cell--datetime';
        const dateLine = document.createElement('div');
        dateLine.className = 'admin-table__date';
        dateLine.textContent = fallback(appointment.date);
        const timeLine = document.createElement('div');
        timeLine.className = 'admin-table__time';
        timeLine.textContent = fallback(appointment.time);
        datetimeCell.append(dateLine, timeLine);

        const statusCell = document.createElement('td');
        statusCell.dataset.label = getTranslation('admin.table.status');
        statusCell.className = 'admin-table__cell';
        const statusChip = document.createElement('span');
        statusChip.className = getStatusClass(appointment.status || STATUS_PENDING);
        statusChip.textContent = getAppointmentStatusLabel(appointment.status || STATUS_PENDING);
        statusCell.append(statusChip);

        const actionsCell = document.createElement('td');
        actionsCell.dataset.label = getTranslation('admin.table.actions');
        actionsCell.className = 'admin-table__cell admin-table__cell--actions';

        const actionsWrapper = document.createElement('div');
        actionsWrapper.className = 'admin-actions';
        actionsWrapper.dataset.adminActions = appointment.id;

        const actionToggle = document.createElement('button');
        actionToggle.type = 'button';
        actionToggle.className = 'admin-actions__trigger';
        actionToggle.dataset.adminActionToggle = appointment.id;
        actionToggle.setAttribute('aria-haspopup', 'true');
        actionToggle.setAttribute('aria-expanded', 'false');
        actionToggle.textContent = getTranslation('admin.actions.action');
        const actionChevron = document.createElement('span');
        actionChevron.className = 'admin-actions__chevron';
        actionChevron.setAttribute('aria-hidden', 'true');
        actionToggle.append(actionChevron);

        const actionMenu = document.createElement('div');
        actionMenu.className = 'admin-actions__menu';
        actionMenu.dataset.adminActionMenu = appointment.id;
        actionMenu.hidden = true;
        actionMenu.setAttribute('role', 'menu');

        const appendMenuItem = (action, labelKey, extraClass) => {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'admin-actions__item';
          if (extraClass) {
            item.classList.add(extraClass);
          }
          item.dataset.adminAction = action;
          item.setAttribute('role', 'menuitem');
          item.textContent = getTranslation(labelKey);
          actionMenu.append(item);
        };

        appendMenuItem('confirm', 'admin.actions.confirm');
        appendMenuItem('reschedule', 'admin.actions.reschedule');
        appendMenuItem('cancel', 'admin.actions.cancel');
        appendMenuItem('delete', 'admin.actions.delete', 'admin-actions__item--danger');

        actionsWrapper.append(actionToggle, actionMenu);

        const detailsToggle = document.createElement('button');
        detailsToggle.type = 'button';
        detailsToggle.className = 'admin-table__details-toggle';
        detailsToggle.dataset.adminToggleDetails = appointment.id;

        actionsCell.append(actionsWrapper, detailsToggle);

        row.append(
          guestCell,
          guardianCell,
          contactCell,
          notesCell,
          serviceCell,
          datetimeCell,
          statusCell,
          actionsCell
        );

        adminTableBody.append(row);

        if (!compactAdminMedia.matches) {
          row.classList.add('is-expanded');
        }
        updateDetailsToggle(row, !compactAdminMedia.matches);
      });

      if (adminEmptyRow) {
        adminEmptyRow.toggleAttribute('hidden', filtered.length > 0);
      }

      syncAdminDetails();
    }
  };

  const enforceAdminAccess = () => {
    if (page !== 'admin') return;
    if (currentUser?.role === 'admin') {
      hasAdminWarning = false;
      return;
    }
    if (hasAdminWarning) return;
    hasAdminWarning = true;
    showToast('toast.auth.adminOnly');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 900);
  };

  const hydrateDashboard = () => {
    if (page !== 'dashboard') return;
    if (!currentUser) {
      if (!hasDashboardWarning) {
        hasDashboardWarning = true;
        showToast('toast.auth.required');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 900);
      }
      return;
    }

    if (currentUser.role !== 'user') {
      if (!hasDashboardWarning) {
        hasDashboardWarning = true;
        showToast('toast.auth.adminOnly');
        setTimeout(() => {
          window.location.href = currentUser.role === 'admin' ? 'admin.html' : 'login.html';
        }, 900);
      }
      return;
    }

    const greeting = document.querySelector('[data-user-greeting]');
    const firstSlot = document.querySelector('[data-user-first]');
    const lastSlot = document.querySelector('[data-user-last]');
    const memberSinceSlot = document.querySelector('[data-member-since]');
    const nextVisitSlot = document.querySelector('[data-next-visit]');

    const displayName = getUserDisplayName(currentUser);
    if (greeting && currentDictionary['dashboard.greeting']) {
      greeting.textContent = currentDictionary['dashboard.greeting'].replace('{name}', displayName);
    }

    if (firstSlot) {
      firstSlot.textContent = (currentUser.firstName || '—').toString();
    }

    if (lastSlot) {
      lastSlot.textContent = (currentUser.lastName || '—').toString();
    }

    if (memberSinceSlot) {
      memberSinceSlot.textContent = formatDateForDisplay(currentUser.createdAt || new Date().toISOString());
    }

    if (nextVisitSlot) {
      const upcoming = pickNextAppointment(currentUser.appointments || []);
      if (upcoming) {
        const formatted = formatDateTimeForDisplay(upcoming.date, upcoming.time);
        const statusLabel = getAppointmentStatusLabel(upcoming.status || STATUS_PENDING);
        nextVisitSlot.textContent = `${formatted} — ${statusLabel}`;
      } else if (currentDictionary['dashboard.nextVisit.none']) {
        nextVisitSlot.textContent = currentDictionary['dashboard.nextVisit.none'];
      }
    }

    renderUserAppointments();
  };

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('theme-dark', isDark);
    document.body.classList.toggle('theme-light', !isDark);
    document.documentElement.classList.toggle('dark', isDark);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }
  };

  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    });
  }

  const applyLanguageStrings = (lang) => {
    const dictionary = translations[lang] || translations.en;
    const titleKey = titleKeyByPage[page];
    if (titleKey && dictionary[titleKey]) {
      document.title = dictionary[titleKey];
    }

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (!key) return;
      const translation = dictionary[key];
      if (typeof translation === 'undefined') return;
      if (element.dataset.i18nHtml === 'true') {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (!key) return;
      const translation = dictionary[key];
      if (typeof translation === 'undefined') return;
      element.setAttribute('placeholder', translation);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
      const key = element.dataset.i18nAlt;
      if (!key) return;
      const translation = dictionary[key];
      if (typeof translation === 'undefined') return;
      element.setAttribute('alt', translation);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (!key) return;
      const translation = dictionary[key];
      if (typeof translation === 'undefined') return;
      element.setAttribute('aria-label', translation);
    });
  };

  const updateLanguageLabel = (lang) => {
    if (!languageMenu || !languageToggle) return;
    const activeOption = languageOptions.find((option) => option.dataset.lang === lang);
    const label = activeOption?.dataset.label || lang.toUpperCase();
    if (languageLabel) {
      languageLabel.textContent = label;
    }
    languageToggle.setAttribute('data-active-lang', lang);
  };

  const setLanguage = (lang) => {
    const resolvedLang = translations[lang] ? lang : 'en';
    currentLanguage = resolvedLang;
    currentDictionary = translations[resolvedLang] || translations.en;
    document.documentElement.lang = resolvedLang;
    languageOptions.forEach((option) => {
      const isActive = option.dataset.lang === resolvedLang;
      option.classList.toggle('is-active', isActive);
      option.setAttribute('aria-checked', String(isActive));
    });
    updateLanguageLabel(resolvedLang);
    applyLanguageStrings(resolvedLang);
    hydrateDashboard();
    renderUserAppointments();
    hydrateAdminPanel();
    return resolvedLang;
  };

  refreshCurrentUser();

  const savedLang = localStorage.getItem(LANG_KEY) || 'en';
  const initialLang = setLanguage(savedLang);
  if (initialLang !== savedLang) {
    localStorage.setItem(LANG_KEY, initialLang);
  }

  updateAuthUI();
  hydrateDashboard();
  hydrateAdminPanel();
  enforceAdminAccess();

  if (languageList) {
    languageList.hidden = true;
    languageList.classList.remove('is-visible');
  }
  if (languageToggle) {
    languageToggle.setAttribute('aria-expanded', 'false');
  }

  let isLanguageMenuOpen = false;

  const closeLanguageMenu = () => {
    if (!languageMenu) return;
    if (!isLanguageMenuOpen) return;
    isLanguageMenuOpen = false;
    languageMenu.classList.remove('is-open');
    languageMenu.classList.add('is-closing');
    if (languageToggle) {
      languageToggle.setAttribute('aria-expanded', 'false');
    }
    if (languageList) {
      languageList.classList.remove('is-visible');
      setTimeout(() => {
        if (!isLanguageMenuOpen && languageList) {
          languageList.hidden = true;
        }
        languageMenu.classList.remove('is-closing');
      }, 220);
    } else {
      languageMenu.classList.remove('is-closing');
    }
  };

  const openLanguageMenu = () => {
    if (!languageMenu) return;
    isLanguageMenuOpen = true;
    languageMenu.classList.add('is-open');
    languageMenu.classList.remove('is-closing');
    if (languageToggle) {
      languageToggle.setAttribute('aria-expanded', 'true');
    }
    if (languageList) {
      languageList.hidden = false;
      requestAnimationFrame(() => {
        languageList.classList.add('is-visible');
      });
    }
  };

  if (languageMenu && languageToggle) {
    languageToggle.addEventListener('click', () => {
      if (isLanguageMenuOpen) {
        closeLanguageMenu();
      } else {
        openLanguageMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!isLanguageMenuOpen) return;
      if (!languageMenu.contains(event.target)) {
        closeLanguageMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!isLanguageMenuOpen) return;
      if (event.key === 'Escape') {
        closeLanguageMenu();
        languageToggle.focus();
      }
    });

    languageMenu.addEventListener('focusout', (event) => {
      if (!isLanguageMenuOpen) return;
      if (!event.relatedTarget || !languageMenu.contains(event.relatedTarget)) {
        closeLanguageMenu();
      }
    });
  }

  languageOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const lang = option.dataset.lang;
      const resolvedLang = setLanguage(lang);
      localStorage.setItem(LANG_KEY, resolvedLang);
      closeLanguageMenu();
      if (languageToggle) {
        languageToggle.focus();
      }
    });
  });

  const syncModalState = () => {
    const bookingOpen = bookingModal && !bookingModal.hasAttribute('hidden');
    const appointmentsOpen = appointmentsModal && !appointmentsModal.hasAttribute('hidden');
    const adminRescheduleOpen = adminRescheduleModal && !adminRescheduleModal.hasAttribute('hidden');
    if (bookingOpen || appointmentsOpen || adminRescheduleOpen) {
      document.body.classList.add('has-modal');
    } else {
      document.body.classList.remove('has-modal');
    }
  };

  const openBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.removeAttribute('hidden');
    syncModalState();
    const focusTarget = bookingModal.querySelector('input, textarea, button');
    if (focusTarget) {
      setTimeout(() => focusTarget.focus(), 50);
    }
  };

  const closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.setAttribute('hidden', '');
    syncModalState();
  };

  const openAppointmentsModal = () => {
    if (!appointmentsModal) return;
    appointmentsModal.removeAttribute('hidden');
    renderUserAppointments();
    syncModalState();
    const focusTarget = appointmentsModal.querySelector('input, textarea, button');
    if (focusTarget) {
      setTimeout(() => focusTarget.focus(), 50);
    }
  };

  const closeAppointmentsModal = () => {
    if (!appointmentsModal) return;
    appointmentsModal.setAttribute('hidden', '');
    syncModalState();
  };

  const requireAuth = () => {
    if (currentUser?.role === 'user') return true;
    if (currentUser?.role === 'admin') {
      showToast('toast.booking.userOnly');
      return false;
    }
    showToast('toast.auth.required');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 700);
    return false;
  };

  const handleBookingRequest = () => {
    if (!requireAuth()) return;
    openBookingModal();
  };

  bookingOpeners.forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.dataset.bookingService || button.dataset.service || button.dataset.bookingType;
      activeBookingService = service || activeBookingService || 'clinic';
      handleBookingRequest();
    });
  });

  bookingClosers.forEach((button) => {
    button.addEventListener('click', closeBookingModal);
  });

  if (appointmentsCloseButtons.length) {
    appointmentsCloseButtons.forEach((button) => {
      button.addEventListener('click', closeAppointmentsModal);
    });
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (event) => {
      if (event.target === bookingModal) {
        closeBookingModal();
      }
    });
  }

  if (appointmentsModal) {
    appointmentsModal.addEventListener('click', (event) => {
      if (event.target === appointmentsModal) {
        closeAppointmentsModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (bookingModal && !bookingModal.hasAttribute('hidden')) {
        closeBookingModal();
      }
      if (appointmentsModal && !appointmentsModal.hasAttribute('hidden')) {
        closeAppointmentsModal();
      }
      if (adminRescheduleModal && !adminRescheduleModal.hasAttribute('hidden')) {
        closeAdminRescheduleModal();
      }
      closeAdminActionMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!openAdminActionMenu) return;
    const { menu, trigger } = openAdminActionMenu;
    if (!menu) return;
    const target = event.target;
    if (menu.contains(target)) return;
    if (trigger && (target === trigger || trigger.contains(target))) return;
    closeAdminActionMenu();
  });

  if (manageAppointmentsBtn) {
    manageAppointmentsBtn.addEventListener('click', () => {
      if (!requireAuth()) return;
      openAppointmentsModal();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!requireAuth()) return;
      const formData = new FormData(bookingForm);
      const date = (formData.get('date') || '').toString();
      const time = (formData.get('time') || '').toString();
      const guardian = (formData.get('guardian') || '').toString();
      const contact = (formData.get('contact') || '').toString();
      const notes = (formData.get('notes') || '').toString();
      if (!date || !time) {
        return;
      }

      const loginKey = currentUser?.login || getCurrentSession()?.login;
      if (!loginKey) {
        return;
      }

      const newAppointment = {
        id: createId(),
        serviceType: activeBookingService || (page === 'clinic' ? 'clinic' : 'memorial'),
        date,
        time,
        guardian,
        contact,
        notes,
        status: STATUS_PENDING,
        createdAt: new Date().toISOString(),
      };

      updateStoredUser(loginKey, (user) => {
        const appointments = Array.isArray(user.appointments) ? [...user.appointments] : [];
        appointments.push(newAppointment);
        return {
          ...user,
          appointments,
        };
      });

      bookingForm.reset();
      closeBookingModal();
      hydrateDashboard();
      hydrateAdminPanel();
      showToast('toast.booking.success');
    });
  }

  if (appointmentsList) {
    appointmentsList.addEventListener('submit', (event) => {
      const form = event.target.closest('[data-appointment-id]');
      if (!form) return;
      event.preventDefault();
      if (!requireAuth()) return;
      const appointmentId = form.dataset.appointmentId;
      const dateInput = form.querySelector('input[name="date"]');
      const timeInput = form.querySelector('input[name="time"]');
      const date = dateInput?.value || '';
      const time = timeInput?.value || '';
      if (!appointmentId || !date || !time) {
        return;
      }
      const loginKey = currentUser?.login || getCurrentSession()?.login;
      if (!loginKey) return;

      updateStoredUser(loginKey, (user) => {
        const appointments = Array.isArray(user.appointments) ? [...user.appointments] : [];
        const index = appointments.findIndex((appointment) => appointment.id === appointmentId);
        if (index === -1) {
          return user;
        }
        appointments[index] = {
          ...appointments[index],
          date,
          time,
          status: STATUS_PENDING,
        };
        return {
          ...user,
          appointments,
        };
      });

      hydrateDashboard();
      hydrateAdminPanel();
      showToast('toast.appointment.updated');
    });

    appointmentsList.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('[data-appointment-delete]');
      if (!deleteButton) return;
      event.preventDefault();
      if (!requireAuth()) return;
      const form = deleteButton.closest('[data-appointment-id]');
      const appointmentId = form?.dataset.appointmentId;
      if (!appointmentId) return;
      const confirmation = window.confirm(getTranslation('dashboard.appointments.deleteConfirm'));
      if (!confirmation) return;
      const loginKey = currentUser?.login || getCurrentSession()?.login;
      if (!loginKey) return;

      updateStoredUser(loginKey, (user) => {
        const appointments = Array.isArray(user.appointments) ? user.appointments.filter((appointment) => appointment.id !== appointmentId) : [];
        return {
          ...user,
          appointments,
        };
      });

      hydrateDashboard();
      hydrateAdminPanel();
      showToast('toast.appointment.deleted');
    });
  }

  if (adminFilterStatus) {
    adminFilterStatus.addEventListener('change', hydrateAdminPanel);
  }

  if (adminFilterUser) {
    adminFilterUser.addEventListener('change', hydrateAdminPanel);
  }

  if (adminFilterDate) {
    adminFilterDate.addEventListener('change', hydrateAdminPanel);
  }

  if (adminSort) {
    adminSort.addEventListener('change', hydrateAdminPanel);
  }

  if (compactAdminMedia) {
    compactAdminMedia.addEventListener('change', syncAdminDetails);
  }

  if (adminTableBody) {
    adminTableBody.addEventListener('click', (event) => {
      const detailsButton = event.target.closest('[data-admin-toggle-details]');
      if (detailsButton) {
        const row = detailsButton.closest('tr[data-admin-row]');
        if (!row) return;
        const expanded = row.classList.toggle('is-expanded');
        row.dataset.detailsManual = 'true';
        updateDetailsToggle(row, expanded);
        event.preventDefault();
        return;
      }

      const toggleButton = event.target.closest('[data-admin-action-toggle]');
      if (toggleButton) {
        const row = toggleButton.closest('tr[data-admin-row]');
        if (!row) return;
        const menu = row.querySelector(`[data-admin-action-menu="${toggleButton.dataset.adminActionToggle}"]`);
        openAdminActionMenuFor(toggleButton, menu);
        event.preventDefault();
        return;
      }

      const button = event.target.closest('[data-admin-action]');
      if (!button) return;
      event.preventDefault();
      if (currentUser?.role !== 'admin') {
        showToast('toast.auth.adminOnly');
        return;
      }

      const action = button.dataset.adminAction;
      const row = button.closest('tr[data-admin-row]');
      if (!row) return;
      const appointmentId = row.dataset.appointmentId;
      const userLogin = row.dataset.userLogin;
      if (!appointmentId || !userLogin) return;

      closeAdminActionMenu();

      const commitUpdate = (updater, toastKey) => {
        const updated = updateStoredUser(userLogin, updater);
        if (!updated) return;
        hydrateDashboard();
        renderUserAppointments();
        hydrateAdminPanel();
        if (toastKey) {
          showToast(toastKey);
        }
      };

      if (action === 'reschedule') {
        adminRescheduleState = {
          appointmentId,
          userLogin,
        };
        const user = findUser(userLogin);
        const appointment = user?.appointments?.find((entry) => entry.id === appointmentId) || null;
        openAdminRescheduleModal(appointment);
        return;
      }

      if (action === 'confirm') {
        commitUpdate((user) => {
          const appointments = Array.isArray(user.appointments) ? [...user.appointments] : [];
          const index = appointments.findIndex((appointment) => appointment.id === appointmentId);
          if (index === -1) return user;
          appointments[index] = {
            ...appointments[index],
            status: STATUS_CONFIRMED,
          };
          return {
            ...user,
            appointments,
          };
        }, 'toast.appointment.confirmed');
        return;
      }

      if (action === 'pending') {
        commitUpdate((user) => {
          const appointments = Array.isArray(user.appointments) ? [...user.appointments] : [];
          const index = appointments.findIndex((appointment) => appointment.id === appointmentId);
          if (index === -1) return user;
          appointments[index] = {
            ...appointments[index],
            status: STATUS_PENDING,
          };
          return {
            ...user,
            appointments,
          };
        }, 'toast.appointment.pending');
        return;
      }

      if (action === 'cancel') {
        commitUpdate((user) => {
          const appointments = Array.isArray(user.appointments) ? [...user.appointments] : [];
          const index = appointments.findIndex((appointment) => appointment.id === appointmentId);
          if (index === -1) return user;
          appointments[index] = {
            ...appointments[index],
            status: STATUS_CANCELLED,
          };
          return {
            ...user,
            appointments,
          };
        }, 'toast.appointment.cancelled');
        return;
      }

      if (action === 'delete') {
        const confirmation = window.confirm(getTranslation('admin.actions.deleteConfirm'));
        if (!confirmation) return;
        commitUpdate((user) => {
          const appointments = Array.isArray(user.appointments)
            ? user.appointments.filter((appointment) => appointment.id !== appointmentId)
            : [];
          return {
            ...user,
            appointments,
          };
        }, 'toast.appointment.deleted');
      }
    });
  }

  if (adminRescheduleCloseButtons.length) {
    adminRescheduleCloseButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        closeAdminRescheduleModal();
      });
    });
  }

  if (adminRescheduleBackdrop) {
    adminRescheduleBackdrop.addEventListener('click', closeAdminRescheduleModal);
  }

  if (adminRescheduleForm) {
    adminRescheduleForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (currentUser?.role !== 'admin') {
        showToast('toast.auth.adminOnly');
        return;
      }
      const { appointmentId, userLogin } = adminRescheduleState;
      if (!appointmentId || !userLogin) {
        closeAdminRescheduleModal();
        return;
      }
      const formData = new FormData(adminRescheduleForm);
      const date = (formData.get('date') || '').toString();
      const time = (formData.get('time') || '').toString();
      if (!date || !time) {
        return;
      }
      const updated = updateStoredUser(userLogin, (user) => {
        const appointments = Array.isArray(user.appointments) ? [...user.appointments] : [];
        const index = appointments.findIndex((appointment) => appointment.id === appointmentId);
        if (index === -1) {
          return user;
        }
        appointments[index] = {
          ...appointments[index],
          date,
          time,
          status: STATUS_PENDING,
        };
        return {
          ...user,
          appointments,
        };
      });

      if (!updated) {
        return;
      }

      hydrateDashboard();
      renderUserAppointments();
      hydrateAdminPanel();
      showToast('toast.appointment.updated');
      closeAdminRescheduleModal();
    });
  }

  if (backToTopLinks.length) {
    backToTopLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        smoothScrollToTop();
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactForm.reset();
      showToast('toast.contact.success');
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(registerForm);
      const firstName = (data.get('firstName') || '').toString().trim();
      const lastName = (data.get('lastName') || '').toString().trim();
      const loginValue = (data.get('login') || '').toString().trim();
      const normalizedLogin = normalizeLogin(loginValue);
      const password = (data.get('password') || '').toString();
      const confirm = (data.get('confirm') || '').toString();

      if (password !== confirm) {
        showToast('toast.register.mismatch');
        return;
      }

      if (!normalizedLogin || normalizedLogin.length < 3) {
        showToast('toast.register.loginShort');
        return;
      }

      if (findUser(normalizedLogin)) {
        showToast('toast.register.loginExists');
        return;
      }

      const newUser = {
        id: createId(),
        login: loginValue,
        firstName,
        lastName,
        password,
        createdAt: new Date().toISOString(),
        appointments: [],
        preferences: {
          teaRitual: null,
          favoriteDoctor: null,
        },
      };

      const users = loadUsers();
      users.push(newUser);
      saveUsers(users);
      setCurrentSession({ login: newUser.login, role: 'user' });
      currentUser = { ...newUser, role: 'user' };
      hasDashboardWarning = false;
      hasAdminWarning = false;
      registerForm.reset();
      updateAuthUI();
      hydrateDashboard();
      hydrateAdminPanel();
      showToast('toast.register.success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 900);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(loginForm);
      const loginValue = (data.get('login') || '').toString().trim();
      const normalizedLogin = normalizeLogin(loginValue);
      const password = (data.get('password') || '').toString();

      if (normalizedLogin === normalizeLogin(ADMIN_LOGIN) && password === ADMIN_PASSWORD) {
        setCurrentSession({ login: ADMIN_LOGIN, role: 'admin' });
        currentUser = {
          role: 'admin',
          login: ADMIN_LOGIN,
          firstName: 'Administrator',
          lastName: '',
        };
        hasDashboardWarning = false;
        hasAdminWarning = false;
        updateAuthUI();
        hydrateAdminPanel();
        showToast('toast.login.success');
        loginForm.reset();
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 900);
        return;
      }

      const user = findUser(normalizedLogin);
      if (!user || user.password !== password) {
        showToast('toast.login.error');
        return;
      }

      setCurrentSession({ login: user.login, role: 'user' });
      currentUser = { ...user, role: 'user' };
      hasDashboardWarning = false;
      hasAdminWarning = false;
      updateAuthUI();
      hydrateDashboard();
      hydrateAdminPanel();
      showToast('toast.login.success');
      loginForm.reset();
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 900);
    });
  }

  logoutButtons.forEach((button) => {
    button.addEventListener('click', () => {
      clearCurrentSession();
      currentUser = null;
      hasDashboardWarning = false;
      hasAdminWarning = false;
      updateAuthUI();
      hydrateDashboard();
      hydrateAdminPanel();
      renderUserAppointments();
      closeAppointmentsModal();
      closeBookingModal();
      showToast('toast.logout.success');
      if (page === 'dashboard' || page === 'admin') {
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 600);
      }
    });
  });

  if (parallaxItems.length) {
    let parallaxFrame = null;

    const runParallax = () => {
      parallaxItems.forEach((item) => {
        const speed = parseFloat(item.dataset.parallaxSpeed || '0.25');
        const rect = item.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const translate = -(offset * speed);
        item.style.setProperty('--parallax-offset', `${translate}px`);
      });
    };

    const queueParallax = () => {
      if (parallaxFrame !== null) return;
      parallaxFrame = window.requestAnimationFrame(() => {
        runParallax();
        parallaxFrame = null;
      });
    };

    parallaxItems.forEach((item) => {
      item.style.willChange = 'transform';
      item.style.setProperty('--parallax-offset', '0px');
    });

    queueParallax();
    window.addEventListener('scroll', queueParallax, { passive: true });
    window.addEventListener('resize', queueParallax);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
});
