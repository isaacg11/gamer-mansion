namespace gamermansion.Services {
  export class GameService{
    public GameResource;

    public saveGame(game) {
      return this.GameResource.save(game).$promise;
    }

    public getAllGames() {
      return this.GameResource.query();
    }

    public removeGame(id) {
      this.GameResource.delete({id:id});
    }

    public constructor(
      public $resource
    ) {
      this.GameResource = $resource('/games/:id');
    }

  }

  export class UserService {
  public LoginResource
  public SignUpResource

  public registerUser(userObj) {
    return this.SignUpResource.save(userObj).$promise;
  }

  public loginUser(userInfo) {
    return this.LoginResource.save(userInfo).$promise;
  }

  constructor(private $resource:ng.resource.IResourceService){
    this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
    this.SignUpResource = this.$resource('/userRoutes/api/Register');
  }

}


  angular.module('gamermansion').service('gameService', GameService);

  angular.module('gamermansion').service('userService', UserService);

    }
