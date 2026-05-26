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
            icon: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png'
        });
    }
}

// 4. Функция проверки времени
function checkMealTime() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    console.log("Проверка времени:", currentTime);

    const currentMeal = mealSchedule.find(meal => meal.time === currentTime);

    if (currentMeal) {
        sendMealNotification(currentMeal.title, currentMeal.message);
    }
}

// 5. Запуск после клика пользователя (обход ошибки браузера)
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log("Система уведомлений активирована!");
                    checkMealTime();
                    setInterval(checkMealTime, 60000);
                    startBtn.style.display = 'none'; // Скрываем кнопку после активации
                } else {
                    alert("Нужно разрешить уведомления, чтобы это работало!");
                }
            });
        });
    } else {
        console.error("Кнопка с id='startBtn' не найдена в HTML!");
    }
});
