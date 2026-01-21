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
            title: 'Geleneksel Merdiven Sanat─▒',
            subtitle: 'Mekan─▒n─▒za de─şer katan, as─▒rl─▒k tecr├╝beyle i┼şlenmi┼ş masif ah┼şap merdiven tasar─▒mlar─▒.'
        },
        {
            id: 2,
            image: '/assets/staircase2.png',
            title: 'Modern Ah┼şap ├ç├Âz├╝mleri',
            subtitle: 'Mimari dokunu┼şlarla ┼şekillenen, ├ğa─şda┼ş ve s─▒cak ya┼şam alanlar─▒ i├ğin merdiven tasar─▒mlar─▒.'
        },
        {
            id: 3,
            image: '/assets/staircase3.png',
            title: 'L├╝ks Uygulamalar',
            subtitle: 'At├Âlyemizde her bir basama─ş─▒ milimetrik hassasiyet ve tutkuyla ├╝retiyoruz.'
        }
    ],
    about: {
        image: '/assets/about-ustalik.jpg',
        badge: 'Geleneksel Miras',
        title: "1920'den Bu Yana Ah┼şapta Ustal─▒k",
        paragraphs: [
            "1920'li y─▒llarda bu yana ah┼şapla ├ğal─▒┼şan firmam─▒z, ku┼şaktan ku┼şa─şa aktar─▒lan marangozluk gelene─şini bug├╝n├╝n teknik olanaklar─▒yla birle┼ştirerek yoluna devam etmektedir.",
            "Bodrum merkezli at├Âlyemizde, T├╝rkiye'nin d├Ârt bir yan─▒ i├ğin ├Âzel ├Âl├ğ├╝l├╝ ah┼şap merdiven, basamak, k├╝pe┼şte ve marangozluk uygulamalar─▒ ├╝retiyoruz. Her mekanda keyifle kullanabilece─şiniz ├╝r├╝nler, sizlerin isteklerine ba─şl─▒ olarak se├ğilmi┼ş her t├╝rl├╝ ithal ve yerli ah┼şapla g├Âsterilen, ├Âzel i┼şlemlerden ge├ğirilerek at├Âlyemizde ├╝retilmektedir."
        ],
        features: [
            {
                title: '├ûzel ├ûl├ğ├╝ ├£retim',
                description: 'Her mek├óna uygun, ├Âl├ğ├╝s├╝ne ve kullan─▒m─▒na g├Âre titizlikle ├╝retilen ├ğ├Âz├╝mler.'
            },
            {
                title: 'T├╝rkiye Geneli Hizmet',
                description: "Bodrum'dan ba┼şlayarak t├╝m T├╝rkiye'ye sevkiyat ve montaj."
            }
        ]
    },
    services: [
        {
            id: 'merdiven',
            title: 'Ah┼şap Merdiven Uygulamalar─▒',
            description: 'Statik hesaplar─▒ hassasiyetle yap─▒lm─▒┼ş, g─▒c─▒rt─▒s─▒z ve ├Âm├╝rl├╝k masif merdiven projeleri.',
            image: '/assets/staircase1.png'
        },
        {
            id: 'kupeste',
            title: 'Ah┼şap K├╝pe┼şte ve Korkuluklar',
            description: 'Eski usul torna ve el oymas─▒ detaylarla i┼şlenen, g├╝venli─şi estetikle birle┼ştiren tasar─▒mlar.',
            image: '/assets/staircase3.png'
        },
        {
            id: 'marangozluk',
            title: '├ûzel ├ûl├ğ├╝ Basamaklar',
            description: 'Her projeye ├Âzel ├╝retilen, mekan─▒n mimari dokusuna uyumlu ah┼şap basamak ├ğ├Âz├╝mleri.',
            image: '/assets/staircase2.png'
        }
    ],
    projects: [
        { id: 1, title: 'Klasik Galeri Merdiveni', category: 'Merdiven', image: '/assets/staircase1.png' },
        { id: 2, title: 'Modern Caml─▒ Tasar─▒m', category: 'Merdiven', image: '/assets/staircase2.png' },
        { id: 3, title: 'Klasik K├Â┼şk Uygulamas─▒', category: 'Merdiven', image: '/assets/staircase3.png' },
        { id: 4, title: 'Dikey ├ç─▒tal─▒ Tasar─▒m', category: 'K├╝pe┼şte', image: '/assets/staircase2.png' },
        { id: 5, title: 'Modern D├Âner Merdiven', category: 'Merdiven', image: '/assets/staircase1.png' },
        { id: 6, title: 'Aksesuarl─▒ Basamaklar', category: 'Merdiven', image: '/assets/staircase3.png' }
    ],
    footer: {
        slogan: '100 y─▒l─▒ a┼şk─▒n tecr├╝be ile ah┼şab─▒n do─şal s─▒cakl─▒─ş─▒n─▒ ve ustal─▒─ş─▒n zarafetini ya┼şam alanlar─▒n─▒za ta┼ş─▒yoruz.',
        phone: '+90 532 214 90 87',
        email: 'muzafferdemir@kupestecimerdiven.com',
        address: 'G├╝rece, Cumhuriyet Cd. No: 323/A, 48400 Bodrum/Mu─şla'
    }
};
