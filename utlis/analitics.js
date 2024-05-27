
// Карточка центра
export const centerCard = (center) => []?.push({"event": `center-card--${center?.code}`})

// Клик по карточки
export const lessonCard = (subject) => []?.push({"event": `lesson-card--${subject?.code}`})

// Клик по кнопке карточки
export const lessonCardButton = (subject) => []?.push({"event": `lesson-card-button--${subject?.code}`})

// Фильтр урока
export const lessonSubjectCatalogClick = (subjectCode) => []?.push({"event": `lesson-catalog-subject--${subjectCode}`})

// Фильтр центра
export const categoryCenterCatalogClick = (categoryCode) => []?.push({"event": `center-catalog-center--${categoryCode}`})

// Предмет главной страницы
export const mainPageSubjectClick = (subjectCode) => []?.push({"event": `main-page-subject--${subjectCode}`})

// Вид карты
export const mapViewLessons = () => []?.push({"event": `map-view-lessons`})

export const mapPoint = () => []?.push({"event": `map-point`})

// Отправить код
export const sendCode = () => []?.push({"event": `send-code`})

// Войти
export const successLogin = () => []?.push({"event": `success-login`})

// Войти
export const errorLogin = () => []?.push({"event": `error-login`})

// Запись
export const registrationTrial = () => []?.push({"event": `registration-trial`})

// Клик whatsapp
export const whatsappClick = () => []?.push({"event": `whatsapp-click`})

// Клик phone
export const phoneClick = () => []?.push({"event": `phone-click`})

// Выбор группы
export const selectGroupLesson = () => []?.push({"event": `select-group-lesson`})

// Выбор даты пробного
export const selectTrialDateLesson = () => []?.push({"event": `select-trial-date-center`})

// Смотреть еще главная страница
export const paginationMainPage = () => []?.push({"event": `pagination-main-page`})

// Смотреть еще каталог уроки
export const paginationCatalogLessons = () => []?.push({"event": `pagination-catalog-lessons`})

// Смотреть еще каталог центры
export const paginationCatalogCenters = () => []?.push({"event": `pagination-catalog-centers`})