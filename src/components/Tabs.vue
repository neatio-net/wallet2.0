<template>
  <article>
    <header class="tabs">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index">
           <div class="nav-tab"
               :class="{ 'is-active' : tab.isActive }"
               @click="selectTab(tab)">
               {{ tab.name }}
           </div>
        </li>
      </ul>
    </header>
    <section class="tabs-details">
   <slot>

   </slot>
    </section>
  </article>
</template>

<script>
export default {
   data: () => {
    return {
        tabs: []
    }
   },

   methods: {
    selectTab(selectedTab) {
        this.tabs.forEach(tab => {
            tab.isActive = tab.name === selectedTab.name;
        });
    }
   },
   created() {
        this.tabs = this.$children;
    }
   
}
</script>


