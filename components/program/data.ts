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
  tierNotice: Partial<Record<ProgramDay, { label: string; cta: string }>>;
  days: Record<ProgramDay, string>;
  stages: Record<ProgramStage, string>;
  variants: Record<ProgramKey, ProgramVariant>;
};

const moderator = "модератор";

const ostap: ProgramSpeaker = {
  name: "Остап Бачинський",
  description: "Фахівець із залучення інвестицій та побудови систем продажів, засновник «Інтерселіка консалтинг»",
};
const rohozha: ProgramSpeaker = {
  name: "Яна Рогожа",
  description: "Підприємниця, інфлюенсерка, президентка жіночого бізнес-клубу LBC, засновниця «GxBar Чернівці» — франшиза міжнародної мережі бʼюті барів",
};
const osypenko: ProgramSpeaker = { name: "Руслан Осипенко", description: "Голова Чернівецької обласної державної адміністрації" };
const klichuk: ProgramSpeaker = { name: "Роман Клічук", description: "Чернівецький міський голова" };
const dukhova: ProgramSpeaker = { name: "Тетяна Духова", description: "CEO Ecotech Invest" };
const ivashchenko: ProgramSpeaker = { name: "Олександр Іващенко", description: "Керівник відділу технічних рішень, Photomate" };
const kabluka: ProgramSpeaker = {
  name: "Микола Каблука",
  description: "Український митець і світловий дизайнер міжнародного рівня, засновник і артдиректор компанії Expolight, магістр мистецтв зі світлового дизайну",
};
const bonesko: ProgramSpeaker = { name: "Дмитро Бонеско", description: "Співвласник та арт-директор YOD Group" };

const karpiuk: ProgramSpeaker = { name: "Юрій Карпюк", description: "Investment Associate, Horizon Capital" };
const datsiv: ProgramSpeaker = {
  name: "Олексій Даців",
  description: "Викладач Українського католицького університету, підприємець, ментор спільноти Board, пластун, амбасадор Lviv Invest Forum",
};

