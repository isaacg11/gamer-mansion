namespace gamermansion.Controllers {

    export class HomeController {
      public games;
      public payload;

      public deleteGame(id) {
        if(this.payload.role === 'admin') {
          this.gameService.removeGame(id);
          alert('Success!');
        } else {
          alert('Denied. admins only.')
        }
        //this.gameService.removeGame(id);
      }

      public constructor(
        private gameService
      ) {
        // this.games = this.gameService.getAllGames();
        let token = window.localStorage['token'];

        if(token) {
          this.payload= JSON.parse(window.atob(token.split('.')[1]));
          console.log(this.payload);
        }
      }

    }


    export class AddGamesController {
        public game;
        public payload;

        public addGame() {
          if(this.payload.role === 'admin') {
            this.gameService.saveGame(this.game).then(() => {
              alert('Success!');
            }, ((err) => {
              console.log(err);
            }))
          } else {
            alert('Denied. admins only.')
          }
          //this.gameService.saveGame(this.game);
        }

        constructor(
          private gameService
        ) {
          let token = window.localStorage['token'];

          if(token) {
            this.payload = JSON.parse(window.atob(token.split('.')[1]));
            console.log(this.payload);
          }

        }
    }

    export class EditGamesController{
      public game;
      public id;
      public payload;

      public editGame(id) {
        if(this.payload.role === 'admin') {
          this.game._id = this.id;
          this.gameService.saveGame(this.game);
          alert('Success');
        } else {
          alert('Denied. admins only.')
        }
        //this.game._id = this.id;
        //this.gameService.saveGame(this.game);
      }

      public constructor(
        public $stateParams,
        private gameService
      ) {
        this.id = $stateParams['id'];
        let token = window.localStorage['token'];

        if(token){
          this.payload = JSON.parse(window.atob(token.split('.')[1]));
          console.log(this.payload);
        }
      }

    }

    export class LoginController {
      public userInfo;
      public isAdmin;

      public login() {
        if(this.isAdmin ===true) {
          this.userInfo.role = 'admin';
          this.createSession();
        } else {
          this.userInfo.role = 'guest';
          this.createSession();
        }
      }

      public createSession() {
        this.userService.loginUser(this.userInfo).then((data) => {
          this.$window.localStorage.setItem("token", JSON.stringify(data.token));
          alert('login successful');
          this.$state.go('home');

        })
      }

      public constructor(
        private userService,
        public $window,
        public $state
      ) {

      }

    }


      export class RegisterController {
          public user;

          public signup() {
            this.userService.registerUser(this.user).then(() => {
              alert('signup successful, please login');
            })
          }

          public constructor(
            private userService
          ) {

          }
      }



}
