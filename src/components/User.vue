<template>

  <div class="login">

    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">

    <div class="container is-fluid">
      

      <section class="main">
        <div class="columns is-variable is-4">

          <div class="column is-one-quarter">
            <UserProfileMenu :getUserData="getUserData" :fetchEventData="fetchEventData"></UserProfileMenu>
          </div>
         

          <div class="column is-three-quarter">
           
            <UserProfileTimeline :userEvents="userEvents" :getUserData="getUserData" :fetchEventData="fetchEventData"></UserProfileTimeline>
          </div>
       

        </div>
        <div v-if="searchReady == true">
            
            <SearchResults></SearchResults>
         
          </div>
      </section>
    </div>



  </div>
</template>

<script>
  import UserProfileMenu from '@/components/UserProfileMenu'
  import UserProfileTimeline from '@/components/UserProfileTimeline'
  import SearchResults from '@/components/SearchModal'

  import {
    mapGetters
  } from 'vuex'
  import {
    mapActions
  } from 'vuex'


  export default {
    name: 'User',
    data() {
      return {
        userID: '',
        userEvents: '',
        openPollOptions: false,
        pollObject: {},
        poll: {
          pollOptionsArray: []
        },
        pollOption: ''

      }
    },
    components: {
      UserProfileMenu,
      UserProfileTimeline,
      SearchResults
    },
    methods: {
    

      getUserData() {

        this.$store.dispatch('getUserState', this.userID).then(response => {
        
        })
      },
      fetchEventData() {
        this.axios.get(`/api/events/user/${this.userID}`).then(response => {
          console.log(response)
          this.userEvents = response.data
        })
      },
      logout() {
        localStorage.clear();
        this.$router.push('/')
      },

    },
    computed: {
      ...mapGetters(['isLoggedIn']),
      ...mapActions(['getUserState']),

      searchReady: function () {
        console.log('kd', this.$store.state.searchIsOngoing)
        return this.$store.state.searchIsOngoing
      }
    },
    created() {
      const getLocalStorageID = JSON.parse(localStorage.getItem('userID'));
      this.userID = getLocalStorageID
      
    },

    mounted() {
      // this.getUserData();
      this.fetchEventData();
    

    },


  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  body {
    font-family: "Poppins";
  }

  .is-primary {
    background-color: #6FCF97 !important
  }

  .is-primary-color {
    color: #6FCF97 !important
  }

  .is-centered {
    margin: 0 auto
  }

  .avatar {
    margin-right: 30px !important;
  }


  .main {
    margin-top: 30px;
  }

  .content {
    margin-top: 20px !important;
  }

  .control {
    margin-bottom: 15px;
  }

  .thread {
    height: 20px;
    width: 3px;
    background-color: #6FCF97 !important;
    margin: 0 auto;
  }

  .mg-top {
    margin-top: 20px !important;
  }

  .box h2 {
    margin: 20px;
  }

  .adjust-inline {
    display: inline !important
  }

  .reset-width {
    width: auto !important
  }

  .tag-space {
    margin-top: 15px;
    margin-right: 15px;

  }

  .del-space {
    margin-left: 10px !important
  }

  .is-horizontal-center {
    margin: 0 auto !important
  }

  .answer-button {
    min-width: 50% !important;
    margin-bottom: 5px;
  }

</style>

