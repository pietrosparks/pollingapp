<template>
  <div>
    <div class="column">
      <div class="columns">
        <div class="column">
          <div class="box">
            <h2 class="title is-size-4 is-primary-color ">Recent Poll Activity </h2>

            <div v-for="event in userEvents">
              <article class="media">

                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/avataaars.png" alt="Image">
                  </figure>
                  <div class="thread"></div>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong class="username">{{event.userName}}</strong>
                      <span v-if="event.eventType=='created'">

                        <span>{{event.eventType}}</span> a poll titled</span>
                      <span v-if="event.eventType=='followed'">

                        <span> {{event.eventType}}</span>

                      </span>
                      <span v-if="event.eventType=='following'">

                        <span class="is-primary-color ">{{event.participant.name}}</span> followed you </span>
                      </span>

                      </span>
                      <span v-if="event.eventType=='followed'" class="is-primary-color " @click='openUser(event)'>{{event.participant.name}}</span>
                      <span v-if="event.eventType=='created'" class="is-primary-color " @click='openEvent(event)'>{{event.participant.name}}</span>
                      <timeago :since="event.date"></timeago>
                      <br>

                      <div class="field">

                      </div>
                    </p>
                  </div>
                </div>

              </article>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" :class="{'is-active': isEventModalOpen }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box" v-if="!isEmpty(shownPoll)">

          <div class="image-wrapper">
            <div class="is-horizontal-center image is-64x64">
              <img src="../assets/avataaars.png" alt="Image">
            </div>
          </div>
          <div class="content-wrapper">
            <h3 class="medium is-size-3">{{selectedPollData.name}}</h3>
            <h3 class="is-size-4">{{selectedPollData.description}}</h3>
          </div>
          <div class="share is-horizontal-center">
            <a v-bind:href="shareUrl" target="_blank">
              <img src="../assets/twirra.png" alt="" class="twitter-share" role="button">
            </a>

          </div>
          <br>
          <div v-if="userHasVoted === false">

            <div class="content-wrapper">
              <div class="answer-button  " v-for="option in selectedPollData.options">
                <a class="button is-rounded is-large is-primary answer-button" @click="vote(option)">{{option.name}}</a>
              </div>
            </div>
          </div>
          <div v-else>
            <hr>
            <h1>Result</h1>

            <h4 v-if="selectedPollData.status == 0">Voting Still Ongoing</h4>
            <h4 v-if="selectedPollData.status == 1">Voting FInished</h4>
            <hr>
            <LineChart :chart-data="justChartData"></LineChart>
          </div>



        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="openEventModal"></button>
    </div>
  </div>
</template>

<script>
  import LineChart from '@/components/Chart'
  export default {
    name: "UserProfileTimeline",
    props: ['userEvents', 'getUserData', 'fetchEventData'],
    data() {
      return {
        shownPoll: {},
        shownUser: {},
        isEventModalOpen: false,
        selectedPollData: '',
        userHasVoted: false,
        justChartData: '',
        customChartDataLabel: '',
        customChartData: '',
        shareUrl: ''

      }
    },
    methods: {
      chartDataFunc() {
        return {
          labels: this.customChartDataLabel,
          datasets: this.customChartData
        }
      },
      randomColor() {
        const r = () => Math.floor(256 * Math.random());
        return `rgb(${r()}, ${r()}, ${r()})`;
      },
      vote(option) {

        option.count++
          let voteObject = {
            count: option,
            voter: JSON.parse(localStorage.userID)
          }
        this.axios.put(`/api/poll/${this.shownPoll.participant.id}`, voteObject).then(response => {

          this.$swal({
            title: 'Success',
            text: `${response.data.message}`,
            timer: 1500,
            showConfirmButton: false,
            type: 'success'
          });

          this.fetchEventData();
          this.getUserData();
          this.openEventModal()

        })
      },

      openEventModal() {

        this.isEventModalOpen = !this.isEventModalOpen


      },
      openEvent(event) {

        this.openEventModal();
        if (event.participant.type == 'Poll') {

          this.shownPoll = event;
          this.axios.get(`/api/poll/${event.participant.id}`).then(response => {

            this.selectedPollData = response.data.poll
            this.hasVoted(this.selectedPollData)


            /* Chart Data Gathering */

            let labels = [];
            let dataFigures = [];
            let colors = []
            let dataArr = []

            this.selectedPollData.options.forEach(label => {

              labels.push(label.name)
              dataArr.push(label.result)
              colors.push(this.randomColor())

            })
            dataFigures.push({
              backgroundColor: colors,
              data: dataArr
            })


            this.customChartData = dataFigures
            this.customChartDataLabel = labels
            this.justChartData = this.chartDataFunc();
            //For Link
            
            var split = this.shownPoll.participant.name.split(' ');
            var newString = [];
            split.forEach(resp => {
              newString.push(resp + "%20")
            })
            var finished = newString.join("");

            var text =
              `http://twitter.com/intent/tweet?text=${this.$store.state.userCred.userName}+just+shared+the+poll+'+${finished}+'+Click+the+link+below+to+cast+a+vote+https://theos-polling-app.herokuapp.com/poll/shared/${poll.pollID}`
console.log(text,"text")
            this.shareUrl = text

          })
          // console.log(this.shownPoll)
        } else if (event.participant.type == 1) {
          this.shownUser = event;
          //Follow User and view
          this.axios.get(`/api/users/${event.participant.id}`).then(response => {
            console.log(response)
          })
        }
      },
      openUser(user) {
        console.log(user, 'jd')
        this.$store.dispatch('selectUser', user.participant.id).then(response => {
          this.$router.push({
            path: `/search/user/${this.$store.state.searchResult.userName}`
          })
        })
      },
      isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },
      hasVoted(obj) {

        const UserID = JSON.parse(localStorage.userID)
        console.log(obj, "obj poll")
        if (obj.votedUsers.includes(UserID)) {
          this.userHasVoted = true
        } else this.userHasVoted = false
        console.log(this.userHasVoted)

      },
      // shareTwitter(poll) {

      //   var split = poll.name.split(' ');
      //   var newString = [];
      //   split.forEach(resp => {
      //     newString.push(resp + "%20")
      //   })
      //   var finished = newString.join("");

      //   var text =
      //     `http://twitter.com/intent/tweet?text=${this.$store.state.userCred.userName}+just+shared+the+poll+'+${finished}+'+Click+the+link+below+to+cast+a+vote+https://theos-polling-app.herokuapp.com/poll/shared/${poll.pollID}`

      //   this.shareUrl = text

      // }
    },


    components: {
      LineChart
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
    min-width: 40% !important;
    margin-bottom: 5px;
    border-radius: 20px;
  }

  .twitter-share {
    width: 40px;
    height: auto
  }

</style>
