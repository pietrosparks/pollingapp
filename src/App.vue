<template>
  <div id="app">
    <BaseHeader/>
    <router-view/>
  </div>
</template>

<script>

import BaseHeader from '@/shared/BaseHeader';


export default {
  name: 'app',
  components:{
    BaseHeader,
    
  }
}
</script>

<style>

/*@import '../node_modules/bulma-extensions/bulma-divider/bulma-divider.min.css';*/
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:0px !important;
 
}


@media (min-width: 320px) and (max-width: 480px) {
  
  .navbar{
    margin-bottom: 0px !important;
  }

  .navbar-brand {
    float: left;
    height: 50px;
    padding: 0px !important;
    font-size: 18px;
    line-height: 20px;
    position: relative !important
}

.navbar-burger {
    cursor: pointer;
    display: block;
    height: 3.25rem;
    position: absolute !important;
    width: 3.25rem;
    margin-left: auto;
    right: -200px;
    top: 5px;
}

#createPoll .media-left figure .image{
  position: absolute !important;
    left: 85px !important;
}

#createPoll .media .media-left{
  margin-right: 0rem !important;
  position: absolute!important;
  left: 100px !important ;
}

#createPoll .media-content .content{
  margin-top: 60px!important;
  margin-left: 16px;
}

#createPoll .media-content .content .control{
  
    max-width: 210px !important;
    margin-bottom: 15px;

}
  
}
</style>
