class Good { // класс для хранения данных о товаре
    constructor(id, name, description, sizes, price, available) {
        this.id = id; // Код товара
        this.name = name; // Наименование
        this.description = description; // Описание
        this.sizes = sizes; // массив возможных размеров
        this.price = price; // цена товара
        this.available = available; // Признак доступности для продажи
    }

    setAvailable(status) { // изменение признака доступности для продажи
        this.available = status;
    }
}

class GoodsList { // класс для хранения каталога товаров
    
    #goods; 

    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods; // массив экземпляров объектов класса Good (приватное поле)
        this.filter = filter; // регулярное выражение используемое для фильтрации товаров по полю name
        this.sortPrice = sortPrice; // булево значение, признак включения сортировки по полю Price
        this.sortDir = sortDir; // булево значение, признак направления сортировки по полю Price (true - по возрастанию, false - по убыванию)
    }

    get list() { // возвращает массив доступных для продажи товаров в соответствии с установленным фильтром и сортировкой по полю Price
        if (this.filter) {
            const result = this.#goods.filter(good => this.filter.test(good.name));
            if ((this.sortPrice) && (this.sortDir)) {
                const resultSort = result.sort((good1, good2) => good1.price > good2.price ? 1 : -1);
                return(resultSort);
            }
            if ((this.sortPrice) && (!this.sortDir)) {
                const resultSort = result.sort((good1, good2) => good1.price > good2.price ? -1 : 1);
                return(resultSort);
            }
            return(result);
        }

        if ((!this.filter) && (!this.sortPrice)) {
            return this.#goods;
        }

        if ((this.sortPrice) && (this.sortDir)) {
            const result = this.#goods.sort((good1, good2) => good1.price > good2.price ? 1 : -1);
            return(result);
        }
        
        else if ((this.sortPrice) && (!this.sortDir)) {
            const result = this.#goods.sort((good1, good2) => good1.price > good2.price ? -1 : 1);
            return(result);
        }
    }

    add(newGood) { // добавление товара в каталог
        this.#goods.push(newGood);
    }

    remove(id) { // удаление товара из каталога по его id
        let i;
        for (i = 0; i < this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                this.#goods.splice(i, 1);
            }
        }
    }
}

class BasketGood extends Good { // класс дочерний от Good, для хранения данных о товаре в корзине c дополнительным свойством
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount; // количество товара в корзине
    }
}

class Basket { // класс для хранения данных о корзине товаров
    constructor(goods) {
        this.goods = goods; // массив объектов класса BasketGood для хранения данных о товарах в корзине
    }

    get totalAmount() { // возвращает общую стоимость товаров в корзине
        const result = this.goods.reduce((acc, good) => acc + good.price * good.amount, 0);
        return result;
    }

    get totalSum() { // возвращает общее количество товаров в корзине
        const result = this.goods.reduce((acc, good) => acc + good.amount, 0);
        return result;
    }

    add(good, amount) { // Добавляет товар в корзину, если товар уже есть увеличивает количество
        let contains = false;
        if (this.goods.length != 0) { 
            let i;
            for (i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id === good.id) {
                    this.goods[i].amount = this.goods[i].amount + amount;
                    contains = true;
                }
            }
        }
        if (((this.goods.length != 0) && (contains === false)) || (this.goods.length === 0)) {
            this.goods.push(good);
            good.amount = amount;
        }
    }

    remove(good, amount) { // Уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется
        let i;
        for (i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                if (this.goods[i].amount <= amount) {
                    this.goods.splice(i, 1);
                }
                else {
                    this.goods[i].amount = this.goods[i].amount - amount;
                }
            }
        }
    }

    clear() { // Очищает содержимое корзины
        this.goods.splice(0, this.goods.length);
    }

    removeUnavailable() { // Удаляет из корзины товары, имеющие признак available === false (использовать filter())  
        const unvailableGoods = this.goods.filter(good => good.available === false)
        this.goods = this.goods.filter(obj => !unvailableGoods.some(obj1 => obj.available === obj1.available));
    }
}

const good1 = new Good (1, "Рубашка", "Зеленая", ["XS", "S", "M"], 1000, true);
const good2 = new Good (2, "Свитер", "Мужской", ["L", "XL"], 1500, true);
const good3 = new Good (3, "Джинсы", "Черные", ["M", "L"], 1500, false);
const good4 = new Good (4, "Свитер", "Детский", ["XS", "S"], 1000, true);
const good5 = new Good (5, "Свитер", "Женский", ["M", "L"], 2500, true);

const goodsList = new GoodsList([]);

const basket = new Basket([]);

console.log(good3);

good3.setAvailable(true);

console.log(good3);

goodsList.add(good1);
goodsList.add(good2);
goodsList.add(good3);
goodsList.add(good4);
goodsList.add(good5);

console.log(goodsList.list);

const filteredGoodsList = new GoodsList(goodsList.list, /тер/);
console.log(`Отфильтрованный список по ключу ${filteredGoodsList.filter} :`, filteredGoodsList.list);

const sortedGoodsList1 = new GoodsList(goodsList.list, undefined, true, true);
console.log(`Отсортированный список по цене по возрастанию:`, sortedGoodsList1.list);

const sortedGoodsList2 = new GoodsList(goodsList.list, undefined, true, false);
console.log(`Отсортированный список по цене по убыванию:`, sortedGoodsList2.list);

const sortedAndFilteredGoodsList = new GoodsList(goodsList.list, /тер/, true, true);
console.log(`Отфильтрованный список по ключу ${sortedAndFilteredGoodsList.filter} + отсортированный по возрастанию:`, sortedAndFilteredGoodsList.list);

const sortedAndFilteredGoodsList1 = new GoodsList(goodsList.list, /тер/, true, false);
console.log(`Отфильтрованный список по ключу ${sortedAndFilteredGoodsList1.filter} + отсортированный по убыванию:`, sortedAndFilteredGoodsList1.list);

goodsList.remove(1);

console.log(goodsList.list);

const basketGood1 = new BasketGood(good1.id, good1.name, good1.description, good1.sizes, good1.price, good1.available);
const basketGood2 = new BasketGood(good2.id, good2.name, good2.description, good2.sizes, good2.price, good2.available);
const basketGood3 = new BasketGood(good3.id, good3.name, good3.description, good3.sizes, good3.price, good3.available);
const basketGood4 = new BasketGood(good4.id, good4.name, good4.description, good4.sizes, good4.price, good4.available);
const basketGood5 = new BasketGood(good5.id, good5.name, good5.description, good5.sizes, good5.price, good5.available);

basket.add(basketGood1, 3);
basket.add(basketGood2, 5);
basket.add(basketGood3, 2);
basket.add(basketGood3, 4);
basket.add(basketGood4, 1);

console.log(basketGood1.amount);

console.log(`Товары в корзине:`, basket);
console.log(`Общее количество товаров:`, basket.totalSum);
console.log(`Общая стоимость товаров:`, basket.totalAmount);

basket.remove(basketGood3, 6);
basket.remove(basketGood2, 4);

console.log(`Товары в корзине:`, basket);
console.log(`Общее количество товаров:`, basket.totalSum);
console.log(`Общая стоимость товаров:`, basket.totalAmount);

basketGood1.setAvailable(false);
basketGood4.setAvailable(false);

basket.removeUnavailable();
console.log(`Доступные товары:`, basket);

basket.clear();
console.log(`Товары в корзине:`, basket);