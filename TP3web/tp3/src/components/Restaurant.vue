<template>
  <div>
    <h1>{{ restaurant.name }}</h1>
    <ul >
      Cuisine : {{ restaurant.cuisine }} <br>
      Ville : {{ restaurant.borough }} <br>
      Adresse : {{ this.adresse }}<br>
      Note : {{ restaurant.grades[0].grade }} | Score : {{ restaurant.grades[0].score }} 
      
    </ul>

    
    <GmapMap class="map"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
      :center="{ lat:40.7, lng:-74 }"
      :zoom="9"
      map-type-id="terrain"
      style="width: 900px; height: 400px"
    >
      <GmapMarker
        v-for="(item, i) in items"
        :key="i"
        :options="item.options"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
    
  </div>
</template>

<script>
export default {
  name: "Restaurant",
  props: {},
  computed: {
    id() {
    console.log('computed');
      return this.$route.params.id;
    },
  },
  

  data: function () {
      console.log('data');
    return {
      restaurant: null,
      items: null,
      adresse:" "
    };
  },

  mounted() {
    console.log("mounted");
    console.log("Avant affichage , on ourra faire un fetch ici ..");
    console.log("Id = " + this.id);
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => {
        console.log(data.restaurant.name);
        this.restaurant = data.restaurant;
        this.adresse += data.restaurant.address.building + " " + data.restaurant.address.street + " " + data.restaurant.address.zipcode
        this.items = [
        { options: { position: { lat: data.restaurant.address.coord[1], lng: data.restaurant.address.coord[0] } } },
        
      ]
      });
  },

  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.map{
  margin-left: auto;
  margin-right: auto;
}
li{
  margin-left: auto;
  margin-right: auto;
}

</style>
