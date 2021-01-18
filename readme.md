# SessionBox

Multi login to website - Cookie Site Isolation with JavaScript

## English



## Français

Les sites internet utilisent généralement les cookies pour enregistrer l'id unique de l'utilisateur qui permet de l'identifier 
sans devoir lui redemander son login/password à chaque requête.

Les cookies appartiennent à un nom de domaine.

Dans un navigateur classique (sans mode privé activé), on ne peut se connecter avec le même navigateur 
sur plusieurs comptes utilisateurs d'un même site internet.

Pour permettre de se connecter sur plusieurs comptes utilisateurs, il existe une solution de contournement
en isolant les cookies par onglet du navigateur.

Le principe est de sauvegarder les cookies dans le [sessionStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/sessionStorage) 
et de les restorer automatiquement lorsque l'onglet est affiché ou avant de changer de page web.

La contrainte est que l'on ne peut se déconnecter d'un compte utilisateur sans utiliser la fonction `SessionBox.close()`.

### Côté serveur

Il faut s'assurer qu'un nouvel id utilisateur est créé lors de l'identification de l'utilisateur (même si un cookie existe déjà)

Un exemple en PHP : 

```PHP
session_name('COOKIE1');
$newid = session_create_id();
session_id($newid);
session_start();
```

### Côté client

#### Initialisation

Le projet dépand de [js-cookie](https://github.com/js-cookie/js-cookie) pour la gestion des cookies.

```html
<script src="js.cookie.min.js"></script>
<script src="sessionbox.js"></script>
```

La liste de tous les noms des cookies utilisés pour la session utilisateur doivent être indiqués.
Les cookies existant dès la première connexion sont indiqués par la valeur `true`.

```javascript
var sessionbox = new SessionBox({
		'COOKIE1': true,
		'COOKIE2': false
	});
```

#### Mise à jour et iFrame

Un cookie peut être par la suite sauvegardé (cas d'une connexion ultérieure par iFrame), mais doit avoir été déclaré auparavant (voir ci-dessus) :

```javascript
sessionbox.save('COOKIE2');
```

#### Déconnexion

La déconnexion, c'est à dire la suppression des cookies ne peut être effectués qu'à partir de SessionBox :

```javascript
sessionbox.close();
```

### Démo

```sh
./start.sh
```

http://localhost:8000

## Contact

Authors : Emmanuel ROECKER & Rym BOUCHAGOUR

Web Development Blog - http://dev.glicer.com

