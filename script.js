
// 1. Запрашиваем разрешение на уведомления при загрузке страницы
if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    Notification.requestPermission();
}

// 2. Расписание приёмов пищи
const mealSchedule = [
    { time: "08:00", title: "Завтрак", message: "Пора есть! Омлет с овощами уже ждёт." },
    { time: "13:00", title: "Обед", message: "Время обеда: Фарш с перцем и рисом." },
    { time: "15:00", title: "Полдник", message: "Перерыв на полдник: Куриное филе с овощами." },
    { time: "18:00", title: "Ужин", message: "Финальный приём пищи: Творог с бананом." }
];

// 3. Функция отправки уведомления
function sendMealNotification(title, message) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: message,
            icon: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png' // Иконка тарелки с вилкой и ножом
        });
    }
}

// 4. Функция проверки времени
function checkMealTime() {
    const now = new Date();
    
    // Получаем часы и минуты в формате "00"
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    // Ищем совпадение с расписанием
    const currentMeal = mealSchedule.find(meal => meal.time === currentTime);

    if (currentMeal) {
        sendMealNotification(currentMeal.title, currentMeal.message);
    }
}

// 5. Запуск таймера после полной загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем время сразу при загрузке
    checkMealTime();

    // Затем запускаем проверку каждую минуту (60000 мс)
    setInterval(checkMealTime, 60000);

    console.log("План питания загружен. Система уведомлений активна!");
});