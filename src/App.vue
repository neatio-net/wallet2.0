<template>
  <div class="page-container" v-bind:class="{ navActive: navActive }">
    <div class="header">
      <div class="header__content content-container">
        <div class="header-text brand">     


          <router-link to="/"
            >Wallet <div class="beta">beta</div></router-link>
         </div>

 
         <div class="nav" v-bind:class="{ 'nav--active': navActive }">
          <div class="nav__item" @click="onClickNav()">
            <a href="https://www.neatio.net" target="_blank">{{
              $t("WEBSITE")
            }}</a>
          </div>
            
            
            <div class="nav" v-bind:class="{ 'nav--active': navActive }">
             <div class="nav__item" @click="onClickNav()">
               <router-link to="/edtool">{{
                 $t("EDTOOLS")
                 }}</router-link>
            </div>
           </div>

          <div class="nav" v-bind:class="{ 'nav--active': navActive }">
            <div class="nav__item" @click="onClickNav()">
              <a href="https://scan.neatio.net" target="_blank">{{
                $t("EXPLORER")
              }}</a>
            </div>
          </div>

           <div class="nav" v-bind:class="{ 'nav--active': navActive }">
             <div class="nav__item" @click="onClickNav()">
               <a href="https://stake.neatio.net">{{
                 $t("STAKING")
                 }}</a>
            </div>
           </div>
           <div class="nav" v-bind:class="{ 'nav--active': navActive }">
             <div class="nav__item" @click="onClickNav()">
              <router-link to="/register-pk">{{
                 $t("VERIFIERS")
                 }}</router-link>
            </div>
           </div>
          


         </div>
         <div
          class="nav-toggle"
          @click="navToggleOnClick()"
          v-bind:class="{ 'nav-toggle--active': navActive }"
         >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
 
    <router-view />
  </div>
</template>
<script lang="ts">
import i18n from "@/plugins/i18n";
export default {
  name: "app",
  data() {
    return {
      navActive: false as boolean,
      year: new Date().getFullYear(),
      languages: [{ flag: "en", language: "en", title: "En" }],
    };
  },
  methods: {
    changeLocale(locale: string) {
      i18n.locale = locale;
    },
    navToggleOnClick(): void {
      this.navActive = !this.navActive;
    },
    onClickNav(): void {
      this.navActive = false;
          },


  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}

.page-container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //color: $contentPrimary;
  width: 100vw;
  height: 100%;
}

.header {
  height: 54px;
  width: 100%;

  background: linear-gradient(to left,#24243e, #302b63, #24243e);
  display: flex;
  justify-content: center;
  border-bottom: #00ffff 1px solid;

  @include mq-lrg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100vw;

    .navActive & {
      position: relative;
      height: 100vh;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;

    @include mq-lrg {
      display: inline-block;

      .navActive & {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

  &__logo {
    position: relative;
    width: 68px;
    height: 68px;

    a {
      width: 100%;
      height: 100%;
      display: block;
    }

    @include mq-lrg {
      position: absolute;
      left: 40px;
    }

    @include mq-med {
      position: absolute;
      left: 20px;
    }

    @include mq-sml {
      position: absolute;
      left: 16px;
    }
  }
}

.beta {
  color: #00ffff;
  font-family: 'Courier New', Courier, monospace;
  display: inline-block;
}

.header-text {

    @include mq-lrg {
      position: absolute;
      left: 40px;

    }

    @include mq-med {
      position: absolute;
      left: 20px;
         margin-top: 18px;
    }

    @include mq-sml {
      position: absolute;
      left: 16px;
         margin-top: 18px;
    }
  
}

.view-container {
  .navActive & {
    display: none;
  }
}

.nav {
  padding: 10px;
  margin-left: auto;
  display: flex;
  align-items: center;

  @include mq-lrg {
    padding-top: 60px;
    display: block;
    background: transparent;
    display: none;

    &--active {
      display: block;
    }
  }

  &__item {
    a {
      color: #00ffff;
      font-size: 20px;
      text-transform: uppercase;
      font-family: "Anita";
      text-decoration: none;

      display: inline-block;
      padding: 3px;
      position: relative;
    }
    a:after {
      background: none repeat scroll 0 0 transparent;
      bottom: 0;
      content: "";
      display: block;
      height: 2px;
      left: 50%;
      position: relative;
      background: #00ffff;
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
      width: 0;
    }
    a:hover:after {
      width: 100%;
      left: 0;
    }

    a {
      @include font-size(1.4);
      color: #00ffff;
      text-decoration: none;
      margin: 0 16px;

      &:hover {
        text-decoration: none;
        color: $navHighlight;
      }

      @include mq-lrg {
        @include font-size(1.6);
        padding: 14px 40px;
        display: block;
        text-align: center;
      }

      &.router-link-exact-active {
        color: $navHighlight;
      }
    }
  }
}



.nav-toggle {
  width: 40px;
  cursor: pointer;
  z-index: 6000;
  position: absolute;
  right: 24px;
  top: 17px;
  display: none;

  @include mq-lrg {
    display: block;
  }

  span {
    @include transition(background-color);
    @include transition(transform);
    transform-origin: 100% 3px;
    display: block;
    width: 100%;
    height: 6px;
    background-color: $highlight;
    margin-bottom: 8px;

    &:first-child {
      transform: rotate(0deg);
    }

    &:nth-child(2) {
      @include transition(opacity);
      opacity: 1;
    }

    &:last-child {
      transform: rotate(0deg);
      margin-bottom: 0;
    }
  }

  &--active {
    span {
      @include transition(transform);
      background-color: $highlight;

      &:first-child {
        transform: rotate(-44deg);
      }

      &:nth-child(2) {
        @include transition(opacity);
        opacity: 0;
      }

      &:last-child {
        transform: rotate(44deg);
        margin-bottom: 0;
      }
    }
  }
}
</style>
