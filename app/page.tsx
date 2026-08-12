"use client";

import { useEffect, useMemo, useState } from "react";

type ScaleId =
  | "horizon"
  | "lens"
  | "impulse"
  | "bridge"
  | "framework"
  | "radar"
  | "workshop"
  | "traction"
  | "trail"
  | "voice"
  | "support"
  | "tuning";

type Option = { text: string; scale: ScaleId };
type Question = { section: string; prompt: string; options: Option[] };

const SCALE_ORDER: ScaleId[] = [
  "horizon",
  "lens",
  "impulse",
  "bridge",
  "framework",
  "radar",
  "workshop",
  "traction",
  "trail",
  "voice",
  "support",
  "tuning",
];

const SCALES: Record<
  ScaleId,
  {
    name: string;
    essence: string;
    strength: string;
    blind: string;
    color: string;
  }
> = {
  horizon: {
    name: "Горизонт",
    essence: "Видеть будущее и задавать направление",
    strength: "Вы соединяете сегодняшний шаг с большой картиной и возвращаете людям смысл движения.",
    blind: "Дальний образ может казаться яснее, чем ближайшие ограничения и скучная операционная работа.",
    color: "#f06445",
  },
  lens: {
    name: "Линза",
    essence: "Исследовать, уточнять и находить опору в фактах",
    strength: "Вы замечаете пробелы в понимании, задаёте точные вопросы и снижаете цену поспешных выводов.",
    blind: "Поиск ещё одного подтверждения иногда откладывает момент, когда уже пора выбирать.",
    color: "#3276c8",
  },
  impulse: {
    name: "Импульс",
    essence: "Запускать движение и превращать намерение в шаг",
    strength: "Вы быстро создаёте энергию старта и помогаете другим выйти из зависания.",
    blind: "Скорость старта может опережать согласование, проверку рисков и готовность команды.",
    color: "#e64968",
  },
  bridge: {
    name: "Мост",
    essence: "Соединять людей, интересы и возможности",
    strength: "Вы видите полезные связи и создаёте сотрудничество там, где раньше были отдельные острова.",
    blind: "Поддерживая связь между всеми, вы можете дольше нужного обходить прямой конфликт.",
    color: "#8d64c8",
  },
  framework: {
    name: "Каркас",
    essence: "Создавать ясную систему из сложного",
    strength: "Вы превращаете хаос в понятные этапы, роли и правила, на которые можно опереться.",
    blind: "Желание выстроить систему иногда делает спонтанный поворот сложнее, чем он есть.",
    color: "#4f6b70",
  },
  radar: {
    name: "Радар",
    essence: "Считывать атмосферу и невысказанные сигналы",
    strength: "Вы рано замечаете эмоциональные сдвиги и понимаете, что происходит между строк.",
    blind: "Чувствительность к атмосфере может заставлять принимать чужое напряжение на свой счёт.",
    color: "#1d9a88",
  },
  workshop: {
    name: "Мастерская",
    essence: "Придавать идеям оригинальную форму",
    strength: "Вы думаете через создание и умеете превращать абстрактное в живой, отличимый результат.",
    blind: "Интерес к новой форме может увести от доработки уже достаточно хорошего решения.",
    color: "#da8b19",
  },
  traction: {
    name: "Тяга",
    essence: "Держать темп и доводить до результата",
    strength: "Вы создаёте надёжность: берёте ответственность, выдерживаете длинную дистанцию и закрываете цикл.",
    blind: "Привычка тянуть нагрузку может скрывать усталость и мешать вовремя пересмотреть саму цель.",
    color: "#364e9c",
  },
  trail: {
    name: "Тропа",
    essence: "Искать новые маршруты через эксперимент",
    strength: "Вы спокойно входите в неизвестность и обнаруживаете варианты, которые нельзя увидеть из инструкции.",
    blind: "Новизна может притягивать сильнее, чем повторение, необходимое для устойчивого результата.",
    color: "#5c9d42",
  },
  voice: {
    name: "Голос",
    essence: "Находить точные слова и увлекать смыслом",
    strength: "Вы делаете сложное понятным, собираете внимание и помогаете идее быть услышанной.",
    blind: "Сильная формулировка иногда звучит убедительнее, чем позволяет глубина её проверки.",
    color: "#c04d97",
  },
  support: {
    name: "Опора",
    essence: "Создавать безопасность и помогать расти",
    strength: "Рядом с вами людям проще восстановиться, попросить о помощи и сделать следующий честный шаг.",
    blind: "Забота о чужой устойчивости может незаметно отодвигать ваши собственные границы.",
    color: "#b16b47",
  },
  tuning: {
    name: "Камертон",
    essence: "Чувствовать качество и удерживать стандарт",
    strength: "Вы замечаете несостыковки, защищаете целостность и поднимаете качество финального результата.",
    blind: "Высокая планка может усложнять выпуск черновика и делать несовершенство слишком заметным.",
    color: "#697689",
  },
};

