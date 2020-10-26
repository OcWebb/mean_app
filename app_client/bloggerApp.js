var app = angular.module('bloggerApp', ['ngRoute']); 

//*** Router Provider ***
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
            })
  
        .when('/blogs', {
            templateUrl: 'pages/blog-list.html',
            controller : 'ListController',
            controllerAs: 'vm'
            })
  
        .when('/blogs/add', {
            templateUrl: 'pages/blog-add.html',
            controller: 'AddController',
            controllerAs: 'vm'
            })
            
        .when('/blogs/edit/:id', {
            templateUrl: 'pages/blog-edit.html',
            controller: 'EditController',
            controllerAs: 'vm'
            })
        .when('/blogs/delete/:id', {
            templateUrl: 'pages/blog-delete.html',
            controller: 'DeleteController',
            controllerAs: 'vm'
            })
  
        .otherwise({redirectTo: '/'});
      });

//*** REST Web API functions ***
function getAllBlogs($http) {
    return $http.get('/api/blogs');
}

function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, id, data) {
    return $http.put('/api/blogs/edit/' + id, data);
}

function addBlog($http, data) {
    return $http.post('/api/blogs/add', data);
}

function deleteBlog($http, id) {
    return $http.delete('/api/blogs/delete/' + id);
}

//*** home page controller ***
app.controller('HomeController', function HomeController() {
    var vm = this;
    vm.name = "Ryan Webster";
});

//*** Controllers ***
app.controller('ListController', function ListController($http) {
    var vm = this;
    
    getAllBlogs($http)
      .then(function(resp) {
        vm.blogs = resp.data;
        vm.message = "Blog data found!";
      })
      ,function (e) {
        vm.message = "Could not get list of blogs";
      };
});

app.controller('EditController', [ '$http', '$routeParams', '$location', function EditController($http, $routeParams, $location) {
    var vm = this;
    vm.blog = {};       // Start with a blank blog
    vm.id = $routeParams.id;    // Get id from $routParams which must be injected and passed into controller

    // Get blog data so it may be displayed on edit page
    getBlogById($http, vm.id)
      .then(function(resp) {
        vm.blog = resp.data;
        vm.message = "Blog data found!";
      })
      ,function (e) {
        vm.message = "Could not get blog given id of " + vm.id;
      };
    
    // Submit function attached to ViewModel for use in form
    vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogText = userForm.blogText.value;
        data.author = userForm.author.value;

        updateBlogById($http, vm.id, data)
          .then(function(data) {
            vm.message = "Blog data updated!";
            $location.path("/blogs");
          })
          ,function (e) {
            vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
          };
    }
}]);

app.controller('AddController', [ '$http', '$location', function AddController($http, $location) {
    var vm = this;
    vm.blog = {};       // Start with a blank blog
    
    // Submit function attached to ViewModel for use in form
    vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogText = userForm.blogText.value;
        data.author = userForm.author.value;
               
        addBlog($http, data)
          .then(function(data) {
            vm.message = "Blog has beed added!";
            $location.path("/blogs");   // Refer to blog for info on StateProvder
          })
          ,function (e) {
            vm.message = "Could not add blog";
          };
    }
}]);

app.controller('DeleteController', [ '$http', '$routeParams', '$location', function DeleteController($http, $routeParams, $location) {
    var vm = this;
    vm.blog = {};       // Start with a blank blog
    vm.id = $routeParams.id;    // Get id from $routParams which must be injected and passed into controller
    
    // Get blog data so it may be displayed on edit page
    getBlogById($http, vm.id)
      .then(function(resp) {
        vm.blog = resp.data;
        vm.message = "Blog data found!";
      })
      ,function (e) {
        vm.message = "Could not get blog given id of " + vm.id;
      };
    
    // Submit function attached to ViewModel for use in form
    vm.submit = function() {
       deleteBlog($http, vm.id)
          .then(function(data) {
            vm.message = "Blog deleted!";
            $location.path("/blogs");   // Refer to blog for info on StateProvder
          })
          ,function (e) {
            vm.message = "Could not delete blog with id " + vm.id;
          };
    }
}]);
