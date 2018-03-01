<template>
  <header class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="https://www.downgraf.com/wp-content/uploads/2017/04/Downgraf-New-Logo-Design-Black.png" alt="Logo">
        </a>
        <span class="navbar-burger burger" data-target="navbarMenuHeroC">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenuHeroC" class="navbar-menu">
        <div class="navbar-end " v-if="!authenticated">

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
              <label class="label">Search</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input is-success" type="text" placeholder="Search" v-model="search">
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

            <h3 class="is-size-3">
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
  </header>
</template>

<script>
  import {
    EventBus
  } from '../main';

  export default {
    name: "baseheader",
    data() {
      return {


        search: ''
      }
    },
    methods: {

      logout() {
        this.$store.commit('authLogout')
        this.$router.push('/')
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
  .logout-btn {
    margin-top: 15px;
  }

  .searchBar {
    padding: 5px;
    max-width: 40%;
    margin-right: 5px;
    display: inline !important;
  }

  .searchIcon {
    display: inline !important;
    padding: 10px;
    margin-top: 15px;
    margin-right: 10px
  }

  .search {
    margin-right: 20px
  }

</style>
