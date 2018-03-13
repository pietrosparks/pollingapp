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
            <span class="is-primary-color" v-if="userCred.answeredPolls">{{userCred.followers.length}} </span>Followers</h3>
          </h3>
          <h3 class="title is-size-6">
              <span class="is-primary-color" v-if="userCred.answeredPolls">{{userCred.following.length}} </span>Following</h3>
            </h3>
        <a class="button is-primary" @click="pollModal()">Create a new poll</a>
      </div>
      <br>
    </div>

    <div class="modal" :class="{'is-active': isModalOpen }">

      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box" id="createPoll">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img src="../assets/avataaars.png" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                
                 
                  <br>
                  <div class="field">

                    <div class="control  ">
                      <input class="input is-success" type="text" placeholder="Name of Poll " v-model="poll.pollName">
                    </div>
                    <div class="control  ">

                      <div class="field">

                        <div class="control">
                          <textarea class="textarea" placeholder="Description" v-model="poll.pollDescription"></textarea>

                        </div>
                      </div>

                    </div>

                  </div>
                  <div class="control">
                    <input class="input is-success adjust-inline reset-width" type="text" placeholder="Poll Options" v-model="pollOption">
                    <div class="adjust-inline">
                      <a class="button is-primary" @click="addPollOptions()">Add</a>
                    </div>
                    <div class="control" v-if="poll.pollOptionsArray.length>0">
                      <span class="tag is-primary is-large tag-space" v-for="(option, index) in poll.pollOptionsArray " :key='index'>
                        {{option.name}}
                        <a class="del-space delete is-small" @click="removeOption(index)"></a>
                      </span>

                    </div>

                  </div>
                  <div class="control">
                    <input class="input is-success adjust-inline reset-width" type="Number" placeholder="Poll Max Count" v-model="poll.pollMaxCount">


                  </div>

                  <div class="control ">
                    <a class="button is-primary" :class="{'is-loading': isLoading}" @click="createPoll()"> Create</a>
                  </div>

                </p>
              </div>

            </div>
          </article>
        </div>
      </div>
      <button class="modal-close is-large" @click="pollModal()" aria-label="close"></button>
    </div>

  </div>


</template>

<script>
  export default {
    name: 'UserProfileMenu',
    props: [ 'getUserData', 'fetchEventData'],

    data() {
      return {

        isModalOpen: false,
        isLoading: false,
        pollObject: {},
        poll: {
          pollOptionsArray: []
        },
        pollOption: '',


      }
    },

    methods: {
      pollModal() {
        this.isModalOpen = !this.isModalOpen

      },
      removeOption(index) {
        this.poll.pollOptionsArray.splice(index, 1);
      },
      addPollOptions() {

        this.poll.pollOptionsArray.push({
          name: this.pollOption,
          count: 0
        });

        this.pollOption = ''
      },
      createPoll() {

        this.isLoading = true;
        const getLocalStorageItems = JSON.parse(localStorage.getItem('userID'));
        this.pollObject.name = this.poll.pollName;
        this.pollObject.description = this.poll.pollDescription;
        this.pollObject.options = this.poll.pollOptionsArray;
        this.pollObject.creatorID = getLocalStorageItems
        this.pollObject.creatorUserName = this.$store.state.userCred.userName
        this.pollObject.maxCount = this.poll.pollMaxCount


        this.axios.post('/api/poll/new', this.pollObject).then(response => {
          console.log(response, "heyss")
          this.isLoading = false
          this.$swal({
            title: 'Success',
            text: `${response.data.message}`,
            timer: 1500,
            showConfirmButton: false,
            type: 'success'
          });

          this.fetchEventData();
          this.getUserData();
          this.pollModal();
          this.poll = this.pollReset()

        })
      }
    },

    computed: {
      userCred: function () {
        return this.$store.state.userCred
      }
    },

    mounted() {

    }
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
