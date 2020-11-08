window.onload = init;

function init() {
    new Vue({



        el: "#app",
        data: {
            restaurants: [],
            nom: '',
            cuisine: '',
            nbRestaurantsTotal: 0,
            page: 0,
            pagesize: 10,
            nbPagesTotal: 0,
            nomRestauRecherche: "",
        },

        mounted() {
            console.log("AVANT L'AFFICHAGE");
            this.getRestaurantsFromServer();

        },
        methods: {
            pagePrecedente() {
                if (this.page === 0) return;
                this.page--;
                this.getRestaurantsFromServer();

            },
            pageSuivante() {
                if (this.page === this.nbPagesTotal) return;
                this.page++;
                this.getRestaurantsFromServer();

            },

            gotoDernierePage() {
                this.page = this.nbPagesTotal;
                this.getRestaurantsFromServer();
            },
            gotoPremierePage() {
                this.page = 0;
                this.getRestaurantsFromServer();
            },
            getRestaurantsFromServer() {
                let url = "http://localhost:8080/api/restaurants?";
                url += "page=" + this.page;
                url += "&pagesize=" + this.pagesize;
                url += "&name=" + this.nomRestauRecherche;


                fetch(url)
                    .then((responseJSON) => {
                        responseJSON.json().then((resJS) => {
                            // Maintenant resJS est un vrai objet JavaScript

                            this.restaurants = resJS.data;
                            this.nbRestaurantsTotal = resJS.count;
                            this.nbPagesTotal = Math.round(this.nbRestaurantsTotal / this.pagesize);

                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },

            chercherRestaurants:
                _.debounce(function () {
                    this.getRestaurantsFromServer();

                }, 300),

            supprimerRestaurant(r) {
                let url = "http://localhost:8080/api/restaurants/" + r._id;

                fetch(url, {
                    method: "DELETE",
                   
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((resJS) => {

                                // Maintenant res est un vrai objet JavaScript
                                //afficheReponsePOST(res);
                                console.log(resJS.msg);
                                this.msg = resJS.msg ;
                                this.getRestaurantsFromServer();  //raffraichit la vue
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            ajouterRestaurant(event) {
                // eviter le comportement par defaut
                //event.preventDefault();

                // Récupération du formulaire. Pas besoin de document.querySelector
                // ou document.getElementById puisque c'est le formulaire qui a généré
                // l'événement
                let form = event.target;

                // Récupération des valeurs des champs du formulaire
                // en prévision d'un envoi multipart en ajax/fetch
                let donneesFormulaire = new FormData(form);

                let url = "http://localhost:8080/api/restaurants";

                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((resJS) => {

                                // Maintenant res est un vrai objet JavaScript
                                //afficheReponsePOST(res);
                                console.log(resJS.msg);
                                this.msg = resJS.msg ;
                                this.getRestaurantsFromServer();  //raffraichit la vue
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                this.nom = "";
                this.cuisine = "";
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            }
        }

    })
}
