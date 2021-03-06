let vue = new Vue({
    el :"#vue-reviews",
    data : {
        reviews : [],
        apartment : undefined,
        apartmentLoaded : false,
        reviewsLoaded : false,
        apartmentImage : ""
    },
    methods : {
        getReviews : function() {
            let tokens = window.location.href.split("/");
            let apartmentID = tokens[tokens.length-1]

            axios.get("/WebProject/data/reviews/" + apartmentID)
                .then(response => {
                    if (response.status === 200) {
                        Vue.set(vue, "reviews", response.data);
                        vue.reviewsLoaded = true;
                    }
                })
                .catch (error => {
                    alert(error.response.data)
                })
        },
        getApartment : function() {
            let tokens = window.location.href.split("/");
            let apartmentID = tokens[tokens.length-1]

            axios.get("/WebProject/data/apartments/" + apartmentID)
                .then(response => {
                    if (response.status === 200) {
                        response.data.rating = Math.round(response.data.rating * 100)/100
                        Vue.set(vue, "apartment", response.data);
                        vue.apartmentLoaded = true;

                        vue.getImage(response.data.mainImage)
                            .then(response => {
                                if (response.data) {
                                    vue.apartmentImage = response.data.base64_string
                                }
                            })
                    }
                })
                .catch (error => {
                    console.log(error);
                })
        },
        getImage : function(imageID) {
            return axios.get("/WebProject/data/images/" + imageID)
        },
        hide : function(reviewID, index) {
            let wrapper = {
                stringKey : reviewID
            }
            axios.post("/WebProject/data/reviews/hide", wrapper)
                .then(response => {
                    if (response.status == 200) {
                        vue.reviews[index].visibleToGuests = false;
                    }
                })
                .catch(error => {
                    alert(error.response.data)
                })
        },
        show : function(reviewID, index) {
            let wrapper = {
                stringKey : reviewID
            }
            axios.post("/WebProject/data/reviews/show", wrapper)
                .then(response => {
                    if (response.status == 200) {
                        vue.reviews[index].visibleToGuests = true;
                    }
                })
                .catch(error => {
                    alert(error.response.data)
                })
        }
    },
    beforeMount() {
        this.getReviews();
        this.getApartment();
    }
});
