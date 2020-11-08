<template >
  <div>
    
    <!-- <form novalidate class="md-layout" @submit.prevent="ajouterRestaurant">
      <label>
        Nom : <input name="nom" type="text" required v-model="nom" />
      </label>
      <label>
        Cuisine :
        <input name="cuisine" type="text" required v-model="cuisine" />
      </label>

      <button>Ajouter</button>
    </form> -->

    <h1>{{ nbRestaurantsTotal }} Restaurants disponibles !</h1>
    
    <p>Page : {{ page }}</p>
    <p>
      Nb de restaurants par page
      <input
        @change="getRestaurantsFromServer()"
        type="range"
        min="5"
        max="10"
        v-model="pagesize"
      />

      {{ pagesize }}
    </p>

    <md-button
      class="md-raised"
      :disabled="page == 0"
      @click="pagePrecedente()"
    >
      Précédent</md-button
    >
    &nbsp;&nbsp;
    <md-button
      class="md-raised"
      :disabled="page == nbPagesTotal"
      @click="pageSuivante()"
    >
      Suivant</md-button
    >
    &nbsp; &nbsp; &nbsp; &nbsp;

    <md-button class="md-raised" @click="gotoDernierePage()"
      >Dern. Page</md-button
    >
    <md-button class="md-raised" @click="gotoPremierePage()"
      >1ère page</md-button
    >

    <!-- <table>
      <tr>
        <th>Nom</th>
        <th>Cuisine</th>
      </tr>
      <tbody>
        <tr
          v-for="(r, index) in restaurants"
          :key="index"
          v-on:click="supprimerRestaurant(r)"
          v-bind:style="{ backgroundColor: getColor(index) }"
          v-bind:class="{ bordureRouge: index === 2 }"
        >
          <td>{{ r.name }}</td>
          <td>{{ r.cuisine }}</td>
        </tr>
      </tbody>
    </table> -->

    
      

    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card>


      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Liste des restaurants</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Cherchez par nom..." v-model="nomRestauRecherche" @input="chercherRestaurants()" />
        </md-field>
      </md-table-toolbar>
      
      <md-table-empty-state
        md-label="Aucun restaurant trouvé !"
        :md-description="`Aucun restaurant trouvé à ce nom '${nomRestauRecherche}' . Vérifiez l'orthographe ou ajoutezle dans la section ci-dessous .`">
        
      </md-table-empty-state>
    

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name" >{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
        <md-table-cell md-label="Ville" md-sort-by="ville">{{ item.borough }}</md-table-cell>
        <md-table-cell md-label="Action" > 
                <router-link  :to="'/restaurant/' + item._id"  tag="md-button" class="md-raised md-primary"> Voir  </router-link> 
                <md-button class="md-raised md-accent"  @click="supprimerRestaurant(item)">Effacer</md-button> </md-table-cell>
        

      </md-table-row>


      
    </md-table>

  
  <form novalidate class="md-layout" @submit.prevent="ajouterRestaurant">
      <md-card >
        <md-card-header>
          <div class="md-title">Ajouter Restaurant</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label >Nom</label>
                <md-input name="nom" type="text" required v-model="nom" />
                
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label >Cuisine</label>
                <md-input name="cuisine" type="text" required v-model="cuisine" />
                
              </md-field>
            </div>
          </div>

        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="sending">Ajouter</md-button>
        </md-card-actions>



      </md-card>
    </form>

  
    

  </div>

  
</template>




<script>
import _ from "lodash";
export default {
  name: "ListeDesRestaurants",


  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 5,
      nbPagesTotal: 0,
      nomRestauRecherche: "",
    };
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
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    chercherRestaurants: _.debounce(function () {
      this.getRestaurantsFromServer();
    }, 300),

    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            //afficheReponsePOST(res);
            console.log(resJS.msg);
            this.msg = resJS.msg;
            this.getRestaurantsFromServer(); //raffraichit la vue
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
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            //afficheReponsePOST(res);
            console.log(resJS.msg);
            this.msg = resJS.msg;
            this.getRestaurantsFromServer(); //raffraichit la vue
          });
        })
        .catch(function (err) {
          console.log(err);
        });
      this.nom = "";
      this.cuisine = "";
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>


  .md-table {
    max-width: 1000px;
    padding: 50px;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    }

  .md-layout {
    max-width: 800px;
    padding: 70px;
    margin-left: auto;
    margin-right: auto;
  }
  
</style>




