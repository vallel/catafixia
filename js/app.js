const app = new Vue({
    el: '#main',
    data: {
        totalSurprises: 70,
        prices: [],
        showAddPrice: false,
        newPrice: null,
        showSettings: false
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
                    button.classList.remove('price-btn');

                    const rand = Math.random();
                    const value = Math.round(rand * (this.prices.length - 1) + 1);

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
                this.showAddPrice = false;
            }
        },
        addPrice: function() {
            if (this.newPrice) {
                this.prices.push(this.newPrice);
                localStorage.prices = JSON.stringify(this.prices);
                this.newPrice = "";
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