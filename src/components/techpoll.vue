<template>

<span>
  <section class="indexio">
  <nav class="navbar navbar-default navbar-static-top" >
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span> 
      </button>
      <div class="logo">

          <router-link :to="{ name: 'Index' }">
                <img :src="require('@/assets/avataaars.png')" />
                <p></p>
            </router-link>
      </div>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <!-- <div class="col-md-7 nav-input">
            <input type="text" placeholder="Search">
        </div> -->
        
          <input type="text" class="form-control" placeholder="Search In Pooling">
        
      </ul>
      <ul class="nav navbar-nav navbar-right ">
        <li><a href="#" class="btn btn-default btne">Sign Up</a></li>
      <li><a href="#" class="btne1">Login</a></li>
        
        
      </ul>
    </div>
  </div>
</nav>
  
    <div class="container">
      <div class="row">
        <div class="col-md-5 div.col-md-offset-3">
          <h1 style="margin-top:-2%;">Polling.io</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis officia, dolorum labore omnis perspiciatis corrupti enim iste nihil veritatis hic! Omnis dolorem, similique iste repudiandae nesciunt. Suscipit dignissimos delectus, quos.</p>
          <button class="btn btn-primary bter">Get Started</button>
        </div>
        
          <!-- <img :src="require('@/assets/img/background-home-influencer-right.png')" alt="Zeedas" class="img-responsive login-signup-logo" style="filter: hue-rotate(197deg);" /> -->
          <div class="back">
            
          </div>
        
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
           <img :src="require('@/assets/img/bgs.svg')" alt="Zeedas" class="igm-responsive login-signup-logo" />
        </div>
        <div class="col-md-5">
          <div class="well login" v-if="logins">
            <h3 class="is-primary">TechPool.io</h3>
            
            <p>Login</p>
            <input type="text" v-model="email" class="form-control" placeholder="Email">
            <input type="text" v-model="password" class="form-control" placeholder="password">
            <button class="btn btn-primary btn-block" @click="login()">Login</button>
            <h4 class="text-center">OR</h4>
            <div class="row">
              <div class="col-md-6">
                <button class="btn btn-info btn-block" @click="twitterLogin()">Twitter Login</button>
              </div>
              <div class="col-md-6">
                 <button class="btn btn-primary btn-block">Facebook Login</button>
              </div>
            </div>
            <p>Dont Have An Account ? <span class="is-primary"  @click="toggleLogin()">Signup</span></p>
          </div>
          <div class="well login" v-if="signup">
           <input type="text" v-model="firstName" class="form-control" placeholder="First Name">
           <input type="text" v-model="lastName" class="form-control" placeholder="Last Name">
            <input type="text" v-model="email" class="form-control" placeholder="Email">
            <input type="password" v-model="password" class="form-control" placeholder="password">

            <button class="btn btn-primary btn-block" @click="signUp()">Sign Up</button>
            <h4 class="text-center">OR</h4>
            <div class="row">
              <div class="col-md-6">
                <button class="btn btn-info btn-block" @click="twitterLogin()">Twitter Signup</button>
              </div>
              <div class="col-md-6">
                 <button class="btn btn-primary btn-block">Facebook Signup</button>
              </div>
            </div>
            <p>Have An Account ? <span class="is-primary" @click="toggleLogin()">Login</span></p>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</span>
</template>

<script>
 import axios from 'axios'
  export default {
    name: 'TechPoll',
    data() {
      return {
        isModalOpen: false,
        logins: true,
        signup: false,
        email: '',
        firstName: '',
        lastName:'',
        password:''
      }
    }, 
   methods: {
      toggleLogin(){
          this.logins = !this.logins
          this.signup = !this.signup
      },
      signUp(){
        axios.post('http://localhost:4000/api/auth/signup',{
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        }).then(response=>{
            console.log(response, "this is a fine response")
        }).catch(e=>{
            throw(e);
        })
      },
      login(){
          axios.post('http://localhost:4000/api/auth/login',{
              email: this.email, 
              password: this.password
          }).then(response=>{
            console.log(response, "this is a login")
          }).catch(e=>{
              throw(e)
          })
      },
      twitterLogin(){
        
        axios.get('http://localhost:4000/api/auth/login/twitter/request-token').then(response=>{
          axios.get('http://localhost:4000/api/auth/login/twitter/request-token').then(user=>{
            console.log(user, "hey")
          })
        })
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


img.igm-responsive.login-signup-logo {
    width: 100%;
}
.is-primary-color {
    color: #6FCF97 !important
  }

section.indexio {
    color: rgb(255, 255, 255);
    height: 550px;
    /*padding-top: 12%;*/
    margin-bottom: 9%;
    background: linear-gradient(to top, rgb(15, 72, 101) 0%, rgb(0, 153, 230) 100%);
}

.back::before {
    content: ' ';
    background: url(/static/img/background-home-influencer-right.png);
    top: -54%;
    -webkit-filter: hue-rotate(648deg);
    filter: hue-rotate(648deg);
    /* filter: hue-rotate(197deg); */
    width: 100% !important;
    background-size: cover;
    height: 432px !important;
    position: absolute;
    right: -35%;
}
.navbar-default {
    background-color: #f8f8f800 !important;
    border-color: #e7e7e700 !important;
    margin-bottom: 12% !important;
    box-shadow: none !important;
}
.navbar-right {
    /*float: !important;*/
    float: right !important;
    position: absolute;
    right: 0%;
}
.btne{
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.10);
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
    border: none !important;
    padding: 7px 40px;
    border-radius: 50px !important;
    color: #f7298d !important;
    font-weight: 500;
    margin-top: 9px;
}
.btne1{
  color: #fff !important;
  font-size: 14px;
  font-weight: 900;
}
div#myNavbar input {
    margin-top: 8px;
    border-radius: 50px !important;
    margin-left: 12%;
    color: #fff !important;
    background: transparent !important;
    padding: 10px 20px;
    font-size: 13px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    width: 297px;
    border: 1px solid #fff !important;
}
#myNavbar input [placeholder], [placeholder], *[placeholder] {
    color: #fff !important;
}
button.btn.btn-primary.bter {
    padding: 8px 55px;
    margin-top: 9px;
    background: #0D967E;
}
</style>