const QUESTIONS: Question[] = [
  {
    section: "Старт",
    prompt: "Вам дают полную свободу начать новый проект. Что вы делаете первым?",
    options: [
      { text: "Формулирую образ результата, к которому хочется прийти", scale: "horizon" },
      { text: "Собираю материалы и выясняю, что уже известно", scale: "lens" },
      { text: "Задаю этапы, роли и основные ограничения", scale: "framework" },
      { text: "Пробую самый неизвестный кусок на практике", scale: "trail" },
    ],
  },
  {
    section: "Старт",
    prompt: "На встрече разговор заходит в тупик. Ваша естественная реакция?",
    options: [
      { text: "Уточнить факты и отделить предположения", scale: "lens" },
      { text: "Предложить один шаг, который можно сделать прямо сейчас", scale: "impulse" },
      { text: "Назвать напряжение, о котором все молчат", scale: "radar" },
      { text: "Переформулировать суть так, чтобы она снова стала ясной", scale: "voice" },
    ],
  },
  {
    section: "Старт",
    prompt: "Коллега приносит вам очень сырую идею. Что хочется сделать?",
    options: [
      { text: "Помочь запустить первый тест без лишних обсуждений", scale: "impulse" },
      { text: "Познакомить с теми, кто может идею усилить", scale: "bridge" },
      { text: "Быстро превратить идею в прототип", scale: "workshop" },
      { text: "Спросить, какая поддержка сейчас действительно нужна", scale: "support" },
    ],
  },
  {
    section: "Старт",
    prompt: "До важного дедлайна неделя, а работы всё ещё много. Вы скорее…",
    options: [
      { text: "Синхронизирую людей и убираю разрывы между ними", scale: "bridge" },
      { text: "Пересобираю план и критический путь", scale: "framework" },
      { text: "Беру на себя ключевой объём и держу темп", scale: "traction" },
      { text: "Определяю, какое качество нельзя потерять даже в спешке", scale: "tuning" },
    ],
  },
  {
    section: "Старт",
    prompt: "Вы оказались в незнакомом городе на один день. Как выберете маршрут?",
    options: [
      { text: "Соберу логичный маршрут, чтобы всё успеть", scale: "framework" },
      { text: "Пойду туда, где чувствуется нужная атмосфера", scale: "radar" },
      { text: "Сверну в район, о котором почти ничего не знаю", scale: "trail" },
      { text: "Выберу место, которое обещает сильное воспоминание", scale: "horizon" },
    ],
  },
  {
    section: "Старт",
    prompt: "После сильной лекции вы чаще всего…",
    options: [
      { text: "Помню интонации и реакцию зала", scale: "radar" },
      { text: "Хочу сделать на основе услышанного что-то своё", scale: "workshop" },
      { text: "Пересказываю главную мысль кому-то ещё", scale: "voice" },
      { text: "Проверяю источники и иду глубже в тему", scale: "lens" },
    ],
  },
  {
    section: "Старт",
    prompt: "Команда устала и потеряла энергию. Что у вас получается естественно?",
    options: [
      { text: "Предложить новый формат работы, который оживит процесс", scale: "workshop" },
      { text: "Закрыть накопившиеся задачи и вернуть ощущение прогресса", scale: "traction" },
      { text: "Снять часть нагрузки и дать людям восстановиться", scale: "support" },
      { text: "Запустить короткий рывок с видимым результатом", scale: "impulse" },
    ],
  },
  {
    section: "Старт",
    prompt: "Какую роль в новом деле вы выберете без долгих раздумий?",
    options: [
      { text: "Того, кто удерживает темп и завершает", scale: "traction" },
      { text: "Того, кто проверяет неизведанные маршруты", scale: "trail" },
      { text: "Того, кто отвечает за целостность и уровень", scale: "tuning" },
      { text: "Того, кто собирает нужных людей вместе", scale: "bridge" },
    ],
  },
  {
    section: "Фокус",
    prompt: "Планы внезапно меняются. Что помогает вам быстрее всего?",
    options: [
      { text: "Увидеть в изменении новый маршрут", scale: "trail" },
      { text: "Объяснить всем новую ситуацию простыми словами", scale: "voice" },
      { text: "Пересобрать образ того, куда мы теперь идём", scale: "horizon" },
      { text: "Обновить систему, сроки и зависимости", scale: "framework" },
    ],
  },
  {
    section: "Фокус",
    prompt: "Нужно договориться со сложным человеком. На что вы опираетесь?",
    options: [
      { text: "Нахожу фразу, которая точно называет суть", scale: "voice" },
      { text: "Даю человеку достаточно времени и уважения", scale: "support" },
      { text: "Наблюдаю, что подтверждает его позицию", scale: "lens" },
      { text: "Считываю, что именно его задевает", scale: "radar" },
    ],
  },
  {
    section: "Фокус",
    prompt: "Результат почти готов. Ваш главный рефлекс?",
    options: [
      { text: "Проверить, всем ли участникам хватает опоры", scale: "support" },
      { text: "Довести детали до единого стандарта", scale: "tuning" },
      { text: "Выпустить сейчас и собирать живую реакцию", scale: "impulse" },
      { text: "Добавить деталь, которая сделает вещь отличимой", scale: "workshop" },
    ],
  },
  {
    section: "Фокус",
    prompt: "Что сильнее всего возвращает вам спокойствие в сложном проекте?",
    options: [
      { text: "Понимание, что всё сделано добротно", scale: "tuning" },
      { text: "Ясность общего направления", scale: "horizon" },
      { text: "Люди, с которыми можно разделить задачу", scale: "bridge" },
      { text: "Несколько уже закрытых пунктов", scale: "traction" },
    ],
  },
  {
    section: "Фокус",
    prompt: "Новая идея приходит вам поздно ночью. Что вы фиксируете?",
    options: [
      { text: "Почему эта идея может быть важна в будущем", scale: "horizon" },
      { text: "Самый маленький шаг, который запустит её завтра", scale: "impulse" },
      { text: "Телесное ощущение и эмоциональный отклик", scale: "radar" },
      { text: "Одну фразу, в которой идея начинает жить", scale: "voice" },
    ],
  },
  {
    section: "Фокус",
    prompt: "Вы впервые попали в новую группу. Что делаете вначале?",
    options: [
      { text: "Наблюдаю, кто что знает и как устроена группа", scale: "lens" },
      { text: "Знакомлю между собой людей с общими интересами", scale: "bridge" },
      { text: "Предлагаю совместное действие, чтобы быстрее освоиться", scale: "workshop" },
      { text: "Создаю ощущение, что здесь можно быть собой", scale: "support" },
    ],
  },
  {
    section: "Фокус",
    prompt: "Вам прислали хаотичный запрос без ясного результата. Вы…",
    options: [
      { text: "Уточняю ближайшее действие и начинаю с него", scale: "impulse" },
      { text: "Собираю из запроса бриф, рамки и этапы", scale: "framework" },
      { text: "Беру самый трудный кусок и продвигаю его", scale: "traction" },
      { text: "Определяю, по каким признакам результат будет хорошим", scale: "tuning" },
    ],
  },
  {
    section: "Люди",
    prompt: "Между двумя коллегами возник конфликт. Ваш первый ход?",
    options: [
      { text: "Организовать прямой разговор и восстановить связь", scale: "bridge" },
      { text: "Понять, какие чувства стоят за позициями", scale: "radar" },
      { text: "Найти третий вариант, который ещё не обсуждали", scale: "trail" },
      { text: "Вернуть разговор к общей цели", scale: "horizon" },
    ],
  },
  {
    section: "Люди",
    prompt: "Появился свободный час без обязательств. К чему тянет?",
    options: [
      { text: "Навести порядок в заметках или процессах", scale: "framework" },
      { text: "Сделать маленький эскиз, текст или прототип", scale: "workshop" },
      { text: "Записать мысль, которой хочется поделиться", scale: "voice" },
      { text: "Разобраться в теме, которую давно откладывал(а)", scale: "lens" },
    ],
  },
  {
    section: "Люди",
    prompt: "Решение нужно принять, но полной ясности нет. Вы скорее…",
    options: [
      { text: "Проверю внутреннюю реакцию на каждый вариант", scale: "radar" },
      { text: "Выберу и возьму ответственность за движение", scale: "traction" },
      { text: "Подумаю, как решение повлияет на людей", scale: "support" },
      { text: "Запущу быстрый тест, который даст обратную связь", scale: "impulse" },
    ],
  },
  {
    section: "Люди",
    prompt: "Вы читаете книгу, которая вас захватила. Что происходит дальше?",
    options: [
      { text: "Превращаю заметки в собственный материал", scale: "workshop" },
      { text: "Ухожу по неожиданной ссылке в соседнюю тему", scale: "trail" },
      { text: "Разбираю, насколько стройно выстроены аргументы", scale: "tuning" },
      { text: "Ищу человека, с которым можно это обсудить", scale: "bridge" },
    ],
  },
  {
    section: "Люди",
    prompt: "На большом публичном событии вы чаще всего…",
    options: [
      { text: "Помогаю делу случиться и подхватываю задачи", scale: "traction" },
      { text: "Включаюсь в разговор или беру слово", scale: "voice" },
      { text: "Замечаю возможность, которая шире самого события", scale: "horizon" },
      { text: "Слежу, чтобы части программы работали вместе", scale: "framework" },
    ],
  },
  {
    section: "Люди",
    prompt: "Клиент говорит: «Это не то», но не может объяснить почему. Вы…",
    options: [
      { text: "Предлагаю радикально другой вариант для сравнения", scale: "trail" },
      { text: "Спокойно спрашиваю, что именно его разочаровало", scale: "support" },
      { text: "Уточняю примеры и наблюдаемые критерии", scale: "lens" },
      { text: "Слушаю интонацию и ищу невысказанную причину", scale: "radar" },
    ],
  },
  {
    section: "Люди",
    prompt: "Как вы обычно объясняете сложную тему?",
    options: [
      { text: "Нахожу метафору или историю", scale: "voice" },
      { text: "Подбираю самые точные определения", scale: "tuning" },
      { text: "Сразу показываю в живом действии", scale: "impulse" },
      { text: "Рисую модель или собираю наглядный пример", scale: "workshop" },
    ],
  },
  {
    section: "Решения",
    prompt: "Близкий человек начинает амбициозный проект. Чем вы полезнее всего?",
    options: [
      { text: "Даю устойчивую эмоциональную и практическую поддержку", scale: "support" },
      { text: "Помогаю увидеть, во что проект может вырасти", scale: "horizon" },
      { text: "Знакомлю с нужными людьми", scale: "bridge" },
      { text: "Помогаю дойти до первой важной отметки", scale: "traction" },
    ],
  },
  {
    section: "Решения",
    prompt: "Какая неделя кажется вам особенно удачной?",
    options: [
      { text: "Та, где получилось сделать что-то действительно хорошо", scale: "tuning" },
      { text: "Та, где я узнал(а) нечто меняющее понимание", scale: "lens" },
      { text: "Та, где всё работало чётко и без хаоса", scale: "framework" },
      { text: "Та, где случилось новое и непредсказуемое", scale: "trail" },
    ],
  },
  {
    section: "Решения",
    prompt: "Нужно выбрать между двумя хорошими предложениями. Что перевесит?",
    options: [
      { text: "Какой путь сильнее меняет мою долгую траекторию", scale: "horizon" },
      { text: "С какими людьми и средой я буду связан(а)", scale: "bridge" },
      { text: "Где я смогу больше создавать своими руками и головой", scale: "workshop" },
      { text: "Где будет достаточно устойчивости и заботы о себе", scale: "support" },
    ],
  },
  {
    section: "Решения",
    prompt: "Команда планирует следующий месяц. Ваш вклад?",
    options: [
      { text: "Принести данные и проверить исходные допущения", scale: "lens" },
      { text: "Разложить зависимости и последовательность", scale: "framework" },
      { text: "Закрепить конкретные обязательства и сроки", scale: "traction" },
      { text: "Согласовать стандарт, ниже которого не опускаемся", scale: "tuning" },
    ],
  },
  {
    section: "Решения",
    prompt: "Важный процесс надолго завис. Ваш естественный способ сдвинуть его?",
    options: [
      { text: "Создать движение любым маленьким действием", scale: "impulse" },
      { text: "Почувствовать, какая скрытая причина тормозит людей", scale: "radar" },
      { text: "Сменить маршрут и попробовать обходной путь", scale: "trail" },
      { text: "Использовать паузу, чтобы точнее выбрать направление", scale: "horizon" },
    ],
  },
  {
    section: "Решения",
    prompt: "Перед вами запутанный документ, написанный несколькими людьми. Вы…",
    options: [
      { text: "Собираю авторов вокруг общей версии", scale: "bridge" },
      { text: "Полностью переизобретаю подачу", scale: "workshop" },
      { text: "Переписываю так, чтобы мысль легко читалась", scale: "voice" },
      { text: "Проверяю факты, ссылки и логические опоры", scale: "lens" },
    ],
  },
  {
    section: "Неопределённость",
    prompt: "Вы хотите закрепить новую привычку. На что поставите?",
    options: [
      { text: "На понятный ритуал и место в расписании", scale: "framework" },
      { text: "На непрерывную серию маленьких выполнений", scale: "traction" },
      { text: "На человека, с которым можно поддерживать друг друга", scale: "support" },
      { text: "На первый очень маленький шаг уже сегодня", scale: "impulse" },
    ],
  },
  {
    section: "Неопределённость",
    prompt: "Вы получили обратную связь, которая задела. Что делаете сначала?",
    options: [
      { text: "Разбираюсь со своей эмоциональной реакцией", scale: "radar" },
      { text: "Проверяю совет через новый эксперимент", scale: "trail" },
      { text: "Извлекаю точный критерий, который можно улучшить", scale: "tuning" },
      { text: "Прошу собеседника уточнить смысл в разговоре", scale: "bridge" },
    ],
  },
  {
    section: "Неопределённость",
    prompt: "Перед вами чистый лист. С чего легче начать?",
    options: [
      { text: "Сделать первый черновой объект", scale: "workshop" },
      { text: "Придумать название или ведущую фразу", scale: "voice" },
      { text: "Определить, ради чего всё это", scale: "horizon" },
      { text: "Задать сетку, структуру или формат", scale: "framework" },
    ],
  },
  {
    section: "Неопределённость",
    prompt: "После успешного командного проекта что радует сильнее?",
    options: [
      { text: "Измеримый результат, до которого мы дошли", scale: "traction" },
      { text: "То, как выросли и раскрылись люди", scale: "support" },
      { text: "Новые выводы, которые теперь можно использовать", scale: "lens" },
      { text: "Живая атмосфера, которую мы создали", scale: "radar" },
    ],
  },
  {
    section: "Неопределённость",
    prompt: "Вы планируете короткое путешествие. Что звучит привлекательнее?",
    options: [
      { text: "Оставить пространство и решать по ходу", scale: "trail" },
      { text: "Собрать небольшой, но безупречный маршрут", scale: "tuning" },
      { text: "Быстро купить билет, пока желание живо", scale: "impulse" },
      { text: "Придумать творческий способ сохранить впечатления", scale: "workshop" },
    ],
  },
  {
    section: "Неопределённость",
    prompt: "Вам предстоит важная презентация. На чём строите её силу?",
    options: [
      { text: "На истории, которую легко запомнить", scale: "voice" },
      { text: "На картине возможности, которую увидят слушатели", scale: "horizon" },
      { text: "На точном понимании интересов всех сторон", scale: "bridge" },
      { text: "На ясном следующем действии в финале", scale: "traction" },
    ],
  },
  {
    section: "Неопределённость",
    prompt: "Кто-то в команде допустил заметную ошибку. Ваша первая мысль?",
    options: [
      { text: "Как помочь человеку восстановиться и научиться", scale: "support" },
      { text: "Что было настоящей причиной ошибки", scale: "lens" },
      { text: "Как изменить процесс, чтобы это не повторялось", scale: "framework" },
      { text: "Не открылся ли из-за ошибки неожиданный вариант", scale: "trail" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Идей стало слишком много. Как вы выбираете одну?",
    options: [
      { text: "Отсекаю всё, что не проходит мой стандарт качества", scale: "tuning" },
      { text: "Беру ту, которую можно запустить прямо сейчас", scale: "impulse" },
      { text: "Слушаю, где чувствуется больше живой энергии", scale: "radar" },
      { text: "Рассказываю идеи вслух и слышу, какая звучит", scale: "voice" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Начинается новый квартал. Что задаёт вам рабочий тон?",
    options: [
      { text: "Сильная тема и образ периода", scale: "horizon" },
      { text: "Понятная система целей и обзоров", scale: "framework" },
      { text: "Конкретный результат, который нужно получить", scale: "traction" },
      { text: "Чёткая планка того, что будет считаться хорошей работой", scale: "tuning" },
    ],
  },
  {
    section: "Ритм",
    prompt: "У вас появился новый цифровой инструмент. Как вы его осваиваете?",
    options: [
      { text: "Читаю документацию и сравниваю возможности", scale: "lens" },
      { text: "Замечаю, насколько удобно и естественно с ним работать", scale: "radar" },
      { text: "Нажимаю всё подряд и исследую границы", scale: "trail" },
      { text: "Сразу представляю, что теперь станет возможным", scale: "horizon" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Группа молчит и ждёт, что кто-то начнёт. Вы скорее…",
    options: [
      { text: "Сделаю первый ход, чтобы снять неподвижность", scale: "impulse" },
      { text: "Предложу короткое совместное упражнение", scale: "workshop" },
      { text: "Задам вопрос, на который хочется ответить", scale: "voice" },
      { text: "Уточню, какой информации всем не хватает", scale: "lens" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Друг сомневается, стоит ли начинать важное дело. Вы…",
    options: [
      { text: "Помогаю увидеть людей и ресурсы вокруг него", scale: "bridge" },
      { text: "Составляю вместе три ближайших шага", scale: "traction" },
      { text: "Остаюсь рядом, не торопя его решение", scale: "support" },
      { text: "Предлагаю проверить идею за ближайшие сутки", scale: "impulse" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Вы проектируете сложный сервис. Что замечаете раньше?",
    options: [
      { text: "Архитектуру частей и переходов", scale: "framework" },
      { text: "Неочевидные сценарии и крайние случаи", scale: "trail" },
      { text: "Несовпадения и детали, снижающие качество", scale: "tuning" },
      { text: "Связи и ожидания разных участников", scale: "bridge" },
    ],
  },
  {
    section: "Ритм",
    prompt: "После трудного проекта вам важно…",
    options: [
      { text: "Понять, какие эмоции он оставил", scale: "radar" },
      { text: "Сложить опыт в историю, которой можно поделиться", scale: "voice" },
      { text: "Встроить опыт в дальнейшую траекторию", scale: "horizon" },
      { text: "Провести разбор и обновить рабочую систему", scale: "framework" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Вы ведёте групповое обсуждение. За чем следите больше всего?",
    options: [
      { text: "Чтобы мысли превращались в общую наглядную модель", scale: "workshop" },
      { text: "Чтобы тихие участники тоже получили пространство", scale: "support" },
      { text: "Чтобы выводы опирались на реальные данные", scale: "lens" },
      { text: "Чтобы энергия группы не исчезала", scale: "radar" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Дедлайн внезапно перенесли на более ранний срок. Вы…",
    options: [
      { text: "Собираю фокус и веду задачу к завершению", scale: "traction" },
      { text: "Защищаю несколько критичных параметров качества", scale: "tuning" },
      { text: "Немедленно начинаю с того, что можно сдвинуть", scale: "impulse" },
      { text: "Творчески сокращаю объём, сохраняя идею", scale: "workshop" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Как выглядит ваш идеальный свободный выходной?",
    options: [
      { text: "Поехать туда, где я ещё не был(а)", scale: "trail" },
      { text: "Подумать о будущем и настроить курс", scale: "horizon" },
      { text: "Провести время с людьми, которых хочется соединить", scale: "bridge" },
      { text: "Наконец завершить что-то давно отложенное", scale: "traction" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Идее нужно получить поддержку других. Что вы усиливаете?",
    options: [
      { text: "Формулировку, которая останется в памяти", scale: "voice" },
      { text: "Доказательства и проверяемые основания", scale: "lens" },
      { text: "Последовательный и реалистичный план", scale: "framework" },
      { text: "Неожиданную демонстрацию вместо привычной подачи", scale: "trail" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Вы видите, что коллега перегружен, хотя он это отрицает. Вы…",
    options: [
      { text: "Предлагаю конкретную помощь без давления", scale: "support" },
      { text: "Убираю один блокер прямо сейчас", scale: "impulse" },
      { text: "Мягко называю то, что замечаю между строк", scale: "radar" },
      { text: "Помогаю ему сформулировать границы для других", scale: "voice" },
    ],
  },
  {
    section: "Ритм",
    prompt: "Перед публикацией важной работы вы в последний раз…",
    options: [
      { text: "Проверяю целостность и убираю слабые места", scale: "tuning" },
      { text: "Прошу взгляд человека с другой перспективой", scale: "bridge" },
      { text: "Добавляю одну авторскую деталь", scale: "workshop" },
      { text: "Проверяю, как результат будет чувствоваться аудитории", scale: "support" },
    ],
  },
];

const STORAGE_KEY = "hos-beta-progress-v1";
const optionLetters = ["A", "B", "C", "D"];

function calculateProfile(answers: Record<number, number>) {
  const scores = Object.fromEntries(SCALE_ORDER.map((id) => [id, 0])) as Record<ScaleId, number>;
  QUESTIONS.forEach((question, index) => {
    const answer = answers[index];
    if (answer !== undefined) scores[question.options[answer].scale] += 1;
  });

  const values = Object.values(scores);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return SCALE_ORDER.map((id) => {
    const relative = max === min ? 72 : 54 + ((scores[id] - min) / (max - min)) * 42;
    return { id, score: scores[id], percent: Math.round(relative), ...SCALES[id] };
  }).sort((a, b) => b.score - a.score || SCALE_ORDER.indexOf(a.id) - SCALE_ORDER.indexOf(b.id));
}

export default function Home() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "results">("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [notice, setNotice] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { answers?: Record<number, number>; current?: number };
        setAnswers(parsed.answers ?? {});
        setCurrent(Math.min(parsed.current ?? 0, QUESTIONS.length - 1));
      }
    } catch {
      // A private browser session can disable storage; the test still works.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, current }));
    } catch {
      // Keep the in-memory session when storage is unavailable.
    }
  }, [answers, current, ready]);

  useEffect(() => {
    if (screen !== "quiz") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (["1", "2", "3", "4"].includes(event.key)) {
        setAnswers((previous) => ({ ...previous, [current]: Number(event.key) - 1 }));
      }
      if (event.key === "ArrowLeft" && current > 0) setCurrent((value) => value - 1);
      if (event.key === "ArrowRight" && answers[current] !== undefined) {
        if (current === QUESTIONS.length - 1) setScreen("results");
        else setCurrent((value) => value + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [screen, current, answers]);

  const profile = useMemo(() => calculateProfile(answers), [answers]);
  const answeredCount = Object.keys(answers).length;
  const question = QUESTIONS[current];

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  };

  const shareTest = async () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    const shareData = {
      title: "Human Operating System — beta",
      text: "48 ситуаций, чтобы увидеть свой естественный способ думать, действовать и быть с людьми.",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showNotice("Ссылка готова к отправке");
      } else {
        await navigator.clipboard.writeText(url);
        showNotice("Ссылка скопирована");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") showNotice("Не удалось скопировать ссылку");
    }
  };

  const copyProfile = async () => {
    const top = profile.slice(0, 5);
    const text = [
      "Мой профиль Human Operating System (beta)",
      ...top.map((item, index) => `${index + 1}. ${item.name} — ${item.percent}%`),
      "",
      `${window.location.origin}${window.location.pathname}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      showNotice("Профиль скопирован");
    } catch {
      showNotice("Не удалось скопировать профиль");
    }
  };

  const resetTest = () => {
    setAnswers({});
    setCurrent(0);
    setScreen("intro");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing else to reset.
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goForward = () => {
    if (answers[current] === undefined) return;
    if (current === QUESTIONS.length - 1) {
      setScreen("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrent((value) => value + 1);
    }
  };

  return (
    <main className={`app-shell screen-${screen}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <button className="brand" onClick={() => setScreen("intro")} aria-label="На главную">
          <span className="brand-mark">H/OS</span>
          <span className="brand-beta">beta</span>
        </button>
        <button className="share-button" onClick={shareTest}>
          <span aria-hidden="true">↗</span>
          Поделиться тестом
        </button>
      </header>

      {screen === "intro" && (
        <section className="intro" aria-labelledby="intro-title">
          <div className="eyebrow">Авторская диагностика · 12 шкал</div>
          <h1 id="intro-title">
            Как работает
            <br />ваша внутренняя система?
          </h1>
          <p className="intro-copy">
            48 жизненных ситуаций покажут, как вы естественно думаете, запускаете дела,
            создаёте и взаимодействуете с людьми.
          </p>

          <div className="intro-actions">
            <button
              className="primary-button"
              onClick={() => {
                setScreen(answeredCount === QUESTIONS.length ? "results" : "quiz");
                window.scrollTo({ top: 0 });
              }}
            >
              {answeredCount === QUESTIONS.length
                ? "Посмотреть мой профиль"
                : answeredCount > 0
                  ? `Продолжить · ${answeredCount}/48`
                  : "Начать тест"}
              <span aria-hidden="true">→</span>
            </button>
            <span className="time-note">≈ 9 минут · без регистрации</span>
          </div>

          <div className="intro-grid">
            <article>
              <span>01</span>
              <h2>Выбирайте честно</h2>
              <p>Не идеальный образ себя, а вариант, который чаще проявляется в реальности.</p>
            </article>
            <article>
              <span>02</span>
              <h2>Доверяйте первому отклику</h2>
              <p>Здесь нет правильных ответов. Важен ваш естественный приоритет.</p>
            </article>
            <article>
              <span>03</span>
              <h2>Получите карту</h2>
              <p>В конце — 12 шкал, ведущая комбинация, сильные стороны и слепые зоны.</p>
            </article>
          </div>

          <p className="beta-note">
            H/OS — самостоятельная beta-модель для саморефлексии, не клинический и не
            психометрически валидированный тест.
          </p>
        </section>
      )}

      {screen === "quiz" && (
        <section className="quiz" aria-live="polite">
          <div className="progress-row">
            <span>{question.section}</span>
            <span>
              {String(current + 1).padStart(2, "0")} / {QUESTIONS.length}
            </span>
          </div>
          <div className="progress-track" aria-label={`Вопрос ${current + 1} из ${QUESTIONS.length}`}>
            <div style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }} />
          </div>

          <div className="question-card" key={current}>
            <p className="question-kicker">Что больше похоже на вас?</p>
            <h1>{question.prompt}</h1>
            <div className="options" role="group" aria-label="Варианты ответа">
              {question.options.map((option, index) => {
                const selected = answers[current] === index;
                return (
                  <button
                    key={option.text}
                    className={`option ${selected ? "selected" : ""}`}
                    onClick={() => setAnswers((previous) => ({ ...previous, [current]: index }))}
                    aria-pressed={selected}
                  >
                    <span className="option-letter">{optionLetters[index]}</span>
                    <span>{option.text}</span>
                    <span className="option-check" aria-hidden="true">✓</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="quiz-nav">
            <button
              className="back-button"
              onClick={() => setCurrent((value) => Math.max(0, value - 1))}
              disabled={current === 0}
            >
              ← Назад
            </button>
            <span className="keyboard-note">Клавиши 1–4</span>
            <button className="next-button" onClick={goForward} disabled={answers[current] === undefined}>
              {current === QUESTIONS.length - 1 ? "Увидеть профиль" : "Дальше"} →
            </button>
          </div>
        </section>
      )}

      {screen === "results" && (
        <section className="results" aria-labelledby="results-title">
          <div className="results-hero">
            <p className="eyebrow">Ваш ведущий паттерн</p>
            <h1 id="results-title">
              {profile[0].name} <span>×</span> {profile[1].name}
            </h1>
            <p>
              Ваша система сильнее всего опирается на «{profile[0].essence.toLowerCase()}» и
              «{profile[1].essence.toLowerCase()}». Вместе они задают ваш естественный способ
              входить в задачи и усиливать результат.
            </p>
            <div className="results-actions">
              <button className="primary-button" onClick={copyProfile}>Скопировать профиль</button>
              <button className="secondary-button" onClick={shareTest}>Пригласить друга ↗</button>
            </div>
          </div>

          <div className="top-profile">
            <div className="section-heading">
              <p>Ваши ведущие способы</p>
              <span>TOP 5</span>
            </div>
            {profile.slice(0, 5).map((item, index) => (
              <article className="profile-row" key={item.id}>
                <span className="profile-rank">{String(index + 1).padStart(2, "0")}</span>
                <div className="profile-main">
                  <div className="profile-title-line">
                    <h2>{item.name}</h2>
                    <strong>{item.percent}%</strong>
                  </div>
                  <p>{item.essence}</p>
                  <div className="result-track"><div style={{ width: `${item.percent}%`, background: item.color }} /></div>
                </div>
              </article>
            ))}
          </div>

          <div className="interpretation-grid">
            <article className="interpretation-card strength-card">
              <p className="card-label">Что вас усиливает</p>
              <h2>Сильные стороны</h2>
              <ul>
                {profile.slice(0, 3).map((item) => <li key={item.id}>{item.strength}</li>)}
              </ul>
            </article>
            <article className="interpretation-card blind-card">
              <p className="card-label">На что смотреть внимательнее</p>
              <h2>Слепые зоны</h2>
              <ul>
                {profile.slice(0, 3).map((item) => <li key={item.id}>{item.blind}</li>)}
              </ul>
            </article>
          </div>

          <div className="all-scales">
            <div className="section-heading">
              <p>Полная карта</p>
              <span>12 шкал</span>
            </div>
            <div className="scale-grid">
              {profile.map((item) => (
                <article key={item.id}>
                  <div>
                    <span className="scale-dot" style={{ background: item.color }} />
                    <h3>{item.name}</h3>
                    <strong>{item.percent}%</strong>
                  </div>
                  <p>{item.essence}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="result-note">
            <p>
              Проценты — относительная выраженность шкал внутри вашего профиля. Они помогают
              сравнить ваши собственные паттерны между собой, а не оценить вас по внешней норме.
            </p>
            <button onClick={resetTest}>Пройти заново</button>
          </div>
        </section>
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
