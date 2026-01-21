
import { Service, Slide, Project } from './types';

// Kullan─▒c─▒n─▒n payla┼şt─▒─ş─▒ ve talep etti─şi g├Ârsellerin birebir kar┼ş─▒l─▒klar─▒
const IMAGES = {
  staircase1: '/assets/staircase1.png',
  staircase2: '/assets/staircase2.png',
  staircase3: '/assets/staircase3.png',
};

export const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: IMAGES.staircase1,
    title: 'Geleneksel Merdiven Sanat─▒',
    subtitle: 'Mekan─▒n─▒za de─şer katan, as─▒rl─▒k tecr├╝beyle i┼şlenmi┼ş masif ah┼şap merdiven tasar─▒mlar─▒.'
  },
  {
    id: 2,
    image: IMAGES.staircase2,
    title: 'Modern Ah┼şap ├ç├Âz├╝mleri',
    subtitle: 'Mimari dokunu┼şlarla ┼şekillenen, ├ğa─şda┼ş ve s─▒cak ya┼şam alanlar─▒ i├ğin merdiven tasar─▒mlar─▒.'
  },
  {
    id: 3,
    image: IMAGES.staircase3,
    title: 'L├╝ks Uygulamalar',
    subtitle: 'At├Âlyemizde her bir basama─ş─▒ milimetrik hassasiyet ve tutkuyla ├╝retiyoruz.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'merdiven',
    title: 'Ah┼şap Merdiven Uygulamalar─▒',
    description: 'Statik hesaplar─▒ hassasiyetle yap─▒lm─▒┼ş, g─▒c─▒rt─▒s─▒z ve ├Âm├╝rl├╝k masif merdiven projeleri.',
    image: IMAGES.staircase1
  },
  {
    id: 'kupeste',
    title: 'Ah┼şap K├╝pe┼şte ve Korkuluklar',
    description: 'Eski usul torna ve el oymas─▒ detaylarla i┼şlenen, g├╝venli─şi estetikle birle┼ştiren tasar─▒mlar.',
    image: IMAGES.staircase3
  },
  {
    id: 'marangozluk',
    title: '├ûzel ├ûl├ğ├╝ Basamaklar',
    description: 'Her projeye ├Âzel ├╝retilen, mekan─▒n mimari dokusuna uyumlu ah┼şap basamak ├ğ├Âz├╝mleri.',
    image: IMAGES.staircase2
  }
];

export const PROJECTS: Project[] = [
  { id: 1, title: 'Klasik Galeri Merdiveni', category: 'Merdiven', image: IMAGES.staircase1 },
  { id: 2, title: 'Modern Caml─▒ Tasar─▒m', category: 'Merdiven', image: IMAGES.staircase2 },
  { id: 3, title: 'Klasik K├Â┼şk Uygulamas─▒', category: 'Merdiven', image: IMAGES.staircase3 },
  { id: 4, title: 'Dikey ├ç─▒tal─▒ Tasar─▒m', category: 'K├╝pe┼şte', image: IMAGES.staircase2 },
  { id: 5, title: 'Modern D├Âner Merdiven', category: 'Merdiven', image: IMAGES.staircase1 },
  { id: 6, title: 'Aksesuarl─▒ Basamaklar', category: 'Merdiven', image: IMAGES.staircase3 },
];
