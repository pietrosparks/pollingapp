<template>
  <div>
    <div class="box">
      <div class="image is-128x128 is-centered">
        <img src="../assets/avataaars.png" alt="">
      </div>
      <div class="user-name mg-top">
        <h1 class="title is-size-3">{{userCred.userName}}</h1>
      </div>
      <div class="user-info">
        <h2 class="title is-size-5 is-primary-color">Occasional Poller</h2>
        <h3 class="title is-size-6">
          <span class="is-primary-color" v-if="userCred.createdPolls">{{userCred.createdPolls.length}} </span>Polls created</h3>
        <h3 class="title is-size-6">
          <span class="is-primary-color" v-if="userCred.answeredPolls">{{userCred.answeredPolls.length}} </span>Polls answered</h3>
        </h3>
        <h3 class="title is-size-6">
          <span class="is-primary-color" v-if="userCred.followers">{{userCred.followers.length}} </span>Followers</h3>
        </h3>
        <h3 class="title is-size-6">
          <span class="is-primary-color" v-if="userCred.following">{{userCred.following.length}} </span>Following</h3>
        </h3>
        <div v-if="followingOrNot == false">
          <a class="button is-primary" @click="follow()">Follow</a>
        </div>
        <div v-if="followingOrNot == true">
          <a class="button is-primary" @click="unfollow()">Unfollow</a>
        </div>

      </div>
      <br>
    </div>
   
  </div>
</template>

<script>
  

  export default {
    name: 'SearchUserHolder',
    props: ['userCred'],
    data() {
      return {

      }
    },
    methods: {
      follow() {
        this.$store.dispatch('follow', {
          currentUser: this.$store.state.userCred.userID,
          followedUser: this.$store.state.searchResult.userID
        })
      },
      unfollow() {
        this.$store.dispatch('unfollow', {
          currentUser: this.$store.state.userCred.userID,
          followedUser: this.$store.state.searchResult.userID
        })
      }
    },

    computed: {
      followingOrNot: function () {

        if (this.$store.state.searchResult.followers.includes(this.$store.state.userCred.userID)) {
          return true
        } else return false

        
      },

      
    },
    mounted() {
      
    },
  
  }

</script>

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
