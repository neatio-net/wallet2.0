<template>
  <div class="body-container">
    <div class="hero__title-page">{{ $t("pages.register.pageName") }}</div>
    <div class="section section--light">
      <div
        class="section__content section__content--thin-top content-container"
      >
        <div class="cards-grid">
          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--unencrypted">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("Unencrypted PrivKey") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/register-pk"
                  ><button class="ripple">PRIVATEKEY</button></router-link
                >
              </div>
            </div>
          </div>

          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--encrypted">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("KeyStore + Password") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/register-ks"
                  ><button class="ripple">KEYSTORE</button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
};
</script>