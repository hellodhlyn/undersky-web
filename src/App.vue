<template>
  <div id="app">
    <div class="navbar">
      <div class="wrapper">
        <nav>
          <router-link class="nav-item" :to="{ name: 'index' }">GAMES</router-link>
          <router-link class="nav-item" to="#">HISTORY</router-link>
          <router-link class="nav-item" to="#">RANKING</router-link>
        </nav>
        <span class="nav-user"><ion-icon name="person"></ion-icon></span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 300;
}

.navbar {
  height: 80px;
  background: #212121;
  color: #fafafa;
  text-align: center;
  line-height: 80px;

  .wrapper {
    position: relative;
    width: 800px;
    margin: 0 auto;

    nav {
      display: inline-block;
      margin: 0 auto;

      .nav-item { padding: 0 10px; }
    }

    .nav-user {
      display: inline-block;
      position: absolute;
      padding: 0 10px;
      right: 0;
      font-size: 24px;
    }

    a {
      color: #fafafa;
      text-decoration: none;
    }
  }
}

.container {
  width: 800px;
  margin: 0 auto;
  padding: 20px;

  &.divided {
    width: 758px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
  }
}
</style>
