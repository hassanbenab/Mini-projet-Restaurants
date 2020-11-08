

## Fonctionnalités ajoutées :


* Utilisation de composants graphiques vue-material ( table , boutons ) pour : 
- Chercher un resto par son nom (un msg est affiché si aucun resto à ce nom n'existe)
- Chercher un resto par son nom (un msg est affiché si aucun resto à ce nom n'existe)
- Voir les détails d'un resto (Bouton "Voir" qui renvoi vers le component Restaurant.vue)
- Supprimer un resto (Bouton "Supprimer")

* Manipulation des informations issues de la base de données
** method GET pour récupérer et afficher les détails d'un resto
** method POST pour ajouter un resto
** mehod DELETE pour supprimer un resto

* Router VueJS pour naviguer entre components 
** router link qui renvoi vers un autre component

* Ajout de l'API GmapMap pour afficher une carte et utlisation de GmapMarker pour localiser le restaurant sur la carte
** GmapMarker qui utilise les coordonnées gps trouvées dans la base 
