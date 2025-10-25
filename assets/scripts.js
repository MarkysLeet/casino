document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
  const THEME_KEY = 'aura-memoria-theme';
  const LANG_KEY = 'aura-memoria-lang';
  const themeToggle = document.getElementById('theme-toggle');
  const languageMenu = document.querySelector('[data-language-menu]');
  const languageToggle = languageMenu ? languageMenu.querySelector('.language-menu__toggle') : null;
  const languageList = languageMenu ? languageMenu.querySelector('.language-menu__list') : null;
  const languageLabel = languageMenu ? languageMenu.querySelector('[data-language-label]') : null;
  const languageOptions = languageMenu ? Array.from(languageMenu.querySelectorAll('.language-menu__option')) : [];
  const revealElements = document.querySelectorAll('.reveal');
  const page = document.body.dataset.page || 'home';

  const translations = {
    en: {
      'meta.homeTitle': 'Aura Memoria — Where care and memory live side by side',
      'meta.loginTitle': 'Aura Memoria — Sign in',
      'meta.registerTitle': 'Aura Memoria — Create account',
      'header.tagline': 'Care • Memory • Nature',
      'header.login': 'Sign in',
      'header.register': 'Create account',
      'header.languageToggle': 'Select language',
      'header.home': 'Home',
      'nav.services': 'Services',
      'nav.memory': 'Memory',
      'nav.park': 'Park',
      'nav.contact': 'Contact',
      'hero.title': 'Where care and memory live side by side.',
      'hero.subtitle': 'Aura Memoria unites veterinary care, love, and everlasting remembrance in harmony with nature and light.',
      'hero.primaryCta': 'Book an Appointment',
      'hero.secondaryCta': 'Explore Services',
      'services.kicker': 'Our Essence',
      'services.title': 'A sanctuary for every chapter of life',
      'services.clinic.title': 'Veterinary Center',
      'services.clinic.copy': 'Comprehensive care guided by compassion, modern diagnostics, and a calm environment for every visit.',
      'services.memorial.title': 'Memorial Park',
      'services.memorial.copy': 'Personalized remembrance ceremonies, cremation services, and timeless tributes embraced by serene gardens.',
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
      'login.emailLabel': 'Email',
      'login.emailPlaceholder': 'you@example.com',
      'login.passwordLabel': 'Password',
      'login.passwordPlaceholder': 'Enter your password',
      'login.submit': 'Sign in',
      'login.forgot': 'Forgot password',
      'login.switchPrompt': 'Don’t have an account?',
      'login.switchLink': 'Create one',
      'register.title': 'Create your Aura Memoria account',
      'register.subtitle': 'Join our community to book visits, plan memorials, and share stories of cherished companions.',
      'register.nameLabel': 'Full name',
      'register.namePlaceholder': 'Alexei Petrov',
      'register.emailLabel': 'Email',
      'register.emailPlaceholder': 'you@example.com',
      'register.phoneLabel': 'Phone (optional)',
      'register.phonePlaceholder': '+7 999 000 00 00',
      'register.passwordLabel': 'Create password',
      'register.passwordPlaceholder': 'Create a password',
      'register.confirmLabel': 'Confirm password',
      'register.confirmPlaceholder': 'Repeat password',
      'register.submit': 'Create account',
      'register.switchPrompt': 'Already have an account?',
      'register.switchLink': 'Sign in',
    },
    ru: {
      'meta.homeTitle': 'Aura Memoria — Где забота и память живут рядом',
      'meta.loginTitle': 'Aura Memoria — Вход',
      'meta.registerTitle': 'Aura Memoria — Регистрация',
      'header.tagline': 'Забота • Память • Природа',
      'header.login': 'Войти',
      'header.register': 'Создать аккаунт',
      'header.languageToggle': 'Выбрать язык',
      'header.home': 'Главная',
      'nav.services': 'Услуги',
      'nav.memory': 'Память',
      'nav.park': 'Парк',
      'nav.contact': 'Контакты',
      'hero.title': 'Где забота и память живут рядом.',
      'hero.subtitle': 'Aura Memoria объединяет ветеринарную помощь, любовь и вечную память в гармонии с природой и светом.',
      'hero.primaryCta': 'Записаться на приём',
      'hero.secondaryCta': 'Посмотреть услуги',
      'services.kicker': 'Наша сущность',
      'services.title': 'Пространство для каждого этапа жизни',
      'services.clinic.title': 'Ветеринарный центр',
      'services.clinic.copy': 'Комплексная забота с сочувствием, современной диагностикой и спокойной атмосферой каждого визита.',
      'services.memorial.title': 'Мемориальный парк',
      'services.memorial.copy': 'Персональные церемонии прощания, кремация и вечные памятные знаки в объятиях тихих садов.',
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
      'login.emailLabel': 'Электронная почта',
      'login.emailPlaceholder': 'name@example.com',
      'login.passwordLabel': 'Пароль',
      'login.passwordPlaceholder': 'Введите пароль',
      'login.submit': 'Войти',
      'login.forgot': 'Забыли пароль?',
      'login.switchPrompt': 'Нет аккаунта?',
      'login.switchLink': 'Зарегистрироваться',
      'register.title': 'Создайте аккаунт Aura Memoria',
      'register.subtitle': 'Присоединяйтесь, чтобы записываться на приём, планировать церемонии и делиться историями о любимцах.',
      'register.nameLabel': 'Полное имя',
      'register.namePlaceholder': 'Алексей Петров',
      'register.emailLabel': 'Электронная почта',
      'register.emailPlaceholder': 'name@example.com',
      'register.phoneLabel': 'Телефон (необязательно)',
      'register.phonePlaceholder': '+7 999 000 00 00',
      'register.passwordLabel': 'Создайте пароль',
      'register.passwordPlaceholder': 'Придумайте пароль',
      'register.confirmLabel': 'Повторите пароль',
      'register.confirmPlaceholder': 'Введите пароль ещё раз',
      'register.submit': 'Создать аккаунт',
      'register.switchPrompt': 'Уже есть аккаунт?',
      'register.switchLink': 'Войти',
    },
    tr: {
      'meta.homeTitle': 'Aura Memoria — Şefkat ve anı yan yana yaşatıyoruz',
      'meta.loginTitle': 'Aura Memoria — Giriş',
      'meta.registerTitle': 'Aura Memoria — Kayıt',
      'header.tagline': 'Şefkat • Anı • Doğa',
      'header.login': 'Giriş yap',
      'header.register': 'Hesap oluştur',
      'header.languageToggle': 'Dili seçin',
      'header.home': 'Ana sayfa',
      'nav.services': 'Hizmetler',
      'nav.memory': 'Hatıra',
      'nav.park': 'Park',
      'nav.contact': 'İletişim',
      'hero.title': 'Şefkat ve anı yan yana yaşatıyoruz.',
      'hero.subtitle': 'Aura Memoria veteriner bakımı, sevgiyi ve sonsuz hatırayı doğa ve ışıkla uyum içinde bir araya getirir.',
      'hero.primaryCta': 'Randevu al',
      'hero.secondaryCta': 'Hizmetleri keşfet',
      'services.kicker': 'Özümüz',
      'services.title': 'Hayatın her evresi için bir sığınak',
      'services.clinic.title': 'Veteriner Merkezi',
      'services.clinic.copy': 'Her ziyarette şefkat, modern teşhisler ve sakin bir ortamla kapsamlı bakım.',
      'services.memorial.title': 'Anı Parkı',
      'services.memorial.copy': 'Kişiye özel vedalar, kremasyon hizmetleri ve huzurlu bahçelerde zamansız anıtlar.',
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
      'login.emailLabel': 'E-posta',
      'login.emailPlaceholder': 'ornek@example.com',
      'login.passwordLabel': 'Parola',
      'login.passwordPlaceholder': 'Parolanızı girin',
      'login.submit': 'Giriş yap',
      'login.forgot': 'Parolanızı mı unuttunuz?',
      'login.switchPrompt': 'Hesabınız yok mu?',
      'login.switchLink': 'Oluşturun',
      'register.title': 'Aura Memoria hesabınızı oluşturun',
      'register.subtitle': 'Randevu almak, anma törenleri planlamak ve sevgili dostların hikayelerini paylaşmak için aramıza katılın.',
      'register.nameLabel': 'Tam adınız',
      'register.namePlaceholder': 'Ahmet Yılmaz',
      'register.emailLabel': 'E-posta',
      'register.emailPlaceholder': 'ornek@example.com',
      'register.phoneLabel': 'Telefon (isteğe bağlı)',
      'register.phonePlaceholder': '+90 555 000 00 00',
      'register.passwordLabel': 'Parola oluşturun',
      'register.passwordPlaceholder': 'Bir parola oluşturun',
      'register.confirmLabel': 'Parolayı doğrulayın',
      'register.confirmPlaceholder': 'Parolanızı tekrar yazın',
      'register.submit': 'Hesap oluştur',
      'register.switchPrompt': 'Zaten hesabınız var mı?',
      'register.switchLink': 'Giriş yapın',
    },
    de: {
      'meta.homeTitle': 'Aura Memoria – Wo Fürsorge und Erinnerung Seite an Seite leben',
      'meta.loginTitle': 'Aura Memoria – Anmeldung',
      'meta.registerTitle': 'Aura Memoria – Konto erstellen',
      'header.tagline': 'Fürsorge • Erinnerung • Natur',
      'header.login': 'Anmelden',
      'header.register': 'Konto erstellen',
      'header.languageToggle': 'Sprache auswählen',
      'header.home': 'Startseite',
      'nav.services': 'Leistungen',
      'nav.memory': 'Erinnerung',
      'nav.park': 'Park',
      'nav.contact': 'Kontakt',
      'hero.title': 'Wo Fürsorge und Erinnerung Seite an Seite leben.',
      'hero.subtitle': 'Aura Memoria vereint Tiermedizin, Liebe und ewiges Gedenken im Einklang mit Natur und Licht.',
      'hero.primaryCta': 'Termin buchen',
      'hero.secondaryCta': 'Leistungen ansehen',
      'services.kicker': 'Unser Wesen',
      'services.title': 'Ein Refugium für jede Lebensphase',
      'services.clinic.title': 'Tierärztliches Zentrum',
      'services.clinic.copy': 'Umfassende Betreuung mit Mitgefühl, moderner Diagnostik und einer ruhigen Atmosphäre bei jedem Besuch.',
      'services.memorial.title': 'Gedenkpark',
      'services.memorial.copy': 'Individuelle Abschiedszeremonien, Kremationsdienste und zeitlose Erinnerungsorte in sanften Gärten.',
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
      'login.emailLabel': 'E-Mail',
      'login.emailPlaceholder': 'name@example.com',
      'login.passwordLabel': 'Passwort',
      'login.passwordPlaceholder': 'Geben Sie Ihr Passwort ein',
      'login.submit': 'Anmelden',
      'login.forgot': 'Passwort vergessen?',
      'login.switchPrompt': 'Noch kein Konto?',
      'login.switchLink': 'Jetzt erstellen',
      'register.title': 'Erstellen Sie Ihr Aura Memoria Konto',
      'register.subtitle': 'Nehmen Sie teil, um Termine zu buchen, Erinnerungsfeiern zu planen und Geschichten über geliebte Begleiter zu teilen.',
      'register.nameLabel': 'Vollständiger Name',
      'register.namePlaceholder': 'Anna Schneider',
      'register.emailLabel': 'E-Mail',
      'register.emailPlaceholder': 'name@example.com',
      'register.phoneLabel': 'Telefon (optional)',
      'register.phonePlaceholder': '+49 170 000 00 00',
      'register.passwordLabel': 'Passwort erstellen',
      'register.passwordPlaceholder': 'Passwort erstellen',
      'register.confirmLabel': 'Passwort bestätigen',
      'register.confirmPlaceholder': 'Passwort wiederholen',
      'register.submit': 'Konto erstellen',
      'register.switchPrompt': 'Bereits ein Konto?',
      'register.switchLink': 'Anmelden',
    },
  };

  const titleKeyByPage = {
    home: 'meta.homeTitle',
    login: 'meta.loginTitle',
    register: 'meta.registerTitle',
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
    document.documentElement.lang = resolvedLang;
    languageOptions.forEach((option) => {
      const isActive = option.dataset.lang === resolvedLang;
      option.classList.toggle('is-active', isActive);
      option.setAttribute('aria-checked', String(isActive));
    });
    updateLanguageLabel(resolvedLang);
    applyLanguageStrings(resolvedLang);
    return resolvedLang;
  };

  const savedLang = localStorage.getItem(LANG_KEY) || 'en';
  const initialLang = setLanguage(savedLang);
  if (initialLang !== savedLang) {
    localStorage.setItem(LANG_KEY, initialLang);
  }

  if (languageList) {
    languageList.hidden = true;
  }
  if (languageToggle) {
    languageToggle.setAttribute('aria-expanded', 'false');
  }

  let isLanguageMenuOpen = false;

  const closeLanguageMenu = () => {
    if (!languageMenu) return;
    isLanguageMenuOpen = false;
    languageMenu.classList.remove('is-open');
    if (languageToggle) {
      languageToggle.setAttribute('aria-expanded', 'false');
    }
    if (languageList) {
      languageList.hidden = true;
    }
  };

  const openLanguageMenu = () => {
    if (!languageMenu) return;
    isLanguageMenuOpen = true;
    languageMenu.classList.add('is-open');
    if (languageToggle) {
      languageToggle.setAttribute('aria-expanded', 'true');
    }
    if (languageList) {
      languageList.hidden = false;
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
