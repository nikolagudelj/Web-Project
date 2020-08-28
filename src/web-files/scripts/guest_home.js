let vue = new Vue({
    el :"#vue-apartments",
    data : {
        apartments : [],
        query : "",
        holder : []
    },
    methods : {
        searchApartments : function() {
            if (this.query) {    // Do not query on empty 
                axios.get("http://localhost:8080/WebProject/data/apartments/search/?name=" + this.query)
                    .then(function(response) {
                        if (response.status == 200) {
                            if (vue.holder.length == 0) {
                                vue.holder = vue.apartments;   // Store all the previously downloaded apartments
                                console.log("Storing previous list...");
                            }
                            Vue.set(vue, "apartments", response.data);
                        }
                        else {
                            alert("Couldn't search apartments.")
                        }
                    })
            }
            else {
                if (vue.holder.length > 0){
                    Vue.set(vue, "apartments", vue.holder);
                }
            }
        },
        getApartments : function() {
            axios.get("http://localhost:8080/WebProject/data/apartments/")
                .then(function(response) {
                    if (response.status == 200) {
                        Vue.set(vue, "apartments", response.data)
                    }
                    else {
                        alert("Couldn't load apartments.")
                    }
                })
        },
        goToApartment : function(apartmentID) {
            axios.get("http://localhost:8080/WebProject/data/apartments/" + apartmentID)
                .then(function(response) {
                    if (response.status == 200) {
                        console.log(response.data);
                    }
                    else {
                        alert("Couldn't load apartments.")
                    }
                })
        },
    },
    beforeMount() {
        this.getApartments();
        this.holder = new Array();
    }
});
