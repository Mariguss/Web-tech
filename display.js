// display.js
document.addEventListener('DOMContentLoaded', function() {
    // Функция для создания карточки блюда
    function createDishCard(dish) {
        const dishElement = document.createElement('div');
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

    // Находим все секции и заполняем их
    const sections = document.querySelectorAll('main section');
    
    // Супы (первая секция)
    const soups = dishes.filter(dish => dish.category === 'soup');
    const soupGrid = sections[0].querySelector('.dishes-grid');
    soups.forEach(soup => {
        soupGrid.appendChild(createDishCard(soup));
    });

    // Главные блюда (вторая секция)
    const mainCourses = dishes.filter(dish => dish.category === 'main_course');
    const mainGrid = sections[1].querySelector('.dishes-grid');
    mainCourses.forEach(mainCourse => {
        mainGrid.appendChild(createDishCard(mainCourse));
    });

    // Напитки (третья секция)
    const beverages = dishes.filter(dish => dish.category === 'beverage');
    const beverageGrid = sections[2].querySelector('.dishes-grid');
    beverages.forEach(beverage => {
        beverageGrid.appendChild(createDishCard(beverage));
    });
});