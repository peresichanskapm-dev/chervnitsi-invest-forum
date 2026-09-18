export type ProgramDay = "day1" | "day2";
export type ProgramStage = "main" | "side" | "vyzhnytsia" | "chnu";
export type ProgramKey = "day1-main" | "day1-side" | "day2-vyzhnytsia" | "day2-chnu";

export type ProgramSpeaker = {
  name: string;
  description?: string;
  role?: string;
};

export type ProgramEntry = {
  time?: string;
  type?: string;
  title?: string;
  bullets?: string[];
  speakers?: ProgramSpeaker[];
  speakersPending?: boolean;
};

export type ProgramListBlock =
  | { kind: "bar"; label: string; time?: string; tone?: "dark" | "accent"; height?: number; marginBottom?: number; marginTop?: number }
  | { kind: "entry"; entry: ProgramEntry; height?: number }
  | { kind: "plate"; title: string; subtitle: string };

export type SideEventCell = {
  title: string;
  subtitle?: string;
  speakers?: ProgramSpeaker[];
  rowSpan?: number;
  colSpan?: number;
};

export type SideEventRow = {
  time: string;
  cells: Array<SideEventCell | null>;
  afterparty?: string;
  height?: number;
};

export type ProgramVariant = {
  key: ProgramKey;
  day: ProgramDay;
  stage: ProgramStage;
  tags: string[];
  blocks?: ProgramListBlock[];
  sideColumns?: string[];
  sideRows?: SideEventRow[];
};

export type ProgramDictionary = {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  dayLabel: string;
  stageLabel: string;
  pendingSpeakers: string;
  days: Record<ProgramDay, string>;
  stages: Record<ProgramStage, string>;
  variants: Record<ProgramKey, ProgramVariant>;
};

const moderator = "модератор";

