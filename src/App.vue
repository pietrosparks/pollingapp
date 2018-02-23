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
 
}
</style>
