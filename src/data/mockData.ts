import { Treatment, Specialist, AddOnItem, ReviewItem, BookingRecord } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1U_I_GUk-KKtStI64lPB4OeR2FVtOO036X1U5KdZvRDB8onlK8nzfe3arvkm-_WvtFosPrlT6bzqtssvOmirYjuuQQ32OeimsoTgGHigpgX-Qx8_Pnz70WgR5zl65VzsKq82YA78E70MCowKen-Tgl-X3rXh3bcig-kiVSgiz5pu-nT2PiWKn82byLQ9zvQ-gU0Ia3qypYturvIYqrUxn0evygIoHWa2FseyNDvLnU4Ih6mUDPAdBdqXxU";

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuARbqGsrz2SuESQkSEO3BFqblaayx3qv2fmnD-fnCzIFrHXp79Sfb5tlx6NPmqiCch8LgCYylV-UbCHkTQrfq7RZ8jcHARr4QMUomZDdBHheem1q8dsVA1N_Q-h_KUhb4y2g1sHu-SCeoGgf2nqaLCybwuvPnXAthgInNfemO0gxy19Zox0Sj2NLGIsfHkK9E9tVUmrNVXTULiw4z8P9oRlhVGRCSwMr29eYervL-SY-bCSeSioiBaaFQ";

export const MAP_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBGNd1ij--7ZHwV_8iJ8BbfkHXYdqEhGSihEUmVM_4V3slAId6QLZNk9XaDgktFU3LLFblElAMxMKKx6BisGkgzlsAacpD_WL06os7NoiZ72jrftXhUEvtqLpWLqAmyW6ST7zwcwXX2uB4bFDj9OMAgX-beSnwM65-xfmgMwqexInZ2KTCcAeLccJQibIIkZUxflwQuoXRoahBBvEInzb_Rwqerd2SN9sQNliMZLkqky77SrEyokq3LJQ";

