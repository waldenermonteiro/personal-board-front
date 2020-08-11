<template>
  <div>
    <v-app-bar color="deep-purple" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-spacer><p class="text-center ">Personal Board</p></v-spacer>
      <v-btn icon background>
        {{ user.abbreviation }}
      </v-btn>
    </v-app-bar>
    <v-container fluid="">
      <v-row>
        <v-col>
          <h1>Welcome, {{ user.name }}</h1>
        </v-col>
      </v-row>
    </v-container>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'DashboardLayout',
  data: () => ({
    menu: false,
    item: 5,
    user: {}
  }),
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user.name !== '') {
      this.createAbbreviation(this.user)
    } else {
      this.user.name = 'Anonymous'
      this.createAbbreviation(this.user)
    }
  },
  methods: {
    createAbbreviation (user) {
      const split = user.name.split(' ')
      const numberOne = split[0].substring(0, 1)
      if (split.length > 1) {
        const numberTwo = split[1].substring(0, 1)
        user.abbreviation = numberOne + numberTwo
      } else {
        user.abbreviation = numberOne
      }
    }
  }
}
</script>
<style scoped>
.height-subtitle {
  -webkit-line-clamp: 6 !important;
}
</style>
