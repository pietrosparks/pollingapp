<template>

<span>
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
                <button class="btn btn-info btn-block">Twitter Login</button>
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
                <button class="btn btn-info btn-block">Twitter Signup</button>
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
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Poppins');

img.igm-responsive.login-signup-logo {
    width: 100%;
}
.is-primary-color {
    color: #6FCF97 !important
  }
</style>
