let vue = new Vue({
    el :"#vue-apartment",
    data : {
        apartment : {},
        apartmentLoaded : false
    },
    methods : {
        getApartment : function() {
            let addressBarTokens = window.location.href.split("/");
            let apartmentID = addressBarTokens[addressBarTokens.length-1];

            axios.get("http://localhost:8080/WebProject/data/apartments/" + apartmentID)
                .then(function(response) {
                    if (response.status == 200) {
                        Vue.set(vue, "apartment", response.data);
                        Vue.set(vue, "apartmentLoaded", true);
                        console.log(response.data);
                    }
                })
        },
        activate : function(apartmentID) {
            let requestWrapper = {
                stringKey : apartmentID
            }
            axios.put("http://localhost:8080/WebProject/data/apartments/activate", requestWrapper)
                .then(function(response) {
                    if (response.status == 200) {
                        Vue.set(vue, "apartment", response.data);
                    }
                    else {
                        alert("Failed to activate apartment.");
                    }
                })
        },
        deactivate : function(apartmentID) {
            let requestWrapper = {
                stringKey : apartmentID
            }
            axios.put("http://localhost:8080/WebProject/data/apartments/deactivate", requestWrapper)
                .then(function(response) {
                    if (response.status == 200) {
                        Vue.set(vue, "apartment", response.data);
                    }
                    else {
                        alert("Failed to activate apartment.");
                    }
                })
        }, 
        edit : function() {
            window.location.href = "http://localhost:8080/WebProject/apartments/edit/" + vue.apartment.key;
        }
    },
    beforeMount() {
        this.getApartment();
    }
});
