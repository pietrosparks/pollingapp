<template>
  <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="https://www.downgraf.com/wp-content/uploads/2017/04/Downgraf-New-Logo-Design-Black.png" alt="Logo">
        </a>
        <span class="navbar-burger burger"  @click="dropOpen()">
            
          <span></span>
          <span></span>
          <span></span>
         
        </span>
      </div>
      <div id="navbarMenuHeroC" class="navbar-menu" :class="{'is-active': isDropOpen }">
        <div class="navbar-end is-flex-touch " v-if="!authenticated">

          <span class="navbar-item has-text-centered">

            <router-link class="button is-success is-outlined" to="/">Login</router-link>
          </span>
          <span class="navbar-item has-text-centered">

            <router-link class="button is-success is-outlined" to="/signup">Sign Up</router-link>
          </span>
        </div>
        <div class="navbar-end " v-else>
          <div class="search">

          </div>
          <div class="searchBar">

            <div class="field">
              
              <div class="control has-icons-left has-icons-right">
                <input class="input is-success is-small" type="text" placeholder="Search" v-model="search">
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>


              </div>

            </div>

          </div>
          <div class="searchIcon" @click="searchFunction()">
            <img src="../assets/search.png" alt="">
          </div>
          <span class="navbar-item has-text-centered">

            <h3 class="is-size-5">
              Welcome
              <span style="color:#6FCF97">{{username}}</span>
            </h3>

          </span>
          <span class="logout-btn navbar-item">
            <a class="button is-success is-outlined" @click="logout()">Logout</a>
          </span>

        </div>
      </div>
    </div>
  </nav>

  
</template>

<script>
  

  export default {
    name: "baseheader",
    data() {
      return {
        search: '',
        isDropOpen: false
      }
    },
    methods: {

      logout() {
        this.$store.commit('authLogout')
        this.$router.push('/')
      },

      dropOpen(){
        this.isDropOpen = !this.isDropOpen
      },
      searchFunction() {

        var options = {
          shouldSort: true,
          matchAllTokens: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 2,
          keys: [
            "userName",
            
          ]
        };

        this.$search(this.search, this.$store.state.allUsers, options).then(results => {
 
          this.$store.commit('setupSearchResult', results)
          this.$store.commit('setupSearch')
          this.dropOpen()

        })
       
        // let searchItem = {
        //   search: this.search
        // }

        // this.$store.dispatch('search', searchItem).then(response=>{

        //   this.$router.push({
        //     path:`/search/user/${this.$store.state.searchResult.userName}`
        //   })
        // })

      }

    },

    created() {



    },

    computed: {
      username: function () {
        return this.$store.state.userCred.userName
      },

      authenticated: function () {
        return this.$store.state.isAuth
      }
    },

    watch: {

    }
    // computed: {

    //   isNotLoginPage() {
    //     if (this.$route.name === "login" || this.$route.name === "signup") {
    //       return false;
    //     }
    //     return true;
    //   },
    //   isNotLanding() {
    //     if (this.$route.name === "LandingPage") {
    //       return false;
    //     }
    //     return true;
    //   }
    // }
  };

</script>

<style scoped>
  /* .logout-btn {
    margin-top: 15px;
  } */
.navbar{
  padding: 5px;
}
  .searchBar {
    padding: 5px;
    max-width: 40%;
    margin-right: 15px;
    margin-top: 10px;
    display: inline !important;
  }

  .searchIcon {
    display: inline !important;
    padding: 10px;
    margin-top: 10px;
    margin-right: 55px
  }

  .search {
    margin-right: 20px
  }

  @media (min-width: 320px) and (max-width: 1024px) {
  
  .searchBar .field {
    max-width: 80% !important;
    margin: 10px auto !important;
  }

  .searchIcon{
    margin: 0 auto !important;
    padding: 0 !important;
    display: block !important
    
  }
  #navbarMenuHeroC {
    width: 100% !important

  }

  .logout-btn{
    padding: 20px;
  }


  
}
</style>
