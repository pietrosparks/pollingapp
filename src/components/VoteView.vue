<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">

        <div v-if="loggedInOrNot == false">
          <div class="box">
            <div class="image-wrapper">
              <div class="is-horizontal-center image is-64x64">
                <img src="../assets/avataaars.png" alt="Image">
              </div>
            </div>
            <div class="content-wrapper">
              <h3 class="medium is-size-3">{{selectedPollData.name}}</h3>
              <h3 class="is-size-4">{{selectedPollData.description}}</h3>
            </div>

            <div class="contentWrapper">
              <a class="button is-primary" @click="voteAsUser">Vote as User</a>
              <a class="button is-primary">Vote as Guest</a>
            </div>



          </div>
        </div>
        <div v-else>
          <div class="box">

            <div class="image-wrapper">
              <div class="is-horizontal-center image is-64x64">
                <img src="../assets/avataaars.png" alt="Image">
              </div>
            </div>
            <div class="content-wrapper">
              <h3 class="medium is-size-3">{{selectedPollData.name}}</h3>
              <h3 class="is-size-4">{{selectedPollData.description}}</h3>
            </div>
            <div class="share is-horizontal-center" @click="shareTwitter(selectedPollData)">
              <img src="../assets/twirra.png" alt="" class="twitter-share" role="button">
            </div>
            <br>
            <div v-if="userHasVoted == true">
              <hr>
              <h1>Result</h1>

              <h4 v-if="selectedPollData.status == 0">Voting Still Ongoing</h4>
              <h4 v-if="selectedPollData.status == 1">Voting Finished</h4>
              <hr>
              <LineChart :chart-data="justChartData"></LineChart>
            </div>
            <div v-else>


              <div class="content-wrapper">
                <div class="answer-button  " v-for="option in selectedPollData.options">
                  <a class="button is-rounded is-large is-primary answer-button" @click="vote(option)">{{option.name}}</a>
                </div>
              </div>
            </div>


            <div v-if="!userHasVoted">

            </div>

          </div>
        </div>

      </div>
      <button class="modal-close is-large" aria-label="close" @click="openEventModal"></button>
    </div>
  </div>
</template>


<script>
  import LineChart from '@/components/Chart';
  export default {

    name: 'VoteView',

    data() {
      return {
        shownPoll: {},

        guestLogin: false,
        isEventModalOpen: false,
        selectedPollData: {},
        userHasVoted: '',
        justChartData: '',
        customChartDataLabel: '',
        customChartData: ''

      }
    },
    methods: {
      voteAsUser() {

        this.$store.commit('keepPendingPoll', this.selectedPollData)
        this.$router.push('/')
      },
      hasVoted(obj) {

        const UserID = JSON.parse(localStorage.userID)
        if (obj.votedUsers.includes(UserID)) {
          this.userHasVoted = true
        } else this.userHasVoted = false
        console.log(this.userHasVoted)

      },
      isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },
      openEventModal() {

        this.isEventModalOpen = !this.isEventModalOpen
        this.userHasVoted = false

      },
      openEvent(event) {

        this.openEventModal();
        if (event.participant.type == 'Poll') {

          this.shownPoll = event;
          this.axios.get(`http://localhost:4000/api/poll/${event.participant.id}`).then(response => {

            this.selectedPollData = response.data
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

          })
          // console.log(this.shownPoll)
        } else if (event.participant.type == 1) {
          this.shownUser = event;
          //Follow User and view
          this.axios.get(`http://localhost:4000/api/users/${event.participant.id}`).then(response => {
            console.log(response)
          })
        }
      },
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
        console.log(this.selectedPollData)
        option.count++
          let voteObject = {
            count: option,
            voter: JSON.parse(localStorage.userID)
          }
        this.axios.put(`http://localhost:4000/api/poll/${this.selectedPollData.pollID}`, voteObject).then(response => {
          console.log(response.data)
          this.$swal({
            title: 'Success',
            text: `${response.data.message}`,
            timer: 1500,
            showConfirmButton: false,
            type: 'success'
          });


          this.hasVoted(this.selectedPollData)
          this.graphCompiler()

          /* Chart Data Gathering */

        
        })
      },
      graphCompiler() {
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
      console.log(this.justChartData, "lino")

    }
    },
    computed: {
      loggedInOrNot() {
        if (this.$store.state.userCred !== null) {
          return true
        } else return false

      },

    },
   
    created() {





      this.axios.get(`http://localhost:4000/api/poll/${this.$route.params.pollId}`).then(response => {

        this.selectedPollData = response.data
        this.hasVoted(this.selectedPollData)
        this.graphCompiler()
      })
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
