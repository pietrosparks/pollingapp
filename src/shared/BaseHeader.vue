<template>
<nav class="navbar navbar-default header navbar-static-top" >
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span> 
      </button>
      <div class="logo">

          <router-link :to="{ name: 'index' }">
                <img :src="require('@/assets/avataaars.png')" />
                <p>TectPoll</p>
            </router-link>
      </div>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <!-- <div class="col-md-7 nav-input">
            <input type="text" placeholder="Search">
        </div> -->
        
          <input type="text" class="form-control" placeholder="Search In Zeedas">
        
      </ul>
      <ul class="nav navbar-nav navbar-right tour-notif">
        <!-- <li>
          <router-link :to="{ name: 'login' }" >Sign in</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'signup' }" >Sign up</router-link>
        </li> -->
        
        
      </ul>
    </div>
  </div>
</nav>
</template>

<script>

export default {
  name: "baseheader",
  
   computed: {
     
      isNotLoginPage() {
        if (this.$route.name === "login" || this.$route.name === "signup") {
          return false;
        }
        return true;
      }
    }
};
</script>

<style>

.logo {
    display: inline-block;
    margin-top: 6%;
}

.logo p {
    float: right;
    font-size: 18px;
    font-weight: 900;
    margin-left: 5px;
    margin-top: 6px;
}

.logo img {
    height: 32px;
    width: 32px;
    float: left;

}
span.nav-notif.ion-asterisk {
    position: absolute;
    font-size: 7px;
    top: -29%;
    color: white;
    left: 60%;
    background: #ef57b7;
    border-radius: 50%;
    padding: 0px 5px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.24);
    max-height: 17px;
}

ul.nav.navbar-nav.navbar-right.tour-notif i {
    font-size: 20px !important;
}
</style>