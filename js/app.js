const app = new Vue({
    el: '#main',
    data: {
        totalSurprises: 70,
        prices: [],
        showAddPrice: false,
        newPrice: null,
        isUniquePrice: false,
        showSettings: false,
        uniquePrices: []
    },
    created: function() {
        if (localStorage.prices) {
            this.prices = JSON.parse(localStorage.prices);
        }
    },
    methods: {
        showPrice: function(event) {
            if (this.prices.length) {
                const button = event.target;

                if (button.classList.contains('price-btn')) {
                    let value = 0;
                    while (value < 1) {
                        value = Math.floor(Math.random() * (this.prices.length) + 1);
                        const index = value - 1;
                        if (this.prices[index].hasOwnProperty('isUnique') && this.prices[index].isUnique) {
                            if (this.uniquePrices.includes(value)) {
                                value = 0;
                            } else {
                                this.uniquePrices.push(value);
                                button.classList.add('unique');
                            }
                        }
                    }

                    button.classList.remove('price-btn');
                    button.textContent = value;
                }
            }
            return false;
        },
        onEnterNewPrice: function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                this.addPrice();
            } else if (event.keyCode == 27) {
                event.preventDefault();
                this.newPrice = "";
                this.isUniquePrice = false;
                this.showAddPrice = false;
            }
        },
        addPrice: function() {
            if (this.newPrice) {
                const price = {
                    name: this.newPrice,
                    isUnique: this.isUniquePrice
                };

                this.prices.push(price);
                localStorage.prices = JSON.stringify(this.prices);
                this.newPrice = "";
                this.isUniquePrice = false;
                this.$refs.newPrice.focus();
            }
        },
        deletePrice: function(priceIndex) {
            this.prices.splice(priceIndex, 1);
            localStorage.prices = JSON.stringify(this.prices);
        },
        showAddPriceForm: function(show, event) {
            event.preventDefault();
            this.showAddPrice = show;
        },
        onShowSettings: function(show) {
            // this.showSettings = show;
        },
        onSaveSettings: function() {
            this.onShowSettings(false);
        }
    }
});