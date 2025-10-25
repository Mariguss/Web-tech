document.addEventListener('DOMContentLoaded', function() {
    console.log('Order manager initialized');
    initializeOrderManager();
});

function initializeOrderManager() {
    window.currentOrder = {
    soup: null,
    "main-course": null,
    drink: null,
    salad: null,      
    dessert: null     
    };
    
    console.log('Current order initialized:', window.currentOrder);
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-button')){
            const dishCard = e.target.closest('.dish');
            if (dishCard) {
                const dishKeyword = dishCard.getAttribute('data-dish');
                console.log('Dish clicked:', dishKeyword);
                addDishToOrder(dishKeyword);
                highlightSelectedDish(dishCard, dishKeyword);
            }
        }
    });
    
    const resetButton = document.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            console.log('Reset button clicked');
            resetOrder();
        });
    }
    
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
        const notification = getNotificationMessage();
        // Проверяем: если сообщение — это ошибка
        if (!notification.text.includes('корректно')) {
            e.preventDefault();
            showNotification(notification);
            return;
        }
        updateFormData();
    });
    }
    
    updateOrderDisplay();
}

function highlightSelectedDish(selectedCard, dishKeyword) {
    const dish = dishes.find(d => d.keyword === dishKeyword);
    if (!dish) return;
    
    const section = selectedCard.closest('section');
    
    const allCardsInSection = section.querySelectorAll('.dish');
    allCardsInSection.forEach(card => {
        card.classList.remove('selected');
    });
    
    selectedCard.classList.add('selected');
    console.log('Highlighted dish:', dishKeyword);
}

function addDishToOrder(dishKeyword) {
    const dish = dishes.find(d => d.keyword === dishKeyword);
    if (!dish) {
        console.error('Dish not found:', dishKeyword);
        return;
    }
    
    const category = dish.category;
    window.currentOrder[category] = dish.keyword;
    
    console.log('Order updated:', window.currentOrder);
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const categories = [
        { key: 'soup', name: 'Суп' },
        { key: 'main-course', name: 'Главное блюдо' },
        { key: 'drink', name: 'Напиток' },
        { key: 'salad', name: 'Салат или стартер' },  
        { key: 'dessert', name: 'Десерт' }       
    ];
    
    let totalPrice = 0;
    
    const orderContainer = document.querySelector('.form-column:first-child');
    let orderDisplay = orderContainer.querySelector('#order-display');
    
    if (!orderDisplay) {
        console.error('Order display container not found');
        return;
    }
    
    let orderHTML = '';
    
    categories.forEach(category => {
        const dishKeyword = window.currentOrder[category.key];
        const dish = dishKeyword ? dishes.find(d => d.keyword === dishKeyword) : null;
        
        orderHTML += `
            <div class="form-group" style="margin: 40px 0;">
                <strong style="font-size: 1.7rem; color: #000000ff; display: block; margin-bottom: 20px;">${category.name}</strong>
        `;
        
        if (dish) {
            orderHTML += `<span style="font-size: 1.3rem; display: block; margin-top: 10px;">${dish.name} ${dish.price}Р</span>`;
            totalPrice += dish.price;
        } else {
            orderHTML += `<span style="font-size: 1.3rem; color: #000000ff; display: block; margin-top: 10px;">Не выбрано</span>`;
        }
        
        orderHTML += `</div>`;
    });
    
    orderHTML += `
        <div class="form-group" style="margin: 50px 0 30px 0; padding-top: 30px; border-top: 2px solid #000000cf;">
            <strong style="font-size: 1.7rem; color: #000000ff; display: block; margin-bottom: 20px;">Стоимость заказа</strong>
            <span style="font-size: 1.3rem; font-weight: bold; display: block; margin-top: 10px;">${totalPrice}Р</span>
        </div>
    `;
    
    orderDisplay.innerHTML = orderHTML;
    
    console.log('Order display updated, total:', totalPrice);
}

function resetOrder() {
    window.currentOrder = {
        soup: null,
        "main-course": null,
        drink: null,
        salad: null,      // ← добавлено
        dessert: null     // ← добавлено
    };
    
    const allCards = document.querySelectorAll('.dish');
    allCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    console.log('Order reset');
    updateOrderDisplay();
}

