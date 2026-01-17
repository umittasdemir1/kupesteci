// Default content structure - used as fallback when localStorage is empty
import { Slide, Service, Project } from '../types';

export interface AboutContent {
    image: string;
    badge: string;
    title: string;
    paragraphs: string[];
    features: {
        title: string;
        description: string;
    }[];
}

export interface FooterContent {
    slogan: string;
    phone: string;
    email: string;
    address: string;
}

export interface SiteContent {
    hero: Slide[];
    about: AboutContent;
    services: Service[];
    projects: Project[];
    footer: FooterContent;
}

export const DEFAULT_CONTENT: SiteContent = {
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
    services: [
        {
            id: 'merdiven',
            title: 'Ahşap Merdiven Uygulamaları',
            description: 'Statik hesapları hassasiyetle yapılmış, gıcırtısız ve ömürlük masif merdiven projeleri.',
            image: '/assets/staircase1.png'
        },
        {
            id: 'kupeste',
            title: 'Ahşap Küpeşte ve Korkuluklar',
            description: 'Eski usul torna ve el oyması detaylarla işlenen, güvenliği estetikle birleştiren tasarımlar.',
            image: '/assets/staircase3.png'
        },
        {
            id: 'marangozluk',
            title: 'Özel Ölçü Basamaklar',
            description: 'Her projeye özel üretilen, mekanın mimari dokusuna uyumlu ahşap basamak çözümleri.',
            image: '/assets/staircase2.png'
        }
    ],
    projects: [
        { id: 1, title: 'Klasik Galeri Merdiveni', category: 'Merdiven', image: '/assets/staircase1.png' },
        { id: 2, title: 'Modern Camlı Tasarım', category: 'Merdiven', image: '/assets/staircase2.png' },
        { id: 3, title: 'Klasik Köşk Uygulaması', category: 'Merdiven', image: '/assets/staircase3.png' },
        { id: 4, title: 'Dikey Çıtalı Tasarım', category: 'Küpeşte', image: '/assets/staircase2.png' },
        { id: 5, title: 'Modern Döner Merdiven', category: 'Merdiven', image: '/assets/staircase1.png' },
        { id: 6, title: 'Aksesuarlı Basamaklar', category: 'Merdiven', image: '/assets/staircase3.png' }
    ],
    footer: {
        slogan: '100 yılı aşkın tecrübe ile ahşabın doğal sıcaklığını ve ustalığın zarafetini yaşam alanlarınıza taşıyoruz.',
        phone: '+90 532 214 90 87',
        email: 'muzafferdemir@kupestecimerdiven.com',
        address: 'Gürece, Cumhuriyet Cd. No: 323/A, 48400 Bodrum/Muğla'
    }
};