export const TREATMENTS: Treatment[] = [
  {
    id: 'cryo-facial',
    title: 'Cellular Renewal Cryo-Facial',
    subtitle: 'Couture Cryotherapy',
    atelier: 'The Skin Atelier',
    location: 'Orchard Blvd, Level 03',
    distance: '1.2 km away',
    rating: 4.95,
    reviewCount: 412,
    durationMins: 75,
    price: 180,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsp4p69QHEtiZYJlp6oy5aVr8zLS3BdVUKjZioRV111Q0YfFWqNmZf4vDWxSxeSFpczaxmqhQveXUZj74qp5MtJmd0bIARP-HtQ1LTytkgXpRFLhBnJkqw2SAOKucy_djL8z_f6Nm71qTi5YkGk0UiVmdAHZrxSCszfRBtsiQu380AqSIlh0ZLjRkxgZbP_X_GGUbFdoIFVoSSTDt-AFD44BTEkWmsV1EAE2TyMXqGdD9oRiysg1rn1w',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZPU0j0cI02zeZMTh4MQ7fuvF-nZ07ZhRhjUU_EO5M0Hwrb5HGj_M2NfUh4BWiZLIrSIiFJ0jBFVqHw44UUfjcb7ijduWxgFBiL8OfaVWEA6e_vaIECbQcG5KFe7_ZN3b6G2KcRA9H8iVPd1ZJc1b26UVUXT8ORs0TAZAD4nwZnYeUemzp5e8JvXcCWUVVb-izghADASowOy8flObSJGMjGlODLHr3q73e8PWWgPFZsufDGw3S7cxP6Q',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnjavBwwTwJPSbGfO42okVtdmOj62dlsXN2kGHsYQlDPEWw22eLngGNN_NIYPB8dK7L5VLOuoyK78CBdfkgkTL0ji5XgbAPynhb_zRt9GP-TOGLylYnkUPhWalp1d-iYgAskedn2UeACaHVMHpnNtNVk0Ag1C3ibKr0Bn6-p5AxievM6BHPTQUJH1j_UGU0bJd_ohvqBdjjiGpcdGIZa3J8VSC1D3JrXdESCT2iVmuEC1b8-PHjyDlGg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYIwDm2vDVPdYCdY-w0gfyWrn1OwqgIdcpFEZUj4sWZYhOC412zZ5lnirIRia4z9W7CbZZ8lqsEVHNKAbWhR_esw2-yJZGb4-SRSyzLvIlBtn8Pin_JIF3kZNhOcVdtmboolovtIKMxMQ3vttNp9ROt22BO84YCg4w6DQL0uVvzv-nwgiHP_YJRnHg2iLfLhHjj36mfZ6ccjZ18FChLnNyF4SixakiQ_1qWZYMF6yfk5NdtfFzQdWkig'
    ],
    category: 'Facials',
    badge: 'Available Today',
    badgeType: 'green',
    description: 'Sub-zero pure oxygen micro-infusion paired with soothing lymphatic drainage, targeted LED skin restoration, and therapeutic warm scalp therapy.',
    availableToday: true,
    instantConfirm: true,
    slots: ['2:00 PM', '4:15 PM', '6:30 PM']
  },
  {
    id: 'japanese-head-spa',
    title: 'Japanese Head Spa & Scalp Detox',
    subtitle: 'Holistic Trichology',
    atelier: "L'Étoile Hair Haven",
    location: 'Marina Bay Financial Centre',
    distance: '2.4 km away',
    rating: 4.90,
    reviewCount: 530,
    durationMins: 60,
    price: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA8FnZ4q86_ZiQJ2Bf-IeglrLTqbORgT9yzK4sTy9MBnbz_mTzY5l3F5YbXMpYdoDE0oIqyOMoY4U7ie1m3gUnPP3rqK4NpA6A2NSjLIErl4QOFz_C2J54JVowAj-SZXzJSIr8yXkKUiNVRPZiuA2L0MKktSoFFgrGqXVioxRhV8IPGIKyuG6uOlvPPT3pxSBirMnUZ9zd6ou1JFew-sDKnTSk-JFawvUAhxmkE9IOUCLZIz1tPO8wrw',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFtR0FqosvWimgWem1kbwcUPHtoTEPBf0q2Wu38JiC-6CKkQnn8NiH5hZlHn5NTgExh0fw_FaszxY2zIxuLIhEIPAVFhRbc4Lvcm_sQ4-wFcURx2nwflfpDapCztq4AkrUU_HQJOJE4Yi5UACbtGt4RkH29owblWoLKf9HRb3clgdrRlKX8gS94dHTn2T98uutrL2oLgXIeZx-gBmR5FpqzNrWB7I-j31RrQnlcE5QOHycZz14l9vHcA'
    ],
    category: 'Hair Spa',
    badge: 'Best Seller',
    badgeType: 'plum',
    description: 'Holistic hydro-massage with organic botanical infusions, deep micro-pore exfoliation, shiatsu acupressure, and blow-dry finish.',
    availableToday: true,
    instantConfirm: true,
    highDemand: true,
    slots: ['10:30 AM', '11:45 AM', '1:15 PM']
  },
  {
    id: 'lash-lift-tint',
    title: 'Bespoke Lash Lift & Tint',
    subtitle: 'Atelier Regard Couture',
    atelier: 'Atelier Regard',
    location: 'Somerset 313',
    distance: '0.8 km away',
    rating: 4.88,
    reviewCount: 198,
    durationMins: 45,
    price: 85,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEtoVAo_a4usfQkKoD3W6zthBCfE0hXtP8azE_NCwFb-9-4I56Es48WEsxuk_rT44Mqa_EOhP0Dx7x2IizhnVzPxTXeN9ePpwjLfxZqwpX5clCzTudM6JtxtTN6EwVyFodQZ4bgiThX44VC7X2d6q_cyXFyeFRqCznbQz0UYo5vj0eTG_T6GH6D0e4n0HKiLSfvoBYzcGaapg8AxtswNNdn9x6wHJD2XyRilp9WqASKdQYdB5Znl90Jw',
    category: 'Lashes',
    badge: 'Lunchtime Special',
    badgeType: 'default',
    description: 'Custom rod curling contour suited specifically to eye anatomy with organic keratin glazing for high-gloss, damage-free, 8-week hold.',
    availableToday: true,
    instantConfirm: true,
    slots: ['3:30 PM', '5:15 PM', '6:00 PM']
  },
  {
    id: 'deep-tissue-aromatherapy',
    title: 'Deep Tissue & Aromatherapy Ritual',
    subtitle: 'Botanical Bodywork',
    atelier: 'Aurum Wellness Lounge',
    location: 'Tanglin Mall Heritage Suite',
    distance: '3.1 km away',
    rating: 4.92,
    reviewCount: 320,
    durationMins: 90,
    price: 165,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6jtHnlOzIMil5eWeakusaLaQk6Mbd2YQxpNArOwxd8dgddnn8DYexnJioAQkgmBdkE2XidmrDYI1nESE9slKMm9eTh-P9HE1MJ27QR4UVd8tXjb8M-6DITsdr_YC5p-hZjw9Rf-4ru85o-tXki-aG5W_GSKtnSUn1hBp2dnjtxEUP7c8kF2ELHfuITWNhrmQMWqMBVSamW9EZzNIX-AldAUggdKySY15p2lDvODIdjbOqgoWRx_SF4w',
    category: 'Massage',
    badge: 'Signature Ritual',
    badgeType: 'gold',
    description: 'Intensive therapeutic muscular relief infused with wild frankincense and sandalwood notes, ending in heated rose-quartz stone placement.',
    availableToday: true,
    instantConfirm: true,
    slots: ['7:00 PM', 'Tomorrow']
  },
  {
    id: 'gold-cellular-facial',
    title: '24K Gold Cellular Lift Facial',
    subtitle: 'Luxury Anti-Aging',
    atelier: 'Maison De Beauté',
    location: 'Orchard Paragon #04-12',
    distance: '1.4 km away',
    rating: 4.90,
    reviewCount: 318,
    durationMins: 60,
    price: 165,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAacc7ExlgimIy5826UTITcHf5_Qz1w21jDMRFJMq9CpJe-ItvK4LGZt6pOLwydaLgMhFajuFPBnegMOYzheK_cSJTGTT0uzAdUUYefkijIpj3JCxCC-cDIP0V3Fr9vH2U2RqLj8KL7QJ1cjvcCf63JU8FZd4ab0DlP5sCKRRtIqp5FiBNrN8CbDIsQ4czm22nrtkiIQlJw7NaQFfCYkQUW-WRqnGkbhuWd3WwZSmMWJb3Qtx53nGY8w',
    category: 'Facials',
    badge: 'Trending',
    badgeType: 'gold',
    description: 'Micro-current lymphatic muscle sculpting combined with bio-active gold leaf collagen infusion for instantaneous contour tautness.',
    availableToday: true,
    instantConfirm: true,
    slots: ['1:00 PM', '3:30 PM', '5:00 PM']
  },
  {
    id: 'chrome-gel-sculpting',
    title: 'Glazed Chrome Gel Sculpting',
    subtitle: 'Modern Couture Nails',
    atelier: 'Studio Kōhaku',
    location: 'Robertson Quay Walk',
    distance: '2.1 km away',
    rating: 4.80,
    reviewCount: 96,
    durationMins: 50,
    price: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkQTUK74eCWaEB2RwPWlnEqlzFENvbnnJNK5be0ReqN3kHH-r9QluiPVXeyCQZ_PzySFRvLnmPg5JRGpsWxsp9rwCAjLTbxtQw2FVUsV4wSINkujCz5LIneIrLCXgV308i2OostzUb89L7Lys69inCqQMyN42iWwO7MHb33xl9x6KVokNaSy-cPeR1XfhmlS232gQ1p0T28u8hI2rv0qHIA77VfTDKmQ8YTlfEgqrGV7DYoVRw4BkEJg',
    category: 'Nail Bar',
    badge: 'Trending',
    badgeType: 'default',
    description: 'Precision Russian dry manicure technique followed by biocompatible builder gel sculpting and high-luster chrome pearlescent finish.',
    availableToday: true,
    instantConfirm: true,
    slots: ['11:00 AM', '2:30 PM', '4:45 PM']
  }
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'elena-vance',
    name: 'Dr. Elena Vance',
    title: 'Lead Esthetician',
    atelier: 'The Skin Atelier',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyezxCa5ipPRoxOCi3IpBRuSZbEZtuLsMRYQsw1U53_KtGcVgOxzrf5AWClHHPtO9P_qPVCY3w8HpLeR8imm5_7TfwXjUabNXa4RwJxTJc-DWS5WpSFOL-gdqM3B_CY7aJDp98TX6BWGHgC6ujEx0jIun1CAJhZn-X--LOlLgcs4ie9bf9anL577RTHk4STNn5dIIZdlQBACA65m62sgq1uQfhSPr9GlMr6YUWKg6n-y4uAUdUbQKJmQ',
    roleType: 'Lead',
    experienceYears: 11,
    status: 'online',
    slotTime: 'Today • 3:30 PM',
    rating: 4.98
  },
  {
    id: 'chloe-tan',
    name: 'Chloe Tan',
    title: 'Senior Skin Therapist',
    atelier: 'The Skin Atelier',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcQtyMkZHl4Ekc3tV08oT6pzNTgbtXBA6SXWppt4jCPw6sLj9Svvb7g1z1ZQkZyesbwBDNm-xQcop15sK7NmIEzvAKWWylm8smhsYhW2cxYiGFmSLSgcDJBS-DfCJRB3sNrWo0f5lblU5-xUum9-P35aguHhNURbvW11kTwT0uLE7KK3CzNt1k5AbyLoIoxDEcOJjQqV7FS2HwVUI8YOxMbWfGraiN_Ap6RQ4KRNrSEQMaTR5qlh_-kA',
    roleType: 'Senior',
    experienceYears: 9,
    status: 'online',
    slotTime: 'Today • 1:00 PM',
    rating: 4.95
  },
  {
    id: 'camille-zhao',
    name: 'Camille Zhao',
    title: 'Master Esthetician',
    atelier: 'Maison De Beauté',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATm3bbaxEbtWUz2Y-_oOEI80YOAqT5RM_WyTMD-s1aFy2UQEmHzOElg2_B60sqg4ITAoaF7AtaPCWXz58hq8Q5UiWysEzL-PJP3pSabGcIwnnd1fNrYW7ui7yV7Jp7aEaNjLGkCcbARoq7uAq1pbAVKfweMuozLQnpGzM4xbNie1iE6wyOQFOU1oqMCUR45fxsmxJMd6-c992RN4zLhzE9dVQKt16ntQl5Ho7uKWpb3_ovKFUcvVG_Vw',
    roleType: 'Master',
    experienceYears: 12,
    status: 'online',
    slotTime: 'Today • 3:30 PM',
    rating: 4.96
  },
  {
    id: 'antoine-laurent',
    name: 'Antoine Laurent',
    title: 'Scalp Trichologist',
    atelier: 'L’Atelier Capillaire',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcIqt9lQWC8ECVzUqT3_LJgYHXWuejnLRyOzvQRQPnEtQfhsZlGFwY1NBVOfIbHy4fQkQBe-BPgew1prjS6pLN1t0xLGY_bwpcFfo_soh6mrZA-n1bfFas42BmSBip7vz04IhgEuqISTkVYyQTd-Flw2eUoErAahqOR6t-Up7KsoRlBhcGg-6xiN78ZO9JPlPf5170GaIbEccfwr3I7THkBGblFRtGtKCXisZvAgmZOyWZjsnONHOtgQ',
    roleType: 'Master',
    experienceYears: 14,
    status: 'online',
    slotTime: 'Today • 5:15 PM',
    rating: 4.99
  },
  {
    id: 'sora-takahashi',
    name: 'Sora Takahashi',
    title: 'Nail Sculptor',
    atelier: 'Studio Kōhaku',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Zx4QPcK2OjUgA1M3oUhfNbb9v7h9u72mY9V1unM6ellueGaopFT4vJZSy5_lStLgJ6-ckBt0KCm48SjHTibW5hdN-gJVWvdV-kXBjWkrO1QZvAjAQR5_FVtx-vGVYNeOsiabvKXx8TckDHYKq5Ofh1xWgLQ-ycOayB9DAu7j4zvogiAvuqnxxMSBjUI306mGf9EKCoEIbjr8FD0kKeyoPFBE9yC5I19-Scp19Av5TSx_KRQqP1dIkA',
    roleType: 'Senior',
    experienceYears: 8,
    status: 'available_later',
    slotTime: 'Tomorrow • 11:00 AM',
    rating: 4.88
  }
];

