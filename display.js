document.addEventListener('DOMContentLoaded', function () {
    // Загружаем данные и обрабатываем их АСИНХРОННО
    loadDishes()
        .then(dishes => {
            window.dishes = dishes;
            const sortedSoup = dishes.filter(dish => dish.category === 'soup')
                                    .sort((a, b) => a.name.localeCompare(b.name));
            const sortedMain = dishes.filter(dish => dish.category === 'main-course')
                                   .sort((a, b) => a.name.localeCompare(b.name));
            const sortedBeverage = dishes.filter(dish => dish.category === 'drink')
                                       .sort((a, b) => a.name.localeCompare(b.name));
            const sortedSalad = dishes.filter(dish => dish.category === 'salad')
                                 .sort((a, b) => a.name.localeCompare(b.name));
            const sortedDessert = dishes.filter(dish => dish.category === 'dessert')
                                   .sort((a, b) => a.name.localeCompare(b.name));

            function createDishCard(dish) {
                // Убираем пробелы из URL изображения (на всякий случай)
                const cleanImage = dish.image.trim();
                const dishElement = document.createElement('div');
                dishElement.setAttribute('data-kind', dish.kind);
                dishElement.className = 'dish';

                dishElement.setAttribute('data-category', dish.category);

                dishElement.setAttribute('data-dish', dish.keyword);
                dishElement.innerHTML = `
                    <img src="${cleanImage}" alt="${dish.name}" class="dishes-img">
                    <p>${dish.price}</p>
                    <p class="dish-name">${dish.name}</p>
                    <p class="dish-weight">${dish.count}</p>
                    <button class="add-button">Добавить</button>
                `;
                return dishElement;
            }

            const sections = document.querySelectorAll('main section');
            if (sections.length < 5) {
                console.error('Не найдены все 5 секций в <main>');
                return;
            }

            const soupGrid = sections[0].querySelector('.dishes-grid');
            sortedSoup.forEach(soup => soupGrid.appendChild(createDishCard(soup)));

            const mainGrid = sections[1].querySelector('.dishes-grid');
            sortedMain.forEach(mainCourse => mainGrid.appendChild(createDishCard(mainCourse)));

            const beverageGrid = sections[2].querySelector('.dishes-grid');
            sortedBeverage.forEach(beverage => beverageGrid.appendChild(createDishCard(beverage)));

            const saladGrid = sections[3].querySelector('.dishes-grid');
            sortedSalad.forEach(salad => saladGrid.appendChild(createDishCard(salad)));

            const dessertGrid = sections[4].querySelector('.dishes-grid');
            sortedDessert.forEach(dessert => dessertGrid.appendChild(createDishCard(dessert)));

            initializeOrderSystem(dishes);
            setupFilters();
        })
        .catch(error => {
            console.error("Ошибка при загрузке меню:", error);
            alert("Не удалось загрузить меню. Проверьте консоль.");
        });

    async function loadDishes() { //будет загружать данные о доступных блюдах при помощи запроса к API

        const URL_API = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";
        const response = await fetch(URL_API);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        return await response.json();
    }

// Функция для фильтрации блюд по категории
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.closest('.category-section')?.dataset.category || 
                        btn.closest('section')?.dataset.category;
            
            if (!category) return;

            // Обновить активную кнопку
            const filterButtons = btn.parentElement.querySelectorAll('.filter-btn');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const kind = btn.dataset.kind;

            // Получить все карточки в текущей категории
            const dishCards = document.querySelectorAll(`[data-category="${category}"] .dish`);

            dishCards.forEach(card => {
                if (kind === 'all' || card.dataset.kind === kind) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
});