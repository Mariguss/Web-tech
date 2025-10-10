document.addEventListener('DOMContentLoaded', function() {
    const sortedSoup = dishes.filter(dish => dish.category === 'soup')
                            .sort((a, b) => a.name.localeCompare(b.name));
    const sortedMain = dishes.filter(dish => dish.category === 'main_course')
                           .sort((a, b) => a.name.localeCompare(b.name));
    const sortedBeverage = dishes.filter(dish => dish.category === 'beverage')
                               .sort((a, b) => a.name.localeCompare(b.name));

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

    const sections = document.querySelectorAll('main section');
    
    const soupGrid = sections[0].querySelector('.dishes-grid');
    sortedSoup.forEach(soup => soupGrid.appendChild(createDishCard(soup)));

    const mainGrid = sections[1].querySelector('.dishes-grid');
    sortedMain.forEach(mainCourse => mainGrid.appendChild(createDishCard(mainCourse)));

    const beverageGrid = sections[2].querySelector('.dishes-grid');
    sortedBeverage.forEach(beverage => beverageGrid.appendChild(createDishCard(beverage)));
});