import { Car, Review } from './types';

export const GTA_CARS: Car[] = [
  {
    id: 'toreador',
    name: 'Pegassi Toreador',
    arabicName: 'بيغاسي توريادور',
    category: 'مصفحة ومائية (Submersible)',
    price: 5,
    speed: 92,
    armor: 85,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600',
    description: 'A custom, submersible sports car equipped with infinite missile rockets and a booster! Ideal for deep ocean and land combat.',
    arabicDescription: 'سيارة برمائية مصفحة خارقة، مجهزة بصواريخ لا نهائية وتيربو خارق. مثالية للتنقل السريع والمهمات الصعبة.'
  },
  {
    id: 'itali_rsx',
    name: 'Grotti Itali RSX',
    arabicName: 'غروتي إيتالي آر إس إكس',
    category: 'رياضية خارقة (Super)',
    price: 4,
    speed: 98,
    armor: 40,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600',
    description: 'One of the fastest land vehicles in the game. Beautiful aero wing and maximum top speed.',
    arabicDescription: 'واحدة من أسرع السيارات على الأرض في قراند 5. جناح خلفي ذكي انسيابي ومظهر جذاب يعكس الفخامة والقوة.'
  },
  {
    id: 'deluxo',
    name: 'Imponte Deluxo',
    arabicName: 'إمبونتي ديلوكسو',
    category: 'طائرة ومسلحة (Special)',
    price: 5,
    speed: 80,
    armor: 55,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    description: 'Fly around Los Santos with style! Equipped with highly accurate homing missiles.',
    arabicDescription: 'حلق في سماء لوس سانتوس بأسلوب كلاسيكي ساحر! سيارة طائرة كلاسيكية مجهزة بصواريخ ذات دقة متناهية.'
  },
  {
    id: 'oppressor_mk2',
    name: 'Pegassi Oppressor Mk II',
    arabicName: 'الدباب الطائر (اوبريسور 2)',
    category: 'دراجة طائرة (Special)',
    price: 6,
    speed: 95,
    armor: 30,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
    description: 'Hyper-agile flying bike with missiles and countermeasures. The ultimate tool for grinding and movement.',
    arabicDescription: 'الدراجة النفاثة الطائرة الأكثر رعباً وسرعة. مجهزة بصواريخ تتبع وقاذف حراري. السلاح رقم 1 لإنجاز المهمات بسرعة.'
  },
  {
    id: 'kuruma_armored',
    name: 'Karin Kuruma (Armored)',
    arabicName: 'كارين كوروما (المدرعة)',
    category: 'رياضية مصفحة (Sports)',
    price: 3,
    speed: 82,
    armor: 95,
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600',
    description: ' Bulletproof windows and heavily armored chassis. Safe and secure from random gunfire.',
    arabicDescription: 'الدرع الواقي للأزمات. زجاج مصفح ضد الرصاص وهيكل حديدي فولاذي. تجعلك غير قابل للقتل أمام رصاص العصابات في المهمات.'
  },
  {
    id: 'krieger',
    name: 'Benefactor Krieger',
    arabicName: 'بينيفاكتور كريجر',
    category: 'رياضية خارقة (Super)',
    price: 4,
    speed: 97,
    armor: 45,
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=600',
    description: 'Incredible mechanical grip and high speed, making it the favorite for racing tracks in Grand Theft Auto.',
    arabicDescription: 'ثبات ميكانيكي مذهل للأرض وتسارع جبار. اختيار محترفي السباقات الأول في قراند بفضل تماسكها الخارق في المنعطفات.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'أبو أحمد الخالدي',
    rating: 5,
    comment: 'ما شاء الله تبارك الله، طلبت 5 غواصات والمجموع 15 ريال فقط! وخلال ربع ساعة استلمت الفلوس في حسابي سوني 5. ثقة وسرعة ودعم بطل.',
    date: 'منذ يومين',
    psnId: 'Abo_Ahmad_99',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'بندر العتيبي',
    rating: 5,
    comment: 'جربت خدمة شحن السيارات وأخذت الديلوكسو والتوريادور السعر خيالي والأي دي حقي تشحن فيه فوراً. جزاكم الله خير والتعامل عسل.',
    date: 'منذ 3 أيام',
    psnId: 'Bandar_Q8',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'سعد العازمي',
    rating: 4,
    comment: 'أفضل متجر لقراند النسخة المحسنة على PS5، سريع ودقة في الموعد والرجال محترم جداً والتواصل على الواتس سرييييع.',
    date: 'منذ أسبوع',
    psnId: 'Sa3d_kwt',
    verifiedPurchase: true
  }
];
