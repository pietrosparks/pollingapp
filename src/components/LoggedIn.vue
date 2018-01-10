<template>

  <div class="login">
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
    <nav class="navbar is-transparent">

      <div class="container is-fluid">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
          </a>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">

          </div>

          <div class="navbar-end">
            <div class="field-is-grouped">
              <div class="navbar-item">

                <p class="">
                  <figure class="image is-32x32 avatar">
                    <img src="../assets/avataaars.png">
                  </figure>
                </p>
                <p class="">
                  <a class="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">

                    <span>Logout</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container is-fluid">

      <section class="main">

        <div class="columns is-variable is-4">

          <div class="column is-one-quarter">
            <div class="box">
              <div class="image is-128x128 is-centered">
                <img src="../assets/avataaars.png" alt="">
              </div>
              <div class="user-name mg-top">
                <h1 class="title is-size-3">Obi Nezianya</h1>
              </div>
              <div class="user-info">
                <h2 class="title is-size-5 is-primary-color">Occasional Poller</h2>
                <h3 class="title is-size-6">
                  <span class="is-primary-color">68 </span>Polls created</h3>
                <a class="button is-primary" @click="createPoll()">Create a new poll</a>
              </div>
              <br>
            </div>
          </div>



          <div class="column">
            <div class="columns">
              <div class="column">
                <div class="box">
                  <h2 class="title is-size-4 is-primary-color ">Recent Poll Activity </h2>
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
                          <strong class="username">Obi Nezianya</strong>
                          <span>created a poll titled</span>
                          <span class="is-primary-color">`Propaganda`</span>
                          <br>

                          <div class="field">

                          </div>



                        </p>
                      </div>


                    </div>

                  </article>

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
                          <strong class="username">Obi Nezianya</strong>
                          <span>created a poll titled</span>
                          <span class="is-primary-color">`Propaganda`</span>
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
      </section>
    </div>


    <div class="modal" :class="{'is-active': isModalOpen }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img src="../assets/avataaars.png" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong class="username">New Poll</strong>
                  <br>
                  <div class="field">

                    <div class="control  ">
                      <input class="input is-success" type="text" placeholder="Name of Poll " value="">
                    </div>
                    <div class="control  ">

                      <div class="field">

                        <div class="control">
                          <textarea class="textarea" placeholder="Description"></textarea>

                        </div>
                      </div>

                    </div>

                  </div>
                  <div class="control has-icons-right ">
                    <input class="input is-success" type="text" placeholder="Poll Options" value="">
                    <span class="icon is-small is-right">
                      <icon name="plus-circle"></icon>
                    </span>

                  </div>
                  <div class="control ">
                    <a class="button is-primary" href=""> Create</a>
                  </div>


                </p>
              </div>

            </div>
          </article>
        </div>
      </div>
      <button class="modal-close is-large" @click="createPoll()" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        isModalOpen: false
      }
    },
    methods: {
      createPoll() {
        this.isModalOpen = !this.isModalOpen
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Poppins');



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

</style>