function updateFormData() {
    const soupInput = document.getElementById('selected-soup');
    const mainInput = document.getElementById('selected-main-course');
    const drinkInput = document.getElementById('selected-drink');
    const totalInput = document.getElementById('total-price');
    const saladInput = document.getElementById('selected-salad');
    const dessertInput = document.getElementById('selected-dessert');

    // Используем те же ключи, что и в currentOrder: 'main-course', 'drink'
    if (soupInput) soupInput.value = window.currentOrder.soup || '';
    if (mainInput) mainInput.value = window.currentOrder['main-course'] || '';
    if (drinkInput) drinkInput.value = window.currentOrder.drink || '';
    if (saladInput) saladInput.value = window.currentOrder.salad || '';
    if (dessertInput) dessertInput.value = window.currentOrder.dessert || '';

    let totalPrice = 0;
    if (window.currentOrder.soup) {
        const soup = dishes.find(d => d.keyword === window.currentOrder.soup);
        totalPrice += soup ? soup.price : 0;
    }
    if (window.currentOrder['main-course']) {
        const main = dishes.find(d => d.keyword === window.currentOrder['main-course']);
        totalPrice += main ? main.price : 0;
    }
    if (window.currentOrder.drink) {
        const drink = dishes.find(d => d.keyword === window.currentOrder.drink);
        totalPrice += drink ? drink.price : 0;
    }
    if (window.currentOrder.salad) {
        const salad = dishes.find(d => d.keyword === window.currentOrder.salad);
        totalPrice += salad ? salad.price : 0;
    }
    if (window.currentOrder.dessert) {
        const dessert = dishes.find(d => d.keyword === window.currentOrder.dessert);
        totalPrice += dessert ? dessert.price : 0;
    }
    if (totalInput) totalInput.value = totalPrice;
}

function showNotification(notificationData) {
    const { text, icon } = notificationData;

    const existing = document.getElementById('notification-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'notification-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const container = document.createElement('div');
    container.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 400px;
        font-family: Arial, sans-serif;
    `;

    // Иконка + текст
    const content = document.createElement('div');
    content.innerHTML = `<span style="font-size: 2rem; margin-right: 10px;">${icon}</span><span style="font-size: 18px; line-height: 1.5;">${text}</span>`;
    content.style.cssText = `display: flex; align-items: center; justify-content: center; margin-bottom: 20px;`;

    const button = document.createElement('button');
    button.textContent = 'Окей 👌';
    button.style.cssText = `
        padding: 10px 20px;
        background: #f1f1f1;
        border: 2px solid #ddd;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s ease;
    `;

    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#e9f7ef';
        button.style.borderColor = '#4CAF50';
        button.style.color = '#28a745';
    });

    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#f1f1f1';
        button.style.borderColor = '#ddd';
        button.style.color = 'black';
    });

    button.addEventListener('click', () => overlay.remove());

    container.appendChild(content);
    container.appendChild(button);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
}

function checkMissingDishes() {
    const order = window.currentOrder;
    // Только ОБЯЗАТЕЛЬНЫЕ категории (согласно ТЗ и сайту)
    const required = ['soup', 'main-course', 'drink'];
    return required.filter(cat => !order[cat]);
}

function getNotificationMessage() {
    const { soup, 'main-course': main_course, drink, salad, dessert } = window.currentOrder;
    
    const hasSoup = !!soup;
    const hasMain = !!main_course;
    const hasSalad = !!salad;
    const hasBeverage = !!drink;
    const hasDessert = !!dessert;
    const hasMainDish = hasSoup || hasMain || hasSalad;

    // 1. Ничего не выбрано
    if (!hasMainDish && !hasBeverage && !hasDessert) {
        return { text: 'Ничего не выбрано. Выберите блюда для заказа', icon: '🍽️' };
    }

    // 2. Только напиток
    if (!hasMainDish && hasBeverage && !hasDessert) {
        return { text: 'Выберите суп или главное блюдо', icon: '🍲' };
    }

    // 3. Только суп
    if (hasSoup && !hasMain && !hasSalad && !hasBeverage && !hasDessert) {
        return { text: 'Выберите главное блюдо/салат/стартер', icon: '🥗' };
    }

    // 4. Только главное блюдо или салат (без супа и напитка)
    if ((hasMain || hasSalad) && !hasSoup && !hasBeverage && !hasDessert) {
        return { text: 'Выберите суп или главное блюдо', icon: '🍜' };
    }

    // 5. Есть основные блюда, но нет напитка
    if (hasMainDish && !hasBeverage) {
        return { text: 'Выберите напиток', icon: '🥤' };
    }

    // 6. Только десерт (с напитком или без, но без основного блюда)
    if (!hasMainDish && hasDessert) {
        return { text: 'Выберите главное блюдо', icon: '🍛' };
    }

    // Если всё выбрано корректно — не должно вызываться
    return { text: 'Заказ заполнен корректно', icon: '✅' };
}