const day1Main: ProgramListBlock[] = [
  { kind: "bar", label: "реєстрація учасників, вітальна кава", tone: "dark", time: "08:00 - 10:00" },
  {
    kind: "entry",
    entry: {
      time: "10:00 - 10:20",
      type: "вступне слово",
      speakers: [
        { name: "Руслан Осипенко", description: "Голова Чернівецької обласної державної адміністрації" },
        { name: "Роман Клічук", description: "Чернівецький міський голова" },
        {
          name: "Остап Бачинський",
          description: "Фахівець із залучення інвестицій та побудови систем продажів, засновник «Інтерселіка консалтинг»",
        },
        { name: "Тарас Бачинський", description: "Інвест директор та співзасновник MergeWave Capital, Bk invest" },
        {
          name: "Яна Рогожа",
          description: "Підприємниця, інфлюенсерка, президентка жіночого бізнес-клубу LBC, засновниця «GxBar Чернівці» — франшиза міжнародної мережі бʼюті барів",
        },
      ],
    },
  },
  { kind: "bar", label: "ПЕРША ЧАСТИНА", tone: "accent" },
  {
    kind: "entry",
    entry: {
      time: "10:25 - 10:55",
      type: "вступний виступ",
      title: "Довіра, що масштабує: як репутація перетворюється на бізнес-актив",
      speakers: [
        { name: "Юрій Гладкий", description: "Засновник бренд-маркетингової агенції Grape" },
        { name: "Роман Коржак", description: "CEO та керуючий партнер компанії blago" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "11:00 - 11:40",
      type: "панельна дискусія",
      title: "Код майбутнього: як AI трансформує український IT-бізнес",
      speakers: [
        { role: moderator, name: "Ігор Маркевич", description: "EIT Community Officer Ukraine" },
        { name: "Дмитро Шкільнюк", description: "CEO Чернівецького ІТ Кластеру" },
        { name: "Юлія Шустова", description: "CEO та співзасновниця міжнародної IT-компанії InventorSoft" },
        { name: "Роман Кишакевич", description: "Керівник з регіонального розвитку Blago" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "11:45 - 12:00",
      type: "виступ",
      title: "Заміська нерухомість: мильна бульбашка чи головна інвест-жила десятиліття?",
      bullets: ["Ринок заміської нерухомості України 2026–2027. Тенденції, прогнози"],
      speakers: [{ name: "Олесь Піщак", description: "Співвласник девелоперської компанії Буде Дім" }],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "12:00 - 12:30",
      type: "відвертий діалог",
      title: "Енергетика без компромісів: хто визначає майбутнє ринку?",
      speakers: [
        {
          role: moderator,
          name: "Остап Бачинський",
          description: "Фахівець із залучення інвестицій та побудови систем продажів, засновник «Інтерселіка консалтинг»",
        },
        { name: "Тетяна Духова", description: "CEO Ecotech Invest" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "12:35 - 13:15",
      type: "панельна дискусія",
      title: "Території прибутку: як рекреація перетворює простір на бізнес-актив",
      speakers: [
        {
          role: moderator,
          name: "Анна Іскіердо",
          description: "Архітекторка, громадська діячка, співзасновниця та СЕО архітектурно-проєктної компанії АІММ",
        },
        { name: "Олексій Волошин", description: "CEO керуючої компанії Edem family" },
        {
          name: "Олександр Поштарюк",
          description: "Співзасновник KODRA та KODRA Invest, підприємець, девелопер та інженер-будівельник за освітою",
        },
        { name: "Олесь Піщак", description: "Співвласник девелоперської компанії Буде Дім" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "13:20 - 14:00",
      type: "панельна дискусія",
      title: "Системний капітал: як гроші працюють сьогодні та створюють майбутнє",
      speakers: [
        { name: "Яніна Соколова", description: "Українська журналістка та громадська діячка" },
        { name: "Василь Прус", description: "Комерційний директор Advance Finance Alliance" },
      ],
    },
  },
  { kind: "bar", label: "ПЕРЕРВА НА ЛАНЧ", tone: "dark", time: "14:00 - 15:00" },
  { kind: "bar", label: "ДРУГА ЧАСТИНА", tone: "accent" },
  {
    kind: "entry",
    entry: {
      time: "15:00 - 15:40",
      type: "панельна дискусія",
      title: "Нова географія інвестиційних можливостей України",
      speakers: [
        {
          role: moderator,
          name: "Катерина Куриш",
          description: "Засновниця та CEO освітньої екосистеми CLA (Communicative Language Academy) і CLA Communicative HUB",
        },
        { name: "Руслан Осипенко", description: "Голова Чернівецької обласної державної адміністрації" },
        {
          name: "Микола Каблука",
          description: "Український митець і світловий дизайнер міжнародного рівня, засновник і артдиректор компанії Expolight, магістр мистецтв зі світлового дизайну",
        },
        { name: "Олександр Лахтіонов", description: "Фаундер та СЕО групи компаній RITM, експерт з розвитку девелоперських проєктів" },
        { name: "Antonella Valmorbida", description: "Генеральна секретарка ALDA — Європейська асоціація локальної демократії" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "15:45 - 16:25",
      type: "панельна дискусія",
      title: "Модель росту: як франчайзинг допомагає бізнесу масштабуватися швидше",
      speakers: [
        {
          role: moderator,
          name: "Мирослава Козачук",
          description: 'Трендвізіонер та лідер у франчайзингу, власниця та СEO Franchise Group, авторка проєкту "Перша школа франчайзингу"',
        },
        {
          name: "Яна Рогожа",
          description: "Підприємниця, інфлюенсерка, президентка жіночого бізнес-клубу LBC, засновниця «GxBar Чернівці» — франшиза міжнародної мережі бʼюті барів",
        },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "16:30 - 17:00",
      type: "відверта розмова",
      title: "Побудова бізнесу та інвестиції: енергетика vs нерухомість",
      speakers: [
        {
          name: "Остап Бачинський",
          description: "Фахівець із залучення інвестицій та побудови систем продажів, засновник «Інтерселіка консалтинг»",
        },
        { name: "Артур Лупашко", description: "Засновник групи компаній Ribas Hotel Group" },
      ],
    },
  },
  {
    kind: "entry",
    entry: { time: "17:05 - 17:20", type: "виступ", speakersPending: true },
  },
  {
    kind: "entry",
    entry: {
      time: "17:25 - 18:05",
      type: "панельна дискусія",
      title: "Економіка ресторанного бізнесу: бренд, операції чи масштаб?",
      speakers: [
        {
          role: moderator,
          name: "Дмитро Лукенчук",
          description: "Президент бізнес-спільноти «CBG», засновник мережі ресторанів OZZY, YOKI, Пʼяте Підземелля",
        },
        {
          name: "Ольга Мартиновська",
          description: 'Шеф-кухарка ресторану BEEF, інфлюенсерка, телеведуча, переможниця та суддя проєкту «МастерШеф», засновниця Української Кулінарної Академії, співзасновниця першого українського кулінарного застосунку Culinara',
        },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "18:10 - 19:00",
      type: "панельна дискусія",
      title: "Бізнес партнерство та інвестиції. Що їх обʼєднує та розмежовує?",
      speakers: [
        {
          role: moderator,
          name: "Василь Яворський",
          description: "Співзасновник та СЕО Bacara, співзасновник бізнес спільноти CBG, випускник програми Stanford Ignite Ukraine",
        },
        { name: "Євген Артюхов", description: "Адвокат, PhD, бізнес-медіатор, підприємець, співзасновник ASA Group та спільноти українських підприємців Club100" },
        { name: "Юрій Тодосійчук", description: "Експерт з фінансів, банківської справи та інвестицій, із понад 20 роками досвіду" },
        {
          name: "Олександр Богачик",
          description: "Співвласник «BRUSHME» — виробництво та експорт хоббі товарів, «ORTUM» — центр щелепно-лицьової діагностики",
        },
        { name: "Володимир Непʼюк", description: "Понад 15 років будує технологічні компанії в Україні, заснував і понад 10 років очолював Datawiz" },
      ],
    },
  },
  { kind: "bar", label: "ЗАВЕРШЕННЯ ПРОГРАМИ ПЕРШОГО ДНЯ · AFTERPARTY", tone: "accent", time: "19:00 - 22:00", marginBottom: 40 },
];

const day1Side: ProgramListBlock[] = [
  { kind: "bar", label: "вступне слово", tone: "dark", time: "12:00 - 12:15" },
  { kind: "bar", label: "ПЕРША ЧАСТИНА", tone: "accent" },
];

const sideColumns = ["Amphitheater · Каріна Клим", "Центр розвитку підприємництва · Борис Наумов"];
const sideRows: SideEventRow[] = [
  {
    time: "12:15 - 13:45",
    cells: [
      { title: "Акули бізнесу", subtitle: "Короткі пітчинги бізнесів для потенційних інвесторів" },
      { title: "Від угоди до зростання: як M&A змінює майбутнє компаній" },
    ],
  },
  {
    time: "14:15 - 15:45",
    cells: [
      {
        title: "Куди інвестують зірки",
        speakers: [
          {
            name: "Яна Рогожа",
            description: "Підприємниця, інфлюенсерка, президентка жіночого бізнес-клубу LBC, засновниця «GxBar Чернівці» — франшиза міжнародної мережі бʼюті барів",
          },
        ],
      },
      { title: "iPlan" },
    ],
  },
  {
    time: "16:15 - 18:00",
    cells: [
      {
        title: "Архітектура як інвестиція: що насправді збільшує вартість проєкту?",
        speakers: [
          { name: "Володимир Непийвода", description: "Співвласник та керуючий партнер YOD Group" },
          {
            name: "Анна Іскіердо",
            description: "Архітекторка, громадська діячка, співзасновниця та СЕО архітектурно-проєктної компанії АІММ, голова правління Фонду Архітектурної палати України",
          },
          {
            name: "Микола Каблука",
            description: "Український митець і світловий дизайнер міжнародного рівня, засновник і артдиректор компанії Expolight, магістр мистецтв зі світлового дизайну",
          },
        ],
      },
      null,
    ],
  },
  { time: "", cells: [null, null], afterparty: "AFTERPARTY", height: 46 },
];

const day2Vyzhnytsia: ProgramListBlock[] = [
  { kind: "bar", label: "Збір учасників", tone: "dark", time: "12:00 - 12:15" },
  { kind: "plate", title: "Програма", subtitle: "в процесі" },
];

const day2Chnu: ProgramListBlock[] = [
  { kind: "bar", label: "ПЕРША ЧАСТИНА", tone: "accent" },
  { kind: "entry", entry: { time: "12:00 - 12:40", title: "Екскурсія Чернівецьким Національним університетом імені Юрія Федьковича" } },
  {
    kind: "entry",
    entry: {
      time: "13:00 - 15:00",
      title: "Творче руйнування: як створити нову економіку України",
      speakers: [
        {
          role: moderator,
          name: "Олексій Даців",
          description: "Викладач Українського католицького університету, підприємець, ментор спільноти Board, пластун, амбасадор Lviv Invest Forum",
        },
        {
          name: "Павло Шеремета",
          description: "Економіст, управлінець, ексміністр економічного розвитку і торгівлі, засновник Києво-Могилянської бізнес-школи та співзасновник Schumpeter School of Innovation",
        },
        { name: "Борис Шестопалов", description: "Співзасновник і CEO HD-group" },
        {
          name: "Руслан Білоскурський",
          description: "Ректор ЧНУ, доктор економічних наук, професор і співзасновник Шумпетерівської школи інновацій",
        },
        { name: "Роман Клічук", description: "Чернівецький міський голова" },
      ],
    },
  },
];

const variants: Record<ProgramKey, ProgramVariant> = {
  "day1-main": { key: "day1-main", day: "day1", stage: "main", tags: [], blocks: day1Main },
  "day1-side": { key: "day1-side", day: "day1", stage: "side", tags: [], blocks: day1Side, sideColumns, sideRows },
  "day2-vyzhnytsia": { key: "day2-vyzhnytsia", day: "day2", stage: "vyzhnytsia", tags: [], blocks: day2Vyzhnytsia },
  "day2-chnu": { key: "day2-chnu", day: "day2", stage: "chnu", tags: [], blocks: day2Chnu },
};

export const PROGRAM_DICTIONARY: ProgramDictionary = {
  breadcrumbHome: "Головна",
  breadcrumbCurrent: "Програма",
  dayLabel: "День",
  stageLabel: "Сцена",
  pendingSpeakers: "спікери в процесі",
  days: {
    day1: "День 1    |    3 жовтня",
    day2: "День 2    |    4 жовтня",
  },
  stages: {
    main: "Main Stage",
    side: "Side Stage",
    vyzhnytsia: "Вижниця",
    chnu: "Чернівецький національний університет",
  },
  variants,
};

export function getDefaultProgramKey(): ProgramKey {
  return "day1-main";
}

export function getProgramKey(day: ProgramDay, stage: ProgramStage): ProgramKey {
  return day === "day1" ? (stage === "side" ? "day1-side" : "day1-main") : stage === "chnu" ? "day2-chnu" : "day2-vyzhnytsia";
}

export function getStagesForDay(day: ProgramDay): ProgramStage[] {
  return day === "day1" ? ["main", "side"] : ["vyzhnytsia", "chnu"];
}
