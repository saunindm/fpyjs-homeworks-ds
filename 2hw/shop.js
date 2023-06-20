let goods = {
    1: {
        id: 1,
        name: "Рубашка",
        description: "Зеленая",
        sizes: ["XS", "S", "M"],
        price: 1000,
        available: true,
    },
    2: {
        id: 3,
        name: "Свитер",
        description: "Шерстяной",
        sizes: ["M", "L"],
        price: 1500,
        available: true,
    },
    3: {
        id: 3,
        name: "Джинсы",
        description: "Черные",
        sizes: [40, 42, 44],
        price: 3000,
        available: true,
    },
    4: {
        id: 4,
        name: "Шорты",
        description: "Микрофибра",
        sizes: [36, 38],
        price: 2000,
        available: true,
    },
    5: {
        id: 5,
        name: "Кепка",
        description: "Белая",
        sizes: [52, 53, 54],
        price: 2500,
        available: true,
    }
};

let cart = [
    {
        good: 1, 
        amount: 3,
    },
    {
        good: 4, 
        amount: 1,
    },
]

function addItem(id, amount) {
    cart.push({
        good: id, 
        amount: amount,})
}

function removeItem(id) {
    cart.splice(id, 1)
}

function clearCart() {
    cart.splice(0, cart.length)
}

function getTotal(cart, goods) {
    totalAmount = 0
    totalSumm = 0
    for (i = 0; i < cart.length; i++) {
        totalAmount = totalAmount + cart[i].amount
        totalSumm = totalSumm + goods[cart[i].good].price * cart[i].amount
    }
    total = {
        totalAmount: totalAmount,
        totalSumm: totalSumm,
    }
    return total
}

addItem(4, 3)
addItem(5, 3)
console.log(cart)

console.log(getTotal(cart, goods))

removeItem(cart.length - 1)
console.log(cart)

clearCart()
console.log(cart)