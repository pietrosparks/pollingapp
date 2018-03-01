<template>

  <div>
    <div class="modal is-active ">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <article class="media">

            <div class="media-content">
              <div class="content">
                <p>
                  <strong class="username">Search Results</strong>
                  <br>

                  <div class="container">
                    <div v-for="result in searchResults" class="results" @click="selectUser(result)">
                      <figure class="image is-48x48 inline">
                        <img src="../assets/avataaars.png" alt="Image">
                      </figure>
                      <h3 class="inline">{{result.userName}}</h3>
                    </div>

                  </div>



                </p>
              </div>

            </div>
          </article>
        </div>
      </div>
      <button class="modal-close is-large" @click="clearSearch()" aria-label="close"></button>
    </div>
  </div>


</template>

<script>
  export default {
    name: 'SearchModal',

    data() {
      return {

      }
    },
    computed: {
      searchResults: function () {
        return this.$store.state.searchResult
      }
    },
    methods: {
      clearSearch() {
        this.$store.commit('clearSearch');
        this.$store.commit('clearSearchResult');
      },
      selectUser(user) {

        this.$store.commit('setupSearchResult', user)
        this.$store.commit('clearSearch')
        this.$router.push({ 
          path: `/search/user/${this.$store.state.searchResult.userName}`
        })

      }
    }
  }

</script>

<style scoped>
  .total-modal {
    z-index: 1000;
  }

  .inline {
    display: inline-block;

  }

  .username .container {
    width: 100%
  }

  .results:hover {
    background-color: #F5F5F5;
    border-radius: 20px;
  }

</style>

