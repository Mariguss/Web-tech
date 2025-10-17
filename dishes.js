const dishes = [
  {
    keyword: "gazpacho",
    name: "Гаспачо",
    price: 195,
    category: "soup",
    count: "350 г",
    image: "images/soups/gazpacho.jpg",
    kind: "veg"
  },
  {
    keyword: "mushroom_soup",
    name: "Грибной суп-пюре",
    price: 185,
    category: "soup",
    count: "330 г",
    image: "images/soups/mushroom_soup.jpg",
    kind: "veg"
  },
  {
    keyword: "norwegian_soup",
    name: "Норвежский суп",
    price: 270,
    category: "soup",
    count: "330 г",
    image: "images/soups/norwegian_soup.jpg",
    kind: "fish"
  },
  {
    keyword: "chicken_soup",
    name: "Куриный суп с лапшой",
    price: 175,
    category: "soup",
    count: "330 мл",
    image: "images/soups/chicken.jpg", // ← существует
    kind: "meat"
  },
  {
    keyword: "ramen",
    name: "Рамен",
    price: 210,
    category: "soup",
    count: "330 мл",
    image: "images/soups/ramen.jpg",
    kind: "meat"
  },
  {
    keyword: "tom_yum",
    name: "Том Ям с креветками",
    price: 365,
    category: "soup",
    count: "330 мл",
    image: "images/soups/tomyum.jpg",
    kind: "fish"
  },

  {
    keyword: "friedpotatoeswithmushrooms1",
    name: "Жареная картошка с грибами",
    price: 150,
    category: "main_course",
    count: "250 г",
    image: "images/main_course/friedpotatoeswithmushrooms1.jpg",
    kind: "veg"
  },
  {
    keyword: "lasagna",
    name: "Лазанья",
    price: 385,
    category: "main_course",
    count: "310 г",
    image: "images/main_course/lasagna.jpg",
    kind: "meat"
  },
  {
    keyword: "chickencutletsandmashedpotatoes",
    name: "Котлеты из курицы с картофельным пюре",
    price: 225,
    category: "main_course",
    count: "280 г",
    image: "images/main_course/chickencutletsandmashedpotatoes.jpg",
    kind: "meat"
  },
  {
    keyword: "shrimppasta",
    name: "Паста с креветками",
    price: 340,
    category: "main_course",
    count: "280 г",
    image: "images/main_course/shrimppasta.jpg",
    kind: "fish"
  },
  {
    keyword: "fishrice",
    name: "Рыбная котлета с рисом и спаржей",
    price: 320,
    category: "main_course",
    count: "270 г",
    image: "images/main_course/fishrice.jpg", // ← существует
    kind: "fish"
  },
  {
    keyword: "pizza",
    name: "Пицца Маргарита",
    price: 290,
    category: "main_course",
    count: "300 г",
    image: "images/main_course/pizza.jpg", // ← существует
    kind: "veg"
  },

  {
    keyword: "applejuice",
    name: "Яблочный сок",
    price: 90,
    category: "beverage",
    count: "300 мл",
    image: "images/beverages/applejuice.jpg",
    kind: "cold"
  },
  {
    keyword: "carrotjuice",
    name: "Морковный сок",
    price: 110,
    category: "beverage",
    count: "300 мл",
    image: "images/beverages/carrotjuice.jpg",
    kind: "cold"
  },
  {
    keyword: "orangejuice",
    name: "Апельсиновый сок",
    price: 120,
    category: "beverage",
    count: "300 мл",
    image: "images/beverages/orangejuice.jpg",
    kind: "cold"
  },
  {
    keyword: "tea",
    name: "Чай",
    price: 60,
    category: "beverage",
    count: "250 мл",
    image: "images/beverages/tea.jpg",
    kind: "hot"
  },
  {
    keyword: "greentea",
    name: "Зелёный чай",
    price: 60,
    category: "beverage",
    count: "250 мл",
    image: "images/beverages/greentea.jpg",
    kind: "hot"
  },
  {
    keyword: "cappuccino",
    name: "Капучино",
    price: 100,
    category: "beverage",
    count: "200 мл",
    image: "images/beverages/cappuccino.jpg",
    kind: "hot"
  },

  {
    keyword: "caesar",
    name: "Цезарь с курицей",
    price: 240,
    category: "salad",
    count: "200 г",
    image: "images/salads_starters/caesar.jpg",
    kind: "meat"
  },
  {
    keyword: "caprese",
    name: "Капрезе",
    price: 210,
    category: "salad",
    count: "180 г",
    image: "images/salads_starters/caprese.jpg",
    kind: "veg"
  },
  {
    keyword: "frenchfries1",
    name: "Фри с соусом",
    price: 160,
    category: "salad",
    count: "150 г",
    image: "images/salads_starters/frenchfries1.jpg",
    kind: "veg"
  },
  {
    keyword: "tunasalad",
    name: "Тунец с овощами",
    price: 290,
    category: "salad",
    count: "150 г",
    image: "images/salads_starters/tunasalad.jpg",
    kind: "fish"
  },
  {
    keyword: "frenchfries2",
    name: "Мини-фри",
    price: 150,
    category: "salad",
    count: "120 г",
    image: "images/salads_starters/frenchfries2.jpg",
    kind: "small"
  },
  {
    keyword: "saladwithegg",
    name: "Салат с яйцом",
    price: 180,
    category: "salad",
    count: "180 г",
    image: "images/salads_starters/saladwithegg.jpg",
    kind: "veg"
  },

  {
    keyword: "chocolatecake",
    name: "Шоколадный торт",
    price: 140,
    category: "dessert",
    count: "100 г",
    image: "images/desserts/chocolatecake.jpg",
    kind: "small"
  },
  {
    keyword: "baklava",
    name: "Пахлава",
    price: 120,
    category: "dessert",
    count: "100 г",
    image: "images/desserts/baklava.jpg",
    kind: "small"
  },
  {
    keyword: "donuts2",
    name: "Пончики с глазурью",
    price: 110,
    category: "dessert",
    count: "130 г",
    image: "images/desserts/donuts2.jpg",
    kind: "small"
  },
  {
    keyword: "checheesecake",
    name: "Чизкейк",
    price: 180,
    category: "dessert",
    count: "180 г",
    image: "images/desserts/checheesecake.jpg",
    kind: "medium"
  },
  {
    keyword: "chocolatecheesecake",
    name: "Шоколадный чизкейк",
    price: 190,
    category: "dessert",
    count: "170 г",
    image: "images/desserts/chocolatecheesecake.jpg",
    kind: "medium"
  },
  {
    keyword: "donuts",
    name: "Пончики",
    price: 220,
    category: "dessert",
    count: "250 г",
    image: "images/desserts/donuts.jpg",
    kind: "large"
  }
];