const day1Main: ProgramListBlock[] = [
  { kind: "bar", label: "реєстрація учасників, вітальна кава", tone: "dark", time: "08:00 - 10:00" },
  {
    kind: "entry",
    entry: {
      time: "10:00 - 10:20",
      type: "вступне слово",
      speakers: [osypenko, klichuk, ostap, rohozha],
    },
  },
  { kind: "bar", label: "ПЕРША ЧАСТИНА", tone: "accent" },
  {
    kind: "entry",
    entry: {
      time: "10:20 - 10:50",
      type: "інтерв'ю",
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
      time: "10:50 - 11:05",
      type: "виступ",
      title: "Енергетика як інвестиція: перші реальні результати УЗЕ",
      speakers: [dukhova],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "11:10 - 11:50",
      type: "панельна дискусія",
      title: "Код майбутнього: як AI трансформує український IT-бізнес",
      speakers: [
        { role: moderator, name: "Ігор Маркевич", description: "EIT Community Officer Ukraine" },
        { name: "Дмитро Шкільнюк", description: "CEO Чернівецького ІТ Кластеру" },
        { name: "Юлія Шустова", description: "CEO та співзасновниця міжнародної IT-компанії InventorSoft" },
        { name: "Олександр Колб", description: "Co-founder, генеральний партнер українського венчурного синдикату Toloka.VC" },
        { name: "Руслан Линник", description: "Керуючий партнер фонду Majinx Capital" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "11:50 - 12:05",
      type: "виступ",
      title: "AI у бізнесі: як штучний інтелект допомагає збільшувати продажі",
      speakers: [{ name: "Роман Кишакевич", description: "Керівник з регіонального розвитку Blago" }],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "12:05 - 12:45",
      type: "панельна дискусія",
      title: "Нова географія інвестиційних можливостей України",
      speakers: [
        {
          role: moderator,
          name: "Катерина Куриш",
          description: "Засновниця та CEO освітньої екосистеми CLA (Communicative Language Academy) і CLA Communicative HUB",
        },
        osypenko,
        kabluka,
        { name: "Олександр Лахтіонов", description: "Фаундер та СЕО групи компаній RITM, експерт з розвитку девелоперських проєктів" },
        { name: "Antonella Valmorbida", description: "Генеральна секретарка ALDA — Європейська асоціація локальної демократії" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "12:45 - 13:00",
      type: "виступ",
      title: "Час інвестувати в УЗЕ: від економії на електроенергії до нового джерела доходу",
      speakers: [ivashchenko],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "13:00 - 13:40",
      type: "відвертий діалог",
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
        bonesko,
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "13:40 - 14:10",
      type: "панельна дискусія",
      title: "Енергетика без компромісів: хто визначає майбутнє ринку?",
      speakers: [
        { role: moderator, ...ostap },
        dukhova,
        { name: "Олександр Ганчев", description: "Co-founder та керівник девелоперського напрямку Codex Energy" },
        ivashchenko,
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
      title: "Антиінвестиції та сімейний бізнес: куди не варто вкладати і як будувати капітал поколінь",
      speakers: [
        { role: moderator, name: "Тарас Бачинський", description: "Інвест директор та співзасновник MergeWave Capital, Bk invest" },
        {
          name: "Ростислав Вовк",
          description: "СЕО та співвласник найбільшої української компанії із виробництва їжі для котів та собак Kormotech",
        },
        {
          name: "Микола Кміть",
          description: "Співзасновник готельно-оздоровчого комплексу «Святий Шарбель», співвласник гірськолижного комплексу «Плай»",
        },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "15:45 - 16:25",
      type: "панельна дискусія",
      title: "Культура як актив: куди інвестувати сьогодні",
      speakers: [
        {
          role: moderator,
          name: "Леся Воронюк",
          description:
            "Засновниця Всесвітнього дня вишиванки, культурна кураторка, голова ГО «Всесвітній День Вишиванки», членкиня експертної ради міжнародної організації із захисту культурної спадщини «Europa Nostra»",
        },
        {
          name: "Любомир Левицький",
          description:
            "Один із найяскравіших піонерів українського жанрового кіно, кліпмейкер, сценарист та продюсер. Тактичний екшн «Кіллхаус» увійшов до списку з 8 офіційних заявок національного відбору на 99-ту премію «Оскар»",
        },
        { name: "Валерія Толочина", description: "Глобальна директорка з маркетингу та продюсерка MEGOGO" },
        { name: "Наріман Гусейнов", description: "Керівник напряму партнерств, інвестицій та розвитку FILM.UA Group" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "16:30 - 17:00",
      type: "відверта розмова",
      title: "Побудова бізнесу та інвестиції: енергетика vs нерухомість",
      speakers: [ostap, { name: "Артур Лупашко", description: "Засновник групи компаній Ribas Hotel Group" }],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "17:05 - 17:20",
      type: "виступ",
      title: "Заміська нерухомість: мильна бульбашка чи головна інвест-жила десятиліття?",
      bullets: ["Ринок заміської нерухомості України 2026–2027. Тенденції, прогнози"],
      speakers: [{ name: "Олесь Піщак", description: "Співвласник девелоперської компанії Буде Дім" }],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "17:25 - 18:15",
      type: "панельна дискусія",
      title: "Як перетворити експертність на бізнес: масштабування, нові продукти та вихід на міжнародні ринки",
      speakers: [
        {
          role: moderator,
          name: "Дмитро Лукенчук",
          description: "Президент бізнес-спільноти «CBG», засновник мережі ресторанів OZZY, YOKI, Пʼяте Підземелля",
        },
        { name: "Євген Клопотенко", description: "Шеф-кухар, креативний підприємець, громадський активіст" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "18:20 - 19:00",
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
  { kind: "bar", label: "ЗАВЕРШЕННЯ ПРОГРАМИ ПЕРШОГО ДНЯ", tone: "accent", marginBottom: 40 },
];

const day1Side: ProgramListBlock[] = [
  {
    kind: "entry",
    entry: {
      time: "11:00 - 12:00",
      title: "Шлях до капіталу: як підготувати бізнес та залучити зовнішнє фінансування",
      speakers: [
        {
          role: moderator,
          name: "Дмитро Ливч",
          description:
            "Український економіст, голова правління та виконавчий директор аналітичного центру easybusiness, партнер міжнародної консалтингової компанії Civitta",
        },
        { name: "Роман Григоришин", description: "Співзасновник інвестиційно-банківської компанії Unicorn Capital" },
        { name: "Ярослав Гончаренко", description: "Investment Associate, Ukraine-Moldova American Enterprise Fund (UMAEF)" },
        { name: "Олег Сіренко", description: "Partner, Diligent Capital Partners" },
        karpiuk,
      ],
    },
  },
  { kind: "bar", label: "ПЕРША ЧАСТИНА", tone: "accent" },
  {
    kind: "entry",
    entry: {
      time: "12:15 - 13:45",
      title: "Бізнес 2027: капітал, інвестиції, кадри, технології та партнерства, як запорука сталого розвитку",
      speakers: [
        {
          role: moderator,
          name: "Дмитро Верховський",
          description: "Засновник Бізнес-клубу Дмитра Верховського, експерт з побудови комунікацій та перемовин",
        },
        { name: "Ігор Буряк", description: "Засновник Nova Recruiting, меценат, волонтер, ШІ-інтегратор у малий та середній бізнес" },
        { name: "Максим Почапський", description: "Власник групи компаній DIAZ, девелопер, соціальний діяч і візіонер відбудови України" },
        {
          name: "Яна Рубчук",
          description: "DFO Property Management — як управління впливає на дохідність, витрати, tenant mix і розвиток активу",
        },
        { name: "Денис Мусіч", description: "CEO, Smart Security" },
        {
          name: "Наталія Добрянська",
          description: "Адвокатка Національної асоціації адвокатів України, голова центрального представництва України ВГО «Нова Формація»",
        },
        { name: "Даніїл Кулик", description: "CEO & Founder Profit.Store" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "14:15 - 15:45",
      title: "Акули бізнесу",
      bullets: ["Короткі пітчинги бізнесів для потенційних інвесторів"],
      speakers: [
        { name: "Олександр Колб", description: "Co-founder, генеральний партнер українського венчурного синдикату Toloka.VC" },
        datsiv,
        { name: "Роман Кравчук", description: "Директор з продажів та розвитку компанії MTA" },
        { name: "Віктор Лобач", description: "Підприємець" },
        {
          name: "Анна Іскіердо",
          description: "Архітекторка, громадська діячка, співзасновниця та СЕО архітектурно-проєктної компанії АІММ, голова правління Фонду Архітектурної палати України",
        },
        {
          name: "Микола Кміть",
          description: "Співзасновник готельно-оздоровчого комплексу «Святий Шарбель», співвласник гірськолижного комплексу «Плай»",
        },
        { name: "Наріман Гусейнов", description: "Керівник напряму партнерств, інвестицій та розвитку FILM.UA Group" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "16:15 - 18:00",
      title: "Архітектура як інвестиція: що насправді збільшує вартість проєкту?",
      speakers: [
        bonesko,
        {
          name: "Анна Іскіердо",
          description: "Архітекторка, громадська діячка, співзасновниця та СЕО архітектурно-проєктної компанії АІММ, голова правління Фонду Архітектурної палати України",
        },
        kabluka,
      ],
    },
  },
  { kind: "bar", label: "AFTERPARTY", tone: "accent", marginBottom: 40 },
];

const day2Vyzhnytsia: ProgramListBlock[] = [
  { kind: "bar", label: "Збір учасників, виїзд з Чернівців (стадіон «Буковина»)", tone: "dark", time: "10:30 - 11:00" },
  { kind: "bar", label: "ПЕРША ЧАСТИНА", tone: "accent" },
  {
    kind: "entry",
    entry: {
      time: "12:00 - 12:40",
      title: "Прибуття до Вижниці",
      bullets: [
        "Зустріч на центральній площі міста. Емоційний старт та занурення у творчий потенціал регіону",
        "Урочисте відкриття муралу, присвяченого 55-річчю переможного виступу пісні «Червона рута»",
        "Виступ фольклорного театру-студії «Ґердан»",
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "12:40 - 13:10",
      title: "Кава-перерва у Буковинському центрі мистецтв",
      bullets: ["Знайомство з роботами митців прикладного мистецтва Вижниці"],
    },
  },
  { kind: "bar", label: "Виїзд до урочища Гамованка (р. Черемош)", tone: "dark", time: "13:10 - 13:20" },
  {
    kind: "entry",
    entry: {
      time: "13:20 - 13:35",
      title: "Вітальне слово. Знайомство з інвестиційними проєктами Вижниці",
      speakers: [
        { name: "Сергій Чеботар", description: "Начальник районної військової адміністрації" },
        { name: "Сергій Колотило", description: "Заступник міського голови" },
        { name: "Роман Андрій", description: "Проєктний менеджер Вижницької міської ради" },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "13:40 - 14:30",
      title: "PÓTAY. Те, що залишається",
      bullets: ["Деякі місця неможливо пояснити. Їх можна тільки відчути"],
      speakers: [
        {
          name: "Ігор Ільчишен",
          description: "Девелопер, підприємець та інвестор із понад 21-річним досвідом, засновник девелоперсько-інвестиційної компанії ARHA Group, ювелірного бренду «Kimberli»",
        },
        rohozha,
        {
          name: "Любомир Левицький",
          description:
            "Український кінорежисер, сценарист і продюсер. Досвід зйомок у Карпатах, робота з ландшафтом, атмосферою та місцевими легендами. Як кінематографічна історія пробуджує інтерес до місця",
        },
        {
          name: "Володимир Козюк",
          description:
            "Народний художник України. Художній задум «Легенд Карпат», майбутня галерея PÓTAY та знайомство з Карпатами через живопис. Як залучати гостей до мистецтва й творчості",
        },
      ],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "14:30 - 14:40",
      title: "Вітальне слово",
      speakers: [{ name: "Максим Леванець", description: "Власник компанії LUMOF" }],
    },
  },
  {
    kind: "entry",
    entry: {
      time: "14:40 - 15:30",
      title: "Майстер-клас від народного художника України Володимира Козюка у поєднанні з мистецькою програмою",
    },
  },
  {
    kind: "entry",
    entry: { time: "15:00 - 15:30", title: "Музичний виступ гурту «Запал» — фіналістів шоу «Україна має талант»" },
  },
  { kind: "bar", label: "Виїзд до скелі Соколине Око", tone: "dark", time: "15:30 - 16:40" },
  {
    kind: "entry",
    entry: {
      time: "16:40 - 20:00",
      title: "Вечір у Карпатах — урочище Лужки",
      bullets: [
        "Атмосферне афтепаті біля вогнища з буковинською гастрономією у форматі «Буковинське частування»",
        "Кулуарний нетворкінг у неформальній атмосфері",
        "Майстер-клас гри на трембіті та виступ запальних «Троїстих музик»",
        "Вечір, що поєднає карпатську гостинність, музику та живе спілкування",
      ],
    },
  },
  { kind: "bar", label: "Виїзд до Чернівців", tone: "dark", time: "20:00 - 21:00", marginBottom: 40 },
];

const day2Chnu: ProgramListBlock[] = [
  {
    kind: "entry",
    entry: {
      time: "10:00 - 11:00",
      title: "Про життя. Військове й економічне. Недільний сніданок-Vorstellung з Павлом Шереметою",
      bullets: [
        "«Бакара». Без сцени, слайдів і рядів крісел — лише один спільний стіл, кава, сніданок і розмова",
        "Павло Шеремета розповість про себе, про те, що змінилося в його житті за останні роки, і про те, як сьогодні він дивиться на бізнес, економіку та Україну",
        "Далі — розмова без заготовлених запитань: кожен гість зможе поставити своє питання чи долучитися до дискусії",
        "Кількість місць обмежена, участь просимо підтвердити заздалегідь: https://forms.gle/mjATmk26jye19wH3A",
      ],
    },
  },
  { kind: "bar", label: "ПЕРША ЧАСТИНА", tone: "accent" },
  { kind: "entry", entry: { time: "11:00 - 11:40", title: "Екскурсія Чернівецьким Національним університетом імені Юрія Федьковича" } },
  {
    kind: "entry",
    entry: {
      time: "12:00 - 13:30",
      title: "Творче руйнування: як створити нову економіку України",
      speakers: [
        { role: moderator, ...datsiv },
        {
          name: "Павло Шеремета",
          description: "Економіст, управлінець, ексміністр економічного розвитку і торгівлі, засновник Києво-Могилянської бізнес-школи та співзасновник Schumpeter School of Innovation",
        },
        { name: "Борис Шестопалов", description: "Співзасновник і CEO HD-group" },
        {
          name: "Руслан Білоскурський",
          description: "Ректор ЧНУ, доктор економічних наук, професор і співзасновник Шумпетерівської школи інновацій",
        },
        klichuk,
        { name: "Ірина Ткачук", description: "Начальниця Управління освіти Чернівецької міської ради, докторка наук та професорка" },
      ],
    },
  },
  { kind: "bar", label: "Кава та нетворкінг", tone: "dark", time: "13:30 - 14:00", marginBottom: 40 },
];

const variants: Record<ProgramKey, ProgramVariant> = {
  "day1-main": { key: "day1-main", day: "day1", stage: "main", tags: [], blocks: day1Main },
  "day1-side": { key: "day1-side", day: "day1", stage: "side", tags: [], blocks: day1Side },
  "day2-vyzhnytsia": { key: "day2-vyzhnytsia", day: "day2", stage: "vyzhnytsia", tags: [], blocks: day2Vyzhnytsia },
  "day2-chnu": { key: "day2-chnu", day: "day2", stage: "chnu", tags: [], blocks: day2Chnu },
};

export const PROGRAM_DICTIONARY: ProgramDictionary = {
  breadcrumbHome: "Головна",
  breadcrumbCurrent: "Програма",
  dayLabel: "День",
  stageLabel: "Сцена",
  pendingSpeakers: "спікери в процесі",
  tierNotice: {
    day2: { label: "Лише для категорії Premium та VIP", cta: "Підняти категорію квитка" },
  },
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
