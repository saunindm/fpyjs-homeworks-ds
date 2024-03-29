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
        let result = this.#goods;

        if (this.filter) {
            result = this.#goods.filter(good => this.filter.test(good.name));
        }

        if ((this.sortPrice) && (this.sortDir)) {
            result = result.sort((good1, good2) => good1.price > good2.price ? 1 : -1);
        }
        
        else if ((this.sortPrice) && (!this.sortDir)) {
            result = result.sort((good1, good2) => good1.price > good2.price ? -1 : 1);
        }
        
        return result;
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
        if (this.goods.find((element) => element.id === good.id)) {
            return (this.goods[
            this.goods.findIndex((element) => element.id === good.id)
            ].amount += amount);
        } 
        else {
            let basketGood = new BasketGood(
                good.id,
                good.name,
                good.description,
                good.sizes,
                good.price,
                good.available,
                amount
            );
            return this.goods.push(basketGood);
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

    update(good) { // Выполняет обновление данных о товаре в корзине после изменения данных о товарах в каталоге
        const i = this.goods.findIndex((element) => element.id === good.id);
        if (i >= 0) {
            let updatedGood = new BasketGood(
                this.goods[i].id = good.id,
                this.goods[i].name = good.name,
                this.goods[i].description = good.description,
                this.goods[i].sizes = good.sizes,
                this.goods[i].price = good.price,
                this.goods[i].available = good.available,
                this.goods[i].amount
            )
            this.goods.splice(i, 1, updatedGood);
        }
        else {
            console.log('Nothing to update');
        }
    }

    clear() { // Очищает содержимое корзины
        this.goods.splice(0, this.goods.length);
    }

    removeUnavailable() { // Удаляет из корзины товары, имеющие признак available === false (использовать filter())  
        return (this.goods = this.goods.filter((good) => good.available === true));
    }
}

const good1 = new Good (1, "Рубашка", "Зеленая", ["XS", "S", "M"], 1000, true);
const good2 = new Good (2, "Свитер", "Мужской", ["L", "XL"], 1500, true);
const good3 = new Good (3, "Джинсы", "Черные", ["M", "L"], 1500, false);
const good4 = new Good (4, "Свитер", "Детский", ["XS", "S"], 1000, true);
const good5 = new Good (5, "Свитер", "Женский", ["M", "L"], 2500, true);

const goodsList = new GoodsList([]);

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

const basket = new Basket([]);

basket.add(good1, 3);
basket.add(good2, 5);
basket.add(good3, 2);
basket.add(good3, 4);
basket.add(good4, 1);

console.log(`Товары в корзине:`, basket);
console.log(`Общее количество товаров:`, basket.totalSum);
console.log(`Общая стоимость товаров:`, basket.totalAmount);

basket.remove(good3, 6);
basket.remove(good2, 4);

console.log(`Товары в корзине:`, basket);
console.log(`Общее количество товаров:`, basket.totalSum);
console.log(`Общая стоимость товаров:`, basket.totalAmount);

good1.setAvailable(false);
good4.setAvailable(false);
good2.price = 2000;

basket.update(good1);
basket.update(good4);
basket.update(good2);

basket.removeUnavailable();
console.log(`Доступные товары:`, basket);

basket.update(good1);

basket.clear();
console.log(`Товары в корзине:`, basket);