
import { Service, Slide, Project } from './types';

// Kullanıcının paylaştığı ve talep ettiği görsellerin birebir karşılıkları
const IMAGES = {
  staircase1: '/assets/staircase1.png',
  staircase2: '/assets/staircase2.png',
  staircase3: '/assets/staircase3.png',
};

export const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: IMAGES.staircase1,
    title: 'Geleneksel Merdiven Sanatı',
    subtitle: 'Mekanınıza değer katan, asırlık tecrübeyle işlenmiş masif ahşap merdiven tasarımları.'
  },
  {
    id: 2,
    image: IMAGES.staircase2,
    title: 'Modern Ahşap Çözümleri',
    subtitle: 'Mimari dokunuşlarla şekillenen, çağdaş ve sıcak yaşam alanları için merdiven tasarımları.'
  },
  {
    id: 3,
    image: IMAGES.staircase3,
    title: 'Lüks Uygulamalar',
    subtitle: 'Atölyemizde her bir basamağı milimetrik hassasiyet ve tutkuyla üretiyoruz.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'merdiven',
    title: 'Ahşap Merdiven Uygulamaları',
    description: 'Statik hesapları hassasiyetle yapılmış, gıcırtısız ve ömürlük masif merdiven projeleri.',
    image: IMAGES.staircase1
  },
  {
    id: 'kupeste',
    title: 'Ahşap Küpeşte ve Korkuluklar',
    description: 'Eski usul torna ve el oyması detaylarla işlenen, güvenliği estetikle birleştiren tasarımlar.',
    image: IMAGES.staircase3
  },
  {
    id: 'marangozluk',
    title: 'Özel Ölçü Basamaklar',
    description: 'Her projeye özel üretilen, mekanın mimari dokusuna uyumlu ahşap basamak çözümleri.',
    image: IMAGES.staircase2
  }
];

export const PROJECTS: Project[] = [
  { id: 1, title: 'Klasik Galeri Merdiveni', category: 'Merdiven', image: IMAGES.staircase1 },
  { id: 2, title: 'Modern Camlı Tasarım', category: 'Merdiven', image: IMAGES.staircase2 },
  { id: 3, title: 'Klasik Köşk Uygulaması', category: 'Merdiven', image: IMAGES.staircase3 },
  { id: 4, title: 'Dikey Çıtalı Tasarım', category: 'Küpeşte', image: IMAGES.staircase2 },
  { id: 5, title: 'Modern Döner Merdiven', category: 'Merdiven', image: IMAGES.staircase1 },
  { id: 6, title: 'Aksesuarlı Basamaklar', category: 'Merdiven', image: IMAGES.staircase3 },
];
