<template>

  <div class="login">
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
    <nav class="navbar is-transparent">

      <div class="container is-fluid">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <h1 class="title is-size-3 is-primary-color">
                    Polling <span class="is-black">.io</span>
                  </h1>
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
                  <a class=" is-primary-color" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">

                    <span>About</span>
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

        <div class="level">

         

          <div class="level-item">
            <div>
                   
            <br>
              <h1 class="title is-size-1">
                Create & Share
              </h1>
              <br>
              <h1 class="title is-size-3">
                Interactive Polls
              </h1>
            </div>
          </div>

          <div class="level-item ">
                <div class="box" v-if="login">
                  <article class="media">
    
                    <div class="media-content">
                      <div class="content">
                        <p>
    
                          <div class="field">
    
                            <div class="control  ">
                              <input class="input is-success" type="text" placeholder="Email" v-model="email">
                            </div>
                            <div class="control  ">
    
                              <div class="field">
    
                                <div class="control">
                                  <input class="input is-success" type="password" placeholder="Password" v-model="password">
    
                                </div>
                                <a  class="button is-primary is-fullwidth" @click="logIn()">
                                  <i class="fa fa-sign-in"></i>
                                  </span>
                                  <span>Login</span>
                                </a>
                              </div>
                              <div class="field">
                                <div class="control">
                                  <div class="columns">
                                    <div class="column ">
                                      <a href="" class="button is-default is-fullwidth">Twitter</a>
                                    </div>
                                    <div class="column">
                                      <a href="" class="button is-default is-fullwidth">Facebook</a>
                                    </div>
    
                                  </div>
                                </div>
    
                              </div>
                              <div class="field">
                                  <p>Dont have an account? <span class="is-primary-color" @click="toggleLogin()">Sign Up</span>
                            
                                  </p>
                              </div>
    
                            </div>
    
                          </div>
    
                         
    
                        </p>
                      </div>
    
                    </div>
                  </article>
                </div>
                <div class="box" v-if="signup">
                        <article class="media">
          
                          <div class="media-content">
                            <div class="content">
                              <p>
          
                                <div class="field">
          
                                  <div class="control  ">
                                    <input class="input is-success" type="text" placeholder="Email" v-model="email">
                                  </div>
                                  <div class="control  ">
          
                                    <div class="field">
          
                                      <div class="control">
                                        <input class="input is-success" type="password" placeholder="Password" v-model="password">
          
                                      </div>
                                      <a  class="button is-primary is-fullwidth" @click="signUp()">
                                        <i class="fa fa-sign-in"></i>
                                        </span>
                                        <span>Sign Up</span>
                                      </a>
                                    </div>
                                    <div class="field">
                                      <div class="control">
                                        <div class="columns">
                                          <div class="column ">
                                            <a href="" class="button is-default is-fullwidth">Twitter</a>
                                          </div>
                                          <div class="column">
                                            <a href="" class="button is-default is-fullwidth">Facebook</a>
                                          </div>
          
                                        </div>
                                      </div>
          
                                    </div>
                                    <div class="field">
                                        <p>Already have an account?<span class="is-primary-color" @click="toggleLogin()"> Login</span>
                                  
                                        </p>
                                    </div>
          
                                  </div>
          
                                </div>
          
                               
          
                              </p>
                            </div>
          
                          </div>
                        </article>
                      </div>
              </div>



        </div>
      </section>
    </div>


   
  </div>
</template>

<script>
     import axios from 'axios'
     

  export default {
    name: 'Login',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        isModalOpen: false,
        login: true,
        signup: false,
        email: '',
        password:''

      }
    },
    methods: {
      createPoll() {
        this.isModalOpen = !this.isModalOpen
      }, 
      toggleLogin(){
          this.login = !this.login
          this.signup = !this.signup
      },
      signUp(){
        console.log("hey")
        axios.post('http://localhost:4000/api/auth/signup',{
            email: this.email,
            password: this.password
        }).then(response=>{
            console.log(response, "this is a fine response")
        }).catch(e=>{
            throw(e);
        })
      },
      logIn(){
          axios.post('http://localhost:4000/api/auth/login',{
              email: this.email, 
              password: this.password
          }).then(response=>{
            
            console.log(response)
            localStorage.setItem('userCredentials', response.data.user);
            localStorage.setItem('userToken', response.data.token)

          }).catch(e=>{
              throw(e)
          })
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Poppins');
    import 


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
    margin-top: 100px;
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

  .is-black{
      color: black;
  }

</style>
