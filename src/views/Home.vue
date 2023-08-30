<template>
  <div class="body-container">

    
    <div class="hero__wallet-description">{{ $t("pages.home.pageName") }}</div>
     <div class="section section--light">
      <div
        class="section__content section__content--thin-top content-container"
      >
        <div class="cards-grid">

          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--send">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("Access your existing wallet") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/send"
                  ><button class="ripple">ACCESS</button></router-link
                >
              </div>
            </div>
          </div>

          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--create">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("Create a brand new wallet") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/create"
                  ><button class="ripple">CREATE</button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wallet-terms">
      By using this application you agree to the Terms of Use.

    </div>
  </div>
  
</template>

<script>


export default {
  name: "Home",
}
</script>