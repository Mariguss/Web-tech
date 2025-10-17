document.addEventListener('DOMContentLoaded', function() {
    const sortedSoup = dishes.filter(dish => dish.category === 'soup')
                            .sort((a, b) => a.name.localeCompare(b.name));
    const sortedMain = dishes.filter(dish => dish.category === 'main_course')
                           .sort((a, b) => a.name.localeCompare(b.name));
    const sortedBeverage = dishes.filter(dish => dish.category === 'beverage')
                               .sort((a, b) => a.name.localeCompare(b.name));
    const sortedSalad = dishes.filter(dish => dish.category === 'salad')
                         .sort((a, b) => a.name.localeCompare(b.name));
    const sortedDessert = dishes.filter(dish => dish.category === 'dessert')
                           .sort((a, b) => a.name.localeCompare(b.name));
    
    function createDishCard(dish) {
        const dishElement = document.createElement('div');
        dishElement.setAttribute('data-kind', dish.kind);
        dishElement.className = 'dish';
        dishElement.setAttribute('data-dish', dish.keyword);
        dishElement.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" class="dishes-img">
            <p>${dish.price}</p>
            <p class="dish-name">${dish.name}</p>
            <p class="dish-weight">${dish.count}</p>
            <button class="add-button">Добавить</button>
        `;
        return dishElement;
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

    const sections = document.querySelectorAll('main section');
    
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

    setupFilters();
});