export const ADD_ONS: AddOnItem[] = [
  {
    id: 'addon-led',
    name: 'LED Light Therapy',
    durationMins: 15,
    price: 35,
    description: '+15 mins • Cellular repair collagen boost'
  },
  {
    id: 'addon-neck',
    name: 'Neck & Décolleté Firming Serum',
    durationMins: 0,
    price: 25,
    description: 'Tri-peptide concentrated lift mask'
  },
  {
    id: 'addon-eye',
    name: 'Eye Contour Cryo-Sculpt',
    durationMins: 10,
    price: 30,
    description: '+10 mins • Micro-pulse lymphatic de-puffing'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Aurelia M.',
    date: '2 days ago',
    rating: 5,
    comment: 'The sub-zero cryo was intensely invigorating. My jawline looked noticeably sculpted within hours. Completely worth every penny.',
    service: 'Cellular Renewal Cryo-Facial'
  },
  {
    id: 'rev-2',
    author: 'Claire S.',
    date: '1 week ago',
    rating: 5,
    comment: 'Dr. Elena explained every single step meticulously. The complimentary tea afterward in the private lounge was the cherry on top.',
    service: 'Cellular Renewal Cryo-Facial'
  },
  {
    id: 'rev-3',
    author: 'Seraphina L.',
    date: '3 weeks ago',
    rating: 5,
    comment: 'Instant glass skin! The cryo facial paired with LED therapy eliminated all my travel puffiness before my gala event.',
    service: 'Cellular Renewal Cryo-Facial'
  }
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'VEL-8921',
    serviceTitle: 'Cellular Renewal Cryo-Facial',
    atelier: 'The Skin Atelier',
    specialistName: 'Chloe Tan',
    specialistAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0vskAn_wPgTjmTiWkSBiWW3xuw4_jBarim5w9E_NqeCLhmrJGWJ_DGqJGG5LR9j3su8zwD6McbLtomQScMDGxHKhGNHnqcHXlYFdq0dFDPJOmLGWv4wKin-UnhBcgtCg0dyYRbwdIjHJwGqpsCiFYzy3c13Y0JtJpRICIXu0nZXu76Zn0yZGJlSeuybISvHiEYpX8o1qtXw1xWrJlnsKsaVThynim3XHCIgch7J3R5V88ObxpX-hYLA',
    date: 'Fri, Oct 25, 2024',
    time: '1:00 PM',
    durationMins: 90,
    totalPaid: 210.65,
    status: 'Confirmed',
    addOns: ['LED Light Therapy (+15 mins)']
  },
  {
    id: 'VEL-7410',
    serviceTitle: 'Japanese Head Spa & Scalp Detox',
    atelier: "L'Étoile Hair Haven",
    specialistName: 'Antoine Laurent',
    specialistAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcIqt9lQWC8ECVzUqT3_LJgYHXWuejnLRyOzvQRQPnEtQfhsZlGFwY1NBVOfIbHy4fQkQBe-BPgew1prjS6pLN1t0xLGY_bwpcFfo_soh6mrZA-n1bfFas42BmSBip7vz04IhgEuqISTkVYyQTd-Flw2eUoErAahqOR6t-Up7KsoRlBhcGg-6xiN78ZO9JPlPf5170GaIbEccfwr3I7THkBGblFRtGtKCXisZvAgmZOyWZjsnONHOtgQ',
    date: 'Tue, Nov 05, 2024',
    time: '4:00 PM',
    durationMins: 60,
    totalPaid: 120.00,
    status: 'Pending',
    addOns: []
  }
];
