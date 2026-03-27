### Remarques importantes
La conversion fichier → binaire → base64 n’est pas fiable, privilégier plutôt fichier → base64 directement.

Après la compilation de l’app, l’accès au documentDirectory est restreint, il est préférable d’utiliser le cacheDirectory.

- Monter le menu pour éviter la colision avec le menu natif du téléphone => <SafeAreaView>



### ✅ Terminé (Done)

- Lecture du Qr - Code
- Enregistrer dans une base sqlite
- Modifier le stock via sql
- Envoi du stock par email
- Intégration d'un carousel au niveau du QR et du home
- Initialisation de la db dès qu'on arrive sur l'app
- Correction de l'envoi par mail 
- Rendre l'ui plus agréable
- Monter le menu pour éviter la colision avec le menu natif du téléphone
- Supprime avec Delete All -drop la table ? 
- Soigner l'architecture du logiciel
- Ajout d’une barre de recherche



### 🔄 En test
- Modifié les colonnes d'envoie du fichier Excel (Validité : Validé, Unité référence : Unités ou kilogrammes)




### 🛠️ En cours
- Message SQLITE dès la création d'un nouvel objet


### 📌 À faire

- Etiquettes trop longues débordent sur les cases (standardiser la taille des cards)
- Prendre en charge les accents circonflexes lors de la lecture du qr code
- Partie Inventaire Logo - tirage par Alphabétisation OF, Référence , Désignation, Date
- Obligation de quitter l'app puis de revenir pour lançer l'email.
