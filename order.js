document.addEventListener('DOMContentLoaded', function() {
    console.log('Order manager initialized');
    initializeOrderManager();
});

function initializeOrderManager() {
    window.currentOrder = {
    soup: null,
    main_course: null,
    beverage: null,
    salad: null,      
    dessert: null     
    };
    
    console.log('Current order initialized:', window.currentOrder);
    
    document.addEventListener('click', function(e) {
        const dishCard = e.target.closest('.dish');
        if (dishCard) {
            const dishKeyword = dishCard.getAttribute('data-dish');
            console.log('Dish clicked:', dishKeyword);
            addDishToOrder(dishKeyword);
            highlightSelectedDish(dishCard, dishKeyword);
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
            console.log('Form submitted');
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
        { key: 'main_course', name: 'Главное блюдо' },
        { key: 'beverage', name: 'Напиток' },
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
        main_course: null,
        beverage: null
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

    if (soupInput) soupInput.value = window.currentOrder.soup || '';
    if (mainInput) mainInput.value = window.currentOrder.main_course || '';
    if (drinkInput) drinkInput.value = window.currentOrder.beverage || '';
    if (saladInput) saladInput.value = window.currentOrder.salad || '';
    if (dessertInput) dessertInput.value = window.currentOrder.dessert || '';

    let totalPrice = 0;
    if (window.currentOrder.soup) {
        const soup = dishes.find(d => d.keyword === window.currentOrder.soup);
        totalPrice += soup ? soup.price : 0;
    }
    if (window.currentOrder.main_course) {
        const main = dishes.find(d => d.keyword === window.currentOrder.main_course);
        totalPrice += main ? main.price : 0;
    }
    if (window.currentOrder.beverage) {
        const drink = dishes.find(d => d.keyword === window.currentOrder.beverage);
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
    
    console.log('Form data updated for submission');
}