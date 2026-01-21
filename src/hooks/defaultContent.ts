// Default content structure - used as fallback when localStorage is empty
import { Slide, Service, Project, Reference, BrandingContent, NavigationContent, ServicesSectionContent, GallerySectionContent, FooterSectionContent, AboutContent, FooterContent, WhatsAppContent, SEOContent, SiteContent } from '../types';

export const DEFAULT_CONTENT: SiteContent = {
    // ===== BRANDING =====
    branding: {
        logo: 'KÜPEŞTECİ',
        tagline: "1920'DEN BERİ"
    },
    // ===== NAVIGATION =====
    navigation: {
        home: 'Anasayfa',
        about: 'Hakkımızda',
        services: 'Hizmetler',
        gallery: 'Galeri',
        references: 'Referanslar',
        contact: 'İletişim'
    },
    // ===== SERVICES SECTION =====
    servicesSection: {
        badge: 'Neler Yapıyoruz?',
        title: 'Zanaat ve Dayanıklılık',
        description: 'Hizmet anlatımlarımız el işçiliği, sağlamlık ve uzun ömür vurgusu taşır. Ahşabı sadece işlemekle kalmıyor, mekanın ruhuyla bütünleştiriyoruz.',
        cta: 'Detayları Gör'
    },
    // ===== GALLERY SECTION =====
    gallerySection: {
        title: 'Galeri',
        button: 'Tüm Galeriyi Görüntüle'
    },
    // ===== FOOTER SECTION =====
    footerSection: {
        corporateTitle: 'Kurumsal',
        contactTitle: 'İletişim',
        corporateLinks: ['Hakkımızda', 'Hizmetlerimiz', 'Referanslar']
    },
    // ===== HERO SLIDES =====
    hero: [
        {
            id: 1,
            image: '/assets/staircase1.png',
            title: 'Geleneksel Merdiven Sanatı',
            subtitle: 'Mekanınıza değer katan, asırlık tecrübeyle işlenmiş masif ahşap merdiven tasarımları.'
        },
        {
            id: 2,
            image: '/assets/staircase2.png',
            title: 'Modern Ahşap Çözümleri',
            subtitle: 'Mimari dokunuşlarla şekillenen, çağdaş ve sıcak yaşam alanları için merdiven tasarımları.'
        },
        {
            id: 3,
            image: '/assets/staircase3.png',
            title: 'Lüks Uygulamalar',
            subtitle: 'Atölyemizde her bir basamağı milimetrik hassasiyet ve tutkuyla üretiyoruz.'
        }
    ],
    // ===== ABOUT SECTION =====
    about: {
        image: '/assets/about-ustalik.jpg',
        badge: 'Geleneksel Miras',
        title: "1920'den Bu Yana Ahşapta Ustalık",
        paragraphs: [
            "1920'li yıllarda bu yana ahşapla çalışan firmamız, kuşaktan kuşağa aktarılan marangozluk geleneğini bugünün teknik olanaklarıyla birleştirerek yoluna devam etmektedir.",
            "Bodrum merkezli atölyemizde, Türkiye'nin dört bir yanı için özel ölçülü ahşap merdiven, basamak, küpeşte ve marangozluk uygulamaları üretiyoruz. Her mekanda keyifle kullanabileceğiniz ürünler, sizlerin isteklerine bağlı olarak seçilmiş her türlü ithal ve yerli ahşapla gösterilen, özel işlemlerden geçirilerek atölyemizde üretilmektedir."
        ],
        features: [
            {
                title: 'Özel Ölçü Üretim',
                description: 'Her mekâna uygun, ölçüsüne ve kullanımına göre titizlikle üretilen çözümler.'
            },
            {
                title: 'Türkiye Geneli Hizmet',
                description: "Bodrum'dan başlayarak tüm Türkiye'ye sevkiyat ve montaj."
            }
        ]
    },
    // ===== SERVICES =====
    services: [
        {
            id: 'merdiven',
            title: 'Ahşap Merdiven Uygulamaları',
            description: 'Statik hesapları hassasiyetle yapılmış, gıcırtısız ve ömürlük masif merdiven projeleri.',
            image: '/assets/staircase1.png',
            items: [
                { id: 'm1', type: 'text', value: 'Yüzyılı aşkın süredir ahşaba ruh veriyoruz. Merdivenlerimiz sadece bir geçiş alanı değil, evin en zarif sanat eseridir.' },
                { id: 'm2', type: 'image', value: '/assets/staircase1.png' }
            ]
        },
        {
            id: 'kupeste',
            title: 'Ahşap Küpeşte ve Korkuluklar',
            description: 'Eski usul torna ve el oyması detaylarla işlenen, güvenliği estetikle birleştiren tasarımlar.',
            image: '/assets/staircase3.png',
            items: [
                { id: 'k1', type: 'text', value: 'Ustalıkla işlenmiş ahşap küpeştelerimiz, mekanınıza hem sıcaklık hem de üst düzey güvenlik katar. Geleneksel detaylarla modern estetiği buluşturuyoruz.' },
                { id: 'k2', type: 'image', value: '/assets/staircase3.png' }
            ]
        },
        {
            id: 'marangozluk',
            title: 'Özel Ölçü Basamaklar',
            description: 'Her projeye özel üretilen, mekanın mimari dokusuna uyumlu ahşap basamak çözümleri.',
            image: '/assets/staircase2.png',
            items: [
                { id: 'b1', type: 'text', value: 'Mevcut beton veya metal taşıyıcılarınızın üzerine, istediğiniz ağaç türünden özel ölçü kaplama basamaklar uyguluyoruz.' },
                { id: 'b2', type: 'image', value: '/assets/staircase2.png' }
            ]
        }
    ],
    // ===== PROJECTS (GALLERY) =====
    projects: [
        { id: 1, title: 'Klasik Galeri Merdiveni', category: 'Merdiven', image: '/assets/staircase1.png' },
        { id: 2, title: 'Modern Camlı Tasarım', category: 'Merdiven', image: '/assets/staircase2.png' },
        { id: 3, title: 'Klasik Köşk Uygulaması', category: 'Merdiven', image: '/assets/staircase3.png' },
        { id: 4, title: 'Dikey Çıtalı Tasarım', category: 'Küpeşte', image: '/assets/staircase2.png' },
        { id: 5, title: 'Modern Döner Merdiven', category: 'Merdiven', image: '/assets/staircase1.png' },
        { id: 6, title: 'Aksesuarlı Basamaklar', category: 'Merdiven', image: '/assets/staircase3.png' }
    ],
    // ===== REFERENCES =====
    references: [
        { id: 'r1', name: 'Vogue Hotel Supreme', location: 'Bodrum' },
        { id: 'r2', name: 'Mandarin Oriental', location: 'Bodrum' },
        { id: 'r3', name: 'Rixos Premium Bodrum', location: 'Bodrum' },
        { id: 'r4', name: 'The Bodrum Edition', location: 'Yalıkavak' },
        { id: 'r5', name: 'Kempinski Hotel Barbaros Bay', location: 'Bodrum' },
        { id: 'r6', name: 'Swissôtel Resort Bodrum Beach', location: 'Turgutreis' }
    ],
    // ===== FOOTER CONTACT =====
    footer: {
        slogan: '100 yılı aşkın tecrübe ile ahşabın doğal sıcaklığını ve ustalığın zarafetini yaşam alanlarınıza taşıyoruz.',
        phone: '+90 532 214 90 87',
        email: 'muzafferdemir@kupestecimerdiven.com',
        address: 'Gürece, Cumhuriyet Cd. No: 323/A, 48400 Bodrum/Muğla'
    },
    // ===== WHATSAPP =====
    whatsapp: {
        phone: '905322149087',
        message: 'Merhaba, merdiven ve küpeşte sistemleri hakkında bilgi alabilir miyim?',
        image: '/assets/whatsapp.png',
        isJumping: true,
        isShimmering: true
    },
    // ===== SEO =====
    seo: {
        siteTitle: 'Küpeşteci Merdiven | 1920\'den Günümüze Ahşap Ustalığı',
        siteDescription: 'Bodrum merkezli, 100 yıllık gelenekle el yapımı ahşap küpeşte, merdiven ve tırabzan üretimi. Türkiye geneline hizmet.',
        keywords: 'küpeşte, ahşap merdiven, bodrum merdiven, tırabzan, el yapımı merdiven, ahşap korkuluk, merdiven imalatı',
        ogImage: '/assets/staircase1.png',
        pages: {
            home: {
                title: 'Küpeşteci | 1920\'den Günümüze Ahşapta Ustalık',
                description: 'Bodrum merkezli atölyemizden Türkiye geneline ahşap merdiven, küpeşte ve basamak çözümleri sunuyoruz.'
            },
            about: {
                title: 'Hakkımızda | Küpeşteci Merdiven',
                description: '1920\'den bu yana kuşaktan kuşağa aktarılan marangozluk geleneğiyle ahşap ustalığı.'
            },
            services: {
                title: 'Hizmetlerimiz | Küpeşteci Merdiven',
                description: 'Ahşap merdiven, küpeşte, korkuluk ve özel ölçü basamak üretim hizmetlerimiz.'
            },
            gallery: {
                title: 'Galeri | Küpeşteci Merdiven',
                description: 'Tamamladığımız ahşap merdiven ve küpeşte projelerimizden örnekler.'
            },
            references: {
                title: 'Referanslar | Küpeşteci Merdiven',
                description: 'Mandarin Oriental, Rixos, Kempinski gibi prestijli projelerimiz.'
            },
            contact: {
                title: 'İletişim | Küpeşteci Merdiven',
                description: 'Bodrum atölyemize ulaşın. Projeleriniz için teklif alın.'
            }
        }
    }
};
