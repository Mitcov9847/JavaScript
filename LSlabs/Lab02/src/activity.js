export function getRandomActivity() {
    return fetch('https://www.boredapi.com/api/activity/')
        .then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.activity;
        })
}

/**
 * Обновляет текст активности на странице, получая новую активность из функции getRandomActivity.
 */
export function updateActivity() {
    getRandomActivity().then(activity => {
        document.getElementById('activity').textContent = activity;
    });
}

/**
 * Начинает обновление активности каждую минуту.
 * 
 * @async: Указывает, что функция является асинхронной. Асинхронные функции возвращают объект Promise 
 * и могут использовать ключевое слово await для ожидания завершения других асинхронных операций.
* @return {Promise<string>}: Описывает тип возвращаемого значения функции. В данном случае, это обещание (Promise),
 которое разрешается строкой (string).
* @throws {Error}: Указывает, что функция может выбросить исключение (Error).
 Это предупреждение для тех, кто будет использовать эту функцию, что им нужно быть готовыми к обработке ошибок.
 */
export function startUpdatingActivity() {
    updateActivity();
    setTimeout(startUpdatingActivity, 60000);
}